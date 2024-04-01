<template>
  <div class="form-box">
    <form @submit.prevent="calculateRetraction" class="vitepress-form">
      <div class="vitepress-input-group">
        <input type="text" id="start_val" v-model="startVal" class="vitepress-input" required>
        <label for="start_val" class="vitepress-label">Startwert:</label>
      </div>
      <div class="vitepress-input-group">
        <input type="text" id="factor" v-model="factor" class="vitepress-input" required>
        <label for="factor" class="vitepress-label">Faktor:</label>
      </div>
      <div class="vitepress-input-group">
        <input type="text" id="meass_height" v-model="meassHeight" class="vitepress-input" required>
        <label for="meass_height" class="vitepress-label">Gemessene Höhe:</label>
      </div>
      <button type="submit" class="vitepress-button">Berechnen</button>
    </form>
    <div v-if="retraction !== null">
      <p>Das Ergebnis beträgt <code>{{ retraction }}</code>.</p>
      <button @click="copyToClipboard" class="vitepress-button">Ergebnis kopieren</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Standardwerte für Startwert und Faktor als Zeichenketten
const startVal = ref('0')
const factor = ref('0.05')
const meassHeight = ref(null)
const retraction = ref(null)

const calculateRetraction = () => {
  // Konvertierung der Eingabewerte in Gleitkommazahlen
  const startValFloat = parseFloat(startVal.value.replace(',', '.'))
  const factorFloat = parseFloat(factor.value.replace(',', '.'))
  const meassHeightFloat = parseFloat(meassHeight.value.replace(',', '.'))

  // Durchführung der Berechnung
  retraction.value = (startValFloat + meassHeightFloat * factorFloat).toFixed(2)
}

const copyToClipboard = () => {
  if (retraction.value !== null) {
    navigator.clipboard.writeText(retraction.value)
      .then(() => {
        alert('Ergebnis wurde in die Zwischenablage kopiert!')
      })
      .catch(error => {
        console.error('Fehler beim Kopieren in die Zwischenablage:', error)
      })
  }
}
</script>

<style scoped>
/* Stildefinitionen für die Vue-Komponente */
</style>
