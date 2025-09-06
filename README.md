# GUI wrapper for nmcli using React

#### About

I find this frustrating, that there is no good gui wrappers around nmcli. By good i mean **fast and highly customisable visual representation**. There is one thing that bothers me about nm-applet that there is no "free" styling customisation avaliable(maybe i just gave up before i found it)

#### Goals

So, i'm creating this piece of software to provide users with ability to create custom stylesheets for nm

#### Tasks:

- [x] ~~choose a good name for this util(maybe wifire?)~~
- [ ] add logging system
- [x] ~~add error handling and printing out errors~~
- [ ] add simple styling for components to use
- [ ] fix spagetti-code in `lib.rs -> get_networks()`
- [x] ~~remove `.unwrap()` and handle possible errors in `lib.rs -> connect()`~~
  - [x] ~~on connection to new network this returns a error but successfully connects to wifi
        find out why this is happenning~~
        _this happened because of default behaviour was enabled. fixed with `.preventDefault()`_
- [ ] create handlers for saved connections and inUse connections
- [x] ~~find out what to do about networks with "--" ssid, find out what are they~~
- [ ] add support for [hidden networks](https://stackoverflow.com/questions/35476428/how-to-connect-to-hidden-wifi-network-using-nmcli)
- [ ] add hotspot creation interface
- [x] ~~add disconnect button~~
  - [ ] make it so btn refreshes interface list on click(need to create new "waterfall" of data)
- [ ] add showing interfaceList on start
- [ ] fix refreshing program on form submit
- [x] ~~add support for free networks~~ <- turns out that networks without security are good with password argument
  - [ ] add visual representation that network is not secured
- [ ] find out a way to ship this as AUR package for now(support for other distros are not in priority, but it will be added later)
- [ ] add css support under $HOME/.config/{project-name}
