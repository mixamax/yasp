import { useState } from "react";
import { ColumnContainer } from "../components/ColumnContainer";
import Layout from "../components/Layout";
import { useGetInstance } from "../hooks/useGetInstance";

export enum TTRP {
    ttrp1 = "ttrp1",
    ttrp2 = "ttrp2",
    ttrp3 = "ttrp3",
    ttrp4 = "ttrp4",
    ttrp5 = "ttrp5",
}
export function App() {
    const [ttrp, setTtrp] = useState<TTRP>(TTRP.ttrp1);
    const { instance, isInstanceLoading } = useGetInstance(ttrp + ".json");

    if (isInstanceLoading) return <div>Loading...</div>;
    if (instance) {
        return (
            <Layout title={instance.title} setTtrp={setTtrp}>
                <ColumnContainer instance={instance} />
            </Layout>
        );
    }
    return <div>упс</div>;
}
