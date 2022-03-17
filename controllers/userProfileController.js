const expressAsyncHandler = require("express-async-handler");
const UserProfile = require("../models/userProfileModel");

// Controller to fetch profile data of user
// Protected - GET
// /api/userProfile
const fetchProfile = expressAsyncHandler(async (req, res) => {
  // fetching data
  const profileData = await UserProfile.find({
    user: req.user._id,
  }).populate("user", "-password");

  if (profileData) {
    res.status(201).json({
      message: "fetched Profile Succesfully ",
      data: profileData,
    });
  } else {
    res.status(404).json({
      message: "No Profile Data Found",
    });
  }
});

// Controller to Update Profile Data
// Protected - POST
//  /api/userProfile
const updateProfile = expressAsyncHandler(async (req, res) => {
  const { githubID, linkedinID, education, experience } = req.body;

  if (!githubID || !linkedinID) {
    res.status(401).json({
      message: "Please provide all the necessary data",
    });
  } else {


    // checking in DB if existing data is present
    const profileData = UserProfile.find({
      user: req.user._id,
    });

    if (profileData.user.toString() != req.user._id.toString()) {
      res.status(401);
      throw new Error("You cant perform this action");
    }

    if (profileData) {
      profileData.githubID = githubID || profileData.githubID;
      profileData.linkedinID = linkedinID || profileData.linkedinID;
      profileData.education = education || profileData.education;
      profileData.experience = experience || profileData.experience;

      const updatedProfileData = await profileData.save();

      res.status(201).json({
        message: "Profile Updated Sucessfully",
        data: updatedProfileData,
      });
    } else {
      
    }
  }
});

module.exports = { fetchProfile, updateProfile };
