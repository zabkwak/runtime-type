import Base from './base/numeric';

export default class Integer extends Base {

    isValidType(value) {
        return super.isValidType(value) && value.toString().indexOf('.') < 0;
	}
	
	getName() {
		return 'Integer';
	}

    _cast(value) {
        return parseInt(value);
    }
}