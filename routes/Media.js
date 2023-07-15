import Express from "express";
import{getAll, create,likes,likeMedia} from "../controllers/mediaController.js";
import multer from "multer";
import fs from "fs";
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }
    if(!fs.existsSync('public/videos'))
    {
        fs.mkdirSync('public/videos')
    }
    cb(null,"public/videos");
  },
  filename:function(req, file, cb){
    cb(null,Date.now() + file.originalname)
  }
});

const upload = multer({
  storage: storage,
  fileFilter:function(req, file, cb){
    var ext =path.extname(file.originalname);

    if(ext !=='.mkv' && ext !== ".mp4" && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' ){
        return cb(new Error("Only videos are allowed!"));
    }

    cb(null, true);
  }
});
const router = Express.Router();

//get all media
router.get("/all", getAll);

//post create new media
router.post('/create',upload.fields([
    {
        name:"videos",
        maxCount:5,
    },
]),create);

router.post('/:mediaId/like',likeMedia);

router.post('/like',likes);
export default router;
