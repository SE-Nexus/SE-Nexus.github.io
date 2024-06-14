---
layout: docs
---

# Welcome to NexusV3 documentation!

## Background Info
Coding of Nexus began at the end of 2019. It was born out of desperation due to the lacking of performance a single server could do even on a high-end machine. A single server running on for example, a i9-9900k, would not even hit the peak of its performance capabilities and yet sim speed on the server would be dropping due to the amount of players and limitations of the game itself. 

Other sync plugins didnt have the functionality or capability I and other server admins were wanting. It needed to be modular, complete, reliable, and easy to work with. So I began my work on creating one myself. At first, all I was wanting was a unified system for cross server Econ for hangar market. However, it turned into me syncing just about everything I can think of. After several months of work and currently at almost 14,000 lines of code, I can safely say that Nexus is beginning to be the solid sync plugin I was wanting for Space Engineers. 

After using some of the exsisting sync plugins, I was tired of the "Each server has a different world and planets" and of course the limiting factors of jump gates. If you have ever played on a server running this system and used a gate, I can guess you shared the same feeling of fear when your ship was sent to another server and you were still loading in... Allowing gate campers to steal your ship as if you were offline. This was where I wanted to differ Nexus.



A Nexus cluster requires an external controller application that acts as the master node in your network. This application then creates a nextwork proxy to relay networking messages between each server tied to its network. The controller also as setup, configs, and plugins similar to the torchUI itself. After networking, its just a matter of syncing the required information live between servers.

## Clustering

The foundation of Nexus consists that all synced servers are running the same world. You simply can customize how you want to divide the world onto which servers. Essentially allowing you to partition a new world, or an exsisting world to run on any amount of servers you want. Since each server shares the same world, planets and coordinate systems are all the same. Allowing you to jump, fly, swim, and walk anywhere on any server and know what spot you are in.

Consider this example,
You are running the standard SOL system on you server. You notice your population growing and SS dropping. However you have yet to max out your systems potential. The majority of your players are also around Earth/Moon and Mars. Simply paritioning these servers to run Earth/Moon region on one server, and Mars on another then everything else on another will break up the performance to run on different servers. 


## Benefits
While Nexus doesnt increase individual server performance, it does let you utilize your full hardware's potential if you want to keep the same world. Nexus was designed to be user friendly in the hopes to make server switching easy and efficient for all players on your server.

Another benefit Nexus offers is the Seamless Client plugin. This is a plugin that allows players to almost seamlessly switch between Nexus only servers so there is no need for loading screens.
