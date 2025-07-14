# Easy Inventory - Modular MongoDB Application

A modern, modular inventory management system built with React, Node.js, Express, and MongoDB.

## Features

- **Modular Architecture**: Clean separation of concerns with reusable components
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Real-time Updates**: Live inventory tracking and updates
- **Responsive Design**: Modern UI with Tailwind CSS
- **Search Functionality**: Filter items by name or category
- **Low Stock Alerts**: Automatic notifications for items below minimum stock
- **Statistics Dashboard**: Overview of inventory metrics

## Project Structure

```
├── server/                 # Backend API
│   ├── index.js           # Express server setup
│   ├── models/            # MongoDB schemas
│   │   ├── Space.js       # Space model
│   │   └── Item.js        # Item model
│   └── routes/            # API routes
│       ├── spaces.js      # Space CRUD operations
│       └── items.js       # Item CRUD operations
├── src/                   # Frontend React app
│   ├── components/        # Reusable components
│   │   ├── SpacesList.jsx
│   │   ├── SpaceDetail.jsx
│   │   ├── CreateSpaceModal.jsx
│   │   └── CreateItemModal.jsx
│   ├── services/          # API services
│   │   ├── api.js         # Axios configuration
│   │   ├── spaceService.js
│   │   └── itemService.js
│   ├── App.jsx            # Main application component
│   └── main.jsx           # React entry point
└── package.json           # Dependencies and scripts
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd easy-inventory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/easy-inventory
   PORT=5000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or use MongoDB Atlas.

## Running the Application

### Development Mode (Frontend + Backend)
```bash
npm run dev:full
```

### Frontend Only
```bash
npm run dev
```

### Backend Only
```bash
npm run server
```

### Production Build
```bash
npm run build
```

## API Endpoints

### Spaces
- `GET /api/spaces` - Get all spaces
- `GET /api/spaces/:id` - Get single space
- `POST /api/spaces` - Create new space
- `PUT /api/spaces/:id` - Update space
- `DELETE /api/spaces/:id` - Delete space

### Items
- `GET /api/items/space/:spaceId` - Get items by space
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `PATCH /api/items/:id/quantity` - Update item quantity
- `DELETE /api/items/:id` - Delete item

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
