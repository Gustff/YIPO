import React, { useState } from 'react';
import { cats } from '../data/cats';
import { CatCard } from './CatCard';
import { AdoptionCart } from './AdoptionCart';
import { AdoptionForm } from './AdoptionForm';
import { Cat, AdoptionRequest } from '../types';

const CATS_PER_PAGE = 6;

export const CatsGallery: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCats, setSelectedCats] = useState<Cat[]>([]);
  const [selectedCatForForm, setSelectedCatForForm] = useState<Cat | null>(null);
  
  const totalPages = Math.ceil(cats.length / CATS_PER_PAGE);

  const handleAdopt = (id: string) => {
    const cat = cats.find(c => c.id === id);
    if (cat && !selectedCats.some(c => c.id === id)) {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setSelectedCats(selectedCats.filter(cat => cat.id !== id));
  };

  const handleOpenForm = (cat: Cat) => {
    setSelectedCatForForm(cat);
  };

  const handleCloseForm = () => {
    setSelectedCatForForm(null);
  };

  const handleSubmitAdoption = (request: AdoptionRequest) => {
    console.log('Adoption request submitted:', request);
    // Here you would typically send this to your backend
    setSelectedCats(selectedCats.filter(cat => cat.id !== request.catId));
    handleCloseForm();
  };

  const startIndex = (currentPage - 1) * CATS_PER_PAGE;
  const displayedCats = cats.slice(startIndex, startIndex + CATS_PER_PAGE);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Gatitos
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {displayedCats.map((cat) => (
          <CatCard 
            key={cat.id} 
            cat={cat} 
            onAdopt={handleAdopt}
            isSelected={selectedCats.some(c => c.id === cat.id)}
          />
        ))}
      </div>

      <div className="mt-12 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              currentPage === page
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-purple-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <AdoptionCart
        selectedCats={selectedCats}
        onRemove={handleRemoveFromCart}
        onOpenForm={handleOpenForm}
      />

      {selectedCatForForm && (
        <AdoptionForm
          cat={selectedCatForForm}
          onClose={handleCloseForm}
          onSubmit={handleSubmitAdoption}
        />
      )}
    </div>
  );
};