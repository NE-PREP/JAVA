import axios from "axios";

export const API_URL = "http://localhost:8000/api";

class AppServices {
  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  getProducts() {
    return this.instance.get(`/v1/products/all`);
  }

  purchaseProduct(body) {
    return this.instance.post(`v1/product-purchased`, body);
  }
}

export default new AppServices();
