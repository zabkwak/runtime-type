import { expect } from 'chai';
import Error from 'smart-error';
import Type from '../src';

const BaseType = Type.Type;

const castError = (type, value, code = 'ERR_INVALID_CAST') => {
    expect(type.cast.bind(type, value)).to.throw(Error).that.has.property('code', code);
}

describe('Any type', () => {

    const values = [5, '5', 5.5, 'abc', null, undefined, new Date(), { a: 5 }, [5], { 5: 5 }];

    it('checks the validators', () => {
        values.forEach(value => expect(Type.any.isValid(value)).to.be.true);
    });

    it('casts the values to the any', () => {
        values.forEach(value => expect(Type.any.cast(value)).to.be.equal(value));
    });
});

describe('Integer type', () => {

    const valid = [5, '5', 5.5, '5abc'];
    const invalid = [null, undefined, 'abc5', new Date(), { a: 5 }, [5], { 5: 5 }];

    it('checks the validators', () => {
        valid.forEach(value => expect(Type.integer.isValid(value)).to.be.true);
        invalid.forEach(value => expect(Type.integer.isValid(value)).to.be.false);
    });

    it('casts the values to the integer', () => {
        valid.forEach(value => expect(Type.integer.cast(value)).to.be.equal(5));
        invalid.forEach(value => expect(castError(Type.integer, value)));
    });
});

describe('Float type', () => {

    const valid = ['5.5', 5.5, '5.5abc'];
    const invalid = [null, undefined, 'abc5', new Date(), { a: 5 }, [5], { 5: 5 }];

    it('checks the validators', () => {
        valid.forEach(value => expect(Type.float.isValid(value)).to.be.true);
        invalid.forEach(value => expect(Type.float.isValid(value)).to.be.false);
    });

    it('casts the values to the integer', () => {
        valid.forEach(value => expect(Type.float.cast(value)).to.be.equal(5.5));
        invalid.forEach(value => expect(castError(Type.float, value)));
    });
});

describe('Boolean type', () => {

    const t = [5, '5', 'true'];
    const f = [0, '0', 'false'];

    it('checks the validators', () => {
        t.forEach(value => expect(Type.boolean.isValid(value)).to.be.true);
        f.forEach(value => expect(Type.boolean.isValid(value)).to.be.true);
    });

    it('casts the values to the boolean', () => {
        t.forEach(value => expect(Type.boolean.cast(value)).to.be.true);
        f.forEach(value => expect(Type.boolean.cast(value)).to.be.false);
    });
});

describe('String type', () => {

    it('casts the values to the string', () => {
        expect(Type.string.cast(5)).to.be.equal('5');
        expect(Type.string.cast(5.5)).to.be.equal('5.5');
        expect(Type.string.cast({})).to.be.equal('[object Object]');
        expect(Type.string.cast(Type.any)).to.be.equal('any');
    });
});

describe('Date type', () => {

    it('checks the validators', () => {
        expect(Type.date.isValid(new Date())).to.be.true;
        expect(Type.date.isValid(0)).to.be.true;
        expect(Type.date.isValid('2018-05-18')).to.be.true;
        expect(Type.date.isValid(-1)).to.be.true;
        expect(Type.date.isValid('baflek')).to.be.false;
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

    it('checks the validators', () => {
        valid.forEach(value => expect(Type.object.isValid(value)).to.be.true);
        invalid.forEach(value => expect(Type.object.isValid(value)).to.be.false);
    });

    /*it('casts the values to the boolean', () => {
        t.forEach(value => expect(Type.boolean.cast(value)).to.be.true);
        f.forEach(value => expect(Type.boolean.cast(value)).to.be.false);
    });*/
});

describe('Enum type', () => {

    const en = Type.enum('test', 'test', 'baf');

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
        expect(Type.instanceOf(Array).isValid([])).to.be.true;
        expect(Type.instanceOf(Array).isValid(new Date())).to.be.false;

        expect(Type.instanceOf(Date).isValid(new Date())).to.be.true;
        expect(Type.instanceOf(Date).isValid([])).to.be.false;

        expect(Type.instanceOf(Error).isValid(new Error())).to.be.true;
        expect(Type.instanceOf(T).isValid(new T())).to.be.true;
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
        expect(Type.arrayOf(Type.integer).isValid([1, 2, 3, 4, 5])).to.be.true;
        expect(Type.arrayOf(Type.integer).isValid(['1', '2', '3', '4', '5'])).to.be.true;
        expect(Type.arrayOf(Type.integer).isValid(['test', 'test'])).to.be.false;
        expect(Type.arrayOf(Type.integer).isValid([new Date(), Date.now()])).to.be.false;
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
        expect(Type.shape(shape).isValid({ integer: 5, string: 'string' })).to.be.true;
        expect(Type.shape(shape).isValid({ integer: '5', string: 'string' })).to.be.true;
        expect(Type.shape(shape).isValid({ integer: 'string', string: 'string' })).to.be.false;
    });

    it('tries to cast the type', () => {
        expect(Type.shape(shape).cast({ integer: 5, string: 'string' })).to.deep.equal({ integer: 5, string: 'string' });
        expect(Type.shape(shape).cast({ integer: '5', string: 'string' })).to.deep.equal({ integer: 5, string: 'string' });
        castError(Type.shape(shape), { integer: 'string', string: 'string' });
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
        expect(s.isValid({
            integer: 5,
            string: 'string',
            shape: {
                integer: 5,
                string: 'string',
            },
        })).to.be.true;
        expect(s.isValid({
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
            string: Type.string
        });
        expect(s).to.be.an.instanceOf(BaseType);
        expect(s.isValid({
            integer: 1,
            string: 'string',
        })).to.be.true;
        expect(s.isValid({
            integer: 0,
            string: 'string',
        })).to.be.true;
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
        expect(Type.string.toString()).to.be.equal('string');
    });
});
