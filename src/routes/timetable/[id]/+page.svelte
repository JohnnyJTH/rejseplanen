<script>
	import Badge from "../../../components/Badge.svelte";
	import Time from "../../../components/Time.svelte";

	export let data;
</script>

<div class="container">
	<div class="panel-group">
		<div class="panel panel-default">
			<div class="panel-heading cursor-pointer">
				<h2 class="panel-title" data-toggle="collapse" data-target="#collapseStog">
                    <i style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/stog.svg')" /> S-Tog
				</h2>
			</div>
			<div id="collapseStog" class="panel-collapse collapse in" style="visibility: visible !important"> <!-- visibility: visible fordi bootstrap er whack -->
				<ul class="list-group">
					{#each data['stog'] as STogDeparture}
						<li class="list-group-item">
                            <Badge color={STogDeparture['color']} text={STogDeparture['colorText']} />
                            {STogDeparture['direction']}
                            <Time time={STogDeparture['time']} delay={STogDeparture['delay']} />
                        </li>
					{/each}
                </ul>
			</div>
		</div>
		<div class="panel panel-default">
			<div class="panel-heading cursor-pointer">
				<h2 class="panel-title" data-toggle="collapse" data-target="#collapseBus">
					<i style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/bus.svg')" /> Bus
				</h2>
			</div>
			<div id="collapseBus" class="panel-collapse collapse in" style="visibility: visible !important"> <!-- visibility: visible fordi bootstrap er whack -->
				<ul class="list-group">
					{#each data['bus'] as BusDeparture}
						<li class="list-group-item">
                            <Badge color={BusDeparture['color']} text={BusDeparture['colorText']} />
                            {BusDeparture['direction']}
                            <Time time={BusDeparture['time']} delay={BusDeparture['delay']} />
                        </li>
					{/each}
                </ul>
			</div>
		</div>
	</div>
</div>
