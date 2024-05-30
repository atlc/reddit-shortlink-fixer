## How it works

The new reddit sharing shortlink style (`/s/` link) breaks functionality on many of the remaining 3rd party reddit mobile apps installed through virtual means, and additionally breaks a lot of desktop functionality for other extensions. Due to reddit's developer-unfriendly actions of halting 3rd party API access, there is now programmatic way to know the link's destination until after the link is already clicked. This bot utilizes [Selenium](https://www.selenium.dev/) - a browser automation tool - to virtually open up a web browser, click on the `/s/` link, and wait for the redirect to finish, then retrieves the URLs for both the `old.reddit` and `new.reddit` subdomains, ensuring 100% backwards compatibility for all mobile and desktop clients.

## Prereqs

-   [Node.js](https://nodejs.org/en/download/prebuilt-binaries) preinstalled
-   Firefox's `geckodriver` preinstalled (go to [assets here](https://github.com/mozilla/geckodriver/releases) and download the .zip, or .tar.gz for Windows, or MacOS or Linux, respectively).
-   Rename `.env.sample` to `.env` and follow the below instructions

## Using the App

-   Download this project using the `.zip` option or by `git clone`ing it
-   Run `npm install`
-   Replace the contents of the env with your data. All the environment variables prefaced with `REDDIT_` are required, as are the `FIREFOX_BIN`, and `NODE_ENV` should be set to `production` in production. With Snoostorm+Snoowrap, the limitations appear to currently be just one subreddit (_though I may test if multireddits work at a later date_).

    -   For `REDDIT_*`:

        -   The `REDDIT_USERNAME`, `REDDIT_USER_AGENT` variables will be the actual username of the account that will be doing the parsing and commenting
        -   The `REDDIT_PASSWORD` variable will be the password of that same account
        -   In order to obtain the `CLIENT_ID` and `CLIENT_SECRET`:
            -   While logged in, go to the Reddit [application preferences page](https://www.reddit.com/prefs/apps) and click on the "Developer/Create App" button
            -   For the required fields: for `name` field, just put your username; for `app type`, select `script`; for `redirect uri`, just put `http://localhost:3000` (not used for scripts but it is still required); click "Create App" button
            -   Grab your `CLIENT_ID` (the string right underneath the "personal use script" heading) and your `CLIENT_SECRET` (labeled `secret`)

    -   `FIREFOX_BIN` is the location where your Firefox binary is located
        -   On Windows, it should be somewhere like `C:\Program Files\Mozilla Firefox\firefox.exe`
        -   On MacOS, it should be somewhere like `/Applications/Firefox.app/Contents/MacOS/firefox-bin` or `$HOME/Applications/Firefox.app/Contents/MacOS/firefox-bin`
        -   On Linux, it should be somewhere like `/usr/bin/firefox` if installed with most package managers or `/snap/firefox/current/usr/lib/firefox/firefox` with snap
    -   `TRIGGER` should be a short phrase from AutoModerator indicating that a /s/ shortlink has been posted (_this may become configurable at a later date_)

```.env
REDDIT_USERNAME=YourLinkFixerBot
REDDIT_PASSWORD=hunter2
REDDIT_USER_AGENT=YourLinkFixerBot
REDDIT_CLIENT_ID=QXl5eXl5eXkgbG1hb29v
REDDIT_CLIENT_SECRET=U29tZWJvZHkgb25jZSB0b2xkIG1l

FIREFOX_BIN=/usr/bin/firefox

NODE_ENV=development
SUBREDDIT=all
TRIGGER=Your submission contains a /s/ reddit shortlink which may cause an issue to some users viewing this thread via mobile app
```
