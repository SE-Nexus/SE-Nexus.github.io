---
category: FAQ
order: 6.0
category_default: true
description: Common questions and answers
---

# Frequently Asked Questions
Below is a list of common questions and answers we get asked concerning NexusV3:

## General

### What is the difference between NexusV2 and NexusV3?
NexusV3 is a complete rewrite from the ground up. Notable improvements include support for AI-Enabled, multi-cluster support, new sector shapes (Cuboid, Torus), a refined identity sync system, an easy self-guided setup, a modern controller application, an improved scripting and plugin system, and lobbies are no longer required.

### Does Nexus increase my server's performance?
Nexus does not increase individual server performance. Instead, it allows you to distribute players and entities across multiple torch instances and physical machines while keeping them all connected in the same world. This lets you utilize your hardware's full potential.

### What are the system requirements for the controller?
The Nexus Controller uses less than 1 GB of RAM and has virtually no CPU performance impact. It can run on any machine in your network. Windows 10+ and Windows Server 2016+ are officially supported.

### Do I need a PostgreSQL database?
Yes. PostgreSQL is required for the NexusV3 controller to operate. You can install it on the same machine as the controller or on a separate machine. See the [Installing the Controller](installing-controller) documentation for setup details.

## Networking

### Do I need to open ports?
If all of your torch servers and the controller are on the same machine or local network, you do not need to open ports externally. If your servers are on different networks, you will need to open the publisher and subscriber ports. It is **strongly recommended** to restrict these ports to trusted IPs only via firewall rules.

### What ports does Nexus use?
By default, Nexus uses port **3100** for the subscriber and **3101** for the publisher. Both are configurable.

### Can I run multiple controllers on one machine?
Yes, but you will need to configure each controller to use different publisher and subscriber ports to avoid conflicts.

## Sectors & Clusters

### What sector shapes are available?
NexusV3 supports three sector shapes:
- **Spherical** — Best for isolating planets, moons, or specific regions of space.
- **Cuboid** — Axis-aligned boxes, useful for grid-like sector layouts or splitting large planets.
- **Torus** — Doughnut-shaped sectors, ideal for asteroid belts and rings.

### Can sectors overlap?
Sectors should not overlap. Overlapping sectors will create space that exists in multiple sectors simultaneously and can cause issues. Volume checks are performed at torch startup to warn you of any intersections.

### Can I run multiple sectors on one torch instance?
Yes. Sectors are not limited to one per server. You can assign multiple sectors to a single torch instance. For example, all planet regions could run on one server.

### What happens if a player is in space not covered by any sector?
The cluster has a **General Sector** that covers all space not assigned to a specific sector. Entities in unassigned space belong to the server running the general sector.

## Server Types

### What is the difference between server types?
- **Synced & Sectored** — Full sync and part of the sectored world. Standard usage.
- **Synced & Non-Sectored** — Synced data but operates as a standalone world. Useful for event servers or gate-only destinations.
- **Non-Synced & Non-Sectored** — Almost independent from the controller. Gates and custom spawn systems still function.
- **Start-Synced & Non-Sectored** — Pulls sync data on startup then disconnects. Great for testing or temporary event servers.

## Transfers & Gates

### How do gates work?
Gates are wormholes defined by a center position and detection radius. Anything inside the radius is transported to the gate's destination. Gates can be one-way or two-way and can include custom particle effects.

### Can I customize what happens during a gate transfer?
Yes. Using the scripting system, you can hook into both inbound and outbound gate events. This allows you to filter what gets transported, modify spawn positions, deplete power, broadcast messages, and more.

### Do grids transfer between sectors automatically?
When a grid flies or jumps across a sector boundary, Nexus handles the transfer automatically. You can use scripts with the `CanGridsSwitchSector` and `CanGridsJumpSector` events to allow or deny these transfers.

## Scripting

### What scripting language do Nexus scripts use?
Nexus scripts are written in C# and are compiled at runtime by the controller using Roslyn. Script files use `.cs` or `.txt` extensions and are placed in the controller's Scripts directory.

### How do I update scripts without restarting?
After adding or modifying script files, click the **Refresh Directory** button in the controller. To push updated scripts to all servers immediately, use the **Force Update To Cluster** button. Prefabs always use the latest file automatically.

## Discord

### How do players link their Discord account?
Players first run a Discord bot command to receive a numeric key. Then they run `!d link <key>` ingame to bind their Steam ID to the database.

### Can faction chat be bridged to Discord?
Yes. Faction founders can run `!d factionlink` ingame to connect their faction's chat to a Discord channel. The Discord bot must be configured in the controller first.








