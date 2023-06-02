const taskModel = require("./task-model");

async function checkTaskId(req, res, next) {
  try {
    const isExistTask = await taskModel.getById(req.params.id);
    if (!isExistTask) {
      res.status(404).json({ message: "Task bulunamadı" });
    } else {
      req.currentTask = isExistTask;
      next();
    }
  } catch (error) {
    next(error);
  }
}
function checkPayload(req, res, next) {
  try {
    let { Adi, GorevId } = req.body;
    if (!Adi || GorevId === undefined) {
      res.status(400).json({ message: "Eksik Alan var" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkTaskId,
  checkPayload,
};
