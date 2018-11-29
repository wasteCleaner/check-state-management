import * as React from "react";
import * as classnames from "classnames";

import { Navigation } from "../../components/Navigation";
import { Actions } from "../Actions";
import * as styles from "./Layout.pcss";

export class Layout extends React.Component {
    public render() {
        return (
            <div className={styles.layout}>
                <Navigation />
                <Actions />
            </div>
        );
    }
}