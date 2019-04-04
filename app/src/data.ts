(require as any)('dotenv').config({ path: '../env/.env' });

import Vue from 'vue';

const data: any = {};

data.install = () => {
    Object.defineProperty(Vue.prototype, '$global', {
        get() {
            return data ;
        },
    });
};

export default data;
