<template>
  <div class="form-box">
    <form @submit.prevent="calculateArea" class="vitepress-form">
      <div class="vitepress-input-group">
        <input type="text" id="act_flow" v-model="actFlow" class="vitepress-input" required>
        <label for="act_flow" class="vitepress-label">Aktuell eingestellter Flow:</label>
      </div>
      <div class="vitepress-input-group">
        <input type="text" id="sample_val" v-model="sampleVal" class="vitepress-input" required>
        <label for="sample_val" class="vitepress-label">Abgelesener Wert des Samples:</label>
      </div>
      <button type="submit" class="vitepress-button">Berechnen</button>
    </form>
    <div v-if="result !== null">
      <p>Das Ergebnis beträgt <code>{{ result }}</code>.</p>
      <button @click="copyToClipboard" class="vitepress-button">Ergebnis kopieren</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const actFlow = ref(null)
const sampleVal = ref(null)
const result = ref(null)

const calculateArea = () => {
  // Convert input values to float
  const actFlowFloat = parseFloat(actFlow.value.replace(',', '.'))
  const sampleValFloat = parseFloat(sampleVal.value.replace(',', '.'))

  // Perform calculation
  result.value = (((actFlowFloat * (100 + sampleValFloat)) / 100).toFixed(3))
}

const copyToClipboard = () => {
  if (result.value !== null) {
    navigator.clipboard.writeText(result.value)
      .then(() => {
        alert('Ergebnis wurde in die Zwischenablage kopiert!')
      })
      .catch(error => {
        console.error('Fehler beim Kopieren in die Zwischenablage:', error)
      })
  }
}
</script>