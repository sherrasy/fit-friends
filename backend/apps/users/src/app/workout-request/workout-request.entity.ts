import { StatusRequest, WorkoutRequest } from "@backend/shared/shared-types";

  export class WorkoutRequestEntity implements WorkoutRequest {
    public id?:number;
    public userId: number;
    public initiatorId: number;
    public statusRequest: StatusRequest;
    public createdDate:Date;
    public updatedDate:Date;

    constructor(request: WorkoutRequest) {
      this.fillEntity(request);
    }

    public toObject() {
      return {...this };
    }

    public fillEntity(request: WorkoutRequest) {
      this.id = request.id;
      this.userId = request.userId;
      this.initiatorId = request.initiatorId;
      this.statusRequest = request.statusRequest;
      this.createdDate = request.createdDate;
      this.updatedDate = request.updatedDate;
    }
  }
