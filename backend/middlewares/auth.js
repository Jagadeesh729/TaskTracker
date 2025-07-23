const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Please Login to continue" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Format to DD/MM/YYYY
    const formatDate = (timestamp) => {
      const d = new Date(timestamp * 1000);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    decoded.issuedAt = decoded.iat ? formatDate(decoded.iat) : null;
    decoded.expiresAt = decoded.exp ? formatDate(decoded.exp) : null;

    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    console.log(err.message);
    if (err.message === "jwt expired") {
      return res.status(401).json({ message: "Please Login to continue" });
    }
    res.status(500).json({ message: err.message });
  }
};

module.exports = verifyToken;
