Returns the length of the string value stored at `key`.
An error is returned when `key` holds a non-string value.

## Examples

{{% redis-cli %}}
SET mykey "Hello world"
STRLEN mykey
STRLEN nonexisting
{{% /redis-cli %}}

