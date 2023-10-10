import rawData from "./rawData";


//filtrerar rådatan lite:
const data = JSON.parse(rawData);
const galleriHelgenFullData = data[1];
const galleriKategorier = galleriHelgenFullData[6];
const gallerierOchUtställningsRum = galleriKategorier[0];
const popUp = galleriKategorier[1];
const allaUtställare = gallerierOchUtställningsRum + popUp;


//hjälpmetoder:
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
function getRandomBoolean(): boolean {
  return Math.random() < 0.5;
}

//fixar egna typer:
enum galleriTyp {galleri = 'Gallerier och utställningsrum', popup = 'Popup'}

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



//hjälpmetod till när vi ska skapa objekt av datan
function skapaUtställare(namn: String, koordinater: Array<number>, galleriTyp: galleriTyp, öppetTider: öppetTider, genre: genre, serverarMat: boolean, serveringsTillstånd: boolean) { 
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



/* skapar objekt:

for (const utställare in gallerierOchUtställningsRum) {
  const namn = 
  const koordinater = [1,2]
  const galleriTypen = galleriTyp.galleri;
  const öppetTider = getRandomOpeningHours;
  const genre = getRandomGenre;
  const serverarMat = getRandomBoolean;
  const serveringsTillstånd = getRandomBoolean;
  skapaUtställare()
  
}
for (const utställare in popUp) {
  let randomInt = getRandomInt(25) 
  const öppetTider = allaÖppetTider[randomInt];
  const genre = _.sample(Object.values(genre))
  skapaUtställare()
  
}


*/

//skapa listor och typer: koordinater, gallerityp, 
//skapa objekt som håller alla med namn som nyckel
//lägg in grejerna ovan (koordinater, osv)
//skapa typer: 



/*
for(const category of data[1][6]){
  console.log(category[2]);
  for(const pin of category[4]){
    console.log(`\t ${pin[5][0][0]} ${pin[4][0][1]}`);
  }
}
*/