import Error from 'smart-error';
import Base from './base/nullable';

import Type from './base';

export default class Shape extends Base {

    _shape = null;

    constructor(shape) {
        super();
        Object.keys(shape).forEach((key) => {
            const type = shape[key];
            if (!(type instanceof Type)) {
                throw new Error(`The type ${type} must be an instance of Type.`, 'unsupported_operation');
            }
        })
        this._shape = shape;
    }

    cast(value) {
        const o = {};
        Object.keys(this._shape).forEach((key) => {
            const type = this._shape[key];
            if (value[key] === undefined) {
                throw new Error(`Missing key '${key}' in the shape.`, 'unsupported_operation');
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
        return o;
    }

    toString() {
        const o = {};
        Object.keys(this._shape).forEach((key) => o[key] = this._shape[key].toString());
        return `shape(${JSON.stringify(o)})`;
    }
}
