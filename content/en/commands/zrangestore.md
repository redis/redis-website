This command is like [`ZRANGE`](/commands/zrange), but stores the result in the `<dst>` destination key.

## Examples

{{% redis-cli %}}
ZADD srczset 1 "one" 2 "two" 3 "three" 4 "four"
ZRANGESTORE dstzset srczset 2 -1
ZRANGE dstzset 0 -1
{{% /redis-cli %}}

