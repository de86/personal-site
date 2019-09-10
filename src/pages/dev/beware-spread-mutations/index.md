---
title: "Beware The Shallow Spread"
date: "2019-09-05T18:00:00.000Z"
topic: "dev"
---

## The Spread Operator

The spread operator was added to javascript in the ES6 update. It allows us to "spread" or copy the contents of an object or array into another object or array. This is useful for creating copies of existing data and editing them without mutating the original values. Previously this was done with [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

#### Example

```typescript
    const originalObject = {firstName: "Donald"};

    const copyOfOriginalObject = {...originalObject};

    console.log(copyOfOriginalObject); // {firstName: "Donald"}
```

## Beware The Shallow Spread

You should be aware that the spread operator only performs a shallow copy. This means that if you change the values of any nested objects or arrays in the newly created copy you will also _mutate_ the original object.

#### Example

```typescript
    const originalObject = {Name: {first: "Donald", second: "Duck"}};

    const copyOfOriginalObject = {...originalObject};

    console.log(originalObject); // {Name: {first: "Donald", second: "Duck"}}

    copyOfOriginalObject.Name.first = "Daisy";

    console.log(copyOfOriginalObject); // {Name: {first: "Daisy", second: "Duck"}}

    console.log(originalObject); // {Name: {first: "Daisy", second: "Duck"}}
```

To understand why this happens we need to quickly understand how values are stored in memory.

Whenever we create a variable we are reserving some space in memory to store a value. When we assign a value to that variable we are storing that value in the previously reserved space in memory. Our variable is a _pointer_ that tells our program where in memory we are storing our value.

When we create an Object it is stored in memory. The variable we store that object in is a pointer to that objects place in memory. Objects in Javascript are just collections of pointers to the places in memory that the actual values are stored at.

Whenever we have an oject that contains other objects (Or arrays) what we have is a collection of pointers, some of which point to another collection of pointers.

It's pointersa all the way down.

This is why we need to be aware that the spread operator performs a shallow copy. Any nested objects from the original object will not have their values copied. Only the pointers to those values are copied. If we spread an object and then try to change the values of a nested object (or array) we will in fact be changing the original values. We can see this in the example above.

Feel free to copy the above into your browsers console and run it to see the results. Only do this if you understand the above code first! You should never paste code into your console if you don't know what it does!

## Conclusion

Understanding that spreading only performs a shallow copy is a very important thing to know. When writing clean code we should be trying to minimise side-effects as best we can so that we avoid bugs that are difficult to debug. Knowing when to use spread and the problems it can cause is essential.

This is extremely important when writing reducers in Redux. We should always return a new object containing new pointers to any values that changed when updating our state. If we simply mutate (change) existing values in our original state will see bugs in our app such as components failing to re-render when we expect them to.

#### Good Reducer Function
```typescript
function setStateGood (state: IAppState, payload: string): IAppState {
    return {
        foo: {
            ...state.foo,
            bar: {
                ...state.foo.bar,
                baz: 'New value'
            }
        }
    }
}
```

#### Bad Reducer Function
```typescript
function setStateBad (state: IAppState, payload: number): IAppState {
    const nextState = {...state}

    nextState.foo.bar.baz = payload

    return nextState;
}
```

This is also why the Redux docs suggests a flat store structure. We don't want to end up with heavily nested reducers that look like this.

```typescript
    function setDeeplyNestedState (state: IAppState, payload: number): IAppState {
        return {
            foo: {
                ...foo,
                bar: {
                    ...foo.bar,
                    baz: {
                        ...foo.bar.baz,
                        boo: {
                            ...foo.bar.baz.boo,
                            valWeWantToChange: payload // Yuck!
                        }
                    }
                }
            }
        }
    }
```
