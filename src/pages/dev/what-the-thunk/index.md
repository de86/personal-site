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
const addItem = (payload) => ({
    type: 'ADD_ITEM',
    payload
});
```

Redux by default can only dispatch a single action at a time. When we want to dispatch multiple actions at once or we want to do an async operation such as fetching some data and _then_ dispatching an action, we need to use a middleware known as redux-thunk.

The redux-thunk middleware allows us to dispatch either an action object, _or_ a function that will itself dispatch actions.

This allows us to wrap our more complex dispatch behaviour in a function and dispatch that instead.

Every time we dispatch something to our store it gets passed through our stores middleware.

The redux-thunk middleware simply checks the type of the action that is passed to it.

If the middleware receives an action object, then that action is dispatched as expected.

If the middleware receives a function then it calls that function and passes dispatch in to it. Dispatch can then be used by that function to dispatch multiple actions from within a function like the example below.

```typescript
const fetchItems = () => (dispatch: function) => {
    dispatch(setFetchItemsPending());

    return api.fetchItems()
        .then(response => {
            if (response.ok) {
                dispatch(setFetchItemsSuccess(response));
            } else {
                dispatch(setFetchItemsError(response));
            }

            dispatch(setFetchItemsComplete());
        });
};
```

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

And that's it! That's all our thunk middleware does. It checks whether a function or an object has been dispatched. If it's a function, it calls it with dispatch so that the function itself can dispatch actions. If it's an action object it dispatches the action object itself.

