import express, { Application, Request, Response, NextFunction } from "express";
import * as userController from "../db/controllers/user.controller"

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): object => {
    return res.json({ status: "success", message: "Hello World !" });
  }
);

app.get("/userInfo/:userId", userController.getUser)

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Invalid route");
  next(error);
});

app.use((error: { message: string; status: number }, req: Request, res: Response,next: NextFunction
  ) => {
    res.status(error.status || 500);
    res.json({
      status: "error",
      message: error.message
    });
    next();
  }
);

export {app}