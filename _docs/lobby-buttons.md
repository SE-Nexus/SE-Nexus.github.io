---
category: Misc Features
order: 5.1
description: Collection of Miscellaneous Nexus Features
---

# Lobby Buttons & URLs
Nexus also includes by default the option to put URLs in buttons for various links. When pressing, steamoverlay will open on the client with the provided link. Whitelisted links will be opened directly without warning of suspicious links. These include links to ksh sites, youtube and steamcommunity.

Any button in can be used as a website url popup by simply putting 'Website:INSERT URL' in the custom data. For example: 'Website:https://www.keenswh.com/'.

These buttons could be used for discord links, server rules, player information, etc. 

{% include note.html content="Steam lets you disable steam-overlay for games. So these URL buttons may not work for every user in your server." %}

## Button Scripts
Additionally Nexus allows you to create custom script events when clients press buttons. Add 'ScriptName:NAME' into the customdata. The action has the button panel block and the steamID & IdentitiyID of the player who pressed the button as an input. Everything else we leave to you!

{% include warning.html content="All Button events only work on buttons BUILT by NPCs. Players themselves do not have access to create these button types themselves UNLESS there is another mod or plugin that someone lets players assign a builtby identitiy." %}









