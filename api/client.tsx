import axios from "axios";
import {BASE_API_URL} from "@/constants";

export const ApiClient = axios.create({
    baseURL: `${BASE_API_URL}`,
});
