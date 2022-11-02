# Example: Using Angular+Express with FusionAuth
This project contains an example project that illustrates using FusionAuth with Angular and Node/Express. This application will use an OAuth Authorization Code workflow and the PKCE extension to log users in. (PKCE stands for Proof Key for Code Exchange, and is often pronounced “pixie”.) The Angular front-end looks to access a NodeJS back-end, which requires authentication through FusionAuth; the front-end code is in the `secure-angular` directory, and the NodeJS back-end code is in the `server` directory.

This project was upgraded to use Angular 14; versions beyond that may require some manual updates.

## Prerequisites
You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/): Presumably you already have this on your machine if you are looking at this project locally; if not, use your platform's package manager to install git, and `git clone` this repo.
* [NodeJS](https://nodejs.org): This will install the NodeJS runtime, which includes the package management tool `npm` needed for pulling down the various dependencies.
* OPTIONAL: [Docker](https://www.docker.com): If you wish to run FusionAuth from within a Docker container.

## Installation
To install, do the following in a shell/Terminal window:

* `git clone https://github.com/fusionauth/fusionauth-example-angular` or `gh repo clone fusionauth/fusionauth-example-angular`
* `cd fusionauth-example-angular`: This is the root of the example.
* `cd secure-angular; npm install`: This will bring all the node modules onto the machine.
* `cd ../server; npm install`: Likewise.

## FusionAuth Configuration
This example assumes that you will run FusionAuth from a Docker container. In the root of this project directory (next to this README) are two files [a Docker compose file](./docker-compose.yml) and an [environment variables configuration file](./.env). Assuming you have Docker installed on your machine, a `docker-compose up` from within this (root) directory will bring FusionAuth up on your machine.

The FusionAuth configuration files also make use of a unique feature of FusionAuth, called Kickstart: when FusionAuth comes up for the first time, it will look at the [Kickstart file](./kickstart/kickstart.json) and mimic API calls to configure FusionAuth for use. It will perform all the necessary setup to make this demo work correctly, but if you are curious as to what the setup would look like by hand, the "FusionAuth configuration (by hand)" section of this README describes it in detail.

For now, get FusionAuth in Docker up and running (via `docker-compose up`) if it is not already running; to see, [click here](http://localhost:9011/) to verify it is up and running.

> **NOTE**: If you ever want to reset the FusionAuth system, delete the volumes created by docker-compose by executing `docker-compose down -v`. FusionAuth will only apply the Kickstart settings when it is first run (e.g., it has no data configured for it yet).

## Run
To run, do the following:

* In one shell, run `docker-compose up`
* In another shell, `cd server` and `npm run serve`
* In a third shell, `cd secure-angular` and `ng serve`

[Open a browser to the Angular app](http://localhost:4200/). The app will automatically reload if you change any of the source files.

You can also read the blog post here: https://fusionauth.io/blog/2020/03/31/how-to-securely-implement-oauth-angular

> **NOTE**: Again, as noted above, if you ever want to reset the FusionAuth system, delete the volumes created by docker-compose by executing `docker-compose down -v`.

## Architecture
The app has three parts, each running on a different `localhost` port:

- `localhost:4200` is the Angular app. It has a single route (`/`) and makes calls to the Express app.
- `localhost:3000` is the Express app. It has several routes (like `/login` and `/logout`), which are used by the Angular front-end. The Express app makes calls to FusionAuth.
- `localhost:9011` is your instance of FusionAuth. It has several endpoints (like `/authorize` and `/introspect`). It accepts calls from the Express app and sends back information, such as access tokens and user registration data.

So, the parts connect like this: 

`Angular (4200) <---> Express (3000) <---> FusionAuth (9011)`

The Angular app never talks directly to FusionAuth. This is important, because the Angular app can be easily picked apart by anyone online (it's Javascript, which means the source is directly visible to anyone with a browser), which means you can't keep confidential information there. While some calls directly to FusionAuth are safe, it's usually important to keep things separated like this.

### **TODO**: Verify all of what's below!

### Logging In/Out

When the user clicks on `sign in`, the Angular app redirects to the Express server's `/login` route, which redirects to FusionAuth's `authorize` endpoint. FusionAuth renders the username/password form, authenticates the user, and redirects to the configured Redirect URI (`/oauth-redirect` on the Express server) with an Authorization Code.

The Express server sends the Authorization Code (as well as its Client ID and Secret) to FusionAuth's `/token` endpoint. FusionAuth validates everything and sends back an Access Token. The Express Server saves this token in session storage and redirects back to the Angular client.

When the user clicks on `sign out`, the Angular app sends a request to the Express server's `/logout` route, which sends a request to FusionAuth's `/logout` endpoint, deletes the relevant cookie, and deletes the Access Token from session storage.

**The presence of the Access Token in session storage is what defines whether or not a user is logged in**, because FusionAuth will not allow retrieval or modification of user data without a valid Access Token.

### Rendering the Angular App

When the Angular app loads, it sends a request to the Express server's `/user` route. If there's an Access Token in session storage, the Express server uses FusionAuth's `/introspect` and `/registration` endpoints to get data for the current user; these give us the `token` and `registration` JSON objects seen in the example app.

If there is no Access Token (or if it's expired), `/user` will instead return an empty object. The React components use the existence of `token` (or lack thereof) to determine whether to render the page in its logged-in or logged-out state.

### Editing User Data

All of your FusionAuth users have a `registration.data` object for storing arbitrary data related to the user. The example app allows logged-in users to modify `registration.data.userData` by changing its value in the `<textarea>`, but all `registration` information is able to be set in this way.

When the `<textarea>` is changed, the React client makes a request to the Express server's `/set-user-data` route, which makes a request to FusionAuth's `/registration` endpoint.

### Future steps
This should be sufficient to get started; for more ideas on where to go next with your Angular/FusionAuth journey... ***TODO***

## FusionAuth configuration (by hand)
Again, remember that all of this is already automated for you as part of the [Kickstart file](kickstart/kickstart.json) that will be executed the first time FusionAuth comes up, and if you ever need to regenerate it, you can delete the Docker volumes (`docker-compose down -v`) to remove them entirely (which will then cause FusionAuth to initialize itself from the Kickstart file on the next startup).

If you wish to run FusionAuth directly from your machine, ...

If you prefer to run FusionAuth from a remote server (such as the cloud), ...

Assuming FusionAuth is running locally on port 9011, go [here](http://localhost:9011/admin) to log in as an admin and configure an asymmetric key, an application, and two users. If you have never run FusionAuth locally before, you will need to create an admin user (next).

### Create the Admin user
This will only be necessary

### Create the asymmetric key

### Create the application

### Configure the application to use the asymmetric key you created

### Register the admin user to the application

### Create a non-admin user

### Register the non-admin user to the application

