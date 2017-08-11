var request = require("request");
var base_url = "http://localhost:3000/"
var app = require("../app.js")

describe("Homepage", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
        // app.close();
      });
    }); 
  });
});