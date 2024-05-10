import jwt from "jsonwebtoken";
async function authenticateToken(req, res, next) {
  const token =
    req.headers["authorization"]?.replace("Bearer ", "") ||
    req.cookies?.accessToken;
  if (!token) return res.status(401).json({ msg: "Missing Required Token" });
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    if (error.name == "TokenExpiredError") {
      return res
        .status(401)
        .json({ msg: "Hit this endpoint /api/v1/users/refresh-token" });
    }
    res.status(401).json({ error: error });
  }
}

export { authenticateToken };
