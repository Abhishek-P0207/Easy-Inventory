import React, { useState, useEffect } from 'react';
import SpacesList from './components/SpacesList.jsx';
import SpaceDetail from './components/SpaceDetail.jsx';
import CreateSpaceModal from './components/CreateSpaceModal.jsx';
import CreateItemModal from './components/CreateItemModal.jsx';
import { spaceService } from './services/spaceService.js';
import { itemService } from './services/itemService.js';

function App() {
  const [spaces, setSpaces] = useState([]);
  const [currentSpace, setCurrentSpace] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [showCreateSpace, setShowCreateSpace] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  
  // Form states
  const [spaceForm, setSpaceForm] = useState({
    name: '',
    description: '',
    type: 'warehouse',
    location: ''
  });
  
  const [itemForm, setItemForm] = useState({
    name: '',
    category: '',
    quantity: 0,
    minStock: 0,
    price: 0,
    supplier: '',
    description: ''
  });
  
  const [searchTerm, setSearchTerm] = useState('');

  // Load spaces on component mount
  useEffect(() => {
    loadSpaces();
  }, []);

  // Load items when current space changes
  useEffect(() => {
    if (currentSpace) {
      loadItems(currentSpace._id);
    }
  }, [currentSpace]);

  const loadSpaces = async () => {
    try {
      setLoading(true);
      const spacesData = await spaceService.getAllSpaces();
      setSpaces(spacesData);
    } catch (err) {
      setError('Failed to load spaces');
      console.error('Error loading spaces:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadItems = async (spaceId) => {
    try {
      const itemsData = await itemService.getItemsBySpace(spaceId);
      setItems(itemsData);
    } catch (err) {
      setError('Failed to load items');
      console.error('Error loading items:', err);
    }
  };

  const handleCreateSpace = async () => {
    try {
      if (!spaceForm.name || !spaceForm.location) return;
      
      const newSpace = await spaceService.createSpace(spaceForm);
      setSpaces([newSpace, ...spaces]);
      setSpaceForm({ name: '', description: '', type: 'warehouse', location: '' });
      setShowCreateSpace(false);
    } catch (err) {
      setError('Failed to create space');
      console.error('Error creating space:', err);
    }
  };

  const handleAddItem = async () => {
    try {
      if (!itemForm.name || !itemForm.category) return;
      
      const newItem = await itemService.createItem({
        ...itemForm,
        spaceId: currentSpace._id,
        quantity: parseInt(itemForm.quantity) || 0,
        minStock: parseInt(itemForm.minStock) || 0,
        price: parseFloat(itemForm.price) || 0
      });
      
      setItems([newItem, ...items]);
      setItemForm({ name: '', category: '', quantity: 0, minStock: 0, price: 0, supplier: '', description: '' });
      setShowAddItem(false);
    } catch (err) {
      setError('Failed to add item');
      console.error('Error adding item:', err);
    }
  };

  const handleDeleteSpace = async (spaceId) => {
    try {
      await spaceService.deleteSpace(spaceId);
      setSpaces(spaces.filter(space => space._id !== spaceId));
      if (currentSpace && currentSpace._id === spaceId) {
        setCurrentSpace(null);
        setItems([]);
      }
    } catch (err) {
      setError('Failed to delete space');
      console.error('Error deleting space:', err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await itemService.deleteItem(itemId);
      setItems(items.filter(item => item._id !== itemId));
    } catch (err) {
      setError('Failed to delete item');
      console.error('Error deleting item:', err);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      const updatedItem = await itemService.updateItemQuantity(itemId, newQuantity);
      setItems(items.map(item => 
        item._id === itemId ? updatedItem : item
      ));
    } catch (err) {
      setError('Failed to update quantity');
      console.error('Error updating quantity:', err);
    }
  };

  const handleSpaceFormChange = (e) => {
    const { name, value } = e.target;
    setSpaceForm(prev => ({ ...prev, [name]: value }));
  };

  const handleItemFormChange = (e) => {
    const { name, value } = e.target;
    setItemForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSpaceSelect = (space) => {
    setCurrentSpace(space);
    setSearchTerm('');
  };

  const handleBackToSpaces = () => {
    setCurrentSpace(null);
    setItems([]);
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              loadSpaces();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {currentSpace ? (
        <SpaceDetail
          space={currentSpace}
          items={items}
          searchTerm={searchTerm}
          onBack={handleBackToSpaces}
          onSearchChange={setSearchTerm}
          onAddItem={() => setShowAddItem(true)}
          onUpdateQuantity={handleUpdateQuantity}
          onDeleteItem={handleDeleteItem}
        />
      ) : (
        <SpacesList
          spaces={spaces}
          onSpaceSelect={handleSpaceSelect}
          onDeleteSpace={handleDeleteSpace}
          onCreateSpace={() => setShowCreateSpace(true)}
        />
      )}

      <CreateSpaceModal
        isOpen={showCreateSpace}
        onClose={() => setShowCreateSpace(false)}
        formData={spaceForm}
        onFormChange={handleSpaceFormChange}
        onSubmit={handleCreateSpace}
      />

      <CreateItemModal
        isOpen={showAddItem}
        onClose={() => setShowAddItem(false)}
        formData={itemForm}
        onFormChange={handleItemFormChange}
        onSubmit={handleAddItem}
      />
    </div>
  );
}

export default App;
