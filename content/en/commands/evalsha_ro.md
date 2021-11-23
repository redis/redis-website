This is a read-only variant of the [`EVALSHA`](/commands/evalsha) command that isn't allowed to execute commands that modify data.

 Unlike [`EVALSHA`](/commands/evalsha), scripts executed with this command can always be killed and never affect the replication stream.
 Because it can only read data, this command can always be executed on a master or a replica.

