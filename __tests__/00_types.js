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
	});

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

	it('checks the shape with defined dynamic key', () => {
		const s = Type.shape({
			number: Type.integer,
			'[dynamic]': Type.integer,
			'[optionalDynamic]?': Type.date,
		});
		expect(s).to.be.an.instanceOf(BaseType);
		expect(s.canCast({
			number: 1,
			integer: 1,
		})).to.be.true;
		expect(s.canCast({
			number: 1,
			integer: 'string',
		})).to.be.false;
		expect(s.canCast({
			number: 1,
			string: 'string',
		})).to.be.false;
		expect(s.canCast({
			number: 1,
			integer: 1,
			string: 'string',
		})).to.be.false;
		expect(s.canCast({
			number: 1,
			string: 1,
		})).to.be.true;
		expect(s.canCast({
			number: 1,
			string: 1,
			integer: 1,
		})).to.be.true;
		expect(s.canCast({
			number: 1,
		})).to.be.false;
		expect(s.canCast({
			number: 1,
			integer: 1,
			integer_02: 2,
			date: new Date(),
		})).to.be.true;
		expect(s.canCast({
			number: 1,
			integer: 1,
			date: 'date',
		})).to.be.false;		
	});

	it('checks the dynamic shape', () => {
		const s = Type.shape({
			'[dynamic]': Type.any,
		});
		expect(s).to.be.an.instanceOf(BaseType);
		expect(s.canCast({
			number: 1,
			integer: 1,
		})).to.be.true;
		expect(s.canCast({
			number: 1,
			integer: 'string',
		})).to.be.true;
		expect(s.canCast({
			number: 1,
			integer: 1,
			string: 'string',
		})).to.be.true;
		expect(s.canCast({
			number: 1,
			string: 1,
		})).to.be.true;
		expect(s.canCast({
			number: 1,
			string: 1,
			integer: 1,
		})).to.be.true;
		expect(s.canCast({
			number: 1,
		})).to.be.true;
		expect(s.canCast({
			number: 1,
			integer: 1,
			date: new Date(),
		})).to.be.true;
		expect(s.canCast({
			number: 1,
			integer: 1,
			date: 'date',
		})).to.be.true;
		expect(s.canCast({
			number: 1,
			integer: 1,
			date: 'date',
			bool: false,
		})).to.be.true;
	});
});

describe('Union type', () => {

	it('creates the union', () => {
		expect(Type.union(Type.string, Type.integer)).to.be.an.instanceOf(BaseType);
	});

	it('tries to create the union from invalid type', () => {
		expect(() => Type.union('something')).to.throw(Error).that.has.property('code', 'ERR_UNSUPPORTED_OPERATION');
	});

	it('checks if the union can be cast', () => {
		expect(Type.union(Type.string, Type.integer).canCast(5)).to.be.true;
		expect(Type.union(Type.string, Type.integer).canCast('5')).to.be.true;
		expect(Type.union(Type.string, Type.integer).canCast('string')).to.be.true;
		expect(Type.union(Type.date, Type.integer).canCast({ integer: 'string', string: 'string' })).to.be.false;
	});

	it('tries to cast the type', () => {
		expect(Type.union(Type.string, Type.integer).cast(5))
			.to.deep.equal('5');
		expect(Type.union(Type.integer, Type.string).cast('5')).
			to.deep.equal(5);
		expect(Type.union(Type.integer, Type.string).cast('string')).
			to.deep.equal('string');
		castError(Type.union(Type.date, Type.integer), { integer: 'string', string: 'string' });
	});

	it('tests the typeof', () => {
		expect(Type.union(Type.string, Type.integer).isValidType(5)).to.be.true;
		expect(Type.union(Type.string, Type.integer).isValidType('5')).to.be.true;
		expect(Type.union(Type.string, Type.integer).isValidType(5.5)).to.be.false;
		expect(Type.union(Type.string, Type.integer).isValidType(true)).to.be.false;
		expect(Type.union(Type.string, Type.integer).isValidType([])).to.be.false;
		expect(Type.union(Type.string, Type.integer).isValidType({})).to.be.false;
	});

	it('strictly tests the type', () => {
		expect(Type.union(Type.string, Type.integer).isValid(5)).to.be.true;
		expect(Type.union(Type.string, Type.integer).isValid('5')).to.be.true;
		expect(Type.union(Type.string, Type.integer).isValid(5.5)).to.be.false;
		expect(Type.union(Type.string, Type.integer).isValid(true)).to.be.false;
		expect(Type.union(Type.string, Type.integer).isValid([])).to.be.false;
		expect(Type.union(Type.string, Type.integer).isValid({})).to.be.false;
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
		expect(Type.shape({
			test: Type.integer,
			'[dynamic]': Type.integer,
			'[dynamicOptional]?': Type.string,
		}).toString()).to.be.equal('shape({"test":"integer","[dynamic]":"integer","[dynamicOptional]?":"string"})');
		expect(Type.string.toString()).to.be.equal('string');
		expect(Type.union(Type.string, Type.integer).toString()).to.be.equal('union(string,integer)');
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
		expect(Type.fromString('{"test":"integer","string?":"string"}').toString()).to.be.equal(Type.shape({ test: Type.integer, 'string?': Type.string }).toString());

		expect(Type.fromString('shape({"test":"integer"})[]').toString()).to.be.equal(Type.arrayOf(Type.shape({ test: Type.integer })).toString());
		expect(Type.fromString('enum(\'test\',\'baf\',\'lek lek\')[]').toString()).to.be.equal(Type.arrayOf(Type.enum('test', 'baf', 'lek lek')).toString());
		
		expect(Type.fromString('shape({"tracking_id":"string","events?":"shape({\\"key\\":\\"string\\",\\"event\\":\\"string\\",\\"event_category\\":\\"string\\",\\"event_label\\":\\"string\\",\\"value?\\":\\"integer\\"})[]"})').toString()).to.be.equal(Type.shape({
			tracking_id: Type.string,
			'events?': Type.arrayOf(Type.shape({
				key: Type.string,
				event: Type.string,
				event_category: Type.string,
				event_label: Type.string,
				'value?': Type.integer,
			})),
		}).toString());
		expect(Type.fromString('shape({\"content\":\"string\",\"filename\":\"string\",\"type?\":\"enum(\'application/json\',\'text/html\')\"})[]').toString()).to.be.equal(Type.arrayOf(
			Type.shape({
				content: Type.string,
				filename: Type.string,
				'type?': Type.enum_('application/json', 'text/html'),
			}),
		).toString());

		expect(Type.fromString('union(string,integer)').toString())
			.to.be.equal(Type.union(Type.string, Type.integer).toString());

		expect(() => Type.fromString('test')).to.throw(Error).that.has.property('code', 'ERR_UNSUPPORTED_OPERATION');
		expect(() => Type.fromString('test[]')).to.throw(Error).that.has.property('code', 'ERR_UNSUPPORTED_OPERATION');
		expect(() => Type.fromString('shape({"test":"test"})')).to.throw(Error).that.has.property('code', 'ERR_UNSUPPORTED_OPERATION');

	});

	it('converts large enum from string', () => {
		const t = Type.fromString(`enum('Active sport s.r.o. - Hradecká 159 - 55101 - Jaroměř','Alpin sport - U Nádraží 5 - 41501 - Teplice','Alpina Sport - Starobranská 23 - 78701 - Šumperk','ALPITREK - Jičínská 15 - 74258 - Příbor','Bago sport - Drnovská 968 / 36 - 16100 - Praha 6','Bayo s.r.o. - Zahradní 1215 - 76001 - Zlín','Malenovice C.K.MATES - Svatojánské nám. 47 - 54101 - Trutnov','Crux Roman Blažek - Krymská 1734/41 - 36001 - Karlovy Vary','CYKLOSERVIS Mipos s.r.o. - T.G. Masaryka 44 - 67201 - Moravský Krumlov','CZ SPORT 2000 s.r.o. - Pražská 145 - 26101 - Příbram II','Český ráj outdoor s.r.o. - Hradišťská 1031 - 29306 - Kosmonosy','DENALI - ČSA 9 - 78901 - Zábřeh','Domino store CZ s.r.o. - Hlavní třída 44/32 - 73701 - Český Těšín','Dům sportu Stratílek s.r.o. - Smetanovo náměstí 91 - 57001 - Litomyšl','Erco sport Gaier Jindřich - Smetanova 737 - 39002 - Tábor','Falco-Sport - Vysoké nad Jizerou 131 - 51211 - Vysoké nad Jizerou','ForCamping - Sokolovská 352/215 - 19000 - Praha 9','Gekko sport Outdoor - Partyzánská 18 - 74601 - Opava 1','Hanibal sport - Korunní 16 - 12000 - Praha 2','Hannah Futurum Ostrava - Novinářská 6A/3178 - 70200 - Ostrava 1','Hannah Galerie Šantovka Olomouc - Polská 1 - 77900 - Olomouc','Hannah Klatovy\tKpt. Jaroše 51\t33901\tKlatovy','Hannah Nisa Liberec - České mládeže 456 - 46003 - Liberec','Hannah OC Letňany Praha - Veselská 663 - 19900 - Praha 9','Hannah OC Stromovka Praha - Veletržní 24 - 17000 - Praha 7','Hannah Olympia Plzeň - Písecká 972/1 - 32600 - Plzeň','HELIA TRADE spol. s r.o. - Úvoz 59/61 - 60200 - Brno','HELIA TRADE spol. s r.o. - Kouty nad Desnou 30 - 78811 - Kouty nad Desnou','HELIA TRADE spol. s r.o. - I.P. Pavlova 738/116 - 77900 - Olomouc','HELIA TRADE spol. s r.o. - Porubská 708 - 70800 - Ostrava - Poruba','HELIA TRADE spol. s r.o. - Střelničná 1 - 18200 - Praha 8 - Kobylisy','HELIA TRADE spol. s r.o. - Žerotínovo nám. 24 - 75000 - Přerov','HOLAS SPORT A TURISTIKA - Náměstí 6 - 75701 - Valašské Meziříčí','Infinity Intersport - Soběslavská 3061 - 39002 - Tábor','Intersport - Domažlická OC Škodovka - 33901 - Klatovy','INTERSPORT - Americká 3252 Shopping Jih - 27201 - Kladno','INTERSPORT - OC Na soutoku Želetická - 41201 - Litoměřice','Intersport - Nádražní 32 - 75661 - Rožnov pod Radhoštěm','Intersport TK - Nerudova 251 - 68801 - Uherský Brod','K sport - Knižecí pivovar - 38301 - Prachatice','K+K sport - Štefanikova 13 - 60200 - Brno','KM Sport - Palackého 693 - 51601 - Rychnov nad Kněžnou','Kola Čapek - Palackého 27 - 58856 - Telč','La Rambla s.r.o. - Pode Dvory 2913 - 32300 - Plzeň','Lamex s.r.o. - Hliníky 4 - 68001 - Boskovice','Naturekids - Kubíčkova 6 - 635 00 - Brno','Oděvy Chlebiš s.r.o. - Hrnčířská 266/14 - 74801 - Hlučín','OK Sport Czech s.r.o. - Široká 115 - 53701 - Chrudim I','OK Universe s.r.o. - Rodinova 9 - 69501 - Hodonín','OK-Móda - 17. listopadu 2185/19 - 68001 - Boskovice','Outdoorweb s.r.o. - Náměstí Míru 26 - 67602 - Moravské Budějovice','Panda outdoor - Prokopova 26 - 39701 - Písek','Prodejna Symbol - Nám. Minoritů 129/20 - 79401 - Krnov','Prosports - Dobrovského 2 - 68201 - Vyškov','Refugio - Tisá 372 - 40336 - Tisá','RINA SPORT - ul. 9. května 1375/40 - 40801 - Rumburk 1','RM - SPORT s.r.o. - Kostelní 7 - 51801 - Dobruška','Road Outdoor Centrum - Smetanovo náměstí 3290 - 58001 - Havlíčkův Brod','Rock Point - Vrážská 1507 - 15300 - Praha 5 - Radotín','Rock Point Arkády Pankrác Praha - Na Pankráci 86 - 14000 - Praha 4','Rock Point Avion Shopping Park Ostrava - Rudná 3114/114 - 70030 - Ostrava','Rock Point Centrum Stromovka - Veletržní 24 - 17000 - Praha 7','Rock Point Forum Liberec - Soukenné nám. 2a/669 - 46080 - Liberec','Rock Point Forum Nová Karolina Ostrava - Jantarová 3344/4 - 70200 - Ostrava 2','Rock Point Futurum Hradec Králové - Brněnská 1825/23a - 50009 - Hradec Králové','Rock Point Galerie Vaňkovka Brno - Ve Vaňkovce 1 - 60200 - Brno','Rock Point Josefská Brno - Josefská 425/27 (Masarykova 33) - 60200 - Brno','Rock Point Nisa Liberec - České mládeže 456 - 46003 - Liberec','Rock Point Novodvorská Plaza Praha - Novodvorská 1800/136 - 14200 - Praha 4','Rock Point OC Atrium Palác Pardubice - Masarykovo nám. 2799 - 53002 - Pardubice','Rock Point OC Letňany Praha - Veselská 663 - 19900 - Praha 9','Rock Point OC Nový Smíchov Praha - Plzeňská 8 - 15000 - Praha 5','Rock Point OC Olympia Mladá Boleslav - Jičínská 1350/III - 29301 - Mladá Boleslav','Rock Point OC Šestka Praha - Fajtlova 1090/1 - 16100 - Praha 6','Rock Point Olympia Brno - U Dálnice 777 - 66442 - Brno - Modřice','Rock Point Olympia Olomouc - Olomoucká 90 - 77700 - Velký Týnec','Rock Point Olympia Teplice - Srbická 464 - 41510 - Teplice','Rock Point Perštýn Praha - Martinská 360/2 - 11000 - Praha 1','Rock Point Plzeň - Americká 2796/54 - 30100 - Plzeň','Rock Point Poříčí Praha - Na Poříčí 1040/10 - 11000 - Praha 1','Rock Point Riegrova Olomouc - Riegrova 405/3 - 77900 - Olomouc','Rock Point Špindlerův Mlýn - Špindlerův Mlýn 297 - 54351 - Špindlerův Mlýn','Rock Point City Park Jihlava - Hradební 1 - 58601 - Jihlava','Rock Point OSC IGY České Budějovice - Pražská tř. 1247/24 - 37004 - České Budějovice','Sanasport - Údolní 27 - 60200 - Brno','Ski cyklo - Hlavní 140 - 69617 - Dolní Bojanovice','Ski sport Rokytnice s.r.o. - Horní náměstí 655 - 51244 - Rokytnice nad Jizerou','Sport - D - Kl. Čermáka 109 - 28601 - Čáslav - St.Město','Sport 2000 - OD Andy Erbenova 2906 - 47001 - Česká Lípa','Sport Bart s.r.o. - Mírové náměstí 9 - 56201 - Ústí nad Orlicí','SPORT CYKLO s.r.o. - Masarykova 651/11 - 76901 - Holešov','Sport Derfl - Náměstí Palackého 1092 - 27801 - Kralupy nad Vltavou','Sport Kamila - Husova 14A - 69002 - Břeclav','Sport Kamzík spol. s r.o. - nám. Přemysla Otakara II. 24 - 37001 - České Budějovice','Sport Orlita s.r.o. - Pančava 492 - 76001 - Zlín - Příluky','Obuv-oblečení - Masarykovo nám. 173 - 51401 - Jilemnice','SPORT PLUS - Táboritská 368 - 37901 - Třeboň','Sport Podestát - Náměstí Míru 64 - 34401 - Domažlice','Sport Prachov - Palackého 73 - 50601 - Jičín','Sport Stach - Palackého 83/16 - 54101 - Trutnov','SPORT VACÍK 1976 - Masarykovo nám. 79 - 39301 - Pelhřimov','Sportcentrum - Na Vyhlídce 612 - 56164 - Jablonné nad Orlicí','SportObchod.cz - Křenová 26 - 60200 - Brno','SPORTOVNÍ ODĚVY - nám. Svobody 6 - 73801 - Frýdek Místek','Sun ski sport s.r.o. - Bezručova 1371 - 79001 - Jeseník','Tercie handicap s.r.o. - ČSLA 700 - 39111 - Planá nad Lužnicí','Tercie handicap s.r.o. - Masarykova 438 - 399 01 - Milevsko','UP&DOWN czech s.r.o. - Kamenice 133 - 54701 - Náchod','Wintersport - Bratří Štefanů 499 - 50003 - Hradec Králové','eshop: Altisport - Altisport.cz','eshop: Alza - Alza.cz','eshop: Internet Mall a.s. - Mall.cz')`);
		t.cast('Active sport s.r.o. - Hradecká 159 - 55101 - Jaroměř');
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

describe('TS typings', () => {

	it('checks the TS types', () => {
		expect(Type.integer.getTSType()).to.be.equal('number');
		expect(Type.float.getTSType()).to.be.equal('number');
		expect(Type.string.getTSType()).to.be.equal('string');
		expect(Type.date.getTSType()).to.be.equal('Date');
		expect(Type.boolean.getTSType()).to.be.equal('boolean');
		expect(Type.object.getTSType()).to.be.equal('any');
		expect(Type.any.getTSType()).to.be.equal('any');

		expect(Type.arrayOf(Type.string).getTSType()).to.be.equal('string[]');
		expect(Type.enum_('baf', 'lek').getTSType()).to.be.equal('\'baf\' | \'lek\'');

		expect(Type.shape({ test: Type.integer, 'optional?': Type.string }).getTSType()).to.be.equal('{ test: number, optional?: string }');
		expect(Type.shape({ test: Type.integer, 'optional?': Type.string }).getTSType(true)).to.be.equal('{\n\ttest: number;\n\toptional?: string;\n}');
		expect(Type.shape({ test: Type.shape({ nested: Type.string }) }).getTSType(true)).to.be.equal('{\n\ttest: {\n\t\tnested: string;\n\t};\n}');
		expect(Type.shape({ test: Type.integer, '[dynamic]': Type.string }).getTSType(true)).to.be.equal('{\n\ttest: number;\n\t[dynamic: string]: string;\n}');

		expect(Type.arrayOf(Type.shape({ test: Type.integer, 'optional?': Type.string })).getTSType(true)).to.be.equal('{\n\ttest: number;\n\toptional?: string;\n}[]');

		expect(Type.union(Type.string, Type.integer).getTSType()).to.be.equal('string | number');
	});
});
