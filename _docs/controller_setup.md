---
category: Getting Started
order: 2
description: Setting up your NexusV3 Controller
---

# First Time Setup

| :warning: WARNING          |
|:---------------------------|
| Only run and activate the controller on the target machine you plan to run the controller on! Activation will bind the machine & IP to your license key. Resetting your activation request will require you to open a ticket in the nexus discord.|

Launching the Controller for the first time will prompt you with the below activation screen. You will need to enter your license key, Community Name and a Discord OwnerID that is active in the Nexus Discord. You will recieve special announcments, updates, and roles through discord!

![](/img/ActivationScreen.png)

You will get a popup notification for any errors or successful activation and then will be prompted with the nexus dashboard.

## Controller Settings

You can now navigate to the settings tab to start the back end setup for the controller networking and SQL.

![](/img/ControllerSettings.png)

> [!NOTE]  
> Changing any Network Settings will require a Controller Restart

### Network Configs
Nexus utilizes a publisher and subscriber (PubSub) diagram to push and pull data through a network proxy running in the controller. With this in mind, it uses two ports. One for sending, and one for receiving. These can be any ports but leaving them default is fine. You should only need to change these if you plan to run two controllers on one box. If you plan to run all of your torch servers on the same network (Behind your router/firewall) you do not need to open these ports.

If your servers are on other networks, you will be required to open these ports to be accessible by other machines.

> [!WARNING]  
> OPENING YOUR PORTS IS DANGEROUS. Please only open if you know what you are doing and place certain protections in place. Example: You can whitelist these ports to only accept network traffic from certain IPs. |

Please read up on any firewall/network security before procedeing with this setup. We are not liable for any hacking or issues from leaving your ports wide open for the entire internet.

[\[Firewall Setup\]](https://dba.stackexchange.com/questions/256155/how-can-i-create-a-windows-firewall-rule-to-allow-only-one-ip-address-to-connect)


### SQL Configs

From your SQL setup, you can enter in the hostname for the database and the specified port. (Leave alone for default). You can then use the test connection button to see if the controller is properly communicating with the SQL database.

