import User from "../models/UserTest.js";

//create
export const createUser = async (req, res, next) => {
  try {
    const newUser = new User({
      ...req.body,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

//GETALL
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//UPDATE
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

//DELETE
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Delete success");
  } catch (error) {
    next(error);
  }
};
