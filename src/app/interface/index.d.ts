// building an type definition file to inject an property in express request interface, (interface can be merge);

// user can be found in all controllers

import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
