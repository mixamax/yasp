import { TInstance } from "../model/types";
const instanceApi = () => {
    return {
        get: async (url: string): Promise<TInstance> => {
            return fetch(url).then((response) => response.json());
        },
    };
};
export default instanceApi();
