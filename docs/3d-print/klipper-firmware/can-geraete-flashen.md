# CAN Geräte flashen

## flashen mittels Katapult
*In diesem Beispiel laufen die Geräte schon mit CAN und Katapult ist als Bootloader installiert.*

- Wenn nicht schon geschehen: https://github.com/Arksine/katapult Katapult installieren.
- Direkt nach dem Systemstart  den Klipper-Dienst stoppen.
  Hierzu sollten die MCUs vorher nicht mit Klipper verbunden sein. Idealerweise den Drucker vorher kurz vom Netz getrennt haben, und danach hochfahren.
- Mit `sudo systemctl stop klipper.service` Klipperdienst stoppen, damit dieser die Geräte nicht einhängen/verwenden kann.
- CAN-Bus query machen um die IDs zu ermitteln `~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0`
- es sollte folgendes erscheinen:
```
user@printerhost:~$ ~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
Found canbus_uuid=12345678abcd, Application: CanBoot
Found canbus_uuid=23456789abcd, Application: CanBoot
Total 2 uuids found
```
- Mit `cd ./klipper` in den Klipper-Ordner wechseln.
- Dann mit`make clean` und`make menuconfig` die Klipperfirmware nach Angaben des Boardherstellers einstellen.
  Wenn Katapult als Bootloader vorher geflashed wurde, ist es wichtig, den Bootloader offset einzustellen, sonst wird dieser mit der Firmware überschrieben.
  Das Offset setzt die Firmware später im ROM an die richtigen Bereiche. Katapult ist so klein, dass immer das kleinst verfügbare Offset genommen werden kann.
- Ist das erledigt, mit `Q` beenden und die Config speichern.
  Danach ein `make` und somit die Firmware backen.
- Die Firmware kann dann mit `~/klippy-env/bin/python3 ~/katapult/scripts/flash_can.py -i can0 -f ~/klipper/out/klipper.bin -u <uid>`
  Die`<uid>` ist die ID des Gerätes, das geflashed werden soll.
