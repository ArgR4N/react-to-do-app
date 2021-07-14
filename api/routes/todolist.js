const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity')
const ToDo = require('../models/ToDo');




// POST /notes
router.post('/todolist', (req, res, next) => {
  let activitesList = []
  req.body.activities.forEach((activity)=>{
    const newActivity = new Activity({
      title: activity
    });
    activitesList.push(newActivity)
  })
  const toDo = new ToDo({
    title: req.body.title,
    activities: activitesList
  });
  toDo.save((err, toDo) =>{
      if (err) return next(err);
      res.status(201).json(toDo)
  });
});
// GET /notes
router.get('/todolist', (req, res, next) => {
    ToDo.find()                  // todos los docs de notes
      .select('_id title activities createdAt')  // como SELECT en SQL
      .sort('-createdAt')        // ordena por modificacion descendente
      .exec((err, toDoList) => {
        if (err) return next(err);
        // modifico un poco el resultado antes de mandarlo
        toDoList = toDoList.map(toDo => ({
          title: toDo.title,
          activities: toDo.activities,
          createdAt: toDo.createdAt,
          _id: toDo._id
        }));
        res.status(200).json({
          count: toDoList.length,   // la cantidad de elementos en notes
          toDoList: toDoList
        });
      });
  });

// GET /notes/id
router.get('/todolist/:id', (req, res, next) => {
    Note.findById(req.params.id)
      .select('_id title createdAt ')  // todo menos __v
      .exec((err, note) => {
        if (err) return next(err);
        if (!note) return res.status(404).json({ msg: 'Not found' });
        res.status(200).json({
          note: note
        });
      });
  });

// PUT /notes/id
router.put('/todolist/:id', (req, res, next) => {
    const toDo = {
      title: req.body.title,
      activities: req.body.activities,
      createdAt: Date.now()
    };
    const options = {
      new: true,
      omitUndefined: true
    };
    ToDo.findByIdAndUpdate(req.params.id, toDo, options).exec((err, toDo) => {
      if (err) return next(err);
      if (!toDo) return res.status(404).json({ msg: 'Not found' });
      res.status(200).json(toDo);
    });
  })
// DELETE /notes/id
router.delete('/todolist/:id', (req, res, next) => {
    ToDo.findByIdAndRemove(req.params.id).exec((err, toDo) => {
      if (err) return next(err);
      if (!toDo) return res.status(404).json({ msg: 'Not found' });
      res.status(200).json({ msg: 'Delete OK' });
    });
  });



module.exports = router;