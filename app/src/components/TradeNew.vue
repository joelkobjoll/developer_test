<template>
    <b-container>
        <div class="trades">
            <h1 class="h4 text-left">New trade</h1>

            <hr>

            <template v-if="loading">
                <b-alert variant="info">Loading...</b-alert>
            </template>

            <template v-else-if="message.show">
                <b-alert :variant="message.type" show>{{ message.txt }}</b-alert>
            </template>

            <template v-else>
                <b-form @submit.prevent="createTrade">
                    <b-row>
                        <b-col>
                            <b-form-group label="Sell Currency:" label-for="sell_currency">
                                <b-form-select name="sell_currency" v-model="form.sell_currency" required>
                                    <option 
                                        v-for="(value, key) in currencyOptions" 
                                        :key="key"
                                        :value="key">{{key}}: {{ value }}</option>
                                </b-form-select>
                            </b-form-group>

                            <b-form-group label="Sell amount:" label-for="sell_amount">
                                <b-form-input 
                                    min="1"
                                    placeholder="Enter Sell Amount"
                                    required
                                    type="number" 
                                    v-model="form.sell_amount" 
                                    v-on:keyup="getConversionRate"></b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col>
                            <b-form-group label="Rate:" label-for="rate">
                                {{ form.rate }}
                            </b-form-group>
                        </b-col>

                        <b-col>
                            <b-form-group label="Buy Currency:" label-for="buy_currency">
                                <b-form-select 
                                    name="buy_currency"
                                    v-model="form.buy_currency"
                                    @change="getConversionRate"
                                    :disabled="null === form.sell_currency"
                                    required>
                                    <option :value="null">Please select Buy Currency</option>
                                    <option 
                                        v-for="(value, key) in currencyOptions" 
                                        v-show="key !== form.sell_currency"
                                        :key="key"
                                        :value="key">{{key}}: {{ value }}</option>
                                </b-form-select>
                            </b-form-group>

                            <b-form-group label="Buy amount:" label-for="buy_amount">
                                <b-form-input 
                                    v-model="form.buy_amount" 
                                    type="number" 
                                    disabled></b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" class="w-100 clearfix">
                            <b-button type="submit" variant="primary float-left">Create</b-button>
                            <b-button variant="outline-primary float-right" to="/">Cancel</b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </template>
        </div>
    </b-container>
</template>

<script>
    import {
        Trades,
    } from '@/controller/trades';
    import {
        Fixer,
    } from '@/controller/fixer.io';
    import {
        validateNumber,
    } from '@/partials/validate';

    export default {
        data() {
            return {
                loading: false,
                currencyOptions: [],
                message: {
                    show: false,
                    txt: '',
                    type: '',
                },
                form: {
                    buy_amount: (0).toFixed(2),
                    buy_currency: 'USD',
                    rate: (0).toFixed(4),
                    sell_amount: (0).toFixed(2),
                    sell_currency: 'EUR',
                },
                formValidation: {},
            };
        },
        async created() {
            await this.refreshCurrencyOptions();
            this.getConversionRate();
        },
        methods: {
            async createTrade() {
                let messageTxt = 'Trade was added successfully.';
                let messageType = 'success';
                try {
                    const request = await Trades.createTrade(this.form);
                    this.form.buy_amount = (0).toFixed(2);
                    this.form.buy_currency = 'USD';
                    this.form.rate = (0).toFixed(4);
                    this.form.sell_amount = (0).toFixed(2);
                    this.form.sell_currency = 'EUR';
                } catch (error) {
                    messageType = 'error';
                    messageTxt = `Error: ${error}.`;
                }
                this.showMessage(messageTxt, messageType);
            },
            async refreshCurrencyOptions() {
                this.loading = true;
                const request = await Fixer.getSupportedSymbols();
                if (request.success) {
                    this.currencyOptions = request.symbols;
                }
                this.loading = false;
            },
            async getConversionRate() {
                if (this.form.sell_currency && this.form.buy_currency) {
                    const request = await Fixer.getLatestRates(this.form.sell_currency, [this.form.buy_currency]);
                    if (request.success) {
                        this.form.rate = request.rates[this.form.buy_currency];
                        this.updateConversion();
                    }
                }
            },
            updateConversion() {
                this.form.buy_amount = ((this.form.sell_amount * this.form.rate) || 0).toFixed(2);
            },
            showMessage(txt, type, timeout = 5000) {
                this.message.show = true;
                this.message.txt = txt;
                this.message.type = type;
                setTimeout(() => this.message.show = false, timeout);
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    
</style>
