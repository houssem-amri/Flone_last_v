const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../Models/Users");

const router = express.Router();

router.post("/add_users",async (req, res, next) => {
  const user_email = await User.findOne({ email: req.body.email });
  if (user_email) {
    res.status(200).json({ message: "0" });
  }else{
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const usres = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: hash,
        role: req.body.role,
        tel: req.body.tel,
  
      });
      usres
        .save()
        .then(
          res.status(200).json({
            message: "1",
          })
        )
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    });
  }

});

//login
router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(200).json({
          message: "0"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(200).json({
          message: "1"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "2",
        token: token,
        expiresIn: 3600,
        role: fetchedUser.role,
        userNom: fetchedUser.nom,
        userPrenon: fetchedUser.prenom,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});


router.get("/get_allUsers", (req, res) => {
  User.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        users: docs,
      });
    }
  });
});
router.delete("/delete_user/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: "user deleted succesful",
    })
  );
});

router.get("/get_conseilleur_byId/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        user: findedObject,
      });
    }
  });
});
router.get("/get_client_byId/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        user: findedObject,
      });
    }
  });
});
router.put("/Update_conseilleur", (req, res) => {
  const conseilleur = {
    _id: req.body._id,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: req.body.password,
    tel: req.body.tel,
    role:"conseilleur"
  };
  User.updateOne({ _id: req.body._id }, conseilleur).then(
    res.status(200).json({
      message: "conseilleur updated successfuly",
    })
  );
});

router.put("/Update_client", (req, res) => {
  const client = {
    _id: req.body._id,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: req.body.password,
    tel: req.body.tel,
    role:"client"
  };
  User.updateOne({ _id: req.body._id }, client).then(
    res.status(200).json({
      message: "client updated successfuly",
    })
  );
});
router.get("/get_all_client", (req, res) => {
  User.findOne({ role: "client" }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        user: findedObject,
      });
    }
  });
});
module.exports = router;
