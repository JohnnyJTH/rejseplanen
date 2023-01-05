<script>
	import { addNotification } from '../components/notificationStore';
	import Station from '../components/Station.svelte';
	import { idToName, nameToId } from '../data/stations';
	import { goto } from '$app/navigation';

	let stations = [];

	const filterStations = () => {
		let storageArr = [];
        let repeated = []
		if (inputValue) {
			Object.values(idToName).forEach((station) => {
				if (station.toLowerCase().startsWith(inputValue.toLowerCase())) {
                    if (repeated.includes(station)) return
					storageArr = [...storageArr, makeMatchBold(station)];
                    repeated.push(station)
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
			goto(`/timetable/${nameToId[inputValue]}`)
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
</script>

<svelte:window on:keydown={navigateList} />

<form autocomplete="off" on:submit|preventDefault={submitValue}>
	<div class="autocomplete">
		<input
			id="station-input"
			type="text"
			placeholder="Search for a station..."
			bind:this={searchInput}
			bind:value={inputValue}
			on:input={filterStations}
		/>
	</div>

	<input type="submit" />

	{#if stations.length > 0}
		<ul id="autocomplete-items-list">
			{#each stations as name, i}
				<Station
					stationName={name}
					highlighted={i === highlightIndex}
					on:click={() => setInputVal(name)}
				/>
			{/each}
		</ul>
	{/if}
</form>

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
</style>
