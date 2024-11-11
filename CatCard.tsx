import React from 'react';
import { Cat } from '../types';
import { PawPrint } from 'lucide-react';

interface CatCardProps {
  cat: Cat;
  onAdopt: (id: string) => void;
  isSelected: boolean;
}

export const CatCard: React.FC<CatCardProps> = ({ cat, onAdopt, isSelected }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
      <div className="aspect-square overflow-hidden">
        <img
          src={cat.imageUrl}
          alt={cat.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-center mb-2">{cat.name}</h3>
        <div className="space-y-2 text-center">
          <p className="text-gray-600">{cat.age} meses</p>
          <p className="text-gray-600">{cat.description}</p>
          <p className="text-gray-600">{cat.color}</p>
        </div>
        <button
          onClick={() => onAdopt(cat.id)}
          disabled={isSelected}
          className={`mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-full font-medium transition-colors ${
            isSelected
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
          }`}
        >
          <PawPrint className="w-5 h-5" />
          {isSelected ? 'En proceso de adopción' : 'Lo adopto'}
        </button>
      </div>
    </div>
  );
};