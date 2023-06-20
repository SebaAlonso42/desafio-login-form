import { Router } from "express";
import userModel from "../dao/models/users.js";
import passport from "passport";

const router = Router();

router.post("/login", passport.authenticate("login"), async (req, res) => {
  if (!req.user)
    return res.status(401).send({ status: "error", error: "Unauthorized" });

  req.user.email === "adminCoder@coder.com"
    ? (req.user.adm = true)
    : (req.user.adm = false);

  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
    adm: req.user.adm,
  };

  return res.send({
    status: "success",
    message: "Logged In",
    payload: req.user,
  });

  // try {
  //   const { email, password } = req.body;
  //   const user = await userModel.findOne({ email }).lean();
  //   if (!user) {
  //     return res
  //       .status(400)
  //       .send({ status: "Error", error: "Incorret credentials" });
  //   }
  //   if (!isValidPassword(user, password)) {
  //     return res.status(401).send({ status: "Error", error: "Unauthorized" });
  //   }
  //   delete user.password;
  //   req.session.user = user;
  //   return res.send({
  //     status: "Success",
  //     message: "Logged In",
  //     payload: req.session.user,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
});

router.get("/failLogin", (req, res) => {
  res.send({ status: "error", error: "authentication error" });
});

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failRegister" }),
  async (req, res) => {
    // try {
    //   const { first_name, last_name, email, age, password } = req.body;
    //   const userExists = await userModel.findOne({ email });
    //   if (userExists) {
    //     return res
    //       .status(400)
    //       .send({ status: "Error", error: "email already used" });
    //   }
    //   const user = {
    //     first_name,
    //     last_name,
    //     email,
    //     age,
    //     password: createHash(password),
    //   };
    //   /* if ((user.email = "adminCoder@coder.com")) {
    //     user.adm = true;
    //   }
    //   user.adm = false; */
    //   await userModel.create(user);
    //   return res.send({ status: "Success", message: "User registered!" });
    // } catch (error) {
    //   console.log(error);
    // }
    return res.send({ status: "success", message: "User Registered!" });
  }
);

router.get("/failRegister", (req, res) => {
  return res.send({ status: "status", error: "Authentication error" });
});

router.get(
  "/github",
  passport.authenticate("githublogin", { scope: ["user:email"] }),
  (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("githublogin", { failureRedirect: "/" }),
  (req, res) => {
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      adm: req.user.adm,
    };
    res.redirect("/");
  }
);

router.delete("/logout", (req, res) => {
  try {
    if (!req.session) {
      return res
        .status(404)
        .send({ status: "Error", error: "no session found" });
    }
    req.session.destroy;
    return res.status(200).send({ status: "Success", message: "logged out !" });
  } catch (error) {
    console.log(error);
  }
});
export default router;
