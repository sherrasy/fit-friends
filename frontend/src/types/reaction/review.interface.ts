export interface Review {
  id: number;
  userId: number;
  name?: string;
  avatarPath?: string;
  workoutId: number;
  rating: number;
  message: string;
  createdDate: Date;
}
