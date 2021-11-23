Returns the score of `member` in the sorted set at `key`.

If `member` does not exist in the sorted set, or `key` does not exist, `nil` is
returned.

## Examples

{{% redis-cli %}}
ZADD myzset 1 "one"
ZSCORE myzset "one"
{{% /redis-cli %}}

