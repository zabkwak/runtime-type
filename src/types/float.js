import Base from './base/numeric';

export default class Float extends Base {

	getName() {
		return 'Float';
	}

    _cast(value) {
        return parseFloat(value);
    }
}