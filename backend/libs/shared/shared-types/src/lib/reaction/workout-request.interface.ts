import { StatusRequest } from "../common/status-request.enum";

export interface WorkoutRequest {
  id?: number;
  initiatorId: number;
  userId: number;
  statusRequest: StatusRequest;
  createdDate?: Date;
  updatedDate?: Date;
}
