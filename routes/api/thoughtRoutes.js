const router = require('express').Router();
const {
  getThought,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController.js');

//! /api/thought
router.route('/').get(getThought).post(createThought);

//! /api/thought/:thoughtId
router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;