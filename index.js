const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    
  const recipe1 = {
    title: 'Brownie',
    level: 'Easy Peasy',
    ingredients: ['Chocolate', 'Walnuts'],
    cuisine: 'American',
    dishType: 'dessert',
    image: 'https://https://cozinhatecnica.com/wp-content/uploads/2019/10/brownie.jpg',
    duration: 40,
    creator: 'Chef Diogo',
    //O ERRO ESTAVA AQUI created:{ type: Date, default: Date.now },
  };
  Recipe.create(recipe1).then(() => {
  console.log(recipe1.title)
  });
  Recipe.insertMany(data).then((arrayOfCreatedRecipe) => {
    arrayOfCreatedRecipe.forEach(response => {
      console.log(response.title)
    });

    Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true }).then((response) => {
    console.log('sucess', response)
    })
    Recipe.findOneAndRemove({ title: 'Carrot Cake' }).then((response) => {
      console.log('removed', response)
    }).catch(err => {
      console.log(err)
      
      mongoose.disconnect()
    });

  });

})
.catch(error => {
  console.error('Error connecting to the database', error);
});
