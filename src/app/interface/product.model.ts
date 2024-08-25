export interface Image {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Product {
  addedToCart: boolean;
  quantity: number;
  image: Image;
  name: string;
  category: string;
  price: number;
}
