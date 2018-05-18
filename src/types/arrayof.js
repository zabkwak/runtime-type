import Error from 'smart-error';
import Base from './base/nullable';

import Type from './base';

export default class ArrayOf extends Base {

    /** @type {Type} */
    _type = null;

    /**
     * 
     * @param {Type} type 
     */
    constructor(type) {
        super();
        if (!(type instanceof Type)) {
            throw new Error(`The type ${type} must be an instance of Type.`, 'unsupported_operation');
        }
        this._type = type;
    }

    cast(values) {
        if (!(values instanceof Array)) {
            throw new Error(`Values ${values} must be an array.`, 'unsupported_operation');
        }
        return values.map((v, index) => {
            try {
                return this._type.cast(v);
            } catch (e) {
                if (e.code === 'ERR_INVALID_CAST') {
                    throw new Error(`The value at index ${index} cannot be cast to ${this._type.getName().toLowerCase()}.`, 'invalid_cast');
                }
                throw e;
            }
        });
    }

    toString() {
        return `${this._type}[]`;
    }
}
