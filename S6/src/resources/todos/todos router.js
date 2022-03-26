const { Router } = require("express");
const { getTodos, postTodos} = require("./todos controller")

const router = Router();

// router.get("/todos", getTodos)
// router.post("/todos", postTodos)

router.route("/")
.get(getTodos)
.post(postTodos)

// router.route("/:id")

module.exports = router;