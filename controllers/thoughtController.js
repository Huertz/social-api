const { Thought, User } = require('../models');

module.exports = {
  // Get all Thought
  getThought(req, res) {
    Thought.find();
    then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
  },

  // Get a Thought
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thougth with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Add Thought
  createThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thougth with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  //  Delete Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No course with that ID' })
          : Student.deleteMany({ _id: { $in: course.user } })
      )
      .then(() => res.json({ message: 'Course and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  //! Reaction Section

   //Create reaction
   createReaction(req, res) {
    Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    //{ runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

// delete reaction
deleteReaction(req, res) {
    Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

};
