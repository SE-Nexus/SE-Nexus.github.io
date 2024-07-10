---
category: Getting Started
order: 2.1
description: Downloading and installing the systems
---

# Downloading the NexusV3 Controller

The Nexus Controller is required for all Nexus systems. The latest version (NexusV3) is a paid software that can be purchased by visiting the Pricing page above. There are several tiers you can buy depending on your community' needs. After purchasing you will be redirected to show your license key and controller download link.

It is ideal to place the controller in its own folder as it will generate folders at the bin-level directory.

## Server Tiers

NexusV3 is tiered depending on how many torch servers you plan to add to the controller. All purchases are one-time only and upgrades can be possible later by opening a ticket in the Nexus Discord.

The goal for the tiered system was to provide an entry-level framework for smaller communities who want to try the system, but may not need or plan to run a ton of servers. Larger communities may opt to purchase the unlimited server count as they are well supported in player donations.

## Hardware & System Requirements

The Nexus Controller uses less than 1 GB of RAM when running and has almost no CPU performance impact. You can run this on any machine in your network.

While Nexus doesn't increase individual server performance, it does allow you to distribute players and entities across many different torch servers and physical server boxes on the same network or different networks.

You will need to plan your torch instances separately as these can widely vary depending on use.

Nexus is officially only supported on Windows 10 and up including Windows Server 2016 and up.

# Downloading the NexusV3 Torch Plugin

You can download the NexusV3 torch plugin from the torch website through the torch plugin installer or manually. Please make sure no previous versions of Nexus are installed as these systems do not work concurrently.

# Setting up your PostgreSQL database

PostgreSQL is a new requirement for the NexusV3 controller and must be installed for the controller to operate properly. You can find the specific download links for postgres [Here](https://www.postgresql.org/download/).

It is recommended to simply download one of the windows package installers and select PGadmin in the installer sub components. PGadmin is a grapical viewer for postgreSQL that allows you to view, manage, export, and import data. Advanced users may opt to use docker containers on the same machine or run on an enitrely different machine. Please google or youtube those setup instructions yourself.

Just make sure that your SQL database is secure and can be accessed by the only controller.