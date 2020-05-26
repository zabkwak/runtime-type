import Base from './base/nullable';

export default class Any extends Base {

    cast(value) {
        return value;
    }

    isValidType(value) {
        return true;
	}
	
	getTSType() {
		return 'any';
	}

	getName() {
		return 'Any';
	}

    _getTypeOf() {
        return null;
    }
}