---
category: Installation
order: 2.15
description: Importing an existing world into Nexus
---

# Importing an Existing World

If you already have an existing Space Engineers world that you want to run on Nexus, you can import it into the controller. This brings your world data, mods, and game settings into the Nexus cluster system.

There are two import workflows:
- **Single-Server Import** — Import a world to run on a single server
- **Multi-Server Distribution** — Import a world and split it across multiple servers by sector

Both workflows start with the same preparation steps, then diverge based on your needs.

{% include important.html content="All servers must be offline before importing a world save. The controller will reject the import if any servers are connected." %}

## Prerequisites

Before starting, ensure you have:

1. **Cluster created** — At least one cluster in the controller (see [Cluster & Sector Setup](cluster-sector-setup))
2. **Controller running** — The Nexus Controller must be active
3. **All servers offline** — Stop all torch instances connected to the controller
4. **World files accessible** — You have access to the world save folder on your local machine or existing server

## Preparation: Locate and Copy World Files

### Step 1: Locate Your World Files

Your world files are stored in one of two locations:

**On an existing Torch Server:**
- Location: `<Torch Install>\Saves\<WorldName>\`
- Key files: `Sandbox.sbc` (world data), `Sandbox_config.sbc` (settings & mods)

**On a Local Space Engineers Installation:**
- Location: `%AppData%\SpaceEngineers\Saves\<WorldName>\`
- Key files: `Sandbox.sbc`, `Sandbox_config.sbc`

### Step 2: Copy World Folder to Your Controller Machine

Copy the entire world folder to a temporary location on your controller machine:

```
Source: <Torch Install>\Saves\<WorldName>\
Destination: C:\Temp\<WorldName>\  (or any accessible location)
```

This gives you easy access to the `Sandbox_config.sbc` file for the next step.

### Step 3: Extract Settings and Mods via Config Group

Before copying files to servers, extract the world settings and mod list:

1. Go to **Server Configs** in the controller
2. Create a new Config Group
3. In the **Game Settings** tab, drag and drop `Sandbox_config.sbc` (from Step 2)
4. The controller extracts all game settings automatically
5. Check the **Mods** tab — all detected mods are now listed

{% include tip.html content="This is the only way to extract settings and mods from existing worlds. The actual world data (grids, players) is handled separately in the steps below." %}

## Single-Server Import

If you're running the world on a **single server**, follow these steps.

### Step 1: Copy World Folder to Server

Copy the entire world folder to your torch server:

```
Source: <Temp Location>\<WorldName>\  (from Preparation Step 2)
Destination: <Torch Install>\Saves\<WorldName>\  (on the torch server machine)
```

### Step 2: Assign Config Group and Start Server

1. Go to **Server Setup** and select your server
2. Assign the Config Group you created (Preparation Step 3)
3. Assign the server to a cluster in **Cluster Setup**
4. Start the server through the controller

{% include important.html content="The first server start will initialize the world data. This can take several minutes for large saves." %}

### Step 3: Verify Single-Server Import

After the server starts:

1. ✅ Check **Online Servers** — server should show as "Running"
2. ✅ Connect ingame — verify world data, grids, and players are present
3. ✅ Check mods — verify all expected mods are loaded
4. ✅ Check player data — verify characters and factions are present

---

## Multi-Server Distribution

If you want to use **multiple servers** to host different regions of your world, follow these steps.

### How Multi-Server Distribution Works

When servers start with the same world folder and defined sectors:

1. **All grids load** — Each server loads all grids from the shared world file
2. **Sectors are checked** — The Nexus plugin scans each grid's position against sector boundaries
3. **Grids are distributed** — Grids are kept, moved, or removed based on configuration:
   - **Correct sector** — Grid stays on this server
   - **Wrong sector + `WipeGridsInIncorrectSectorsOnStartup: true`** — Grid is removed
   - **Wrong sector + `WipeGridsInIncorrectSectorsOnStartup: false`** — Grid transfers to correct server during gameplay

{% include note.html content="Important: Voxels (asteroids, planets) are NOT transferred between servers, only grids. Each server has a copy of all voxels. Grids embedded in voxels may become buried or corrupted if voxel geometry differs between servers." %}

### Step 1: Copy World Folder to All Servers

Copy the entire world folder to **each torch server** in your cluster:

```
Source: <Temp Location>\<WorldName>\  (from Preparation Step 2)
Destination: <Torch Install>\Saves\<WorldName>\  (on each torch server machine)
```

{% include important.html content="Each server must have an identical copy. Missing or corrupted files on any server will cause sync failures." %}

### Step 2: Create Sectors in Controller

1. Go to **Cluster Setup** and select your cluster
2. Create sectors for different regions (planets, asteroid fields, etc.):
   - Define cubic sector boundaries
   - Assign each sector to a different server
   - Example: "Planet 1 Sector" → Server A, "Asteroid Field" → Server B

See [Cluster & Sector Setup](cluster-sector-setup) for detailed sector configuration.

{% include tip.html content="Use rectangular sectors aligned to Space Engineers coordinates for predictable behavior. Avoid overlapping sectors." %}

### Step 3: Configure Torch Settings (Before Starting Servers)

{% include important.html content="Configure these settings in `torch.cfg` on each server BEFORE starting the servers. Changes after startup may not take effect until restart." %}

On each torch server, edit the Nexus plugin settings in `torch.cfg`:

**Strict Mode (Recommended for Multi-Server):**

```yaml
# torch.cfg - Nexus Plugin Settings
WipeGridsInIncorrectSectorsOnStartup: true
TransferStaticGrids: false
AllowInboundNPCs: true
AllowOutboundNPCs: true
```

Grids in wrong sectors are removed on startup. Only grids in the correct sector survive.

**Dynamic Mode (Grids Transfer During Gameplay):**

```yaml
WipeGridsInIncorrectSectorsOnStartup: false
TransferStaticGrids: false
AllowInboundNPCs: true
AllowOutboundNPCs: true
```

Grids automatically transfer to correct servers as they cross boundaries.

**Configuration Options Explained:**

- **`WipeGridsInIncorrectSectorsOnStartup`** — Remove grids on startup (`true`) or allow dynamic transfers (`false`)
- **`TransferStaticGrids`** — Allow stations to transfer like ships (`true`/`false`)
- **`AllowInboundNPCs`** — Allow NPC grids to enter this server (`true`/`false`)
- **`AllowOutboundNPCs`** — Allow NPC grids to leave this server (`true`/`false`)

{% include note.html content="Enabling `TransferStaticGrids: true` can impact performance on servers with many stations. Monitor server load carefully." %}

### Step 4: Start Servers in Sequence

1. Start the **lobby server first** (if designated)
2. Start sector servers one at a time
3. Allow 1-2 minutes for each server to initialize and sync
4. Grids will automatically distribute to their correct sectors on startup

{% include important.html content="The first server to start performs initial synchronization. Subsequent servers align to match. Large worlds may take several minutes." %}

### Step 5: Verify Grid Distribution

After all servers are running:

1. Connect to different servers and verify grids are in correct sectors
2. Check controller logs for grids that were removed (if using strict mode)
3. Monitor server logs for transfer messages (if using dynamic mode)

---

## Grid Transfer Behavior Reference

Once servers are running and sectors are assigned, different grid types behave as follows:

**Static Grids (Stations):**
- By default do NOT transfer between servers
- Removed on startup if in wrong sector (with `WipeGridsInIncorrectSectorsOnStartup: true`)
- Held in place if in wrong sector (with `WipeGridsInIncorrectSectorsOnStartup: false`)
- Enable `TransferStaticGrids: true` to allow transfer like dynamic grids

**Dynamic Grids (Ships):**
- Transfer automatically to correct server when crossing sector boundaries
- Players aboard transfer with the grid
- Works with both strict and dynamic modes

{% include warning.html content="Grids embedded in voxels that transfer between servers will NOT transfer with the voxels. The grid arrives on the destination but may be buried or corrupted if voxel geometry differs. Remove grids from voxels before boundaries or use strict wipe mode." %}

**Player Grids:**
- Always transfer with the player when crossing sector boundaries

**NPC/Faction Grids:**
- Only transfer if destination has `AllowInboundNPCs: true`
- Only leave if source has `AllowOutboundNPCs: true`

**Example Grid Behavior:**

| Grid Type | Strict Mode | Dynamic Mode | TransferStaticGrids: true |
|---|---|---|---|
| Dynamic ship (wrong sector) | ❌ Removed | ✅ Transfers | ✅ Transfers |
| Station (wrong sector) | ❌ Removed | ⏸️ Stays | ✅ Transfers |
| NPC grid (AllowInbound: true) | ❌ Removed | ✅ Transfers | ✅ Transfers |
| Player ship | ✅ With player | ✅ With player | ✅ With player |

---

## Verification & Troubleshooting

## Verification & Troubleshooting

### Common Issues

#### Server Won't Start After Import

**Cause:** Mods are incompatible, or torch config doesn't match controller.

**Solution:**
1. Check server logs for specific error messages
2. Verify Server ID in torch plugin matches controller config
3. Verify controller IP/ports match in torch plugin config
4. Remove incompatible mods from Config Group and retry

#### Grids/Players Missing After Import

**Cause:** World data not fully synchronized before checking.

**Solution:**
1. Wait for all servers to complete initial startup sync (check logs)
2. Disconnect and reconnect ingame
3. Verify correct Config Group is assigned to server

#### Grids Removed When Expected to Transfer

**Cause:** Server is using strict mode (`WipeGridsInIncorrectSectorsOnStartup: true`) and grids were in wrong sectors at startup.

**Solution:**
1. To preserve grids, switch to dynamic mode: `WipeGridsInIncorrectSectorsOnStartup: false`
2. To debug, check server logs for which grids were removed and why

#### Grid Stuck or Buried After Transfer

**Cause:** Grid was embedded in voxels; voxel geometry differs between servers.

**Solution:**
1. Use strict wipe mode to remove grids near sector boundaries
2. Or manually remove grids from voxels before crossing boundaries
3. Check [Grid Transfer Behavior Reference](#grid-transfer-behavior-reference) for voxel limitations

---

## What Gets Imported / What Doesn't

| Data | Imported | Notes |
|---|---|---|
| **Grids/Ships/Stations** | ✅ Yes | All entities are preserved across servers |
| **Players & Identities** | ✅ Yes | Player histories and relationships maintained |
| **Factions** | ✅ Yes | Faction data and relationships synced |
| **Mods** | ✅ Yes | Detected and added to Config Group via drag-drop |
| **Game Settings** | ✅ Yes | Inventory multipliers, block limits, etc. |
| **Custom Blocks** | ✅ Yes | Including mod-specific custom blocks |
| **GPS Markers** | ⚠️ Partial | Ingame GPS preserved; shared GPS may need reconfiguration |
| **Voxels** | ✅ Yes | Each server maintains identical voxel copies |
| **Grids-in-Voxels** | ⚠️ Risky | Grids embedded in voxels may become buried if geometry differs |

---

## Post-Import Considerations

### Setting Up Lobbies

If using multiple servers, set up a lobby:

1. Go to **Cluster Setup** and select your cluster
2. Set the **Lobby Server ID** to the server players spawn on
3. See [Lobby Setup](lobby-setup) for details

### Enabling Sync Features

In your Config Group's **Nexus Settings**, consider enabling:

- **Chat Sync** — Connect players across servers
- **Respawn Sync** — Allow respawning at medical blocks on other servers  
- **Sun Rotation Sync** — Synchronize time-of-day across the cluster
- **NPC Transfer** — Enable if you have NPC grids moving between servers

---

## Example Workflows

### Single-Server Import Example

1. Copy `<WorldName>` folder to: `C:\Torch\Saves\<WorldName>\`
2. Go to **Server Configs** → Create Config Group
3. Drag-drop `Sandbox_config.sbc` into Game Settings tab
4. Go to **Server Setup** → Assign Config Group
5. Start server
6. ✅ Done — World is running on single server

### Multi-Server Distribution Example

**Scenario:** World with Planet A and Planet B. Want to split across 2 servers.

1. Copy `<WorldName>` folder to both servers:
   - `ServerA:\<Torch Install>\Saves\<WorldName>\`
   - `ServerB:\<Torch Install>\Saves\<WorldName>\`

2. Go to **Server Configs** → Create Config Group
3. Drag-drop `Sandbox_config.sbc` into Game Settings

4. Go to **Cluster Setup** → Create 2 Sectors:
   - Sector A (Planet A): X: -500000 to 0, Y: -500000 to 500000, Z: -500000 to 500000
   - Sector B (Planet B): X: 0 to 500000, Y: -500000 to 500000, Z: -500000 to 500000

5. Assign Sector A → Server A, Sector B → Server B

6. Edit `torch.cfg` on both servers:
   ```yaml
   WipeGridsInIncorrectSectorsOnStartup: true
   TransferStaticGrids: false
   AllowInboundNPCs: true
   AllowOutboundNPCs: true
   ```

7. Go to **Server Setup** → Assign Config Group to both servers

8. Start Servers in order: Server A first, then Server B

9. ✅ Grids on Planet A stay on Server A, grids on Planet B stay on Server B
