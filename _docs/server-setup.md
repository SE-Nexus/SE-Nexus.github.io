---
category: Controller Setup
order: 3.0
category_default: true
description: Adding and configuring servers in the controller
---

# Server Setup

After completing the first-time setup and configuring networking, the next step is to register the torch servers you want on your Nexus network. This is done through the **Nexus Setup → Server Setup** page in the controller.

## Adding a Server

Click the **New Server** button to add a new server entry. Each server you add represents a single torch instance in your network.

## Server Properties

Each server has the following settings:

### Server ID
A unique numeric identifier for this server. Must be between **2** and **95** and cannot be shared with any other server. The controller (ID 1) is reserved.

{% include important.html content="The Server ID must match the ID configured in the torch plugin config on the corresponding torch instance. If they do not match, the server will not connect properly." %}

### Server Name
A friendly display name for this server. This is shown in the controller UI and in the `!nexus onlineservers` ingame command.

### Server Type
Determines how this server participates in the Nexus network. For a detailed explanation of each type, see the [Nexus Capabilities](nexus-capabilities) page.

| Type | Synced | Sectored | Use Case |
|---|---|---|---|
| **Synced & Sectored** | ✅ | ✅ | Standard servers sharing a divided world |
| **Synced & Non-Sectored** | ✅ | ❌ | Event servers, gate-only destinations |
| **Non-Synced & Non-Sectored** | ❌ | ❌ | Independent servers, gates/spawns still work |
| **Start-Synced & Non-Sectored** | On startup only | ❌ | Testing servers, temporary events |

### Cluster Assignment
Only required for **Synced & Sectored** servers. Select which cluster this server belongs to. You must create a cluster first (see [Cluster & Sector Setup](cluster-sector-setup)).

### Game IP Address & Port
The public or local IP address and port of the torch server's game instance. This is used for network communication and Seamless Client connections.

### Config Group
Select which Server Config Group this server should use. Config Groups define shared settings like mods, game settings, and Nexus-specific toggles. See [Server Config Groups](server-config-groups) for details.

If no config group is selected, the server will use the settings defined locally in the torch plugin config.

### Lobby Server ID
The server ID of the lobby that players on this server should be sent to when they run the `!nexus lobby` command. For **Synced & Sectored** servers, this is inherited from the cluster's lobby setting. For non-clustered servers, you can set it directly.

### Server Abbreviation
An optional short name or tag prepended to chat messages from this server. Useful for identifying which server a message originated from when chat sync is enabled.

{% include note.html content="Server abbreviations must be enabled in the Config Group for them to appear in chat." %}

### Player Event Script
An optional script name (from the controller's Scripts directory) that will be executed on player join and leave events for this server. The script must implement the `OnPlayerJoin` and/or `OnPlayerLeft` methods.

### Discord Channel IDs

- **Discord Global Chat ID** — The Discord channel ID where this server's global chat messages will be sent and received. Right-click the channel in Discord and select **Copy Channel ID** (requires Developer Mode enabled in Discord settings).
- **Discord Admin Chat ID** — A separate Discord channel for admin-only messages from this server.
- **Discord Command Prefixes** — The character prefix(es) used for Discord commands (default: `!`).

## Removing a Server

Select the server in the list and click the **Remove** button. This will remove the server entry from the controller. Make sure the server is offline before removing it.

{% include warning.html content="Removing a server does not delete any world data. However, any sectors assigned to that server will need to be reassigned." %}
