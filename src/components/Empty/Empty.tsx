import * as React from "react";
import * as styles from "./Empty.pcss";

export const Empty = ({ text }) => {
    return (
        <div className={styles.emptyBox}>
            <div className={styles.text}>{ text }</div>
        </div>
    );
};
