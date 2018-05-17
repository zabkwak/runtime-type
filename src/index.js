import Integer from './types/integer';
import Float from './types/float';
import String from './types/string';
import DateType from './types/date';
import BooleanType from './types/boolean';
import ObjectType from './types/object';
import Enum from './types/enum';
import Any from './types/any';
import InstanceOf from './types/instanceof';
import ArrayOf from './types/arrayof';
import Shape from './types/shape';

import Type from './types/base';

const M = {
    integer: new Integer(),
    float: new Float(),
    string: new String(),
    date: new DateType(),
    boolean: new BooleanType(),
    object: new ObjectType(),
    any: new Any(),
    instanceOf: (Class) => new InstanceOf(Class),
    arrayOf: (type) => new ArrayOf(type),
    shape: (shape) => new Shape(shape),
    /**
     * 
     * @param {string} defaultValue 
     * @param {string[]} values 
     */
    enum: (defaultValue, ...values) => new Enum(defaultValue, ...values),

    isValidType: (type) => type instanceof Type,
};

export {
    M as default,
    Type,
};
