const { Thought, User } = require("../models/");

const thoughtController = {
	getAllThought(req, res) {
		Thought.find({})
			.select("-__v")
			.sort({ _id: -1 })
			.then((thoughtData) => res.json(thoughtData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.thoughtId })
			.select("-__v")
			.then((thoughtData) => {
				if (!thoughtData) {
					res.status(404).json({ message: "Unable to find Thought with this ID" });
					return;
				}
				res.json(thoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	
	// create a thought
	createThought({ params, body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((userData) => {
				if (!userData) {
					res.status(404).json({ message: "Unable to find Thought with this ID" });
					return;
				}
				res.json(userData);
			})
			.catch((err) => res.json(err));
	},

	// update
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
			new: true,
			runValidators: true,
		})
			.then((thoughtData) => {
				if (!thoughtData) {
					res.status(404).json({ message: "Unable to find Thought with this ID" });
					return;
				}
				res.json(thoughtData);
			})
			.catch((err) => res.status(400).json(err));
	},

	// delete
	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoughtId })
			.then((thoughtData) => {
				if (!thoughtData) {
					res.status(404).json({ message: "Unable to find Thought with this ID" });
				}
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $pull: { thoughts: params.thoughtId } },
					{ new: true }
				);
			})
			.then((userData) => {
				if (!userData) {
					res.status(404).json({ message: "Unable to find Thought with this ID" });
					return;
				}
				res.json(userData);
			})
			.catch((err) => res.json(err));
	},

	// add 
	createReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $push: { reactions: body } },
			{ new: true, runValidators: true }
		)
			.then((userData) => {
				console.log("userdata: " , userData);
				if (!userData) {
					res.status(404).json({ message: "Unable to find Thought with this ID" });
					return;
				}
				res.json(userData);
			})
			.catch((err) => res.json(err));
	},

	// remove 
	deleteReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then((userData) => res.json(userData))
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;

