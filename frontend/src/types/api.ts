export interface ApiUserFullDataResult {
  data: User;
  message: string;
}

export interface ApiUserResult {
  token: string;
  message: string;
  user: User;
}

export interface User {
  email: string;
  signupAt?: string;
  plan?: string;
  locale?: string;
}

export interface ApiListResult<T> {
  info: ApiListInfo;
  results: T;
}

export interface ApiListInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}