import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, PawPrint, Plus } from 'lucide-react';
import { CatsGallery } from './CatsGallery';
import { AddCatForm } from './AddCatForm';
import { Cat } from '../types';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [showAddCatForm, setShowAddCatForm] = useState(false);

  const handleAddCat = (newCat: Omit<Cat, 'id'>) => {
    // Here you would typically send this to your backend
    console.log('New cat:', newCat);
    setShowAddCatForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <PawPrint className="w-8 h-8 text-purple-600" />
              <span className="ml-2 text-xl font-semibold text-gray-800">Cat Shelter</span>
            </div>
            <div className="flex items-center gap-4">
              {user?.role === 'admin' && (
                <button
                  onClick={() => setShowAddCatForm(true)}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Añadir Gatito
                </button>
              )}
              <span className="text-gray-600">Welcome, {user?.username}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        <CatsGallery />
      </main>

      {showAddCatForm && (
        <AddCatForm
          onClose={() => setShowAddCatForm(false)}
          onSubmit={handleAddCat}
        />
      )}
    </div>
  );
};