---
category: Features
order: 1.4
description: Securing network traffic between controller and torch servers
---

# Network Encryption

Network encryption allows you to secure communication between the Nexus Controller and torch servers using **AES-256 CBC encryption**. This feature is optional and can be enabled at any time.

## Overview

Nexus uses GUID-based encryption keys to protect all network traffic between the controller and connected torch servers. When enabled, every message is transparently encrypted before transmission and decrypted upon receipt.

### When to Enable Encryption

**Enable encryption if:**
- ✅ Running in a production environment
- ✅ Servers are on untrusted or public networks
- ✅ Your organization has compliance requirements for encrypted traffic
- ✅ Controller and servers communicate across the internet (WAN)

**Encryption not necessary if:**
- ❌ All servers are on your private LAN
- ❌ You're in a development/testing environment
- ❌ Performance is critical and security is not a concern

## Quick Start

The fastest way to enable encryption:

1. **Controller Settings** → **Network Configs**
2. Check **"Enable Network Encryption"**
3. Click **"Generate New Key"** button
4. **Copy** the generated GUID
5. On each torch server, check **"Enable Network Encryption"**
6. **Paste** the same GUID in the **"Network Encryption Key"** field
7. **Restart** controller and all torch servers

## Detailed Setup Guide

### Step 1: Enable on Controller

**Location:** Controller UI → Settings → Network Configs

1. Find the "Network Configs" section
2. Locate the "Enable Network Encryption" checkbox
3. Check the box to enable
4. Click the **"Generate New Key"** button
   - This creates a random GUID encryption key
   - The key automatically populates in the "Network Encryption Key" field
5. **Copy this GUID** - you'll need it for all torch servers

**Example Key:**
```
c7a2f5d8-1e9c-4b3a-9f2d-8e7c3a1b5f2d
```

### Step 2: Configure Torch Servers

**Location:** Torch Server Plugin UI → Network Configs section

For **each torch server** connecting to this controller:

1. Open the torch server's Nexus Global plugin panel
2. Locate the "Enable Network Encryption" checkbox
3. Check the box to enable
4. Find the "Network Encryption Key" field
5. **Paste the EXACT same GUID** you copied from the controller
6. Verify the key matches character-for-character

### Step 3: Restart Services

1. Restart the Nexus Controller
2. Restart **all** torch servers
3. Check controller and torch logs for "Network encryption initialized" messages

**Example log entry:**
```
[INFO] Network encryption initialized on controller
[INFO] Network encryption enabled for publisher
[INFO] Network encryption enabled for subscriber
```

## Important Requirements

### Key Matching

{% include warning.html content="All connected torch servers MUST use the EXACT SAME encryption key for successful communication. If keys don't match, servers will fail to communicate and you'll see decryption errors in logs." %}

**Consequences of mismatched keys:**
- ❌ Server fails to receive controller messages
- ❌ Server fails to send data to controller
- ❌ Decryption errors logged to console
- ❌ No synchronization between servers

### Changing the Key

If you need to change the encryption key:

1. On the controller, generate a new key or set a new one manually
2. Update **all** torch servers with the new key
3. Restart controller and all torch servers in sequence
4. Verify logs show encryption re-initialized

### Disabling Encryption

To disable encryption:

1. On the controller: Uncheck "Enable Network Encryption"
2. On all torch servers: Uncheck "Enable Network Encryption"
3. Restart controller and all torch servers
4. System will operate without encryption (no performance overhead)

## How Encryption Works

### Encryption Algorithm

- **Algorithm:** AES-256 CBC (Cipher Block Chaining)
- **Key Size:** 256-bit (derived from GUID)
- **IV:** Random, prepended to each encrypted message
- **Padding:** PKCS7

### Message Flow (Encrypted)

**Publishing (Encrypt):**
```
Message Created
    ↓
Serialized to bytes
    ↓
Key parsed from GUID
    ↓
AES-256 encryption applied
    ↓
IV prepended to ciphertext
    ↓
Transmitted over network
```

**Receiving (Decrypt):**
```
Encrypted message received
    ↓
Extract IV from message
    ↓
Retrieve encryption key
    ↓
AES-256 decryption applied
    ↓
Deserialize decrypted bytes
    ↓
Message processed
```

### Transparency

Encryption is completely transparent to plugins and sync systems:
- ✅ No code changes needed
- ✅ No plugin configuration required
- ✅ Works with all Nexus features (syncing, transfers, chat, etc.)
- ✅ Players see no difference

## Troubleshooting

### "Failed to decrypt message" Error

**Cause:** Encryption key mismatch between controller and server

**Solution:**
1. Verify the key on controller (Settings → Network Configs)
2. Compare with key on each torch server
3. Ensure keys match exactly (copy/paste if needed)
4. Restart services and retry

### Server Won't Connect

**Possible causes:**
- Encryption enabled on controller but disabled on server
- Encryption disabled on controller but enabled on server
- Keys don't match between controller and server

**Solution:**
- Check that encryption is enabled/disabled identically on all services
- Verify all keys match exactly
- Check logs for encryption-related errors
- Restart all services after fixing configuration

### Performance Degradation

**Encryption overhead is minimal** (typically <1-2% for typical message volumes). If you notice performance issues:

1. Check if other factors are causing slowdown (network bandwidth, CPU)
2. Monitor with debug mode enabled to see message throughput
3. If encryption is not required, disable it: Uncheck on controller and all servers

### Keys Don't Match After Restart

**Solution:**
1. On controller: Click "Generate New Key" to create a fresh key
2. Copy the new key
3. Update all torch servers with the new key
4. Restart all services

## Best Practices

- 🔐 **Regenerate keys periodically** - Generate a new key every few months for maximum security
- 📝 **Document your key** - Keep a secure record of your encryption key
- 🔒 **Protect the key** - Treat the encryption key like a password; don't share in chat or unencrypted logs
- ✅ **Verify after enabling** - Always check logs for "Network encryption initialized" on all services
- 🔄 **Update all servers at once** - Enable/disable encryption simultaneously on controller and all servers to avoid connectivity issues

## Related Documentation

- [Torch Plugin Configs](torch-configs) - Plugin configuration reference
- [World Setup](world-setup) - Server and cluster configuration
- [Installing Controller](installing-controller) - Controller setup guide
