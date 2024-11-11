import React from 'react';
import { PawPrint, X } from 'lucide-react';
import { Cat } from '../types';

interface AdoptionCartProps {
  selectedCats: Cat[];
  onRemove: (id: string) => void;
  onOpenForm: (cat: Cat) => void;
}

export const AdoptionCart: React.FC<AdoptionCartProps> = ({
  selectedCats,
  onRemove,
  onOpenForm,
}) => {
  if (selectedCats.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 w-72">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PawPrint className="w-5 h-5 text-purple-600" />
          <span className="font-semibold">Adopciones ({selectedCats.length})</span>
        </div>
      </div>
      <div className="space-y-3">
        {selectedCats.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
            <span>{cat.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => onOpenForm(cat)}
                className="text-purple-600 hover:text-purple-700 text-sm"
              >
                Completar datos
              </button>
              <button
                onClick={() => onRemove(cat.id)}
                className="text-red-500 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};