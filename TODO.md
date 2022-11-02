# Example Checklist
This is a checklist for what makes a good example for FusionAuth's use.

Please make sure all items on this list are completed (or an explanation appears in the README as to why they are not) before submitting an example for inclusion in the collection of FusionAuth example repositories.

Most of the text in the README can remain as it is, with those exceptions 

## README
Anywhere `{THING}` appears, it is a placeholder for the language/platform this example is for, and should be replaced with the instructions appropriate to the THING.

At a minimum, the example should demonstrate how to:

* Protect some "resource" (web page, mobile screen, or API call) from access without requiring authentication
* Use FusionAuth to log in (using the supplied user credentials)
* Use FusionAuth to log out (and remove any in-memory transient memory of the authentication credentials, so that the user has to log in again)

In addition, please fill out BLOG.md, which is a template for a blog post that can be posted to the FusionAuth blog when the example is ready to be made public.

## Kickstart configuration
If there is any additional Kickstart configuration beyond the usual (registering an unrestricted API key, an asymmetric key, an application, and two users), make sure to add it to the [Kickstart file](kickstart/kickstart.json).

## GitHub Action
Add the THING-specific step necessary to compile the code. The Action is already set up to pull the code into an Ubuntu image (which should be sufficient for most-if-not-all programming platforms) and pull the code.



