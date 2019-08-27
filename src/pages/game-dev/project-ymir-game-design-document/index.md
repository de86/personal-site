---
title: Project Ymir Game Design Document
date: "2019-06-30T14:00:00.000Z"
topic: "game-dev"
---

## Introduction

Project Ymir is a first-person fantasy adventure game set in a procedurally generated world of Gunnungap (Working name). The player can explore the world and it's dungeons, find loot, take on quests, hunts and bounties and craft weapons, armor and items from the things he collects in the world.

The game itself is largely inspired by games like Skyrim, The Legend Of Zelda, No Mans Sky and the Final Fantasy series.

## Gameplay Description

*To Be Completed*

## Key Features

### Exploration

#### Open world

The world of Gunnungap is a completely open world from the beginning. The player is free to explore the entire world without anywhere being locked off due to story progression requirements. The player will start roughly in the middle of the world with the difficulty of enemies and dungeons increasing as they venture further from the centre.

The world is created on a grid of 100 by 100 tiles known as the World Map with each tile being an Area that the player can explore. Leaving an Area will load the player in to the adjacent Area and so move them one tile over on the world map.

An Area of the world can either be an open and explorable Wild Area where enemies can be fought, a Dungeon or a Hub Location. Some Wild Areas may contain entrances to dungeons that do not appear on the world map.

As the player explores the world they will discover Fast Travel Points that will allow them to travel instantly between other Fast travel points. All Hub Locations and Dungeons will contain Fast Travel Points as well as some Wild Areas. Fast Travel Points will require a Transport Crystal to activate. This means that in the early game the player cannot simply Fast Travel everywhere and skip the Wild Areas. Completing a Dungeon and killing it's Elite will drop a Transport Crystal to allow the player to quickly return to a Hub Location in order to recover.

#### Hub locations

There will be Hub Locations to discover and explore with each one being procedurally generated and unique. There will be several different sized Hub Locations. Camps, Towns and Castles. Camps being the smallest and giving access to fewer amenities and Castles being the largest and offering everything that can be found in a Hub Location. Each Hub Location will have a fast travel point, a place to recover health and a shop to buy items.

##### Camp

The smallest Hub Location consisting of a bed to rest in, a Fast Travel Point and a shop to buy items from

##### Town

A medium sized Hub Location consisting of everything a Village has but offers higher level weapons and items as well as weapons and items unique to that towns Biome. Crafting is avaialable. NPC's may offer intermediate Quests such as Bounties and clearing out nearby Dungeons. Passive Quests will also be available.

##### Castle

A large sized Hub Location that will take up most of the space in an Area. Consists of everything a Town does as well as the highest level of purchasable weapons, items, Craftables, Bounties, Quests, Passive Quests, Hunts and Taverns. These are rare and there may only be 3 or 4 in the entire world

#### Dungeons

Dungeons are designed to be areas of high-intensity combat with the player being rewarded with good Loot. A Dungeon can consist of a single floor or multiple floors with the highest level Dungeons having up to 3 floors. The Dungeons Elite enemy will be located on the final floor along with a Locked Treasure Chest and a Sealed Treasure Chest. The Elite will drop a key to the Treasure Chest once killed and the Sealed Treasure Chest will open once all enemies in the Dungeon have been killed. The player will also be given the ability to warp back to the Dungeon entrance so they can continue exploring or use the Fast Travel Point to travel back to a Hub Location to rest up, sell unwanted
loot, craft new items, etc.

### Combat

*To Be Completed*

### Questing

*To Be Completed*

### Crafting

*To Be Completed*

## Terms

| Term | Description |
|--|--|
| World Map | A grid of 100 x 100 tiles that represents the entire in game world. Each tile is representative of an Area |
| Area | An open and explorable area that the player can move around in. Represented on the world map by a single tile|
| Dungeon | A procedurally generated area containing enemies, loot and possibly an Elite enemy. The player is rewarded for clearing out the dungeon and killing the Elite enemy with random loot |
| Wild Area | An explorable Area that contains enemies that the player can fight. Usually these areas will be an outside location. |
| Hub Location | A procedurally generated Area where the player can rest, buy sell and craft items, take up quests, bounties or hunts etc. |
| Fast Travel Point | A point from which the player can instantly travel to and from once discovered. |
| Transport Crystal | An item that can be found in the world or crafted that allows the player to use Fast Travel Points |
| Elite | An enemy who's level/difficulty is above the players explected level. These enemies are difficult, but not impossible to kill. Often they will drop higher level loot.|
| Quest | An objective/list of objectives the player can complete in return for an award once returning to the source of the Quest and turning it in. |
| Passive Quest | A simple objective that gives an award once complete but does not need turning in. The Player should generally complete Passive Quests by just playing the game. E.g Kill X number of enemies without taking damage or Collect X number of items |
| Bounty | A Quest that involves killing an Human Elite in the surrounding area. Bounties will get more difficult as the player progresses. |
| Hunt | A Quest that involves killing an Monster Elite in the surrounding area. Bounties will get more difficult as the player progresses. Hunts should last longer than the average battle |
