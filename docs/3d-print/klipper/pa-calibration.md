<script setup>
import FWRetractCalibrationCalculator from '../../components/FWRetractCalibrationCalculator.vue'
</script>

# Pressure Advance Kalibrierung
Berechnet den PA-Wert anhand der [TUNING_TOWER Methode](https://www.klipper3d.org/Pressure_Advance.html) von Klipper3d.org.

## Stringing Test Modell
Es kann folgendes Modell verwendet werden:  
[Klipper stringing test with firmware retraction](https://www.printables.com/model/236366-klipper-stringing-test-with-firmware-retraction) auf printables.  

## Wert ermitteln
Miss das Modell von der Unterseite bis zu der Stelle, an der das Stringing weg ist.
Dabei wird folgende Formel verwendet. `retraction = (start + measured_height) x factor`  

## Berechnen
<FWRetractCalibrationCalculator />

