import * as React from "react";
import { connect } from "react-redux";
import { selectActions } from "./actions/state/selectors";
import { transport } from "./actions/transport";
import { ActionList } from "./actions/ActionList";
import { Action } from "./actions/types";

type AppProps = {
    subscribe: any;
};

type AppState = {
    actions: Action[];
}

class App extends React.Component<AppState & AppProps> {
    public componentWillMount() {
        this.props.subscribe();
    };

    public render() {
        return <div>
            <ActionList actions={this.props.actions}/>
        </div>;
    }
}

const mapStateToProps = (state) => ({
    actions: selectActions(state),
});

const mapDispatchToProps = (dispatch, getState) => ({
    subscribe: () => transport.subscribe(dispatch, getState),
});

export default connect<AppState, AppProps>(mapStateToProps, mapDispatchToProps)(App);