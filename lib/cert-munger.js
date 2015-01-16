var x509 = require('x.509'),
      fs = require('fs'),
      tmp = require('tmp'),
      _ = require('underscore'),
      S = require('string'),
      util = require('util');

(function(){
  "use strict";

  exports.to_cert = function(raw_cert, callback) {
    if(raw_cert.typeof === 'object'){
      callback(null, 'ERROR: Certificate passed as Object! Will not process \n' + raw_cert);
    } else {
      build_cert(raw_cert, function(built_cert){
        //callback(built_cert);
        callback(built_cert);
      });
    }
  };

  var build_cert = function(cert, callback) {
    clean_contents(cert, function(converted_cert){
      tmp.file({ mode: '0600', prefix: 'cert-', postfix: '-munger.crt' }, function _tempFileCreated(err, path) {
        if (err) throw err;
        fs.writeFile(path, converted_cert, function(err){
          if (!err) {
            callback(x509.parseCert(path));
          }
        });
      });
    });
  };

  var clean_contents = function(cert, callback) {
    var myCert = [];
    var tmpCert = cert.split(/\\n\\t|\n{1}\t|\n{1}\s+|\n/g);
    _.map(tmpCert, function(thisLine){
      var parsedLine;
      if(S(thisLine).contains("CERTIFICATE")) {
        parsedLine = thisLine.split(/----- /g);
        if (parsedLine[1] !== undefined) {
          myCert.push(parsedLine[0] + '----- ');
          myCert.push(parsedLine[1]);
        } else {
          myCert.push(thisLine);
        }
      } else {
        parsedLine = thisLine.split(' ');
        if (parsedLine[1] !== undefined) {
          myCert.push(parsedLine[0]);
          myCert.push(parsedLine[1]);
        } else {
          myCert.push(thisLine);
        }
      }
    });
    callback(myCert.join('\n'));
  };
})();
