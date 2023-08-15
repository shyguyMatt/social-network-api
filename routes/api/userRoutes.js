const router = require('express').Router();
const {
    getUsers,
    getUserbyId,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserbyId).put(updateUser).delete(deleteUser);

// -- FRIEND ROUTES -- //

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
