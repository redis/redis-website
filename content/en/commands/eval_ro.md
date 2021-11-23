This is a read-only variant of the [`EVAL`](/commands/eval) command that isn't allowed to execute commands that modify data.

Unlike [`EVAL`](/commands/eval), scripts executed with this command can always be killed and never affect the replication stream.
Because it can only read data, this command can always be executed on a master or a replica.

## Examples

```
> SET mykey "Hello"
OK

> EVAL_RO "return redis.call('GET', KEYS[1])" 1 mykey
"Hello"

> EVAL_RO "return redis.call('DEL', KEYS[1])" 1 mykey
(error) ERR Error running script (call to f_359f69785f876b7f3f60597d81534f3d6c403284): @user_script:1: @user_script: 1: Write commands are not allowed from read-only scripts
```

