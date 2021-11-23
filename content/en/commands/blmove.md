`BLMOVE` is the blocking variant of [`LMOVE`](/commands/lmove).
When `source` contains elements, this command behaves exactly like [`LMOVE`](/commands/lmove).
When used inside a [`MULTI`](/commands/multi)/[`EXEC`](/commands/exec) block, this command behaves exactly like [`LMOVE`](/commands/lmove).
When `source` is empty, Redis will block the connection until another client
pushes to it or until `timeout` (a double value specifying the maximum number of seconds to block) is reached.
A `timeout` of zero can be used to block indefinitely.

This command comes in place of the now deprecated [`BRPOPLPUSH`](/commands/brpoplpush). Doing
`BLMOVE RIGHT LEFT` is equivalent.

See [`LMOVE`](/commands/lmove) for more information.

## Pattern: Reliable queue

Please see the pattern description in the [`LMOVE`](/commands/lmove) documentation.

## Pattern: Circular list

Please see the pattern description in the [`LMOVE`](/commands/lmove) documentation.

