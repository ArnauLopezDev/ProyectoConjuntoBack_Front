// animalModel.js

// Simulando una base de datos simple en memoria
let animals = [];

exports.getAllAnimals = () => {
    return animals;
};

exports.createAnimal = (name, species) => {
    const newAnimal = { id: animals.length + 1, name, species };
    animals.push(newAnimal);
    return newAnimal;
};

exports.getAnimalById = (id) => {
    return animals.find(animal => animal.id === id);
};

exports.updateAnimal = (id, name, species) => {
    const animal = animals.find(a => a.id === id);
    if (animal) {
        animal.name = name || animal.name;
        animal.species = species || animal.species;
        return animal;
    }
    return null;
};

exports.deleteAnimal = (id) => {
    const index = animals.findIndex(a => a.id === id);
    if (index !== -1) {
        animals.splice(index, 1);
        return true;
    }
    return false;
};
