Read-only variant of the [`SORT`](/commands/sort) command. It is exactly like the original [`SORT`](/commands/sort) but refuses the `STORE` option and can safely be used in read-only replicas.

Since the original [`SORT`](/commands/sort) has a `STORE` option it is technically flagged as a writing command in the Redis command table. For this reason read-only replicas in a Redis Cluster will redirect it to the master instance even if the connection is in read-only mode (see the [`READONLY`](/commands/readonly) command of Redis Cluster).

Since Redis 7.0.0, the `SORT_RO` variant was introduced in order to allow [`SORT`](/commands/sort) behavior in read-only replicas without breaking compatibility on command flags.

See original [`SORT`](/commands/sort) for more details.

## Examples

```
SORT_RO mylist BY weight_*->fieldname GET object_*->fieldname
```

