import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  //Verify token
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }

    req.user = user;
    next();
  });
};

//VERIFY TOKEN AND USER
//sau khi verify token thi verivy user de xac nhan user do co quyen lam nhung gi?
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    //Neu khong phai la admin thi chi duoc hanh dong tren tk cua minh, neu la admin co the hanh dong tat ca
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

//VERIFY ADMIN
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
