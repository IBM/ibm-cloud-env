const expect = require('chai').expect;
const Log4js = require('log4js');
const path = require('path');

describe('App', function () {
	let IBMCloudEnv;

	describe('mapping version 1', function () {
		before(function () {
			require("./fake-env-vars");
			IBMCloudEnv = require("../lib/lib.js");
			IBMCloudEnv.setLogLevel(Log4js.levels.TRACE);
			IBMCloudEnv.init(path.join("/server", "config", "v1", "mappings.json"));
		});

		it('Should be able to read plain text file', function () {
			expect(IBMCloudEnv.getString("file_var1")).to.equal("plain-text-string");
			expect(IBMCloudEnv.getDictionary("file_var1")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("file_var1")).to.have.a.property("value");
			expect(IBMCloudEnv.getDictionary("file_var1").value).to.equal("plain-text-string");
		});

		it('Should be able to read json file with JSONPath', function () {
			expect(IBMCloudEnv.getString("file_var2")).to.equal(JSON.stringify({level2: 12345}));
			expect(IBMCloudEnv.getDictionary("file_var2")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("file_var2")).to.have.a.property("level2");
			expect(IBMCloudEnv.getDictionary("file_var2").level2).to.equal(12345);
		});

		it('Should be able to read CF service credentials via service instance name', function () {
			expect(IBMCloudEnv.getString("cf_var1")).to.equal(JSON.stringify({username: "service1-username1"}));
			expect(IBMCloudEnv.getDictionary("cf_var1")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("cf_var1")).to.have.a.property("username");
			expect(IBMCloudEnv.getDictionary("cf_var1").username).to.equal("service1-username1");
		});

		it('Should be able to read VCAP_SERVICES and VCAP_APPLICATION with JSONPath', function () {
			expect(IBMCloudEnv.getString("cf_var2")).to.equal("service1-username1");
			expect(IBMCloudEnv.getDictionary("cf_var2")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("cf_var2")).to.have.a.property("value");
			expect(IBMCloudEnv.getDictionary("cf_var2").value).to.equal("service1-username1");

			expect(IBMCloudEnv.getString("cf_var3")).to.equal("test-application");
			expect(IBMCloudEnv.getDictionary("cf_var3")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("cf_var3")).to.have.a.property("value");
			expect(IBMCloudEnv.getDictionary("cf_var3").value).to.equal("test-application");
		});

		it('Should be able to get simple string from environment var', function () {
			expect(IBMCloudEnv.getString("env_var1")).to.equal("test-12345");
			expect(IBMCloudEnv.getDictionary("env_var1")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("env_var1")).to.have.a.property("value");
			expect(IBMCloudEnv.getDictionary("env_var1").value).to.equal("test-12345");
		});

		it('Should be able to get stringified JSON dictionary from environment var', function () {
			expect(IBMCloudEnv.getString("env_var2")).to.equal(JSON.stringify({credentials: {username: "env-var-json-username"}}));
			expect(IBMCloudEnv.getDictionary("env_var2")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("env_var2")).to.have.a.property("credentials");
			expect(IBMCloudEnv.getDictionary("env_var2").credentials).to.have.a.property("username");
			expect(IBMCloudEnv.getDictionary("env_var2").credentials.username).to.equal("env-var-json-username");
		});

		it('Should be able to get stringified JSON dictionary from environment var and run JSONPath', function () {
			expect(IBMCloudEnv.getString("env_var3")).to.equal("env-var-json-username");
			expect(IBMCloudEnv.getDictionary("env_var3")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("env_var3")).to.have.a.property("value");
			expect(IBMCloudEnv.getDictionary("env_var3").value).to.equal("env-var-json-username");
		});
	});

	describe('mapping version 2', function () {
		before(function () {
			require("./fake-env-vars");
			IBMCloudEnv = require("../lib/lib.js");
			IBMCloudEnv.setLogLevel(Log4js.levels.TRACE);
			IBMCloudEnv.init(path.join("/server", "config", "v2", "mappings.json"));
		});

		it('Should be able to read plain text file', function () {
			expect(IBMCloudEnv.getDictionary("var1")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("var1").file_var1).to.equal("plain-text-string");

		});

		it('Should be able to read json file with JSONPath', function () {
			expect(IBMCloudEnv.getDictionary("var2")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("var2").file_var2).to.equal(JSON.stringify({level2: 12345}));
		});

		it('Should be able to read CF service credentials via service instance name', function () {
			expect(IBMCloudEnv.getDictionary("var1")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("var1").cf_var1).to.equal(JSON.stringify({username: "service1-username1"}));

		});

		it('Should be able to read VCAP_SERVICES and VCAP_APPLICATION with JSONPath', function () {
			expect(IBMCloudEnv.getDictionary("var2")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("var2").cf_var2).to.equal("service1-username1");
			expect(IBMCloudEnv.getDictionary("var3")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("var3").cf_var3).to.equal("test-application");
		});

		it('Should be able to get simple string from environment var', function () {
			expect(IBMCloudEnv.getDictionary("var1")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("var1").env_var1).to.equal("test-12345");

		});

		it('Should be able to get stringified JSON dictionary from environment var', function () {
			expect(IBMCloudEnv.getDictionary("var2")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("var2").env_var2).to.equal(JSON.stringify({credentials: {username: "env-var-json-username"}}));
		});

		it('Should be able to get stringified JSON dictionary from environment var and run JSONPath', function () {
			expect(IBMCloudEnv.getDictionary("var3")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("var3").env_var3).to.equal("env-var-json-username");
		});
	});

	describe('default to version 1 if version not found', function () {
		before(function () {
			require("./fake-env-vars");
			IBMCloudEnv = require("../lib/lib.js");
			IBMCloudEnv.setLogLevel(Log4js.levels.TRACE);
			IBMCloudEnv.init(path.join("/server", "config", "mappings.json"));
		});

		it('Should be able to read plain text file', function () {
			expect(IBMCloudEnv.getString("file_var1")).to.equal("plain-text-string");
			expect(IBMCloudEnv.getDictionary("file_var1")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("file_var1")).to.have.a.property("value");
			expect(IBMCloudEnv.getDictionary("file_var1").value).to.equal("plain-text-string");
		});

		it('Should be able to read json file with JSONPath', function () {
			expect(IBMCloudEnv.getString("file_var2")).to.equal(JSON.stringify({level2: 12345}));
			expect(IBMCloudEnv.getDictionary("file_var2")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("file_var2")).to.have.a.property("level2");
			expect(IBMCloudEnv.getDictionary("file_var2").level2).to.equal(12345);
		});

		it('Should be able to read CF service credentials via service instance name', function () {
			expect(IBMCloudEnv.getString("cf_var1")).to.equal(JSON.stringify({username: "service1-username1"}));
			expect(IBMCloudEnv.getDictionary("cf_var1")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("cf_var1")).to.have.a.property("username");
			expect(IBMCloudEnv.getDictionary("cf_var1").username).to.equal("service1-username1");
		});

		it('Should be able to read VCAP_SERVICES and VCAP_APPLICATION with JSONPath', function () {
			expect(IBMCloudEnv.getString("cf_var2")).to.equal("service1-username1");
			expect(IBMCloudEnv.getDictionary("cf_var2")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("cf_var2")).to.have.a.property("value");
			expect(IBMCloudEnv.getDictionary("cf_var2").value).to.equal("service1-username1");

			expect(IBMCloudEnv.getString("cf_var3")).to.equal("test-application");
			expect(IBMCloudEnv.getDictionary("cf_var3")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("cf_var3")).to.have.a.property("value");
			expect(IBMCloudEnv.getDictionary("cf_var3").value).to.equal("test-application");
		});

		it('Should be able to get simple string from environment var', function () {
			expect(IBMCloudEnv.getString("env_var1")).to.equal("test-12345");
			expect(IBMCloudEnv.getDictionary("env_var1")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("env_var1")).to.have.a.property("value");
			expect(IBMCloudEnv.getDictionary("env_var1").value).to.equal("test-12345");
		});

		it('Should be able to get stringified JSON dictionary from environment var', function () {
			expect(IBMCloudEnv.getString("env_var2")).to.equal(JSON.stringify({credentials: {username: "env-var-json-username"}}));
			expect(IBMCloudEnv.getDictionary("env_var2")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("env_var2")).to.have.a.property("credentials");
			expect(IBMCloudEnv.getDictionary("env_var2").credentials).to.have.a.property("username");
			expect(IBMCloudEnv.getDictionary("env_var2").credentials.username).to.equal("env-var-json-username");
		});

		it('Should be able to get stringified JSON dictionary from environment var and run JSONPath', function () {
			expect(IBMCloudEnv.getString("env_var3")).to.equal("env-var-json-username");
			expect(IBMCloudEnv.getDictionary("env_var3")).to.be.an("object");
			expect(IBMCloudEnv.getDictionary("env_var3")).to.have.a.property("value");
			expect(IBMCloudEnv.getDictionary("env_var3").value).to.equal("env-var-json-username");
		});
	})
});
