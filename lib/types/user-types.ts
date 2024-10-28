export interface UserData {
  telegram_id: number | null;
  telegram_username: string | null;
  first_name: string | null;
  last_name: string | null;
  is_premium: boolean | null;
  firebase_id: string | null;
  loading: boolean;
}

export interface UserStatusResponse {
  userExists: string | null;
  message: string;
}

export interface GameData {
  pointsToAdd: number;
  profitPerHour: number;
  usersPoints: number;
  levelIndex: number;
  boostXG: number;
  referredUserId: string | null;
}
