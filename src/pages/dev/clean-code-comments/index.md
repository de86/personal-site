---
title: "Clean Code: Comments"
date: "2019-08-13T11:00:00.000Z"
topic: "dev"
---

# Comments

Comments are very powerful things. They have the power to instantly clarify a piece of code or totally derail a programmers thought process. Comments can be insightful and helpful, they can be useless, creating bloat in our codebase or they can be old, unmaintained, provide information that is no longer valid and just plain wrong. Comments should be used sparingly and only when necessary.

## Bad Comments

### Redundant Comments

Comments that add nothing should be avoided at all costs. They do nothing but bloat our code. For example:

```
if (someCondition) {
    ...Code
} else if (someOtherCondition) {
    ...Code
} else {
    // Should never reach this
}
```

This is useless. This comment adds no value. If we should never reach the else part of the above code block then why is it there? What happens if some unforeseen circumstances puts or software in to a state where we do hit that else block? Shouldn't we actually handle that scenario? Throw an error maybe? or at least log something so we can see what happened?

Another example:

```
// Warning! Here be dragons!!

...Some ungodly code that someone wrote 15 years
ago and is too fragile to touch ever again
```

The above comment may provide a bit of a chuckle when first being discovered but seeing something like this should fill you with dread. Warning comments can have some merit as they warn us to be extra careful, however, there is no value here. It does not tell us why we need to be more careful about the following block of code than we do about any other code in our codebase. What exactly is the issue? If the code there is so fragile that an warning needs to be issued then this should be refactored into something more robust. If it's because the person who wrote that code has since left the company and no one actually understands it then someone should take the responsibility to learn, refactor and document whatever is going on that is so scary.

You make think that these are contrived examples but these are real comments in a codebase that I have worked with.

### Noise Comments

Similar to redundant comments, these offer no value.

```
// Day of the month
let dayOfMonth;
```

```
// gets current doughnut count
function getDoughnutCount() {
    return count;
}
```

Useless.

### Mandated Comments

We should never enforce a rule that every comment or variable be commented. This simply adds bloat to the codebase and makes developers write comments that add no value.

```
/**
 * Adds a new movie
 *
 * @param {string} The title of the movie
 * @param {number} The year the movie was released
 * @param {string} The director of the movie
 */
function addMovie(title: string, releaseYear: number, director: string): IMovie {
    return {
        title,
        releaseYear,
        director
    }
}
```

The JSDoc declaration adds nothing that the function name and signature don't already tell us. Most modern IDE's will still provide the intellisense of the function signature without the JSDoc above. If every function had a JSDoc declaration like this our codebase could very easily double in size and become more difficult to parse through as a reader due to larger file lengths and redundant explanations of methods.

### Commented Out Code

Commented out code should never be checked in to our codebase. If code is commented out then it is no longer required. If for some reason we do need to bring back old code we can do this through our VCS. Leaving commented out code in will only confuse the reader as they may believe that the code was incorrectly commented out and may uncomment it in an attempt to fix the issue. It could also lead the reader to use it as a reference if they are searching for something and it happens to be found in that commented out block. If that code is out of date then it could lead to creating bugs in our system. It simply bloats the codebase and misleads developers.

### Long explanations

Don't write large explanations of overall system architecture or the history of the software in comments. These simply bloat file sizes and make it more difficult to find what you are looking for. If this information is important then it should maintained in external documentation on an intranet or online collaboration software such as confluence.

### Attributions

Adding comments to tag who wrote a piece of code is unnecessary. VCS will keep track of this for us.

```
/* Added by Dave */
```

## Good Comments

### Self-Documenting Code

Code is essentially a step-by-step guide of how to do something, and so, well written code should be self-documenting. Clean code should be easy enough to read and reason about that it does not require comments. If you find yourself leaving comments to explain what your code is doing then that is a good sign that the code you have written is most likely bad or disorganised. A refactor of that code to make it more readable will add far more value than a comment ever will.

Comments do not make up for bad code.

Code is great as a step-by-step guide on how to perform an operation, however it is terrible at defining the bigger picture. Take for example the code below.

```typescript
// Check if Dave should set airConMode to Heat
if (
    employee.isCold && airCon.currentTempDegrees < 23
    && (airCon.mode === airConModes.Cool || airCon.mode === airConModes.standBy)
) {
    // Change mode to Heat
    employee.announce('Its too cold in here');
    employee.moveTo(airCon);
    employee.operate(airCon.switchMode(airConModes.Heat));
    employee.operate(airCon.setMaxTempDegrees(24));

    otherEmployees.moan('Just shut your bloody window and put a jacket on!');
}

```

The if statement above is long and somewhat convoluted. While it's logically correct it does not tell us the *context* of what we are actually checking for, hence the comment. By simply replacing the condition with a well named function we can remove the comment, simplify the if statement, give context to the reader and make our code easier to read and understand.

```typescript
if (employee.ShouldChangeAirConToHeat(aircon)) {
    employee.ChangeAirConToHeat(airCon);

    otherEmployees.moan('Just shut the bloody window and put a jacket on!');
}
```

Any time you can remove the need for a comment by tidying up code you have won a small victory as a developer.

### Legal Comments and Licensing Terms

Sometimes it is necessary to add legal statements to files. Copyright, authorship, licensing statements for example. These are often found in open source projects but can also be found in private, corporate codebases. These aren't usually more than a couple of lines and simply have to be there.

### Explaining the why

Commenting to inform other developers of the intent behind code can be very beneficial. It can pre-emptively answer any questions a fellow dev may have before they have even thought to ask the question. It can lead to improved code as someone may have a cleaner/better optimized solution to solve the problem. It may be that the initial reason the solution was coded that way is no longer a concern and so that block of code may be safely re-factored. A comment explainging why something has been implemented they way it has always adds value.

## Warning of consequences

Letting other devs know the consequences of something can be very valuable. It can prevent a lot of time wasted in trying to run/optimize/debug some code. a simple comment like:

```
// This script may take a long time to run and your machine may hang in the process
```

## ToDo Comments

Todo comments are reminders that something will need refactoring/deleting later on. These can be handy as if a dev comes across these while they have some time to spare they may take on the responsibility and complete the ToDo task. Some IDE's have the function to search thorugh a codebase and list out all ToDo comments which can provide a quick and dirty list of things that need to be done. Just be sure to delete the comment once the task is done or time could be wasted by future devs trying to redo the same task.

## JSDocs (Or Javadocs, PHPDoc etc)

Adding JSDoc comments can really help improve the readability of code. They allow a developer to read a brief summary of the purpose of a function/class. JSDocs can instantly show the expected params and return type of a function.

When using Typescript JSDoc is most likely not necessary as Typescript will provide you with all the intellisense information you need. When using vanilla JS though, it is a very handy tool. There are even ways to generate static docs that can be viewed in a browser from JSDocs.
