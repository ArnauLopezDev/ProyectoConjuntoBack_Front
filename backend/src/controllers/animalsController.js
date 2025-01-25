// animalsController.js

const animals = []; // Aquí podrías tener una base de datos o algún otro origen de datos

// Obtener todos los animales
exports.getAnimals = (req, res) => {
    res.status(200).json(animals);
};

// Crear un nuevo animal
exports.createAnimal = (req, res) => {
    const { name, species } = req.body;
    const newAnimal = { id: animals.length + 1, name, species };
    animals.push(newAnimal);
    res.status(201).json(newAnimal);
};

// Obtener un animal por ID
exports.getAnimalById = (req, res) => {
    const animal = animals.find(a => a.id === parseInt(req.params.id));
    if (!animal) {
        return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.status(200).json(animal);
};

// Actualizar un animal por ID
exports.updateAnimal = (req, res) => {
    const animal = animals.find(a => a.id === parseInt(req.params.id));
    if (!animal) {
        return res.status(404).json({ message: 'Animal no encontrado' });
    }
    const { name, species } = req.body;
    animal.name = name || animal.name;
    animal.species = species || animal.species;
    res.status(200).json(animal);
};

// Eliminar un animal por ID
exports.deleteAnimal = (req, res) => {
    const index = animals.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Animal no encontrado' });
    }
    animals.splice(index, 1);
    res.status(204).send();
};
