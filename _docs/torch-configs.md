---
category: Torch Setup
order: 4.0
description: Setting Up Your Torch Servers
---

# Torch Plugin Configs

![](/img/nexuspluginconfigs.png)

Please make sure to use the correct Nexus version in the Torch Client. Nexus V3 uses the 'Nexus Global (NexusV3)' torch plugin.
When torch servers are hosted on the same machine and enviroment as the controller, you can simply use the local/internal IP of '127.0.0.1' which points the networking basically to itself. If the controller is on another box within the same network, local IPs can be used.



In this version, three ports must be configured to match those described in the controller. If you have changed these values, you will need to change the respective values in ALL of the torch plugin configs.

![](/img/ControllerSettings.png)

The 'Unique Comm Port' is automatically generated on first run with the plugin. You can use the auto assigned port OR pick a unique one yourself. In the controller server config you must make sure you assign this port from the torch server into the config for that server.


{% include warning.html content="The Publisher, Subscriber, and Unique Direct Comms port for each instance MUST be open to the controller and vice versa. It is highly recommended when opening the ports that you restrict the network travel to only authorized IPs of the controller and servers to prevent any un-authorized traffic. Please read through the networking setup at the beginning of this documentation." %}

{% include warning.html content="When dealing with networks outside of your sphere of control, please make sure to use caution and understand network saftey. Port-forwarding and firewalls may need to be adjusted to talk to other networks internally (LAN) or globally (WAN). It is assumed that you understand how to allow communication in such a manner." %}








