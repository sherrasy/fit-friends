import { Review } from "@backend/shared/shared-types";

export class ReviewsEntity implements Review {
  public id?:number;
  public userId: number;
  public workoutId: number;
  public rating: number;
  public message: string;
  public createdDate:Date;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  public toObject() {
    return {...this };
  }

  public fillEntity(review: Review) {
    this.id = review.id;
    this.userId = review.userId;
    this.workoutId = review.workoutId;
    this.rating = review.rating;
    this.message = review.message;
    this.createdDate = review.createdDate;
  }
}
