const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  describe("POST", () => {
    it("should return status 401 unauthorized", async () => {
      const res = await request(server)
        .post("/api/login")
        .send({ username: "Fake1", password: "fake" });
      expect(res.status).toBe(401);
    });
  });

  describe("POST", () => {
    it("should return status user info", async () => {
      const res = await request(server)
        .post("/api/login")
        .send({ username: "Fake1", password: "fake" });
      expect(res.text).toBe(
        `{"message":"username/password combo is incorrect}`
      );
    });
  });

  describe("POST", () => {
    it("should return login message", async () => {
      const res = await request(server)
        .post("/api/register")
        .send({ username: "Shag", password: "pass" });
      expect(res.text).toEqual('{"message":"registered"}');
    });
  });
});
