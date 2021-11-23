Alters the last access time of a key(s).
A key is ignored if it does not exist.

## Examples

{{% redis-cli %}}
SET key1 "Hello"
SET key2 "World"
TOUCH key1 key2
{{% /redis-cli %}}

