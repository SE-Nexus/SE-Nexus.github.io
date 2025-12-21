---
category: Controller Setup
order: 3.4
description: Setting Up Your Controller
---

# Discord Setup

This section provides information that will help you to use the built-in Discord bridge in the Nexus controller.

1. Create a Discord bot.
   > **_NOTE:_** this section is derived from the instructions found in the documentation for the SEDiscordBridge plugin found on the Torch web site: <https://torchapi.com/plugins/view/3cd3ba7f-c47c-4efe-8cf1-bd3f618f5b9c>

    a. Sign in on the [Discord's Developer Portal](https://discord.com/developers/applications). Create an account if you don't already have one.
  
    b. Click <mark>New Application</mark>. Give your app a name, agree to the terms, and click <mark>Create</mark>. Then confirm you are a human.

    c. On the General Information page you can changed your app's icon, name, description and other items, if desired.

    d. Now that your app is created, you need to create the bot. Click on <mark>Bot</mark> in the menu on the left. Enable all three 'Intents'. Click on <mark>Save Changes</mark>.
   
    e. Select the permissions you desire for your bot. Normally this will be 'Send Messages' at a minimum. This just calculates the permissions integer for you, shown at the bottom of the page. Note this. We will use it in a moment.
   
    f. If your bot's token is showing click the 'Copy' button. If not, you'll have to click the 'Reset Token' button and go through the 2FA verification. Save this token temporarily.
   
3. Add the Bot to your Discord server.

    a. Copy your bot's application id from the General Information tab.

    b. Go to the following URL, replacing ```YOUR_APPLICATION_ID_HERE``` with the bot's application ID, and the 0 permissions value with the permissions integer you calculated earlier.

    ```https://discord.com/oauth2/authorize?scope=bot&permissions=0&client_id=YOUR_APPLICATION_ID_HERE```

    c. When the page shows 'Discord App Launched', click ```Continue to Discord```. Select your Discord server and click ```Continue```, and then ```Authorize```.
  
   
5. Configure your Discord Server.
6. Configure the Nexus controller.


