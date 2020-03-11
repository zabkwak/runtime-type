import Error from 'smart-error';
import Base from './base/nullable';

import Type from './base';

export default class Shape extends Base {

    _shape = null;

    _required = [];

    constructor(shape) {
        super();
        Object.keys(shape).forEach((key) => {
            const type = shape[key];
            if (!(type instanceof Type)) {
                throw new Error(`The type ${type} must be an instance of Type.`, 'unsupported_operation');
            }
            if (key.indexOf('?') === key.length - 1) {
                delete shape[key];
                shape[key.substr(0, key.length - 1)] = type;
                return;
            }
            this._required.push(key);
        })
        this._shape = shape;
    }

    cast(value) {
        const o = {};
        Object.keys(this._shape).forEach((key) => {
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
        Object.keys(value).forEach((key) => {
            if (this._shape[key] === undefined) {
                throw new Error(`The key '${key}' is not defined in the shape.`, 'unsupported_operation');
            }
        });
        return o;
    }

    toString() {
        const o = {};
        Object.keys(this._shape).forEach((key) => {
            const k = this._required.includes(key) ? key : `${key}?`;
            o[k] = this._shape[key].toString();
        });
        return `shape(${JSON.stringify(o)})`;
	}
	
	getTSType() {
		const a = Object.keys(this._shape).map((key) => {
            const k = this._required.includes(key) ? key : `${key}?`;
			return `${k}: ${this._shape[key].getTSType()}`;
		});
		return `{ ${a.join(', ')} }`;
	}

    _getTypeOf() {
        return 'object';
    }
}
