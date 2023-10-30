import User from "../model/user.model.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup user , login user, logout user , getalluser, getuserbyid, updateuser, deleteuser,
const saltRounds = 10;
//* API for signup for new user

export const Signup = async (req, res) => {
  try {
    const { email, password, phoneNumber, firstname, lastname } = req.body;
    // Check if the email or phone number already exists
    const existingUserByEmail = await User.findOne({ email });
    // const existingUserByNumber = await User.findOne({ phoneNumber });
    // validating if the user is already exist or not
    if (existingUserByEmail) {
      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
      
      // validating if the user entered phone number is already in use or not
      // if (existingUserByNumber) {
      //   return res.status(400).json({
      //     status: false,
      //     message: "Phone number already exists",
      //   });
      // }
    } else {
      // Hash the password and phone number
      const hashPassword = await bycrypt.hash(password, saltRounds);
      // Create a new user with hashed password and number
      const newUser = new User({
        firstname,
        lastname,
        email: email,
        password: hashPassword,
        phoneNumber: phoneNumber,
      });
      // Save the new user
      await newUser.save();
      // Sending user a response
      return res.status(201).json({
        status: true,
        message: "Sign up successful",
      });
    }
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//
///
////
/////

//* API for login api for user
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    // Checking the password of the user
    const correctPassword = await bycrypt.compare(password, user.password);

    if (user && correctPassword) {
      // Generating a JSON Web Token (JWT)
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      // Setting a secure HTTPOnly cookie with the JWT
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        maxAge: 36e5 * 7, // 7 days in milliseconds
        sameSite: "none" || "lax",
        secure: true, // This will only work on https connections
        expiresIn: "1d",
      });

      // Sending user a response
      return res.status(200).json({
        status: true,
        data: {
          _id: user._id,
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
          role: user.role,
        },
        message: "Login Successful",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//
///
////
/////
//* API for logout the user
export const Logout = (req, res) => {
  try {
    // Clear the token cookie by setting its value to null and setting an expired maxAge
    res.clearCookie("token", {
      sameSite: "none",
      path: "/",
      httpOnly: true,
      // secure:true// Set the expiration date to a past date
    });

    return res.status(200).json({
      status: true,
      message: "Logout Successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
//
///
////
/////
//* API for getting all users
export const Getalluser = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      return res.status(200).json({
        status: true,
        data: users,
        message: "Users fetched successfully",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No Users found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//
///
////
/////
//* API for get a specific user using their id
export const GetUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const partiCularUser = await User.findById({ _id: id });
    if (partiCularUser) {
      return res.status(200).json({
        status: true,
        data: {
          _id: partiCularUser._id,
          name: partiCularUser.firstname + "" + partiCularUser.lastname,
          email: partiCularUser.email,
          phoneNumber: partiCularUser.phoneNumber,
          role: partiCularUser.role,
        },
        message: "User fetched successfully",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No User Found with this ID",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
//
///
////
/////
//* API to update the details of a particular user by their id
export const UpdateUserDetailsByID = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "No User found with that Id",
      });
    } else {
      const updateUser = await User.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            ...req.body,
          },
        },
        {
          new: true, //return updated document instead of original one
        }
      );

      if (updateUser) {
        return res.status(201).json({
          status: true,
          message: "User updated sucessfully",
        });
      } else {
        return res.status(404).json({
          status: false,
          message: "Failed to update user",
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
//
///
////
/////
//*API to delete user by its id
export const DeleteUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "No User Found With That ID",
      });
    } else {
      const deleteUser = await User.findByIdAndDelete({ _id: id });
      console.log(deleteUser);
      if (deleteUser) {
        return res.status(200).json({
          status: true,
          data: {
            id: deleteUser._id,
            name: deleteUser.firstname + "" + deleteUser.lastname,
          },
          message: "Deleted Successfully!",
        });
      } else {
        return res.status(404).json({
          status: false,
          message: "Could not find the user with that Id",
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
