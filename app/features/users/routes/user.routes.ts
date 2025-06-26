import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { allowSelfOrAdmin } from "../middleware/user.idChecks";
import { routeProtector } from "../../../global_middleware/route.protect";
import { authorize } from "../../../global_middleware/authorize";

const userRouter = Router();
const adminRouter = Router();

userRouter.use(routeProtector);
adminRouter.use(routeProtector);

// user & organizer or Admin
userRouter.route('/:id')
          .get(allowSelfOrAdmin, userController.getUser)
          .put(allowSelfOrAdmin, userController.updateUser)
          .delete(allowSelfOrAdmin, userController.deleteUser)

// Admin
adminRouter.use(authorize('ADMIN'));

adminRouter.route('/')
           .get(userController.getAllUsers)
           .delete(userController.deleteSomeUsers)

export {userRouter, adminRouter};
