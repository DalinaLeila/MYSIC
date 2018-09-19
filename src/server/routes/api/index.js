const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const musicRoutes = require("./music");
const profileRoutes = require("./profile");

const { userMiddleware, checkLoggedIn } = require("../../utils/middleware");

router.use(userMiddleware);

router.get("/", (req, res) => {
  res.send({ hello: true });
});

router.get("/protected", checkLoggedIn, (req, res) => {
  console.log("USER", req.user);
  res.send({ success: true });
});

router.use("/auth", authRoutes);
router.use("/music", musicRoutes);
router.use("/profile", profileRoutes);

router.use((req, res) => {
  res.status(404).send({ error: "not-found" });
});

module.exports = router;
