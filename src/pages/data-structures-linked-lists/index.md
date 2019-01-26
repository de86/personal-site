---
title: "Data Structures: Linked Lists"
date: "2019-01-26T00:00:00.000Z"
---

# Data Structures: Linked Lists
## What is a Linked List?
A linked list is a data structure that holds data items, also known as nodes, in a linear sequence (One node points to the next node in the list). The nodes themselves, however, are not held sequentially in memory like an [array](https://www.dantony.uk/data-structures-arrays/). This is possible as each node contains it's data, a number, string or object for example, as well as a pointer to the next nodes location in memory. The last node simply contains a null pointer which signals we have reached the end of the list.

The linked list itself is simply a wrapper class that contains a reference to the head node (The first node in the list) as well as some methods that allow us to perform operations on the linked list, such as add and  remove nodes, retreive data. etc.

## Advantages
### Dynamic Sizes
Where arrays make you declare their size up front and will never change linked lists do not require knowing how big your list will be beforehand. They will also grow and shrink as needed without any issues

### No Wasted Memory
An array must know up-front how big it will need to be so it can reserve a large enough slot in memory. This can lead to reserved memory that is never used if the array is never filled. Linked lists grow and shrink dynamically without reserving memory ahead of time so only the memory that is required at any time is used.

### Inserting and Removing Values
As linked lists nodes aren't held in contiguous memory it becomes very easy to add and remove data to a linked list. It's just a case of creating a new node in memory and editing the existing nodes pointers to point to the right nodes. We don't have to worry about copying values from one memory slot to the next like we do with *arrays* 

## Disadvantages
### Slow Traversal Speed
One of the downsides of a linked lists data not being held in contiguous memory is that we can't just jump straight to a value in memory like we can with an array. We must walk over each node, moving to the next until we get to the node that we need. This happens in O(n) time (I will be going into basic Algorithms in the future) which basically means it takes longer for every node we need to traverse over. It will take longer to step over larger linked lists than smaller linked lists.

### Reverse Traversal
Traversing backwards through a singly linked list (a linked list where each node only contains a reference to it's next node and not it's previous node) is difficult and could either take a very long time or use extra memory. Doubly linked lists make this trivial though.

### Larger Memory Usage
A linked list of the same size as an equivalent array will always use more memory. This is because each node must contain a reference to the next node in the list as well as it's value.

## Implementation
### Constructor
Here we have our class declaration and constructor method. Nothing too fancy here. All we are doing is creating two class variables that we will use to keep track of our head node and tail node and defining some common errors. You wouldn't usually find a tail node reference in a singly linked list but I added it here as I like the benefit of being able to easily amend the last node in the list for a relatively small amount of memory usage.

```javascript
class LinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        
        this.errIndexOutOfBounds  =  {name: 'IndexOutOfBoundsError',  message:  'Index is out of bounds'};
        this.errEmptyList  =  {name:  'EmptyListError',  message:  'Failed to perform operation on empty list'};
    }

    ...
```

### Add Head Node
Inserting a new value at the front of a linked list is very easy to do. We simply need to create a new node and have it point to our current head node. Then re-assign the head of our linked list to the new node. If our list happens to be empty then we simply create a new node and ensure that the head and tail of our linked list point to the node.

```javascript
addNodeToHead(value) {
    const newHeadNode = new Node(value);
    
    if (!this.head && !this.tail) {
        this.head = newHeadNode;
        this.tail = newHeadNode;
    } else {
        newHeadNode.nextNode = this.head;
        this.head = newHeadNode;
    }
}
```

### Remove Head Node
Likewise, removing the first item in the list is also simple. All we need to do is set the head of the linked list to the second node in the list. If the list is empty we can deal with that here. I'm doing so by simply throwing an error that can be caught higher up the call stack. If the linked list only contains one item we can simply set the head and tail of the linked list to null, essentially giving us an empty list.

```javascript
removeHeadNode() {
    if (!this.head && !this.tail) {
        throw this.errEmptyList
    } else if (this.head && this.head.nextNode) {
        this.head = this.head.nextNode;
    } else if (this.head == this.tail) {
        this.head = null;
        this.tail = null;
    }
}
```

### Add Tail Node
By keeping a reference to the tail of our linked list adding to the end of the list also becomes very easy and follows a similar pattern to adding and removing the head. All we need to do is create a new node, add a reference to our new node to our current tail node, then point the tail of our linked list to our new node. We need to do the same checks to make sure our list isn't empty or has only one item and del with those cases.

```javascript
addNodeToTail(value) {
    const newTailNode = new Node(value);

    if (!this.head && !this.tail) {
        this.head = newTailNode;
    } else if (this.tail == this.head) {
        this.head.nextNode = newTailNode;
    } else if (this.tail) {
        this.tail.nextNode = newTailNode;
    }
    
    this.tail = newTailNode;
}
```

### Remove Tail Node
Despite having a reference to the tail removing the last node in the last is a bit more complex than the previous examples. Not too much though. To remove the last node we need to find the next to last node in order to set it's reference to it's next node to null. This is how we know we have reached the end the list when walking over it.

We start by stepping over all of the nodes in our list and keeping a reference to the current node and the previous node. Once we hit a node whose nextNode pointer is null we know we have reached the end of our list and we have references to our last node and our next-to-last node. From here its a simple case of setting our next-to-last nodes nextNode pointer to null and setting the tail of our linked list to this next-to-last node.

```javascript
removeTailNode() {
    if (!this.head && !this.tail) {
        throw this.errEmptyList;
    } else if (this.head == this.tail) {
        this.head = null;
        this.tail = null;
    } else {
        let penultimateNode = this.head;
        let currentNode = this.head;

        while (currentNode.nextNode) {
            penultimateNode = currentNode;
            currentNode = currentNode.nextNode;
        }

        penultimateNode.nextNode = null;
        this.tail = penultimateNode;
    }
}
```

### Insert At Index
We can still modify data in a linked list with an index just like we can with an array. In order to insert a node at a given index we need to walk over our linked list from the start until we reach our target node. Once there we can set the nextNode reference of the previous node at our new node, then set the nextNode reference of our new node to the current node. This has the effect of inserting the new node at the given index. We should do a check to ensure we have a valid index. i.e. a non negative number. We can also take a shortcut and re-use our addNodeToHead method if the given index is 0.

```javascript
insertNodeAtIndex(value, index) {
    if (!this.head && !this.tail) {
        throw this.errEmptyList;
    } else if (index < 0) {
        throw this.errIndexOutOfBounds;
    } else if (index == 0) {
        this.addNodeToHead(value);
    } else {
        let currentNode = this.head;
        let prevNode;
    
        const newNode = new Node(value);
        for (let i = 0; i < index; i++) {
        if (!currentNode) {
            throw errIndexOutOfBounds;
        }
    
        prevNode = currentNode;
            currentNode = currentNode.nextNode;
        }
    
        prevNode.nextNode = newNode;
        newNode.nextNode = currentNode;
    }
}
```

### Remove At Index
To remove a node at a given index we again need to walk over the nodes in our linked list until we reach our target node. We then simply set the previous nodes nextNode value to the given index nodes nextNode value and that's it. We have successfully removed our node.

```javascript
removeNodeAtIndex(index)  {
    if (!this.head  &&  !this.tail) {
        throw  this.errEmptyList;
    }  else  if (index  <  0) {
        throw  this.errIndexOutOfBounds;
    }  else  if (index  ==  0) {
        this.removeHeadNode();
    }  else  {
        let  currentNode  =  this.head;
        let  prevNode;
        
        for (let  i  =  0;  i  <  index;  i++) {
            prevNode  =  currentNode;
            currentNode  =  currentNode.nextNode;
            
            if (!currentNode) {
                throw  errIndexOutOfBounds;
            }
        }
        
        if (!currentNode.nextNode) {
            prevNode.nextNode  =  null;
            this.tail  =  prevNode;
        }  else  {
            prevNode.nextNode  =  currentNode.nextNode;
        }
    }
}
```

### Get Node At Index
Accessing a node at a given index is very similar to our previous examples and very easy. All we need to do is walk over the nodes in our list until we reach the node at the given index and then simply return it. Easy. We also do our standard checks to make sure we have been given a valid index and that we have values in our list.

```javascript
getNodeByIndex(index)  {
    if (!this.head  &&  !this.tail) {
        throw  this.errEmptyList;
    }  else  if (index  <  0) {
        throw  this.errIndexOutOfBounds;
    }  else  if (index  ==  0) {
        return  this.head;
    }  else  {
        let  currentNode  =  this.head;
        for (let  i  =  0;  i  <  index;  i++) {
            currentNode  =  currentNode.nextNode;
            
            if (!currentNode) {
                throw  errIndexOutOfBounds;
            }
        }
        
        return  currentNode;
    }
}
```

And that's it. A basic implementation of a linked list. You could add more to this if you wanted. You could add a length property that is properly updated when adding and removing nodes. You could also add specific methods to return the head and tail methods. You can see the [full source code here](https://github.com/de86/datastructures/blob/master/LinkedList.js)

## Types Of Linked Lists
There a few different types of linked lists I will briefly mention. 

### Singly Linked Lists
In singly linked lists each node contains a pointer to the next node. This is the example I have given above. Traversing backwards through a singly linked list is not very efficient and so singly linked lists are probably not the best choice if that's something you will need to.

### Doubly Linked Lists
Each node in a doubly linked list contains a pointer to the next node as well as the previous node. This makes traversing through the list backwards and deleting the tail node much easier. A doubly linked list also contains a pointer to the tail node (The last item in the list). This makes replacing and adding the tail node trivially easy also.

### Circular Linked Lists
In a circular linked list the tail of the list contains a pointer to the head node of the list rather than a null pointer. In a circular doubly linked list the tail points to the head and the head also points back to the tail as all nodes point to their next and previous nodes

## Conclusion
Linked lists are great if you don't know how large you need your collection of data to be at the time you create your list or if you know that the size of the list will change over time. It's also great if you know ahead of time that you will be doing lots of insertions and deletions of data items.

It may not be the best choice if you need to do lots of searching for values as walking over the list takes O(n) time and will take longer as the list increases in size.

## Source Code
Below is the javascript linked list class definition I have used in this post. You can also get the full source from Github [here](https://github.com/de86/datastructures/blob/master/LinkedList.js).

```javascript
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;

        this.errIndexOutOfBounds = {name: 'IndexOutOfBoundsError', message: 'Index is out of bounds'};
        this.errEmptyList = {name: 'EmptyListError', message: 'Failed to perform operation on empty list'};
    }


    addNodeToHead(value) {
        const newHeadNode = new Node(value);
        
        if (!this.head && !this.tail) {
            this.head = newHeadNode;
            this.tail = newHeadNode;
        } else {
            newHeadNode.nextNode = this.head;
            this.head = newHeadNode;
        }
    }


    removeHeadNode() {
        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (this.head && this.head.nextNode) {
            this.head = this.head.nextNode;
        } else if (this.head == this.tail) {
            this.head = null;
            this.tail = null;
        }
    }


    addNodeToTail(value) {
        const newTailNode = new Node(value);

        if (!this.head && !this.tail) {
            this.head = newTailNode;
        } else if (this.tail == this.head) {
            this.head.nextNode = newTailNode;
        } else if (this.tail) {
            this.tail.nextNode = newTailNode;
        }
        
        this.tail = newTailNode;
    }


    removeTailNode() {
        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (this.head == this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            let currentNode = this.head;
            let penultimateNode;

            while (currentNode.nextNode) {
                penultimateNode = currentNode;
                currentNode = currentNode.nextNode;
            }

            penultimateNode.nextNode = null;
            this.tail = penultimateNode;
        }
    }


    insertNodeAtIndex(value, index) {
        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (index < 0) {
            throw this.errIndexOutOfBounds;
        } else if (index == 0) {
            this.addNodeToHead(value);
        } else {
            let currentNode = this.head;
            let prevNode;
            const newNode = new Node(value);
            
            for (let i = 0; i < index; i++) {
                if (!currentNode) {
                    throw errIndexOutOfBounds;
                }
    
                prevNode = currentNode;
                currentNode = currentNode.nextNode;
            }
    
            prevNode.nextNode = newNode;
            newNode.nextNode = currentNode;
        }
    }


    removeNodeAtIndex(index) {
        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (index < 0) {
            throw this.errIndexOutOfBounds;
        } else if (index == 0) {
            this.removeHeadNode();
        } else {
            let currentNode = this.head;
            let prevNode;
            
            for (let i = 0; i < index; i++) {
                prevNode = currentNode;
                currentNode = currentNode.nextNode;

                if (!currentNode) {
                    throw errIndexOutOfBounds;
                }
            }
    
            if (!currentNode.nextNode) {
                prevNode.nextNode = null;
                this.tail = prevNode;
            } else {
                prevNode.nextNode = currentNode.nextNode;
            }
        }
    }


    getNodeByIndex(index) {
        if (!this.head && !this.tail) {
            throw this.errEmptyList;
        } else if (index < 0) {
            throw this.errIndexOutOfBounds;
        } else if (index == 0) {
            return this.head;
        } else {
            let currentNode = this.head;
            
            for (let i = 0; i < index; i++) {
                currentNode = currentNode.nextNode;

                if (!currentNode) {
                    throw errIndexOutOfBounds;
                }
            }
    
            return currentNode;
        }
    }
}


class Node {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}
```