---
category: Features
order: 5.6
description: Configuring Nexus warps for fast travel
---

# Nexus Warps

Warps are fast-travel points that allow players to quickly teleport to predefined locations across your Nexus network. Unlike gates which require physical proximity to activate, warps are command-based teleportation points that can be accessed from anywhere on a server.

## Warp Features

Warps provide a convenient method for player transportation with the following capabilities:

- **Named Locations**: Create custom-named warp points for easy player identification
- **Cross-Server Travel**: Teleport players between different servers in your network
- **Command-Based Access**: Players use simple chat commands to warp to destinations
- **Permission System**: Control which players can access specific warps
- **Cooldown Control**: Set cooldown timers between warp uses to prevent abuse
- **Public/Private Warps**: Configure warps as public (available to all) or private (restricted access)

## Creating Warps

To create a new warp, navigate to the Warps section in the Nexus Controller and click the "New Warp" button.

Each warp requires the following configuration:

### Basic Settings

- **Warp Name**: A descriptive name for the warp point (e.g., "Main Base", "Trading Hub")
- **Description**: Optional description explaining where or what the warp point is
- **Server ID**: The destination server where players will be teleported
- **Position (X, Y, Z)**: The exact coordinates where players will spawn

### Access Control

{% include warning.html content="The Public and Permission-based access control features are currently a work-in-progress and may not function as intended. Currently, all warps are available to all players regardless of these settings." %}

- **Enabled**: Toggle the warp on/off without deleting it
- **Public**: Make the warp available to all players on the server *(WIP)*
- **Requires Permission**: Restrict access to players with a specific permission tag *(WIP)*
- **Permission Tag**: The permission identifier for restricted warps *(WIP)*

### Performance Settings

- **Cooldown (seconds)**: Number of seconds players must wait between warp uses (set to 0 for no cooldown)

## Using Warps

Players can access warps through in-game chat commands:

```
!warp list          - Shows all available warps
!warp <name>        - Teleports to the specified warp
!warp nearestsector - Shows the nearest sector (if applicable)
```

## Warp vs Gates

| Feature | Warp | Gate |
|---------|------|------|
| **Activation** | Chat command | Physical proximity |
| **Cost/Requirement** | Permission-based | Detection radius proximity |
| **Setup** | Simple position coordinates | Position, direction, radius |
| **Customization** | Names, cooldowns, permissions | Scripts, particle effects |
| **Use Case** | Player convenience, fast travel | Scripted events, automatic transit |

## Best Practices

- **Naming Convention**: Use clear, descriptive names for easy player identification
- **Strategic Placement**: Place warps at key locations like trading hubs, faction bases, or common gathering points
- **Cooldown Balancing**: Set appropriate cooldowns to prevent warp spam while keeping travel convenient
- **Permission Management**: Use permission tags to restrict access to faction-specific or VIP warps as needed
- **Server Organization**: Group related warps by server to help players navigate your network

## Syncing Warps to Servers

After creating or modifying warps in the controller, click the "Sync to Servers" button to update all connected servers with the new warp configuration.

{% include note.html content="Warp changes take effect immediately without requiring a server restart." %}

## Troubleshooting

**Players can't see warps:**
- Ensure the warp is set to Enabled
- Check that the warp is marked as Public, or the player has the required permission tag
- Verify the cooldown timer has expired since their last use

**Warps not working after creation:**
- Click "Sync to Servers" to push the new warp configuration to all connected servers
- Check server logs for any warp initialization errors

**Players spawning in wrong location:**
- Verify the destination server ID is correct
- Double-check the Position (X, Y, Z) coordinates are in the correct format
