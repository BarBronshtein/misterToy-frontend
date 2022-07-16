import axios from 'axios';
axios.defaults.withCredentials = true;

export const userService = {
  removeUser,
  getUsers,
  getUserById,
  updateUser,
};

const API = '/api/user/';

async function getUsers(filterBy = null) {
  try {
    const res = await axios.get(API, { params: filterBy });
    return res.data;
  } catch (err) {
    console.log(err);
    console.error('Something went wrong try again later');
  }
}

async function getUserById(userId) {
  try {
    const res = await axios.get(API + userId);
    return res.data;
  } catch (err) {
    console.log(err);
    console.error('Something went wrong try again later');
  }
}
async function updateUser(user) {
  try {
    const res = await axios.put(API + user._id, user);
    return res.data;
  } catch (err) {
    console.log(err);
    console.error('Something went wrong try again later');
  }
}
async function removeUser(userId) {
  try {
    await axios.delete(API + userId);
  } catch (err) {
    console.log(err);
    console.error('Something went wrong try again later');
  }
}
