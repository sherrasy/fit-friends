export interface Review {
  id?: string;
  userId: string;
  workoutId: string;
  rating: number;
  message: string;
}
