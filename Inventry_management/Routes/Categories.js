const express = require("express");
const router = express.Router();
const db = require("./Db");

// router.get("/sample", (req, res) => {
//   res.send("verified");
// });

router.post("/add/:id", async (req, res) => {
  const { category_name, category_description } = req.body;
  const id = req.params.id;
  const modify_at = null;
  const created_at = new Date();
  const insert = await db.execute(
    "Insert into category(user_id,category_name,category_description,created_at,modify_at) values (?,?,?,?,?)",
    [id, category_name, category_description, created_at, modify_at]
  );
});

router.get("/view/:id", async (req, res) => {
  const id = req.params.id;

  try {
    console.log(id);

    const [result] = await db.execute(
      "SELECT * FROM category WHERE user_id = ?",
      [id]
    );

    if (result.length > 0) {
      console.log("Viewing");

      res.status(200).json(result);
    } else {
      console.log("No categories found for the given user ID");
      res.status(404).json({ message: "No categories found" });
    }
  } catch (err) {
    console.log("error in viewing category");
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/edit/:id/:code", (req, res) => {
  const code = atob(req.params.code);
  const user_id = req.params.id;
  const { category_name, category_description } = req.body;
  db.execute(
    "update category set category_name=? , category_description=? where category_id=? and user_id=?",
    [category_name, category_description, code, user_id]
  );
});

router.post("/delete/:id/:code", (req, res) => {
  const code = atob(req.params.code);
  const user_id = req.params.id;
  db.execute("delete from category where user_id=? and code=?", [
    user_id,
    code,
  ]);
});

module.exports = router;
