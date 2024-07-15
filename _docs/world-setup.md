---
category: Controller Setup
order: 3.1
description: Setting Up Your Controller
---

# Nexus World Setup
## 1. Setting Up Config Groups

NexusV3 uses Config Groups that can be created and assigned to servers. These configs consist of game configs like production multipliers and online modes, mods, plugins, and server specific nexus configs. While there is a 'NONE' option for the server config group selection, it is highly recommended to utilize these configs to streamline server setup.

Game Configs, Mods, and Plugins are automatically assigned to the target server on startup. The server may reboot to add or remove any plugin modifications. For having different configs across your game servers, you will need to create a new config group with those additional changes.

### Creating Config Groups
To Create your first config group Navigate to the Config Groups pane and click the add new button. You will then have the ability to change the name of the config group and start applying any settings.

Searching for game settings can be done by using then search box above the expandable game setting card categories.

### Adding Mods
Switching to the Mods tab lets you import mods from your server, add mods using a URL or valid Steam Mod ID. Please note EOS and EOS mods is not supported by Nexus. Clicking on a mod in the datagrid allows you to see mod description, picture, author etc.

### Adding Plugins
The Plugins Tab will automatically parse the torch website for all available plugins. You can then search and add plugins you may want for each server.

{% include note.html content="Local plugins, or paid plugins offered by torch may show up in this list, but will not be able to function. You will need to copy these plugins into the servers plugin dir manually and enable local plugins option in your torch.cfg" %}

### Additional Tools
Since comparing server configs can be tedious, especially for importing existing world, NexusV3 has the ability to automatically import and map configs from a save. Simple drag and drop your sandbox_config.sbc into the NexusV3 expandable game configs panel under the search box. Your windows icon should detect where the file can be dragged. Game settings and mods will be automatically imported from this file.



## 2. Configuring Servers

Servers are individual torch instances you plan on connecting up to the network. Servers need to have a unique ServerID between [2 - 128] depending on your Nexus Tier. 

Server Type is how you want the server to behave either as a synced enviroment, non synced enviroment, sectored or unsectored. Any Sectored type will require you to select which cluster the server will be apart of. Cluster configuration will be discussed in a later page. An optional Server Abbreviation and Server Description are also configurable. The server abbreviation will be used in cross server chat sync and other popup notifications. The server description will be applied to the server at startup and is used for some notification items.

### Internal Nexus Box IP & Port
These boxes define how the controller talk to the individual server. If your controller and torch instances are on the same IP this can be infact a local 192.168.XXX.XXX IP. If this server is outside of your network you will need to provide the IP of the network explicitly. The port is the generated port that is assigned in your Nexus Global Plugin in Torch. These ports should be identical.

### Public Torch IP & Port
The public Torch IP and Port is what you use to direct connect to your server. This cannot be an internal network IP as outside players will also be using this IP and Port. This configured game port will override the one configured in the torch instance on startup to fix any discrepancies

## 3. Configuring Your Clusters
NexusV3 has the added option of allowing more than one sectored enviroment. When a cluster is added, you have the option of assigning sectored servers to any cluster available. Clusters need a Uniquie ID, Name, and Description.

The Lobby/First Join Server is the selected server that appears in the server listings and what also redirects players to their proper server on join. This selection must have a server and cannot be left blank.

The General Sector/Root Sector is the defining sector that all other sectors should be inside of. This sector can be left infinite, or have a defined size with special conditions when players approach the border. These conditions are scriptable.

## 4. Configuring Sectors

To create a new cluster world partition or 'sector' simply right click the main datagrid and click add new sector. Sectors mush have a unique SectorID, Sector Name, and Sector Description. You then have the option