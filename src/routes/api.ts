import { Router } from 'express';
import jetValidator from 'jet-validator';

import adminMw from './middleware/adminMw';
import Paths from './constants/Paths';
import User from '@src/models/User';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import MinRoutes from "@src/routes/MinRoutes";
import app from "@src/server";
const expressListRoutes = require('express-list-routes');


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// **** Setup **** //

const authRouter = Router();

// Login user
authRouter.post(
  Paths.Auth.Login,
  validate('email', 'password'),
  AuthRoutes.login,
);

// Logout user
authRouter.get(
  Paths.Auth.Logout,
  AuthRoutes.logout,
);

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);


// ** Add UserRouter ** //

const userRouter = Router();

// Get all users
userRouter.get(
  Paths.Users.Get,
  UserRoutes.getAll,
);

// Add one user
userRouter.post(
  Paths.Users.Add,
  validate(['user', User.instanceOf]),
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate(['user', User.instanceOf]),
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

// Mindustry router

const mindustryRouter = Router();
mindustryRouter.get(
    Paths.Mindustry.Base,
    MinRoutes.main,
);

mindustryRouter.get(
    Paths.Mindustry.Version,
    MinRoutes.version,
)

mindustryRouter.get(
    Paths.Mindustry.UserTest,
    UserRoutes.getAll,
)
// console.log("stack" + app._router.stack);

console.log("stack2" + Router)
expressListRoutes("router" + Router);



apiRouter.use(Paths.Users.Base, adminMw, userRouter, mindustryRouter);


// **** Export default **** //

export default apiRouter;
