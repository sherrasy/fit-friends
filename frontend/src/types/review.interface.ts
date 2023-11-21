export interface Review {
  id: number;
  userId: number;
  workoutId: number;
  rating: number;
  message: string;
  createdDate: Date;
}
