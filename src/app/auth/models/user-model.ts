interface UserModel {
  email: string;
  password: string;
  userId?: string;
}

export type User = UserModel;
