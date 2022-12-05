const axios = require('axios');
const { Router } = require('express');
const {Temperament} = require('../db')


const URL = `https://api.thedogapi.com/v1/breeds`

 const get_temperament = async (req, res) => {
    const temperamentsApi = await axios.get(URL);
    const temperaments = temperamentsApi.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(el => {
        let t = el.trim()
        Temperament.findOrCreate({
             where: { name: t }
        })
    })

    const allTemp = await Temperament.findAll();    
    res.send(allTemp);
};

module.exports = {get_temperament}