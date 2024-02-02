export interface Game {
  id: number;
  title: String;
  platform: [String];
  reviews: [{ rating: number }];
}
