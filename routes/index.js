var express = require("express");
var router = express.Router();
const passport = require("passport");
const userModel = require("./users");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index",{error:req.flash("error")});
});
//code for registering user
const localStratergy = require("passport-local");
passport.use(new localStratergy(userModel.authenticate()));

router.get("/profile", isLoogedIn,async (req, res) => {
  const user = await userModel.findOne({username:req.session.passport.user});
  res.render("profile",{name:user});
});

router.post("/register", (req, res) => {
  const { username, email, fullname = username } = req.body;
  const userdata = new userModel({ username, email, fullname });
  userModel.register(userdata, req.body.password).then((registereduser) => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  });
});

//code for login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
    failureFlash:true
  }),
  (req, res) => {}
);

//code for logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

//code for isLoggedIn middleware (for protection)
function isLoogedIn(req, res, next){
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};

module.exports = router;
