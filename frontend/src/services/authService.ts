import api from "./api";

export const signUp = async (data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string; 
}) => {
    const response = await api.post("/users/signup", data);
    return response.data;
};

export const signIn = async (data: {email:string; password:string}) =>{
    const response = await api.post("/users/signin", data);
    return response.data;
}

export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};