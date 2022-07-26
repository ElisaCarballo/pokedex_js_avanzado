const pokeContainer = document.querySelector('.poke-container');
const pokemonCount = 400

const colors = {
    fire: '#B52F25',
	grass: '#5FB94A',
	electric: '#EBF22B',
	water: '#1155E6',
	ground: '#B56528',
	rock: '#A7A097',
	poison: '#612D8E',
	bug: '#83C30B',
	dragon: '#F5BA32',
	psychic: '#E8498F',
	flying: '#3688B4',
	fighting: '#EC6533',
    ice:'#55BFD7',
	normal: '#D49EAC',
    ghost: '#33346D',
    dark:'#686564',
    fairy:'#E94367',
    steel:'#63C99B', 
    light:'#FAF80C',
    virus:'#2EF80C',
    time:'#408080',
    sound:'#CBF6E5',
    cosmic:'#3F3B98',
    space: '#DC2CAC',
    death: '#7E4344',
    wood: '#7F802E',
    animal: '#D4A36B',
    moist: '#6B80C1',
    giant: '#7BC9EC',
    enemy: '#EF9495',
    baby: '#66E1FB',
    furry: '#D4836B',
    spider: '#39484F',
    stinky: '#B9BD8F',
    fucker: '#705B70',
    rat:'#AEBAAD',
}
//Getting the keys of the colors Object to access the color value later
const mainTypes = Object.keys(colors)
// console.log(mainTypes)

//Sending API request for each Pokemon
const fetchPokemon = async () => {
    for (let i = 1; i<= pokemonCount; i++){
    await getPokemon(i)
    }
}

// Send request to PokeApi and get Json data about each pokemon
const getPokemon = async (id) =>{
    try{
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        const response = await axios.get(url)
        const data = response.data
        console.log(data)
        // console.log(data)
        createPokemonCard(data)
    }
    catch(err){
        console.log(err)
    }
}

//Create pokemon info card in the DOM for each pokemon
const createPokemonCard = (pokemon) =>{
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')
    const pokeTypes = pokemon.types.map(typeKind =>typeKind.type.name)
    // console.log(pokeTypes)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    
    // console.log(color)

    pokemonEl.innerHTML = 
    `      
            
            <span class="number">#${id}</span>
            <span class="type-icon"></span>
            
            <div class="img-container">
                <img src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" alt="">    
            </div>
            <div class="info">
                
                <h3 class="name">${(name)}</h3>
                
            <div class="extra-info">
                    <div> <small> Weight</small> <h5 class="weight"> ${pokemon.weight/10} kg </h5>
                    </div>
                    <div> <small> Height</small> <h5 class="height"> ${pokemon.height/10} m</h5></div>      
                </div>
                
                <div class="type-data"> <small> Type:</small> <h5 class="type">${getPokemonType(pokeTypes)}</h5></div>
                
    </div>
    `

    const typeColor = pokemonEl.querySelector('.type-icon')
    const imageBg = pokemonEl.querySelector('.img-container')
    //  imageBg.style.backgroundColor = color
    //  imageBg.style.boxShadow = `0 0 5px 5px ${color}`
    pokemonEl.style.border = `2px solid ${color}`
    typeColor.style.backgroundColor = color
    typeColor.setAttribute('title', type)
    typeColor.style.boxShadow = `0 0 6px ${color}`
    pokeContainer.appendChild(pokemonEl)
        
}

// Getting the type(s) for each pokemon
function getPokemonType(pokeTypes){
if(pokeTypes.length == 1){
    const pokeType = (pokeTypes[0])[0].toUpperCase() + pokeTypes[0].slice(1)
        return pokeType
} 
    else{ 
        pokeType1 = (pokeTypes[0])[0].toUpperCase() + pokeTypes[0].slice(1)
        pokeType2 = (pokeTypes[1])[0].toUpperCase() + pokeTypes[1].slice(1)
        return pokeType1 + ' / ' + pokeType2
    }

}


fetchPokemon()

