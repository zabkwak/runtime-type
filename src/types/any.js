import Base from './base/nullable';

export default class Any extends Base {

    cast(value) {
        return value;
    }

    isValidType(value) {
        return true;
    }

    _getTypeOf() {
        return null;
    }
}