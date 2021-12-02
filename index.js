const data = require('./data');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const MONGODB_URI = 'mongodb://localhost:27000/recipe';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    await Recipe.deleteMany()
    try {

        const createdRecipe = await Recipe.create({
        title: "recipe eko",
        ingredients: "leite, galinha, vinho, agua",
        dishType: "breakfast",
        duration: 66,
        })

      console.log("recipe: ", createdRecipe)
      await Recipe.insertMany(data)     
      const varRecipe = await Recipe.findOneAndUpdate(
        {title: "eko recipes"},
        {$set: {duration: 1}},
        {new: true}
      )

       console.log("recipe: ", varRecipe)
       const deleteRecipe = await Recipe.deleteOne({
        title: "Carrot Cake",
      })

      console.log(deleteRecipe, " delete recipes")
      mongoose.connection.close()

    } catch (err) {console.log(err)}

  }).catch(error => {
    console.error('Error', error);
  });