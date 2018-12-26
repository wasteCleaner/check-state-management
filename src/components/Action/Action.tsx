import * as React from "react";
import classnames from "classnames";

import * as styles from "./Action.pcss"

export const Action = ({ actionData, select }) => {
    const onClick = () => {
        select(actionData.id);
    };

    return <div className={classnames(styles.action, actionData.active && styles.active)} onClick={onClick}>
        <div className={styles.actionType}>{ actionData.action.type }</div>
        <div className={styles.gradient} />
    </div>;
};