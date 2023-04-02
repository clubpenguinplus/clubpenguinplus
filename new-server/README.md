# Setting up a new game server

Here's a very detailed step-by-step guide to setting up a new game server. There are a lot of steps, but it shouldn't take more than 15 minutes to set up.

-   Go to the database, and create a new user account for the server. The username should be the name of the server, and then copy the password.
-   Set up a new DigitalOcean app.
-   Select GitHub as the service provider.
-   Select the `server` repository, and choose the correct branch (most likely `master`).
-   Make sure the 'Autodeploy' option is enabled.
-   Click the 'Edit' button to edit the service's settings.
-   Define the 'Run command' as `node ./dist/World.js SERVERNAME` where `SERVERNAME` is the name of the server you want to run (a login server must be named `Login`).
-   Change the HTTP port to `6112`.
-   Click the back button to go back to the resources overview.
-   Click the 'Edit Plan' button to edit the service's plan. There should be one container, with 1GB of RAM and 1 CPU core.
-   Click 'Next' to go to the 'Environment Variables' tab.
-   Click 'Edit' to modify the Global Environment Variables.
-   Select the 'Bulk Editor'.
-   Enter the environment variables given in `env.example` into the editor. There will be some variables missing from because they are sensitive data, like API keys. You will need to find out the values for these yourself. You also need to enter the database username and password you generated earlier.
-   Click 'Save' to save the environment variables.
-   Click 'Next' to go to the 'Info' tab.
-   You can select the desired region for the server to be hosted in. Any region will work, but if this is a server targetted to an audience in a specific region, you should select that region.
-   You can also rename the server to something more descriptive than the default name, like the name of the server.
-   Click 'Next' to go to the 'Review' tab.
-   Double check everything is correct, and click 'Create Resources' to create the server
-   Go back to the database, and add the server app to the 'Trusted Sources' list. It should come up as a suggestion when you click 'Edit Sources'.
-   Go back to the DigitalOcean dashboard, and click on the newly created server's app, and select 'Settings'
-   Scroll down to 'Domains', and click 'Edit'
-   Click add domain and enter the domain name you want to use for the server. It's reccommended to use a subdomain with the server name, like `blizzard.cpplus.pw`.
-   Select 'We manage your domain' and click 'Add Domain'
-   Scroll back up, and select the 'server' component.
-   Scroll down to 'HTTP Request Routes' and click 'Edit'
-   Click 'Configure CORS'
-   Create a new 'Prefix' match origin for the play page, most likely `https://play.cpplus.pw`
-   Change the 'Access-Control-Allow-Methods' and select all the methods.
-   Everything else can be left as default, and select 'Apply CORS'
-   Now, go to the client's crumbs, and edit the `worlds.json` file to add the new server to the correct environment (most likely `live`). The format is as follows:

```json
    "SERVERNAME":{
        "host":"HOST DOMAIN",
        "path":"/socket/",
        "unlock":false,
        "login":false
    }
```

-   Change `SERVERNAME` to the name of the server, `HOST DOMAIN` to the domain you set up earlier, `unlock` to true if the server is used for unlock items codes, and `login` to true if the server is a login server.
-   Then, go to the server crumbs, and edit `worlds.json` to add the new server, so the login server knows to get population data from it. The format is as follows:

```json
    "SERVERNAME": {
        "public": true
    }
```

-   Change `SERVERNAME` to the name of the server, and `public` to false if the server is moderator only.

And that's it! You should now have a new game server up and running.
