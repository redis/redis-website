Returns all values in the hash stored at `key`.

## Examples

{{% redis-cli %}}
HSET myhash field1 "Hello"
HSET myhash field2 "World"
HVALS myhash
{{% /redis-cli %}}

