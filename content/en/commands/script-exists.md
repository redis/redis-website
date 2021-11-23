Returns information about the existence of the scripts in the script cache.

This command accepts one or more SHA1 digests and returns a list of ones or
zeros to signal if the scripts are already defined or not inside the script
cache.
This can be useful before a pipelining operation to ensure that scripts are
loaded (and if not, to load them using `SCRIPT LOAD`) so that the pipelining
operation can be performed solely using [`EVALSHA`](/commands/evalsha) instead of [`EVAL`](/commands/eval) to save
bandwidth.

Please refer to the [`EVAL`](/commands/eval) documentation for detailed information about Redis
Lua scripting.

