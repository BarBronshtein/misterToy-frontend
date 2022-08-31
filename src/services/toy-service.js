import { utilService } from './util-service.js';
// import { storageService } from './async-storage-service.js';
import axios from 'axios';

const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered',
];
const KEY = 'toysDB';
const API = '//localhost:3030/api/toy/';
// process.env.NODE_ENV !== 'development'
//   ? '/api/toy/'
//   : '//localhost:3030/api/toy/';

_createToys();

export const toyService = {
  query,
  remove,
  save,
  getEmptyToy,
  getById,
  getLabels,
  getMapApi,
};

async function getMapApi() {
  try {
    const res = await axios.get('//localhost:3030/api/map/');
    return res.data;
  } catch (err) {
    console.error(err);
    // throw new Error('Oops try again later')
  }
}

async function query(filterBy, sortBy) {
  Object.assign(filterBy, { sortBy });
  try {
    const res = await axios.get(API, { params: filterBy });
    return res.data;
  } catch (err) {
    console.error(err);
    // throw new Error('Oops try again later')
  }
}

async function getById(toyId) {
  try {
    const res = await axios.get(API + toyId);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
}

async function remove(toyId) {
  try {
    return await axios.delete(API + toyId);
  } catch (err) {
    throw Error(err);
  }
  // return storageService.remove(KEY, toyId);
}

async function save(toy) {
  try {
    if (!toy._id) {
      const res = await axios.post(API, toy);
      return res.data;
    }
    //  return storageService.post(KEY, toy);

    const res = await axios.put(API + toy._id, toy);
    return res.data;
  } catch ({ response: { data } }) {
    throw Error(data);
  }
  // return storageService.put(KEY, toy);
}

function getEmptyToy(name = '', price = 70) {
  return {
    name,
    price,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: Date.now(),
    inStock: true,
    image: `https://source.unsplash.com/random/?toy${utilService.makeRandNum()}/?toy`,
  };
}

function getLabels() {
  return labels;
}

function _createToy(name, min, max) {
  const toy = getEmptyToy(name, min, max);
  return toy;
}

function _createToys() {
  let toys = utilService.loadFromStorage(KEY);
  if (!toys || !toys.length) {
    toys = [];
    toys.push(_createToy('Mister toy', 137));
    toys.push(_createToy('Dragon toy', 17));
    toys.push(_createToy('Robot', 69));
    toys.push(_createToy('Dancing Cat', 89));
  }
  utilService.saveToStorage(KEY, toys);
}
