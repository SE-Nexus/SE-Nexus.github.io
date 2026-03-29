---
category: Torch Setup
order: 4.0
category_default: true
description: Configuring the Nexus torch plugin
---

# Torch Plugin Configs

![](/img/nexuspluginconfigs.png)

Please make sure to use the correct Nexus version in the Torch Client. Nexus V3 uses the 'Nexus Global (NexusV3)' torch plugin.
When torch servers are hosted on the same machine and environment as the controller, you can simply use the local/internal IP of '127.0.0.1' which points the networking basically to itself. If the controller is on another box within the same network, local IPs can be used.

## Networking Settings

In this version, two ports must be configured to match those described in the controller. If you have changed these values, you will need to change the respective values in ALL of the torch plugin configs.

![](/img/ControllerSettings.png)

| Setting | Default | Description |
|---|---|---|
| **Controller IP** | `127.0.0.1` | The IP address of the machine running the Nexus Controller |
| **Subscriber Port** | `3100` | Must match the controller's subscriber port |
| **Publisher Port** | `3101` | Must match the controller's publisher port |
| **Server ID** | `10` | Must match the Server ID configured for this server in the controller |

{% include warning.html content="The Publisher and Subscriber ports for each instance MUST be open to the controller and vice versa. It is highly recommended when opening the ports that you restrict the network travel to only authorized IPs of the controller and servers to prevent any un-authorized traffic. Please read through the networking setup at the beginning of this documentation." %}

{% include warning.html content="When dealing with networks outside of your sphere of control, please make sure to use caution and understand network safety. Port-forwarding and firewalls may need to be adjusted to talk to other networks internally (LAN) or globally (WAN). It is assumed that you understand how to allow communication in such a manner." %}

## Local Plugin Settings

When a server is **not** assigned to a Config Group in the controller, the following settings are configured locally in the torch plugin config. If a Config Group is assigned, these local values are overridden by the group's settings.

### Sync & Transfer Settings

| Setting | Default | Description |
|---|---|---|
| **Enable Chat Sync** | `false` | Enables cross-server chat message synchronization |
| **Enable Respawn Sync** | `false` | Enables cross-server respawn point sharing |
| **Enable Respawn Share** | `false` | Allows sharing medical blocks via custom data (Steam IDs / faction tags) |
| **Enable Grid Jump With Suits** | `true` | Allows players in suits (without a grid) to transfer across sector boundaries |
| **Transfer Static Grids** | `false` | Allows static (station) grids to be transferred across sector boundaries |
| **Allow Inbound NPCs** | `false` | Allows NPC grids to be transferred into this server |
| **Allow Outbound NPCs** | `false` | Allows NPC grids to be transferred out of this server |

### Chat & Display Settings

| Setting | Default | Description |
|---|---|---|
| **Enable Server Abbreviations** | `false` | Prepends the server abbreviation to cross-server chat messages |
| **Enable Chat Broadcaster Channel Everyone** | `true` | Allows the broadcaster channel to send messages to all players |
| **MOTD Title** | *(empty)* | Message of the Day title shown to players on join |
| **MOTD** | *(empty)* | Message of the Day body text |

### Safety & Maintenance Settings

| Setting | Default | Description |
|---|---|---|
| **Disable Character Collisions** | `false` | Disables character-to-character physics collisions |
| **Wipe Grids In Incorrect Sectors On Startup** | `false` | Removes grids that are in a sector belonging to another server on startup |
| **Auto Yeet Corrupted Entities** | `false` | Automatically removes corrupted entities that could cause issues |
| **Enable Action Relay Sync** | `true` | Enables synchronization of action relay block events across servers |

### Debug

| Setting | Default | Description |
|---|---|---|
| **Debug Mode** | `false` | Enables verbose logging for troubleshooting |

{% include tip.html content="If you are having issues with server connections or transfers, enable Debug Mode temporarily to get detailed logs. Remember to disable it when done as it significantly increases log output." %}








