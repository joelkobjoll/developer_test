import axios from 'axios';

const client = axios.create({
    baseURL: `http://data.fixer.io/api`,
});

export const Fixer = {
    async execute(method: string, resource: string, params?: object) {
        return client({
            method,
            url: `${resource}${!resource.match(/\?/) ? '?' : '&'}access_key=51eabf2e167aed7d6114592ccdb0b0cc`,
            data: params,
        }).then((req: any) => {
            return req.data;
        });
    },
    getSupportedSymbols() {
        return this.execute('get', '/symbols');
    },
    getLatestRates(base: string, symbols: string[]) {
        return this.execute('get', `/latest?base=${base}&symbols=${symbols.join(',')}`);
    },
    getConversion(from: string, to: string, amount: number) {
        return this.execute('get', `/convert?from=${from}&to=${to}&amount=${amount}`);
    },
};
