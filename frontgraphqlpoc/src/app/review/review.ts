export interface Review {
  id: number;
  rating: number;
  content: string;
  author: {
    name: string;
  };
  game: {
    title: string;
  };
}
