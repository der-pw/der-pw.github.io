::: warning
Noch nicht fertig, hier muss ich nochmal ran!
:::

# USB-ADXL udev Aktion
## Startet Klipper neu sobald der ADXL angesteckt oder abgezogen wird

In der printer.cfg werden die Konfigurationen am besten per  
`[include settings/*.cfg]`  
eigelesen, so dass unsere udev-Regel einfach nur die betreffende Datei umbenennt.
Es wird so jede Datei mit der Endung .cfg inkludiert.

### udev-Regel anlegen
`sudo nano /etc/udev/rules.d/99-usb-adxl.rules`
```
# Regel für USB-Gerät beim Einhängen (add)
ACTION=="add", SUBSYSTEM=="usb", ENV{ID_SERIAL}=="Klipper_rp2040_xxxxxxxxxxxxxxxxx", RUN+="/home/pi/scripts/adxl_add.sh"

# Regel für USB-Gerät beim Aushängen (remove)
ACTION=="remove", KERNELS=="1-1.2", SUBSYSTEM=="usb", RUN+="/home/pi/scripts/adxl_remove.sh"
```
### adxl-add Skript anlegen
`/home/pi/scripts/adxl_add.sh`
```
#!/bin/bash

# Dateien umbenennen
mv /home/pi/printer_data/config/settings/adxl.cfg_old /home/pi/printer_data/config/settings/adxl.cfg

# Klipper neu starten
sudo systemctl restart klipper
```
### adxl-remove Skript anlegen
`/home/pi/scripts/adxl_remove.sh`
```
#!/bin/bash

# Dateien umbenennen
mv /home/pi/printer_data/config/settings/adxl.cfg /home/pi/printer_data/config/settings/adxl.cfg_old

# Klipper neu starten
sudo systemctl restart klipper
```