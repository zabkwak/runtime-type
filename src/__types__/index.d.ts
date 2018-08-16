declare module 'runtime-type' {

    class Type {
        /**
         * Safely casts the value to the type. If the cast fails, the default value of the Type is returned.
         * @param value Value to cast.
         */
        saveCast(value: any): any;
        /**
         * Safely casts the value to the type. If the cast fails, the default value is returned.
         * @param value Value to cast.
         * @param defaultValue Returning value if the cast fails.
         */
        saveCast(value: any, defaultValue: any): any;

        /**
         * Gets the default value of the Type.
         * @abstract
         */
        getDefaultValue(): any;

        /**
         * Casts the value to the Type.
         * @param value Value to cast.
         * @abstract
         */
        cast(value: any): any;

        /**
         * Gets the name of the type.
         */
        getName(): string;

        /**
         * Checks if the value is valid Type.
         * @param value Value to check.
         */
        isValid(value: any): boolean;

        /**
         * Converts the type to string.
         */
        toString(): string;
    }

    class NullableType extends Type {
        getDefaultValue(): null;
    }

    class NumericType extends Type {
        /**
         * Casts the value to number.
         * @param value Value to cast.
         */
        cast(value: any): number;
        getDefaultValue(): 0;
    }

    class Integer extends NumericType {
        /**
         * Casts the value to number using `parseInt` function.
         * @param value Value to cast.
         */
        cast(value: any): number;
        toString(): 'integer';
    }
    class Float extends NumericType {
        /**
         * Casts the value to number using `parseFloat` function.
         * @param value Value to cast.
         */
        cast(value: any): number;
        toString(): 'float';
    }
    class String extends NullableType {
        /**
         * Casts the value to the string calling `toString` method.
         * @param value Value to cast.
         */
        cast(value: any): string;
        toString(): 'string';
    }
    class DateType extends NullableType {
        /**
         * Creates a `Date` instance from the value. If the value is `null` it is just returned.
         * @param value Value to cast.
         */
        cast(value: any): Date;
        getDefaultValue(): Date;
        toString(): 'integer';
    }
    class BooleanType extends Type {
        /**
         * Casts the value to the boolean using `Boolean` function. The values `'false'`, `'0'` are casted to `false`.
         * @param value Value to cast.
         */
        cast(value: any): boolean;
        getDefaultValue(): false;
        toString(): 'boolean';
    }
    class ObjectType extends Type {
        /**
         * Returns the value if the value is `typeof 'object'`.
         * @param value Value to cast.
         */
        cast(value: any): any;
        getDefaultValue(): any;
        toString(): 'object';
    }
    class AnyType extends Type {
        /**
         * It just returns the value.
         * @param value Value to cast.
         */
        cast(value: any): any;
        getDefaultValue(): any;
        toString(): 'any';
    }
    class InstanceOf extends NullableType {
        constructor(cls: typeof Object);
        /**
         * Returns the value if the values is `instanceOf` class from the constructor.
         * @param value Value to cast.
         */
        cast(value: any): any;
        getDefaultValue(): any;
        toString(): string;
    }
    class ArrayOf extends NullableType {
        constructor(type: Type);
        /**
         * Casts all of values elements to Type specified in the constructor.
         * @param value Array to cast.
         */
        cast(values: any[]): any[];
        getDefaultValue(): any;
    }
    class Shape extends NullableType {
        constructor(shape: { [key: string]: Type });
        /**
         * Casts all of the shape values to the shape of Types specified in the constructor.
         * @param value Shape to cast.
         */
        cast(value: any): { [key: string]: any };
        getDefaultValue(): any;
    }

    class Enum extends Type {
        constructor(...values: string[]);
        /**
         * 
         * @param defaultValue 
         * @param values 
         * @deprecated
         */
        constructor(defaultValue: string, ...values: string[]);
        /**
         * Returns the value if the value is defined in the values in the constructor.
         * @param value Value to cast.
         */
        cast(value: any): string;
        getDefaultValue(): string;
    }

    export default {
        integer: new Integer(),
        float: new Float(),
        string: new String(),
        date: new DateType(),
        boolean: new BooleanType(),
        object: new ObjectType(),
        any: new AnyType(),
        instanceOf: (cls: typeof Object): InstanceOf => new InstanceOf(cls),
        arrayOf: (type: Type): ArrayOf => new ArrayOf(type),
        shape: (shape: { [key: string]: Type }): Shape => new Shape(type),
        enum: (...values: string[]): Enum => new Enum(...values),
        isValidType: (type: any): boolean => type instanceof Type,
        Type: Type,
    }
}