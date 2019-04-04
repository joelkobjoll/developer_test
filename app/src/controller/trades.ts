import axios from 'axios';

const client = axios.create({
    baseURL: `${window.location.protocol}//localhost:8000/api`,
});

export const Trades = {
    async execute(method: string, resource: string, params?: object) {
        return client({
            method,
            url: resource,
            data: params,
        }).then((req: any) => {
            return req.data;
        });
    },
    getTrades() {
        return this.execute('get', '/trades?format=json');
    },
    getTrade(id: string) {
        return this.execute('get', `/trades/${id}`);
    },
    createTrade(params: object) {
        return this.execute('post', '/trades', params);
    },
    updateTrade(id: string, params: object) {
        return this.execute('put', `/trades/${id}`, params);
    },
    deleteTrade(id: string) {
        return this.execute('delete', `/trades/${id}`);
    },
};
