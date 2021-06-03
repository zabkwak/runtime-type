import Error from 'smart-error';

export default class Type {

    saveCast(value, defaultValue = this.getDefaultValue()) {
        try {
            return this.cast(value);
        } catch (e) {
            return defaultValue;
        }
    }

    getDefaultValue() {
        throw new Error(`Method ${this.constructor.name}.getDefaultValue() not implemented`, 'not_implemented');
    }

    cast(value) {
        throw new Error(`Method ${this.constructor.name}.cast(value) not implemented`, 'not_implemented');
    }

    isValidType(value) {
        return typeof value === this._getTypeOf();
    }

    getName() {
        throw new Error(`Method ${this.constructor.name}.getName() not implemented`, 'not_implemented');
    }

    getJSDOCType() {
        return 'any';
	}
	
	getTSType() {
        throw new Error(`Method ${this.constructor.name}.getTSType() not implemented`, 'not_implemented');
	}

    isValid(value) {
        return this.canCast(value) && this.isValidType(value);
    }

    canCast(value) {
        try {
            this.cast(value);
            return true;
        } catch (e) {
            if (!e.code) {
                throw e;
            }
            return false;
        }
    }

    toString() {
		return this.getName().toLowerCase();
    }

    compare(type) {
        if (this === type) {
            return true;
        }
        return this.toString() === type.toString();
    }

    _getTypeOf() {
        throw new Error(`Method ${this.constructor.name}._getTypeOf() not implemented`, 'not_implemented');
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
