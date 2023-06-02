const db = require("../../data/db-config");

function getAll() {
  return db("Tasklar");
}
function getById(taskId) {
  return db("Tasklar").where("TaskId", taskId).first();
}
async function insert(taskModel) {
  const [insertedId] = await db("Tasklar").insert(taskModel);
  return getById(insertedId);
}

module.exports = {
  getAll,
  getById,
  insert,
};
