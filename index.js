import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";


import { fileURLToPath } from "url";
import { dirname } from "path";

const  __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

 import useRouters from './routes/users.js';
 import questionRoutes from './routes/Question.js';
 import answerRoutes from './routes/Answer.js';
 import paymentRoute from './routes/paymentRouter.js';
 import MediaRoute from './routes/Media.js';
 import {startCronJobs } from './controllers/Cron.js';


const app = express();

app.use(cors(
 {
  origin : ['https://stackoverflowclone-three.vercel.app'],
  methods : ['GET','POST','PUT','DELETE'],
  credential : true
 }
));


dotenv.config();
startCronJobs();
mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);

app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))

app.use("/public", express.static(path.join(__dirname, "public")));

app.get('/',(req, res) => {
    res.send("This is a stack overflow clone API") })

app.get("/api/getkey",(req,res)=>{
    res.status(200).json({key:"rzp_test_0XG4yyBnGzSslL"})

})    

app.use('/user', useRouters);
app.use('/questions', questionRoutes);
app.use('/answer',answerRoutes);
app.use("/api", paymentRoute);
app.use('/api/v1/media',MediaRoute);





const PORT= process.env.PORT || 5000
const CONNECTION_URL="mongodb+srv://admin:admin@stack-overflow-clone.zdvbxqk.mongodb.net/?retryWrites=true&w=majority"

const DATABASE_URL=process.env.CONNECTION_URL


mongoose.connect(DATABASE_URL,{ useNewUrlParser: true,useUnifiedTopology: true})
.then(()=> app.listen(PORT, ()=>{console.log(`server running on port ${PORT}`)}))
.catch((err)=>console.log(err.message)); 

export default app;



