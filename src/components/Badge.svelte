<script>
    export let color;
    export let text;
    export let wide = false;
</script>

<span class="badgeStyle {wide ? "wide" : ""}" style="background-color: {color};">
    {text}
</span>

<style>
    .badgeStyle {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        width: 40px;
        height: 40px;
        font-size: 18px;
        font-weight: 700;
        padding: 5px 10px;
        margin-right: 10px;
    }

    .wide {
        width: 50px !important;
    }
</style>