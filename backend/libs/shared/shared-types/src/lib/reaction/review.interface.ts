export interface Review {
  _id?: string;
  userId: string;
  workoutId: string;
  rating: number;
  message: string;
}
