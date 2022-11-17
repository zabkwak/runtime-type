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
import Union from './types/union';

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
	union: (...types) => new Union(...types),

	isValidType: (type) => type instanceof Type,
	fromString(type) {
		if (this._typeCache[type]) {
			return this._typeCache[type];
		}
		const t = this._fromString(type);
		if (!this._cacheDisabled) {
			this._typeCache[type] = t;
		}
		return t;
	},
	disableCache() {
		this._cacheDisabled = true;
	},
	Type,
	Model,
	_fromString(type) {
		if (['integer', 'float', 'string', 'date', 'boolean', 'object', 'any'].includes(type)) {
			return this[type];
		}
		const arrayMarkIndex = type.lastIndexOf('[]');
		if (arrayMarkIndex === type.length - 2) {
			try {
				return this.arrayOf(this.fromString(type.substr(0, arrayMarkIndex)));
			} catch (e) {
				throw new Error(`Cannot convert '${type}' to Type.`, 'unsupported_operation', { error: e });
			}
		}
		const enumMatch = type.match(/^enum\((.+)\)$/);
		if (enumMatch) {
			const parts = enumMatch[1].split(',').map(a => a.replace(/'/g, '').trim());
			return this.enum(...parts);
		}
		const unionMatch = type.match(/^union\((.+)\)$/);
		if (unionMatch) {
			const types = unionMatch[1].split(',').map((t) => this.fromString(t));
			return this.union(...types);
		}
		const shapeMatch = type.match(/^shape\((.+)\)$/);
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
				throw new Error(`Cannot convert '${type}' to Type.`, 'unsupported_operation', { error: e });
			}
		}
		try {
			const json = JSON.parse(type);
			try {
				Object.keys(json).forEach((key) => {
					json[key] = this.fromString(json[key]);
				});
				return this.shape(json);
			} catch (e) {
				throw new Error(`Cannot convert '${type}' to Type.`, 'unsupported_operation', { error: e });
			}
		} catch (e) {
			if (e.code === 'ERR_UNSUPPORTED_OPERATION') {
				throw e;
			}
		}
		// TODO instanceOf?
		throw new Error(`Cannot convert '${type}' to Type.`, 'unsupported_operation');
	},
	_typeCache: {},
	_cacheDisabled: false,
};

export {
	Model,
	Type as BaseType,
	Integer,
	Float,
	String,
	DateType,
	BooleanType,
	ObjectType,
	Enum,
	Any as AnyType,
	InstanceOf,
	ArrayOf,
	Shape,
};
