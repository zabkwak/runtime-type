const cast = (type, value, isNullable = false) => {
	if (value === null && isNullable) {
		return value;
	}
	return type.cast(value);
};

export default (type, isNullable = false) => {
	return (target, property, descriptor) => {
		if (!target.__properties__) {
			target.__properties__ = [];
		}
		if (!target.__types__) {
			target.__types__ = {};
		}
		target.__properties__.push(property);
		target.__types__[property] = type;
		let v;
		if (descriptor.initializer) {
			v = cast(type, descriptor.initializer(), isNullable);
		}
		return {
			get: () => v,
			set: (value) => v = cast(type, value, isNullable),
			enumerable: true,
			configurable: false,
		};
	}
}
