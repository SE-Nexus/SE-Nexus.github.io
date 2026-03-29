---
category: Torch Setup
order: 4.1
description: Managing shared server config groups
---

# Server Config Groups

Server Config Groups allow you to define shared configuration profiles that can be assigned to one or more servers. Instead of configuring each torch instance individually, you create a config group with the desired settings and assign servers to it. This is managed through the **Server Configs** page in the controller.

## Adding a Config Group

Click the **New Config Group** button to create a new group. Each group has a unique auto-assigned ID.

## Config Group Properties

### Group Name
A friendly name to identify this config group (e.g., "Planet Servers", "Event Server", "PvP Zone").

---

## Torch Settings

These settings control torch-level behavior for all servers using this config group.

### Auto Start
When enabled, torch servers assigned to this group will automatically start when the controller launches.

### Restart On Crash
When enabled, the controller will automatically restart a torch server if it crashes.

### Enable Whitelist
Enables the Steam whitelist for servers in this group.

### Get Auto Updates
When enabled, servers will automatically download and apply Space Engineers game updates.

### Get Plugin Updates
When enabled, servers will automatically update their torch plugins.

### Server Description
The server description shown in the Space Engineers server browser.

### MOTD Title & MOTD
The Message of the Day title and body text displayed to players when they join. These fields sync to the ingame MOTD popup.

---

## Mod List

The list of Steam Workshop mods that servers in this group should load. You can add mods by their Workshop ID and manage the list through the controller UI.

{% include tip.html content="You can use the bulk edit feature to quickly add or remove multiple mods at once." %}

---

## Torch Plugins

Select which torch plugins servers in this group should use. The controller provides a list of available plugins that you can toggle on or off.

---

## Game Settings

The Game Settings section exposes Space Engineers world/session settings that the controller will push to servers on startup. This includes all standard world settings such as world size, inventory multiplier, welding/grinding speeds, block limits, and more.

These settings are applied when the server loads the world from the controller's save sync.

---

## Nexus Settings

These settings control Nexus-specific behavior for servers in this config group.

### Allow Inbound NPCs
When enabled, NPC grids can be transferred **into** servers in this group from other servers.

### Allow Outbound NPCs
When enabled, NPC grids can be transferred **out of** servers in this group to other servers.

{% include note.html content="Both inbound and outbound NPC settings must be considered when transferring NPCs between two servers. The source server must allow outbound and the destination must allow inbound." %}

### Chat Sync Enabled
Enables cross-server chat synchronization for servers in this group. When enabled, global chat messages are broadcast to all other synced servers.

### Respawn Sync Enabled
Enables cross-server respawn point sharing. Players will see medical room respawn points from other servers.

### Respawn Share
Enables the respawn sharing feature where players can share their medical blocks with specific players or factions via custom data.

### Jump With Suits
When enabled, players in suits (without a grid) can be transferred across sector boundaries. When disabled, only grids with pilots trigger sector transfers.

### Use Server Abbreviations
When enabled, chat messages from servers in this group will be prefixed with the server's configured abbreviation.

### Sun Rotation Sync Enabled
Enables time-of-day synchronization across all servers in the same cluster that use this config group. Ensures consistent day/night cycles.

---

## Assigning a Config Group to a Server

After creating a config group, go to the **Server Setup** page, select a server, and choose the config group from the dropdown. Multiple servers can share the same config group.

If no config group is assigned to a server, it will use the settings defined locally in the torch plugin config on that instance.

{% include warning.html content="Changes to a config group's Nexus settings take effect on the next server restart or config push. Torch settings are applied when the server loads." %}
