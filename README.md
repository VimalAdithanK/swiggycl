# Swiggy Clone - Food Delivery Dashboard

A simple and clean food delivery web application with admin panel built using Vue.js, Tailwind CSS, and Node.js.

## Features

### Customer Dashboard
- Browse food items with beautiful card layout
- Filter food items by category (All, Veg, Non-Veg)
- View food details including price, rating, and preparation time
- Responsive design for all devices

### Admin Panel
- Complete CRUD operations for food items
- Add new food items with all details
- Edit existing food items
- Delete food items with confirmation
- View statistics (Total, Veg, Non-Veg items)
- Filter admin view by category

### API Features
- RESTful API with Express.js
- JSON file-based storage (simple and lightweight)
- CORS enabled for frontend communication
- Input validation and error handling

## Tech Stack

- **Frontend**: Vue.js 3, Vue Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: JSON file (for simplicity)
- **Build Tool**: Vite

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation & Setup

1. **Clone and navigate to the project**
   ```bash
   cd swiggycl
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

   Or use the simple startup script:
   ```bash
   ./start.sh
   ```

   This will start:
   - Frontend on: https://work-1-hcgswrybiapicpzv.prod-runtime.all-hands.dev
   - Backend API on: https://work-2-hcgswrybiapicpzv.prod-runtime.all-hands.dev

### Manual Setup (Alternative)

If the above doesn't work, you can set up manually:

1. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Setup Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Usage

### Customer Interface
1. Open https://work-1-hcgswrybiapicpzv.prod-runtime.all-hands.dev
2. Browse all food items
3. Use filter tabs to view only Veg or Non-Veg items
4. Each food card shows:
   - Food image and category badge
   - Name, restaurant, and description
   - Price, rating, and preparation time

### Admin Panel
1. Navigate to https://work-1-hcgswrybiapicpzv.prod-runtime.all-hands.dev/admin
2. View dashboard with statistics
3. Add new food items using the "Add New Food Item" button
4. Edit existing items by clicking "Edit" in the table
5. Delete items by clicking "Delete" (with confirmation)
6. Filter the admin view using the category tabs

## API Endpoints

- `GET /api/foods` - Get all foods (with optional category filter)
- `GET /api/foods/:id` - Get single food item
- `POST /api/foods` - Create new food item
- `PUT /api/foods/:id` - Update food item
- `DELETE /api/foods/:id` - Delete food item

### Example API Usage

```javascript
// Get all veg foods
GET /api/foods?category=veg

// Create new food item
POST /api/foods
{
  "name": "Paneer Tikka",
  "description": "Grilled paneer with spices",
  "price": 250,
  "category": "veg",
  "restaurant": "Punjabi Dhaba"
}
```

## Project Structure

```
swiggycl/
├── backend/
│   ├── data/
│   │   └── foods.json          # Data storage
│   ├── package.json
│   └── server.js               # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FoodCard.vue    # Food item card
│   │   │   ├── FoodForm.vue    # Add/Edit form
│   │   │   └── FilterTabs.vue  # Category filter
│   │   ├── views/
│   │   │   ├── Home.vue        # Customer dashboard
│   │   │   └── Admin.vue       # Admin panel
│   │   ├── services/
│   │   │   └── api.js          # API service
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── package.json
│   └── vite.config.js
├── package.json                # Root package.json
└── README.md
```

## Food Item Properties

Each food item has the following properties:
- `id`: Unique identifier (auto-generated)
- `name`: Food name (required)
- `description`: Food description (required)
- `price`: Price in rupees (required)
- `category`: "veg" or "non-veg" (required)
- `restaurant`: Restaurant name (required)
- `image`: Image URL (optional, defaults to placeholder)
- `rating`: Rating out of 5 (optional, defaults to 4.0)
- `preparationTime`: Time to prepare (optional, defaults to "20 mins")

## Customization

### Adding New Categories
To add new food categories, update:
1. Backend validation in `server.js`
2. Filter options in `FilterTabs.vue`
3. Category display logic in components

### Styling
- Colors are defined in `tailwind.config.js`
- Custom CSS classes are in `src/style.css`
- Component-specific styles are in individual Vue files

### Database
Currently uses JSON file storage. To use a real database:
1. Replace file operations in `server.js`
2. Add database connection and models
3. Update CRUD operations accordingly

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change ports in `vite.config.js` (frontend) or `server.js` (backend)

2. **CORS errors**
   - Ensure backend is running on port 3001
   - Check API base URL in `src/services/api.js`

3. **Images not loading**
   - Images use Unsplash URLs which require internet connection
   - Fallback images are provided for failed loads

### Development Tips

- Backend auto-restarts on changes (nodemon)
- Frontend has hot reload enabled
- Check browser console for any JavaScript errors
- Check terminal for server errors

## License

This project is for educational purposes. Feel free to use and modify as needed.