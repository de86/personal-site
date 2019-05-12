---
title: "Clean Code: Meaningful Names"
date: "2019-05-11T16:00:00.000Z"
---

## tldr;

Naming things is hard. Reading poorly named code is harder. Use names that have real meaning and show intention. Avoid names that can cause confusion. Use nouns for classes and variables. Use verbs for functions. Prefix functions with words like get, set, delete, add, groupBy, sortBy.

## Meaningful Names

One of the hardest things in programming to do well is naming things. Variables, Functions, Classes etc all need to be named. A good name will concisely describe what something is or does and even how it should be used. When reading code meaningful names can be the difference between immediately understanding what code does or taking 5 minutes to understand a snippet of code before proceeding. With good names your code can read more like a human readable step by step guide to what is happening.

## Use Intention Revealing Names

A name should reveal everything you need to know about a variable, function or class. A variable name should immediately tell you what it represents, a function name should tell you exactly what that function does and a class name should tell you what that class is trying to model. Always avoid single letter variable names as they provide no meaning whatsoever. Any name that requires a comment to explain it should not be used and should be reconsidered.

```typescript
let d; // elapsed time in days
```

The name “d” means nothing. Does “d” mean number of doughnuts? Could it be an instance of a dog? Maybe it’s represents the quantity of rubber ducks we will need to talk to before understanding what this is? Without that comment we would not know what that variable is. A better name to use is right there in the comment itself.

```typescript
let elapsedTimeInDays;
```

With this name we can instantly see what that variable represents. The code becomes self-documenting. We can even extrapolate what type the variable is. In this case it is clearly a number (Javascript). If we are using a strictly typed language or something like typescript the type declaration will add even more meaning and will leave no doubt as to what this variable is.

```typescript
let elapsedTimeInDays: number;
```

To better demonstrate the difference between good and bad names take a look at the below code snippet.

```typescript
function flaggedC (g) { 
    const cArray = [];

    g.forEach(c => {
        if (c.status === 'FLAG') {
            cArray.push(c);
        }
    });      

    return cArray;
}
```

At a glance it’s difficult to see the context and intention of whats going on here and multiple questions arise. What is the g parameter we need to provide in order to use this function? What is c? What does this function return? We have a hardcoded string value in here which is probably being used somewhere else and we have the type declared in a variable name. Compare the above with the below.

```typescript
function getFlaggedCellsFromGameboard(gameboard: ICell[]): ICell[] { 
    const flaggedCells: ICell[] = []; 

    gameboard.forEach((cell: ICell)  => {
        if (cell.isFlagged) {
            flaggedCells.push(cell);
        }
    });

    return flaggedCells;
}
```

None of the logic has changed at all but you can immediately see the difference. Using a combination of meaningful names and declaring our types all of our previous questions are immediately answered. This functions intention becomes clear as does each variable used inside of it. Even without using typescript this code would be perfectly readable and understandable without having to know the context. This code snippet now reads much more like a set of step-by-step instructions than poorly written code.

## Avoid Disinformation

Disinformation in variable names can be very misleading and cause developers reading the code to not fully understand what is going on. Worse, it can lead them down a wrong path if they do not look closely enough at the code.

We should avoid using words that already have meaning to us as developers such as number (Javascript), string, array, class etc. as this can cause confusion. 

For example, lets say we have an object that has a property named “idNumber” that is actually of type string. If the developer modifying this code assumes that idNumber is a number and treats it as so this has the potential to cause a logical error and break silently creating a bug that may be difficult to debug.

Adding the type to a variable name can also contribute to a codebase that ages poorly. If we have a variable named “gamesArray“ we would assume that this is an array that holds instances of games. The problem arises if later on that array of games gets changed to an object. Perhaps now we want to store each game by it’s id so they can be easily accessed that way. If the developer modifying the code doesn’t change all instances of gamesArray to gamesObject we will again potentially see errors in code or cause confusion to future developers that read this code. Some better alternatives would be:

- gamesGroup
- collectionOfGames
- gamesCollection

or simply, and perhaps the best choice

- games

## Make Meaningful Distinctions

Avoid using minor name changes with no differences in their meaning. Simply adding on an “x” or an underscore to differentiate between two things causes confusion as it does not tell the developer reading the code what the difference is. If we have two functions, one named getAccount() and one named getAccountInfo(), what does one return that the other doesn’t? If i’m getting an instance of an account i would expect that to have all of the information belonging to that account. Those names, although different, provide no meaningful distinctions to us as developers.

Another example would be:

```typescript
function activateAccount(account: IAccount): IAccount {
    const accountA = {...account};
    const accountA.isActive = true;

    return accountA;
}
```

accountA as a name does not tell us what the difference is between the two account variables. We would have to read the rest of code to understand what it is. Compare that with the below.

```typescript
function activateAccount(account: IAccount): IAccount {
    const activeAccount = {…account};
    const activeAccount.isActive = true;

    return activeAccount;
}
```

Although this is something of a contrived example (though you may want to do something like this if you are using redux or don't want any side-effects from your function) You can immediately see what the intention of that variable is.

## Use Search Friendly Names

As mentioned earlier we should not use single letter variable names. As well as providing no meaning they are also impossible to find for using your IDE’s search function. They are even difficult to pick out when simply scanning over code.

A name like MAX\_GAMES\_TO\_DISPLAY is much easier to search for and read than “m” or “g” or even a magic number like 20.

## Avoid Mental Mapping

Developers should never have to create a mental map of what variable is what. especially if a variable represents something that already has a name in the codebase. Using “g” when “games” is used everywhere else requires the reader to remember what "g" is. They may also question whether “g” actually is a game or not. This is another problem that comes along with single letter variable names.

> “The proffesional understands that clarity is king… and write code that others can understand”
> - <cite>Robert C. Martin - Clean Code</cite>

## Class Names

Classes and objects should have noun or noun-phrases as names. Words like Account, Game, Customer accurately describe what the class or object is representing. Avoid using words like Data or Info in these names as these provide no extra meaning. What does GameData provide me that Game doesn’t already?

## Function and Method Names

Functions and Methods should have verbs and verb-phrases as names as functions are used to perform an action. Names like getAccount, removeDisabledAccounts, groupAccountsByStatus, sortAccountsByBalance are clear and concise. You can clearly tell what a function does without needing to double check the code itself. Words like get, set, delete, add, group, sort etc. are great prefixes to use for function names.

## Variable Names

Variables, like classes, should use noun or noun-phrases as names to clearly denote what a variable is.  Booleans should always begin with words like is, should or can etc. so users can see instantly that it contains a boolean. Using these words also makes reading code more like reading english, especially when using if statements.

```typescript
if (user.isLoggedIn) {
    …
}
```

The above reads much nicer than:

```typescript
if (user.status === ‘LOGGED_IN’) {
    …
}
```

Or even just

```typescript
if (user.login) {
    …
}
```