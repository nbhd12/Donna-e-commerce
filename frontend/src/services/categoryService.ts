import api from "./api";

export const getCategory = async() => {
const response = await api.get("/categories");
return response.data.data;
}

export const getCategoryById = async(id:number) => {
    const response = await api.get(`categories/${id}`);
    return response.data.data;
    console.log(getCategoryById);
}