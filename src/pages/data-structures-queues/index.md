---
title: "Data Structures: Queues"
date: "2019-03-06T20:00:00.000Z"
topic: "dev"
---

## What is a Queue?
A queue is a data structure we can use when we want to store data and then later perform an operation or function on that data in the same order in which we stored it. It is a "First In First Out" data structure meaning that all items placed into the queue ahead of the current item must be removed before the current item can be removed.

It's exactly like queuing up in the shops. Everyone in the queue is served in order and everyone who joined the queue before us must be served before we ourselves can be served.

Queues can be used in game development to ensure that player commands are executed in the correct order. The game Dark Souls queues up commands and executes the next command once the current command has finished. Anyone who has played this game will have experienced this when hitting attack one too many times leading to an extra attack that wasn't intended. This often leaves you exposed and leads to being hit yourself, dying, running back to collect your souls, dying again on the way and permanantly losing all 120,000 of your collected souls... I'm not bitter (Praise the sun).

## Implementation
A queue is built on top of the [Linked List](https://www.dantony.uk/data-linked-lists/) data structure. This allows the queue to dynamically grow and shrink as needed. A queues implementation is fairly trivial once we have a linked list defined. We can simply create a wrapper that exposes the linked lists methods to add data to the back of the queue and remove data from the front of the queue. There is no need to expose the other methods as they are not required for a queue.

I recommend reading up on linked lists [here](https://www.dantony.uk/data-linked-lists/) if you want to understand their implementation. Below is a simple implementation of a queue

```typescript
import {LinkedList} from './LinkedList';

export class Queue<QueueType> {
    private list: LinkedList<QueueType>;


    constructor() {
        this.list = new LinkedList<QueueType>();
    }


    public add(value: QueueType): void {
        this.list.addToHead(value);
    }


    public remove(): QueueType {
        return this.list.removeTail();
    }


    public peek(): QueueType {
        return this.list.getTail();
    }


    public getSize(): number {
        return this.list.getSize();
    }
}

```

You can see the full source code [here](https://github.com/de86/datastructures/blob/master/src/Queue.ts).
