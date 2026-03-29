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

On initialization, the API also provides raw Nexus region data including all clusters, servers, and sectors. This data can be used to understand the network topology from within your mod:

- **Clusters** — All configured clusters and their properties
- **Servers** — All registered servers and their configurations
- **Sectors** — All sector definitions (shapes, positions, assignments)
- **Current Server ID** — The ID of the server your mod is running on
- **Current Cluster ID** — The ID of the cluster the current server belongs to

## Edge Cases
Please note that Nexus cannot guarantee that messages are received on target servers. If the server has crashed, frozen, or is otherwise unreachable, your message could be lost in transit.