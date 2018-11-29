import * as React from "react";
import * as classnames from "classnames";
import * as styles from "./Navigation.pcss";

export const Navigation = () => {
    return (
        <div className={styles.navigation}>
            <div className={classnames(styles.icon, styles.filter)} />
            <div className={classnames(styles.icon, styles.pause)} />
            <div className={classnames(styles.icon, styles.clean)} />
        </div>
    );
};
