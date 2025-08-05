const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 12001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const dataFile = path.join(__dirname, 'data', 'foods.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFile)) {
  const initialData = {
    foods: [
      {
        id: uuidv4(),
        name: "Paneer Butter Masala",
        description: "Rich and creamy paneer curry with butter and spices",
        price: 280,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
        category: "veg",
        restaurant: "Punjabi Dhaba",
        rating: 4.5,
        preparationTime: "25 mins"
      },
      {
        id: uuidv4(),
        name: "Chicken Biryani",
        description: "Aromatic basmati rice with tender chicken pieces",
        price: 350,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400",
        category: "non-veg",
        restaurant: "Biryani House",
        rating: 4.7,
        preparationTime: "35 mins"
      },
      {
        id: uuidv4(),
        name: "Margherita Pizza",
        description: "Classic pizza with fresh mozzarella and basil",
        price: 320,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
        category: "veg",
        restaurant: "Pizza Corner",
        rating: 4.3,
        preparationTime: "20 mins"
      },
      {
        id: uuidv4(),
        name: "Fish Curry",
        description: "Spicy and tangy fish curry with coconut milk",
        price: 380,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
        category: "non-veg",
        restaurant: "Coastal Kitchen",
        rating: 4.6,
        preparationTime: "30 mins"
      },
      {
        id: uuidv4(),
        name: "Dal Tadka",
        description: "Yellow lentils tempered with cumin and spices",
        price: 180,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
        category: "veg",
        restaurant: "Home Kitchen",
        rating: 4.2,
        preparationTime: "15 mins"
      },
      {
        id: uuidv4(),
        name: "Mutton Rogan Josh",
        description: "Tender mutton cooked in aromatic Kashmiri spices",
        price: 450,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
        category: "non-veg",
        restaurant: "Kashmir Kitchen",
        rating: 4.8,
        preparationTime: "45 mins"
      }
    ]
  };
  fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
}

// Helper functions
const readData = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { foods: [] };
  }
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// Routes

// Get all foods with optional category filter
app.get('/api/foods', (req, res) => {
  try {
    const data = readData();
    const { category } = req.query;
    
    let foods = data.foods;
    
    if (category && (category === 'veg' || category === 'non-veg')) {
      foods = foods.filter(food => food.category === category);
    }
    
    res.json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get single food item
app.get('/api/foods/:id', (req, res) => {
  try {
    const data = readData();
    const food = data.foods.find(f => f.id === req.params.id);
    
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food item not found' });
    }
    
    res.json({ success: true, data: food });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create new food item
app.post('/api/foods', (req, res) => {
  try {
    const { name, description, price, image, category, restaurant, rating, preparationTime } = req.body;
    
    if (!name || !description || !price || !category || !restaurant) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, description, price, category, and restaurant are required' 
      });
    }
    
    if (category !== 'veg' && category !== 'non-veg') {
      return res.status(400).json({ 
        success: false, 
        message: 'Category must be either "veg" or "non-veg"' 
      });
    }
    
    const data = readData();
    const newFood = {
      id: uuidv4(),
      name,
      description,
      price: parseFloat(price),
      image: image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
      category,
      restaurant,
      rating: rating || 4.0,
      preparationTime: preparationTime || '20 mins'
    };
    
    data.foods.push(newFood);
    writeData(data);
    
    res.status(201).json({ success: true, data: newFood });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update food item
app.put('/api/foods/:id', (req, res) => {
  try {
    const data = readData();
    const foodIndex = data.foods.findIndex(f => f.id === req.params.id);
    
    if (foodIndex === -1) {
      return res.status(404).json({ success: false, message: 'Food item not found' });
    }
    
    const { name, description, price, image, category, restaurant, rating, preparationTime } = req.body;
    
    if (category && category !== 'veg' && category !== 'non-veg') {
      return res.status(400).json({ 
        success: false, 
        message: 'Category must be either "veg" or "non-veg"' 
      });
    }
    
    const updatedFood = {
      ...data.foods[foodIndex],
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(image && { image }),
      ...(category && { category }),
      ...(restaurant && { restaurant }),
      ...(rating && { rating: parseFloat(rating) }),
      ...(preparationTime && { preparationTime })
    };
    
    data.foods[foodIndex] = updatedFood;
    writeData(data);
    
    res.json({ success: true, data: updatedFood });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete food item
app.delete('/api/foods/:id', (req, res) => {
  try {
    const data = readData();
    const foodIndex = data.foods.findIndex(f => f.id === req.params.id);
    
    if (foodIndex === -1) {
      return res.status(404).json({ success: false, message: 'Food item not found' });
    }
    
    data.foods.splice(foodIndex, 1);
    writeData(data);
    
    res.json({ success: true, message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});