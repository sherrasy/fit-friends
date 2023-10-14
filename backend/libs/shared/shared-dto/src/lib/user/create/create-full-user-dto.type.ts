import { CreateCoachDto } from "./create-coach.dto";
import { CreateSportsmanDto } from "./create-sportsman.dto";

export type CreateFullUserDto = CreateCoachDto | CreateSportsmanDto ;
