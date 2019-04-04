<template>
  <div class="trade-new">
    <TradeNew/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TradeNew from '@/components/TradeNew.vue'; // @ is an alias to /src

@Component({
  components: {
    TradeNew,
  },
})
export default class extends Vue {}
</script>
