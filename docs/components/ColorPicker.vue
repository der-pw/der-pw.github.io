
<template>
    <div class="color-picker">
      <input type="color" v-model="color" @input="updateColor" class="color-input">
      <div class="color-values">
        <div>HEX: {{ hexValue }}</div>
        <div>RGB: {{ rgbValue }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        color: '#000000'
      };
    },
    computed: {
      hexValue() {
        return this.color;
      },
      rgbValue() {
        const hex = this.color.substring(1);
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgb(${r}, ${g}, ${b})`;
      }
    },
    methods: {
      updateColor(event) {
        this.color = event.target.value;
      }
    }
  };
  </script>
  
  <style scoped>
  .color-picker {
    display: flex;
    align-items: center;
  }
  
  .color-input {
    margin-right: 10px;
    width: 70px;
    height: 70px;
    cursor: pointer;
  }
  
  .color-values {
    font-family: Arial, sans-serif;
  }
  </style>
  