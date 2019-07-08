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

### Sources

##### [Wikipedia - Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)
##### [Clean Code Blog](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)

## The Open-Closed Principle

> A class should be open to extension but closed to modification.

### tldr;

*Classes should be built with extension in mind. Create an abstract base class that a sub class can inherit from and define it's own unique implementations of common methods calling the parent classes methods where necessary.*

Let's take our Authorization class example from above. There may be multiple ways of handling authorization. We could authorize a user using Googles, Face-ache's or our own authorization services. To handle all of these types of authorization in a single class we would need multiple implementations of the authorization process. Our code would be littered with checks to see which auth service we are using. This is messy, convoluted, difficult to read and easily broken. Fixing a bug with the Face-ache's auth process could lead to bugs in Googles auth process and vice versa.

We can solve this issue by making our Authorization class an abstract class that contains the functionality that is common across all auth procedures. Username and password validation, Login and Logout functionality for example. We can then create a GoogleAuth class and a FaceAcheAuth class that inherits from the base Authorization class and overrides any methods that require unique implementations.

This gives us a base Authorization class that is open to extension through inheritance but is closed to modification as this base class no longer needs to be changed. Any changes to a specific type of authorization process would happen in that specific class.

Keeping the Open-Closed Principle in mind while developing allows to write code that is extensible and less complex while also reducing the risk of bugs. It can also help us stick to the Single Responsibility Principle as we are not allowing a single class to handle multiple implementations of the same process

### Sources

##### [Wikipedia - The Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)
##### [Robert C Martin - The Open-Closed Principle, C++ Report](https://drive.google.com/file/d/0BwhCYaYDn8EgN2M5MTkwM2EtNWFkZC00ZTI3LWFjZTUtNTFhZGZiYmUzODc1/view)

## The Liskov Substitution principle

> If for each object o(x) of type S there is an object o(y) of type T such that for all programs P defined in terms of T, the behavior of P is unchanged when o(x) is substituted for o(y) then S is a subtype of T

Errr... What?

Well, Uncle Bob once simplified it as:

> Functions that use pointers to base classes must be able to use objects of derived classes without knowing it.

Put simply, it means that a parent classes behaviour (return values/side effects) must not be changed in a child class. This allows any functions that call methods or properties from the parent class to accept any object that is a child class of that parent class.

Keeping this principle in mind is a way to ensure that we are using inheritance correctly. After all, if a child class has changed the behaviour (return values/side effects) defined in the parent then that child class should not have inherited that method in the first place.

While looking for meaningful examples of the Liskov Substitution Principle I stumbled across one about penguins. I liked it, so I'm going to use a slightly modified version of that instead.

Let's say we have a program that simulates birds and their movement patterns. For this simulation we design a class using the Open-Closed Principle named Bird. Bird has methods fly and draw. Bird.fly will calculate a birds next position in the air and set the required state and Bird.draw will render the bird to the screen. This class has been designed to be closed for modification but extendable through inheritance. We also have a BirdManager class. BirdManager is responsible for updating all instantiated birds positions through an updateBirdPositions method.

The first version of this simulation software is released with multiple types of birds that all inherit from the abstract Bird class and all is well. For the next release though, the product owner has requested that penguins be added to this program. Now we have a problem. As penguins can't fly we need to implement a different behaviour to move the penguin.

We could override the fly function and change it's behaviour to throw an error when called, however, this would result in BirdManager.updateBirdPositions throwing an error as soon as we hit a penguin in our list of Birds. We could override the method to be empty and simply return true or false, however, this could lead to confusion for developers as they may not understand why the method is implemented that way. They may also not get the expected behaviour should they call that method without realizing it has been overridden in such a way. We could also just override the fly method and implement walking functionality inside it instead. None of these are solutions though. This is semantically incorrect though and again will lead to confusion for anyone reading the code later on. None of these are good ideas though and could hinder us further down line. We are clearly in violation of the open closed principle.

There are a couple of real solutions to this problem. We could remove the fly function from the base Bird class and create two sub-classes, FlightfulBird and FlightlessBird. FlightfullBird could have a method called fly and FlightlessBird could contain a method called walk. We would then ahve to update BirdManager.updateBirdPositions to accommodate these changes.

Another solution could be to remove the fly function from the Bird class and create an interface such as IMoveableBird which defines a move function that must be implemented by any class that implements it.

We could also simply rename the fly method to something more generic like move and make sure it's an abstract function that must be overridden in the child class. That way each child class of Bird must implement it's own move behaviour but we can still call the move method against the parent type allowing us to still update all Birds at once.

The Liskov Substitution Principle allows to be sure that we are using inheritance in a way that does not hinder us later on in the development of a program. It allows us to write more robust and re-usable code.

### Sources

##### [Wikipedia - The Liskov Substitution Principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)
##### [Robert C Martin - The Liskov Substitution Principle, C++ Report](https://web.archive.org/web/20151128004108/http://www.objectmentor.com/resources/articles/lsp.pdf)
##### [Tom Dalling - SOLID Class Design: The Liskov Substitution Principle, TomDalling.com](https://www.tomdalling.com/blog/software-design/solid-class-design-the-liskov-substitution-principle/)

## The Interface Segregation Principle

> No client should be forced to depend on methods it does not use.

### tldr;

*Use many small interfaces rather than a few large interfaces. This leads to composition over inheritance which can prevent deep inheritance chains and the need to define stubbed methods*

Having large interfaces with many methods can lead to classes defining stubbed implementations of methods that they don't actually need just to satisfy the type system. This can lead to confusion for the reader as they may be unaware as to why a stubbed method exists in the first place. This can also lead to highly coupled code as a method somewhere else in the system may require this method and so a stubbed implementation is required to prevent errors.

To solve this problem our interfaces should be as small and focused as possible. We should split out these fat interfaces into thin ones. This will give us much more focused interfaces and allow us to only implement methods in a class that we actually need. This decouples our code and also helps us achieve the Single Responsibility Principle too.

For example, if we were making a game, we may have an IActor interface. This interface may contain the methods Move, Interact, Attack, etc. This would be fine for a subclass such as Player or Enemy but for an NPC we would need to implement an Attack method which does nothing but return True. This is simply not cricket. A better solution would be to create the interfaces IMoveable, IAttackable and IInteractable that each contain a single function. This allows us to create a Player class that implements IMoveable and IAttackable, an Enemy class that implements IMoveable, IAttackable, IInteractable and an NPC class that implements IMoveable and IInteractable.

Thin interfaces allow us to favour composition over inheritance which prevents deep inheritance chains and unused methods. It makes our code self-documenting as we can see exactly what a class does simply by reading what interfaces it implements. It also allows future extensions or modifications to the codebase to be implemented much more easily.

### Sources

##### [Wikipedia - The Interface Segregation Principle](https://en.wikipedia.org/wiki/Interface_segregation_principle)
##### [Robert C Martin - The Interface Segregation Principle, C++ Report](https://drive.google.com/file/d/0BwhCYaYDn8EgOTViYjJhYzMtMzYxMC00MzFjLWJjMzYtOGJiMDc5N2JkYmJi/view)

## The Dependency Inversion Principle
