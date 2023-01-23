<script>
	import { page } from '$app/stores';
	import Badge from '../../../components/Badge.svelte';
	import Time from '../../../components/Time.svelte';
	import { fetchDepartures } from '../../../lib/departures.js';
	import { idToName, nameToId } from '../../../data/stations';
	import Departures from '../../../components/Departures.svelte';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	// Create an empty array if the local storage item does not exist
	if (!localStorage.getItem('favoriteStations')) {
		localStorage.setItem('favoriteStations', JSON.stringify([]));
	}

	// If the local storage item exists, but is not an array, reset it
	if (!Array.isArray(localStorage.getItem('favoriteStations'))) {
		localStorage.setItem('favoriteStations', JSON.stringify([]));
	}

	// Get the favoriteStations array from local storage
	let favoriteStations = JSON.parse(localStorage.getItem('favoriteStations'));

	const setFavorite = (stationName) => {
		const stationId = nameToId[stationName];
		if (favoriteStations.includes(stationId)) {
			favoriteStations = favoriteStations.filter((id) => id !== stationId);
		} else {
			favoriteStations = [...favoriteStations, stationId];
		}
		localStorage.setItem('favoriteStations', JSON.stringify(favoriteStations));
	};

	let data = {
		stog: [],
		metro: [],
		train: [],
		bus: []
	};
	const stationId = $page.params.id;
	const stationName = idToName[stationId];

	const doPoll = () => async () => {
		data = await fetchDepartures(stationId);
	};
	(async () => {
		data = await fetchDepartures(stationId);
	})();
	setInterval(doPoll(), 10000);

	const [send, receive] = crossfade({});
</script>

<svelte:head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</svelte:head>

<div class="container">
	<div>
		<h1 class="text-5xl inline-block">{stationName}</h1>
		<button class="inline-block ml-8" type="button" on:click={setFavorite(stationName)}>
			{#if favoriteStations.includes(nameToId[stationName])}
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
					<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
					<path
						d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
				</svg>
			{/if}
		</button>
	</div>
	<br />
	<div class="panel-group" role="tablist" aria-multiselectable="true">
		{#if data['stog'].length > 0}
			<div class="panel panel-default">
				<div class="panel-heading active" role="tab" id="headingStog">
					<h2 class="panel-title">
						<a role="button" data-toggle="collapse" href="#collapseStog" aria-expanded="true" aria-controls="collapseStog">
							<i style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/stog.svg')" />
							S-Tog
						</a>
					</h2>
				</div>
				<div id="collapseStog" class="panel-collapse collapse in" style="visibility: visible !important" role="tabpanel" aria-labelledby="headingStog">
					<!-- <div class="panel-body"> -->
					<ul class="list-group">
						{#each data['stog'] as STogDeparture (STogDeparture['index'])}
							<li class="list-group-item !flex justify-between" animate:flip in:receive={{ key: STogDeparture['direction'] }} out:send={{ key: STogDeparture['direction'] }}>
								<div class="flex items-center text-4xl">
									<Badge color={STogDeparture['color']} text={STogDeparture['colorText']} />
									{STogDeparture['direction']}
								</div>
								<Departures departures={STogDeparture['departures']} color={STogDeparture['color']} />
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
						<a role="button" data-toggle="collapse" href="#collapseBus" aria-expanded="true" aria-controls="collapseBus">
							<i style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/bus.svg')" />
							Bus
						</a>
					</h2>
				</div>
				<div id="collapseBus" class="panel-collapse collapse in" style="visibility: visible !important" role="tabpanel" aria-labelledby="headingBus">
					<ul class="list-group">
						{#each data['bus'] as BusDeparture (BusDeparture['index'])}
							<li class="list-group-item !flex justify-between" animate:flip in:receive={{ key: BusDeparture['direction'] }} out:send={{ key: BusDeparture['direction'] }}>
								<div class="flex items-center text-4xl">
									<Badge color={BusDeparture['color']} text={BusDeparture['colorText']} wide={true} />
									{BusDeparture['direction']}
								</div>
								<Departures departures={BusDeparture['departures']} color={BusDeparture['color']} />
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
						<a role="button" data-toggle="collapse" href="#collapseTrain" aria-expanded="true" aria-controls="collapseTrain">
							<i style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/train.svg')" />
							Train
						</a>
					</h2>
				</div>
				<div id="collapseTrain" class="panel-collapse collapse in" style="visibility: visible !important" role="tabpanel" aria-labelledby="headingTrain">
					<ul class="list-group">
						{#each data['train'] as TrainDeparture (TrainDeparture['index'])}
							<li class="list-group-item !flex justify-between" animate:flip in:receive={{ key: TrainDeparture['direction'] }} out:send={{ key: TrainDeparture['direction'] }}>
								<div class="flex items-center text-4xl">
									<Badge color={TrainDeparture['color']} text={TrainDeparture['colorText']} />
									{TrainDeparture['direction']}
								</div>
								<Departures departures={TrainDeparture['departures']} color={TrainDeparture['color']} />
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
						<a role="button" data-toggle="collapse" href="#collapseMetro" aria-expanded="true" aria-controls="collapseMetro">
							<i style="vertical-align: middle; display: inline-block; height: 30px; width: 30px; background-image: url('/metro.svg')" />
							Metro
						</a>
					</h2>
				</div>
				<div id="collapseMetro" class="panel-collapse collapse in" style="visibility: visible !important" role="tabpanel" aria-labelledby="headingMetro">
					<ul class="list-group">
						{#each data['metro'] as MetroDeparture (MetroDeparture['index'])}
							<li class="list-group-item !flex justify-between" animate:flip in:receive={{ key: MetroDeparture['direction'] }} out:send={{ key: MetroDeparture['direction'] }}>
								<div class="flex items-center text-4xl">
									<Badge color={MetroDeparture['color']} text={MetroDeparture['colorText']} />
									{MetroDeparture['direction']}
								</div>
								<Departures departures={MetroDeparture['departures']} color={MetroDeparture['color']} />
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
