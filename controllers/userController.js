const { User, Thought } = require("../models");

const userController = {
  // get
	getAllUsers(req, res) {
		User.find({})
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.select("-__v")
			.then((userData) => res.json(userData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// get
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.populate([
				{
					path: "thoughts",
					select: "-__v",
				},
				{
					path: "friends",
					select: "-__v",
				},
			])
			.select("-__v")
			.then((userData) => {
				if (!userData) {
					res.status(404).json({ message: "Unable to find user with this ID" });
					return;
				}
				res.json(userData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// create
	createUser({ body }, res) {
		User.create(body)
			.then((userData) => res.json(userData))
			.catch((err) => res.status(400).json(err));
	},

	// update 
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((userData) => {
				if (!userData) {
					res.status(404).json({ message: "Unable to find user with this ID" });
					return;
				}
				res.json(userData);
			})
			.catch((err) => res.status(400).json(err));
	},

	// delete a user
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then((userData) => {
				if (!userData) {
					res.status(404).json({ message: "Unable to find user with this ID" });
					return;
				}
				User.updateMany(
					{ _id: { $in: deletedUser.friends } },
					{ $pull: { friends: params.id } }
				)
					.then(() => {
						Thought.deleteMany({ username: deletedUser.username })
							.then(() => {
								res.json({ message: "User deleted" });
							})
							.catch((err) => res.status(400).json(err));
					})
					.catch((err) => res.status(400).json(err));
			})
			.catch((err) => res.status(400).json(err));
	},

	// add 
	addFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $addToSet: { friends: params.friendId } },
			{ new: true, runValidators: true }
		)
			.then((userData) => {
				if (!userData) {
					res.status(404).json({ message: "Unable to find user with this ID" });
					return;
				}
				res.json(userData);
			})
			.catch((err) => res.json(err));
	},

	// remove a friend
	removeFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $pull: { friends: params.friendId } },
			{ new: true }
		)
			.then((userData) => res.json(userData))
			.catch((err) => res.json(err));
	},
};

module.exports = userController;