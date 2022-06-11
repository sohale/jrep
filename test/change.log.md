
# Change log

* `0.3.10` -- Status: `RE1`, `RER` (no streamed pipes).

* `d14d2adedcc8bf12794ded3a039e0784814b4ee9` -- Fri 13 May 2022
Added support for streams. Almost no tests though.

* `0.4.1`: Support for streams. For long lived pipes, not to wait until the end of pipe/stream

* `0.4.2`: docs: documenting use of env variables for naming the transformations

* `0.5.0`: Fixes for stream: last chunk (outchunk) of the stream was losing. Some tests added.

* `0.5.1`: Using lint `npm init @eslint/config` using `airbnb` style

* `0.6.0`: Avoid using `eval`. Used `node:vm` instead to mitigate security vulnerability.
