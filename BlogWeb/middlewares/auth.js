import jwt from "jsonwebtoken";
function validateAccessToken() {
  return (req, res, next) => {
    const accessTokenValue = req.cookies["accessToken"];
    if (!accessTokenValue) return next();
    try {
      const userPayload = jwt.verify(accessTokenValue, process.env.SECRET_KEY);
      req.user = userPayload;
      next();
    } catch (error) {
      console.log(error);
      if (error.name === "TokenExpiredError") {
        res.clearCookie("accessToken");
        return res.render("homepage", {
          message: "Token Expired",
        });
      } else {
        return res.render("homepage", {
          message: "Invalid token",
        });
      }
    }
  };
}

export { validateAccessToken };
