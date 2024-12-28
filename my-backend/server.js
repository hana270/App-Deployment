// my-backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let categories = [
  { id: 1, name: "Sport", description: "Sport smartwatches" },
  { id: 2, name: "Luxury", description: "Premium smartwatches" }
];

let smartwatches = [
  {
    id: 1,
    name: "T400 Plus",
    categoryId: 1,
    price: 199.99,
    image: "https://media.mykenza.tn/uploads/2023/01/Smartwatch-T400-plus-Watch-7-Noir-Homme-et-Femme-prix-Tunisie.jpg"
  },
  {
    id: 2,
    name: "T550 Rose",
    categoryId: 2,
    price: 299.99,
    image: "https://spacenet.tn/160098-large_default/montre-connectee-t550-rose.jpg"
  }
];

// Category endpoints
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.post('/api/categories', (req, res) => {
  const newCategory = {
    id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
    name: req.body.name,
    description: req.body.description
  };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

app.put('/api/categories/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = categories.findIndex(c => c.id === id);
  if (index !== -1) {
    categories[index] = { ...categories[index], ...req.body };
    res.json(categories[index]);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

app.delete('/api/categories/:id', (req, res) => {
  const id = parseInt(req.params.id);
  categories = categories.filter(c => c.id !== id);
  res.status(204).send();
});

// Smartwatch endpoints
app.get('/api/smartwatches', (req, res) => {
  const watchesWithCategories = smartwatches.map(watch => ({
    ...watch,
    category: categories.find(c => c.id === watch.categoryId)?.name || 'Unknown'
  }));
  res.json(watchesWithCategories);
});

app.post('/api/smartwatches', (req, res) => {
  const newWatch = {
    id: smartwatches.length > 0 ? Math.max(...smartwatches.map(w => w.id)) + 1 : 1,
    name: req.body.name,
    categoryId: parseInt(req.body.categoryId),
    price: parseFloat(req.body.price),
    image: req.body.image
  };
  smartwatches.push(newWatch);
  res.status(201).json(newWatch);
});

app.put('/api/smartwatches/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = smartwatches.findIndex(w => w.id === id);
  if (index !== -1) {
    smartwatches[index] = { ...smartwatches[index], ...req.body };
    res.json(smartwatches[index]);
  } else {
    res.status(404).json({ message: 'Smartwatch not found' });
  }
});

app.delete('/api/smartwatches/:id', (req, res) => {
  const id = parseInt(req.params.id);
  smartwatches = smartwatches.filter(w => w.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
