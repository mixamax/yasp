import { useEffect, useLayoutEffect, useRef } from "react";
import { TInstanceDTO } from "../../model/types";
import styles from "./column.module.css";

const maxheight = 265;

type Tdata = TInstanceDTO["dev" | "test" | "prod" | "norm"];
type Props = {
    isNormaColumn: boolean;
    data: Tdata;
    columnName: string;
    setCoordsAndSum: (
        columnName: string,
        x: number,
        y: number,
        sum: number
    ) => void;
};
export default function Column({
    isNormaColumn,
    data,
    columnName,
    setCoordsAndSum,
}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    let columnSum: number;
    if (data && "front" in data) {
        columnSum = data.front + data.back + data.db;
    }

    useLayoutEffect(() => {
        if (!ref.current) return;
        const coords = ref.current.getBoundingClientRect();
        setCoordsAndSum(columnName, coords.x, coords.y, columnSum);
    }, [data]);

    return (
        <>
            {!isNormaColumn && data && "front" in data && (
                <div ref={ref} className={styles["column-container"]}>
                    <div className={styles["column"]}>
                        <div
                            className={styles["columnPart"]}
                            style={{
                                backgroundColor: "var(--client)",
                                height: `${Math.max(
                                    maxheight * data.frontHeight,
                                    15
                                )}px`,
                            }}
                        >
                            {data.front}
                        </div>
                        <div
                            className={styles["columnPart"]}
                            style={{
                                backgroundColor: "var(--server)",
                                height: `${Math.max(
                                    maxheight * data.backHeight,
                                    15
                                )}px`,
                            }}
                        >
                            {data.back}
                        </div>
                        <div
                            className={styles["columnPart"]}
                            style={{
                                backgroundColor: "var(--bd)",
                                height: `${Math.max(
                                    maxheight * data.dbHeight,
                                    15
                                )}px`,
                            }}
                        >
                            {data.db}
                        </div>
                    </div>
                    <div className={styles["column-title"]}>dev</div>
                </div>
            )}
            {isNormaColumn && data && "normHeight" in data && (
                <div ref={ref} className={styles["column-container"]}>
                    <div
                        className={styles["column"]}
                        style={{
                            height: `${Math.max(
                                maxheight * data.normHeight,
                                15
                            )}px`,
                        }}
                    >
                        <div className={styles["column-norma"]}>
                            <div className={styles["column-norma-number"]}>
                                {data.normNumber}
                            </div>
                        </div>
                    </div>
                    <div className={styles["column-title"]}>норматив</div>
                </div>
            )}
        </>
    );
}
