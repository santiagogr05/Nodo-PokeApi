// Ahora que tenemos nuestro HTML y CSS, es hora de darle vida con JavaScript <3

// 1️⃣. Seleccionar los elementos HTML que vamos a utilizar:
// - Imagen de los pokemon
// - Stats de cada uno
// 🤓 Pista: revisa el método document.querySelector()



// Selectores para el Pokemon 1

let pokemon1ImgElement = document.querySelector(".pokemon-1__img");
let pokemon1HpElement = document.querySelector(".pokemon-1__hp");
let pokemon1NameElement = document.querySelector(".pokemon-1__name");
let pokemon1AttackElement = document.querySelector(".pokemon-1__attack");
let pokemon1DefenseElement = document.querySelector(".pokemon-1__defense");
let pokemon1TypeElement = document.querySelector(".pokemon-1__type");

// Selectores para el Pokemon 2

let pokemon2ImgElement = document.querySelector(".pokemon-2__img");
let pokemon2HpElement = document.querySelector(".pokemon-2__hp");
let pokemon2NameElement = document.querySelector(".pokemon-2__name");
let pokemon2AttackElement = document.querySelector(".pokemon-2__attack");
let pokemon2DefenseElement = document.querySelector(".pokemon-2__defense");
let pokemon2TypeElement = document.querySelector(".pokemon-2__type");

// 2️⃣. Miremos ahora la API de Pokemon :)
// - Haz un llamado a la URL https://pokeapi.co/api/v2/pokemon/ y analiza cómo devuelve su respuesta
// La API retorna un pokemon https://pokeapi.co/api/v2/pokemon/{ID} si se provee un ID al final.
// 🤓 Pista: Para enfrentar 2 pokemones aleatores, necesitamos hacer 2 llamados a la API con 2 n´¨úmeros aleatorios entre el 1 y el 900


// 3️⃣ - Crear una función que genere un número random entre 1 y 900.
// Puedes usar esta: 👩🏻‍💻

const getRandomNumber = (numMin, numMax) => {
  return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
}; 


// 4️⃣ - Asignar un número random al ID de los que serán nuestros pokemons
// Declara 2 variables para cada pokemon y guarda los números que retorna la funci´øn en ellos

const poke1ID = getRandomNumber(1, 900);
const poke2ID = getRandomNumber(1, 900);

// 🤓 Pista: algo como ... const poke1ID = getRandomNumber(1, 900);

// 5️⃣ - Crear una función para traer (fetch) data de la API
// Dale una mirada a la función fetch -> https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// Recuerda la URL de la API https://pokeapi.co/api/v2/pokemon/${pokeID}

const getPokemon = async (pokeID) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
  const data = await response.json();
  return data;
}


// 6️⃣ - Vamos a crear los pokemons en la función createPokemons.
// Primero Haz varias pruebas a las API para examinar bien qué devuelve, esa data
// será necesaria para popular nuestros elementos HTML
// 🤓 Pista: - Crea una función asíncrona que reciba los 2 ID de los pokemon, es decir los números que obtenemos de llamar la función random
//           - Haz una llamada a la API por cada pokemon, guarda los datos que te devuelve en dos variables: pokemon1 y pokemon2
//           - Toma los elementos HTML que seleccionamos más arriba y utiliza su propiendad innerHTML para añadir la info que necesitamos de la API

const createPokemons = async (poke1ID, poke2ID) =>{

  const pokemon1 = await getPokemon(poke1ID);

  pokemon1ImgElement.src = pokemon1.sprites.other["official-artwork"]["front_default"];
  pokemon1HpElement.innerHTML += pokemon1.stats[0]["base_stat"];
  pokemon1NameElement.innerHTML += pokemon1.name;
  pokemon1AttackElement.innerHTML += pokemon1.stats[1]["base_stat"];
  pokemon1DefenseElement.innerHTML += pokemon1.stats[2]["base_stat"];
  pokemon1TypeElement.innerHTML += pokemon1.types[0].type.name;


  const pokemon2 = await getPokemon(poke2ID);

  pokemon2ImgElement.src = pokemon2.sprites.other["official-artwork"]["front_default"];
  pokemon2HpElement.innerHTML += pokemon2.stats[0]["base_stat"];
  pokemon2NameElement.innerHTML += pokemon2.name;
  pokemon2AttackElement.innerHTML += pokemon2.stats[1]["base_stat"];
  pokemon2DefenseElement.innerHTML += pokemon2.stats[2]["base_stat"];
  pokemon2TypeElement.innerHTML += pokemon2.types[0].type.name;


}

createPokemons(poke1ID, poke2ID);


const buttonCatch = document.querySelector(".button__catch");
buttonCatch.addEventListener('click', () => {

  window.location.reload();

});

// 🎁 Bonus! - Vamos a crear la función fightPokemons que permitirá que los pokemons interactúen y peleen

  // 1. Seleccionar los datos que ahora tenemos en el HTML y que trajimos desde la API: para ambos pokemon: HP, attack, defense y name.



// Boton fight -> abre modal
const buttonFight = document.getElementById("button__fight");
buttonFight.addEventListener('click', () => {

  const modal = document.getElementById('modal');

  if (modal.style.display == 'none' || modal.style.display == ''){
    modal.style.display = 'block';
  }
  
  fightPokemons();

  buttonFight.disabled = true;
  
});

// Button OK -> cierra modal
const buttonModal = document.getElementById('button__modal');
buttonModal.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
});

  // 2. Crear una función que calcule el daño hecho a cada pokemon. Necesitamos el poder del atacante y la defensa y los HP del que defiende
  // - Calcular el daño restando el ataque de la defensa, con esto definimos si el pokemon sufrió daño.
  // - Calcular los nuevos HP: Si la defensa es menor a 0, significa que el ataque logró perforarla e hizo daño, en este caso vamos a restar el daño de los HP, si no, la HP debe quedar igual pues no hubo daño
  // En esta función vamos a devolver la nueva HP del pokemon atacado y además el da˜ñó que sufrió. - Luego vamos a necesitar estos datos -

  
const fightPokemons = () => {

  const modalText = document.querySelector('.modal__text');

  let poke1Name = pokemon1NameElement.innerHTML;
  let poke1Hp = parseInt(pokemon1HpElement.innerHTML);
  let poke1Attack = parseInt(pokemon1AttackElement.innerHTML);
  let poke1Defense = parseInt(pokemon1DefenseElement.innerHTML); 

  let poke2Name = pokemon2NameElement.innerHTML;
  let poke2Hp = parseInt(pokemon2HpElement.innerHTML);
  let poke2Attack = parseInt(pokemon2AttackElement.innerHTML);
  let poke2Defense = parseInt(pokemon2DefenseElement.innerHTML);


  let round = 1;
  while (poke1Hp > 0 || poke2Hp > 0)  {
    
    modalText.innerHTML += `Round: ${round} <br>***${poke1Name} Ataca <br>`;
    
    // Pokemon 1 Ataca
    if (poke1Attack > poke2Defense){
      poke2Hp -= (poke1Attack - poke2Defense);
      poke2Defense = 0;

      modalText.innerHTML += `***${poke1Name} ha perforado la defensa de ${poke2Name}<br>`

    } else if (poke1Attack < poke2Defense){
      
      poke2Defense -= poke1Attack;
      modalText.innerHTML += `***${poke1Name} ha deteriorado la defensa de ${poke2Name}<br>`

    } else {

      poke2Defense = 0;
      modalText.innerHTML += `***${poke1Name} y ${poke2Name} han igualado sus fuerzas<br>`
    }

    // Si poke 1 mata a poke 2 se acaba la batalla
    if (poke2Hp <= 0){
      modalText.innerHTML += `***${poke1Name} ha derrotado a ${poke2Name}<br>`;
      break;
    }

    //pokemon 2 contraataca
    modalText.innerHTML += `***${poke2Name} Contraataca<br>`;

    if (poke2Attack > poke1Defense){
      poke1Hp -= (poke2Attack - poke1Defense);
      poke1Defense = 0;

      modalText.innerHTML += `***${poke2Name} ha perforado la defensa de ${poke1Name}<br>`

    } else if (poke2Attack < poke1Defense){
      
      poke1Defense -= poke2Attack;
      modalText.innerHTML += `***${poke2Name} ha deteriorado la defensa de ${poke1Name}<br>`

    } else {

      poke1Defense = 0;
      modalText.innerHTML += `***${poke2Name} y ${poke1Name} han igualado sus fuerzas <br>`
    }

    // Si poke 2 mata a poke 1 se acaba la batalla
    if (poke1Hp <= 0){
      modalText.innerHTML += `***${poke2Name} ha derrotado a ${poke1Name}<br>`;
      break;
    }

    round++;
  }

}


  // 3. Narrar la batalla ;). Para esto vamos a usar el elemento modal__text, aquí vamos a ir llenando su innerHTML.
  // Empecemos con el Pokemon 1.



  // Ahora calculemos el daño que le hizo a pokemon2 y cuánta vida le queda, usemos la función de calcular daño



  // Vamos a narrar qué pasó en este ataque.Si el pokemon 1 tiene un ataque mayor a la denfesa del pokemon 2, debemos narrar que logra perforar su defensa
  // y describir cuánto daño recibió y cuáles son ahora sus puntos de vida
  // Si el ataque del pokemon 1 no es mayor que la denfesa del pokemon 2, significa que no logra perforarla y por lo tanto no hay daño.


  // Ahora el Pokemon2, mismo procedimiento.


  // Definamos el ganador que sería el más daño haya hecho al otro pokemon.
  // Recordemos que los puntos de daño son negativos!!
  // - Si el daño recibido por pokemon 2 es menor al de pokemon 1, (es decir un mayor número negativo), significa que pokemon 1 hizo más daño, por lo tanto es el gandor!
  // - En caso de que sea menor el daño de pokemon 1, significa que pokemon 2 es el gandor
  // - El último caso posible es que ambos hayan recibido el mismo daño, en ese caso sería un empate.



// 7️⃣ - Vamos a practicar eventos en JS, de esta manera vamos a poder controlar cuándo traer pokemons desde la interfaz
// Nuestra función fetch va a traer pokemons cada que el código es ejecutado, es decir cuando la página se recarga
// Vamos a añadir un botón que recargue la página en cada click, así podemos obtener nuevos pokemons random cada vez.
// 🤓 Pista: - Seleccionar el elmento HTML del botón
//           - Llamar a la función createPokemons solo cuando se dé click a ese botón (lee sobre eventListeners https://www.w3schools.com/js/js_htmldom_eventlistener.asp )
// 🕵🏻‍♀️ En nuestra app tenemos 3 botones. El de Catch!, Fight! y el que OK! que aparece en el modal cuando pelean los pokemons
// Cada botón tendrá atado un eventListener que vamos a construir juntos ❤️

