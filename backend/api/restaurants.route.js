//import express in express
import express from "express"

//access the express router 
const router = express.Router()
//demo reoute
router.route("/").get((req, res) => res.send("hello world"))

export default router 