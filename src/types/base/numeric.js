import Error from 'smart-error';

import Base from './';

export default class Numeric extends Base {

    /**
     * 
     * @param {*} value 
     * @returns {number}
     */
    cast(value) {
        if (value instanceof Array) {
            this._throwInvalidCast(value);
        }
        const v = this._cast(value);
        if (isNaN(v)) {
            this._throwInvalidCast(value);
        }
        return v;
    }

    getDefaultValue() {
        return 0;
	}
	
	getTSType() {
		return 'number';
	}

    _getTypeOf() {
        return 'number';
    }

    _cast(value) {
        throw new Error(`Method ${this.constructor.name}._cast(value) not implemented`, 'not_implemented');
    }
}