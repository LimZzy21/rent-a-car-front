export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  rating: number;
  isCurrentlyRented: boolean;
  createdAt: string; 
  images: string[];
  features: string[];
  carDetails?: CarDetails;
}

export interface CarDetails {
  carId: string;
  fuelType: string;
  topSpeed: number;
  acceleration: number;
  transmission: string;
  mileage: number;
  engineSize: number;
  enginePower: number;
  [key: string]: string | number;
}

export interface ApiResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CarFilters {
  brand?: string;
  isCurrentlyRented?: boolean;
  model?: string;
  name?: string;
  price?: number;
  fuelType?: string;
  transmission?: string;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'name' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}

export interface DashboardData {
  totalCars: number;
  totalUsers: number;
  totalRentals: number;
  activeRentals: number;
}

// export interface User {
//   id: string;
// }

// export interface CarReview {
//   id: string;
//   videoUrl: string;
//   carId: string;
//   reviewerId: string;
//   createdAt: string; 
//   videoKey: string;
//   reviewedCar?: Car;
//   reviewer?: User;
// }
