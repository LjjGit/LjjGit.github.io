<template>
    <div class="mb-2" v-for="(c, index) in calc" :key="c.id">
        <div><input class="form-control"
                    type="text"
                    v-last-focus="index + 1 === calc.length"
                    v-model="c.expression"
                    @keyup.enter="handleCalcClick(c)"></div>
        <div class="mt-2">{{ c.result }}</div>
        <div class="mt-2"><button class="btn btn-danger" @click="handleCalcClick(c)">计算</button></div>
    </div>

    <div><button class="btn btn-primary" @click="addCalcItem">＋新增</button></div>

    <div class="mt-4">
        <RouterLink to="/">tools</RouterLink> | <a href="https://mathjs.org">https://mathjs.org</a>
    </div>
</template>

<script setup>
import { create, all } from 'mathjs';
import { ref } from 'vue';

const math = create(all, {
    number: 'BigNumber',      // Default type of number:
                              // 'number' (default), 'BigNumber', or 'Fraction'
    precision: 64,            // Number of significant digits for BigNumbers
    relTol: 1e-60,
    absTol: 1e-63,
});

let calcId = 0;
const calc = ref([]);
const addCalcItem = () => {
    calc.value.push({
        id: calcId++,
        expression: '',
        result: '',
    });
};

addCalcItem();

const handleCalcClick = (c) => {
    c.result = math.evaluate(
        c.expression
            .replaceAll('（', '(')
            .replaceAll('）', ')')
            .replaceAll('＋', '+')
            .replaceAll('×', '*')
            .replaceAll('÷', '/')
    );
};

const vLastFocus = {
    mounted(el, binding) {
        if (binding) {
            el.focus();
        }
    },
};
</script>
