<script>
	import Badge from "../../../components/Badge.svelte";
	import Time from "../../../components/Time.svelte";

	export let data;
</script>

<div class="container">
	<div class="panel-group">
		{#if data['stog'].length > 0}
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
		{/if}
		{#if data['bus'].length > 0}
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
		{/if}
		{#if data['train'].length > 0}
		<div class="panel panel-default">
			<div class="panel-heading cursor-pointer">
				<h2 class="panel-title" data-toggle="collapse" data-target="#collapseTrain">
					<i style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/train.svg')" /> Train
				</h2>
			</div>
			<div id="collapseTrain" class="panel-collapse collapse in" style="visibility: visible !important"> <!-- visibility: visible fordi bootstrap er whack -->
				<ul class="list-group">
					{#each data['train'] as TrainDeparture}
						<li class="list-group-item">
                            <Badge color={TrainDeparture['color']} text={TrainDeparture['colorText']} />
                            {TrainDeparture['direction']}
                            <Time time={TrainDeparture['time']} delay={TrainDeparture['delay']} />
                        </li>
					{/each}
                </ul>
			</div>
		</div>
		{/if}
		{#if data['metro'].length > 0}
		<div class="panel panel-default">
			<div class="panel-heading cursor-pointer">
				<h2 class="panel-title" data-toggle="collapse" data-target="#collapseMetro">
					<i style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/metro.svg')" /> Metro
				</h2>
			</div>
			<div id="collapseMetro" class="panel-collapse collapse in" style="visibility: visible !important"> <!-- visibility: visible fordi bootstrap er whack -->
				<ul class="list-group">
					{#each data['metro'] as MetroDeparture}
						<li class="list-group-item">
                            <Badge color={MetroDeparture['color']} text={MetroDeparture['colorText']} />
                            {MetroDeparture['direction']}
                            <Time time={MetroDeparture['time']} delay={MetroDeparture['delay']} />
                        </li>
					{/each}
                </ul>
			</div>
		</div>
		{/if}
		{#if data['ferry'].length > 0}
		<div class="panel panel-default">
			<div class="panel-heading cursor-pointer">
				<h2 class="panel-title" data-toggle="collapse" data-target="#collapseFerry">
					<i style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/bus.svg')" /> Ferry
				</h2>
			</div>
			<div id="collapseFerry" class="panel-collapse collapse in" style="visibility: visible !important"> <!-- visibility: visible fordi bootstrap er whack -->
				<ul class="list-group">
					{#each data['ferry'] as FerryDeparture}
						<li class="list-group-item">
                            <Badge color={FerryDeparture['color']} text={FerryDeparture['colorText']} />
                            {FerryDeparture['direction']}
                            <Time time={FerryDeparture['time']} delay={FerryDeparture['delay']} />
                        </li>
					{/each}
                </ul>
			</div>
		</div>
		{/if}
	</div>
</div>
