import './home.css'

function Home(){
    return(
        <div id="home">
            <div id="home__img"><h1>PokePágina</h1></div>
            <div id="explicacion">
                <h4>Esta página fue creada para el curso de React. Se trata de una página que muestra información sobre los Pokémon, y que permite jugar a adivinarlos.</h4>
                <p>Código desarrollado por <a href="http://github.com/plestau">Pablo Lestau</a> disponible en <a href="http://github.com/plestau/poke-pagina"><i className='fa fa-github'></i></a></p>
            </div>
            <div id="imagenes">
                <img src="../img/pokedex.png" alt="Pokedex" className='explicacion_img' />
                <img src="../img/adivinanombre.png" alt="JuegoNombre" className='explicacion_img'/>
                <img src="../img/adivinatipo.png" alt="JuegoTipo" className='explicacion_img'/>
                <img src="../img/detalles.png" alt="Detalles" className='explicacion_img'/>
            </div>
            <p>Si buscar una página para tener en el móvil mientras juegas y ver los tipos débiles y fuertes de tu enemigo</p><a href="https://plestau.github.io/poke-api/">Pincha aquí</a>
        </div>
    )
}

export default Home