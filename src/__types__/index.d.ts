declare module 'runtime-type' {

    class BaseType {
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
         * Compares the type with another one. It uses strict equal or shalow compare of strings.
         * @param type Type to compare.
         */
        compare(type: Type): boolean;

        /**
         * Converts the type to string.
         */
        toString(): string;
    }

    class NullableType extends BaseType {
        getDefaultValue(): any;
    }

    class NumericType extends BaseType {
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
    class BooleanType extends BaseType {
        /**
         * Casts the value to the boolean using `Boolean` function. The values `'false'`, `'0'` are casted to `false`.
         * @param value Value to cast.
         */
        cast(value: any): boolean;
        getDefaultValue(): false;
        toString(): 'boolean';
    }
    class ObjectType extends BaseType {
        /**
         * Returns the value if the value is `typeof 'object'`.
         * @param value Value to cast.
         */
        cast(value: any): any;
        getDefaultValue(): any;
        toString(): 'object';
    }
    class AnyType extends BaseType {
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
        constructor(type: BaseType);
        /**
         * Casts all of values elements to Type specified in the constructor.
         * @param value Array to cast.
         */
        cast(values: any[]): any[];
        getDefaultValue(): any;
    }
    class Shape extends NullableType {
        constructor(shape: { [key: string]: BaseType });
        /**
         * Casts all of the shape values to the shape of Types specified in the constructor.
         * @param value Shape to cast.
         */
        cast(value: any): { [key: string]: any };
        getDefaultValue(): any;
    }

    class Enum extends BaseType {
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

    namespace RuntimeType {
        export const integer: Integer;
        export const float: Float;
        export const string: String;
        export const date: DateType;
        export const boolean: BooleanType;
        export const object: ObjectType;
        export const any: AnyType;
        export function instanceOf(cls: typeof Object): InstanceOf;
        export function arrayOf(type: Type): ArrayOf;
        export function shape(shape: { [key: string]: Type }): Shape;
        export function enum_(...values: string[]): Enum;
        export function isValidType(type: any): boolean;
        export function fromString(type: string): Type;
        export type Type = BaseType;
    }

    export default RuntimeType;
}