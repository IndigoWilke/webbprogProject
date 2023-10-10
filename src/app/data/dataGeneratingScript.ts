import * as fs from 'fs'; //for writing to file 
import rawData from "./rawData";

//filtrerar rådatan lite:
const data = JSON.parse(rawData);
const galleriHelgenFullData = data[1];
const galleriKategorier = galleriHelgenFullData[6];
const gallerierOchUtställningsRum = galleriKategorier[0][4];
const popUp = galleriKategorier[1][4];


//hjälpmetoder:
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
function getRandomBoolean(): boolean {
  return Math.random() < 0.5;
}

//fixar egna typer:
enum GalleriTyp {galleri = 'Gallerier och utställningsrum', popup = 'Popup'}

enum genre {modern = 'Modern konst', klassisk = 'Klassisk konst', performance = 'Performance-konst', feministisk = 'Feministisk konst', ljud = 'Ljudkonst', övrigt = 'Övrigt'};
function getRandomGenre(): genre {
  return Object.values(genre)[getRandomInt((Object.values.length))];
}

type öppetTider = {öppnar: number, stänger: number};
function skapaÖppetTider(öppnar: number, stänger: number): öppetTider {
  return {öppnar: öppnar, stänger: stänger};
} 
const allaÖppetTider: öppetTider[] = [
  skapaÖppetTider(9,17),
  skapaÖppetTider(8,14),
  skapaÖppetTider(17,20),
  skapaÖppetTider(16,24),
  skapaÖppetTider(20, 2),
  skapaÖppetTider(10, 14)
]
function getRandomOpeningHours(): öppetTider {
  return allaÖppetTider[getRandomInt(allaÖppetTider.length)];
}


//the one type to rule them all:
type utställare = {
  namn: String,
  koordinater: any,
  galleriTyp: GalleriTyp, 
  öppetTider: öppetTider,
  genre: genre,
  serverarMat: boolean,
  serveringsTillstånd: boolean
}

function skapaUtställare(namn: String, koordinater: any, galleriTyp: GalleriTyp, öppetTider: öppetTider, genre: genre, serverarMat: boolean, serveringsTillstånd: boolean): utställare { 
    return { 
      namn: namn,
      koordinater: koordinater,
      galleriTyp: galleriTyp, 
      öppetTider: öppetTider,
      genre: genre,
      serverarMat: serverarMat,
      serveringsTillstånd: serveringsTillstånd
    }
}



//skapar utställarobjekt:
let galleriUtställare: utställare[] = [];
let popUpUtställare: utställare[] = [];

gallerierOchUtställningsRum.forEach((utställare: any[]) => {
  const namn = utställare[5][0][0];
  const koordinater = utställare[4][4];
  const galleriTyp = GalleriTyp.galleri;
  const öppetTider = getRandomOpeningHours();
  const genre = getRandomGenre();
  const serverarMat = getRandomBoolean();
  const serveringsTillstånd = getRandomBoolean();

  galleriUtställare.push(skapaUtställare(namn, koordinater, galleriTyp, öppetTider, genre, serverarMat, serveringsTillstånd));  
});

popUp.forEach((utställare: any[]) => {
  const namn = utställare[5][0][0];
  const koordinater = utställare[4][4];
  const galleriTyp = GalleriTyp.galleri;
  const öppetTider = getRandomOpeningHours();
  const genre = getRandomGenre();
  const serverarMat = getRandomBoolean();
  const serveringsTillstånd = getRandomBoolean();

  popUpUtställare.push(skapaUtställare(namn, koordinater, galleriTyp, öppetTider, genre, serverarMat, serveringsTillstånd));
});

const allaUtställare = galleriUtställare.concat(popUpUtställare)
const jsonizedData = JSON.stringify(allaUtställare, null, 2)
console.log(jsonizedData);
const filename = './data.ts'
fs.writeFileSync(filename, jsonizedData, 'utf-8');
//^Doesn't work since we are in Angular probably. Need to move to server side but im too tired now, will just manually copy over the data in the meantime.

export default allaUtställare;

