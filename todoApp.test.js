/* eslint-disable no-undef */
const db = require("./data/db-config");
const request = require("supertest");
const server = require("./api/server");

afterAll(async () => {
  await db.destroy();
});
beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});
describe("GorevApiTestler", () => {
  test("[1] Get methoduyla tüm görevler geliyor mu", async () => {
    //act
    const allGorevs = await request(server).get("/api/gorev");
    //assert
    expect(allGorevs.statusCode).toBe(200);
    expect(allGorevs.body.length).toBe(1);
  });
  test("[2] GetById ile sonuç dönüyor mu", async () => {
    //arrange
    let gorevId = 1;
    //act
    let actual = await request(server).get(`/api/gorev/${gorevId}`);
    //assert
    expect(actual.body.GorevId).toBe(1);
  });
  test("[3] GetById olmayan id ile hata dönüyor mu", async () => {
    //arrange
    let gorevId = 15;
    //act
    let actual = await request(server).get(`/api/gorev/${gorevId}`);
    //assert
    expect(actual.status).toBe(404);
  });
  test("[4] post methodu gorev ekliyor mu", async () => {
    //arrange
    let model = { Adi: "Algoritma Öğren", Aciklama: "Sıralama algoritmaları" };
    //act
    let actual = await request(server).post("/api/gorev").send(model);
    //assert
    expect(actual.status).toBe(201);
    expect(actual.body.GorevId).toBe(2);
  });
  test("[5] post methodunda olmayan alan hata döndürüyor mu", async () => {
    //arrange
    let model = { Aciklama: "Sıralama algoritmaları" };
    //act
    let actual = await request(server).post("/api/gorev").send(model);
    //assert
    expect(actual.status).toBe(400);
  });
});

describe("TaskApiTestler", () => {
  test("[6] get methodu tüm taskları dönüyor mu", async () => {
    //act
    let actual = await request(server).get("/api/task");
    //assert
    expect(actual.status).toBe(200);
    expect(actual.body.length).toBe(2);
  });
  test("[7] getbyID methodu ilgili Id'li taskı dönüyor mu", async () => {
    //arrange
    let taskId = 1;
    //act
    let actual = await request(server).get("/api/task/" + taskId);
    //assert
    expect(actual.status).toBe(200);
    expect(actual.body.TaskId).toBe(1);
  });
  test("[8] getbyID methodu olmayan Id için hata dönüyor mu", async () => {
    //arrange
    let taskId = 15;
    //act
    let actual = await request(server).get("/api/task/" + taskId);
    //assert
    expect(actual.status).toBe(404);
  });
  test("[9] post methodu task ekliyor mu", async () => {
    //arrange
    let model = {
      Adi: "Algoritma Öğren",
      Aciklama: "Sıralama algoritmaları",
      GorevId: 1,
    };
    //act
    let actual = await request(server).post("/api/task").send(model);

    //assert
    expect(actual.status).toBe(201);
    expect(actual.body.TaskId).toBe(3);
  });
  test("[10] post methodunda olmayan GorevId için hata dönüyor mu", async () => {
    //arrange
    let model = {
      Adi: "Algoritma Öğren",
      Aciklama: "Sıralama algoritmaları",
      GorevId: 2,
    };
    let expectedMessage = "Böyle bir gorev yok";
    //act
    let actual = await request(server).post("/api/task").send(model);

    //assert
    expect(actual.status).toBe(404);
    expect(actual.body.message).toEqual(expectedMessage);
  });
});
