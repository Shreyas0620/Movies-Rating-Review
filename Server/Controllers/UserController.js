import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Middlewares/Auth.js"; // Ensure this import is correct
// import { messaging } from "firebase-admin";


//@desc Register user
//@route POst /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;
    console.log('Register endpoint hit'); // Debugging statement

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //create user in db
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
        });
        
        //if user already existed

        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        console.error('Error in registration:', error); // Debugging statement
        throw new Error(error.message);
    }
});

//@desc login user
//@route POst /api/users/
//@access Public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    try {
        //find user indb
        const user = await User.findOne({email});
        // if user exits compare password with hashed password the send user data and token to client 
        if(user &&(await bcrypt.compare(password,user.password))){
            res.json({
                _id:user._id,
                fullName:user.fullName,
                email: user.email,
                image:user.image,
                isAdmin:user.isAdmin,
                token:generateToken(user._id),
            })
        }
        else{
            res.status(401);
            throw new Error("Invalid email or password")
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});


// Private controller
//update user profile

const updateUserProfile = asyncHandler(async(req,res)=>{
    const {fullName,email,image}=req.body
    try {

        // find user in db 
        const user = await User.findById(req.user._id)
        // if user exists update user data 
        if(user){
            user.fullName = fullName || user.fullName
            user.email = email || user.email
            user.image = image || user.image
            const updatedUser = await user.save()
            // send updated user data and token to the client 
            res.json({
                _id:updatedUser._id,
                fullName:updatedUser.fullName,
                image:updatedUser.image,
                isAdmin:updatedUser.isAdmin,
                token:generateToken(updatedUser._id),   
            });
            
        }else{
            res.status(404);
            throw new Error("User not found")

        }

        
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }

})


// delete user profile
const deleteUserProfile  = asyncHandler(async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        if(user){
            if(user.admin){
                res.status(400);
                throw new Error("Admin user can't be deleted")
                
            }
            await user.remove()
            res.json({message:"User deleted successfully.."})
        }
        else{
            res.status(400);
            throw new Error("User not Found")

        }


    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


// get user password 
const changeUserPassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} = req.body;
    try {
        // find user in db 
        const user = await User.findById(req.user._id);
        // if user exists then compare old password with hashed password then update user password 
        if (user && (await bcrypt.compare(oldPassword,user.password))){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword,salt);
            user.password= hashedPassword;
            await user.save()
            res.json({message:"Password changes successfully.."})
        }else{
            res.status(404);
            throw new Error("Invalid old password")
        }
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
})

// get all liked movies 
const getLikedMovies = asyncHandler(async(req,res)=>{

    try {
        const user = await User.findById(req.user._id).populate("likedMovies");
        // if user exist then send liked movies to client 
        if (user){
            res.json(user.likedMovies)
        }
        else{
            res.status(404);
            throw new Error("User not found")
        }

    } catch (error) {
        res.status(400).json({message:error.message})

    }
})

// add movies to liked movies 
const addLikedMovie= asyncHandler(async(req,res)=>{
    const {movieId} = req.body
    try {
        // find user in db 
        const user = await User.findById(req.user._id);
        if(user){
        //  check if user already liked movie or not 
            if(user.likedMovies.includes(movieId)){
                res.status(400);
                throw new Error("Movie already liked..")
            }
            user.likedMovies.push(movieId);
            await user.save();
            res.json(user.likedMovies)
        }else{
            res.status(400)
            throw new Error("Movie not found")

        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

/*  Remove movie from liked movie */


const deleteLikedMovies = asyncHandler(async (req, res) => {
    try {
      // Find user in the database
      const user = await User.findById(req.user._id);
  
      // If user exists, delete all liked movies
      if (user) {
        user.likedMovies = []; // Set to an empty array
        await user.save();
        res.json({ message: "All liked movies deleted successfully" });
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


/* admin controller */
// get user 
const getUsers = asyncHandler(async(req,res)=>{
    try {
        // find all user in db 
        const users = await User.find({})
        // if user exits send user to client 
            res.json(users)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

//delete user 
// const deleteUser = asyncHandler(async(req,res)=>{
//     try {
//         const user = await User.findById(req.params.id)
//         // if user exists delete user form db 

//         if(user){
//             if(user.isAdmin){
//                 res.status(400)
//                 throw new Error("Admin cannot be deleted")
//             }
//             await user.remove()
//             res.json({message:"User deleted successfully.."})
//         }else{
//             res.status(404);
//             throw new Error("user not found")
//         }
//     } catch (error) {
//         res.status(400).json({message:error.message})
//     }
// })
// const deleteUser = asyncHandler(async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);
  
//       // If user exists, delete user from the database
//       if (user) {
//         if (user.isAdmin) {
//           res.status(400);
//           throw new Error("Admin cannot be deleted");
//         }
  
//         // Use deleteOne() or findByIdAndDelete() to remove the user
//         await User.deleteOne({ _id: user._id }); // or use user.deleteOne()
  
//         res.json({ message: "User deleted successfully" });
//       } else {
//         res.status(404);
//         throw new Error("User not found");
//       }
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });
// const deleteUser = asyncHandler(async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);
  
//       if (user) {
//         // Check if the logged-in user is trying to delete their own profile
//         if (user._id.toString() === req.user._id.toString()) {
//           // Prevent admin users from deleting their own profiles
//           if (req.user.isAdmin) {
//             res.status(400);
//             throw new Error("Admin cannot delete their own profile");
//           }
  
//           // Allow regular users to delete their own profiles
//           await User.deleteOne({ _id: user._id });
//           res.json({ message: "User deleted successfully" });
//         } else if (req.user.isAdmin) {
//           // Allow admin users to delete other users' profiles
//           await User.deleteOne({ _id: user._id });
//           res.json({ message: "User deleted successfully" });
//         } else {
//           // Prevent regular users from deleting other users' profiles
//           res.status(401);
//           throw new Error("Not authorized to delete this profile");
//         }
//       } else {
//         res.status(404);
//         throw new Error("User not found");
//       }
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });
const deleteUser = asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (user) {
        // Check if the logged-in user is trying to delete their own profile
        if (user._id.toString() === req.user._id.toString()) {
          // Prevent admin users from deleting their own profiles
          if (req.user.isAdmin) {
            res.status(400);
            throw new Error("Admin cannot delete their own profile");
          }
  
          // Allow regular users to delete their own profiles
          await User.deleteOne({ _id: user._id });
          res.json({ message: "User deleted successfully" });
        } else if (req.user.isAdmin) {
          // Allow admin users to delete other users' profiles
          await User.deleteOne({ _id: user._id });
          res.json({ message: "User deleted successfully" });
        } else {
          // Prevent regular users from deleting other users' profiles
          res.status(401);
          throw new Error("Not authorized to delete this profile");
        }
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



export { registerUser , loginUser, updateUserProfile, deleteUserProfile, changeUserPassword , getLikedMovies ,addLikedMovie ,deleteLikedMovies, getUsers ,
    deleteUser };
