import Error from 'smart-error';
import Base from './base';

export default class Shape extends Base {

	_types;

	constructor(...types) {
		super();
		for (const type of types) {
			if (!(type instanceof Base)) {
                throw new Error(`The type ${type} must be an instance of Type.`, 'unsupported_operation');
            }
		}
		this._types = types;
	}

	cast(value) {
		for (const type of this._types) {
			try {
				return type.cast(value);
			} catch (e) {
				continue;
			}
		}
		this._throwInvalidCast(value); 
	}

	isValidType(value) {
		for (const type of this._types) {
			if (type.isValidType(value)) {
				return true;
			}
		}
		return false;
    }

	getName() {
		return 'Union';
	}
	
	getTSType() {
        return this._types.map((type) => type.getTSType()).join(' | ');
	}

	toString() {
        return `union(${this._types.join(',')})`;
	}

	_getTypeOf() {
        return null;
    }
}
