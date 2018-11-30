import * as React from "react";
import { connect } from "react-redux";

import { selectActions } from "../../state/actions/selectors";
import { Action } from "../../state/types";
import * as styles from "./DownloadButton.pcss";

type DownloadButtonProps = {
    actions: Action,
    classNames: string,
}

const mapStateToProps = (state) => ({
    actions: selectActions(state),
});

class DownloadButtonComponent extends React.Component<DownloadButtonProps> {
    private downloadLinkRef = React.createRef<HTMLAnchorElement>();
    public onDownload = () => {
        this.downloadLinkRef.current.href = `data: text/json;charset=utf-8,${
            encodeURIComponent(JSON.stringify(this.props.actions || [], null, 2))
        }`;
        this.downloadLinkRef.current.click();
    };

    public render() {
        return (
            <div className={this.props.classNames} onClick={this.onDownload}>
                <a className={styles.downloadLink} ref={this.downloadLinkRef} download={"app.checkState.json"} />
            </div>
        );
    }
}

export const DownloadButton = connect(mapStateToProps)(DownloadButtonComponent);