const express = require("express");
const router = express.Router();
const db = require("../Model/Db");

router.post("/add/:id", async (req, res) => {
  const {
    inventory_name,
    inventory_description,
    inventory_quantity,
    inventory_price,
    category_id,
  } = req.body;
  const id = req.params.id;
  const modify_at = null;
  const created_at = new Date();
  console.log(
    id,
    inventory_name,
    inventory_description,
    inventory_quantity,
    inventory_price,
    category_id,
    created_at,
    modify_at
  );
  try {
    const insert = await db.execute(
      "Insert into inventry(user_id,item_name,item_description,item_quantity,item_price,category_id,created_at,modified_at) values (?,?,?,?,?,?,?,?)",
      [
        id,
        inventory_name,
        inventory_description,
        inventory_quantity,
        inventory_price,
        category_id,
        created_at,
        modify_at,
      ]
    );
    res.status(200).send({ message: "Inventory added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "An error occurred while adding the inventory",
      details: err,
    });
  }
});

router.get("/list/:id", async (req, res) => {
  const id = req.params.id;

  try {
    console.log(id);

    const [result] = await db.execute(
      "SELECT * FROM inventry WHERE user_id = ?",
      [id]
    );

    if (result.length > 0) {
      console.log("Viewing");

      res.status(200).json(result);
    } else {
      console.log("No categories found for the given user ID");
      res.status(404).json({ message: "No inventory found" });
    }
  } catch (err) {
    console.log("error in viewing inventory");
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/edit/:id/:code", (req, res) => {
  const code = atob(req.params.code);
  const user_id = req.params.id;
  const modified_at = new Date();
  const {
    inventory_name,
    inventory_description,
    inventory_quantity,
    inventory_price,
    category_id,
  } = req.body;
  try {
    db.execute(
      "update inventry set item_name=? , item_description=?, item_quantity=? , item_price=? , category_id=? where inventry_id=? and user_id=?",
      [
        inventory_name,
        inventory_description,
        inventory_quantity,
        inventory_price,
        category_id,
        code,
        user_id,
      ]
    );
    res.status(200).json({ message: "Inventry updated Successfully" });
  }
  catch (error) {
    console.log(error)
     res.status(500).json({ message: "Error in updated Inventry" });
  }
});
router.delete("/delete/:id/:code", (req, res) => {
  const code = atob(req.params.code);

  const user_id = req.params.id;

  try {

    db.execute("delete from inventry where user_id=? and inventry_id=?", [
      user_id,

      code,
    ]);
     res.status(200).json({message : "Inventry Deleted Successfully"});
  }

  catch (error) {
    console.log(error)
     res.status(500).json({ message: "Error in Deleting Inventry" });
  }
});
module.exports = router;
