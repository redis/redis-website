Subscribes the client to the specified channels.

Once the client enters the subscribed state it is not supposed to issue any
other commands, except for additional `SUBSCRIBE`, [`PSUBSCRIBE`](/commands/psubscribe), [`UNSUBSCRIBE`](/commands/unsubscribe),
[`PUNSUBSCRIBE`](/commands/punsubscribe), [`PING`](/commands/ping), [`RESET`](/commands/reset) and `QUIT` commands.

