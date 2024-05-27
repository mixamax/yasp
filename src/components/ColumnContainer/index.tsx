import Column from "../Column";
import styles from "./column-container.module.css";
import { TInstance, TInstanceDTO } from "../../model/types";
import { useState } from "react";
import { getMaximum, changeData } from "../../utils/helpers";
import { Draw } from "../Draw";

type Props = { instance: TInstance };
type Coords = { x: number; y: number } | null;
export function ColumnContainer({ instance }: Props) {
    const [devCoords, setDevCoords] = useState<Coords>(null);
    const [devSum, setDevSum] = useState(0);
    const [testCoords, setTestCoords] = useState<Coords>(null);
    const [testSum, setTestSum] = useState(0);
    const [prodCoords, setProdCoords] = useState<Coords>(null);
    const [prodSum, setProdSum] = useState(0);

    const setCoordsAndSum = (
        columnName: string,
        x: number,
        y: number,
        sum: number
    ) => {
        switch (columnName) {
            case "dev":
                setDevCoords({ x, y });
                setDevSum(sum);
                break;
            case "test":
                setTestCoords({ x, y });
                setTestSum(sum);
                break;
            case "prod":
                setProdCoords({ x, y });
                setProdSum(sum);
                break;
            case "norm":
                break;
            default:
                break;
        }
    };

    const max = getMaximum(instance);
    const data = changeData(instance, max);
    const keys = Object.keys(data) as (keyof TInstanceDTO)[];

    return (
        <div className={styles["column-container"]}>
            {keys.map((key) => (
                <Column
                    key={key}
                    data={data[key]}
                    isNormaColumn={key === "norm"}
                    columnName={key}
                    setCoordsAndSum={setCoordsAndSum}
                />
            ))}
            {devCoords &&
                testCoords &&
                Draw(
                    devCoords.x,
                    devCoords.y,
                    testCoords.x,
                    testCoords.y,
                    250,
                    testSum > devSum,
                    devSum - testSum,
                    max
                )}
            {testCoords &&
                prodCoords &&
                Draw(
                    testCoords.x,
                    testCoords.y,
                    prodCoords.x,
                    prodCoords.y,
                    250,
                    prodSum > testSum,
                    testSum - prodSum,
                    max
                )}
        </div>
    );
}
