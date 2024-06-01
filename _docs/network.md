---
category: Getting Started
order: 2
description: How to setup networking on your Nexus server
---

# Nexus Networking
Nexus utilizes a publisher and subscriber (PubSub) diagram to push and pull data through a network proxy running in the controller. With this in mind, it uses two ports. One for sending, and one for receiving. These can be any ports, but you must allow them through your firewall and port forward accordingly if required.

The default ports are 3101 for the publish and 3100 for the subscriber.

![](/img/networking_config.png)

## Changing the networking ports & server config
The networking ports can be accessed and changed in the _Configs_ portion of the controller. Once you change the ports the controller will need to be restarted. You will also need to change the ports on the torch nexus plugin. Below is the depicted nexus plugin config. You can edit the publisher and subscriber ports here. They _MUST_ match the controllers' ports. Again, if you change the ports you will need to restart the server and or controller to connect to the ports of the controller. 

Changing the ports is useful if you plan on running multiple controllers on the same box.

![](/img/server_networking_config.png)

## Firewall & Network Security
Obviously, if you plan on running several dedicated machines with different public IPs your network will be exposed through these ports. It is highly recommended to create windows firewall rules on all machines such that you only allow traffic from trusted IPs. If you do not, these ports could be intercepted and be accessed by anyone with another Nexus server and known controller IP/Ports. To create a windows firewall rule with IP limits, see the link below:

[\[Firewall Setup\]](https://dba.stackexchange.com/questions/256155/how-can-i-create-a-windows-firewall-rule-to-allow-only-one-ip-address-to-connect)