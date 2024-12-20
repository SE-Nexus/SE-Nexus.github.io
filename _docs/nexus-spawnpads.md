---
category: Misc Features
order: 5.0
description: Collection of Miscellaneous Nexus Features
---

# Nexus SpawnPads

Nexus SpawnPads were designed to be a more interactive spawning system for servers. Get rid of those lame spawn screens and create some unique encouters for players in your servers! Spawn pads are highly customizable through the scripting system and API methods that are exposed.

Communities often use the spawn pads in a lobby type enviroment for starting players to use. Since lobbies are no longer have to be an unsectored enviroment, more options are available to you for a more fluid spawning experience.

Think of a station above a starting planet... using the scripts and prefabs you could spawn a ship on a connector and then spawn the player in that ship to act as a drop-pod. Scripting also further provides you the tools to randomize loot in spawnship or randomize damange to armor blocks for essentially a unique spawn ship everytime. You also have access to certain nexus information concerning the player and the spawnpad to do things based off of individual pad uses etc.

## Ingame Setup
Configuring your spawnpad is all done ingame. The block itself should be already added if you have NexusV3 Plugin installed. The block name is called 'transporter' through the 'G' menu. Opening the block and navigating to the custom data box should yield you with a blank config list like below:

![](/img/spawnpad.png)

- PrefabName - A selected prefab name from the controller. [Case Sensitive]
- Script/ScriptName - A selected spawnscript from the controller [Case Sensitive]
- ToServerID - Target serverID where players are being sent with this spawnpad
- MinPlayers - WIP
- MaxPlayers - WIP
- MaxSpawnsForPlayer - Per Player Limit for spawnpad
- SpawnTimer - Delay cooldown per player for spawnpad
- MinRole - Minimum ingame role. None, Scripter, Moderator, Admin etc.
- CustomData - User defined customdata to pass into the script for easier configuration

If the block is turned off, or the block is out of power, players wont be able to click the spawn button. Make sure to fuel those stations! This also lets you disable spawnpads at will if you so desire.

### Leaving Prefab Name Blank?
If you dont plan on using the prefab spawner, you can leave it blank and instead use some variation of a character spawner script. This will let you transport just the character to wherever and whichever registered server in the controller.

### No Script?
Leaving the script blank turns the pad into basically a server redirct button. When pressing the button, it will send the client to the 'ToServerID' and close (delete) the character and its inventory.

### Return To Last Server?
Nexus records client traversals between servers. If you would like to setup an event and have players return to whichever server they left from simply putting a 0 as the 'ToServerID' will send any client who presses the button to their previous server.

### I want additional configs?
The Nexus SpawnPad system uses scripting to allow you to customize your own spawning experiece. Below is a list of possibilities when customizing spawn scripts:
- Random Spawn Position (Select a random spawn position and send to that targetServer)
- Random Prefab (Picking your starter ship at random? Bold move, captain!)
- Limit global uses. Not just per player
- Damage the ship the more you use the pad. (Nice try, but no double-dipping-one ship per captain, no salvage sprees!)
- Randomize loot in cargo containers
- Chat/Broadcasting messages on spawn
- Discord role checks?
- Spawn around an NPC tradestation, or the players friendly faciton
- Start a space race event? Any takers?
- Use in tadem with your special events, koth points etc (Call in reinforcements captain!)

Please check the API documenation for setup and guidlines.

The possibilities are endless. If you would like to discuss any ideas with me about if certain things could work feel free to open a ticket, or discuess in a DM! I would love to see more servers utilize more customized events, and interactive spawning for players.

{% include note.html content="A dummy object or action needs to be assigned to the single button on the spawnpad for players to use. This can be a timer, or programmable block trigger for doing cool actions on the grid when a player spawns! Up to you to use as you wish!" %}

{% include warning.html content="Make sure that players are not able to edit the block or control it. This has direct access to grid spawning methods." %}