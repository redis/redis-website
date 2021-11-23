Returns the set cardinality (number of elements) of the set stored at `key`.

## Examples

{{% redis-cli %}}
SADD myset "Hello"
SADD myset "World"
SCARD myset
{{% /redis-cli %}}

