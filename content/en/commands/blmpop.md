`BLMPOP` is the blocking variant of [`LMPOP`](/commands/lmpop).

When any of the lists contains elements, this command behaves exactly like [`LMPOP`](/commands/lmpop).
When used inside a [`MULTI`](/commands/multi)/[`EXEC`](/commands/exec) block, this command behaves exactly like [`LMPOP`](/commands/lmpop).
When all lists are empty, Redis will block the connection until another client pushes to it or until the `timeout` (a double value specifying the maximum number of seconds to block) elapses.
A `timeout` of zero can be used to block indefinitely.

See [`LMPOP`](/commands/lmpop) for more information.

