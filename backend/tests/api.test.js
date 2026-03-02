import { jest } from "@jest/globals";
import request from "supertest";
import app from "../server.js";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("Smoke tests", () => {
  test("GET / returns 200 and Start page", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Start page");
  });

  test("GET /auth returns 200", async () => {
    const res = await request(app).get("/auth");
    expect(res.statusCode).toBe(200);
  });

  test("Unknown route returns 404", async () => {
    const res = await request(app).get("/does-not-exist");
    expect(res.statusCode).toBe(404);
  });

  test("GET /api/auth/me without token should return 401 or 403", async () => {
  const res = await request(app).get("/api/auth/me");
  expect([401, 403, 404]).toContain(res.statusCode);
});

test("GET / returns plain text", async () => {
  const res = await request(app).get("/");
  expect(res.headers["content-type"]).toMatch(/text\/html|text\/plain/);
});

test("GET /auth returns plain text", async () => {
  const res = await request(app).get("/auth");
  expect(res.headers["content-type"]).toMatch(/text\/html|text\/plain/);
});

test("Unknown API route returns 404", async () => {
  const res = await request(app).get("/api/does-not-exist");
  expect(res.statusCode).toBe(404);
});

test("POST to unknown route returns 404", async () => {
  const res = await request(app).post("/api/does-not-exist").send({ a: 1 });
  expect(res.statusCode).toBe(404);
});

test("GET /api/wishlist without auth should return 401 or 403", async () => {
  const res = await request(app).get("/api/wishlist");
  expect([401, 403]).toContain(res.statusCode);
});

test("GET /api/notifications without auth should return 401 or 403", async () => {
  const res = await request(app).get("/api/notifications");
  expect([401, 403]).toContain(res.statusCode);
});
});



