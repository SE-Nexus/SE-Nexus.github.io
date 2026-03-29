---
category: Controller Setup
order: 3.1
description: Creating clusters and sectors in the controller
---

# Cluster & Sector Setup

Once your servers are registered in the controller, you can create clusters and sectors to define how your world is divided. This is done through the **Nexus Setup** pages in the controller.

For a conceptual overview of clusters and sectors, see the [Nexus Capabilities](nexus-capabilities) page.

---

# Cluster Setup

Navigate to **Nexus Setup → Cluster Setup** to manage your clusters. A cluster represents an entire world that can be distributed across multiple servers.

## Adding a Cluster

Click the **New Cluster** button to create a new cluster entry.

## Cluster Properties

### Cluster ID
A unique numeric identifier for this cluster. Must be between **1** and **255**.

### Cluster Name
A friendly display name for this cluster.

### Cluster Description
An optional description to help identify the purpose of this cluster.

### Lobby Server ID
The server ID of the lobby server for this cluster. All **Synced & Sectored** servers in this cluster will inherit this as their lobby destination for the `!nexus lobby` command. The lobby server must already be registered in the Server Setup page.

{% include important.html content="Every cluster should have a lobby server assigned. Without one, the !nexus lobby command will not function for players on servers in this cluster." %}

### General Sector
The sector ID that acts as the **catch-all** for this cluster. Any space in the cluster's world that is not covered by a specific sector belongs to the general sector. The general sector's assigned server will handle all entities in unassigned space.

{% include warning.html content="You must assign a General Sector to each cluster. Without one, entities in space not covered by any sector will have no home server." %}

---

# Sector Setup

Navigate to **Nexus Setup → Sector Setup** to manage your sectors. Sectors divide a cluster's world into regions, each assigned to a specific server.

## Adding a Sector

Click the **New Sector** button to create a new sector entry.

## Sector Properties

### Sector ID
A unique positive numeric identifier for this sector.

### Sector Name
A friendly display name shown in the `!nexus sectors` command and GPS markers.

### Sector Description
An optional description displayed when players list sectors with GPS details.

### On Server ID
The server ID that this sector runs on. This must match a registered server that is **Synced & Sectored** and assigned to the same cluster.

{% include note.html content="Multiple sectors can be assigned to the same server. For example, you could assign all planet sectors to a single torch instance." %}

### Sector Shape
The geometric shape used to define this sector's boundaries. Choose from the options below.

#### Spherical
The most common shape. Defined by a center point and radius.

| Field | Description |
|---|---|
| **X, Y, Z** | Center position (World GPS coordinates) |
| **Radius (KM)** | Sphere radius in kilometers |

#### Cuboid
An axis-aligned box. Defined by two opposite corner points.

| Field | Description |
|---|---|
| **X, Y, Z** | First corner position |
| **DX, DY, DZ** | Second corner position (opposite corner) |

{% include tip.html content="You can get GPS coordinates ingame by pressing F9 to show your position, or by creating a GPS marker and copying the coordinates." %}

#### Torus
A doughnut shape. Ideal for asteroid belts and rings.

| Field | Description |
|---|---|
| **X, Y, Z** | Center position |
| **DX, DY, DZ** | Direction vector (perpendicular to the ring plane) |
| **Radius (KM)** | Distance from center to the middle of the ring |
| **Ring Radius (KM)** | Cross-section radius of the ring tube |

{% include note.html content="The Ring Radius must be smaller than the main Radius." %}

### Sector Boundary Script
An optional script name that will be executed when grids attempt to cross this sector's boundary. The script must implement `CanGridsSwitchSector` and/or `CanGridsJumpSector`. See the [Scripting API](scripting-api) page for details.

### Sector Boundary Texture
The visual texture displayed at the sector boundary ingame. Players approaching a sector edge will see this visual indicator.

### Sector Boundary Color
The color of the sector boundary visual effect.

### Hidden Sector
When enabled, this sector will not appear in the `!nexus sectors` command output. Useful for internal or administrative sectors.

### Enable Sector Info Provider
When enabled, displays sector information to players through the HUD when they are within this sector.

## Nesting Sectors

Sectors can be nested inside each other to create hierarchical regions. For example, a large sphere covering an entire planet system could contain smaller spheres for individual planets.

When sectors overlap, the **smallest** (most specific) sector containing an entity determines which server owns it.

{% include warning.html content="Overlapping sectors at the same level (where neither fully contains the other) will cause conflicts. Volume intersection checks are performed on torch startup to warn you of any issues." %}

## Example Setup

Here is a simple example for a Sol System cluster with two servers:

1. **Create a Cluster** — Name: "Sol System", ID: 1
2. **Create Server A** — ID: 2, Type: Synced & Sectored, Cluster: 1 (Earth/Moon)
3. **Create Server B** — ID: 3, Type: Synced & Sectored, Cluster: 1 (Everything Else)
4. **Create Sector "Earth"** — Sphere centered on Earth, Radius: 200 KM, On Server: 2
5. **Create Sector "Moon"** — Sphere centered on Moon, Radius: 100 KM, On Server: 2
6. **Create Sector "General"** — Assign as the cluster's General Sector, On Server: 3
7. Set the cluster's **General Sector** to the "General" sector ID
8. Set the cluster's **Lobby Server** to whichever server you want as the lobby
