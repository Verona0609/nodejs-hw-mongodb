import { registerUser } from "../services/user.js";

export async function registerUserController(req, res) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const registeredUser = await registerUser(payload);
  console.log(registeredUser);

  res.status(201).json({
    status: 201,
    message: "Successfully registered a user!",
    data: registeredUser,
  });
}
