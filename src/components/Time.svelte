<script>
    export let time;
    export let delay;
</script>

<span class="time">
    {time}
    {#if delay}
        <span class="delay">+{delay}</span>
    {/if}
</span>

<style>
    .time {
        float: right;
        font-size: 15px;
        font-weight: 600;
    }
    .delay {
        color: #ff0000;
        font-size: 15px;
        font-weight: 400;
    }
</style>