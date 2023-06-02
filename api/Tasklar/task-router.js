const router = require("express").Router();
const taskModel = require("./task-model");
const taskMw = require("./task-middleware");
const gorevMw = require("../Gorevler/gorev-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allTasks = await taskModel.getAll();
    res.json(allTasks);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", taskMw.checkTaskId, (req, res, next) => {
  try {
    res.json(req.currentTask);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  taskMw.checkPayload,
  gorevMw.checkGorevId,
  async (req, res, next) => {
    try {
      let model = {
        Adi: req.body.Adi,
        Aciklama: req.body.Aciklama,
        GorevId: req.body.GorevId,
      };
      const insertedTask = await taskModel.insert(model);
      res.status(201).json(insertedTask);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
