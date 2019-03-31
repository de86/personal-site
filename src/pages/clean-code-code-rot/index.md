---
title: "Clean Code: Preventing Code Rot"
date: "2019-31-20T16:00:00.000Z"
---

# Clean Code: Preventing Code Rot

## tldr;
Leave the codebase better than you found it. Improve existing code, however minor, when appropriate to prevent our codebase going stale.

## Clean Code
In my attempt to become a better developer and write better code I have been reading the book "Clean Code" by Robert C. Martin. This book always appears in the list of books that all developers should read as it contains invaluable information about coding best practices that can be applied to any modern day programming language. I will be doing a write up for each chapter in the book as a way of summarizing the content to myself and highlighting the parts that stand out to me. I will be taking everything I learn into my work and personal projects.

## The Boy Scout Rule
One of the big problems that happpens to every codebase is the slow decaying of quality over time. The longer a codebase has been around the more hacks and bugfixes it contains, the older the frameworks and library it is built on become, the more devs, each with their own levels of ability and personal style have had their grubby mits on it. New flashy functionality is built upon old architecture that wasn't designed for said new functionality, library or framework functions and methods become deprecated and once acceptable development patterns become anti-patterns.

As you can see, it's no surprise that codebases slowly (quite quickly) become legacy codebases that everyone complains about and no one wants to work with.

While a certain level of code rot is inevitable, if we are aware of it we can do our best to stay on top of it. Whenever we are working on new functionality, bug fixes or cleaning up tech debt if we leave the codebase better than we found it we can dramatically slow down code rot and in a perfect world actually improve the quality of the code base over time.

> if we leave the codebase better than we found it we could dramatically slow down code rot

We can rename badly named variables, functions and methods, split larger functions out in to smaller functions that are easier to read and test and also make our codebase more imperative and functional. We can replace deprecated methods so updating frameworks, libraries and the language itself  becomes much easier and we can implement any new design patterns when we come across code using an old pattern that is no longer used.

It isn't always possible to do this unfortunately. Fixing prod issues for example is not the time to be refactoring old code unless it's the cause of the bug. We should, however, take it upon ourselves to make any improvements we can to the codebase, however minor, in order to prevent our codebase from becoming the legacy codebase that no one wants to work with that little bit longer.