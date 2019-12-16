import type from './decorator.type';

export default class Model {

	static type = type;

	static create(data) {
		const instance = new this();
		instance.setData(data);
		return instance;
	}

	setData(data) {
		Object.keys(data).forEach((key) => this[key] = data[key]);
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
