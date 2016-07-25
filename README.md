# Use case persistify + circular json

See https://github.com/royriojas/flat-cache/issues/5

## To demonstrate the issue:

Run `npm run bundle-watch` (or `persistify ./index.js --cache-dir ./cache --watch -o bundle.js`)

Leads to:

```
TypeError: Converting circular structure to JSON
```

## Reasons:

- The issue appear when a `foo` package use a `browserify.transform` field in the `package.json` file (with an options object)
  ```
  (...)
  "browserify": {
    "transform": [
      [ "./transform", { } ]
    ]
  }
  ```
- The options object will be populated with a circular reference to the main browserify `packageCache` object when used with watchify (hence the `--watch` option)
  ```
  # with `var cache` the persistify cache:
  cache.persistifyArgs.packageCache['<absolute path to>/foo/package.json'].browserify.transform[0][1]._flags.packageCache === cache.persistifyArgs.packageCache
  ```
