import * as React from "react";

import { Action } from "./Action";
import { Action as IAction } from "./types";

export class ActionList extends React.Component<ActionListProps> {
    public render() {
        return <div>
            {this.props.actions.map((action, i) => {
                return <Action action={action} key={i} />;
            })}
        </div>;
    }
}

type ActionListProps = {
    actions: IAction[],
}
