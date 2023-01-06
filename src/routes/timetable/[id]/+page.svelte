<script>
	import Badge from '../../../components/Badge.svelte';
	import Time from '../../../components/Time.svelte';

	export let data;
</script>

<svelte:head>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</svelte:head>

<div class="container">
	<h1 class="text-5xl">{data['stationName']}</h1>
	<br />
	<div class="panel-group" role="tablist" aria-multiselectable="true">
		{#if data['stog'].length > 0}
			<div class="panel panel-default">
				<div class="panel-heading active" role="tab" id="headingStog">
					<h2 class="panel-title">
						<a
							role="button"
							data-toggle="collapse"
							href="#collapseStog"
							aria-expanded="true"
							aria-controls="collapseStog"
						>
							<i
								style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/stog.svg')"
							/> S-Tog
						</a>
					</h2>
				</div>
				<div
					id="collapseStog"
					class="panel-collapse collapse in"
					style="visibility: visible !important"
					role="tabpanel"
					aria-labelledby="headingStog"
				>
					<!-- <div class="panel-body"> -->
					<ul class="list-group">
						{#each data['stog'] as STogDeparture}
							<li class="list-group-item">
								<Badge color={STogDeparture['color']} text={STogDeparture['colorText']} />
								{STogDeparture['direction']}
								<Time time={STogDeparture['time']} delay={STogDeparture['delay']} />
							</li>
						{/each}
					</ul>
					<!-- </div> -->
				</div>
			</div>
		{/if}
		{#if data['bus'].length > 0}
			<div class="panel panel-default">
				<div class="panel-heading active" role="tab" id="headingBus">
					<h2 class="panel-title">
						<a
							role="button"
							data-toggle="collapse"
							href="#collapseBus"
							aria-expanded="true"
							aria-controls="collapseBus"
						>
							<i
								style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/bus.svg')"
							/> Bus
						</a>
					</h2>
				</div>
				<div
					id="collapseBus"
					class="panel-collapse collapse in"
					style="visibility: visible !important"
					role="tabpanel"
					aria-labelledby="headingBus"
				>
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
				<div class="panel-heading active" role="tab" id="headingTrain">
					<h2 class="panel-title">
						<a
							role="button"
							data-toggle="collapse"
							href="#collapseTrain"
							aria-expanded="true"
							aria-controls="collapseTrain"
						>
							<i
								style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/train.svg')"
							/> Train
						</a>
					</h2>
				</div>
				<div
					id="collapseTrain"
					class="panel-collapse collapse in"
					style="visibility: visible !important"
					role="tabpanel"
					aria-labelledby="headingTrain"
				>
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
				<div class="panel-heading active" role="tab" id="headingMetro">
					<h2 class="panel-title">
						<a
							role="button"
							data-toggle="collapse"
							href="#collapseMetro"
							aria-expanded="true"
							aria-controls="collapseMetro"
						>
							<i
								style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/metro.svg')"
							/> Metro
						</a>
					</h2>
				</div>
				<div
					id="collapseMetro"
					class="panel-collapse collapse in"
					style="visibility: visible !important"
					role="tabpanel"
					aria-labelledby="headingMetro"
				>
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
				<div class="panel-heading active" role="tab" id="headingFerry">
					<h2 class="panel-title">
						<a
							role="button"
							data-toggle="collapse"
							href="#collapseFerry"
							aria-expanded="true"
							aria-controls="collapseFerry"
						>
							<i
								style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/bus.svg')"
							/> Ferry
						</a>
					</h2>
				</div>
				<div
					id="collapseFerry"
					class="panel-collapse collapse in"
					style="visibility: visible !important"
					role="tabpanel"
					aria-labelledby="headingFerry"
				>
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

<style>
	.panel-heading {
		padding: 0;
		border: 0;
	}
	.panel-title > a,
	.panel-title > a:active {
		display: block;
		padding: 10px;
		color: #555;
		font-size: 16px;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 1px;
		word-spacing: 3px;
		text-decoration: none;
	}
	.panel-heading a:before {
		font-family: 'Glyphicons Halflings';
		content: '\e114';
		float: right;
		transition: all 0.5s;
	}
	.panel-heading a:not(.collapsed):before {
		-webkit-transform: rotate(180deg);
		-moz-transform: rotate(180deg);
		transform: rotate(180deg);
	}
</style>
