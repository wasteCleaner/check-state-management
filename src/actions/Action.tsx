import * as React from "react";
import classnames from "classnames";

import * as styles from "./Action.pcss"

export const Action = ({ action }) => {
    return <div className={classnames(styles.action)}>
        <div className={classnames(styles.actionType)}>{ action.type }</div>
    </div>;
};