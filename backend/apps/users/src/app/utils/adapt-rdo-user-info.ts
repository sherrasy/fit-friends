import { User, UserRole } from "@backend/shared/shared-types";
import { fillObject } from "@backend/util/util-core";
import { CoachRdo } from "../user-info/rdo/coach.rdo";
import { SportsmanRdo } from "../user-info/rdo/sportsman.rdo";

export function adaptRdoUserInfo(user: User) {
  switch (user.role) {
    case UserRole.Coach:
      return fillObject(CoachRdo, user);
    case UserRole.Sportsman:
      return fillObject(SportsmanRdo, user);
  }
}
