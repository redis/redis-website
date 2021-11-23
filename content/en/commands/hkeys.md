Returns all field names in the hash stored at `key`.

## Examples

{{% redis-cli %}}
HSET myhash field1 "Hello"
HSET myhash field2 "World"
HKEYS myhash
{{% /redis-cli %}}

