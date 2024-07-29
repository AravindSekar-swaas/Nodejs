const express = require("express");
const router = express.Router();
const db = require("../Model/Db");

// router.get("/sample", (req, res) => {
//   res.send("verified");
// });

router.post("/add/:id", async (req, res) => {
  const { category_name, category_description } = req.body;
  const id = req.params.id;
  const modify_at = null;
  const created_at = new Date();
  try {
    const insert = await db.execute(
      "Insert into category(user_id,category_name,category_description,created_at,modify_at) values (?,?,?,?,?)",
      [id, category_name, category_description, created_at, modify_at]
    );

    res.status(200).send({message :"Category Added Successfully"})

  } catch(error) {
    console.log(error)
    res.status(500).send({ message: "Error in adding  category" });
  }
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

router.post("/edit/:id/:code", async (req, res) => {
  const code = atob(req.params.code);
  const user_id = req.params.id;
  console.log(code,user_id)
  const { category_name, category_description } = req.body;
  try {
    await db.execute(
      "update category set category_name=? , category_description=? where category_id=? and user_id=?",
      [category_name, category_description, code, user_id]
    );
    res.status(200).send({ message: "Category Edited Successfully" });
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Error in editing category" });
  }
});

router.delete("/delete/:id/:code", async(req, res) => {
  const code = atob(req.params.code);

  const user_id = req.params.id;
  try {

    await db.execute("delete from category where user_id=? and category_id=?", [
      user_id,

      code,
    ]);
        res.status(200).send({ message: "Category deleted Successfully" });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in Deleting category" });
  }
});

module.exports = router;
