import React, { useState } from 'react';
import { Cat } from '../types';
import { X, Upload } from 'lucide-react';

interface AddCatFormProps {
  onClose: () => void;
  onSubmit: (cat: Omit<Cat, 'id'>) => void;
}

export const AddCatForm: React.FC<AddCatFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    color: '',
    description: '',
    imageUrl: '',
    status: 'available' as const,
    arrivalDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h3 className="text-2xl font-bold mb-6">Añadir Nuevo Gatito</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Edad (meses)
            </label>
            <input
              type="number"
              required
              min="0"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL de la imagen
            </label>
            <input
              type="url"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Cat['status'] })}
            >
              <option value="available">Disponible</option>
              <option value="in_treatment">En tratamiento</option>
              <option value="adopted">Adoptado</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Añadir Gatito
          </button>
        </form>
      </div>
    </div>
  );
};