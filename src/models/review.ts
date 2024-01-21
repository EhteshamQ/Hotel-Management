export type Review = {
  _id: string;
  reviewText: string;
  user: { name: string };
  userRating: number;
};
