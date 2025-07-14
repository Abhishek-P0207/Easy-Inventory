import React from 'react';
import { Package, Eye, Trash2, Plus, Warehouse } from 'lucide-react';

const SpacesList = ({ 
  spaces, 
  onSpaceSelect, 
  onDeleteSpace, 
  onCreateSpace 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="flex items-center">
            <div className="bg-blue-600 p-3 rounded-lg mr-4">
              <Warehouse className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-1">Easy Inventory</h1>
              <p className="text-gray-600">Manage your inventory spaces efficiently</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={onCreateSpace}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Space
          </button>
        </div>

        {spaces.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No inventory spaces yet</h3>
            <p className="text-gray-600 mb-6">Create your first inventory space to get started</p>
            <button
              onClick={onCreateSpace}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create First Space
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map(space => (
              <div key={space._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{space.name}</h3>
                        <p className="text-sm text-gray-500">{space.type}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{space.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>📍 {space.location}</span>
                    <span>{space.itemCount || 0} items</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSpaceSelect(space)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Eye className="h-4 w-4 inline mr-2" />
                      View
                    </button>
                    <button
                      onClick={() => onDeleteSpace(space._id)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpacesList; 