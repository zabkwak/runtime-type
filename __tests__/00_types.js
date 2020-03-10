import { expect } from 'chai';
import Error from 'smart-error';
import Type from '../src';

const BaseType = Type.Type;

const castError = (type, value, code = 'ERR_INVALID_CAST') => {
	expect(type.cast.bind(type, value)).to.throw(Error).that.has.property('code', code);
}

describe('Any type', () => {

	const values = [5, '5', 5.5, 'abc', null, undefined, new Date(), { a: 5 }, [5], { 5: 5 }];

	it('checks the cast validators', () => {
		values.forEach(value => expect(Type.any.canCast(value)).to.be.true);
	});

	it('casts the values to the any', () => {
		values.forEach(value => expect(Type.any.cast(value)).to.be.equal(value));
	});

	it('tests the typeof', () => {
		expect(Type.any.isValidType(5)).to.be.true;
		expect(Type.any.isValidType('5')).to.be.true;
		expect(Type.any.isValidType(5.5)).to.be.true;
		expect(Type.any.isValidType(true)).to.be.true;
		expect(Type.any.isValidType({})).to.be.true;
	});

	it('strictly tests the type', () => {
		expect(Type.any.isValid(5)).to.be.true;
		expect(Type.any.isValid('5')).to.be.true;
		expect(Type.any.isValid(5.5)).to.be.true;
		expect(Type.any.isValid(true)).to.be.true;
		expect(Type.any.isValid([])).to.be.true;
	});
});

describe('Integer type', () => {

	const valid = [5, '5', 5.5, '5abc'];
	const invalid = [null, undefined, 'abc5', new Date(), { a: 5 }, [5], { 5: 5 }];

	it('checks the cast validators', () => {
		valid.forEach(value => expect(Type.integer.canCast(value)).to.be.true);
		invalid.forEach(value => expect(Type.integer.canCast(value)).to.be.false);
	});

	it('casts the values to the integer', () => {
		valid.forEach(value => expect(Type.integer.cast(value)).to.be.equal(5));
		invalid.forEach(value => expect(castError(Type.integer, value)));
	});

	it('tests the typeof', () => {
		expect(Type.integer.isValidType(5)).to.be.true;
		expect(Type.integer.isValidType('5')).to.be.false;
		expect(Type.integer.isValidType(5.5)).to.be.false;
		expect(Type.integer.isValidType(true)).to.be.false;
		expect(Type.integer.isValidType([])).to.be.false;
	});

	it('strictly tests the type', () => {
		expect(Type.integer.isValid(5)).to.be.true;
		expect(Type.integer.isValid('5')).to.be.false;
		expect(Type.integer.isValid(5.5)).to.be.false;
		expect(Type.integer.isValid(true)).to.be.false;
		expect(Type.integer.isValid([])).to.be.false;
	});
});

describe('Float type', () => {

	const valid = ['5.5', 5.5, '5.5abc'];
	const invalid = [null, undefined, 'abc5', new Date(), { a: 5 }, [5], { 5: 5 }];

	it('checks the cast validators', () => {
		valid.forEach(value => expect(Type.float.canCast(value)).to.be.true);
		invalid.forEach(value => expect(Type.float.canCast(value)).to.be.false);
	});

	it('casts the values to the integer', () => {
		valid.forEach(value => expect(Type.float.cast(value)).to.be.equal(5.5));
		invalid.forEach(value => expect(castError(Type.float, value)));
	});

	it('tests the typeof', () => {
		expect(Type.float.isValidType(5)).to.be.true;
		expect(Type.float.isValidType('5')).to.be.false;
		expect(Type.float.isValidType(5.5)).to.be.true;
		expect(Type.float.isValidType(true)).to.be.false;
		expect(Type.float.isValidType([])).to.be.false;
	});

	it('strictly tests the type', () => {
		expect(Type.float.isValid(5)).to.be.true;
		expect(Type.float.isValid('5')).to.be.false;
		expect(Type.float.isValid(5.5)).to.be.true;
		expect(Type.float.isValid(true)).to.be.false;
		expect(Type.float.isValid([])).to.be.false;
	});
});

describe('Boolean type', () => {

	const t = [5, '5', 'true'];
	const f = [0, '0', 'false'];

	it('checks the cast validators', () => {
		t.forEach(value => expect(Type.boolean.canCast(value)).to.be.true);
		f.forEach(value => expect(Type.boolean.canCast(value)).to.be.true);
	});

	it('casts the values to the boolean', () => {
		t.forEach(value => expect(Type.boolean.cast(value)).to.be.true);
		f.forEach(value => expect(Type.boolean.cast(value)).to.be.false);
	});

	it('tests the typeof', () => {
		expect(Type.boolean.isValidType(5)).to.be.false;
		expect(Type.boolean.isValidType('5')).to.be.false;
		expect(Type.boolean.isValidType(5.5)).to.be.false;
		expect(Type.boolean.isValidType(true)).to.be.true;
		expect(Type.boolean.isValidType([])).to.be.false;
	});

	it('strictly tests the type', () => {
		expect(Type.boolean.isValid(5)).to.be.false;
		expect(Type.boolean.isValid('5')).to.be.false;
		expect(Type.boolean.isValid(5.5)).to.be.false;
		expect(Type.boolean.isValid(true)).to.be.true;
		expect(Type.boolean.isValid([])).to.be.false;
	});
});

describe('String type', () => {

	it('casts the values to the string', () => {
		expect(Type.string.cast(5)).to.be.equal('5');
		expect(Type.string.cast(5.5)).to.be.equal('5.5');
		expect(Type.string.cast({})).to.be.equal('[object Object]');
		expect(Type.string.cast(Type.any)).to.be.equal('any');
	});

	it('tests the typeof', () => {
		expect(Type.string.isValidType(5)).to.be.false;
		expect(Type.string.isValidType('5')).to.be.true;
		expect(Type.string.isValidType(5.5)).to.be.false;
		expect(Type.string.isValidType(true)).to.be.false;
		expect(Type.string.isValidType([])).to.be.false;
	});

	it('strictly tests the type', () => {
		expect(Type.string.isValid(5)).to.be.false;
		expect(Type.string.isValid('5')).to.be.true;
		expect(Type.string.isValid(5.5)).to.be.false;
		expect(Type.string.isValid(true)).to.be.false;
		expect(Type.string.isValid([])).to.be.false;
	});
});

describe('Date type', () => {

	it('checks the cast validators', () => {
		expect(Type.date.canCast(new Date())).to.be.true;
		expect(Type.date.canCast(0)).to.be.true;
		expect(Type.date.canCast('2018-05-18')).to.be.true;
		expect(Type.date.canCast(-1)).to.be.true;
		expect(Type.date.canCast('baflek')).to.be.false;
	});

	it('casts the values to date', () => {
		expect(Type.date.cast(new Date()).getTime()).to.be.equal(new Date().getTime());
		expect(Type.date.cast(0).getTime()).to.be.equal(new Date('1970-01-01 01:00:00').getTime()); // TODO CET!!!
		expect(Type.date.cast('2018-05-18').getTime()).to.be.equal(new Date('2018-05-18').getTime());
		castError(Type.date, 'baflek');
	});
});

describe('Object type', () => {

	class Test { }

	const valid = [null, {}, { a: 5 }, [], [5], new Date(), new Test(), new Error()];
	const invalid = [undefined, true, false, 5, 5.5];

	it('checks the cast validators', () => {
		valid.forEach(value => expect(Type.object.canCast(value)).to.be.true);
		invalid.forEach(value => expect(Type.object.canCast(value)).to.be.false);
	});

    /*it('casts the values to the boolean', () => {
        t.forEach(value => expect(Type.boolean.cast(value)).to.be.true);
        f.forEach(value => expect(Type.boolean.cast(value)).to.be.false);
    });*/
});

describe('Enum type', () => {

	const en = Type.enum('test', 'baf');

	it('checks if enum has all values', (done) => {
		expect(en).to.be.an.instanceOf(BaseType);
		expect(en.defaultValue).to.be.equal('test');
		expect(en.values).to.have.all.members(['test', 'baf']);
		done();
	});

	// TODO better describe
	it('casts the value to the enum', (done) => {
		expect(en.cast('test')).to.be.equal('test');
		done();
	});

	// TODO better describe
	it('tries to cast invalid value of the enum', (done) => {
		castError(en, 'lek');
		done();
	});
});

describe('InstanceOf type', () => {

	class T { }

	it('checks if the values is instance of defined type', () => {
		expect(Type.instanceOf(Array).canCast([])).to.be.true;
		expect(Type.instanceOf(Array).canCast(new Date())).to.be.false;

		expect(Type.instanceOf(Date).canCast(new Date())).to.be.true;
		expect(Type.instanceOf(Date).canCast([])).to.be.false;

		expect(Type.instanceOf(Error).canCast(new Error())).to.be.true;
		expect(Type.instanceOf(T).canCast(new T())).to.be.true;
	});
});

describe('ArrayOf type', () => {

	it('creates the type', () => {
		expect(Type.arrayOf(Type.integer)).to.be.instanceOf(BaseType);
	});

	it('tries to create the type from invalid type', () => {
		expect(() => Type.arrayOf('something')).to.throw(Error).that.has.property('code', 'ERR_UNSUPPORTED_OPERATION');
	});

	it('checks if the array contains all valid types', () => {
		expect(Type.arrayOf(Type.integer).canCast([1, 2, 3, 4, 5])).to.be.true;
		expect(Type.arrayOf(Type.integer).canCast(['1', '2', '3', '4', '5'])).to.be.true;
		expect(Type.arrayOf(Type.integer).canCast(['test', 'test'])).to.be.false;
		expect(Type.arrayOf(Type.integer).canCast([new Date(), Date.now()])).to.be.false;
	});

	it('tries to cast the type', () => {
		expect(Type.arrayOf(Type.integer).cast(['1', '2', '3', '4', '5'])).to.deep.equal([1, 2, 3, 4, 5]);
		castError(Type.arrayOf(Type.integer), [2, 'test', 'test', '1']);
	});
});

describe('Shape type', () => {

	const shape = { integer: Type.integer, string: Type.string };

	it('creates the shape', () => {
		expect(Type.shape(shape)).to.be.an.instanceOf(BaseType);
	});

	it('tries to create the shape from invalid type', () => {
		expect(() => Type.shape({ something: 'something' })).to.throw(Error).that.has.property('code', 'ERR_UNSUPPORTED_OPERATION');
	})

	it('checks if the shape contains all valid types', () => {
		expect(Type.shape(shape).canCast({ integer: 5, string: 'string' })).to.be.true;
		expect(Type.shape(shape).canCast({ integer: '5', string: 'string' })).to.be.true;
		expect(Type.shape(shape).canCast({ integer: 'string', string: 'string' })).to.be.false;
	});

	it('tries to cast the type', () => {
		expect(Type.shape(shape).cast({ integer: 5, string: 'string' })).to.deep.equal({ integer: 5, string: 'string' });
		expect(Type.shape(shape).cast({ integer: '5', string: 'string' })).to.deep.equal({ integer: 5, string: 'string' });
		castError(Type.shape(shape), { integer: 'string', string: 'string' });
	});

	it('tries to cast the shape with field which is not defined in the shape definition', () => {
		expect(Type.shape(shape).canCast({ integer: 1, string: 'string', not_defined: 'not defined' })).to.be.false;
	});

	it('tries to cast the type with missing key', () => {
		castError(Type.shape(shape), { integer: 5 }, 'ERR_UNSUPPORTED_OPERATION');
	});

	it('checks the multi-shape shape', () => {
		const s = Type.shape({
			...shape,
			shape: Type.shape(shape),
		});
		expect(s).to.be.an.instanceOf(BaseType);
		expect(s.canCast({
			integer: 5,
			string: 'string',
			shape: {
				integer: 5,
				string: 'string',
			},
		})).to.be.true;
		expect(s.canCast({
			integer: 5,
			string: 'string',
			shape: {
				integer: 'string',
				string: 'string',
			},
		})).to.be.false;
	});

	it('checks the any types in shape', () => {
		const s = Type.shape({
			integer: Type.any,
			string: Type.string,
		});
		expect(s).to.be.an.instanceOf(BaseType);
		expect(s.canCast({
			integer: 1,
			string: 'string',
		})).to.be.true;
		expect(s.canCast({
			integer: 0,
			string: 'string',
		})).to.be.true;
	});

	it('checks the shape with defined optional keys', () => {
		const s = Type.shape({
			integer: Type.integer,
			'string?': Type.string,
		});
		expect(s).to.be.an.instanceOf(BaseType);
		expect(s.canCast({
			integer: 1,
			string: 'string',
		})).to.be.true;
		expect(s.canCast({
			integer: 1,
		})).to.be.true;
		expect(s.canCast({
			integer: 'string',
			string: 'string',
		})).to.be.false;
		expect(s.canCast({
			string: 'string',
		})).to.be.false;
	});
});

describe('toString()', () => {

	it('calls toString method on every type', () => {
		expect(Type.any.toString()).to.be.equal('any');
		expect(Type.arrayOf(Type.any).toString()).to.be.equal('any[]');
		expect(Type.boolean.toString()).to.be.equal('boolean');
		expect(Type.date.toString()).to.be.equal('date');
		expect(Type.enum('test', 'test', 'baf', 'lek').toString()).to.be.equal('enum(\'test\',\'baf\',\'lek\')');
		expect(Type.float.toString()).to.be.equal('float');
		expect(Type.instanceOf(Date).toString()).to.be.equal('Date');
		expect(Type.integer.toString()).to.be.equal('integer');
		expect(Type.object.toString()).to.be.equal('object');
		expect(Type.shape({ test: Type.integer }).toString()).to.be.equal('shape({"test":"integer"})');
		expect(Type.shape({ test: Type.integer, 'optional?': Type.string }).toString()).to.be.equal('shape({"test":"integer","optional?":"string"})');
		expect(Type.string.toString()).to.be.equal('string');
	});
});

describe('fromString(type)', () => {

	it('gets the valid type from string', () => {
		expect(Type.fromString('integer')).to.be.equal(Type.integer);
		expect(Type.fromString('float')).to.be.equal(Type.float);
		expect(Type.fromString('string')).to.be.equal(Type.string);
		expect(Type.fromString('date')).to.be.equal(Type.date);
		expect(Type.fromString('boolean')).to.be.equal(Type.boolean);
		expect(Type.fromString('object')).to.be.equal(Type.object);
		expect(Type.fromString('any')).to.be.equal(Type.any);

		expect(Type.fromString('integer[]').toString()).to.be.equal(Type.arrayOf(Type.integer).toString());
		expect(Type.fromString('float[]').toString()).to.be.equal(Type.arrayOf(Type.float).toString());
		expect(Type.fromString('string[]').toString()).to.be.equal(Type.arrayOf(Type.string).toString());
		expect(Type.fromString('date[]').toString()).to.be.equal(Type.arrayOf(Type.date).toString());
		expect(Type.fromString('boolean[]').toString()).to.be.equal(Type.arrayOf(Type.boolean).toString());
		expect(Type.fromString('object[]').toString()).to.be.equal(Type.arrayOf(Type.object).toString());
		expect(Type.fromString('any[]').toString()).to.be.equal(Type.arrayOf(Type.any).toString());

		expect(Type.fromString('enum(\'test\',\'baf\',\'lek\')').toString()).to.be.equal(Type.enum('test', 'baf', 'lek').toString());
		expect(Type.fromString('enum(test, baf, lek)').toString()).to.be.equal(Type.enum('test', 'baf', 'lek').toString());

		expect(Type.fromString('shape({"test":"integer"})').toString()).to.be.equal(Type.shape({ test: Type.integer }).toString());
		expect(Type.fromString('shape({"test":"integer","string":"string"})').toString()).to.be.equal(Type.shape({ test: Type.integer, string: Type.string }).toString());
		expect(Type.fromString('shape({"test":"integer","string?":"string"})').toString()).to.be.equal(Type.shape({ test: Type.integer, 'string?': Type.string }).toString());

		expect(Type.fromString('shape({"test":"integer"})[]').toString()).to.be.equal(Type.arrayOf(Type.shape({ test: Type.integer })).toString());


		expect(() => Type.fromString('test')).to.throw(Error).that.has.property('code', 'ERR_UNSUPPORTED_OPERATION');
		expect(() => Type.fromString('test[]')).to.throw(Error).that.has.property('code', 'ERR_UNSUPPORTED_OPERATION');
		expect(() => Type.fromString('shape({"test":"test"})')).to.throw(Error).that.has.property('code', 'ERR_UNSUPPORTED_OPERATION');

	});
});

describe('Instance comparing', () => {

	it('compares the types', () => {
		expect(Type.integer.compare(Type.integer)).to.be.true;
		expect(Type.integer.compare(Type.string)).to.be.false;

		expect(Type.arrayOf(Type.integer).compare(Type.arrayOf(Type.integer))).to.be.true;
		expect(Type.arrayOf(Type.integer).compare(Type.arrayOf(Type.string))).to.be.false;

		expect(Type.shape({ integer: Type.integer }).compare(Type.shape({ integer: Type.integer }))).to.be.true;
		expect(Type.shape({ integer: Type.integer }).compare(Type.shape({ integer: Type.string }))).to.be.false;
		expect(Type.shape({ integer: Type.integer }).compare(Type.shape({ string: Type.integer }))).to.be.false;
		expect(Type.shape({ integer: Type.integer }).compare(Type.shape({ string: Type.string }))).to.be.false;

		expect(Type.enum('test', 'baf', 'lek').compare(Type.enum('test', 'baf', 'lek'))).to.be.true;
		expect(Type.enum('test', 'baf', 'lek').compare(Type.enum('test', 'baf'))).to.be.false;
		expect(Type.enum('test', 'baf', 'lek').compare(Type.enum('test', 'lek', 'baf'))).to.be.false;
	});
});
