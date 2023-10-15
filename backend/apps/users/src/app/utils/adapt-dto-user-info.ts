import { CreateCoachDto, CreateFullUserDto, CreateSportsmanDto, UpdateCoachDto, UpdateFullUserDto, UpdateSportsmanDto } from "@backend/shared/shared-dto";
import { UserRole } from "@backend/shared/shared-types";
import { plainToInstance } from "class-transformer";

export function adaptCreateDtoUserInfo(dto: CreateFullUserDto) {
  switch (dto.role) {
    case UserRole.Coach:
      return plainToInstance(CreateCoachDto, dto);
    case UserRole.Sportsman:
      return plainToInstance(CreateSportsmanDto, dto);
  }
}

export function adaptUpdateDtoUserInfo(dto: UpdateFullUserDto) {
  switch (dto.role) {
    case UserRole.Coach:
      return plainToInstance(UpdateCoachDto, dto);
    case UserRole.Sportsman:
      return plainToInstance(UpdateSportsmanDto, dto);
  }
}
