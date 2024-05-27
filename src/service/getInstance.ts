import instanceApi from "../api/api";
import { baseURL } from "../constants";

export const getInstance = async (ttrp: string) => {
    return await instanceApi.get(`${baseURL}${ttrp}`);
};
