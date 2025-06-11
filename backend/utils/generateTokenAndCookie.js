import jwt from "jsonwebtoken";
const generateTokenAndCookie = async (res, userId) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return token
  } 
  catch (error) {
    console.log("Error in generating token", error);
    return res
      .status(500)
      .json({ success: false, message: "Error in generating token" });
  }
};

export default generateTokenAndCookie;
