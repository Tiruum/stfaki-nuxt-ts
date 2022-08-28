<template>
    <svg id="dasrLogo" :class="classes" data-name="dasrLogo" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 85.81 102">
        {{decor}}
        <path :style="decor" d="M41.84,19.63a4,4,0,1,0-5.5-1.37A4,4,0,0,0,41.84,19.63Z" />
        <path :style="decor" d="M30.85,21.3a2.83,2.83,0,1,0-3.89-1A2.83,2.83,0,0,0,30.85,21.3Z" />
        <path :style="decor" d="M57,19.57a5.78,5.78,0,1,0-7.93-2A5.77,5.77,0,0,0,57,19.57Z" />
        <path :style="decor"
            d="M30.37,56.22l2.76-3.63c-10.46-4.39-19.53-9.41-21-15-.64-2.47.27-5.07,2.77-7.95a26.29,26.29,0,0,1,8.85-6.24l-1.75-4A30.85,30.85,0,0,0,11.6,26.72c-3.47,4-4.71,8-3.7,11.92C9.76,45.88,19,51.36,30.37,56.22Z" />
        <path :style="decor"
            d="M62.71,100.76,79.63,1,1,100.9h.09a41.37,41.37,0,0,1,61.62-.14Zm-15-27.9a10.69,10.69,0,1,1,13.91-5.92A10.69,10.69,0,0,1,47.7,72.86Z" />
        <path :style="decor"
            d="M81.23,75.81a27.24,27.24,0,0,0-9.15-6.5l-.67,4a22.48,22.48,0,0,1,6.89,5.06c2.21,2.55,3,4.85,2.45,7-1,4-6.4,7.63-13.25,10.93L66.71,101c9.1-4.07,16.27-8.68,17.8-14.64C85.4,82.9,84.3,79.35,81.23,75.81Z" />
    </svg>
</template>

<script>
export default {
    name: 'DasrLogo',
    props: {
        classes: {
            type: String,
            default: "#fff"
        },
        fill: {
            type: String,
            default: "#000"
        },
        strokeColor: {
            type: String,
            default: "none"
        },
        strokeWidth: {
            type: String,
            default: "none"
        },
        strokeLinecapType: {
            type: String,
            default: "round"
        },
        strokeLinejoinType: {
            type: String,
            default: "round"
        }
    },
    data() {
        return {
            decor: {
                fill: this.fill,
                stroke: this.strokeColor,
                strokeLinecap: this.strokeLinecapType,
                strokeLinejoin: this.strokeLinejoinType,
                strokeWidth: this.strokeWidth
            }
        }
    }
}
</script>

<style scope>

</style>