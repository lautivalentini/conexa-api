import supertest from "supertest";
import crypto from "crypto";
import app from "../app";
import { closeConnection, startConnection } from "../database";

const request = supertest(app);

beforeEach(startConnection);
afterEach(closeConnection);

let token: string | null = null;
const user = {
  email: `test-${crypto.randomUUID()}@gmail.com`,
  password: "super&hard&",
};

describe("GET /user/list", () => {
  it("should require authorization", (done) => {
    request
      .get("/user/list")
      .set("Authorization", "bearer " + token)
      .expect(401)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("should sign up user and generate a token", (done) => {
    request
      .post("/auth/signup")
      .send(user)
      .expect(201)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.token).toBeDefined();
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toEqual(user.email);
        token = res.body.token;
        done();
      });
  });

  it("should get a list of users with two results", (done) => {
    request
      .get("/user/list")
      .set("Authorization", "bearer " + token)
      .query({ limit: "2", page: "1", orderBy: "asc" })
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(2);
        done();
      });
  });
});
