"""
Process redis-doc command "man" pages.

* Inject FrontMatter to command markdown based on commands.json
* Auto-link backticked Redis commands in markdown
* Convert ```cli snippets to redis-cli shortcode
* Report errors when a command is missing a markdown file, and when a markdown
  is dangling.
"""
import argparse
import json
import logging
import re
from pathlib import Path

def command_filename(name):
    """ Return the base filename for a command """
    return name.lower().replace(' ', '-')


def get_command_tokens(arguments):
    """ Extract tokens from command arguments """
    rep = set()
    if type(arguments) is list:
        for arg in arguments:
            rep = rep.union(get_command_tokens(arg))
    else:
        if 'token' in arguments:
            rep.add(arguments['token'])
        if 'arguments' in arguments:
            for arg in arguments['arguments']:
                rep = rep.union(get_command_tokens(arg))
    return rep


def make_command_linkifier(commands, name, data):
    """
    Returns a function (for re.sub) that converts valid ticked command names to
    markdown links. This excludes the command in the context, as well as any of
    its arguments' tokens.
    """
    exclude = set(name)
    exclude.union(get_command_tokens(data))
    def linkifier(m):
        command = m.group(1)
        if command in commands and command not in exclude:
            return f'[`{command}`](/commands/{command_filename(command)})'
        elif command.startswith('!'):
            return f'`{command[1:]}`'
        else:
            return m.group(0)
    return linkifier


def generate_commands_links(commands, name, data, payload):
    """ Generate markdown links for ticked commands """
    linkifier = make_command_linkifier(commands, name, data)
    rep = re.sub(r'`([A-Z][A-Z-_ \.]*)`', linkifier, payload)
    return rep


def get_cli_shortcode(m):
    return (
f'''{{{{% redis-cli %}}}}
{m.group(1)}
{{{{% /redis-cli %}}}}''')


def convert_cli_snippets(payload):
    """ Convert the ```cli notation to Hugo shortcode syntax """
    rep = re.sub(r'```cli\n(.*)\n```\n', get_cli_shortcode, payload, flags=re.S)
    return rep


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('input_json',type=str,help='path to commands.json')
    parser.add_argument('commands_dir',type=str,help='path to commands\' .md files')
    args = parser.parse_args()

    # Treat commands.json as SSOT
    missing_md = []
    mds = set([x.name for x in Path(args.commands_dir).glob('[!_]*.md')])
    commands = json.load(open(args.input_json, 'r'))
    for (name, data) in commands.items():
        # Load the MD file
        filename = f'{command_filename(name)}.md'
        fullpath = f'{args.commands_dir}/{filename}'
        if not filename in mds:
            missing_md.append(name)
            continue
        mds.remove(filename)
        with open(fullpath, 'r') as md:
            payload = md.read()
        payload = generate_commands_links(commands, name, data, payload)
        payload = convert_cli_snippets(payload)

        # Prepare FrontMatter booster injection
        fm = {
            'title': name,
            'description': data['summary'],
            'type': 'commands' # TODO: ...
        }
        fm.update(data)

        # The 'replaced_by' property needs linking
        if 'replaced_by' in fm:
            fm['replaced_by'] = generate_commands_links(commands, name, data, fm['replaced_by'])

        # Meld FrontMatter and MD
        payload = json.dumps(fm,indent=4) + '\n\n' + payload

        # Write result
        with open(fullpath, 'w') as md:
            md.write(payload)

    # Report errors
    for cmd in missing_md:
        logging.error(f'Missing markdown file for `{cmd}`')
    for md in mds:
        logging.error(f'Missing command for `{md}`')
    if len(missing_md) > 0 or len(missing_md):
        exit(1)
