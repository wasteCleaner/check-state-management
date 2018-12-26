import * as React from "react";
import { connect } from "react-redux";
import * as classnames from "classnames";
import { DownloadButton } from "../DownloadButton";
import { clearActions } from "../../state/actions";
import * as styles from "./Navigation.pcss";

const NavigationComponent = (props) => {
    return (
        <div className={styles.navigation}>
            <DownloadButton classNames={classnames(styles.icon, styles.download)} />
            {/*<div className={classnames(styles.icon, styles.pause)} />*/}
            <div className={classnames(styles.icon, styles.clean)} onClick={props.clearActions} />
        </div>
    );
};

const mapDispatchToProps = (dispatch, getState) => ({
    clearActions: () => dispatch(clearActions()),
});

export const Navigation = connect(null, mapDispatchToProps)(NavigationComponent);
