---
category: Capabilities of Nexus
order: 1
category_default: true
description: Getting started with the Nexus Controller
---

# The Capabilities of NexusV3

NexusV3 offers numerous improvements over its first-generation counterpart. It has been completely rebuilt from the ground up with a core code system designed to integrate seamlessly with newer game systems and mechanics. Key enhancements include sectoring, scripting, server configuration, and synchronization systems.

Notable V3 Improvements:
- Support for AI-Enabled - [Steam Workshop](https://steamcommunity.com/workshop/filedetails/?id=2596208372)
- Multi-Cluster Support
- New Sector Shapes (Cubiod, Torus)
- Refined Identity Sync System
- Easy Self-Guided Setup
- Modern Controller
- Improved Scripting & Plugin System
- Lobby Sector is no longer required

Nexus is primarily a server-syncing application that synchronizes all important server metadata across a specified list of servers in the network in real time. This ensures that your servers feel connected, with features like chat, economy, factions, identities, reputation, and more seamlessly synced across the entire network.

Secondly, NexusV3 provides a powerful set of sectoring tools that allow you to divide worlds, create intricate systems, and even design entire galaxies if desired. These tools offer flexibility in how you structure your game environment, enabling you to customize the design and layout according to your server's specific requirements and preferences. Whether you want to create isolated sectors for different player groups or a connected galaxy for expansive exploration, NexusV3's sectoring tools can accommodate your vision.

# Understanding the Core Systems
The following information describes key terms used throughout the setup process. If you are already familiar with Nexus, you can skip this section.


## What is a Nexus Server?
A Nexus Server is a torch instance listed in the controller. You can list all servers you want on your network that you plan to use. Each server needs a unique server ID and specific server type.



### Synced & Sectored
Synced and Sectored servers are your bread-and-butter server types. These servers are being synced data-wise live across the network and are part of a sectored environment. This Server type also needs to know which cluster environment it is a part of. *(See what is a cluster below)*

### Synced & Non-Sectored
These servers are still a part of the same sync environment but are not a part of any sector/cluster environment. They act as standalone worlds independent of your cluster environment. Commonly used as event servers or gate destinations. If configured, there would be no way for any ships or players to travel there unless gates are configured or other external transportation tools.

### Non-Synced & Non-Sectored
These servers act almost independently from the nexus controller and do not get synced. However, some nexus features such as gates or the custom spawn systems will still work with this server. 

### Start-Synced & Non-Sectored
This server on startup will pull the latest sync data from the controller and then immediately disable it for fun event servers where factions might need to be re-arranged after the fact. This data will not be sent back to the controller and is completely isolated data and region-wise from the rest of the nexus systems. Perfect for a testing server too.


## What's a Cluster?
A Cluster represents an entire world as a whole. For example, start with the default 'Sol System' map. If you want to distribute this specific map across any amount of torch instances, this would be defined as a Cluster. TLDR; Any servers sharing the same map is a Cluster.

Why would you want to split a map? For many reasons:
- Player/Performance distribution: *If you want to put all planet players and grids on one server and have space be another*
- Different Server Configs, OR Server specific plugins, functions, or gameplay implementations.
- Access Restrictions etc

Nexus V3 Supports running any amount of clusters in the controller that *ALL* share the same Sync Data.

## What's a Sector?
A Sector represents a sub-divided region or *Sector* of space split from the parent cluster. If you want to split your map, sectors are the way to do it. Sectors are *NOT* singular server-specific. This means you can run multiple different sectors on one torch instance. For example, if you want to run all the planet regions of the Sol System map, you can create a sector for each planet, and assign them to run on one torch instance.

Sectors can also be nested within each other. Just make sure that no overlap occurs as this will create space that would exist in both sectors simultaneously. There are volume checks done at torch startup to let you know if any overlap/intersect.

Nexus V3 supports three total sector shapes that you can add to your cluster listed below.
### Spherical Sectors
The most common, widely used sector shape. If you want to separate planets, upper atmospheres, or your favorite gas cloud, Spheres will probably be all you need. Sphere Sectors take a Center Vector3D/WorldGPS point and a radius that is defined in KM.

### Cuboid Sectors
This new shape allows you to create axis-aligned boxes in the world. (Cannot adjust orientation/rotation) You can have cuboids next to each other to create a true sector/grid environment. You can now also get fancy and use two to split that extra-large pesky planet you have in half that was not as neat to do so with spheres. Likewise, it could be further broken down into 4ths or 8ths to create planet quadrants. Rover-only servers are now much more manageable!

You can configure this Cube by inputting two Vector3D/WorldGPS Corner Points.

### Torus Sectors
For those who don't know, a Torus is simply a doughnut. I figure this will be the least common sector, but Asteroid belts/rings can be created and put perfectly inside of this torus sector. This sector can be given an orientation vector to align with your asteroid belt.

To configure this cluster, and center point is needed with a Radius, and Ring Radius (Cross-Section Radius). You can also add a direction vector (where the vector will be perpendicular to the ring radius)

## What a Gate?
A Nexus gate is a portal or wormhole that can be configured to send you to any location on any server. By default, Nexus Gates has a unique particle effect for inbound/outbound sides that can be viewed ingame. This particle effect can be changed with a different effect or disabled entirely allowing you to implement your own system or lore-specific functionality.

The gate itself is simply defined by a center and radius. Anything inside of this radius is transported.