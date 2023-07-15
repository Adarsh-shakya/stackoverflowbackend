import Razorpay from 'razorpay';
import crypto from "crypto"
import{ Payment } from '../models/paymentModel.js';
import User  from '../models/auth.js';

const instance = new Razorpay({
  key_id: "rzp_test_0XG4yyBnGzSslL",
  key_secret: "W9rygobBB6Ko0dd2zpI9pJJh"
});

export  const checkout = async (req, resp) => {
  
    try {
      const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
      };
      
      const order = await instance.orders.create(options);
      
  
      resp.status(200).json({
        
        success: true,
        order,
      });
    } catch (error) {
      resp.status(500).json({
        success: false,
        error: "An error occurred during checkout",
      });
    }
  };
  
export const paymentVerification = async (req,res) => {
 const{ razorpay_order_id, razorpay_payment_id, razorpay_signature,userName,userId,subscrition } = req.body;

  const body=razorpay_order_id + "|" + razorpay_payment_id;

   console.log(userName);
   console.log(userId);
  console.log("subscrition: ", subscrition);

 if(subscrition==="free")
 {
  await User.findByIdAndUpdate( userId, { $set: { 'subscrition' : subscrition}})
                        
  res.status(200).json({success:true});
 }
 else{
  const expectedSignature = crypto
                            .createHmac('sha256',"W9rygobBB6Ko0dd2zpI9pJJh")
                            .update(body.toString())
                            .digest('hex');

                      // console.log("sig received" ,razorpay_signature );
                      // console.log("sig generated" ,expectedSignature);
                       const isAuthentic = expectedSignature === razorpay_signature;

                       if (isAuthentic) {
                       // Database comes here
                    
                        await Payment.create({
                          razorpay_order_id,
                          razorpay_payment_id,
                          razorpay_signature,
                          userName,
                          userId
                        });

                        await User.findByIdAndUpdate( userId, { $set: { 'subscrition' : subscrition}})
                        
                         res.status(200).json({success:true});
                       } else {
                        console.log("false");
                        res.status(400).json({
                          success: false,
                        });
                       }  
                      }
};


export const getuser = async (req, res) => {
  try {
      
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
} 
