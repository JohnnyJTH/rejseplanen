<script>
	import { addNotification } from '../components/notificationStore.js';
	import { idToName, nameToId } from '../data/stations';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';

	if (!localStorage.getItem('favoriteStations')) {
		localStorage.setItem('favoriteStations', JSON.stringify([]));
	}
	let favoriteStations = JSON.parse(localStorage.getItem('favoriteStations'));

	let stations = [];

	const filterStations = () => {
		let storageArr = [];
		let repeated = [];
		if (inputValue) {
			Object.values(idToName).forEach((station) => {
				if (station.toLowerCase().startsWith(inputValue.toLowerCase())) {
					if (repeated.includes(station)) return;
					storageArr = [...storageArr, makeMatchBold(station)];
					repeated.push(station);
				}
			});
		}
		stations = storageArr;
	};

	let searchInput;
	let inputValue = '';

	$: if (!inputValue) {
		stations = [];
		highlightIndex = null;
	}

	const clearInput = () => {
		inputValue = '';
		searchInput.focus();
	};

	const setInputVal = (stationName) => {
		inputValue = removeBold(stationName);
		stations = [];
		highlightIndex = null;
		document.querySelector('#station-input').focus();
	};

	const submitValue = () => {
		if (inputValue) {
			goto(`/timetable/${nameToId[inputValue]}`);
		} else {
			addNotification("You didn't type anything.", 'info');
		}
	};

	const makeMatchBold = (str) => {
		let matched = str.substring(0, inputValue.length);
		let makeBold = `<strong>${matched}</strong>`;
		let boldedMatch = str.replace(matched, makeBold);
		return boldedMatch;
	};

	const removeBold = (str) => {
		return str.replace(/<(.)*?>/g, '');
	};

	let highlightIndex = null;

	const navigateList = (e) => {
		if (e.key === 'ArrowDown' && highlightIndex <= stations.length - 1) {
			highlightIndex === null ? (highlightIndex = 0) : (highlightIndex += 1);
		} else if (e.key === 'ArrowUp' && highlightIndex !== null) {
			highlightIndex === 0 ? (highlightIndex = stations.length - 1) : (highlightIndex -= 1);
		} else if (e.key === 'Enter') {
			setInputVal(stations[highlightIndex]);
		} else {
			return;
		}
	};

	const setFavorite = (stationName) => {
		let stationId = nameToId[stationName];
		if (favoriteStations.includes(stationId)) {
			favoriteStations = favoriteStations.filter((id) => id !== stationId);
		} else {
			favoriteStations = [...favoriteStations, stationId];
		}
		localStorage.setItem('favoriteStations', JSON.stringify(favoriteStations));
	};
</script>

<svelte:window on:keydown={navigateList} />

<div class="container mx-auto">
	<form autocomplete="off" on:submit|preventDefault={submitValue}>
		<div class="autocomplete">
			<input id="station-input" type="text" placeholder="Search for a station..." bind:this={searchInput} bind:value={inputValue} on:input={filterStations} />
		</div>

		<input value="See departures" type="submit" />

		{#if stations.length > 0}
			<ul id="autocomplete-items-list">
				{#each stations as name, i}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li class="autocomplete-items" class:autocomplete-active={i === highlightIndex} on:click={setInputVal(name)}>
						{@html name}
						<button type="button" on:click={setFavorite(removeBold(name))}>
							{#if favoriteStations.includes(nameToId[removeBold(name)])}
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
									<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
								</svg>
							{:else}
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
									<path
										d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
								</svg>
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</form>

	<div class="w-full max-w-md mt-10 md:m-10 bg-white border rounded-lg shadow-md p-4 md:p-8">
		<div class="flex items-center justify-between mb-4">
			<h5 class="text-xl font-bold leading-none text-gray-900">Favorites</h5>
		</div>
		{#if favoriteStations.length > 0}
			<div class="flow-root">
				<ul class="divide-y divide-gray-200">
					{#each favoriteStations as station}
						<li class="py-3" in:slide out:slide>
							<div class="flex">
								<div class="p-4 bg-slate-50 border rounded-lg shadow w-full focus:outline-none hover:bg-slate-100 focus:ring-4 focus:ring-gray-200">
									<a href="/timetable/{station}">
										<div class="flex items-center space-x-4">
											<div class="flex-1 min-w-0">
												<p class="text-sm font-medium text-gray-900 truncate">{idToName[station]}</p>
												<p class="text-sm text-gray-500 truncate">{station}</p>
											</div>
										</div>
									</a>
								</div>
								<button class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 ml-4" type="button" on:click={setFavorite(idToName[station])}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
										<path
											d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
									</svg>
								</button>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<p class="text-sm text-gray-500">You have no favorites.</p>
		{/if}
	</div>
</div>

<style>
	div.autocomplete {
		/*the container must be positioned relative:*/
		position: relative;
		display: inline-block;
		width: 300px;
	}
	input {
		border: 1px solid transparent;
		background-color: #f1f1f1;
		padding: 10px;
		font-size: 16px;
		margin: 0;
	}
	input[type='text'] {
		background-color: #f1f1f1;
		width: 100%;
	}
	input[type='submit'] {
		background-color: DodgerBlue;
		color: #fff;
	}

	#autocomplete-items-list {
		position: relative;
		margin: 0;
		padding: 0;
		top: 0;
		width: 297px;
		border: 1px solid #ddd;
		background-color: #ddd;
	}

	li.autocomplete-items {
		list-style: none;
		border-bottom: 1px solid #d4d4d4;
		z-index: 99;
		/*position the autocomplete items to be the same width as the container:*/
		top: 100%;
		left: 0;
		right: 0;
		padding: 10px;
		cursor: pointer;
		background-color: #fff;
	}

	li.autocomplete-items:hover {
		/*when hovering an item:*/
		background-color: DodgerBlue !important;
		color: white;
	}

	li.autocomplete-items:active {
		/*when navigating through the items using the arrow keys:*/
		background-color: DodgerBlue !important;
		color: #ffffff;
	}

	.autocomplete-active {
		/*when navigating through the items using the arrow keys:*/
		background-color: DodgerBlue !important;
		color: #ffffff;
	}
</style>
