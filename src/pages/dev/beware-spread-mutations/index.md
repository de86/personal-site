---
title: "Beware of mutations when using the spread operator"
date: "2019-09-05T18:00:00.000Z"
topic: "dev"
---

## The Spread Operator

The spread operator was added to javascript in the ES6 update. It allows us to "spread" or copy the contents of an object or array into another object or array. This is useful for createing copies of existing data and editing them without mutating the original values. Previously this was done with [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

#### Example

```typescript
    const originalObject = {firstName: "Donald"};

    const copyOfOriginalObject = {...originalObject};

    console.log(copyOfOriginalObject); // {firstName: "Donald"}
```

## Beware the shallow copy

The spread operator only performs a shallow copy. This means that any nested objects will be copied as _pointers_ to those objects. Any changes to the values of nested objects in the newly created object will _mutate_ the original object.

#### Example

```typescript
    const originalObject = {Name: {first: "Donald", second: "Duck"}};

    const copyOfOriginalObject = {...originalObject};

    console.log(originalObject); // {Name: {first: "Donald", second: "Duck"}}

    copyOfOriginalObject.Name.first = "Daisy";

    console.log(copyOfOriginalObject); // {Name: {first: "Daisy", second: "Duck"}}

    console.log(originalObject); // {Name: {first: "Daisy", second: "Duck"}}
```

To understand this we need to quickly understand how values are stored in memory.

Whenever we create a variable we are reserving some space in memory to store a value. When we assign a value to that variable we are storing that value in the previously reserved space in memory. Our variable is then a _pointer_ that tells our program where in memory we are storing our value.

Objects in Javascript are essentially just collections of pointers. Objects themselves have a space in memory and our variable is a pointer to it.

Whenever we have an object that contains another object what we essentially have is a collection of pointers that contains a pointer to another collection of pointers.

This is why we need to be aware that the spread operator performs a shallow copy. Any nested objects from the original object will not have their values copied. Only the pointers to those values are copied. If we spread an object and then try to change the values of a nested object we will in fact be changing the values of the original object too. We can see this in the example above.

Feel free to copy the above into your browsers console and run it to see the results. Only do this if you understand the above code first! You should never paste code into your console if you don't know what it does!

## Conclusion

Understanding that spreading only performs a shallow copy is a very powerful thing to know. When writing clean code we should be trying to minimise side-effects as best we can so that we avoid nasty, difficult to debug issues. Knowing when to use spread and the problems it can cause is a very powerful thing.

This is extremely important when writing reducers in Redux. Mutating original store state, instead of returning new sate, can cause bugs like making our components fail to re-render when we expect. This is also why Redux suggests a flat store structure so we dont end up with reducers that look like this.

```typescript
    function setSomeArbitraryState (state: IAppState, payload: string): IAppState {
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
