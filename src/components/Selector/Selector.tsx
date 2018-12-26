import * as React from "react";
import {
    isString,
    isSymbol,
    isSet,
    isNumber,
    isNaN,
    isNil,
    isUndefined,
    isWeakMap,
    isWeakSet,
    isArray,
    isObject,
    isFunction,
    isBoolean,
} from "lodash";
import classnames from "classnames";
import { Selector as ISelector } from "../../state/types";
import { Result } from "../Result";
import * as styles from "./Selector.pcss";

type SelectorProps = {
    selector: ISelector & {
        name: string;
    };
    onClick: () => void;
};

enum ValueType {
    Undefined = "undefined",
    String = "String",
    Number = "Number",
    Array = "Array",
    Object = "Object",
    Function = "Function",
    Boolean = "Boolean",
    NaN = "NaN",
    Symbol = "Symbol",
    Set = "Set",
    Null = "Null",
    WeakSet = "WeakSet",
    WeakMap = "WeakMap",
}

export class Selector extends React.Component<SelectorProps> {
    public checkType = (value): ValueType => {
        const checkerMap = [
            { func: isUndefined, type: ValueType.Undefined },
            { func: isString, type: ValueType.String },
            { func: isSymbol, type: ValueType.Symbol },
            { func: isSet, type: ValueType.Set },
            { func: isNumber, type: ValueType.Number },
            { func: isNaN, type: ValueType.NaN },
            { func: isNil, type: ValueType.Null },
            { func: isWeakMap, type: ValueType.WeakMap },
            { func: isWeakSet, type: ValueType.WeakSet },
            { func: isArray, type: ValueType.Array },
            { func: isFunction, type: ValueType.Function },
            { func: isBoolean, type: ValueType.Boolean },
            { func: isObject, type: ValueType.Object },
        ];

        for (let i = 0; i < checkerMap.length; i++) {
            if (checkerMap[i].func(value)) {
                return checkerMap[i].type;
            }
        }

        return ValueType.Undefined;
    };

    public isValueShowing = (value, type): boolean => {
        const showingTypes = [
            ValueType.Undefined,
            ValueType.String,
            ValueType.Symbol,
            ValueType.Number,
            ValueType.NaN,
            ValueType.Null,
            ValueType.Boolean,
        ];

        return showingTypes.includes(type) && `${value}`.length < 20;
    };

    public render() {
        const { selector, onClick } = this.props;
        const type = this.checkType(selector.value);
        const canShowValue = this.isValueShowing(selector.value, type);

        const onClickHandler = () => {
            if (!canShowValue) {
                onClick();
            }
        };

        return (
            <div className={classnames(styles.selector, !canShowValue && styles.clickable)} onClick={onClickHandler}>
                <div className={styles.name}>
                    { selector.name }
                    <div className={styles.gradient} />
                </div>
                <div className={styles.attributes}>
                    <div className={styles.type}>
                        { type }
                        <div className={styles.gradient} />
                    </div>
                    <div className={classnames(
                        styles.value,
                        !canShowValue && !selector.active && styles.showMore,
                        selector.active && styles.hide,
                    )}>
                        { canShowValue ? `${selector.value}` : `Show result` }
                    </div>
                </div>
                { selector.active && <Result selector={selector.value} /> }
            </div>
        );
    };
}