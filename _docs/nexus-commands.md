---
category: Getting Started
order: 2.4
description: Ingame Commands
---

# Ingame Commands

NexusV3 provides a set of ingame chat commands accessible through the `!nexus` prefix. These commands allow players and admins to interact with the Nexus network from within the game. Discord-linking commands use the `!d` prefix.

## Player Commands

These commands are available to all players (no elevated permissions required).

### `!nexus sectors [AddGps]`
Lists all sectors in the current cluster/world. Optionally pass `true` to also receive GPS markers for each sector center, including parent and child sector information.

**Usage:**
```
!nexus sectors
!nexus sectors true
```

### `!nexus lobby`
Sends you back to the configured lobby server. If you are already on the lobby server, the command will let you know. If the lobby is offline or not configured, you will receive an error message. You can cancel a pending lobby transfer with `!nexus lobby cancel`.

**Usage:**
```
!nexus lobby
```

### `!nexus nearestsector`
Finds the nearest sector border to your current position and drops a GPS marker at the closest border point.

**Usage:**
```
!nexus nearestsector
```

### `!nexus onlineservers`
Lists all currently online Nexus servers along with their display names and server IDs.

**Usage:**
```
!nexus onlineservers
```

### `!nexus refreshcharacter`
Refreshes your character model. Useful if you encounter visual glitches or a stuck character state after a server transfer.

**Usage:**
```
!nexus refreshcharacter
```

## Admin Commands

These commands require **Admin** permission level.

### `!nexus switch <serverID>`
Forcefully transfers you to a specific Nexus server by its ID. Useful for testing and administration.

**Usage:**
```
!nexus switch 3
```

### `!nexus info`
Displays detailed information about the current server and its sector configuration including Server ID, Server Name, Lobby ID, whether the server is a lobby, whether it is sectored, the sector count, and the general sector ID.

**Usage:**
```
!nexus info
```

## Discord Link Commands

These commands use the `!d` prefix and are used to link ingame identities with Discord accounts.

### `!d link <key>`
Links your ingame Steam ID to the backend database using a numeric key. You must first run the corresponding Discord command to generate the key before using this ingame command.

**Usage:**
```
!d link 123456
```

### `!d factionlink`
Links your faction's ingame chat to a Discord channel. You must be the **faction founder** to run this command.

**Usage:**
```
!d factionlink
```

{% include note.html content="The Discord bot must be configured in the Nexus Controller for the linking commands to work. See the Discord Setup documentation for details." %}
