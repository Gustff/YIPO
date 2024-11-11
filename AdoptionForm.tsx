import React, { useState } from 'react';
import { Cat, AdoptionRequest } from '../types';
import { X } from 'lucide-react';
import { format, addDays } from 'date-fns';
import emailjs from '@emailjs/browser';

interface AdoptionFormProps {
  cat: Cat;
  onClose: () => void;
  onSubmit: (request: AdoptionRequest) => void;
}

export const AdoptionForm: React.FC<AdoptionFormProps> = ({ cat, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Omit<AdoptionRequest, 'catId'>>({
    address: '',
    homeType: 'house',
    hasOtherPets: false,
    otherPetsDetails: '',
    appointmentDate: '',
    email: '',
    phoneNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Initialize EmailJS with your public key
      emailjs.init("YOUR_PUBLIC_KEY");
      
      // Send email
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          to_email: formData.email,
          cat_name: cat.name,
          appointment_date: format(new Date(formData.appointmentDate), 'dd/MM/yyyy'),
          address: "Albergue de Gatitos, Calle Principal #123",
          contact_phone: "+1234567890"
        }
      );
      
      onSubmit({
        catId: cat.id,
        ...formData,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      // Still submit the form even if email fails
      onSubmit({
        catId: cat.id,
        ...formData,
      });
    }
  };

  // Calculate available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i + 1);
    return format(date, 'yyyy-MM-dd');
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h3 className="text-2xl font-bold mb-6">Adoptar a {cat.name}</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección completa
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de vivienda
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.homeType}
              onChange={(e) => setFormData({ ...formData, homeType: e.target.value })}
            >
              <option value="house">Casa</option>
              <option value="apartment">Apartamento</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.hasOtherPets}
                onChange={(e) => setFormData({ ...formData, hasOtherPets: e.target.checked })}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">¿Tienes otras mascotas?</span>
            </label>
          </div>

          {formData.hasOtherPets && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Detalles de otras mascotas
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={formData.otherPetsDetails}
                onChange={(e) => setFormData({ ...formData, otherPetsDetails: e.target.value })}
                rows={3}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha para recoger al gatito
            </label>
            <select
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.appointmentDate}
              onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
            >
              <option value="">Selecciona una fecha</option>
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {format(new Date(date), 'dd/MM/yyyy')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de teléfono
            </label>
            <input
              type="tel"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Enviar solicitud de adopción
          </button>
        </form>
      </div>
    </div>
  );
};