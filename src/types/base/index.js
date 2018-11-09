import Error from 'smart-error';

export default class Type {

    saveCast(value, defaultValue = this.getDefaultValue()) {
        try {
            return this.cast(value);
        } catch (e) {
            return defaultValue;
        }
    }

    getDefaultValue() { throw new Error(`Method ${this.constructor.name}.getDefaultValue() not implemented`, 'not_implemented'); }

    cast(value) { throw new Error(`Method ${this.constructor.name}.cast(value) not implemented`, 'not_implemented'); }

    getName() {
        return this.constructor.name;
    }

    getJSDOCType() {
        return 'any';
    }

    isValid(value) {
        try {
            this.cast(value);
            return true;
        } catch (e) {
            return false;
        }
    }

    toString() {
        return this.constructor.name.toLowerCase();
    }

    compare(type) {
        if (this === type) {
            return true;
        }
        return this.toString() === type.toString();
    }

    /**
     * 
     * @param {*} value 
     * @throws {Error}
     */
    _throwInvalidCast(value) {
        throw new Error(`Value ${value} cannot be cast to ${this.getName().toLowerCase()}`, 'invalid_cast');
    }
}
