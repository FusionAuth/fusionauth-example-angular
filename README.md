# Example: Using Angular+Express with FusionAuth
This project contains an example project that illustrates using FusionAuth with Angular and Node/Express. This application will use an OAuth Authorization Code workflow and the PKCE extension to log users in. PKCE stands for Proof Key for Code Exchange, and is often pronounced “pixie”.

This project was upgraded to use Angular 14; versions beyond that may require some manual updates.

## Prerequisites
You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/): Presumably you already have this on your machine if you are looking at this project locally; if not, use your platform's package manager to install git, and `git clone` this repo.
* [NodeJS](https://nodejs.org): This will install the NodeJS runtime, including the package management tool `npm`.

## Installation
To install, do the following:

* `git clone https://github.com/FusionAuth/fusionauth-example-angular`
* `cd fusionauth-example-angular`
* `cd secure-angular`
* `npm install`: This will bring all the node modules onto the machine.
* `cd ../server`
* `npm install`: Likewise.

## FusionAuth Configuration
This example assumes that you will run FusionAuth from a Docker container. In the root of this project directory (next to this README) are two files [a Docker compose file](./docker-compose.yml) and an [environment variables configuration file](./.env). Assuming you have Docker installed on your machine, a `docker-compose up` will bring FusionAuth up on your machine.

The FusionAuth configuration files also make use of a unique feature of FusionAuth, called Kickstart: when FusionAuth comes up for the first time, it will look at the [Kickstart file](./kickstart/kickstart.json) and mimic API calls to configure FusionAuth for use. It will perform all the necessary setup to make this demo work correctly, but if you are curious as to what the setup would look like by hand, the "FusionAuth configuration (by hand)" section of this README describes it in detail.

For now, get FusionAuth in Docker up and running (via `docker-compose up`) if it is not already running; to see, [click here](http://localhost:9011/) to verify it is up and running.

> **NOTE**: If you ever want to reset the FusionAuth system, delete the volumes created by docker-compose by executing `docker-compose down -v`. FusionAuth will only apply the Kickstart settings when it is first run (e.g., it has no data configured for it yet).

## Run
To run, do the following:

* In one shell, run `docker-compose up`
* In another shell, `cd server` and `npm run serve`
* In a third shell, `cd secure-angular` and `ng serve`

[Open a browser](http://localhost:4200/) (http://localhost:4200). The app will automatically reload if you change any of the source files.

You can also read the blog post here: https://fusionauth.io/blog/2020/03/31/how-to-securely-implement-oauth-angular

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

