<template>
  <div class="form-box">
    <form @submit.prevent="calculateRetraction" class="vitepress-form">
      <div class="vitepress-input-group">
        <input type="text" id="marked_val" v-model="markedVal" class="vitepress-input" required>
        <label for="marked_val" class="vitepress-label">Markierter Wert:</label>
      </div>
      <div class="vitepress-input-group">
        <input type="text" id="meas-val" v-model="measVal" class="vitepress-input" required>
        <label for="meas-val" class="vitepress-label">Abgelesener Wert:</label>
      </div>
      <div class="vitepress-input-group">
        <input type="text" id="extr-length" v-model="extrLength" class="vitepress-input" required>
        <label for="extr-length" class="vitepress-label">Extrudierte Menge:</label>
      </div>
      <div class="vitepress-input-group">
        <input type="text" id="previous_rotation_distance" v-model="previousRotationDistance" class="vitepress-input" required>
        <label for="previous_rotation_distance" class="vitepress-label">Bisherige rotation_distance:</label>
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

const markedVal = ref('70')
const measVal = ref('0')
const extrLength = ref('50')
const previousRotationDistance = ref('0')
const retraction = ref(null)

const calculateRetraction = () => {
  const markedValFloat = parseFloat(markedVal.value.replace(',', '.'))
  const measValFloat = parseFloat(measVal.value.replace(',', '.'))
  const extrLengthFloat = parseFloat(extrLength.value.replace(',', '.'))
  const previousRotationDistanceFloat = parseFloat(previousRotationDistance.value.replace(',', '.'))

  retraction.value = ((previousRotationDistanceFloat * (markedValFloat - measValFloat)) / extrLengthFloat).toFixed(3)
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
