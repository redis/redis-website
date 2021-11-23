Returns @array-reply of details about multiple Redis commands.

Same result format as [`COMMAND`](/commands/command) except you can specify which commands
get returned.

If you request details about non-existing commands, their return
position will be nil.


## Examples

{{% redis-cli %}}
COMMAND INFO get set eval
COMMAND INFO foo evalsha config bar
{{% /redis-cli %}}

