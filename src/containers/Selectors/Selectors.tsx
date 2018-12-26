import * as React from "react";
import { connect } from "react-redux";
import {
    flattenDeep,
    get,
} from "lodash";
import { Selector as ISelector } from "../../state/types";
import { Action } from "../../state/types";
import {
    selectActiveAction,
    selectPreparedSelectors,
    selectSelector,
    unselectSelectors,
} from "../../state/actions";
import { Empty } from "../../components/Empty";
import { Selector } from "../../components/Selector";
import * as styles from "./Selectors.pcss";

export class SelectorsComponent extends React.Component<SelectorsProps & SelectorsDispatch> {
    public onSelectorClick = (selectorId: number) => {
        this.props.unselect();
        this.props.select(selectorId, this.props.action.id);
    };

    public render() {
        const { selectors } = this.props;
        return (
            <div className={styles.selectors}>
                { selectors.length ?
                    (<div className={styles.cards}>
                        { selectors.map(selector =>
                            <Selector
                                selector={selector}
                                onClick={() => this.onSelectorClick(selector.id)}
                                key={selector.id}
                            />
                        )}
                    </div>) :
                <Empty text={"Action is not selected"} /> }
            </div>
        );
    }
}

type PreparedSelector = ISelector & {
    name: string;
}

type SelectorsProps = {
    action: Action,
    selectors: PreparedSelector[],
}

type SelectorsDispatch = {
    select: (selectorId: number, actionId: number) => void,
    unselect: () => void,
}

const mapStateToProps = (state) => ({
    action: selectActiveAction(state),
    selectors: selectPreparedSelectors(state),
});

const mapDispatchToProps = (dispatch, getState) => ({
    select: (selectorId: number, actionId: number) => dispatch(selectSelector(selectorId, actionId)),
    unselect: () => dispatch(unselectSelectors()),
});

export const Selectors = connect(mapStateToProps, mapDispatchToProps)(SelectorsComponent);
