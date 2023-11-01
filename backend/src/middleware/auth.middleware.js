
export const authentication = (req, res, next) => {
  try {
    const user = req.session.user;
    console.log(user)
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Access denied",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const authorization = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(400).json({
        status: false,
        message: "Unauthorized user",
      });
    } else {
      next();
    }
  };
};
