https://github.com/TypeStrong/ts-loader/issues/1038

The problem with this repo is that the webpack.config.js has specified a custom TS config file (options.configFile), but this file doesnt exist.

ts-loader silently ignores the fact the requested TS config file does not exist an reverts to trying to access the default, that being tsconfig.json.

If there is an error, the error shows that it was trying to access tsconfig.json, which in itself should be a fault, because a non default TS config file was specified.

The error reported is as follows:

ERROR in [tsl] ERROR
      TS18002: The 'files' list in config file 'tsconfig.json' is empty.

Shwoing 'tsconfig.json' in the error message is only partly useful. Because there is a dynamic look up process for resolving tsconfig, any error reported should be explicit in reporting exactly which tsconfig file was used, ie in this case:

ERROR in [tsl] ERROR
      TS18002: The 'files' list in config file './tsconfig.json' is empty.

where ./ = the root of the repo.

If there was a tsconfig in ./lib/tsconfig.json, then I would like to see:

ERROR in [tsl] ERROR
      TS18002: The 'files' list in config file './lib/tsconfig.json' is empty.

So essentially, there are 2 (possibly 3) problems here which needs to be fixed:

1) show the full path of the erroneous tsconfig file.
2) if the user defines a custom location, then this should be used without defaulting to
tsconfig.
3) if the file specified at options.configFile does not exist, then this should be flagged
as an error, instead of silently defaulting to tsconfig.
