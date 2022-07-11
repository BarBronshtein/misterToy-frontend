import { utilService } from './util-service.js';
import { storageService } from './async-storage-service.js';
const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
];
const KEY = 'toysDB';
const API = 'api/toy/';

_createToys();

export const toyService = {
  query,
  remove,
  save,
  getEmpyToy,
  getById,
};

function query(filterBy) {
  return storageService.query(KEY);
}

function getById(toyId) {
  return storageService.getById(KEY, toyId);
}

function remove(toyId) {
  return storageService.remove(KEY, toyId);
}

function save(toy) {
  if (!toy._id) return storageService.put(KEY, toy);
  return storageService.post(KEY, toy);
}

function getEmpyToy(name = '', price = 70) {
  return {
    _id: '',
    name,
    price,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: Date.now(),
    inStock: true,
  };
}

function _createToy(name, min, max) {
  const toy = getEmpyToy(name, min, max);
  toy._id = utilService.makeId();
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
}
