export interface User {
  username: string;
  password: string;
  role: 'admin' | 'user';
}

export interface Cat {
  id: string;
  name: string;
  age: number;
  color: string;
  status: 'available' | 'adopted' | 'in_treatment';
  imageUrl: string;
  description: string;
  arrivalDate: string;
}

export interface AdoptionRequest {
  catId: string;
  address: string;
  homeType: string;
  hasOtherPets: boolean;
  otherPetsDetails?: string;
  appointmentDate: string;
  email: string;
  phoneNumber: string;
}