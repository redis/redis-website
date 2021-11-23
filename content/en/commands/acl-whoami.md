Return the username the current connection is authenticated with.
New connections are authenticated with the "default" user. They
can change user using [`AUTH`](/commands/auth).

## Examples

```
> ACL WHOAMI
"default"
```

