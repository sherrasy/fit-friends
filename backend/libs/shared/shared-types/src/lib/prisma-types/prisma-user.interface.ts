type UserRole = "coach" | "sportsman"
type UserSex = "male" | "female" | "any"
type Location = "pionerskaya" | "petrogradskaya" | "udelnaya" | "zvyozdnaya" | "sportivnaya"
type FitnessLevel = "beginer" | "amateur" | "pro"
type WorkoutTime = "basic" | "intermediate" | "advanced" | "superior"
type WorkoutType = "yoga" | "running" | "boxing" | "stretching" | "crossfit" | "aerobics" | "pilates"

export interface PrismaUser {
  id: number;
  name: string;
  email: string;
  password: string;
  sex: UserSex;
  role: UserRole;
  location: Location;
  fitnessLevel: FitnessLevel;
  workoutType: WorkoutType[];
  workoutTime: WorkoutTime;
  successInfo: string;
  caloriesTotal: number;
  caloriesPerDay: number;
  description: string;
  birthDate: string;
  createdDate: Date;
  updatedDate: Date;
  avatar: string;
  photo: string;
  certificate: string;
  isPersonal: boolean;
  isReady: boolean;
}
