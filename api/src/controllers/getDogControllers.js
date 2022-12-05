const axios = require('axios')
const { Race, Temperament } = require('../db')


const URL = `https://api.thedogapi.com/v1/breeds`


const getFromDb = async () => {
    return await Race.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
            through: {
                attributes: [],//traer mediante los atributos del modelo
            },
        }
    })
};

const getApiData = async() => {
    
    const apiData = await axios.get(URL);
    const apiInfo = await apiData.data.map(el => {
    let temperamentArray = [];
    if (el.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
        temperamentArray = el.temperament.split(", ");
    }
    
    let heightArray = [];
    if (el.height.metric) {
        heightArray = el.height.metric.split(" - ");
    }

    let weightArray = [];
    if (el.weight.metric) {
        weightArray = el.weight.metric.split(" - ");
    }
        return {
            id: el.id,
            name: el.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temperamentArray,
            life_span: el.life_span,
            image: el.image.url,
        }
    })
return apiInfo;
}

const getAllDogs = async () => {
    const dataFromApi = await getApiData();
    const dataFromDb = await getFromDb();
    // const allDataMixed = dataFromApi.concat(dataFromDb);
    const allDataMixed = [...dataFromApi, ...dataFromDb];
    return allDataMixed;
}

    const get_Dogs = async (req,res) => {
    const { name } = req.query
    const allDogs = await getAllDogs();
    if (name) {
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));//si el perro existe guardame sus parametros aca.
        dog.length ? res.status(200).send(dog) : res.status(404).send("No se encontro la raza solicitada"); 
    } else {
        res.status(200).send(allDogs);
    }
    }



    const get_Dogs_By_params = async (req, res) => {
        const { idRaza } = req.params;

        const allDogs = await getAllDogs();

        const dog = allDogs.filter(el => el.id == idRaza);

        if (dog.length) {
        res.status(200).json(dog);
    }
    else{
        res.status(404).send("No se encontro la raza solicitada");
    }
    }
    
    

    module.exports = {get_Dogs, get_Dogs_By_params}



