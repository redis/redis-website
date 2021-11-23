`PEXPIRETIME` has the same semantic as [`EXPIRETIME`](/commands/expiretime), but returns the absolute Unix expiration timestamp in milliseconds instead of seconds.

## Examples

{{% redis-cli %}}
SET mykey "Hello"
PEXPIREAT mykey 33177117420000
PEXPIRETIME mykey
{{% /redis-cli %}}

