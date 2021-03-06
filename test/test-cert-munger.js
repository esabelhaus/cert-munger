var assert = require('assert'),
      chai = require('chai'),
      fs = require('fs'),
      util = require('util'),
      expect = chai.expect,
      should = chai.should(),
      certMunger = require('../lib/cert-munger.js'),
      one_line = fs.readFileSync('test/certs/one_line.crt', 'utf8'),
      passenger = fs.readFileSync('test/certs/passenger.crt', 'utf8'),
      malformed = fs.readFileSync('test/certs/malformed.crt', 'utf8'),
      user_crt = fs.readFileSync('test/certs/node_user.crt', 'utf8'),
      tmp_crt = user_crt.toString('binary'),
      non_string_crt = new Buffer(tmp_crt, "binary");


(function(){
  "use strict";

  var pristine = {
    "version": 2,
    "subject":
    { "domainComponent": 'ruby-lang',
    "commonName": 'Ruby certificate rbcert' },
    "issuer": { "domainComponent": 'ruby-lang', "commonName": 'Ruby CA' },
    "serial": '02',
    "notBefore": new Date('2014-10-21T14:15:44.000Z'),
    "notAfter": new Date('2015-10-21T14:15:44.000Z'),
    "signatureAlgorithm": 'sha256WithRSAEncryption',
    "fingerPrint": '69:81:C8:86:59:CE:A6:0B:D6:7B:16:41:C8:71:4B:82:C2:C9:BD:F4',
    "publicKey":
    { "algorithm": 'rsaEncryption',
    "e": '65537',
    "n": 'C0D826F5428371EE0849BFFABBCB302BF3DCF241B3ABEF024DF97F7FA9F453662EE8DF5251ACEDB5E1514041E2DD7F62277C7FF219C304FFA7519B463DA6B88E4A13E4453ADEAF10FC5DFEDD7FFBBF4767145BA59C414B817C51E9F1FD45718BB0C6C5F68053696E8BA445F592808BE45C6F81025FC74948CFCA38846184E4DA792339498539B03C8A9EF12769FE6721E5E12820BC2F82F1098342DDDD06C6770B6068BED27A61044C2636845C65A5D9FC497E09C9F786AAFCCDD33F9394BE7C0387C309AB82EE3CD3DCD8F04002FAD0D12154699C65C6DF5C5AD9C41A14FA8DE8C15AB8A4F01364606AD4F4722961E8386BD8B91910D9EACFF1959E17FA98E5' },
    "altNames": []
  };


  describe('MUNGER:TEST: One Line Cert', function() {
    it('Verifies certificate is munged from a single line to x509 certificate format', function(done){
      certMunger.to_cert(one_line, function(x509, error){
        if(!error) {
          var validator = util.inspect(pristine);
          var validatee = util.inspect(x509)
          validatee.should.equal(validator);
          done();
        } else {
          done(error);
        }
      })
    });
  });

  describe('MUNGER:TEST: Passenger Cert', function() {
    it('Verifies certificate is munged from a passenger cert to x509 certificate format', function(done){
      certMunger.to_cert(passenger, function(x509, error){
        if(!error) {
          var validator = util.inspect(pristine);
          var validatee = util.inspect(x509)
          validatee.should.equal(validator);
          done();
        } else {
          done(error);
        }
      })
    });
  });

  describe('MUNGER:TEST: Malformed Cert', function() {
    it('Verifies certificate is munged from a malformed format single line to x509 certificate format', function(done){
      certMunger.to_cert(malformed, function(x509, error){
        if(!error) {
          var validator = util.inspect(pristine);
          var validatee = util.inspect(x509)
          validatee.should.equal(validator);
          done();
        } else {
          done(error);
        }
      })
    });
  });

  describe('MUNGER:TEST: User Cert', function() {
    it('Verifies certificate is munged from a valid x509 certtificate back to x509 certificate format', function(done){
      certMunger.to_cert(user_crt, function(x509, error){
        if(!error) {
          var validator = util.inspect(pristine);
          var validatee = util.inspect(x509)
          validatee.should.equal(validator);
          done();
        } else {
          done(error);
        }
      })
    });
  });

  describe('MUNGER:TEST: Buffer Of Cert', function() {
    it('Verifies certificate cannot be passed in as a non string', function(done){
      certMunger.to_cert(non_string_crt, function(x509, error){
        if(!error) {
          done("THIS IS NOT SUPPOSED TO HAPPEN!");
        } else {
          done();
        }
      })
    });
  });
})();
