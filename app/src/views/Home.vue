<template>
  <div class="home">
    <TradesList/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TradesList from '@/components/TradesList.vue'; // @ is an alias to /src

@Component({
  components: {
    TradesList,
  },
})
export default class Home extends Vue {}
</script>
