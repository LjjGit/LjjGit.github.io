<template>
    <div class="wrap" v-for="color in colors">
        <div>{{ color.note }}</div>
        <div class="colors">
            <div class="color-item" v-for="m in color.c" :style="'--color:' + m"></div>
        </div>
    </div>
</template>

<script setup>
const colors = [
    {
        note: '简书教程 tsnes',
        c: [
            '#808080', '#bb0000', '#bf0037', '#a60084',
            '#6a00bb', '#1e00b7', '#0000b3', '#002691',
            '#002b7b', '#003e00', '#0d4800', '#223c00',
            '#662f00', '#000000', '#000000', '#000000',

            '#c8c8c8', '#ff5900', '#ff3c44', '#cc33b7',
            '#aa33ff', '#5e37ff', '#1a37ff', '#004bd5',
            '#0062c4', '#007b3c', '#15841e', '#669500',
            '#c48400', '#111111', '#090909', '#090909',

            '#ffffff', '#ff9500', '#ff846f', '#ff6fd5',
            '#cc77ff', '#996fff', '#597bff', '#5f91ff',
            '#33a2ff', '#00bfa6', '#6ad951', '#aed54d',
            '#ffd900', '#666666', '#0d0d0d', '#0d0d0d',

            '#ffffff', '#ffbf84', '#ffbbbb', '#ffbbd0',
            '#eabfff', '#ccbfff', '#b7c4ff', '#aeccff',
            '#a2d9ff', '#99e1cc', '#b7eeae', '#eef7aa',
            '#ffeeb3', '#dddddd', '#111111', '#111111',
        ],
    },
    {
        note: 'jsnes',
        c: [
            '#525252', '#B40000', '#A00000', '#B1003D',
            '#740069', '#00005B', '#00005F', '#001840',
            '#002F10', '#084A08', '#006700', '#124200',
            '#6D2800', '#000000', '#000000', '#000000',
            '#C4D5E7', '#FF4000', '#DC0E22', '#FF476B',
            '#D7009F', '#680AD7', '#0019BC', '#0054B1',
            '#006A5B', '#008C03', '#00AB00', '#2C8800',
            '#A47200', '#000000', '#000000', '#000000',
            '#F8F8F8', '#FFAB3C', '#FF7981', '#FF5BC5',
            '#FF48F2', '#DF49FF', '#476DFF', '#00B4F7',
            '#00E0FF', '#00E375', '#03F42B', '#78B82E',
            '#E5E218', '#787878', '#000000', '#000000',
            '#FFFFFF', '#FFF2BE', '#F8B8B8', '#F8B8D8',
            '#FFB6FF', '#FFC3FF', '#C7D1FF', '#9ADAFF',
            '#88EDF8', '#83FFDD', '#B8F8B8', '#F5F8AC',
            '#FFFFB0', '#F8D8F8', '#000000', '#000000',
        ],
    },
];
</script>

<style>
.wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.colors {
    display: flex;
    flex-wrap: wrap;
    --item-width: 50px;
    width: calc(var(--item-width) * 16);
    margin: 0 auto;
}
.color-item {
    width: var(--item-width);
    height: var(--item-width);
    background-color: var(--color);
}
</style>
