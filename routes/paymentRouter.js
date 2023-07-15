import express from "express";
import  { checkout,paymentVerification,getuser }  from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout",checkout);

router.post("/paymentverification",paymentVerification);

router.get("/getuser/:id",getuser);


export default router;
