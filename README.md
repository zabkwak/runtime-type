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
Type.integer.cast('test') // throw an Error
```

## Functions
Every type has several methods.
### cast(value)
Casts the value to the type. It returns value in the desired type or throws an `Error`. 

### isValid(value)
Checks if the value is valid. It calls the `cast` method and if the cast is successful `true` is returned. If the cast throw an error `false` is returned. 

## Types
### any
It's just a placeholder. The value is returned in `cast` method and `isValid` is always `true`. 
### arrayOf
**function(type: Type)**  
The values of array in the `cast` method are casted by the `type`.
### boolean
The value is validated with the base javascript `Boolean` function in `cast` method. If the value is `'false'` or `'0'` it's casted as `false`.  
### date
The value is used as parameter in the `Date` constructor in `cast` method.
### enum
**function(defaultValue: string, ...values: string[])**  
The `cast` method checks if the value is in the `values` array.
### float
The value is parsed by `parseFloat` function in `cast` method.
### instanceOf
**function(cls: Class)**  
Equivivalent of the `instanceof`.
### integer
The value is parsed by `parseInt` function in `cast` method.
### object
The value is validated with `typeof value === 'object'`. 
### shape
**function(shape: Object.<string, Type>)**  
The value's keys are validated with the specified types.
### string
The value is converted to string with `toString` method.
