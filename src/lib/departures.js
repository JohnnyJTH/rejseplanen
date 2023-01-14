const STogColors = {
    "A": "#00a7e3",
    "B": "#55ab26",
    "C": "#f29400",
    "E": "#9874c3",
    "F": "#ffc20e",
    "H": "#e2001a",
}

const BusColors = {
    "BUS": "#fcb814",
    "A": "#ee1d23",
    "C": "#05a9cc",
    "S": "#3790ce",
    "E": "#55ab25",
}

const MetroColors = {
    "M1": "#007756",
    "M2": "#fc0",
    "M3": "#e40037",
    "M4": "#009cd3",
}

const TrainColors = {
    'TOG': '#767676',
    'REG': '#50b748',
    'LYN': '#FCBB58',
}

export async function fetchDepartures(stationId) {
    const res = await fetch(`https://m.dk/umbraco/api/journeyApi/Departures?id[]=${stationId}&useBus=True&useTrain=True`);
    const data = await res.json();
    let formatted = {
        stog: [],
        bus: [],
        train: [],
        metro: [],
    }

    for (let i = 0; i < data.length; i++) {
        switch (data[i].type) {
            case "M": {
                let departureCategories = data[i].departures;
                for (let j = 0; j < departureCategories.length; j++) {
                    let departures = departureCategories[j];
                    formatted.metro.push({
                        departures: departures.map(departure => departure.FormattedMinutes),
                        direction: departures[0].Direction,
                        index: `${departures[0].Line}${departures[0].Direction}`,
                        color: MetroColors[departures[0].Line],
                        colorText: departures[0].Line
                    })
                }
            } break;
            case "S": {
                let departureCategories = data[i].departures;
                for (let j = 0; j < departureCategories.length; j++) {
                    let departures = departureCategories[j];
                    formatted.stog.push({
                        departures: departures.map(departure => departure.FormattedMinutes),
                        direction: departures[0].Direction,
                        index: `${departures[0].Line}${departures[0].Direction}`,
                        color: STogColors[departures[0].Line],
                        colorText: departures[0].Line
                    })
                }
            } break;
            case "T": {
                let departureCategories = data[i].departures;
                for (let j = 0; j < departureCategories.length; j++) {
                    let departures = departureCategories[j];
                    formatted.train.push({
                        departures: departures.map(departure => departure.FormattedMinutes),
                        direction: departures[0].Direction,
                        index: `${departures[0].Line}${departures[0].Direction}`,
                        color: TrainColors[departures[0].Line],
                        colorText: departures[0].Name
                    })
                }
            } break;
            case "B": {
                let departureCategories = data[i].departures;
                for (let j = 0; j < departureCategories.length; j++) {
                    let departures = departureCategories[j];
                    let color = ["A", "C", "S", "E"].some(line => departures[0].Line == line) ? BusColors[departures[0].Line] : BusColors["BUS"];
                    formatted.bus.push({
                        departures: departures.map(departure => departure.FormattedMinutes),
                        direction: departures[0].Direction,
                        index: `${departures[0].Line}${departures[0].Direction}`,
                        color: color,
                        colorText: departures[0].Name
                    })
                }
            } break;
        }
    }
    return formatted;
}