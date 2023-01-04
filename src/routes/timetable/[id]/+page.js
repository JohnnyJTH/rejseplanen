import { error } from '@sveltejs/kit';

const STogColors = {
  'A': '#4AA5E5',
  'B': '#68AB45',
  "Bx": "#B3CD78",
  'C': '#E59535',
  'E': '#7670B3',
  'F': '#F4C443',
  'H': '#D44E28',
}
const BusColors = {
  'BUS': '#FEC100',
  'EXB': '#2A8DFF',
  'A': '#B12222',
  'C': '#17AACF',
  'E': '#228C22',
  'N': '#808080',
  'Havnebus': '#021C4C',
}
const MetroColors = {
  'M1': '#037756',
  'M2': '#FECE00',
  'M3': '#EA3755',
  'M4': '#3CB4EF',
}
const OtherColors = {
  'REG': '#F4C443',
  'IC': '#EE4230',
  'LYN': '#FCBB58',
  'SJ': '#767676',
  'Lokalbane': '#061D42',
  'Letbane': '#31546F'
}

export async function load({ fetch, params }) {
  if (params.id.length !== 9) {
    throw error(404, 'Invalid station id');
  }

  const response = await fetch(`http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=${params.id}&format=json`);
  const data = await response.json();
  if (data.DepartureBoard.error) {
    throw error(404, data.DepartureBoard.error);
  }
  if (data.DepartureBoard.Departure.length === 0) {
    throw error(404, 'No departures');
  }
  let stog = []
  let bus = []
  for (let i = 0; i < data.DepartureBoard.Departure.length; i++) {
    let departure = data.DepartureBoard.Departure[i]
    if (departure.type === "S") {
      const newDeparture = {
        ...departure,
        color: STogColors[departure.line],
        colorText: departure.line
      }
      stog.push(newDeparture)
    } else if (departure.type === "BUS" || departure.type === "EXB") {
      const newDeparture = {
        ...departure,
        color: BusColors[departure.type],
        colorText: departure.type
      }
      bus.push(newDeparture)
    }
  }
  return {
    stog,
    bus
  };
}