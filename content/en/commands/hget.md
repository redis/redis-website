Returns the value associated with `field` in the hash stored at `key`.

## Examples

{{% redis-cli %}}
HSET myhash field1 "foo"
HGET myhash field1
HGET myhash field2
{{% /redis-cli %}}

