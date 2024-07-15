---
category: Controller Setup
order: 3.1
description: Setting Up Your Controller
---

# Setting Up Config Groups

NexusV3 uses Config Groups that can be created and assigned to servers. These configs consist of game configs like production multipliers and online modes, mods, plugins, and server specific nexus configs. While there is a 'NONE' option for the server config group selection, it is highly recommended to utilize these configs to streamline server setup.

Game Configs, Mods, and Plugins are automatically assigned to the target server on startup. The server may reboot to add or remove any plugin modifications. For having different configs across your game servers, you will need to create a new config group with those additional changes.

## Creating Config Groups
To Create your first config group Navigate to the Config Groups pane and click the add new button. You will then have the ability to change the name of the config group and start applying any settings.

Searching for game settings can be done by using then search box above the expandable game setting card categories.

## Adding Mods
Switching to the Mods tab lets you import mods from your server, add mods using a URL or valid Steam Mod ID. Please note EOS and EOS mods is not supported by Nexus. Clicking on a mod in the datagrid allows you to see mod description, picture, author etc.

## Adding Plugins
The Plugins Tab will automatically parse the torch website for all available plugins. You can then search and add plugins you may want for each server.

{% include note.html content="Local plugins, or paid plugins offered by torch may show up in this list, but will not be able to function. You will need to copy these plugins into the servers plugin dir manually and enable local plugins option in your torch.cfg" %}

## Additional Tools
Since comparing server configs can be tedious, especially for importing existing world, NexusV3 has the ability to automatically import and map configs from a save. Simple drag and drop your sandbox_config.sbc into the NexusV3 expandable game configs panel under the search box. Your windows icon should detect where the file can be dragged. Game settings and mods will be automatically imported from this file.