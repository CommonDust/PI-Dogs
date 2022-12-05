
const {Temperament, Race} = require('../db')

const post_dogs = async (req, res) => {
        let {
         name,
         min_height,
         max_height,
         min_weight,
         max_weight,
         life_span,
         temperaments,
         image
        } = req.body
     
        const fixedHeight = []
        const minHeight = min_height;
        const maxHeight = max_height;
        fixedHeight.push(minHeight, maxHeight)
     
        const fixedWeight = []
        const minWeight = min_weight;
        const maxWeight = max_weight;
        fixedWeight.push(minWeight, maxWeight)
     
        let dog = await Race.create({
         name,
         height: fixedHeight,
         weight: fixedWeight,
         life_span,
         image: image ? image : "https://64.media.tumblr.com/5cbc951c68321886179f144c006264a7/tumblr_ozlnlyhTCz1wd4db5o2_640.jpg",
        })
     
        let associatedTemp = await Temperament.findAll({
            where: { name: temperaments},
        })
     
        dog.addTemperament(associatedTemp);
     
        res.status(200).send("Dog created succesfully!")

    }



module.exports = {post_dogs}