import { error } from '@sveltejs/kit';
import moment from 'moment/moment';
import {idToName} from '../../../data/stations.js'

moment.locale(
  'da',
  {
    relativeTime: {
      future: 'om %s',
      past: 'for %s siden',
      s: 'få sekunder',
      m: '1',
      mm: '%d',
      h: '1 time',
      hh: '%d timer',
      d: '1 dag',
      dd: '%d dage',
      M: '1 måned',
      MM: '%d måneder',
      y: '1 år',
      yy: '%d år'
    },
  }
);

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
  if (!/^-?\d+$/.test(params.id)) {
    throw error(403, 'Station IDs must be integers');
  }

  const stationId = Number(params.id);
  const stationName = idToName[stationId.toString()]
  if (!stationName) {
    throw error(404, 'Station not found');
  }

  const response = await fetch(`http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=${stationId}&format=json`);
  const data = await response.json();
  if (data.DepartureBoard.error) {
    throw error(500, data.DepartureBoard.error);
  }
  if (data.DepartureBoard.Departure.length === 0) {
    throw error(404, 'No departures');
  }
  let stog = []
  let bus = []
  let train = []
  let metro = []
  let ferry = []
  for (let i = 0; i < data.DepartureBoard.Departure.length; i++) {
    let departure = data.DepartureBoard.Departure[i]
    if (departure.rtTime) {
      let originalTime = moment(`${departure.date} ${departure.time}`, "DD.MM.GG hh:mm")
      let realTime = moment(`${departure.rtDate} ${departure.rtTime}`, "DD.MM.GG hh:mm")

      departure.delay = originalTime.to(realTime, true);
    }

    switch (departure.type) {
      case "S":
        stog.push({
          ...departure,
          color: STogColors[departure.line],
          colorText: departure.line
        })
        break;
      case "BUS":
        var color = BusColors[departure.type]
        if (["A", "C", "E", "N"].some(type => departure.line.endsWith(type))) {
          color = BusColors[departure.line.slice(-1)]
        }
        bus.push({
          ...departure,
          color: color,
          colorText: departure.line
        })
        break;
      case "EXB":
        bus.push({
          ...departure,
          color: BusColors["EXB"],
          colorText: departure.line
        })
        break;
      case "TOG":
        train.push({
          ...departure,
          color: OtherColors["SJ"],
          // colorText: departure.name.replace("SJ ", "")
          colorText: departure.name
        })
        break;
      case "IC":
        train.push({
          ...departure,
          color: OtherColors["IC"],
          // colorText: departure.name.replace("IC ", "")
          colorText: departure.name
        })
        break;
      case "REG":
        train.push({
          ...departure,
          color: OtherColors["REG"],
          // colorText: departure.name.replace("Re ", "")
          colorText: departure.name
        })
        break;
      case "LYN":
        train.push({
          ...departure,
          color: OtherColors["LYN"],
          // colorText: departure.name.replace("ICL ", "").replace("ICL+ ", "")
          colorText: departure.name
        })
        break;
      case "NB":
        ferry.push({
          ...departure,
          color: BusColors["Havnebus"],
          colorText: departure.line
        })
        break;
      case "M":
        metro.push({
          ...departure,
          color: MetroColors[departure.line],
          colorText: departure.line
        })
        break;
      default:
        console.log(departure.type)
        break;
    }
  }
  return {
    stationName,
    stog,
    bus,
    train,
    metro,
    ferry
  };
}