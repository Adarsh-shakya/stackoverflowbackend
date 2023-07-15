import express from 'express';

import {login,signup} from '../controllers/Auth.js';
import { getAllUsers, updateProfile,getCurrentUser,addFriend,removeFriend} from '../controllers/Users.js';
import auth from '../middelwares/auth.js'

const router=express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.get('/getAllUsers', getAllUsers)
router.get('/getCurrentUsers/:id', getCurrentUser)
router.patch('/update/:id', auth, updateProfile)
router.post('/:userId/add-friend/:friendId', addFriend);

// Remove a friend
router.post('/:userId/remove-friend/:friendId', removeFriend);

export default  router;



