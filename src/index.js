import Error from 'smart-error';

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

import Model from './model';

export default {
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
    enum: (defaultValue, ...values) => new Enum(defaultValue, ...values),
    enum_: (defaultValue, ...values) => new Enum(defaultValue, ...values),

    isValidType: (type) => type instanceof Type,
    fromString(type) {
        // TODO JSON as a shape?
        if (['integer', 'float', 'string', 'date', 'boolean', 'object', 'any'].includes(type)) {
            return this[type];
        }
        const arrayMatch = type.match(/(\w+)\[\]/);
        if (arrayMatch) {
            try {
                return this.arrayOf(this.fromString(arrayMatch[1]));
            } catch (e) {
                throw new Error(`Cannot convert '${type}' to Type.`, 'unsupported_operation');
            }
        }
        const enumMatch = type.match(/enum\((.+)\)/);
        if (enumMatch) {
            const parts = enumMatch[1].split(',').map(a => a.replace(/'/g, '').trim());
            return this.enum(...parts);
        }
        const shapeMatch = type.match(/shape\((.+)\)/);
        if (shapeMatch) {
            let shape;
            try {
                shape = JSON.parse(shapeMatch[1]);
            } catch (e) {
                throw new Error(e.message);
            }
            try {
                Object.keys(shape).forEach((key) => {
                    shape[key] = this.fromString(shape[key]);
                });
                return this.shape(shape);
            } catch (e) {
                throw new Error(`Cannot convert '${type}' to Type.`, 'unsupported_operation');
            }
        }
        // TODO instanceOf?
        throw new Error(`Cannot convert '${type}' to Type.`, 'unsupported_operation');
    },
	Type,
};

export {
	Model,
};
