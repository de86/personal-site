---
title: "What The Thunk?"
date: "2019-09-10T21:00:00.000Z"
topic: "dev"
---

## What is a thunk?

When updating our Redux store we must "dispatch" an object known as an action. To do this we write our action creator functions that return an action object like below.

(If you aren't sure what any of that means then go and read up about redux and come back. It's okay, I'll wait!)

#### A Simple Action Creator

```typescript
const addItem = (itemName) => ({
    type: 'ADD_ITEM',
    payload: itemName
});
```

Redux by default can only dispatch a single action at a time. In instances where we want to always dispatch multiple actions together or where we want to do an async operation, like fetching some data and _then_ dispatch an action we need to use a middleware known as redux-thunk.

The redux-thunk middleware allows us to dispatch either an action object as normal _or_ a function that takes dispatch as an argument.

This allows us to wrap our more complex dispatch behaviour in a function and dispatch that instead.

```typescript
const fetchItems = () => (dispatch: function) => {
    dispatch(setFetchItemsPending());

    return api.fetchItems()
        .then(response => {
            if (response.ok) {
                dispatch(setFetchItemsSuccess(response));
                dispatch(setFetchItemsComplete());
            } else {
                dispatch(setFetchItemsError(response));
                dispatch(setFetchItemsComplete());
            }
        });
};
```

Every time we dispatch something to our store it gets run through the stores middleware.

The redux-thunk middleware simply checks the type of the action passed to it. If it is a function then it calls that function and passes dispatch in to it. This is what allows us to dispatch multiple async actions from within a function.

If the middleware receives an object, then that action is dispatched as expected.

Here is what a very basic example of the thunk middleware would look like.

```typescript
const thunkMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'function') {
        action(store.dispatch);
    } else {
        next(action);
    }
}

```

## Conclusion

And that's it! That's all our thunk middleware does. It checks whether a function or an objects has been dispatched. If it's a function, it calls it with dispatch so that the function itself can dispatch actions. If it's an object it dispatches the object itself.

### P.S.

The redux-thunk middleware is called redux-_thunk_ because it allows us to dispatch functions as well as standard action objects.
