##X.509 Certificate Munger
===========
This module takes string input for X509 certificates and attempts to parse and space the lines properly. It then returns the X509 attributes in JSON format

It does not accept buffer input, please use fs.readFile || fs.readFileSync in order to pass in .crt file as string.

## usage
```js

var fs = require('fs'),
      cert-munger = require('cert-munger'),
      myCert = fs.readFileSync('path/to/cert');

cert-munger.to_cert(myCert, function(cert, err){
  console.log(cert);
});

```

##Contributing



###Fork it, write your code, test early, test often.
```
npm install -g grunt grunt-cli mocha
npm install
```

### code of conduct
I use a combination of Mocha and Chai in conjunction with Grunt. I also use istanbul to validate that 100% code coverage exists before merging a pull request.

### testing
`grunt`

###coverage
`istanbul cover _mocha test/test-cert-munger.js`

# issues
https://github.com/e-sabelhaus/prestige/issues