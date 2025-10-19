import api from "./api";

export const getProduct = async () => {
    const response = await api.get("/products");
    return response.data.data;
}

export const getProductId = async (id:number) => {
    const response = await api.get(`/products/${id})`);
    return response.data.data;
}