export abstract class BaseType {
    /**
     * Safely casts the value to the type. If the cast fails, the default value of the Type is returned.
     * @param value Value to cast.
     */
    public saveCast(value: any): any;
    /**
     * Safely casts the value to the type. If the cast fails, the default value is returned.
     * @param value Value to cast.
     * @param defaultValue Returning value if the cast fails.
     */
    public saveCast(value: any, defaultValue: any): any;

    /**
     * Gets the default value of the Type.
     * @abstract
     */
    public abstract getDefaultValue(): any;

    /**
     * Casts the value to the Type.
     * @param value Value to cast.
     * @abstract
     */
	public abstract cast(value: any): any;
	
	/**
	 * Gets the TypeScript type of the Type.
	 * @abstract
	 */
	public abstract getTSType(): string;

    /**
     * Gets the name of the type.
     */
    public getName(): string;

    /**
     * Checks if the value is valid Type.
     * @param value Value to check.
     */
    public canCast(value: any): boolean;

    /**
     * Checks if the value has valid typeof.
     * @param value Value to check.
     */
    public isValidType(value: any): boolean;

    /**
     * Check if the value is valid and has valid type.
     * @param value Value to check.
     */
    public isValid(value: any): boolean;

    /**
     * Compares the type with another one. It uses strict equal or shalow compare of strings.
     * @param type Type to compare.
     */
    public compare(type: BaseType): boolean;

    /**
     * Converts the type to string.
     */
    public toString(): string;

    protected abstract _getTypeOf(): string;
}

declare abstract class NullableType extends BaseType {
    public getDefaultValue(): any;
}

declare abstract class NumericType extends BaseType {
    /**
     * Casts the value to number.
     * @param value Value to cast.
     */
    public cast(value: any): number;
    public getDefaultValue(): 0;
    protected abstract _cast(value: any): number;
    protected _getTypeOf(): string;
}

export class Integer extends NumericType {
    /**
     * Casts the value to number using `parseInt` function.
     * @param value Value to cast.
     */
    protected _cast(value: any): number;
    public toString(): 'integer';
    /**
     * It checks if the value is number and if the value is not decimal.
     */
    public isValidType(value: any): boolean;
}
export class Float extends NumericType {
    /**
     * Casts the value to number using `parseFloat` function.
     * @param value Value to cast.
     */
    protected _cast(value: any): number;
    public toString(): 'float';
}
export class String extends NullableType {
    /**
     * Casts the value to the string calling `toString` method.
     * @param value Value to cast.
     */
    public cast(value: any): string;
    public toString(): 'string';
    protected _getTypeOf(): string;
}
export class DateType extends NullableType {
    /**
     * Creates a `Date` instance from the value. If the value is `null` it is just returned.
     * @param value Value to cast.
     */
    public cast(value: any): Date;
    public getDefaultValue(): Date;
    public toString(): 'date';
    protected _getTypeOf(): string;
}
export class BooleanType extends BaseType {
    /**
     * Casts the value to the boolean using `Boolean` function. The values `'false'`, `'0'` are casted to `false`.
     * @param value Value to cast.
     */
    public cast(value: any): boolean;
    public getDefaultValue(): false;
    public toString(): 'boolean';
    protected _getTypeOf(): string;
}
export class ObjectType extends BaseType {
    /**
     * Returns the value if the value is `typeof 'object'`.
     * @param value Value to cast.
     */
    public cast(value: any): any;
    public getDefaultValue(): any;
    public toString(): 'object';
    protected _getTypeOf(): string;
}
export class AnyType extends BaseType {
    /**
     * It just returns the value.
     * @param value Value to cast.
     */
    public cast(value: any): any;
    public getDefaultValue(): any;
    public toString(): 'any';
    protected _getTypeOf(): string;
}
export class InstanceOf extends NullableType {
    constructor(cls: typeof Object);
    /**
     * Returns the value if the value is `instanceOf` class from the constructor.
     * @param value Value to cast.
     */
    public cast(value: any): any;
    public getDefaultValue(): any;
    public toString(): string;
    protected _getTypeOf(): string;
}
export class ArrayOf extends NullableType {
    constructor(type: BaseType);
    /**
     * Casts all of values elements to Type specified in the constructor.
     * @param value Array to cast.
     */
    public cast<T = any>(values: any[]): T[];
    public getDefaultValue(): any;
    protected _getTypeOf(): string;
}
export class Shape extends NullableType {
    constructor(shape: { [key: string]: BaseType });
    /**
     * Casts all of the shape values to the shape of Types specified in the constructor.
     * @param value Shape to cast.
     */
    public cast(value: any): { [key: string]: any };
    public getDefaultValue(): any;
    protected _getTypeOf(): string;
}

export class Enum extends BaseType {
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
    public cast(value: any): string;
    public getDefaultValue(): string;
    protected _getTypeOf(): string;
}

export class Model {

    public static type: (type: BaseType, isNullable?: boolean) => PropertyDecorator;

    public static create<T = any, U extends Model = Model>(data: T): U;

    public setData<T = any>(data: T): void;
}

declare namespace RuntimeType {
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
    export function fromString<T extends Type = BaseType>(type: string): T;
    export type Type = BaseType;
}

export default RuntimeType;