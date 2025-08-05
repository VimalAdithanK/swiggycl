#!/bin/bash

echo "🍕 Starting Swiggy Clone Application..."

# Kill any existing processes
pkill -f "node server.js" 2>/dev/null
pkill -f "vite" 2>/dev/null

# Wait a moment
sleep 2

echo "📦 Starting Backend API on port 12001..."
cd backend && node server.js &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

echo "🌐 Starting Frontend on port 12000..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Application started successfully!"
echo ""
echo "🔗 Access the application:"
echo "   Customer Dashboard: https://work-1-hcgswrybiapicpzv.prod-runtime.all-hands.dev"
echo "   Admin Panel: https://work-1-hcgswrybiapicpzv.prod-runtime.all-hands.dev/admin"
echo "   API: https://work-2-hcgswrybiapicpzv.prod-runtime.all-hands.dev"
echo ""
echo "📊 Features:"
echo "   ✓ Browse food items with veg/non-veg filtering"
echo "   ✓ Admin panel with full CRUD operations"
echo "   ✓ Responsive design with Tailwind CSS"
echo "   ✓ RESTful API with JSON storage"
echo ""
echo "🛑 To stop the application, run: pkill -f 'node server.js' && pkill -f 'vite'"
echo ""

# Keep script running
wait