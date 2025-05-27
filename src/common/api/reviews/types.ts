export interface Video {
  id: string;
  videoUrl: string;
  carId: string;
  reviewerId: string;
  createdAt: string;
  videoKey: string;
  likes: number;
  reviewedCar?: {
    id: string;
    name: string;
    brand: string;
    model: string;
    price: number;
    rating: number;
    isCurrentlyRented: boolean;
    images: string[];
    features: string[];
  };
  reviewer?: {
    id: string;
    fullName: string;
    avatar?: string;
  };
}

export interface Review {
  id: string;
  content: string;
  rating: number;
  carId: string;
  reviewerId: string;
  createdAt: string;
}
