import Error from 'smart-error';
import Base from './base/nullable';

import Type from './base';

export default class Shape extends Base {

    _shape = null;

    _required = [];

    _dynamic = [];

    constructor(shape) {
        super();
        Object.keys(shape).forEach((key) => {
            const type = shape[key];
            if (!(type instanceof Type)) {
                throw new Error(`The type ${type} must be an instance of Type.`, 'unsupported_operation');
            }
            if (key.indexOf('?') === key.length - 1) {
                delete shape[key];
                const k = key.substr(0, key.length - 1);
                shape[k] = type;
                if (this._isKeyDynamic(k)) {
                    this._dynamic.push(k);
                }
                return;
            }
            if (this._isKeyDynamic(key)) {
                this._dynamic.push(key);
            }
            this._required.push(key);
        })
        this._shape = shape;
    }

    cast(value) {
        const o = {};
        Object.keys(this._shape).forEach((key) => {
            if (this._dynamic.includes(key)) {
                return;
            }
            const type = this._shape[key];
            if (value[key] === undefined) {
                if (this._required.includes(key)) {
                    throw new Error(`Missing key '${key}' in the shape.`, 'unsupported_operation');
                }
                return;
            }
            try {
                o[key] = type.cast(value[key]);
            } catch (e) {
                if (e.code === 'ERR_INVALID_CAST') {
                    throw new Error(`The value at key '${key}' cannot be cast to ${type.getName().toLowerCase()}.`, 'invalid_cast');
                }
                throw e;
            }
        });
        const usedDynamicKeys = [];
        Object.keys(value).forEach((key) => {
            if (this._shape[key] === undefined) {
                for (const dynamicKey of this._dynamic) {
                    const type = this._shape[dynamicKey];
                    if (type.canCast(value[key])) {
                        o[key] = type.cast(value[key]);
                        if (this._isKeyRequired(dynamicKey) && !usedDynamicKeys.includes(dynamicKey)) {
                            usedDynamicKeys.push(dynamicKey);
                        }
                    }
                }
                if (o[key]) {
                    return;
                }
                throw new Error(`The key '${key}' is not defined in the shape.`, 'unsupported_operation');
            }
        });
        if (usedDynamicKeys.length !== this._dynamic.length) {
            this._dynamic.forEach((key) => {
                if (usedDynamicKeys.includes(key)) {
                    return;
                }
                if (this._isKeyOptional(key)) {
                    return;
                }
                throw new Error(`Missing key '${key}' in the shape.`, 'unsupported_operation');
            });
        }
        return o;
    }

    getName() {
        return 'Shape';
    }

    toString() {
        const o = {};
        Object.keys(this._shape).forEach((key) => {
            const k = this._isKeyRequired(key) ? key : `${key}?`;
            o[k] = this._shape[key].toString();
        });
        return `shape(${JSON.stringify(o)})`;
    }

    getTSType(format = false, level = 0) {
        const a = Object.keys(this._shape).map((key) => {
            let k = this._isKeyRequired(key) ? key : `${key}?`;
            if (this._isKeyDynamic(key)) {
                k = `[${key.replace(/^\[(\w+)\]$/, '$1')}: string]`;
            }
            if (this._shape[key] instanceof Shape && format) {
                return `${k}: ${this._shape[key].getTSType(format, level + 1)}`;
            }
            return `${k}: ${this._shape[key].getTSType(format)}`;
        });
        if (!a.length) {
            return '{}';
        }
        if (!format) {
            return `{ ${a.join(', ')} }`;
        }
        const tabs = new Array(level + 1).fill('\t').join('');
        return `{\n${a.map((v) => `${tabs}${v};`).join('\n')}\n${tabs.substr(1)}}`;
    }

    _getTypeOf() {
        return 'object';
    }

    _isKeyDynamic(key) {
        return /^\[\w+\]$/.test(key);
    }

    _isKeyOptional(key) {
        return !this._isKeyRequired(key);
    }

    _isKeyRequired(key) {
        return this._required.includes(key);
    }
}
