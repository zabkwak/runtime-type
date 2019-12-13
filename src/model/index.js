import type from './decorator.type';

export default class Model {

	static type = type;

	static create(data) {
		const instance = new this();
		Object.keys(data).forEach((key) => instance[key] = data[key]);
		return instance;
	}

	toJSON() {
		const properties = [...(this.__properties__ || []), ...Object.getOwnPropertyNames(this)];
		const t = this;
		return properties.reduce((acc, cur, index) => {
			const value = t[cur];
			acc[cur] = value && value.toJSON ? value.toJSON() : value;
			return acc;
		}, {});
	}
}
