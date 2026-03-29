---
category: Controller Setup
order: 3.3
description: Configuring lobby servers
---

# Lobby Setup

A lobby is a designated server that acts as a starting or hub area for your Nexus network. Players can return to the lobby at any time using the `!nexus lobby` command. Lobbies are configured through the **Nexus Setup → Lobby Setup** page in the controller.

## How Lobbies Work

In NexusV3, lobbies are **no longer required to be unsectored**. A lobby can be any server type — sectored, unsectored, or even a standalone world. This gives you much more flexibility in designing your player experience.

Common lobby setups include:
- A dedicated spawn station above a starting planet
- A space station hub with spawn pads to different servers
- A sectored server that also serves as the lobby for its cluster

## Assigning a Lobby

There are two ways lobbies get assigned:

### Cluster-Level Lobby
For **Synced & Sectored** servers, the lobby is defined at the cluster level. Go to **Cluster Setup**, select your cluster, and set the **Lobby Server ID**. All servers in that cluster will use this lobby.

### Per-Server Lobby
For **non-clustered** servers (Synced & Non-Sectored, Non-Synced, etc.), the lobby is set directly on the server entry in **Server Setup** via the **Lobby Server ID** field.

## Lobby Detection

A server is considered a lobby if:
- It is assigned as the lobby for any cluster, **or**
- Any other non-clustered server points to it as its lobby

When a server is detected as a lobby, its own lobby destination is set to itself (you cannot lobby out of the lobby).

## Player Experience

When a player runs `!nexus lobby`:

1. The plugin checks if the player is already on the lobby server
2. If not, it verifies the lobby server is online
3. The player is queued for transfer to the lobby server
4. The player can cancel the pending transfer with `!nexus lobby cancel`

If the lobby is offline or not configured, the player receives an error message.

## Combining with Spawn Pads

Lobbies work well in combination with [Nexus SpawnPads](nexus-spawnpads). You can set up a lobby station with multiple spawn pads that send players to different servers or locations. Using the `ToServerID` field set to `0` on a spawn pad will return the player to whichever server they came from.

{% include tip.html content="Create an immersive lobby experience by combining spawn pads, scripted buttons, and URL buttons for Discord links and server rules." %}
