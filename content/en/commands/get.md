Get the value of `key`.
If the key does not exist the special value `nil` is returned.
An error is returned if the value stored at `key` is not a string, because `GET`
only handles string values.

## Examples

{{% redis-cli %}}
GET nonexisting
SET mykey "Hello"
GET mykey
{{% /redis-cli %}}

