import { StatusRequest } from "../common/status-request.enum";

export interface WorkoutRequest {
  _id?: string;
  initiatorId: string;
  userId: string;
  statusRequest: StatusRequest;
}
