class Pokemon {
    constructor(data){
        this.id = data.id
        this.nombre = data.name
        this.sprite = data.sprites.front_default
        this.tipo = data.types[0].type.name
        this.altura = data.height
        this.peso = data.weight
    }
}

export default Pokemon