Returns the sorted set cardinality (number of elements) of the sorted set stored
at `key`.

## Examples

{{% redis-cli %}}
ZADD myzset 1 "one"
ZADD myzset 2 "two"
ZCARD myzset
{{% /redis-cli %}}

