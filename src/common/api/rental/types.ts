export type Rental = {
  carId: string;
  rentedFrom: string;
  rentedTo: string;
  fullName: string;
  tel: string;
  notes?: string;
  createdAt?: string;
};

export type UserRental = {
  id: string;
  carId: string;
  status: "PENDING" | "NOW_RENTED" | "RETURNED";
  rentedFrom: string;
  rentedTo: string;
  totalPrice: number;
  fuelType: string;
  transmission: string;
  car: {
    images: string[];
    name: string;
    brand: string;
    model: string;
    price: number;
    carDetails: {
      mileage: number;
      transmission: string;
      fuelType: string;
      engineSize: number;
      enginePower: number;
      topSpeed: number;
    };
  };
};
