var x509 = require('x509'),
      fs = require('fs'),
      _ = require('underscore'),
      S = require('string'),
      util = require('util');

(function(){
  "use strict";

  exports.to_cert = function(raw_cert, callback) {
    if(typeof(raw_cert) !== 'string'){
      callback(null, 'ERROR: Certificate not passed in as string! Will not process \n' + raw_cert);
    } else {
      build_cert(raw_cert, function(built_cert) {
        callback(built_cert);
      });
    }
  };

  var build_cert = function(cert, callback) {
    clean_contents(cert, function(converted_cert){
      var myX509 = x509.parseCert(converted_cert);
      // For some strange reason, x509 kept returning bits of binary at the end of
      // variables listed under extensions, and it broke any validation during testing
      // if you want to take a whack at fixing it, I am not opposed to pull requests.
      delete myX509.extensions;
      callback(myX509);
    });
  };

  var clean_contents = function(cert, callback) {
    var myCert = [];
    var tmpCert = cert.split(/\\n\\t|\n{1}\t|\n{1}\s+|\n/g);
    _.map(tmpCert, function(thisLine){
      parseLine(thisLine, function(line, line2){
        myCert.push(line);
        if(line2){
          myCert.push(line2);
        }
      });
    });
    callback(myCert.join('\n'));
  };

  var parseLine = function(line, callback) {
    var myLine = line.split(' ');
    if(S(line).contains("CERTIFICATE")) {
      if (myLine[2]) {
        callback((myLine[0] + ' ' + myLine[1]), myLine[2]);
      } else {
        callback(line);
      }
    } else {
      if (myLine[1]) {
        callback(myLine[0], myLine[1]);
      } else {
        callback(line);
      }
    }
  };

})();
