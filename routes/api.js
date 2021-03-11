const Workout = require("../models/workout");
const router = require("express").Router();

//display all workouts
//passsing 2 parameters in the function call, 1st is an empty object and 2nd is the call back function
router.get("/api/workouts", function (req, res) {
  Workout.find({})
  .then(workout => {
    res.json(workout);
  })
  .catch(err => {
    res.json(err);
  });
});

// route to add a workout to tracker
//REVIEW code!//
router.put("/api/workouts/:id", function(req, res) {
  Workout.findOneAndUpdate(req.params.id, { $push: { exercises:req.body } }, { new: true })
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

// route to create a new exercise
router.post("/api/workouts", function(req, res) {
    Workout.create(req.body)
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
