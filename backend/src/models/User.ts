export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  created_at?: Date;
}

export default class UserModel {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  created_at?: Date;

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    password?: string,
    created_at?: Date,
    id?: number
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
    this.id = id;
  }

  static fromRow = (row: User): UserModel => {
    return new UserModel(
      row.first_name,
      row.last_name,
      row.email,
      row.password,
      row.created_at,
      row.id
    );
  };

  serialize = (): Record<string, string | number | Date | undefined> => {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      created_at: this.created_at,
    };
  };

  getId = (): number | undefined => this.id;
  getFirstName = (): string => this.first_name;
  getLastName = (): string => this.last_name;
  getEmail = (): string => this.email;
  getPassword = (): string | undefined => this.password;
  getCreatedAt = (): Date | undefined => this.created_at;
}
