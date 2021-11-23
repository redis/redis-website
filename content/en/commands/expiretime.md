Returns the absolute Unix timestamp (since January 1, 1970) in seconds at which the given key will expire.

See also the [`PEXPIRETIME`](/commands/pexpiretime) command which returns the same information with milliseconds resolution.

## Examples

{{% redis-cli %}}
SET mykey "Hello"
EXPIREAT mykey 33177117420
EXPIRETIME mykey
{{% /redis-cli %}}

