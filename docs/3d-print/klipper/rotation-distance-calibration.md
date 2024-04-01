<script setup>
import RotationDistanceCalculator from '../../components/RotationDistanceCalculator.vue'
</script>

# Extruder Rotation Distance berechnen
Berechnet den Wert für  `rotation_distance` anhand der Eingabeparameter  
[Calibrating rotation_distance on extruders](https://www.klipper3d.org/Rotation_Distance.html#calibrating-rotation_distance-on-extruders).

## Wert ermitteln
Verwende das folgende Verfahren zum "Messen und Zuschneiden":

1. Stelle sicher, dass der Extruder Filament enthält, das Hotend auf eine geeignete Temperatur erhitzt ist und der Drucker bereit ist zu extrudieren.
2. Verwende einen Marker, um etwa 70 mm vom Einlass des Extrudergehäuses entfernt eine Markierung auf dem Filament zu setzen. Verwende dann einen digitalen Messschieber, um den tatsächlichen Abstand dieser Markierung so genau wie möglich zu messen. Notiere dies als `<markierter Wert>`.
3. Extrudiere 50 mm Filament mit der folgenden  
Befehlssequenz: `G91` gefolgt von `G1 E50 F60`. Notiere 50 mm als `<extrudierte Menge>`. Warte, bis der Extruder den Vorgang abgeschlossen hat (es dauert etwa 50 Sekunden). Es ist wichtig, für diesen Test die langsame Extrusionsrate zu verwenden, da eine schnellere Rate zu hohem Druck im Extruder führen kann, was die Ergebnisse verfälscht. (Verwende für diesen Test nicht die "Extrudieren-Schaltfläche" auf grafischen Oberflächen, da diese mit hoher Geschwindigkeit extrudieren.)
4. Verwende den digitalen Messschieber, um den neuen Abstand zwischen dem Extrudergehäuse und der Markierung auf dem Filament zu messen. Notiere dies als `<abgelesener Wert>`.  
  
Folgende Formel wird dabei verwendet.  
`rotation_distance = <bisherige_rotation_distance> * (<markierter Wert> - <abgelesener Wert>) / <extrudierte Menge>`

## Berechnen
<RotationDistanceCalculator />