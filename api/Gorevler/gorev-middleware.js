const gorevModel = require("./gorev-model");

async function checkGorevId(req, res, next) {
  try {
    let id = req.params.id || req.body.GorevId; // hem görev hem de task için
    const isExistGorev = await gorevModel.getById(id);
    if (!isExistGorev) {
      return res.status(404).json({
        message: "Böyle bir gorev yok",
      });
    } else {
      req.currentGorev = isExistGorev;
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function checkPayload(req, res, next) {
  try {
    let { Adi } = req.body;
    if (!Adi) {
      return res.status(400).json({
        message: "Görev Adı Zorunludur",
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkGorevId,
  checkPayload,
};
