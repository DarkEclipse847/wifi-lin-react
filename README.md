# GUI wrapper for nmcli using React

#### About
I find this frustrating, that there is no good gui wrappers around nmcli. By good i mean **fast and highly customisable visual representation**. There is one thing that bothers me about nm-applet that there is no "free" styling customisation avaliable(maybe i just gave up before i found it)

#### Goals
So, i'm creating this piece of software to provide users with ability to create custom stylesheets for nm

#### Tasks:
* [ ] choose a good name for this util(maybe wifire?)
* [ ] add logging system
* [ ] add error handling and printing out errors
* [ ] add simple styling for components to use
* [ ] fix spagetti-code in ```lib.rs -> get_networks()```
* [ ] remove ```.unwrap()``` and handle possible errors in ```lib.rs -> connect()```
* [ ] create handlers for saved connections and inUse connections
* [x] ~~find out what to do about networks with "--" ssid, find out what are they~~
* [ ] add support for [hidden networks](https://stackoverflow.com/questions/35476428/how-to-connect-to-hidden-wifi-network-using-nmcli)
* [ ] add hotspot creation interface
* [ ] add disconnect button
* [ ] add showing interfaceList on start
* [ ] fix refreshing program on form submit
* [ ] add support for free networks
* [ ] find out a way to ship this as AUR package for now(support for other distros are not in priority, but it will be added later)
* [ ] add css support under $HOME/.config/{project-name}