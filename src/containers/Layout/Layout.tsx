import * as React from "react";
import { connect } from "react-redux";
import * as classnames from "classnames";

import { selectActions } from "../../state/actions";
import { Navigation } from "../../components/Navigation";
import { Actions } from "../Actions";
import { Selectors } from "../Selectors";
import { Empty } from "../../components/Empty";
import * as styles from "./Layout.pcss";
import { Action as IAction } from "../../state/types";

export class LayoutComponent extends React.Component<ActionListProps> {
    public render() {
        const { actions } = this.props;
        return (
            <div className={styles.layout}>
                <Navigation />
                { actions.length ?
                    <React.Fragment>
                        <Actions />
                        <Selectors />
                    </React.Fragment>
                    :
                    <Empty text={"Have not any actions. Did you implement CheckState middleware into your app?"} />
                }

            </div>
        );
    }
}

type ActionListProps = {
    actions: IAction[],
}

const mapStateToProps = (state) => ({
    actions: selectActions(state),
});

export const Layout = connect<ActionListProps>(mapStateToProps)(LayoutComponent);