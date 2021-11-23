`PSETEX` works exactly like [`SETEX`](/commands/setex) with the sole difference that the expire
time is specified in milliseconds instead of seconds.

## Examples

{{% redis-cli %}}
PSETEX mykey 1000 "Hello"
PTTL mykey
GET mykey
{{% /redis-cli %}}

