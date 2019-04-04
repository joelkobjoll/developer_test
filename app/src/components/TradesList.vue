<template>
    <b-container>
        <div class="trades">
            <h1 class="h4 text-left">Booked Trades</h1>

            <hr>

            <div class="clearfix pb-3">
                <b-button variant="outline-primary float-right" to="/new-trade">New Trade</b-button>
            </div>

            <template v-if="loading">
                <b-alert :show="loading" variant="info">Loading...</b-alert>
            </template>

            <template v-else-if="tradesList.length">
                <b-table 
                    id="tradesList" 
                    striped 
                    hover 
                    :items="tradesList" 
                    :fields="tradesFields" 
                    :per-page="perPage"
                    :current-page="currentPage"></b-table>
                <b-pagination
                    v-model="currentPage"
                    :total-rows="tradesList.length"
                    :per-page="perPage"
                    aria-controls="tradesList"></b-pagination>
            </template>

            <template v-else>
                <b-alert :show="!tradesList.length" variant="warning">No booked trades are avaiable</b-alert>
            </template>
        </div>
    </b-container>
</template>

<script>
    import {
        Trades,
    } from '@/controller/trades';
    import {
        formatDate,
    } from '@/partials/date';

    export default {
        data() {
            return {
                loading: false,
                page: 1,
                currentPage: 1,
                perPage: 10,
                tradesFields: [
                    {
                        key: 'sell_currency',
                        label: 'Sell CCY',
                        sortable: false,
                    },
                    {
                        key: 'sell_amount',
                        sortable: false,
                    },
                    {
                        key: 'buy_currency',
                        label: 'Buy CCY',
                        sortable: false,
                    },
                    {
                        key: 'buy_amount',
                        sortable: false,
                    },
                    {
                        key: 'rate',
                        sortable: false,
                    },
                    {
                        formatter: formatDate,
                        key: 'booked',
                        label: 'Date Booked',
                        sortable: true,
                    },
                ],
                tradesList: [],
            };
        },
        created() {
            this.refreshTradesList();
        },
        methods: {
            async refreshTradesList() {
                this.loading = true;
                this.tradesList = await Trades.getTrades();
                this.loading = false;
            },
        },
    };
</script>

<style scoped lang="scss">
    
</style>
