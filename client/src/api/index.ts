import { updateHistory } from "@/utils";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const generateStrategies = async (company:string,category:string) => {
  let productData;
  if(!localStorage.getItem(`productData?${company}&${category}`)){
    updateHistory(company, category)
    const { data } = await api.get(`/scrape?company=${company}&category=${category}`);
    productData = data;
    localStorage.setItem(`productData?${company}&${category}`, JSON.stringify(productData));
  }
  else{
    productData = JSON.parse(localStorage.getItem(`productData`) as string);
  }
  // const stringifiedData = JSON.stringify(productData.slice(0, 5));
  const formattedData = {productData, company, category};
  const { data } = await axios.post(`${import.meta.env.VITE_GENERATION_SERVICE_URL}/strategies`, formattedData);
  localStorage.setItem("strategies", JSON.stringify(data));
  return {data, productData};
};