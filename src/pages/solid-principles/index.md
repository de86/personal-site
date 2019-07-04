---
title: "The SOLID principles"
date: "2019-07-03T20:00:00.000Z"
topic: "dev"
---

## What are the SOLID principles?

SOLID is an acronym for a set of 5 object-oriented development principles that if understood and implemented properly can help you write maintainable, extensible code that is more robust, highly de-coupled less complex and less prone to bugs. The SOLID principles were introduced to us by Robert C. Martin, the author of Clean Code and have served the OO community well ever since.

These 5 principles are:

- S - Single-Responsibility Principle (SRP)
- O - Open-Closed Principle (OCP)
- L - Liskov Substitution principle (LSP)
- I - Interface Segregation Principle (ISP)
- D - Dependency Inversion Principle (DIP)

## The Single Responsibility Principle

> A class should only have one reason to change.

### tldr; 

*Dont be lazy, this is the shortest section! Alright, alright, alright. A package, class or method should only have one responsibility. Abstract any code that isn't the main responsiblity (Logging, Database connection/queries etc.) out into a separate package/class/method.*

A class should have only one responsibility, and so, should only ever have one reason to be modified by a developer at a later stage.

For example if a class's responsibility is to handle authorization but it also contains low level code for connecting to a database then this can be thought of as having multiple responsibilities. This is bad practice. We shouldn't have to refactor the authorization class due to a change in how we use or access the database. This low level database connection code should be abstracted out into its own DatabaseConnection class and then used as a dependency inside of the authorization class.

The Single Responsibility Principle allows us to create simpler classes that are easier to read and reason about, have fewer side effects, have fewer reasons to be refactored and so are much less prone to bugs.

## The Open-Closed Principle

> A class should be open to extension but closed to modification.

### tldr;

*Dont have multiple implementations of similar functionality in a single class. Create an abstract base class that a sub class can inherit from that contains it's own unique implementations of the common methods calling the parent classes methods where necessary.*

Let's take our Authorization class example from above. There may be multiple ways of handling authorization. We could authorize a user using Googles, Face-ache's or our own authorization services. To handle all of these types of authorization in a single class we would need multiple implementations of the authorization process. Our code would be littered with checks to see which auth service we are using. This is messy, convoluted, difficult to read and easily broken. Fixing a bug with the Face-ache's auth process could lead to bugs in Googles auth process and vice versa.

We can solve this issue by making our Authorization class an abstract class that contains all of the functionality that is common across all auth procedures. Username and password validation for example. We can then create a GoogleAuth class and a FaceAcheAuth class that inherits from the base Authorization class and implements it's own Login and Logout methods that are unique to that authorization type.

This gives us an Authorization class that is open to extension through inheritance but is closed to modification as this base class no longer needs to be changed. Any changes to a specific type of authorization process would happen in that specific class.

Keeping the Open-Closed Principle in mind while developing allows to write code that is extensible and less complex while also reducing the risk of bugs. It can also help us stick to the Single Responsibility Principle as well as we are not allowing a single class to handle multiple implementations of the process.

## The Liskov Substitution principle

## The Interface Segregation Principle

> No client should be forced to depend on methods it does not use.

### tldr;

*Use many small interfaces rather than a few large interfaces. This leads to composition over inheritance and prevents deep inheritance chains and the need to define stubbed methods*

Having large interfaces with many methods can lead to classes defining stubbed methods for the methods that they don't actually need just to satisfy the type system. This can lead to confusion for the reader as they may be unaware as to why a stubbed method exists in the first place. This can also lead to highly coupled code as a method somewhere else in the system may require this method and so a stubbed implementation of it is required to prevent errors.

To solve this problem our interfaces should be as small and focused as possible. We should split out these fat interfaces into thin ones. This will give us much more focused interfaces and allow us to only implement methods in a class that we actually need. This decouples our code and also helps us achieve the Single Responsibility Principle too.

For example, if we were making a game, we may have an IActor interface. This interface may contain the methods Move, Interact, Attack, etc. This would be fine for a subclass such as Player or Enemy but for an NPC we would need to implement an Attack method which does nothing but return True. This is simply not cricket. A better solution would be to create multiple interfaces such as IMoveable, IAttackable, IInteractable that each contain a single function. This allows us to create a Player class that implements IMoveable and IAttackable, an Enemy class that implements IMoveable, IAttackable, IInteractable and an NPC class that implements IMoveable and IInteractable.

This allows us to favour composition over inheritance which prevents deep inheritance chains and unused methods. It makes our code self-documenting as we can see exactly what a class does simply by reading what interfaces it implements. It also allows future extensions or modifications to the codebase to be implemented much more easily.

## The Dependency Inversion Principle
