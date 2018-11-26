import * as React from "react";

export const Action = ({ action }) => {
    return <div className={"action"}>
        <div className={"action__type"}>{ action.type }</div>
    </div>;
};