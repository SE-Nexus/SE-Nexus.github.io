---
category: Features
order: 5.3
description: Overview of all synchronized systems
---

# Sync Systems

NexusV3 synchronizes a wide range of game data across all connected servers in real time. This page documents each synchronization system, what it does, and any relevant configuration options.

All sync systems only operate on servers configured as **Synced** (either Synced & Sectored or Synced & Non-Sectored). Non-synced server types do not participate in data synchronization.

## Identity Sync
Ensures that player identities are consistent across all servers. When a new player joins any server in the network, their identity (Steam ID, identity ID, display name, and associated data) is broadcast to all other synced servers.

This system is foundational — most other sync systems depend on identities being consistent.

## Faction Sync
Synchronizes all faction operations in real time across the network including:
- Faction creation and deletion
- Faction member joins, leaves, kicks, and promotions
- Faction tag, name, description, and color edits
- Faction auto-accept and other state changes
- Faction discovery

Changes made on any server are immediately reflected on all other synced servers.

## Reputation Sync
Keeps faction reputation consistent across all servers. Synchronized events include:
- Reputation changes between a player and a faction
- Reputation changes between two factions

This ensures that trade station access, NPC relations, and faction diplomacy work identically regardless of which server a player is on.

## Economy Sync
Synchronizes the Space Engineers banking system across servers including:
- Account creation and removal
- Balance changes (deposits, withdrawals)
- Balance transfers between accounts

All economy transactions on any server are replicated network-wide so players maintain a single unified balance.

## Chat Sync
Bridges chat messages across all synced servers. When enabled, global chat messages sent on one server appear on all other servers in the network.

Chat sync also integrates with the Discord bridge — messages can be forwarded to configured Discord channels through the controller.

**Config:** `EnableChatSync` in the torch plugin config or controller config group.

## Progression Sync
Synchronizes the research/progression unlock system across servers including:
- Unlocking research
- Sharing research
- Resetting research (per-player or global)
- Locking research
- Adding and removing required research

Players retain their research progress no matter which server they are on.

## Save Sync
Coordinates world saves across the network. On server startup, each synced server requests the latest save data from the controller to ensure it starts with the correct world state. After the server saves, the updated data is sent back to the controller.

This system ensures that all sectored servers share the same consistent world.

## Sun Rotation Sync
Synchronizes the time-of-day and sun position across all servers in the same cluster. This ensures that all sectored servers display the same day/night cycle so players experience consistent lighting when transferring between servers.

Only applies to **Synced & Sectored** servers.

## Online Server Sync
Maintains a real-time list of all online servers and their statuses across the network. This data is used by:
- The `!nexus onlineservers` command
- Gate systems (to check if destination servers are reachable)
- The lobby command (to verify the lobby is online)
- The ModAPI (`GetAllOnlineServers`, `IsServerOnline`, `GetAllOnlinePlayers`)

## Respawn Sync
Synchronizes respawn point availability across servers. Players can see and use medical room respawn points from any server in the network. This includes cross-server respawn so players can respawn directly on another server where their medical room exists.

**Config:** `EnableRespawnSync` and `EnableRespawnShare` in the torch plugin config.

## Respawn Sharing
Extends the respawn system to allow sharing respawn blocks with specific players or factions by adding Steam IDs or faction tags to a medical block's custom data. On ownership changes, the custom data is automatically wiped to prevent exploitation.

## Player Metadata Sync
Tracks player metadata across the network including last known server, last known position, and traversal history. This metadata powers features like the "Return to Last Server" functionality on spawn pads (setting `ToServerID` to `0`).

## Player Events Sync
Broadcasts player join and leave events across the network. When a player joins or leaves any server, all other servers are notified. This drives features like cross-server player counts, online status checks, and script events (`OnPlayerJoin`, `OnPlayerLeft`).

## Entity ID Sync
Coordinates entity ID allocation across servers to prevent ID collisions when grids and entities are transferred between instances.

## Laser Antenna Sync
Enables cross-server laser antenna communication. A custom Nexus Laser Antenna block type can relay antenna network messages between servers, allowing players to build communication networks that span the entire cluster.

## Controller Events Sync
Relays controller-level events to all connected servers. This includes configuration changes, gate updates, and other administrative actions performed through the controller UI.

## Faction Discord Sync
Bridges faction chat to Discord channels. When configured, faction messages are forwarded to designated Discord channels through the controller's bot, and Discord messages are relayed back to faction chat ingame.
