# 🍕 Swiggy Clone - Complete Setup Guide

## 📋 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
cd swiggycl
npm run install:all
npm run dev
```

### Option 2: Using Startup Script
```bash
cd swiggycl
./start.sh
```

## 🌐 Access URLs

- **Customer Dashboard**: https://work-1-hcgswrybiapicpzv.prod-runtime.all-hands.dev
- **Admin Panel**: https://work-1-hcgswrybiapicpzv.prod-runtime.all-hands.dev/admin
- **API Endpoint**: https://work-2-hcgswrybiapicpzv.prod-runtime.all-hands.dev

## 🔧 Manual Setup (If needed)

### 1. Install Dependencies
```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 2. Start Backend API
```bash
cd backend
node server.js
# Backend runs on port 12001
```

### 3. Start Frontend
```bash
cd frontend
npm run dev
# Frontend runs on port 12000 (or next available port)
```

## ✨ Features

### Customer Interface
- ✅ Browse all food items
- ✅ Filter by Veg/Non-Veg categories
- ✅ Responsive design with Tailwind CSS
- ✅ Food cards with images, ratings, and details

### Admin Panel
- ✅ Dashboard with statistics
- ✅ Add new food items
- ✅ Edit existing items
- ✅ Delete items with confirmation
- ✅ Filter admin view by category

### API Features
- ✅ RESTful API with CRUD operations
- ✅ JSON file-based storage
- ✅ Category filtering
- ✅ CORS enabled for frontend integration

## 🛠 Technology Stack

- **Frontend**: Vue.js 3, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Storage**: JSON file-based
- **Styling**: Tailwind CSS with custom components

## 📁 Project Structure

```
swiggycl/
├── backend/
│   ├── server.js          # Express API server
│   ├── data/
│   │   └── foods.json     # Food items storage
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Vue components
│   │   ├── views/         # Page views
│   │   ├── services/      # API service
│   │   └── router/        # Vue Router
│   └── package.json
├── package.json           # Root package with scripts
├── start.sh              # Startup script
└── README.md
```

## 🔄 API Endpoints

- `GET /api/health` - Health check
- `GET /api/foods` - Get all foods
- `GET /api/foods?category=veg` - Get vegetarian foods
- `GET /api/foods?category=non-veg` - Get non-vegetarian foods
- `POST /api/foods` - Add new food item
- `PUT /api/foods/:id` - Update food item
- `DELETE /api/foods/:id` - Delete food item

## 🚀 Sample Data

The application comes with 6 pre-loaded food items:
- 3 Vegetarian items (Paneer Butter Masala, Margherita Pizza, Dal Tadka)
- 3 Non-Vegetarian items (Chicken Biryani, Fish Curry, Mutton Rogan Josh)

## 🛑 Stopping the Application

```bash
pkill -f "node server.js" && pkill -f "vite"
```

## 🐛 Troubleshooting

### Port Issues
If ports are in use, the application will automatically find the next available port.

### API Connection Issues
Make sure the backend is running before starting the frontend.

### Dependencies Issues
Run `npm run install:all` to install all dependencies.

## 📝 Development Notes

- The application uses JSON file storage for simplicity
- All data persists between restarts
- The frontend automatically handles API errors
- Responsive design works on all screen sizes