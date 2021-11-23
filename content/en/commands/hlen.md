Returns the number of fields contained in the hash stored at `key`.

## Examples

{{% redis-cli %}}
HSET myhash field1 "Hello"
HSET myhash field2 "World"
HLEN myhash
{{% /redis-cli %}}

