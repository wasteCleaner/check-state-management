import * as React from "react";
import classnames from "classnames";
import {
    isArray,
    isObject,
} from "lodash";
import * as styles from "./Result.pcss";

export const Result = ({ selector }) => {
    const renderLevel = (element) => {
        if (isArray(element)) {
            if (element.length === 0) {
                return (
                    <div className={styles.primitiveLine}>
                        <div className={styles.value}>
                            [Empty array]
                        </div>
                    </div>
                );
            }
            return (
                <div className={styles.arrayBox}>
                    { element.map((value, i) => (
                        <div className={classnames(styles.structuredLine, styles.arrayElem)} key={i}>
                            { renderLevel(value) }
                        </div>
                    )) }
                </div>
            );
        }

        if (isObject(element)) {
            if (Object.keys(element).length === 0) {
                return (
                    <div className={styles.primitiveLine}>
                        <div className={styles.value}>
                            [Empty object]
                        </div>
                    </div>
                );
            }
            return Object.keys(element).map((elementName, i) => {
                const isValuePrimitive = !isObject(element[elementName]);
                return (
                    <div className={isValuePrimitive ? styles.primitiveLine : styles.structuredLine} key={i}>
                        <div className={styles.name}>
                            { elementName }:
                        </div>
                        <div className={styles.value}>
                            { isValuePrimitive ? `${element[elementName]}` : renderLevel(element[elementName]) }
                        </div>
                    </div>
                );
            });
        }

        return (
            <div className={styles.primitiveLine}>
                <div className={styles.value}>
                    {`${element}`}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.result}>
            { renderLevel(selector) }
        </div>
    );
};