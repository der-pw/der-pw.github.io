# Macro Sammlung
Macros sind essentiell in Klipper.

## GCode-Dateien älter als x Tage löschen
Hierfür benötigt man `gcode_shell_command`, welches in den Paketen von [kiauh](https://github.com/dw-0/kiauh) enthalten ist.  
`-mtime +50` gibt an, dass alle Dateien, älter als 50 Tage, gelöscht werden sollen.  
Über `DELETE_JOBS` in der Konsole lassen sie die Dateien dann löschen. Eventuell muss der Pfad ` /home/pi/printer_data/gcodes/` noch angepasst werden, i.d.R. passt das so.

```toml
### delete all jobs older than n days
[gcode_shell_command delete_jobs]
command: find /home/pi/printer_data/gcodes/ -name "*.gcode" -type f -mtime +50 -delete
timeout: 2.
verbose: True

[gcode_macro DELETE_JOBS]
description: Delete all Jobs older than <n> days
gcode:
    RUN_SHELL_COMMAND CMD=delete_jobs

```

## Loops in Macros
Möchte man einen Befehl oder eine Befehlskette mehrfach ausführen, kann man diese in einen Loop verpacken.
Hierbei wird sich am Jinja Template System orientiert. Das machen wir uns zu Nutze und bauen eine for-Schleife.

`<count>` ist die Anzahl der Loops.
```
   {% for i in range(1, <count>) %}
      MEIN_MACRO1
      MEIN_MACRO2
   {% endfor %}
```
Was kann man praktisches damit machen?
Beispiesweise die Achsen mehrmals bewegen.
Mit `_RUN_X COUNT=10` oder `_RUN_Y COUNT=10`  wird der Loop dann 10x ausgeführt

::: warning
Hier werden die position_max Variablen benutzt, einmal um X bzw. Y auf die Mitte zu fahren, dann im Loop position_max - 2mm für die jeweilige Achse.
:::

```toml
[gcode_macro _RUN_Y]
gcode:
   {% set travel_speed     = ((printer.toolhead.max_velocity) * 0.75) * 60 | float %}      ## set speed to 3/4 of max velocity
   {% set half_x           = (printer.configfile.settings['stepper_x'].position_max/2) %}  
   {% set move_max_y       = (printer.configfile.settings['stepper_y'].position_max-2) %}
   {% set count = params.COUNT|default(1)|int %}
   M118 start riding Y
   G90
   G1 X{half_x} Y2 F{travel_speed}
   {% for i in range(1, count) %}
      G1 Y{move_max_y}
      G1 Y2
   {% endfor %}
   M118 stop riding Y

[gcode_macro _RUN_X]
gcode:
   {% set travel_speed     = ((printer.toolhead.max_velocity) * 0.75) * 60 | float %}      ## set speed to 3/4 of max velocity
   {% set half_y           = (printer.configfile.settings['stepper_y'].position_max/2) %}  
   {% set move_max_x       = (printer.configfile.settings['stepper_x'].position_max-2) %}
   {% set count = params.COUNT|default(1)|int %}
   M118 start riding X
   G90
   G1 Y{half_y} X2 F{travel_speed}
   {% for i in range(1, count) %}
      G1 X{move_max_x}
      G1 X2
   {% endfor %}
   M118 stop riding X
```

## Beeper
Um einen Buzzer über `M300` anzusteuern, verwende einen [Passiven Buzzer](https://amzn.to/49sTJU5).
Dieser kann bspw. an einen Fanport mit 5V angeschlossen werden.

```toml
[pwm_cycle_time _BEEPER_pin]
pin: <PIN>
shutdown_value: 0
cycle_time: 0.1
scale: 1

[gcode_macro M300]
gcode:
    # Use a default 1kHz tone if S is omitted.
    {% set S = params.S|default(1000)|int %}
    # Use a 100ms duration is P is omitted. (100ms is the fastest switching limit)
    {% set P = params.P|default(100)|int %}
    {% if S > 0 %}
    SET_PIN PIN=_BEEPER_pin VALUE=0.1 CYCLE_TIME={ 1.0/S if S > 0 else 1 }
    {% endif %}
    G4 P{P}
    SET_PIN PIN=_BEEPER_pin VALUE=0
```
`M300 S440 P1000` spielt dann einen 440Hz Ton für 1 Sekunde.