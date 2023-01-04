<script>
    export let color;
    export let text;
</script>

<span class="badgeStyle" style="background-color: {color};">
    {text}
</span>

<style>
    .badgeStyle {
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        padding: 5px 10px;
        margin-right: 10px;
    }
</style>