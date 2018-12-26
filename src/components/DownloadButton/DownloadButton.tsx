import * as React from "react";
import { connect } from "react-redux";
import { pick } from "lodash";

import { selectActions } from "../../state/actions/selectors";
import { Action } from "../../state/types";
import * as styles from "./DownloadButton.pcss";

type DownloadButtonProps = {
    actions: Action[],
    classNames: string,
}

const mapStateToProps = (state) => ({
    actions: selectActions(state),
});

class DownloadButtonComponent extends React.Component<DownloadButtonProps> {
    private downloadLinkRef = React.createRef<HTMLAnchorElement>();
    public onDownload = () => {
        const preparedCases = this.props.actions.map(action => {
            const newSelectorsResult = {};

            Object.keys((action.selectorsResult || {})).forEach(selectorName => {
                newSelectorsResult[selectorName] = action.selectorsResult[selectorName].value;
            });

            return {
                ...pick(action, ["action", "state"]),
                selectorsResult: {
                    ...newSelectorsResult,
                }
            };
        });
        this.downloadLinkRef.current.href = `data: text/json;charset=utf-8,${
            encodeURIComponent(JSON.stringify(preparedCases || [], null, 2))
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