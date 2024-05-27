import styles from "./layout.module.css";
import { TInstance } from "../../model/types";
import { TTRP } from "../../app/App";
import { useState } from "react";

type Item = {
    name: "Клиентская часть" | "Серверная часть" | "База данных";
    color: "client" | "server" | "bd";
};

const items: Item[] = [
    { name: "Клиентская часть", color: "client" },
    { name: "Серверная часть", color: "server" },
    { name: "База данных", color: "bd" },
];
type Props = {
    children: React.ReactNode;
    title: TInstance["title"];
    setTtrp: React.Dispatch<React.SetStateAction<TTRP>>;
};

export default function Layout({ children, title, setTtrp }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles["title-wrapper"]}>
                <div className={styles.title}>
                    Количество пройденных тестов "{title}"
                </div>
                <div
                    className={styles.ellipsis}
                    onClick={() => setIsModalOpen((isOpen) => !isOpen)}
                >
                    <span style={{ marginBottom: "3px" }}>...</span>
                    {isModalOpen && (
                        <div className={styles.modal}>
                            <ul>
                                {Object.values(TTRP).map((item, indx) => (
                                    <li
                                        key={indx}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setTtrp(item);
                                            setIsModalOpen(false);
                                        }}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {children}
            <div className={styles.description}>
                {items.map((item, indx) => (
                    <DescriptionItem
                        key={indx}
                        name={item.name}
                        color={item.color}
                    />
                ))}
            </div>
        </div>
    );
}

function DescriptionItem({ name, color }: Item) {
    return (
        <div className={styles["description-item"]}>
            <div
                className={
                    styles[`description-item-box`] +
                    " " +
                    styles[`description-item-box_${color}`]
                }
            ></div>
            <span className={styles["description-item-name"]}>{name}</span>
        </div>
    );
}
