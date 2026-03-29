---
category: Features
order: 5.5
description: Cross-cluster communication via Laser Antenna broadcasting
---

# Laser Antenna Broadcaster

The Laser Antenna Broadcaster feature allows players to send messages across your entire Nexus cluster using Space Engineers Laser Antennas. This enables cluster-wide announcements, faction communications, and emergency broadcasts.

{% include important.html content="This feature requires Laser Antennas to be placed on grids. Players can only broadcast to servers where they have valid antenna ownership and target access." %}

## How It Works

### Broadcasting to Everyone

When enabled, Laser Antennas can select "Everyone" as a broadcast target:

1. **Player setup** — Place a Laser Antenna on their grid
2. **Antenna configuration** — Set broadcast target to "Everyone"
3. **Message transmission** — Type message and transmit
4. **Cluster relay** — Message is sent to all Nexus antennas on other servers
5. **Delivery** — Receiving players see the message with server prefix (if enabled)

### Default Broadcast Modes (Always Available)

Even with "Everyone" broadcast disabled, players can still use:
- **Faction broadcasts** — Send to all faction members across servers
- **Specific target broadcasts** — Send to targeted antenna coordinates
- **Local broadcasts** — Send to players on the same server

### Message Format

Broadcast messages include sender information:

```
[SERVER_NAME] Player_Name: Your broadcast message here
```

If server abbreviations are enabled, the format becomes:

```
[ABBR] Player_Name: Your broadcast message here
```

---

## Configuration

### Enable/Disable Everyone Broadcasts

**In `torch.cfg` (Nexus Plugin Settings):**

```yaml
# Allow "Everyone" broadcasts (default)
EnableChatBroadcasterChannelEveryone: true

# Disable "Everyone" broadcasts
EnableChatBroadcasterChannelEveryone: false
```

**Effect of Settings:**

| Setting | "Everyone" Target | Faction Broadcasts | Specific Target Broadcasts |
|---|---|---|---|
| **true (Enabled)** | ✅ Available | ✅ Available | ✅ Available |
| **false (Disabled)** | ❌ Blocked | ✅ Available | ✅ Available |

### Server Abbreviations

Enable or disable server name prefixes in broadcast messages:

**In `torch.cfg`:**

```yaml
# Show server prefix in broadcasts
EnableServerAbbreviations: true

# Hide server prefix (no prefix added)
EnableServerAbbreviations: false
```

**Message Examples:**

With abbreviations enabled:
```
[PLANET_A] PlayerName: Emergency, need rescue!
```

Without abbreviations:
```
PlayerName: Emergency, need rescue!
```

---

## Use Cases

### When to Enable ("Everyone" Broadcasts)

✅ **Public servers** — Allow community-wide announcements and events  
✅ **Faction PvP** — Enable cluster-wide faction communications  
✅ **Multiplayer campaigns** — Coordinate players across sectors  
✅ **Emergency systems** — Alert all players to critical events  

### When to Disable ("Everyone" Broadcasts)

❌ **Prevent spam** — Restrict who can broadcast to everyone  
❌ **Roleplay servers** — Force in-character faction communications  
❌ **Performance concerns** — Reduce message relay load  
❌ **Enforce isolation** — Keep servers/sectors separate from each other  

---

## Broadcast Scenarios

### Scenario 1: Public Announcement (Everyone Enabled)

1. Admin on Server A has Laser Antenna
2. Sets broadcast target to "Everyone"
3. Sends: "Server maintenance in 5 minutes"
4. **Result:** All players on all servers receive the message with `[SERVER_A]` prefix

### Scenario 2: Faction Communication (Any Setting)

1. Player on Server B in "BLUE" faction
2. Sets broadcast target to their faction
3. Sends: "Gathering at coordinates X, Y, Z"
4. **Result:** Only BLUE faction members on all servers receive it

### Scenario 3: Emergency Alert (Everyone Disabled)

1. Laser Antenna broadcasting to "Everyone" is disabled
2. Player attempts to broadcast to "Everyone"
3. **Result:** Transmission fails; antenna reports error; player must use faction or specific target instead

---

## Technical Details

### Antenna Requirements

- Laser Antenna must be placed on a functional grid
- Player must have ownership/access to the antenna
- Grid must be powered for antenna to function
- Receiving antennas must also be powered and accessible

### Cross-Server Relay

When a player broadcasts on Server A:

1. Local antenna on Server A sends message
2. Nexus plugin intercepts transmission
3. If broadcast target is "Everyone":
   - Message is relayed to all connected servers
   - Each server delivers to local antennas
   - Antennas on other servers relay to players
4. If broadcast target is faction/specific:
   - Message is sent only to matching targets (faction/coordinates)
   - Works the same across servers

### Performance Considerations

- Enabling "Everyone" broadcasts increases network traffic
- Each message is transmitted to all connected servers
- Consider disabling on large clusters with heavy antenna usage
- Monitor server logs if experiencing performance issues

---

## Troubleshooting

### "Everyone" Broadcast Not Working

**Symptom:** Antenna won't let you select "Everyone" as broadcast target

**Cause:** `EnableChatBroadcasterChannelEveryone` is disabled in `torch.cfg`

**Solution:**
1. Edit server's `torch.cfg`
2. Set `EnableChatBroadcasterChannelEveryone: true`
3. Restart torch server
4. Retry antenna broadcast

### Messages Not Reaching Other Servers

**Symptom:** Antenna sends locally but other servers don't receive

**Causes:**
- Receiving server has antennas unpowered
- Server connection to controller is offline
- Player doesn't have access/visibility on receiving server

**Solution:**
1. Verify all servers are connected to controller
2. Check receiving antennas are powered
3. Verify player faction/target settings
4. Check server logs for connection errors

### Server Prefixes Not Showing

**Symptom:** Broadcast messages don't show `[SERVER_NAME]` prefix

**Cause:** `EnableServerAbbreviations` is disabled

**Solution:**
1. Edit server's `torch.cfg`
2. Set `EnableServerAbbreviations: true`
3. Restart torch server
4. Send new broadcast to see prefix

---

## Related Features

- **Chat Sync** — Player-to-player global chat (separate from antenna broadcasts)
- **Faction Broadcasts** — Faction-only communication (always available)
- **Server Abbreviations** — Display server prefix in all cross-server messages
- **Action Relay Sync** — Synchronize antenna relay block events across servers

See [Torch Configs](torch-configs) for configuration details.
