<template>
   <div class="q-pa-md q-gutter-sm">
    <q-btn color="white" text-color="black" label="Standard" />
    <q-btn color="primary" label="Primary" />
    <q-btn color="secondary" label="Secondary" />
    <q-btn color="amber" glossy label="Amber" />
    <q-btn color="brown-5" label="Brown 5" />
    <q-btn color="deep-orange" glossy label="Deep Orange" />
    <q-btn color="purple" label="Purple" />
    <q-btn color="black" label="Black" />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import { useQuasar, QVueGlobals } from 'quasar';

// Optional: Add a name for debugging purposes

// Use Quasar instance with TypeScript support
const $q: QVueGlobals = useQuasar();

// Log whether the platform is iOS
console.log($q.platform.is.ios);

// Example method to demonstrate usage of $q
function show(): void {
  // Prints out Quasar version
  console.log($q.version);
}


</script>