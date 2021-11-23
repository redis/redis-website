Returns if `member` is a member of the set stored at `key`.

## Examples

{{% redis-cli %}}
SADD myset "one"
SISMEMBER myset "one"
SISMEMBER myset "two"
{{% /redis-cli %}}

