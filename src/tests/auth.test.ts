import supertest from "supertest";
import crypto from "crypto";
import app from "../app";
import { closeConnection, startConnection } from "../database";

const request = supertest(app);

beforeEach(startConnection);
afterEach(closeConnection);

const user = {
  email: `test-${crypto.randomUUID()}@gmail.com`,
  password: "super&hard&",
};

describe("POST /auth/signup", () => {
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
        done();
      });
  });

  it("should not sign up user because email is repeated", (done) => {
    request
      .post("/auth/signup")
      .send(user)
      .expect(401)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual("Email already exist.");
        done();
      });
  });
});

describe("POST /auth/login", () => {
  it("should sign in user and generate a token", (done) => {
    request
      .post("/auth/login")
      .send(user)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.token).toBeDefined();
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toEqual(user.email);
        done();
      });
  });
});
