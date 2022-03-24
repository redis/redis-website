const API_URL = '/',
  PROMPT_PREFIX = 'redis:6379> ';

async function createCli(cli) {
  const toExecute = getCommandsToExecute(cli);
  for (const node of cli.childNodes) {
    node.remove();
  }

  const pre = createPre(cli),
    input = createPrompt(cli),
    dbid = cli.getAttribute('dbid');

  handleHistory(pre, input);

  try {
    await asciiArt(cli, dbid, pre, input);
  } finally {
    cli.addEventListener(
      'submit',
      event => {
        event.preventDefault();

        const command = input.value;
        input.value = '';
        if (!command.trim()) {
          writeLines(pre, input, command, '');
          return;
        }

        disablePrompt(
          cli,
          input,
          () => executeInputCommand(dbid, pre, input, command)
        );
      }
    );

    if (toExecute) {
      await executeCommands(dbid, pre, input, toExecute);
    }
  }
}

function getCommandsToExecute(cli) {
  const textContent = cli.textContent.trim();
  if (!textContent) return;

  return textContent.split('\n').map(x => x.trim());
}

function createPre(cli) {
  const pre = document.createElement('pre');
  pre.setAttribute('tabindex', '0');
  cli.appendChild(pre);
  return pre;
}

function createPrompt(cli) {
  const prompt = document.createElement('div');
  prompt.classList.add('prompt');

  const prefix = document.createElement('span');
  prefix.appendChild(document.createTextNode(PROMPT_PREFIX));
  prompt.appendChild(prefix);

  const input = document.createElement('input');
  input.setAttribute('name', 'prompt');
  input.setAttribute('type', 'text');
  input.setAttribute('autocomplete', 'off');
  prompt.appendChild(input);

  cli.appendChild(prompt);

  cli.addEventListener('click', () => {
    if (document.getSelection().type === 'Range') return;
    input.focus();
  });

  cli.addEventListener('keydown', event => {
    if (event.target === input) return;
    if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) return;
    input.focus();
    input.scrollIntoView();
  });

  return input;
}

async function disablePrompt(cli, input, fn) {
  cli.classList.add('disabled');
  input.disabled = true;

  try {
    await fn();
  } finally {
    cli.classList.remove('disabled');
    input.disabled = false;
    input.focus();
  }
}

function handleHistory(pre, input) {
  let position = 0,
    tempValue = '';
  input.addEventListener('keydown', event => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();

        if (position === Math.floor(pre.childNodes.length / 2)) return;
        else if (position === 0) tempValue = input.value;

        ++position;
        break;

      case 'ArrowDown':
        event.preventDefault();

        if (position === 0) return;
        else if (--position === 0) {
          setInputValue(input, tempValue);
          return;
        }
        break;

      default:
        return;
    }

    const { nodeValue } = pre.childNodes[pre.childNodes.length - position * 2];
    setInputValue(input, nodeValue.substring(PROMPT_PREFIX.length, nodeValue.length - 1));
  });
}

function setInputValue(input, value) {
  input.value = value;
  input.setSelectionRange(value.length, value.length);
}

function writeLines(pre, input, command, reply) {
  writeLine(pre, input, `${PROMPT_PREFIX}${command}`);
  writeLine(pre, input, reply);
}

async function executeCommands(dbid, pre, input, commands) {
  try {
     const { replies } = await execute(commands, dbid);
     for (const [i, command] of commands.entries()) {
      const { error, value } = replies[i];
      try {
        writeLines(pre, input, command, error ? `(error) ${value}` : formatReply(value));
      } catch (err) {
        console.error(err);
        writeLines(pre, input, command, `(fatal error) ${err.message}`);
      }
    }
  } catch (err) {
    for (const command of commands) {
      writeLines(pre, input, command, err.message);
    }
  }
}

async function executeInputCommand(dbid, pre, input, command) {
  switch (command.toLowerCase()) {
    case 'clear':
      pre.replaceChildren();
      break;

    case 'help':
      writeLine(pre, input, `${PROMPT_PREFIX}${command}`);
      writeLine(pre, input, 'No problem! Let me just open this url for you: https://redis.io/commands');
      window.open('https://redis.io/commands');
      break;

    default:
      executeCommands(dbid, pre, input, [command]);
      break;
  }
}

let id;

async function execute(commands, dbid = '') {
  const response = await fetch(API_URL + dbid, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      commands,
      id
    })
  });
  const reply = await response.json();
  id = reply.id;
  return reply;
}

function formatReply(reply, indent = '') {
  if (reply === null) {
    return '(nil)';
  }

  const type = typeof reply;
  if (type === 'string') {
    return `"${reply}"`;
  } else if (type === 'number') {
    return `(integer) ${reply}`;
  } else if (Array.isArray(reply)) {
    if (reply.length === 0) {
      return '(empty array)';
    } else {
      let s = '';
      for (const [i, x] of reply.entries()) {
        const num = i + 1,
          nestedIndent = indent + ' '.repeat(num.toString().length + 2);
        s += `${i === 0 ? '' : `\n${indent}`}${num}) ${formatReply(x, nestedIndent)}`;
      }
      return s;
    }
  } else {
    return `-PROTOCOLERR Unknown reply type ${typeof reply}`;
  }
}

function writeLine(pre, input, line) {
  pre.appendChild(document.createTextNode(line + '\n'));
  input.scrollIntoView();
}

async function asciiArt(cli, dbid, pre, input) {
  if (cli.getAttribute('asciiart') === null) return;

  disablePrompt(
    cli,
    input,
    async () => {
      const { replies: [{ error, value: raw }] } = await execute(['INFO SERVER'], dbid);

      if (error) {
        writeLine(pre, input, `(error) ${raw}`);
      } else {
        const time = new Date().toISOString(),
          version = raw.match(/redis_version:(.*)/)[1],
          sha = raw.match(/redis_git_sha1:(.*)/)[1],
          dirty = raw.match(/redis_git_dirty:(.*)/)[1],
          bits = raw.match(/arch_bits:(.*)/)[1],
          port = raw.match(/tcp_port:(.*)/)[1],
          pid = raw.match(/process_id:(.*)/)[1];
        writeLine(
          pre,
          input,
`${pid}:C ${time} # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
${pid}:C ${time} # Configuration loaded
                  _._
            _.-\`\`__ ''-._
      _.-\`\`    \`.  \`_.  ''-._            Redis ${version} (${sha}/${dirty}) ${bits} bit
    .-\`\` .-\`\`\`.  \`\`\`\/    _.,_ ''-._
  (    '      ,       .-\`  | \`,    )     Running in standalone mode
  |\`-._\`-...-\` __...-.\`\`-._|'\` _.-'|     Port: ${port}
  |    \`-._   \`._    /     _.-'    |     PID: ${pid}
  \`-._    \`-._  \`-./  _.-'    _.-'
  |\`-._\`-._    \`-.__.-'    _.-'_.-'|
  |    \`-._\`-._        _.-'_.-'    |           https://redis.io
  \`-._    \`-._\`-.__.-'_.-'    _.-'
  |\`-._\`-._    \`-.__.-'    _.-'_.-'|
  |    \`-._\`-._        _.-'_.-'    |
  \`-._    \`-._\`-.__.-'_.-'    _.-'
      \`-._    \`-.__.-'    _.-'
          \`-._        _.-'
              \`-.__.-'

${pid}:M ${time} # Server initialized
${pid}:M ${time} * Ready to accept connections`
        );
      }
    });
}

document.addEventListener('DOMContentLoaded', () => {
  for (const cli of document.querySelectorAll('form.redis-cli')) {
    createCli(cli);
  }
});
