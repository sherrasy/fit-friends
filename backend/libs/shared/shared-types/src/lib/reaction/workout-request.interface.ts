import { StatusRequest } from "../common/status-request.enum";

export interface WorkoutRequest {
  id?: string;
  initiatorId: string;
  userId: string;
  statusRequest: StatusRequest;
}
