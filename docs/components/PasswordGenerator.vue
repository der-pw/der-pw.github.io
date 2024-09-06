<template>
  <div class="vitepress-form">
    <label for="length">Passwortlänge:</label>
    <div class="range-container">
      <input type="range" id="length" v-model="passwordLength" min="4" max="30" step="1">
      <span class="range-value">{{ passwordLength }}</span>
    </div>

    <div>
      <input type="checkbox" id="useLowercase" v-model="useLowercase">
      <label for="useLowercase">Kleinbuchstaben (a-z)</label>
    </div>

    <div>
      <input type="checkbox" id="useUppercase" v-model="useUppercase">
      <label for="useUppercase">Großbuchstaben (A-Z)</label>
    </div>

    <div>
      <input type="checkbox" id="useNumbers" v-model="useNumbers">
      <label for="useNumbers">Zahlen (0-9)</label>
    </div>

    <div>
      <input type="checkbox" id="useSpecialChars" v-model="useSpecialChars">
      <label for="useSpecialChars">Sonderzeichen</label>
    </div>

    <button @click="generatePassword" class="vitepress-button">Passwort generieren</button>
  </div>
  
  <div v-if="password">
    <h3>Generiertes Passwort:</h3>
    <div class="copy-container">
      <span>{{ password }}</span>
      <button @click="copyToClipboard(password)" class="copy-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passwordLength: 15,
      useLowercase: true,
      useUppercase: true,
      useNumbers: true,
      useSpecialChars: true,
      password: ''
    };
  },
  methods: {
    generatePassword() {
      let charset = "";
      if (this.useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
      if (this.useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (this.useNumbers) charset += "0123456789";
      if (this.useSpecialChars) charset += "!@#$%^&*()_+";
      
      if (!charset) {
        alert("Bitte mindestens eine Zeichenart auswählen.");
        return;
      }

      let generatedPassword = '';
      for (let i = 0; i < this.passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
      }
      this.password = generatedPassword;
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          alert('Passwort wurde in die Zwischenablage kopiert!');
        })
        .catch(error => {
          console.error('Fehler beim Kopieren in die Zwischenablage:', error);
        });
    }
  }
};
</script>

<style>
.range-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
}

.range-container input[type="range"] {
  flex: 1;
}

.range-value {
  margin-left: 10px;
  min-width: 30px;
}

input[type="checkbox"] {
  margin-right: 5px;
}

button {
  margin-top: 10px;
}

.copy-container {
  display: inline-flex;
  align-items: center;
}

.copy-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 0px;
}
</style>
