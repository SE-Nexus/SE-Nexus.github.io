---
category: Controller Setup
order: 3.2
description: Setting Up Your Controller
---

# Script Setup

The Nexus Script System is a happy medium between mods, and plugins that you the end user can modifiy on the fly without requesting additional features and updating the entire application. If you have the means and know-how anything is possible inside of these scripts.

We have created several example scripts that can be used primarily for respawn grids on the Nexus Github. You are welcome to dowload, modifiy and adjust any of the example scripts to your hearts content. If there is major additions you have added, we do kindly request and encourage PRs on github so everyone may benefit from them!



## Adding Your Scripts
![](/img/ControllerScripts.png)

You can use the provided buttons to open the directory where scripts are stored. Script files are essentially text files with the extensions of '.txt' or '.cs'. The list of scripts provide the name, last modified date, and script types. Script types are defined by what events the script is utilizing in the controller. For a full list of scriptable events, please check the API documentation page.

{% include warning.html content="When adding or updating scripts, you must click the refresh directory, or restart your controller. You should see the added or removed scripts with all the correct last modified registered in the controller." %}

{% include note.html content="If you want to immediately updated scripts on servers without restarting anything, you can click the 'Force Update To Cluster' Button. This will broadcast all scripts in the controller to all online/connected servers" %}

## Adding Your Prefabs
Using the same buttons like the scripts, you can navigate to the controller's prefab directory. Add any .bp or .sbc file into this folder for grids being used by the scripting system. (Respawn Pads/Transporters/Possible Gates). Clicking the refresh button will re-sync the prefabs in the controller with those in the folder.



