---
category: API
order: 11
description: Scripting API Reference
---

# Scripting API Reference

Nexus scripts are C# classes that extend the `ScriptAPI` base class. Each script is compiled at runtime by the controller using Roslyn and distributed to all connected servers. Scripts allow you to hook into various Nexus events to customize behavior without modifying the plugin itself.

For general script setup instructions (adding scripts, prefabs, refreshing), see the [Script Setup](script-setup) page.

Example scripts are available on the [Nexus GitHub](https://github.com/SE-Nexus/NexusScripts).

## Creating a Script

Every Nexus script must inherit from `ScriptAPI`. Override only the methods you need:

```cs
public class MyCustomScript : ScriptAPI
{
    public override bool InboundGate(MyCubeGrid BiggestGrid, List<MyCubeGrid> AllGrids, GateAPI Gate, List<long> allPlayers, ref Vector3D gridSpawnPos, ref byte targetServer)
    {
        // Your custom gate logic here
        return true; // Return false to deny the transfer
    }
}
```

Save your script as a `.cs` or `.txt` file in the controller's Scripts directory and refresh.

## Script Events

The following table lists all available script events. The **Script Type** column shows how the event is categorized in the controller's script list.

| Event Method | Script Type | Description |
|---|---|---|
| `DiscordLink` | DiscordLink | Called on the `!d link` command |
| `InboundGate` | InboundGate | Called after a grid enters a gate and spawns on the destination server |
| `OutboundGate` | OutboundGate | Called on the origin server when a grid exits through a gate |
| `OutboundSpawnpad` | OutboundSpawnpad | Called on the origin server when a spawn pad is activated |
| `NexusButtonAction` | NexusButtonAction | Called when a player presses a scripted NPC button |
| `InboundSpawnPad_Pre` | InboundSpawnPad_Pre | Called on the destination server before the spawn pad processes |
| `InboundSpawnPad_Post` | InboundSpawnPad_Post | Called on the destination server after the spawn completes |
| `CanGridsSwitchSector` | CanGridsSwitchSector | Called when a grid is about to fly across a sector boundary |
| `CanGridsJumpSector` | CanGridsJumpSector | Called when a grid is about to jump drive across a sector boundary |
| `OnPlayerJoin` | OnPlayerJoin | Called when a player joins the server |
| `OnPlayerLeft` | OnPlayerLeft | Called when a player leaves the server |

## Event Method Signatures

### `DiscordLink`
```cs
public virtual bool DiscordLink(ulong steamID, ulong discordID)
```
Called when a player runs the `!d link` command. Return `true` to allow the link, `false` to deny it.

**Parameters:**
- `steamID` — The player's Steam ID
- `discordID` — The player's Discord ID

---

### `InboundGate`
```cs
public virtual bool InboundGate(
    MyCubeGrid BiggestGrid,
    List<MyCubeGrid> AllGrids,
    GateAPI Gate,
    List<long> allPlayers,
    ref Vector3D gridSpawnPos,
    ref byte targetServer)
```
Called on the destination server after a grid spawns through a gate. You can modify the spawn position and target server. Return `false` to deny the transfer.

**Parameters:**
- `BiggestGrid` — The largest grid in the transfer group
- `AllGrids` — All grids being transferred
- `Gate` — The gate configuration object
- `allPlayers` — Identity IDs of all players on the grids
- `gridSpawnPos` *(ref)* — The spawn position; modify to change where the grid appears
- `targetServer` *(ref)* — The destination server ID; set to `0` to use the default

---

### `OutboundGate`
```cs
public virtual void OutboundGate(IEnumerable<MyCubeGrid> grids, GateAPI fromGate)
```
Called on the origin server when grids are exiting through a gate. Use this for logging, broadcasting messages, or applying effects before departure.

**Parameters:**
- `grids` — The grids being sent through the gate
- `fromGate` — The gate the grids are leaving from

---

### `OutboundSpawnpad`
```cs
public virtual bool OutboundSpawnpad(ScriptSpawnMessage spawnReqMsg)
```
Called on the origin server when a spawn pad is activated. Return `false` to deny the spawn request.

**Parameters:**
- `spawnReqMsg` — The spawn request message containing player info, prefab name, script name, target server, and custom data

---

### `NexusButtonAction`
```cs
public virtual void NexusButtonAction(MyButtonPanel buttonPanel, ulong SteamID, long PlayerID)
```
Called when a player presses a button on an NPC-built button panel that has a script name configured in its custom data.

**Parameters:**
- `buttonPanel` — The button panel block
- `SteamID` — The pressing player's Steam ID
- `PlayerID` — The pressing player's Identity ID

{% include warning.html content="Button events only fire for buttons built by NPCs. Players cannot create scripted buttons unless another mod/plugin assigns an NPC built-by identity." %}

---

### `InboundSpawnPad_Pre`
```cs
public virtual async Task InboundSpawnPad_Pre(ScriptSpawnMessage spawnReqMsg)
```
Called on the destination server **before** the spawn pad processes the request. Use this to modify the spawn message, adjust positions, or perform pre-spawn setup.

**Parameters:**
- `spawnReqMsg` — The spawn request message

---

### `InboundSpawnPad_Post`
```cs
public virtual async Task InboundSpawnPad_Post(HashSet<MyCubeGrid> spawnedGrids)
```
Called on the destination server **after** the spawn has completed. Use this to modify spawned grids, randomize loot, apply damage, or trigger events.

**Parameters:**
- `spawnedGrids` — The set of grids that were spawned

---

### `CanGridsSwitchSector`
```cs
public virtual bool CanGridsSwitchSector(
    SectorAPI fromSector,
    SectorAPI toSector,
    List<MyCubeGrid> grids,
    List<ulong> players)
```
Called when grids are about to fly or be pushed across a sector boundary. Return `false` to deny the transfer and push grids back.

**Parameters:**
- `fromSector` — The sector the grids are leaving
- `toSector` — The sector the grids are entering
- `grids` — The grids being transferred
- `players` — Steam IDs of players on the grids

---

### `CanGridsJumpSector`
```cs
public virtual (bool, string) CanGridsJumpSector(
    SectorAPI fromSector,
    SectorAPI toSector,
    Vector3D jumpTarget,
    long playerIDjumper,
    MyCubeGrid mainGrid)
```
Called when a grid attempts a jump drive across a sector boundary. Return `(false, "reason")` to deny the jump with a message to the player.

**Parameters:**
- `fromSector` — The sector the grid is jumping from
- `toSector` — The sector the grid is jumping to
- `jumpTarget` — The world position of the jump destination
- `playerIDjumper` — The identity ID of the player initiating the jump
- `mainGrid` — The main grid performing the jump

---

### `OnPlayerJoin`
```cs
public virtual void OnPlayerJoin(ulong steamID, string playername)
```
Called when a player joins the server.

**Parameters:**
- `steamID` — The player's Steam ID
- `playername` — The player's display name

---

### `OnPlayerLeft`
```cs
public virtual void OnPlayerLeft(ulong steamID, string playername)
```
Called when a player leaves the server.

**Parameters:**
- `steamID` — The player's Steam ID
- `playername` — The player's display name

## Tips

- Scripts have access to the full Nexus API and game assemblies. You can reference `NexusAPI` and `NGPlugin` namespaces.
- Keep scripts focused on a single purpose. You can have multiple scripts active simultaneously.
- Scripts are hot-reloadable. Use the **Force Update To Cluster** button in the controller to push changes without restarting servers.
- Test scripts on a **Start-Synced & Non-Sectored** server type to avoid impacting your live environment.
