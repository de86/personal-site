---
title: "Data Structures: Linked Lists"
date: "2019-01-26T00:00:00.000Z"
topic: "dev"
---

## What is a Linked List?
A linked list is a data structure that holds data items, also known as nodes, in a linear sequence (One node points to the next node in the list). The nodes themselves, however, are not held sequentially in memory like an [array](https://www.dantony.uk/data-structures-arrays/). This is possible as each node contains its data, a number, string or object for example, as well as a pointer to the next nodes location in memory. The last node simply contains a null pointer which signals we have reached the end of the list.

The linked list itself is simply a wrapper class that contains a reference to the head node (The first node in the list) as well as some methods that allow us to perform operations on the linked list, such as add and  remove nodes, retreive data. etc.

## Advantages
### Dynamic Sizes
Where arrays make you declare their size up front and will never increase or decrease in size, linked lists do not require you to know how big your list will be beforehand. They will also grow and shrink as needed without any issues

### No Wasted Memory
An array must know up-front how big it will need to be so it can reserve a large enough section of memory. This can lead to reserved memory that is never used if the array is never filled. Linked lists grow and shrink dynamically without reserving memory ahead of time so only the memory that is required at any time is used.

### Inserting and Removing Values
As linked lists nodes aren't held in contiguous memory it becomes very easy to add and remove data to a linked list. It's just a case of creating a new node in memory and editing the existing nodes pointers to point to the right nodes. We don't have to worry about copying values from one memory slot to the next like we do with [arrays](https://www.dantony.uk/data-structures-arrays/).

## Disadvantages
### Slow Traversal Speed
One of the downsides of a linked lists data not being held in contiguous memory is that we can't just jump straight to a value in memory like we can with an array. We must walk over each node, moving from one to the next until we get to the node that we need. This happens in O(n) time (I will be going into basic algorithms in the future) which basically means it takes longer to look over the entire list for every extra node we add. It will take longer to step over larger linked lists than smaller linked lists.

### Reverse Traversal
Traversing backwards through a singly linked list (a linked list where each node only contains a reference to its next node and not its previous node) is difficult and could either take a very long time or use extra memory. Doubly linked lists make this trivial though.

### Larger Memory Usage
A linked list containing the same number of items as an equivalent array will always use more memory. This is because each node must contain a reference to the next node in the list as well as its value.

## Implementation
### Nodes
First we must create the nodes that will be contained inside of our linked lists. These are simple wrappers around the data we want to store that also have a pointer to the next node in the list. A simple object containing two class variables is all we need.

```typescript
export class ListNode<ListNodeType> {
    value: ListNodeType;
    nextNode: ListNode<ListNodeType>;

    constructor(value: ListNodeType) {
        this.value = value;
        this.nextNode = null;
    }
}
```

### Constructor
This is our class declaration and constructor method. Nothing too fancy here. All we are doing is creating some class variables that we will use to keep track of our head node and tail node and defining some common errors. You wouldn't usually find a tail node reference in a singly linked list but I added it here as I like the benefit of being able to easily amend the last node in the list for a relatively small amount of memory usage. I also declared a size variable so we can easily keep track of the number of items in our list.

```typescript
    export default class LinkedList<ListType> {
        private head: ListNode<ListType>;
        private tail: ListNode<ListType>;

        private size: number;

        private errIndexOutOfBounds: IListError;
        private errEmptyList: IListError;

        constructor() {
            this.head = null;
            this.tail = null;

            this.size = 0;

            this.errIndexOutOfBounds = {name: 'IndexOutOfBoundsError', message: 'Index is out of bounds'};
            this.errEmptyList = {name: 'EmptyListError', message: 'Failed to perform operation on empty list'};
        }

    ...
    }
```

### Adding a Head Node
Inserting a new value at the front of a linked list is very easy to do. We simply need to create a new node and have it point to our current head node. Then re-assign the head of our linked list to the new node. If our list happens to be empty then we simply create a new node and ensure that the head and tail of our linked list point to the node. We can also increment size.

```typescript
    public addToHead(value: ListType): void {
        const newHeadNode = new ListNode<ListType>(value);
        
        if (!this.head && !this.tail) {
            this.head = newHeadNode;
            this.tail = newHeadNode;
        } else {
            newHeadNode.nextNode = this.head;
            this.head = newHeadNode;
        }

        this.size++;
    }
```

### Removing a Head Node
Likewise, removing the first item in the list is also simple. All we need to do is set the head of the linked list to the second node in the list. If the list is empty we can deal with that here. I'm doing so by simply throwing an error that can be caught higher up the call stack. If the linked list only contains one item we can simply set the head and tail of the linked list to null, essentially giving us an empty list.

```typescript
    public removeHead(): ListType {
        let removedNodeValue;

        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (this.head && this.head.nextNode) {
            removedNodeValue = this.head.value;

            this.head = this.head.nextNode;
            this.size--;
        } else if (this.head == this.tail) {
            removedNodeValue = this.head.value;

            this.head = null;
            this.tail = null;
            this.size = 0;
        }

        return removedNodeValue;
    }
```

### Adding a Tail Node
By keeping a reference to the tail of our linked list adding to the end of the list also becomes very easy and follows a similar pattern to adding and removing the head. All we need to do is create a new node, add a reference to our new node to our current tail node, then point the tail of our linked list to our new node. We need to do the same checks to make sure our list isn't empty or has only one item and del with those cases.

```typescript
    public addToTail(value: ListType): void {
        const newTailNode = new ListNode<ListType>(value);

        if (!this.head && !this.tail) {
            this.head = newTailNode;
        } else if (this.tail == this.head) {
            this.head.nextNode = newTailNode;
        } else if (this.tail) {
            this.tail.nextNode = newTailNode;
        }
        
        this.tail = newTailNode;
        this.size++;
    }
```

### Removing a Tail Node
Despite having a reference to the tail removing the last node in the last is a bit more complex than the previous examples, though not too much though. This is because to remove the last node we need to know about the tail, but also the node previous to the tail node.

We start by stepping over all of the nodes in our list and keeping a reference to the current node and the previous node. Once we hit a node whose nextNode pointer is null we know we have reached the end of our list. From here its a simple case of setting our next-to-last nodes nextNode pointer to null and setting the tail of our linked list to this next-to-last node.

```typescript
    public removeTail(): ListType {
        let removedNodeValue;

        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (this.head == this.tail) {
            removedNodeValue = this.head.value;

            this.head = null;
            this.tail = null;
            this.size = 0;

        } else {
            removedNodeValue = this.head.value;

            let currentNode = this.head;
            let penultimateNode;

            while (currentNode.nextNode) {
                penultimateNode = currentNode;
                currentNode = currentNode.nextNode;
            }

            penultimateNode.nextNode = null;
            this.tail = penultimateNode;
            this.size--;
        }

        return removedNodeValue;
    }
```

### Inserting At a specific Index
We can still modify data in a linked list with an index just like we can with an array. In order to insert a node at a given index we need to walk over our linked list from the start until we reach our target node. Once there we can set the nextNode reference of the previous node to our new node,then set the nextNode reference of our new node to the current node. This has the effect of inserting the new node at the given index. We should do a check to ensure we have a valid index. i.e. a non negative number. We can also take a shortcut and re-use our addNodeToHead method if the given index is 0.

```typescript
    public insertAtIndex(index: number, value: ListType): void {
        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (index < 0) {
            throw this.errIndexOutOfBounds;
        } else if (index == 0) {
            this.addToHead(value);
        } else {
            let currentNode = this.head;
            let prevNode;
            const newNode = new ListNode<ListType>(value);
            
            for (let i = 0; i < index; i++) {
                if (!currentNode) {
                    throw this.errIndexOutOfBounds;
                }

                prevNode = currentNode;
                currentNode = currentNode.nextNode;
            }

            prevNode.nextNode = newNode;
            newNode.nextNode = currentNode;
            this.size++;
        }
    }
```

### Removing A Node From A Specific Index
To remove a node at a given index we again need to walk over the nodes in our linked list until we reach our target node. We then simply set the previous nodes nextNode value to the given index nodes nextNode value and that's it. We have successfully removed our node.

```typescript
    public removeAtIndex(index: number): ListType {
        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (index < 0) {
            throw this.errIndexOutOfBounds;
        } else if (index == 0) {
            return this.removeHead();
        } else {
            let currentNode = this.head;
            let prevNode;
            
            for (let i = 0; i < index; i++) {
                prevNode = currentNode;
                currentNode = currentNode.nextNode;

                if (!currentNode) {
                    throw this.errIndexOutOfBounds;
                }
            }

            let removedNodeValue;
            if (!currentNode.nextNode) {
                removedNodeValue = currentNode.value;

                prevNode.nextNode = null;
                this.tail = prevNode;

                
            } else {
                removedNodeValue = currentNode.nextNode.value;

                removedNodeValue = prevNode.nextNode.value;
                prevNode.nextNode = currentNode.nextNode;
            }

            this.size--;

            return removedNodeValue;
        }
    }
```

### Getting Node From A Specific Index
Accessing a node at a given index is very similar to our previous examples and very easy. All we need to do is walk over the nodes in our list until we reach the node at the given index and then simply return it. Easy. We also do our standard checks to make sure we have been given a valid index and that we have values in our list.

```typescript
    public getByIndex(index: number): ListType {
        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (index < 0) {
            throw this.errIndexOutOfBounds;
        } else if (index == 0) {
            return this.head.value;
        } else {
            let currentNode = this.head;
            
            for (let i = 0; i < index; i++) {
                currentNode = currentNode.nextNode;

                if (!currentNode) {
                    throw this.errIndexOutOfBounds;
                }
            }

            return currentNode.value;
        }
    }
```

### Utlity Functions
We also have some simple getters for the class variables we dont want to expose and a clear function to empty the list. Note: this implementation could lead to memory leaks as if there is more than one item in the list being cleared they would hold references to eachother and the garbage collection would not pick them up. I added this method simply for testing purposes.

```typescript
    public getHead(): ListType {
        return this.head ? this.head.value : null;
    }


    public getTail(): ListType {
        return this.tail ? this.tail.value : null;
    }

    
    public getSize(): number {
        return this.size;
    }

    public clear(): void {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
```


And that's it. A basic implementation of a linked list. You can see the full source code below or on [Github](https://github.com/de86/datastructures/blob/master/src/LinkedList.ts)

## Types Of Linked Lists
There a few different types of linked lists I will briefly mention. 

### Singly Linked Lists
In singly linked lists each node contains a pointer to the next node. This is the example I have given above. Traversing backwards through a singly linked list is not very efficient and so singly linked lists are probably not the best choice if that's something you know you will need to.

### Doubly Linked Lists
Each node in a doubly linked list contains a pointer to the previous node as well as the next node. This makes traversing through the list backwards and deleting the tail node much easier. A doubly linked list also contains a pointer to the tail node (The last item in the list). This makes replacing and adding the tail node trivially easy.

### Circular Linked Lists
In a circular linked list the tail of the list contains a pointer to the head node of the list rather than a null pointer. In a circular doubly linked list the tail points to the head and the head also points back to the tail as all nodes point to their next and previous nodes. This means you could essentially loop over the entire list indefinitely very easily.

## Conclusion
Linked lists are great if you don't know how large you need your collection of data to be or if you know that the size of the list will change over time. It's also great if you know ahead of time that you will be doing lots of insertions and deletions of data items.

It may not be the best choice if you need to do lots of searching for values as walking over the list takes O(n) time meaning it will take longer and longer as the list increases in size.

## Source Code
Below is the typescript linked list class definition I have used in this post. You can also get the full source from Github [here](https://github.com/de86/datastructures/blob/master/src/LinkedList.ts).

```typescript
interface IListError {
    name: String;
    message: String;
}

export default class LinkedList<ListType> {
    private head: ListNode<ListType>;
    private tail: ListNode<ListType>;

    private size: number;

    private errIndexOutOfBounds: IListError;
    private errEmptyList: IListError;

    constructor() {
        this.head = null;
        this.tail = null;

        this.size = 0;

        this.errIndexOutOfBounds = {name: 'IndexOutOfBoundsError', message: 'Index is out of bounds'};
        this.errEmptyList = {name: 'EmptyListError', message: 'Failed to perform operation on empty list'};
    }


    /**
     * Get the node at the head of the Linked List.
     */
    public getHead(): ListType {
        return this.head ? this.head.value : null;
    }


    /**
     * Get the node at the tail of the Linked List.
     */
    public getTail(): ListType {
        return this.tail ? this.tail.value : null;
    }

    
    /**
     * Get the number of items in the Linked List.
     */
    public getSize(): number {
        return this.size;
    }


    /**
     * Add a node to the head of the Linked List.
     * 
     * @param value {ListType} The value and type to be stored.
     */
    public addToHead(value: ListType): void {
        const newHeadNode = new ListNode<ListType>(value);
        
        if (!this.head && !this.tail) {
            this.head = newHeadNode;
            this.tail = newHeadNode;
        } else {
            newHeadNode.nextNode = this.head;
            this.head = newHeadNode;
        }

        this.size++;
    }


    /**
     * Remove the head node from the Linked List.
     */
    public removeHead(): ListType {
        let removedNodeValue;

        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (this.head && this.head.nextNode) {
            removedNodeValue = this.head.value;

            this.head = this.head.nextNode;
            this.size--;
        } else if (this.head == this.tail) {
            removedNodeValue = this.head.value;

            this.head = null;
            this.tail = null;
            this.size = 0;
        }

        return removedNodeValue;
    }


    /**
     * Add a node to the tail of the Linked List.
     * 
     * @param value {ListType} The value and type to be stored.
     */
    public addToTail(value: ListType): void {
        const newTailNode = new ListNode<ListType>(value);

        if (!this.head && !this.tail) {
            this.head = newTailNode;
        } else if (this.tail == this.head) {
            this.head.nextNode = newTailNode;
        } else if (this.tail) {
            this.tail.nextNode = newTailNode;
        }
        
        this.tail = newTailNode;
        this.size++;
    }


    /**
     * Remove the tail node from the Linked List.
     * 
     * @param value {ListType} Add a new value of the given type to the head of the Linked List.
     */
    public removeTail(): ListType {
        let removedNodeValue;

        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (this.head == this.tail) {
            removedNodeValue = this.head.value;

            this.head = null;
            this.tail = null;
            this.size = 0;

        } else {
            removedNodeValue = this.head.value;

            let currentNode = this.head;
            let penultimateNode;

            while (currentNode.nextNode) {
                penultimateNode = currentNode;
                currentNode = currentNode.nextNode;
            }

            penultimateNode.nextNode = null;
            this.tail = penultimateNode;
            this.size--;
        }

        return removedNodeValue;
    }


     /**
     * Add a node containing the given value and type at the given index.
     * 
     * @param value {ListType} The value and type to be stored.
     * @param index {number} The index to store the given value at.
     */
    public insertAtIndex(index: number, value: ListType): void {
        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (index < 0) {
            throw this.errIndexOutOfBounds;
        } else if (index == 0) {
            this.addToHead(value);
        } else {
            let currentNode = this.head;
            let prevNode;
            const newNode = new ListNode<ListType>(value);
            
            for (let i = 0; i < index; i++) {
                if (!currentNode) {
                    throw this.errIndexOutOfBounds;
                }
    
                prevNode = currentNode;
                currentNode = currentNode.nextNode;
            }
    
            prevNode.nextNode = newNode;
            newNode.nextNode = currentNode;
            this.size++;
        }
    }


    /**
     * Remove the node from the Linked List at the given index.
     * 
     * @param index {number} The index of the node remove.
     */
    public removeAtIndex(index: number): ListType {
        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (index < 0) {
            throw this.errIndexOutOfBounds;
        } else if (index == 0) {
            return this.removeHead();
        } else {
            let currentNode = this.head;
            let prevNode;
            
            for (let i = 0; i < index; i++) {
                prevNode = currentNode;
                currentNode = currentNode.nextNode;

                if (!currentNode) {
                    throw this.errIndexOutOfBounds;
                }
            }
    
            let removedNodeValue;
            if (!currentNode.nextNode) {
                removedNodeValue = currentNode.value;

                prevNode.nextNode = null;
                this.tail = prevNode;

                
            } else {
                removedNodeValue = currentNode.nextNode.value;

                removedNodeValue = prevNode.nextNode.value;
                prevNode.nextNode = currentNode.nextNode;
            }

            this.size--;

            return removedNodeValue;
        }
    }


    /**
     * Get the node stored at the given index.
     * 
     * @param index {number} The index of the node to retrieve.
     */
    public getByIndex(index: number): ListType {
        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (index < 0) {
            throw this.errIndexOutOfBounds;
        } else if (index == 0) {
            return this.head.value;
        } else {
            let currentNode = this.head;
            
            for (let i = 0; i < index; i++) {
                currentNode = currentNode.nextNode;

                if (!currentNode) {
                    throw this.errIndexOutOfBounds;
                }
            }
    
            return currentNode.value;
        }
    }


    /**
     * Remove all items from the list
     */
    public clear(): void {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    /**
     * Get a string representation of the current state of the Linked List
     */
    public toString(): String {
        let currentNode = this.head;
        let str = ''

        while (currentNode) {
            str += `${currentNode.value} --> ${currentNode.nextNode ? currentNode.nextNode.value : 'end'}\n`;
            currentNode = currentNode.nextNode;
        }

        return str;
    }
}


export class ListNode<ListNodeType> {
    value: ListNodeType;
    nextNode: ListNode<ListNodeType>;

    constructor(value: ListNodeType) {
        this.value = value;
        this.nextNode = null;
    }
}

```
