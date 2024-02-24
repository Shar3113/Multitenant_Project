// contollers/userController.js
import  bcrypt  from 'bcryptjs';
import  UserModel  from '../models/User.js';

const createUser = async (req, res) => {
  const { name, email, password, tenantid} = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);


    let newUser = {
      name : name,
      email :email,
      password: hashedPassword,
      tenantid: tenantid
    }

    const user = await UserModel.create(newUser);

    res.status(201).json(user);
  } catch (error) {
    console.log('createUser Error =>', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export default  createUser ;
