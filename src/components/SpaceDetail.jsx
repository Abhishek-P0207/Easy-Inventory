import React from 'react';
import { Package, AlertTriangle, TrendingUp, Eye, Search, Plus, Warehouse } from 'lucide-react';

const SpaceDetail = ({ 
  space, 
  items, 
  searchTerm, 
  onBack, 
  onSearchChange, 
  onAddItem,
  onUpdateQuantity,
  onDeleteItem 
}) => {
  const getLowStockItems = () => {
    return items.filter(item => item.quantity <= item.minStock);
  };

  const getTotalValue = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const getTopCategories = () => {
    const categories = {};
    items.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + item.quantity;
    });
    return Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const getFilteredItems = () => {
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const lowStockItems = getLowStockItems();
  const totalValue = getTotalValue();
  const topCategories = getTopCategories();
  const filteredItems = getFilteredItems();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="bg-blue-600 p-3 rounded-lg mr-4">
                <Warehouse className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{space.name}</h1>
                <p className="text-gray-600">{space.description}</p>
                <p className="text-sm text-gray-500">
                  {space.type.charAt(0).toUpperCase() + space.type.slice(1)} • {space.location}
                </p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Spaces
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Items</p>
                  <p className="text-2xl font-bold text-blue-900">{items.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Low Stock</p>
                  <p className="text-2xl font-bold text-red-900">{lowStockItems.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Total Value</p>
                  <p className="text-2xl font-bold text-green-900">${totalValue.toFixed(2)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Categories</p>
                  <p className="text-2xl font-bold text-purple-900">{topCategories.length}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {lowStockItems.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="font-semibold text-red-800">Items to Restock</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {lowStockItems.map(item => (
                <div key={item._id} className="bg-white p-3 rounded border border-red-200">
                  <p className="font-medium text-red-900">{item.name}</p>
                  <p className="text-sm text-red-700">
                    Current: {item.quantity} | Min: {item.minStock}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Inventory Items</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={onAddItem}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Quantity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Min Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Supplier</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        {item.description && (
                          <p className="text-sm text-gray-500">{item.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item._id, e.target.value)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-700">{item.minStock}</td>
                    <td className="py-3 px-4 text-gray-700">${item.price.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-700">{item.supplier}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => onDeleteItem(item._id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No items found in this space.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail; 