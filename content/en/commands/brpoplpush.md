`BRPOPLPUSH` is the blocking variant of [`RPOPLPUSH`](/commands/rpoplpush).
When `source` contains elements, this command behaves exactly like [`RPOPLPUSH`](/commands/rpoplpush).
When used inside a [`MULTI`](/commands/multi)/[`EXEC`](/commands/exec) block, this command behaves exactly like [`RPOPLPUSH`](/commands/rpoplpush).
When `source` is empty, Redis will block the connection until another client
pushes to it or until `timeout` is reached.
A `timeout` of zero can be used to block indefinitely.

As per Redis 6.2.0, BRPOPLPUSH is considered deprecated. Please prefer [`BLMOVE`](/commands/blmove) in
new code.

See [`RPOPLPUSH`](/commands/rpoplpush) for more information.

## Pattern: Reliable queue

Please see the pattern description in the [`RPOPLPUSH`](/commands/rpoplpush) documentation.

## Pattern: Circular list

Please see the pattern description in the [`RPOPLPUSH`](/commands/rpoplpush) documentation.

