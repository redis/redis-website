Returns all the members of the set value stored at `key`.

This has the same effect as running [`SINTER`](/commands/sinter) with one argument `key`.

## Examples

{{% redis-cli %}}
SADD myset "Hello"
SADD myset "World"
SMEMBERS myset
{{% /redis-cli %}}

