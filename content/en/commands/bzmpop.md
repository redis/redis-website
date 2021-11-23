`BZMPOP` is the blocking variant of [`ZMPOP`](/commands/zmpop).

When any of the sorted sets contains elements, this command behaves exactly like [`ZMPOP`](/commands/zmpop).
When used inside a [`MULTI`](/commands/multi)/[`EXEC`](/commands/exec) block, this command behaves exactly like [`ZMPOP`](/commands/zmpop).
When all sorted sets are empty, Redis will block the connection until another client adds members to one of the keys or until the `timeout` (a double value specifying the maximum number of seconds to block) elapses.
A `timeout` of zero can be used to block indefinitely.

See [`ZMPOP`](/commands/zmpop) for more information.

