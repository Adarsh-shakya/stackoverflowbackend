import express from "express"

import { postAnswer, deleteAnswer } from '../controllers/Answer.js'
import auth from '../middelwares/auth.js'

const router = express.Router();

router.patch('/post/:id',auth, postAnswer)
router.patch('/delete/:id',auth, deleteAnswer)

export default router