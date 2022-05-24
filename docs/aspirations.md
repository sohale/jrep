
Esy way to remove prefix
```bash
find $( pwd )  | jrep -REM $(pwd)
```

or `jrep -f REM $(pwd)` s.t. `REM` is `/(mystring)/.exec(x)[1]`
