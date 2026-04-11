---
category: API
order: 10
category_default: true
description: API Reference
---


# ModAPI Documentation

Nexus has a built in API specific for Space Engineers mods. Currently only server-side mods have access to this specific API. Meaning any data you need to send to clients will have to be developed by you.

You can find the latest API [here](https://github.com/SE-Nexus/NexusScripts/blob/master/ModAPI/NexusAPI.cs)

For those who have used TextHudAPI you should find that the API is now of a similar setup. Just register to listen for that nexus sync mod message on server start to get all relevant data and passed method delegates.

Just add this file into your mod and then follow the examples below!

## Getting Started

Simple API setup:
```cs
// Simple access and server online check
NexusAPI myNexusAPI = new NexusAPI();

// Check to see when Nexus is enabled
bool isEnabled = myNexusAPI.Enabled;

// Check the current server ID
byte currentServer = myNexusAPI.CurrentServerID;

// Check if a specific server is online
bool serverAOnline = myNexusAPI.IsServerOnline(currentServer);
```

## Available API Methods

The following methods are exposed through the Nexus ModAPI:

### `IsPlayerOnline(ulong steamId)` → `bool`
Checks if a specific player is online anywhere across the entire Nexus network, not just the current server.

```cs
bool isOnline = myNexusAPI.IsPlayerOnline(76561198012345678);
```

### `IsServerOnline(byte serverID)` → `bool`
Checks whether the target Nexus server is online and in a `Running` state.

```cs
bool online = myNexusAPI.IsServerOnline(3);
```

### `GetTargetServer(Vector3D position)` → `byte`
Returns the server ID that owns the sector containing the given world position. Returns `0` if no sector contains the position.

```cs
byte serverId = myNexusAPI.GetTargetServer(new Vector3D(10000, 0, 50000));
```

### `GetTargetSector(Vector3D position)` → `int`
Returns the sector ID of the smallest sector containing the given world position. Returns `0` if no sector contains the position.

```cs
int sectorId = myNexusAPI.GetTargetSector(myPosition);
```

### `GetAllOnlineServers()` → `List<byte>`
Returns a list of server IDs for all currently online Nexus servers.

```cs
List<byte> onlineServers = myNexusAPI.GetAllOnlineServers();
```

### `GetAllOnlinePlayers()` → `List<ulong>`
Returns a list of Steam IDs for all players currently online across the entire Nexus network.

```cs
List<ulong> allPlayers = myNexusAPI.GetAllOnlinePlayers();
```

### `SendModMsgToServer(byte[] data, long modChannelID, byte targetServer)` → `bool`
Sends a custom byte array message to a specific Nexus server. The message will be delivered to any mod listening on the specified `modChannelID`. Returns `false` if the target server ID is invalid.

```cs
byte[] myData = MyAPIGateway.Utilities.SerializeToBinary(myObject);
long myModID = 123456;
myNexusAPI.SendModMsgToServer(myData, myModID, 3);
```

### `SendModMsgToAllServers(byte[] data, long modChannelID)` → `bool`
Sends a custom byte array message to **all** online Nexus servers. The message will be delivered to any mod listening on the specified `modChannelID`.

```cs
byte[] myData = MyAPIGateway.Utilities.SerializeToBinary(myObject);
long myModID = 123456;
myNexusAPI.SendModMsgToAllServers(myData, myModID);
```

### `SendChatToDiscord(string message, ulong discordChannelID, bool isEmbed, string embedTitle, string embedFooter)`
Sends a message directly to a Discord channel through the Nexus controller's Discord bot. Supports both plain text and embed messages.

```cs
// Send a plain text message
myNexusAPI.SendChatToDiscord("Server event started!", discordChannelId, false, "", "");

// Send an embed message
myNexusAPI.SendChatToDiscord("A rare ore deposit has been discovered!", discordChannelId, true, "World Event", "Nexus Events");
```

### `RemoteSpawnPadActivation(ulong steamId, byte targetServerID, string scriptName, string prefabName, string customData)` → `bool`
Programmatically triggers a spawn pad activation for a player. This sends the player to the target server and executes the specified spawn script with an optional prefab and custom data. Useful for mods that want to implement custom transportation or spawning logic.

```cs
myNexusAPI.RemoteSpawnPadActivation(playerSteamId, 2, "MySpawnScript", "MyPrefab", "custom=data");
```

## Receiving Messages

To receive cross-server mod messages, register a message handler using your custom mod channel ID:

```cs
public void StartNexusNetworking()
{
	NexusAPI myNexusAPI = new NexusAPI();
	long myModID = 123456; // Your custom nexus mod message ID

	MyAPIGateway.Utilities.RegisterMessageHandler(myModID, MessageHandler);
}

private void MessageHandler(object obj)
{
	// Data incoming to this mod from another server
	ModAPIMsg incomingMsg = MyAPIGateway.Utilities.SerializeFromBinary<ModAPIMsg>((byte[])obj);

	// ModAPIMsg contains nexus metadata about the message
	byte fromServer = incomingMsg.fromServerID;
	byte toServer = incomingMsg.toServerID;

	// Your custom data payload - deserialize into your own type
	byte[] myModCustomData = incomingMsg.msgData;
	MyCustomType data = MyAPIGateway.Utilities.SerializeFromBinary<MyCustomType>(myModCustomData);

	// Implement your mod-specific logic here
}
```

## Region Data

On initialization, the API also provides raw Nexus region data including all clusters, servers, sectors, and gates. This data can be used to understand the network topology from within your mod. Below is a complete reference to the `ServerDataMsgAPI` data structure:

### ServerDataMsgAPI

The main data container that holds all region configuration information.

| Field | Proto# | Type | Description |
|---|---|---|---|
| `clusters` | 10 | `List<ClusterData>` | All clusters in the region |
| `servers` | 20 | `List<ServerData>` | All servers in the region |
| `sectors` | 30 | `List<SectorData>` | All sectors in the region |
| `thisServerID` | 40 | `byte` | The ID of the current server |
| `thisClusterID` | 50 | `byte` | The ID of the cluster this server belongs to |
| `gates` | 60 | `List<GateData>` | All gates available on the outbound server |

### GateData

Configuration data for a gate portal.

| Field | Proto# | Type | Description |
|---|---|---|---|
| `Name` | 5 | `string` | Display name of the gate |
| `isEnabled` | 10 | `bool` | Whether the gate is active |
| `GateScript` | 15 | `string` | Name of the script to invoke for this gate |
| `OneWay` | 20 | `bool` | If true, only Gate1→Gate2 transfer is allowed |
| `Description1` | 30 | `string` | Description for gate position 1 |
| `Description2` | 35 | `string` | Description for gate position 2 |
| `Gate1ServerID` | 40 | `byte` | Server ID hosting gate position 1 |
| `Gate2ServerID` | 45 | `byte` | Server ID hosting gate position 2 |
| `VP1x`, `VP1y`, `VP1z` | 50, 55, 60 | `double` | World position coordinates for gate 1 |
| `VP2x`, `VP2y`, `VP2z` | 65, 70, 75 | `double` | World position coordinates for gate 2 |
| `VD1x`, `VD1y`, `VD1z` | 80, 85, 90 | `double` | Direction vector for gate 1 |
| `VD2x`, `VD2y`, `VD2z` | 95, 100, 105 | `double` | Direction vector for gate 2 |
| `DetectionRadius1` | 110 | `double` | Detection radius in meters for gate 1 |
| `DetectionRadius2` | 115 | `double` | Detection radius in meters for gate 2 |
| `ParticleEffect1` | 120 | `string` | Particle effect name for gate 1 |
| `ParticleEffect2` | 125 | `string` | Particle effect name for gate 2 |
| `GateSpawnDistance` | 150 | `double` | Distance from gate center to spawn incoming grids |

### ClusterData

Configuration data for a cluster.

| Field | Proto# | Type | Description |
|---|---|---|---|
| `ClusterID` | 10 | `byte` | Unique identifier for this cluster |
| `ClusterName` | 20 | `string` | Display name of the cluster |
| `X`, `Y`, `Z` | 30, 35, 40 | `long` | Center coordinates of the cluster |
| `ClusterSize` | 50 | `long` | Size of the cluster in meters |

### ServerData

Configuration data for a server.

| Field | Proto# | Type | Description |
|---|---|---|---|
| `ServerID` | 10 | `byte` | Unique identifier for this server |
| `ServerName` | 20 | `string` | Display name of the server |
| `ClusterID` | 30 | `byte` | ID of the cluster this server belongs to |

### SectorData

Configuration data for a sector (subdivision of space).

| Field | Proto# | Type | Description |
|---|---|---|---|
| `SectorID` | 10 | `int` | Unique identifier for this sector |
| `SectorName` | 20 | `string` | Display name of the sector |
| `OnServerID` | 30 | `byte` | Server ID that manages this sector |
| `X`, `Y`, `Z` | 40, 50, 60 | `long` | Center coordinates of the sector |
| `SectorSize` | 70 | `long` | Size of the sector in meters |

## Edge Cases
Please note that Nexus cannot guarantee that messages are received on target servers. If the server has crashed, frozen, or is otherwise unreachable, your message could be lost in transit.