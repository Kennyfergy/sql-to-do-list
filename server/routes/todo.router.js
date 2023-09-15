const express = require("express");
const router = express.Router();

//DB connection
const pool = require("../modules/pool");

//GET
router.get("/", (req, res) => {
  console.log("GET request at /todo");
  const queryText = `SELECT * FROM "tasks" ORDER BY "id" ASC;`;

  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("Error in GET request", err);

      res.sendStatus(500);
    });
});

//POST
router.post("/", (req, res) => {
  let newTask = req.body;
  console.log("in router POST", newTask);

  let queryText = `INSERT INTO "tasks" (task) VALUES ($1);`;
  pool
    .query(queryText, [newTask.task])

    .then((result) => {
      res.sendStatus(201);
      console.log("in POST", result);
    })
    .catch((error) => {
      console.log("in POST", error);
      res.sendStatus(500);
    });
});

//PUT
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const markComplete = req.body.is_complete;

  const queryText = `UPDATE "tasks" SET "is_complete" = true WHERE "id" = $1;`;
  pool
    .query(queryText, [id])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Error in UPDATING tasks table", err);
      res.sendStatus(500);
    });
});
//DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(`DELETE route in /tasks/ with id of`, id);
  const queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;

  pool
    .query(queryText, [id])
    .then(() => res.sendStatus(204)) //204 no content
    .catch((err) => {
      console.log("Error in DELETING from tasks table", err);
      res.sendStatus(500);
    });
});
module.exports = router;
