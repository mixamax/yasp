import { TInstance, TInstanceDTO } from "../model/types";
export function getMaximum(obj: TInstance) {
    let max = Math.max(
        obj.dev.front + obj.dev.back + obj.dev.db,
        obj.test.front + obj.test.back + obj.test.db,
        obj.prod.front + obj.prod.back + obj.prod.db,
        obj.norm || 0
    );
    return max;
}

export function changeData(obj: TInstance, max: number) {
    if (max === 0) max = 1;
    const data = { ...obj };
    const norm = data.norm;
    delete data.title;
    delete data.norm;
    const dataResult = { ...data } as TInstanceDTO;
    // for (const key in data) {
    //     for (const i in data[key]) {
    //         data[key][`${i}Height`] = (data[key][i] / max) * 100;
    //     }
    // }
    dataResult.norm = { normNumber: norm || 0, normHeight: (norm || 0) / max };
    dataResult.dev.frontHeight = obj.dev.front / max;
    dataResult.dev.backHeight = obj.dev.back / max;
    dataResult.dev.dbHeight = obj.dev.db / max;
    dataResult.test.frontHeight = obj.test.front / max;
    dataResult.test.backHeight = obj.test.back / max;
    dataResult.test.dbHeight = obj.test.db / max;
    dataResult.prod.frontHeight = obj.prod.front / max;
    dataResult.prod.backHeight = obj.prod.back / max;
    dataResult.prod.dbHeight = obj.prod.db / max;

    return dataResult;
}
