This command is very similar to [`DEL`](/commands/del): it removes the specified keys.
Just like [`DEL`](/commands/del) a key is ignored if it does not exist. However the command
performs the actual memory reclaiming in a different thread, so it is not
blocking, while [`DEL`](/commands/del) is. This is where the command name comes from: the
command just **unlinks** the keys from the keyspace. The actual removal
will happen later asynchronously.

## Examples

{{% redis-cli %}}
SET key1 "Hello"
SET key2 "World"
UNLINK key1 key2 key3
{{% /redis-cli %}}

