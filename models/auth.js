import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    about: {type: String },
    tags: {type: String},
    friends: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
    subscrition : {type : String, default : "null"},
    noOfQuestions: { type: Number, default: 0},
    joinedOn: {type: Date, default: Date.now },
})

export default mongoose.model("User",userSchema)