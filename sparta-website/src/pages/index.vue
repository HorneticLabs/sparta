<template>
  <v-container fluid class="d-flex align-center justify-center" style="height: 100vh;">
    <v-card class="pa-8" max-width="500" elevation="2" rounded>
      <v-card-text class="text-center">
        <v-img
          src="@/assets/sparta-title.png"
          alt="Sparta Title"
          contain
          class="mb-4"
          max-height="600"
        />
        <v-btn class="ma-2" color="primary" @click="joinDiscord">
          Join Our Discord
        </v-btn>
        <v-btn class="ma-2" color="secondary" disabled>
          Members
        </v-btn>
        <v-btn class="ma-2" color="secondary" @click="goToCodeOfHonor">
          Code of Honor
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function joinDiscord() {
  window.open("https://discord.com/invite/Howdidyougethere?", "_blank");
}

function goToCodeOfHonor() {
  router.push('/code-of-honor');
}
</script>
