---
category: Setup
order: 3.3
description: Setting Up Your Controller
---

# Discord Setup

This section provides information that will help you to use the built-in Discord bridge in the Nexus controller.

1. Create a Discord bot.

   > **_NOTE:_** This section is derived from the instructions found in the documentation for the SEDiscordBridge plugin found on the Torch web site: <https://torchapi.com/plugins/view/3cd3ba7f-c47c-4efe-8cf1-bd3f618f5b9c>

    a. Sign in on the [Discord's Developer Portal](https://discord.com/developers/applications). Create an account if you don't already have one.
  
    b. Click ```New Application```. Give your app a name, agree to the terms, and click ```Create```. Then confirm you are a human.

    c. On the General Information page you can change your app's icon, name, description and other items, if desired.

    d. Now that your app is created, you need to create the bot. Click on ```Bot``` in the menu on the left. Enable all three 'Intents'. Click on ```Save Changes```.
   
    e. Select the permissions you desire for your bot. Normally this will be 'Send Messages' at a minimum. This just calculates the permissions integer for you, shown at the bottom of the page. Save this. We will use it in a moment.
   
    f. If your bot's token is showing click the 'Copy' button. If not, you'll have to click the 'Reset Token' button and go through the 2FA verification. Save this token temporarily.
   
2. Add the Bot to your Discord server.

    a. Copy your bot's application id from the General Information tab.

    b. Go to the following URL, replacing ```YOUR_APPLICATION_ID_HERE``` with the bot's application ID, and the 0 permissions value with the permissions integer you calculated earlier.

    ```https://discord.com/oauth2/authorize?scope=bot&permissions=0&client_id=YOUR_APPLICATION_ID_HERE```

    c. When the page shows 'Discord App Launched', click ```Continue to Discord```. Select your Discord server and click ```Continue```, and then ```Authorize```.
  
   
3. Configure your Discord Server.

    a. Make sure your bot has permission to write messages in your desired channel(s). I have multiple servers and bots, so I created a 'Bots' role that has the permissions I want, and then assign the new bot to the 'Bots' role.

    b. Give your bot access to the desired chat channel. Right-click the channel name and select ```Edit Channel```. Choose ```Permissions```, and add appropriate permissions to your bot or Bots role.

4. Configure the Nexus controller.

    a. Open the ```Discord``` menu on the left and select ```Discord Setup```.

    b. Enable the Bot and paste the Bot Token you saved earlier.

    > **_NOTE:_** If you lose or forget your bot token, it cannot be recovered. You will have to go to the Discord Developer page and create a new bot token.

    c. Change other settings on the Discord Setup page as desired.

    d. Select ```Discord Linker``` in the menu.
    
    e. Enter the name of your discord server in the Community Name field.

    f. Enter the permissions integer you saved earlier in the Grant Discord Role field.

    g. Open ```'Nexus Setup``` in the menu, select ```Server Setup```, and select the desired server.

    h. Right click on the desired discord channel and select ```Copy Channel ID```. Paste this in the ```Discord Global Channel ID``` field in the Nexus controller.

    > **_NOTE:_** The ```Copy Channel ID``` menu item only shows if you have developer mode enabled in discord.

This completes the basic setup of Discord functionality in the Nexus controller. There are other settings for Faction Discord, Admin Channel and more.


