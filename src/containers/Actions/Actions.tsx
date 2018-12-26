import * as React from "react";
import { connect } from "react-redux";

import { Action } from "../../components/Action";
import { Action as IAction } from "../../state/types";
import {
    selectActions,
    selectAction,
    unselectSelectors,
} from "../../state/actions";
import * as styles from "./Actions.pcss";

export class ActionsComponent extends React.Component<ActionListProps & ActionListDispatch> {
    public selectAction = (id: number) => {
        this.props.unselectSelectors();
        this.props.selectAction(id);
    };

    public render() {
        return <div className={styles.actions}>
            { this.props.actions.map((action, i) => {
                return <Action actionData={action} key={i} select={this.selectAction} />;
            })}
        </div>;
    }
}

type ActionListProps = {
    actions: IAction[],
}

type ActionListDispatch = {
    selectAction: (id: number) => void,
    unselectSelectors: () => void,
}

const mapStateToProps = (state) => ({
    actions: selectActions(state),
});

const mapDispatchToProps = (dispatch, getState) => ({
    selectAction: (id) => dispatch(selectAction(id)),
    unselectSelectors: () => dispatch(unselectSelectors()),
});

export const Actions =
    connect<ActionListProps, ActionListDispatch>(mapStateToProps, mapDispatchToProps)
    (ActionsComponent);