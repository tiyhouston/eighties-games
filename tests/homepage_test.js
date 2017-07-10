const chai = require("chai")
const assert = chai.assert;
const request = require("supertest");
const app = require("../app");

describe("the homepage", function(){
  it("loads and says 80's", function(done){
    request(app)
      .get("/")
      .expect(200)
      .end(function(err, res){
        // what is the response?
        assert.include(res.text, "Games!")
        done();
      })
  })
})
