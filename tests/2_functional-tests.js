const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = process.env.LIVE_URL || require('../app');

chai.use(chaiHttp);

suite('Functional Tests', () => {

});
