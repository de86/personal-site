---
title: "Nand2Tetris - Week 1 - Logic Gates Part 1"
date: "2019-07-13T17:30:00.000Z"
topic: "dev"
---

## Introduction

I need to confess. As someone who did an "Enterprise Computing" degree, works as a full-time developer and has used computers all of my life I have no idea how a computer works. I mean, I have a good idea of what all the parts of a computer do. I used to build PC's with my dad when I was younger, but I have no idea how the words I'm typing now get compiled down to bytecode and read by the computer. I don't know how the computer can understand those instructions and manipulate its various components to be in the exact state required to present my wonderfully entertaining, educational and enlightening blog to you, dear reader.

And so in my ever-growing need for validation and in an attempt to make myself appear smarter to strangers, potential future employees, and those few friends that read this blog, I have decided to write-up my progress as I work through the Nand2Tetris course.

## What is Nand2Tetris

[Nand2Tetris](https://www.nand2tetris.org/) is a computer science course created by [Shimon Schocken](https://www.shimonschocken.com/) and [Noam Nissan](http://www.cs.huji.ac.il/~noam/). According to the Nand2Tetris website this course is taught in over 100 schools and universities around the world and aims to fill in the knowledge gap around how computers actually work. The course takes you from "building" logic gates in HDL, an assembler, virtual machine, mini-OS and finally a game of your choice. Each section of the course relies on the work done in the previous section so once complete you will have created a fully working computer from "hardware" (emulated) to software.

If you're interested [head over to their site here](https://www.nand2tetris.org/) and checkout [parts 1](https://www.coursera.org/learn/build-a-computer) [and 2](https://www.coursera.org/learn/nand2tetris2) of the course for free on Coursera here.

## Week 1 - Boolean Functions and Logic Gates

In order to understand how logic gates (More on these later) work we must first understand the concept of boolean operations, expressions and functions. Understanding these concepts is key to being able to understand how to create logic gates and how binary data flows through them. Lets start with boolean operations.

### Boolean Operations

As developers we work with boolean operations daily. We have all used the operations AND, OR and NOT when creating if statements. These boolean operations work exactly the same way when working with 1s and 0s. In fact we can just think of 1s and 0s as True or False respectively.

For each of these boolean operations we can create a truth table that will show us exactly what output we will get for each combination of inputs. Below is the truth tables for these operations.

<br />

#### AND - (x AND y)

The AND operation will return 1 only if both inputs are 1.

|x|y|AND|
|--|--|--|
|0|0|0|
|0|1|0|
|1|0|0|
|1|1|1|

<br />

#### OR - (x OR y)

The OR operation will return 1 as long as one of the inputs are a 1.

|x|y|OR|
|--|--|--|
|0|0|0|
|0|1|1|
|1|0|1|
|1|1|1|

<br />

#### NOT - (NOT(x))

NOT is a unary operator which means it takes only one input. NOT will invert the value of the given input.

|x|NOT|
|--|--|
|0|1|
|1|0|

<br />

As you can see, although the data and operations here are presented slightly differently than you may have seen before, the functionality of these operations should be very familiar to anyone with any experience of development.

### Boolean Functions

Just as with Mafs (That's how most people say Math up here in 'north) and development we can group these operations together into a function and define some parameters to go into it.

*f*(x, y, z) = (x AND y) OR z

We can also describe our function in the form of a truth table. This will show us exactly what the result of our function will be for any set of given parameters. The example below has columns x, y and z shows us the values of those parameters and the *f* column shows us the result of the function given those parameters.

|x|y|z|*f*|
|--|--|--|--|
|0|0|0|0|
|0|0|1|1|
|0|1|0|0|
|0|1|1|1|
|1|0|0|0|
|1|0|1|1|
|1|1|0|1|
|1|1|1|1|

<br />

### Boolean Identities

Boolean Identities are a set of rules that prove equality between expressions. For that reason I prefer to think of them as Boolean Equalities. To me, that better describes what they are (variable naming 101 yo!). An example of these Boolean Identities are the Commutative Laws. These state that (x AND y) will always be equal to (y AND x) and that (x OR y) will always equal (y OR x). We can use these different laws to reduce larger boolean functions down to smaller, more manageable ones. Below is a list of these laws.

#### Commutative Laws

- (x AND y) = (y AND x)
- (x OR y) = (y OR x)

#### Associative Laws

- (x AND (y AND z)) = ((x AND y) AND z)
- (x OR (y OR z)) = ((x OR y) OR z)

#### Distributive Laws

- (x AND (y OR z)) = ((x AND y) OR (x AND z))
- (x OR (y AND z)) = ((x OR y) AND (x OR z))

#### De Morgans Laws

- NOT(x AND y) = NOT(x) OR NOT(y)
- NOT(x OR y) = NOT(x) AND NOT(y)

<br />

### Building Boolean Functions from Truth Tables

Now that we know how to build truth tables from boolean expressions and functions we now need to learn how to construct boolean functions from truth tables.

When creating logic gates we will know what we want the gate to do beforehand. That functionality is usually defined in the form of a truth table. It's the creators job to take that truth table and build the logic gate using the boolean expressions we learned earlier.

Creating a boolean function from a truth table is actually pretty simple. We move down the truth table one row at a time creating a boolean function for each row that should return a 1. Then we can combine each of those functions with an OR to give us a function that represents the whole table.

To create a boolean function for a row we can simply look at each parameter and use a NOT() expression if the parameter is a 0 or use the parameter name if it is a 1 then AND them together.

Lets work through an example below.

#### Example

|x|y|z|*f*|*f* ID|
|--|--|--|--|--|
|0|0|0|1|a|
|0|0|1|0|-|
|0|1|0|1|b|
|0|1|1|0|-|
|1|0|0|1|c|
|1|0|1|0|-|
|1|1|0|0|-|
|1|1|1|0|-|

Looking at the table above there are 4 rows that will return a 1 (*f* column). I have marked those rows with a function ID that corresponds to the functions below (Forgive the layout, these posts are written in Mardown so formatting isn't great sometimes). Now we can build those functions using the NOT expression where a parameters value equals 0 and just the parameter name where a parameters value equals 1.

<br />

### Function a:

|Params|0|-|0|-|0|
|--|--|--|--|--|--|
|expressions|NOT(x)|AND|NOT(y)|AND|NOT(z)|
Function: (NOT(x) AND NOT(y) AND NOT(z))

<br />

### Function b:

|Params|0|-|1|-|0|
|--|--|--|--|--|--|
|expressions|NOT(x)|AND|y|AND|NOT(z)|
Function: (NOT(x) AND y AND NOT(z))

<br />

### Function c:

|Params|1|-|0|-|0|
|--|--|--|--|--|--|
|expressions|x|AND|NOT(y)|AND|NOT(z)|
Function: (x AND NOT(y) AND NOT(z))

<br />

If we combine the above functions into one function using the OR operator we get this;

(NOT(x) AND NOT(y) AND NOT(z)) OR (NOT(x) AND y AND NOT(z)) OR (x AND y and NOT(z)) OR (x AND NOT(y) and NOT(z))

Now we have derived our function from our truth table we can reduce this function using Boolean Identities.

(NOT(x) AND NOT(y) AND NOT(z)) OR (NOT(x) AND y AND NOT(z)) OR (x AND y and NOT(z)) OR (x AND NOT(y) and NOT(z))

=

(NOT(x) AND NOT(z)) OR (NOT(y) AND NOT(z))

=

NOT(z) AND (NOT(x) OR NOT(y))

### Logic Gates

Remember those things I mentioned right at the beginning of this post and promised they would be coming later? Those things that the whole first week of this course is about? Well...

I had originally planned to write-up all of week 1 in this post, however, in the interests of keeping reading times a bit lower I will continue this write up in part 2. We'll talk about HDL (Hardware Design Language), Logic Gates, implementation and my thought process (Spoiler: Staring at the screen for long periods of time until things made sense).

Thanks for reading. And I'll see you in part 2. If you really can't wait can't wait (I know, this stuff is *thrilling*) you can see my implementation of the logic gates required for week 1 on [my github here](https://github.com/de86/nand2tetris/tree/master/week1-hdl). All the good stuff is in the *.hdl files.
