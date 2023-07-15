import mongoose from 'mongoose'
import User from '../models/auth.js'

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        const allUserDetails = []
        allUsers.forEach(User => {
            allUserDetails.push({ _id: User._id, name: User.name, about: User.about, tags: User.tags,subscription:User.subscription, noOfQuestions:User.noOfQuestions, joinedOn: User.joinedOn })
        })
        res.status(200).json(allUserDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags,plan } = req.body;

    

    if(!mongoose.Types.ObjectId.isValid(_id)){
        console.log("if blog")
        return res.status(404).send('question unavailable...');
    }

    try {
        const updatedProfile = await User.findByIdAndUpdate( _id, { $set: { 'name': name, 'about': about, 'tags': tags,'subscrition':plan}}, { new: true } )
       
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({ message: error.message })
    }
}

export const getCurrentUser = async (req, res) => {
    try {
      
      const userId = req.params.id;
  
      
      const user = await User.findById(userId);
  
      if (!user) {
        
        return res.status(404).json({ message: 'User not found' });
      }
  
      
      res.status(200).json(user);
    } catch (error) {
      
      res.status(500).json({ message : error.message });
    }
  };
  

export const addFriend = async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    // Find the current user and the friend user by their IDs
    const currentUser = await User.findById(userId);
    const friendUser = await User.findById(friendId.trim());

    if (!currentUser || !friendUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the friend is already in the friends list
    if (currentUser.friends.includes(friendId.trim())) {
      return res.status(400).json({ message: 'Friend already exists' });
    }

    // Add the friend to the current user's friends list
    currentUser.friends.push(friendId.trim());
    await currentUser.save();

    res.status(200).json({ message: 'Friend added successfully' });
    console.log("add success!");
  } catch (error) {
    res.status(500).json({ message: 'Failed to add friend', error });
  }
};

  
  // Remove a friend
  export const removeFriend = async (req, res) => {
    const { userId, friendId } = req.params;
  
    try {
      // Find the current user and the friend user by their IDs
      const currentUser = await User.findById(userId);
      const friendUser = await User.findById(friendId.trim());
  
      if (!currentUser || !friendUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the friend is in the friends list
      if (!currentUser.friends.includes(friendId.trim())) {
        return res.status(400).json({ message: 'Friend does not exist' });
      }
  
      // Remove the friend from the current user's friends list
      currentUser.friends = currentUser.friends.filter(
        (friend) => friend.toString() !== friendId
      );
      await currentUser.save();
  
      res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to remove friend', error });
    }
  };
  