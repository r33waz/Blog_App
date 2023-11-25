import express from "express";
import {
  DeleteUserByID,
  GetUserById,
  Getalluser,
  Login,
  Logout,
  Signup,
  UpdateUserDetailsByID,
} from "../controller/user.controller.js";
import {
  authentication,
  authorization,
} from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: API to log in a user and create a session.
 *     description: API that handles the login of the user and creates a session.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: thapa22555@gmail.com
 *               password: riwaz@@@
 *     responses:
 *       200:
 *         description: User logged in successfully, session created.
 *       401:
 *         description: Unauthorized - Authentication failed
 */
router.post("/login", Login);
/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     summary: API to signup user.
 *     description: API that handles the signup of the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               phonenumber:
 *                 type:string
 *               password:
 *                 type: string
 *             example:
 *              firstname: Riwaj
 *              lastname: Thapa
 *              email: thapa2@gmail.com
 *              phonenumer: 9861496098
 *              password: riwaz@@@
 *     responses:
 *       200:
 *         description: User signup successfully
 *       401:
 *         description: Email already exist
 */
router.post("/signup", Signup);
/**
 * @swagger
 * /api/v1/logout:
 *   post:
 *     summary: API to log out a user and end the session.
 *     description: API that handles the logout of the user and ends the session.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *             example:
 *               sessionId: abcdef1234567890
 *     responses:
 *       200:
 *         description: User logged out successfully, session ended.
 *       401:
 *         description: Unauthorized - Authentication failed
 */
router.post("/logout", Logout);

////
/**
 * @swagger
 * /api/v1/getalluser:
 *   get:
 *     summary: API to get all users in the system.
 *     description: API that handles getting all users in the system.
 *     parameters:
 *       - in: header
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The session ID for authentication.
 *     responses:
 *       200:
 *         description: Users fetched successfully.
 *       401:
 *         description: Unauthorized - Authentication failed
 */

router.get("/getalluser", authentication,authorization("admin"), Getalluser);
/**
 * @swagger
 * /api/v1/getalluser/{id}:
 *   get:
 *     summary: API to get a user by ID.
 *     description: API that handles getting a user by ID.
 *     parameters:
 *       - in: header
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The session ID for authentication.
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: User fetched successfully.
 *       401:
 *         description: Unauthorized - Authentication failed
 */
router.get("/getalluser/:id", authentication, GetUserById);
/**
 * @swagger
 * /api/v1/updateuser/{id}:
 *   patch:
 *     summary: API to update a user by ID.
 *     description: API that handles updating a user by ID.
 *     parameters:
 *       - in: header
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The session ID for authentication.
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update.
 *     requestBody:
 *       description: User data to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               phonenumber:
 *                 type: string
 *               password:
 *                 type: string
 *           examples:
 *             example1:
 *               value:
 *                 firstname: Riwaj
 *                 lastname: Thapa
 *                 email: thapa2@gmail.com
 *                 phonenumber: 9861496098
 *                 password: riwaz@@@
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       401:
 *         description: Unauthorized - Authentication failed
 */
router.patch("/updateuser/:id", authentication, UpdateUserDetailsByID);
router.delete(
  "/deleteuser/:id",
  authentication,
  authorization("admin"),
  DeleteUserByID
);

export default router;
