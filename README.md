# runtime-type
Module for casting to types at runtime.

## Installation
```
npm install --save runtime-type
```

## Usage
```javascript
import Type from 'runtime-type';

Type.integer.cast('5'); // returns 5
Type.integer.cast('test'); // throws an Error

Type.integer.canCast('5'); // returns true
Type.integer.isValidType('5'); // returns false
Type.integer.isValid('5'); // returns false
```

## Functions
Every type has several methods.

### cast(value)
Casts the value to the type. It returns value in the desired type or throws an `Error`. 

### saveCast(value, defaultValue)
Tries to cast the value. If the cast fails the defaultValue is returned.

### canCast(value)
Checks if the value is valid. It calls the `cast` method and if the cast is successful `true` is returned. If the cast throw an error `false` is returned. 

### isValidType(value)
Checks the value using `typeof` defined in the inherited type.

### isValid(value)
Checks if the value is strictly valid. Calls `canCast(value)` and `isValidType(value)`.

### getTSType()
Returns the TypeScript type.

## Types

| Type                                            | Description                                                                                                                                     | typeof  | JS cast                   |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------- |
| any                                             | It's just a placeholder. The value is returned in `cast` method and `canCast` is always `true`.                                                 |         |                           |
| arrayOf(type: Type)                             | The values of array in the `cast` method are casted by the `type`.                                                                              | object  |                           | 
| boolean                                         | The value is validated with the base javascript `Boolean` function in `cast` method. If the value is `'false'` or `'0'` it's casted as `false`. | boolean | Boolean(value)            |
| date                                            | The value is used as parameter in the `Date` constructor in `cast` method.                                                                      | object  | new Date(value)           |
| enum(defaultValue: string, ...values: string[]) | The `cast` method checks if the value is in the `values` array.                                                                                 | string  |                           |
| float                                           | The value is parsed by `parseFloat` function in `cast` method.                                                                                  | number  | parseFloat(value)         |
| instanceOf(cls: Class)                          | Equivivalent of the `instanceof`.                                                                                                               |         | value instanceOf Class    |
| integer                                         | The value is parsed by `parseInt` function in `cast` method. `isValidType` method checks if the value is not decimal.                           | number  | parseInt(value)           |
| object                                          | The value is validated with `typeof value === 'object'`.                                                                                        | object  | typeof value === 'object' |
| shape                                           | The value's keys are validated with the specified types. The key with `?` as last character defines optional key. The key in `[]` defines dynamic field.                                                                                      | object  |                           |
| string           | The value is converted to string with `toString` method.                                                                                        | string  | value.toString()          |
| union(...types: Type[])           | The value is converted to one of the types defined.                                                                                       |   |           |

### enum_
The `enum_` function is alias to `enum` because of typescript.

### Shapes
#### Optional fields
The shapes can have optional fields defined. 
```javascript
import Type from 'runtime-type';

const shape = Type.shape({
	integer: Type.integer,
	'optional?': Type.string,
});
```
#### Dynamic keys
The shapes can have dynamic keys defined. The validated shape can use keys that are not defined in the shape. The dynamic key is checked indefinitely.
```javascript
import Type from 'runtime-type';

const shape = Type.shape({
	integer: Type.integer,
	'[dynamic]': Type.string,
}); // The shape must contain `integer` key and at least one of the `string` keys

const shape2 = Type.shape({
	integer: Type.integer,
	'[dynamic]?': Type.string,
}); // The shape must contain `integer` key and none or indefinitely `string` keys
```

### Union
Special type which checks the types in series and converts value to the valid one. If none of types are valid error is thrown.

## Model
`Model` is base class that supports decorators for typings of its properties.
```javascript
import Type, { Model } from 'runtime-type';

class Test extends Model {

	@Model.type(Type.string)
	test = 'test';
}
```
The `test` property will be cast to string on set of the value in the property.

## Migrating to v3
The `isValid` method now validates the value strictly as mentioned above. The easiest way to migrate is just to rename all references to `canCast`. Everything else remains the same.

```javascript
// v2
Type.integer.isValid('5'); // returns true
// v3
Type.integer.isValid('5'); // returns false
Type.integer.canCast('5'); // returns true
```
