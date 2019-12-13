import { expect } from 'chai';
import Error from 'smart-error';

import Type, { Model } from '../src';

describe('class without properties', () => {

	class A extends Model { }

	it('creates instance', () => {
		const a = new A();
		expect(a).instanceOf(Model);
		expect(a).instanceOf(A);
		expect(JSON.stringify(a)).to.be.equal('{}');
	});
});

describe('class with defined properties', () => {

	class A extends Model {

		@Model.type(Type.integer)
		a = 0;

		@Model.type(Type.integer, true)
		b = null;

		@Model.type(Type.integer)
		c;

		d = null;
	}

	it('creates instance', () => {
		const a = new A();
		expect(a).instanceOf(Model);
		expect(a).instanceOf(A);
		expect(JSON.stringify(a)).to.be.equal('{"a":0,"b":null,"d":null}');
		expect(() => a.a = 'test').to.throw(Error).that.has.property('code', 'ERR_INVALID_CAST');
		a.c = 666;
		expect(JSON.stringify(a)).to.be.equal('{"a":0,"b":null,"c":666,"d":null}');
	});

	it('creates instance with create method', () => {
		const a = A.create({ c: 666, e: 'test' });
		expect(a).instanceOf(Model);
		expect(a).instanceOf(A);
		expect(JSON.stringify(a)).to.be.equal('{"a":0,"b":null,"c":666,"d":null,"e":"test"}');
	});
});