const router = require("express").Router();
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	addFriend,
} = require("../../controllers/userController");
// Users
router.route("/")
	.get(getAllUsers)
	.post(createUser);

    router.route("/:id")
	.get(getUserById)
	.put(updateUser)
	.delete(deleteUser);
// Friends
router.route("/:userId/friends/:friendId")
	.post(addFriend)


module.exports = router;

