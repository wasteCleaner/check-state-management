import * as React from "react";
import { connect } from "react-redux";
import { transport } from "./utils/transport";
import { Layout } from "./containers/Layout";

type AppProps = {
    subscribe: any;
};

class App extends React.Component<AppProps> {
    public componentWillMount() {
        this.props.subscribe();
    };

    public render() {
        return <Layout />;
    }
}

const mapDispatchToProps = (dispatch, getState) => ({
    subscribe: () => transport.subscribe(dispatch, getState),
});

export default connect<{}, AppProps>(null, mapDispatchToProps)(App);