import { useState, useEffect } from "react";
import { TInstance } from "../model/types";
import { getInstance } from "../service/getInstance";

export function useGetInstance(ttrp: string) {
    const [instance, setInstance] = useState<TInstance | null>(null);
    const [isInstanceLoading, setIsInstanceisLoading] = useState(true);
    useEffect(() => {
        const getResponse = async (ttrpData: string) => {
            try {
                const response = await getInstance(ttrpData);
                if (response) setInstance(instance);
                setInstance(response);
                setIsInstanceisLoading(false);
            } catch (error) {
                console.log(error);
                setIsInstanceisLoading(false);
            }
        };
        getResponse(ttrp);
    }, [ttrp]);

    return { instance, isInstanceLoading };
}
