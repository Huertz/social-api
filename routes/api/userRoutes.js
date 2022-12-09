const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  updateUser,
  createUser,
  removeUser,
} = require('../../controllers/userController');


router
.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:userId
router
.route('/:userId')
.get(getOneUser)
.delete(removeUser)
.put(updateUser);

module.exports = router;

