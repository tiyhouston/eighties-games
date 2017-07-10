const chai = require("chai")
const assert = chai.assert;
const request = require("supertest");
const app = require("../app");

describe("dat API", function(){
  it("shape of API is object with games array", function(done){
    request(app)
      .get("/api/games")
      .expect(200)
      .end(function(err, res){
        // what is the response?
        assert.isArray(res.body.games)
        done();
      })
  })
})
