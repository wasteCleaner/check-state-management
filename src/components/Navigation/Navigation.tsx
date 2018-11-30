import * as React from "react";
import * as classnames from "classnames";
import { DownloadButton } from "../DownloadButton";
import * as styles from "./Navigation.pcss";

export const Navigation = () => {
    return (
        <div className={styles.navigation}>
            <DownloadButton classNames={classnames(styles.icon, styles.download)} />
            <div className={classnames(styles.icon, styles.pause)} />
            <div className={classnames(styles.icon, styles.clean)} />
        </div>
    );
};
