Read-only variant of the [`BITFIELD`](/commands/bitfield) command.
It is like the original [`BITFIELD`](/commands/bitfield) but only accepts `GET` subcommand and can safely be used in read-only replicas.

Since the original [`BITFIELD`](/commands/bitfield) has `SET` and `INCRBY` options it is technically flagged as a writing command in the Redis command table.
For this reason read-only replicas in a Redis Cluster will redirect it to the master instance even if the connection is in read-only mode (see the [`READONLY`](/commands/readonly) command of Redis Cluster).

Since Redis 6.2, the `BITFIELD_RO` variant was introduced in order to allow [`BITFIELD`](/commands/bitfield) behavior in read-only replicas without breaking compatibility on command flags.

See original [`BITFIELD`](/commands/bitfield) for more details.

## Examples

```
BITFIELD_RO hello GET i8 16
```

