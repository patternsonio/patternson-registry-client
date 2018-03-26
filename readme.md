# @patternson/registry-client

apollo client for [patternson](https://patternson.io/) registry based on [aws-mobile-appsync-sdk-js](https://github.com/awslabs/aws-mobile-appsync-sdk-js).

## Install

`npm install @patternson/registry-client`

## Usage

```js
import PatternsonRegistryClient from '@patternson/registry-client';

const client = new PatternsonRegistryClient({
  // optional. Guest access if not provided
  accessToken: 'myPatternsonAccessToken',
});

client.query({ query: myQuery });
```

## License

* aws-mobile-appsync-sdk-js licensed under [Amazon Software License 1.0](https://github.com/awslabs/aws-mobile-appsync-sdk-js/blob/master/LICENSE)
* aws-sdk-js licensed under [Apache License](https://github.com/aws/aws-sdk-js/blob/master/LICENSE.txt)

All code in this repository is licensed under the MIT licence.

> The MIT License
>
> Copyright (C) 2018 Hannes Diercks
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of
> this software and associated documentation files (the "Software"), to deal in
> the Software without restriction, including without limitation the rights to
> use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
> of the Software, and to permit persons to whom the Software is furnished to do
> so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
> FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
> COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
> IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
