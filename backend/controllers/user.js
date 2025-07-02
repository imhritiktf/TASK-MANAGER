import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .select('name email role');
      
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};