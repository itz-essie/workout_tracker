const Workout = require("../models/workout");
const router = require("express").Router();

//display all workouts
//passsing 2 parameters in the function call, 1st is an empty object and 2nd is the call back function
router.get("/api/workouts", function (req, res) {
  Workout.find({})
    .then((workoutDb) => {
      res.json(workoutDb);
    })
    .catch((err) => {
      res.json(err);
    });
});

// router.get("/api/workouts", function (req, res) {
//   Workout.aggregate({
//     $addFields: {
//       totalDuration: {
//         $sum: "exercises.duration",
//       },
//     }
//   })
//     .then((workoutDb) => {
//       res.json(workoutDb);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// route to add a workout to tracker
router.put("/api/workouts/:id", function (req, res) {
  Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
      $inc: { totalDuration: req.body.duration },
      $push: { exercises: req.body },
    },

    { new: true }
  )
    .then((exerciseDb) => {
      res.json(exerciseDb);
    })
    .catch((err) => {
      res.json(err);
    });
});

// route to create a new exercise
router.post("/api/workouts", function (req, res) {
  Workout.create(req.body)
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts/range", function (req, res) {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .sort({ day: -1 }) // possibly change to id
    .limit(7)
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", function (req, res) {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .sort({_id: -1})
    .limit(7)
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
