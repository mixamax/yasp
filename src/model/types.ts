export type TInstance = {
    title?: string;
    dev: {
        front: number;
        back: number;
        db: number;
    };
    test: {
        front: number;
        back: number;
        db: number;
    };
    prod: {
        front: number;
        back: number;
        db: number;
    };
    norm?: number;
};
export type TInstanceDTO = {
    // title?: string;
    dev: {
        front: number;
        back: number;
        db: number;
        frontHeight: number;
        backHeight: number;
        dbHeight: number;
    };
    test: {
        front: number;
        back: number;
        db: number;
        frontHeight: number;
        backHeight: number;
        dbHeight: number;
    };
    prod: {
        front: number;
        back: number;
        db: number;
        frontHeight: number;
        backHeight: number;
        dbHeight: number;
    };
    norm?: { normNumber: number; normHeight: number };
};
