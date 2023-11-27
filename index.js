const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
const { Animal } = require('./models');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const addAnimal = async (req, res) => {
  try {
    const newAnimal = await Animal.create(req.body);
    res.json(newAnimal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.findAll();
    res.json(animals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAnimalByID = async (req, res) => {
  const { id } = req.params;
  try {
    const animal = await Animal.findByPk(id);
    if (!animal) {
      res.status(404).json({ error: 'Animal not found' });
    } else {
      res.json(animal);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateAnimal = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Animal.update(req.body, {
      where: { id },
    });
    if (updatedRows === 0) {
      res.status(404).json({ error: 'Animal not found' });
    } else {
      res.json({ message: 'Animal updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteAnimal = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Animal.destroy({
      where: { id },
    });
    if (deletedRows === 0) {
      res.status(404).json({ error: 'Animal not found' });
    } else {
      res.json({ message: 'Animal deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

app.get('/', (req, res) => {
    res.send(`
    <html>
    <body>
    <h1>its an application</h1>
    <p>will list all animals soon!</p>
    </body>
    </html>
    `);
  });

// Routes
app.post('/animals', addAnimal);
app.get('/animals', getAnimals);
app.get('/animals/:id', getAnimalByID);
app.put('/animals/:id', updateAnimal);
app.delete('/animals/:id', deleteAnimal);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
