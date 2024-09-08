---
category: API
order: 10
category_default: true
description: API Reference
---


# ModAPI Documentation

Nexus has a build in API specific for space engineers mods. Currently only server side mods have access to this specific API. Meaning any data you need to send to clients will have to be developed by you.

You can find the latest API below:
https://github.com/SE-Nexus/NexusScripts/blob/master/ModAPI/NexusAPI.cs

For those who have used TextHudAPI you should find that the API is now of a similar setup. Just register to listen for that nexus sync mod message on server start to get all relevant data and passed method delegates.

Just add this file into your mod and then follow the examples below!

## Eample Use:

Simple API setup
```cs

//Simple access and server online check
NexusAPI myNexusAPI = new NexusAPI()

//Check to see when its enabled
bool isEnabled = myNexusAPI.Enabled;
bool ServerAOnline = myNexusAPI.IsServerOnline(myNexusAPI.CurrentServerID);

```

Registering server -> server mod messaging
```cs
public void StartNexusNetworking()
{
	NexusAPI myNexusAPI = new NexusAPI()
	long MyModID = 123456; //Your custom nexusModMsgID

	MyAPIGateway.Utilities.RegisterMessageHandler(MyModID, MessageHandler);

	//Example custom byte array
	byte[] myModCustomData = MyAPIGateway.Utilities.SerializeFromBinary<T>(myModCustomData);



	/* Example send custom mod msg */
	//Send a custom message to a specific server
	myNexusAPI.SendModMsgToServer(myModCustomData, MyModID, 3);

	//Send a custom message to ALL ONLINE servers
	myNexusAPI.SendModMsgToAllServers(myModCustomData, MyModID);
}


//Action is called on both SendModMsgToServer and SendModMsgToAllServers
private void ReceiveData(object obj)
{

	//Data incoming to this mod from other server
	ModAPIMsg incomingMsg = MyAPIGateway.Utilities.SerializeFromBinary<ModAPIMsg>((byte[])data);

	//ModAPIMsg has various nexus information concerning the msg you recieved. You can do further checks for stuff if need be like below:
	if(incomingMsg.fromServerID == 2)
		return;


	//myModCustomData is what your mod sent. You will have to deserialize it yourself into your custom type etc.
	byte[] myModCustomData = incomingMsg.msgData;
	object myCustomTypeData = MyAPIGateway.Utilities.SerializeFromBinary<T>(myModCustomData);

	//implement further mod specific logic here
}

```

## Edge Cases
Please note that Nexus cannot gurantee that messages are recieved on target servers. If the server has crashed, frozen etc your message could be lost on transit.