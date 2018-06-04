import SmartError from 'smart-error';

import Base from './base';

export default class Enum extends Base {

    /**
     * 
     * @param {string} defaultValue 
     * @param {string[]} values 
     */
    constructor(defaultValue, ...values) {
        super();
        if (values.indexOf(defaultValue) < 0) {
            values.push(defaultValue);
        }
        this.defaultValue = defaultValue;
        this.values = values;
    }

    /**
     * 
     * @param {string} value 
     * @returns {string}
     */
    cast(value) {
        if (typeof value !== 'string') {
            value = value.toString();
        }
        value = value.trim();
        if (!value || this.values.indexOf(value) < 0) {
            this._throwInvalidCast(value);
        }
        return value;
    }

    getDefaultValue() {
        return this.defaultValue;
    }

    toString() {
        return `enum(${this.values.map(item => `'${item}'`).join(',')})`;
    }
}