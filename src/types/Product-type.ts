export type ProductType = {
  _id: number;
  title: string;
  price: number;
  description?: string;
  image: string;
  isFavorite: boolean;
  rating: number;
  category: string;
};
