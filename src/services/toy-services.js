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

function getMapApi() {
  return axios.get('//localhost:3030/api/map/').then(res => {
    console.log(res.data);
    return res.data;
  });
}

function query(filterBy = null) {
  return axios.get(API, { params: filterBy }).then(res => res.data);
  // return storageService.query(KEY);
}

function getById(toyId) {
  return axios
    .get(API + toyId)
    .then(res => res.data)
    .catch(err => {
      throw new Error(err);
    });
  // return storageService.get(KEY, toyId);
}

function remove(toyId) {
  return axios.delete(API + toyId).catch(({}) => {
    throw Error(err);
  });
  // return storageService.remove(KEY, toyId);
}

function save(toy) {
  if (!toy._id) return axios.post(API, toy).then(res => res.data);
  //  return storageService.post(KEY, toy);

  return axios
    .put(API + toy._id, toy)
    .then(res => res.data)
    .catch(({ response: { data } }) => {
      throw Error(data);
    });
  // return storageService.put(KEY, toy);
}

function getEmptyToy(name = '', price = 70) {
  return {
    _id: '',
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
  toy._id = utilService.makeId();
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
