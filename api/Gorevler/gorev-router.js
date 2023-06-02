const router = require("express").Router();
const gorevModel = require("./gorev-model");
const mw = require("./gorev-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allGorev = await gorevModel.getAll();
    res.json(allGorev);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", mw.checkGorevId, async (req, res, next) => {
  try {
    res.json(req.currentGorev);
  } catch (err) {
    next(err);
  }
});

router.post("/", mw.checkPayload, async (req, res, next) => {
  try {
    let model = { Adi: req.body.Adi, Aciklama: req.body.Aciklama };
    const inserted = await gorevModel.insert(model);
    res.status(201).json(inserted);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
