export interface IUser {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  role: string;
  avatar: {
    url: string;
  }
  friends: IUser[];
  jwt: string;
}
