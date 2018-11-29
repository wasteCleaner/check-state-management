import * as React from "react";
import { connect } from "react-redux";

import { Action } from "../../components/Action";
import { Action as IAction } from "../../state/types";
import { selectActions } from "../../state/actions/selectors";
import * as styles from "./Actions.pcss";

export class ActionsComponent extends React.Component<ActionListProps> {
    public render() {
        return <div className={styles.actions}>
            { this.props.actions.map((action, i) => {
                return <Action action={action} key={i} />;
            })}
        </div>;
    }
}

type ActionListProps = {
    actions: IAction[],
}

const mapStateToProps = (state) => ({
    actions: selectActions(state),
});

export const Actions = connect(mapStateToProps)(ActionsComponent);