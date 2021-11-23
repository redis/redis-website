Sets the given keys to their respective values.
`MSET` replaces existing values with new values, just as regular [`SET`](/commands/set).
See [`MSETNX`](/commands/msetnx) if you don't want to overwrite existing values.

`MSET` is atomic, so all given keys are set at once.
It is not possible for clients to see that some of the keys were updated while
others are unchanged.

## Examples

{{% redis-cli %}}
MSET key1 "Hello" key2 "World"
GET key1
GET key2
{{% /redis-cli %}}

