
import './sass/App.scss'

import { useState, useEffect } from "react";

//componentes
import Button from "./components/Button"
import Card from './components/Card';

//íconos
import { TiArrowBack } from "react-icons/ti";
import { TiArrowForward } from "react-icons/ti";

const App = () => {

    const [pokemonID, setPokemonID]=useState(1);
    const [pokemonEvolutions, setPokemonEvolutions]=useState([]);

    useEffect(()=>{
        getEvolutions(pokemonID);
    },[pokemonID])


    //función evolución
    async function getEvolutions(id){
        const response=await 
        fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        const data=await response.json()

        let pokemonEvoArray=[];
    
        let pokemonLv1=data.chain.species.name;
        let pokemonLv1Img=await getPokemonImgs(pokemonLv1)
        pokemonEvoArray.push([pokemonLv1, pokemonLv1Img]);

        if(data.chain.evolves_to[0] ===undefined){
            console.log('level 2 undefined');    
        }else if (data.chain.evolves_to.lenght !==0){
            let pokemonLv2=data.chain.evolves_to[0].species.name;
            let pokemonLv2Img=await getPokemonImgs(pokemonLv2) 
            pokemonEvoArray.push([pokemonLv2, pokemonLv2Img]);
            if(data.chain.evolves_to[0].evolves_to[0] === undefined ){
                console.log('level 3 undefined');
            }else if(data.chain.evolves_to[0].evolves_to.lenght !==0 ){
                let pokemonLv3=data.chain.evolves_to[0].evolves_to[0].species.name;
                let pokemonLv3Img=await getPokemonImgs(pokemonLv3) 
                pokemonEvoArray.push([pokemonLv3, pokemonLv3Img]);
            }
        }
        
        
        
        setPokemonEvolutions(pokemonEvoArray);
        console.log(pokemonID);
        console.log(data.chain.species.name);
        
        

    }
 

    //función imagen
    async function getPokemonImgs(name){
        const response=await 
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data=await response.json()
       
        return data.sprites.other['official-artwork'].front_default;
        
    }




    function prevClick(){
        (pokemonID===1)?
        setPokemonID(1):
        setPokemonID(pokemonID-1)
    }

    function nextClick(){
        setPokemonID(pokemonID+1)
    }

  return (
    <div className='App'>
        <h1 className="Title">Evoluciones Pokemon</h1>
        <div className={`CardContainer Card${pokemonEvolutions.length}` }>
            {pokemonEvolutions.map(pokemon=>
                <Card 
                    key={pokemon[0]}
                    name={pokemon[0]}
                    img={pokemon[1]}
                />)}
            
        </div>
        <div className="ButtonsContainer">
        <Button 
            icon={<TiArrowBack/>} 
            handleClick={prevClick}
            />

        <Button 
            icon={<TiArrowForward/>}
            handleClick={nextClick}
        />
        
         </div>
    </div>
  )
}

export default App