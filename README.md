reload-multi-device
===================

Welcome to Reload Multi Device

##Summary##
- Installation
- How to use

* * *

##Installation##

To install RMD, you have ton run a this following into the reload multi device folder.
```
npm install
```
It will install all dependencies for RMD (such as [socket.io](http://socket.io/) and [express](http://expressjs.com/))

##How to use##

For launch a server you have to edit client.js @ line 2 :

```
var urlSite ='', //URL of your website to listen (must be the ip of your localhost such as http://192.168.0.1/)
```
Then type into your command line this instruction :
```
node server.js
```
__Important :__ you must have an apache server and put in on __Online mode__. Then go to your ip (like http://192.168.0.1/reload-multi-device/) with all your device you want to test.

To set a device as "master" you have to add this hashtag : #login, at the end of the url ex: http://192.168.0.1/reload-multi-device/#login.

The default user and password are admin (both).

You are now logged. If you refresh your current page on the master device, all the other one will be refresh too.

You can navigate with the master. The navigation will be send to the devices.
