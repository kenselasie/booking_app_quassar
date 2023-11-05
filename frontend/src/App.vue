<template>
  <div>
  <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Important Note</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Note: To make the backend service work, you need to enable a COR service that allows
          acceess temporarily.
          <a href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank">Click here</a> to access it and click <b>Request temporary access to the demo server</b>:
          <br>
          You shohuld see a successfully message <b>You currently have temporary access to the demo server.</b>
          After, get back to this page and refresh, the backend should serve as expected

          <br>
          <br>
          Ignore this alert if the step is already completed.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup () {
    const alert = ref(true)

    return {
      alert
    }
  }
});
</script>
