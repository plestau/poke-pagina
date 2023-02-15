import './home.css'

function Home(){
    return(
        <div id="home">
            <div id="home__img"><h1>PokePágina</h1></div>
            <div id="imagen"> 
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/SITIO-EN-CONSTRUCCION.jpg/1200px-SITIO-EN-CONSTRUCCION.jpg"></img>
            </div>
            <div id="explicacion">
                <p>Esta página fue creada para el curso de React. Se trata de una página que muestra información sobre los Pokémon, y que permite jugar a adivinarlos.</p>
            </div>
        </div>
    )
}

export default Home