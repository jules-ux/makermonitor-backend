<template>
  <div class="app">
    <h1>Unieke Item Toevoegen</h1>
    <input v-model="itemName" type="text" placeholder="Naam item" />
    <button @click="addItem">Toevoegen</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { addUniqueItem } from "./api/api.js";

export default {
  setup() {
    const itemName = ref("");
    const message = ref("");

    const addItem = async () => {
      if (!itemName.value.trim()) {
        message.value = "Itemnaam mag niet leeg zijn.";
        return;
      }

      const item = {
        name: itemName.value,
        uniqueId: `${itemName.value}-${Date.now()}` // Zorgt voor unieke ID
      };

      const result = await addUniqueItem(item);
      message.value = result.message;
      if (result.success) {
        itemName.value = ""; // Reset inputveld
      }
    };

    return { itemName, message, addItem };
  }
};
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}
input {
  margin: 10px;
  padding: 5px;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
