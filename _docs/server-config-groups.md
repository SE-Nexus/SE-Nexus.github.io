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

## Managing Mods

The **Mods** tab in a config group shows the list of Steam Workshop mods that servers in this group will load. Mods are automatically injected into all servers assigned to this config group on startup.

### Adding Mods

You can add mods to a config group in three ways:

#### By Steam Workshop ID
1. Click the **Add Mod** button in the Mods tab
2. Enter the mod's Steam Workshop ID (found in the URL: `https://steamcommunity.com/sharedfiles/filedetails/?id=XXXXXXXX`)
3. Click **Add** to import the mod

#### By Steam Workshop URL
1. Click **Add Mod**
2. Paste the full Steam Workshop URL
3. Click **Add**

#### By Drag-and-Drop Import
Import mods and settings from an existing `sandbox_config.sbc` file:
1. Go to the **Game Settings** section above the mod list
2. Drag and drop your `sandbox_config.sbc` file onto the game settings panel
3. The controller will automatically extract and add all mods from the file

{% include note.html content="Plugin and mod specific configurations cannot be managed through the controller. After mods are deployed, you must configure mod settings individually on each server." %}

### Bulk Edit

Use the bulk edit feature to quickly add or remove multiple mods at once:
1. Click the **Bulk Edit** button in the Mods tab
2. Paste a list of mod Steam IDs (one per line) or URLs
3. Choose to **Add** or **Remove** these mods
4. Click **Apply**

This is useful when migrating mods from an existing server or managing large mod lists.

### Removing Mods

Select a mod in the list and click **Remove**. The mod will be unloaded from all servers in this config group on the next server restart.

### Mod Restrictions

{% include warning.html content="EOS (Early Access) and Steam paid mods are not supported by Nexus. Do not add these mods to config groups as they will cause deployment errors." %}

### How Mods Are Deployed

When a server assigned to this config group starts:
1. The controller pushes the mod list to the server
2. The Nexus plugin injects the mods into the world configuration
3. The server loads all configured mods on startup
4. If mods changed, the server may automatically restart to apply changes

If a mod fails to load, check the server logs for errors. The mod may be broken, incompatible with the current Space Engineers version, or missing required dependencies.

---

## Managing Torch Plugins

The **Plugins** tab shows available Torch plugins that can be enabled or disabled for servers in this config group.

### Adding Plugins

The controller automatically discovers available plugins from the official Torch website:
1. Open the **Plugins** tab
2. Search for the plugin by name
3. Click to view the plugin description, version, author, and ratings
4. Check the checkbox to enable the plugin for this config group

The plugin will be installed on all servers assigned to this group on the next startup.

### Removing Plugins

Uncheck the plugin's checkbox to disable it. The plugin will be removed from all servers in this config group after the next restart.

### Local & Paid Plugins

{% include warning.html content="Local plugins (not published to the Torch website) and paid plugins may appear in this list but cannot be deployed by Nexus. You must manually copy these plugins into each server's plugin directory and enable local plugins in the server's torch.cfg file." %}

To use a local or paid plugin:
1. Download the plugin files
2. Copy them to `<Torch Install>\Plugins\` on each server
3. Configure the plugin manually on each server instance

### Plugin Configuration

{% include note.html content="Plugin-specific settings must be configured directly on each torch server, not through the controller. After deploying a plugin, connect to each server and configure it as needed." %}

Most plugins have configuration files in `<Torch Install>\Plugins\<PluginName>\` that you can edit directly.

### Restarting Servers After Plugin Changes

When you add or remove plugins from a config group:
1. All servers in the group will be notified of the change
2. Servers may need to restart to apply plugin changes
3. Check the server status in the controller to confirm the restart completed successfully

If a server fails to start after a plugin change, check the server logs for plugin compatibility issues or errors.

---

## Game Settings

The **Game Settings** tab exposes Space Engineers world/session configuration options that the controller will push to servers on startup. This includes all standard world settings such as world size, inventory multiplier, welding/grinding speeds, block limits, and more.

### Searching for Settings

Use the search box above the expandable setting categories to quickly find specific settings by name.

### Importing from Existing World

To import settings from an existing Space Engineers world:
1. Locate the `sandbox_config.sbc` file from your world save
2. Drag and drop it onto the Game Settings panel
3. The controller will automatically extract and populate matching settings

This is useful when migrating an existing world to Nexus.

### Applying Settings

Game settings are applied when a server in this config group loads the world from the controller's save sync. Changes take effect on the next server restart.

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
