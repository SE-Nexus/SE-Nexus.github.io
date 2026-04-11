---
category: API
order: 12
description: Creating Controller Plugins
---

# Controller Plugins

The Nexus Controller supports extending functionality through plugins. Plugins are .NET assemblies that inherit from `ControllerPluginAPI` and can integrate custom services, UI components, and logic into the controller application.

## Overview

Controller plugins are loaded at startup and can:
- Provide custom services and business logic
- Add UI components to the controller
- Interact with the Nexus network and databases
- Hook into the controller's dependency injection system

Plugins can be distributed as either:
- **Folder Plugins** — A directory containing DLLs and a `manifest.xml`
- **Zip Plugins** — A `.zip` file containing DLLs and a `manifest.xml`

## Getting Started

### Prerequisites

- .NET 8 SDK or later
- Visual Studio or similar C# IDE
- Reference to the Nexus NuGet packages (or build from source)

### Creating a Plugin Project

1. **Create a new Class Library project** targeting `.NET 8`:

```xml
<Project Sdk="Microsoft.NET.Sdk.WindowsDesktop">
  <PropertyGroup>
    <TargetFramework>net8.0-windows</TargetFramework>
    <UseWPF>true</UseWPF>
  </PropertyGroup>

  <ItemGroup>
    <!-- Reference the NGController project or NuGet packages -->
    <ProjectReference Include="path/to/NGController/NGController.csproj" />
  </ItemGroup>
</Project>
```

2. **Create a plugin class** that inherits from `ControllerPluginAPI`:

```csharp
using NGController.PluginAPI;
using System;
using System.Windows.Controls;

namespace MyPlugin
{
    public class MyControllerPlugin : ControllerPluginAPI
    {
        public override Version PluginVersion => new Version(1, 0, 0);

        public override UserControl UserControl => new MyPluginUserControl();

        public override async Task StartService()
        {
            // Initialize your plugin here
            await base.StartService();
        }

        public override async Task StopService()
        {
            // Cleanup when the controller shuts down
            await base.StopService();
        }

        public override void StartNetworking()
        {
            // Set up networking if needed
            base.StartNetworking();
        }
    }
}
```

3. **Create a manifest file** at the root of your plugin folder:

```xml
<?xml version="1.0"?>
<ControllerPluginManifest xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <PluginName>My Plugin</PluginName>
  <PluginVersion>1.0.0</PluginVersion>
  <MinControllerVersion>3.0.0</MinControllerVersion>
  <MaxControllerVersion>9.9.9</MaxControllerVersion>
  <PluginGUID>12345678-1234-1234-1234-123456789012</PluginGUID>
  <IsBeta>false</IsBeta>
  <Author>Your Name</Author>
  <Description>A description of what your plugin does</Description>
  <AuthorURL>https://example.com</AuthorURL>
  <PluginURL>https://github.com/your-repo</PluginURL>
</ControllerPluginManifest>
```

## Plugin Structure

### ControllerPluginAPI

The base class all plugins must inherit from. It extends `ControllerServiceAPI` and provides the core plugin functionality.

**Key Properties:**

| Property | Type | Description |
|---|---|---|
| `PluginVersion` | `Version` | The version of your plugin |
| `UserControl` | `UserControl` | Optional WPF control for your plugin's UI |

**Key Methods:**

| Method | Description |
|---|---|
| `StartService()` | Called when the controller starts. Use for initialization. |
| `StopService()` | Called when the controller shuts down. Use for cleanup. |
| `StartNetworking()` | Called to set up any network listeners or subscriptions. |

### Manifest File

The `manifest.xml` file describes your plugin. Required fields:

| Field | Type | Description |
|---|---|---|
| `PluginName` | `string` | Display name of your plugin |
| `PluginVersion` | `Version` | Current version (format: `Major.Minor.Patch`) |
| `MinControllerVersion` | `Version` | Minimum controller version required |
| `MaxControllerVersion` | `Version` | Maximum controller version supported |
| `PluginGUID` | `Guid` | Unique identifier for your plugin |
| `IsBeta` | `bool` | Whether this is a beta release |
| `Author` | `string` | Plugin author name |
| `Description` | `string` | Plugin description |
| `AuthorURL` | `string` | Author's website |
| `PluginURL` | `string` | Plugin repository or download page |

## Installation

### Folder Plugin

1. Create a folder in the controller's `Plugins` directory (e.g., `Plugins/MyPlugin`)
2. Copy your plugin's DLLs into that folder
3. Add a `manifest.xml` to the folder root
4. Restart the controller

Example structure:

```
Plugins/
└── MyPlugin/
    ├── manifest.xml
    ├── MyPlugin.dll
    └── MyPlugin.pdb
```

### Zip Plugin

1. Create a `.zip` file containing your DLLs and `manifest.xml`
2. Place the `.zip` in the controller's `Plugins` directory
3. Restart the controller

Example structure:

```
Plugins/
└── MyPlugin.zip
    ├── manifest.xml
    ├── MyPlugin.dll
    └── MyPlugin.pdb
```

## Advanced Features

### Dependency Injection

Your plugin can use the dependency injection container to access other services:

```csharp
public class MyControllerPlugin : ControllerPluginAPI
{
    private readonly DiscordService _discordService;

    public MyControllerPlugin(DiscordService discordService)
    {
        _discordService = discordService;
    }

    public override async Task StartService()
    {
        // Use injected service
        await base.StartService();
    }
}
```

### Adding a UI Component

Create a WPF UserControl for your plugin:

```csharp
using System.Windows.Controls;

namespace MyPlugin
{
    public partial class MyPluginUserControl : UserControl
    {
        public MyPluginUserControl()
        {
            InitializeComponent();
        }
    }
}
```

Then return it from your plugin class:

```csharp
public override UserControl UserControl => new MyPluginUserControl();
```

### Accessing the Database

If your plugin needs database access, you can inject `ControllerSQLService`:

```csharp
using NGController.Services;

public class MyControllerPlugin : ControllerPluginAPI
{
    private readonly ControllerSQLService _sqlService;

    public MyControllerPlugin(ControllerSQLService sqlService)
    {
        _sqlService = sqlService;
    }

    public override async Task StartService()
    {
        if (_sqlService.TryOpenConnection(out var connection))
        {
            using (connection)
            {
                // Access your database tables
            }
        }
        await base.StartService();
    }
}
```

### Network Communication

Subscribe to network events:

```csharp
using NexusAPI.Networking;

public override void StartNetworking()
{
    NetSubscriber.TrySubscribe(
        MessageType.ChatSync, 
        HandleChatMessage
    );
    base.StartNetworking();
}

private void HandleChatMessage(Msg message)
{
    // Handle the incoming message
}
```

## Version Compatibility

Plugins specify minimum and maximum controller versions they support:

```xml
<MinControllerVersion>3.0.0</MinControllerVersion>
<MaxControllerVersion>3.5.0</MaxControllerVersion>
```

The controller will only load plugins that support its version. Use appropriate version ranges to ensure compatibility.

## Best Practices

1. **Use meaningful GUIDs** — Generate a unique GUID for each plugin using `System.Guid.NewGuid()`
2. **Version your plugin** — Follow semantic versioning (Major.Minor.Patch)
3. **Include symbol files** — Ship `.pdb` files with your DLLs for better debugging
4. **Document dependencies** — Clearly state what controller version and features your plugin requires
5. **Handle errors gracefully** — Log exceptions and provide meaningful error messages
6. **Clean up resources** — Implement `StopService()` to release resources
7. **Test thoroughly** — Test your plugin on the minimum and maximum controller versions you support

## Example Plugin

A complete minimal example:

**manifest.xml:**
```xml
<?xml version="1.0"?>
<ControllerPluginManifest xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <PluginName>Hello World Plugin</PluginName>
  <PluginVersion>1.0.0</PluginVersion>
  <MinControllerVersion>3.0.0</MinControllerVersion>
  <MaxControllerVersion>9.9.9</MaxControllerVersion>
  <PluginGUID>a1b2c3d4-a1b2-a1b2-a1b2-a1b2c3d4e5f6</PluginGUID>
  <IsBeta>false</IsBeta>
  <Author>Example Author</Author>
  <Description>A simple hello world plugin</Description>
  <AuthorURL>https://example.com</AuthorURL>
  <PluginURL>https://github.com/example/hello-world-plugin</PluginURL>
</ControllerPluginManifest>
```

**HelloWorldPlugin.cs:**
```csharp
using NGController.PluginAPI;
using NLog;
using System;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace HelloWorldPlugin
{
    public class HelloWorldPlugin : ControllerPluginAPI
    {
        private static Logger log = LogManager.GetCurrentClassLogger();

        public override Version PluginVersion => new Version(1, 0, 0);

        public override UserControl UserControl => new HelloWorldControl();

        public override async Task StartService()
        {
            log.Info("Hello World Plugin started!");
            await base.StartService();
        }

        public override async Task StopService()
        {
            log.Info("Hello World Plugin stopping!");
            await base.StopService();
        }
    }
}
```

**HelloWorldControl.xaml:**
```xml
<UserControl x:Class="HelloWorldPlugin.HelloWorldControl"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <StackPanel Margin="10">
        <TextBlock Text="Hello from My Plugin!" FontSize="16" FontWeight="Bold"/>
        <TextBlock Text="This is my custom UI" Margin="0,10,0,0"/>
    </StackPanel>
</UserControl>
```

## Troubleshooting

### Plugin Won't Load

1. Check that `manifest.xml` is valid XML and in the correct location
2. Verify the manifest is not malformed (missing required fields)
3. Check the controller logs for specific error messages
4. Ensure the plugin's minimum/maximum controller versions match

### Version Incompatibility

If you see an error like "Plugin min controller version is 3.5.0":
- Your controller version is too old for the plugin
- Update the controller or use an older plugin version

### Missing Dependencies

If your plugin fails to load:
1. Verify all required DLLs are in the plugin folder
2. Check that dependency versions match what's expected
3. Include `.pdb` files for better error diagnostics

## See Also

- [Controller Services](controller-services) — How to extend controller functionality
- [Nexus Scripting API](scripting-api) — For server-side plugins
- [Mod API](mod-api) — For Space Engineers mod integration
