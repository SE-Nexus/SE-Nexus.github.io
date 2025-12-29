---
category: Setup
order: 3.2
description: Setting Up Your Controller
---

# Nexus Gates

![](/img/ControllerGates.png)

Gates are wormholes that allow players and or grids to be transported between two points. When adding a new gate you can click the 'New Gate' button and optionally rename the gate but double clicking the name to the left of the on/off switch.


## Gate Settings
Each gate can be toggled on/off while the servers are running to allow and prevent travel. This change is immediate and will also update the gate settings to all servers for refreshing.

You also have additional settings to make the 'One-Way' or 'Two-Way'. In one way mode, Gate 1 is input, and Gate 2 is output. Two way both are inputs and outputs respectively. You also can adjust the gate position, direction, and detection radius in meters. Currently Nexus only has 1 gate particle effect to use but we are hoping to implement more in the future!

[INSERT GATE EFFECT PIC HERE]

![](/img/GateDiagram.png)

{% include note.html content="The area in which entities are detected is not actually a disk, but a sphere hence the custom radius. The direction vector is only used for the optional gate effects. You can disable this effect and even make a station in which players must fly small grids into to travel. " %}

## Gate Scripts
Using the scripting system, you can customize the gate input and output events for players. Either by limiting what gets transported with custom responses, or call events when a player spawns on the destination. Such as randomly spawning the player in a position, or depleting all power reserves etc.




