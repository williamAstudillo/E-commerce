const { Product, Category, User, Order } = require('../db.js');

// ! *******Informacion de Prueba*******
// ! *******Borrar o Comentar*******
var catUno = Category.create({
	name        : 'Jueguetes',
	description : 'Categoria Uno'
});

var catDos = Category.create({
	name        : 'Comida',
	description : 'Categoria Dos'
});

var catTres = Category.create({
	name        : 'Limpieza',
	description : 'Categoria Tres'
});

var prodUno = Product.create({
	name        : 'Give a Shit',
	description : 'Compostable Dog Poop Bags | 10% to Charity',
	price       : 12.99,
	stock       : 10,
	images      : '/images/giveAshit.jpg'
});

var prodDos = Product.create({
	name        : 'Pet Grooming Brush',
	description : 'Professional Deshedding Tool for Dogs and Cat',
	price       : 14.97,
	stock       : 0,
	images      : '/images/brush.jpg'
});

var prodTres = Product.create({
	name        : 'Elevated Dog Bed',
	description : 'Keep your pet cool and elevated off the ground',
	price       : 31.65,
	stock       : 14,
	images      : '/images/brush.jpg'
});

var prodCuatro = Product.create({
	name        : 'Furbo Dog Camera:',
	description : 'Treat Tossing, Full HD Wifi Pet Camera and 2-Way Audio',
	price       : 133.99,
	stock       : 0,
	images      : '/images/furbo.jpg'
});
var prodCinco = Product.create({
	name        : ' Dog Poop Bags',
	description : 'Extra Thick and Strong Poop Bags for Dogs',
	price       : 10.99,
	stock       : 6,
	images      : 'https://images-na.ssl-images-amazon.com/images/I/81z6mIALFwL._AC_SL1500_.jpg'
});
var prodSeis = Product.create({
	name        : 'Wobble Wag Giggle Ball',
	description : 'Interactive Dog Toy, Fun Giggle Sounds When Rolled or Shaken',
	price       : 10.99,
	stock       : 8,
	images      : "https://images-na.ssl-images-amazon.com/images/I/81XyqDXVwCL._AC_SL1500_.jpg"
});
var prodSiete = Product.create({
	name		: ' Canned Wet Cat Food',
	description : 'Provides 100 percent Complete And Balanced Nutrition For Adult Cats',
	price       : 20.99,
	stock       : 15,
	images      : "https://images-na.ssl-images-amazon.com/images/I/91i4zj-Qo7L._AC_SL1500_.jpg"
});
var prodOcho = Product.create({
	name		: 'Cat Kicker Fish Toy',
	description	: 'Potaroma Electric Flopping Fish 10.5", Moving Cat Kicker Fish Toy, Realistic Flopping Fish, Wiggle Fish Catnip Toys, Motion Kitten Toy, Plush Interactive Cat Toys, Fun Toy for Cat Exercise',
	price       : 20.99,
	stock       : 15,
	images: "https://images-na.ssl-images-amazon.com/images/I/71IxSLfzftL._AC_SL1500_.jpg"

})
var prodNueve = Product.create({
	name        :   'Pet Grooming Glove',
	description : 'Pet Grooming Glove - Gentle Deshedding Brush Glove - Efficient Pet Hair Remover Mitt - Enhanced Five Finger Design - Perfect for Dog & Cat with Long & Short Fur - 1 Pair',
	price       : 5,
	stock       : 15,
	images      : "https://images-na.ssl-images-amazon.com/images/I/713JHXyZS9L._AC_SL1000_.jpg"

})
var prodDiez = Product.create({
	name        :'Aquarium  Cleaner',
	description : 'Aquarium Gravel Cleaner, New Quick Water Changer with Air-Pressing Button Fish Tank Sand Cleaner Kit Aquarium Siphon Vacuum Cleaner with Water Hose Controller Clamp',
	price       : 15.99,
	stock       : 0,
	images      : "https://images-na.ssl-images-amazon.com/images/I/614ZeibJ1-L._AC_SL1200_.jpg"

})
var prodOnce = Product.create({
	name        :' Aquarium Ornaments',
	description : 'Penn-Plax Officially Licensed Nickelodeon SpongeBob SquarePants Aquarium Ornaments - Safe for Freshwater and Saltwater Tanks',
	price       : 35.99,
	stock       : 0,
	images      :  "https://images-na.ssl-images-amazon.com/images/I/71DBORNY69L._AC_SL1500_.jpg"

})
var prodDoce = Product.create({
	name        :   ' Aquarium Net ',
	description : 'Pawfly 4 Inch Aquarium Net Fine Mesh Small Fish Catch Nets with Plastic Handle - Green',
	price       : 16.88,
	stock       : 15,
	images      :  "https://images-na.ssl-images-amazon.com/images/I/71akdy2K6EL._AC_SL1500_.jpg"

})
var prodTrece = Product.create({
	name        : ' Soft Pet Carrier ',
	description : 'petisfam Soft Pet Carrier for Medium Cats and Small Dogs with Cozy Bed, 3 Doors, Top Entrance | Airline Approved, Escape-Proof, Breathable, Leak-Proof, Easy Storage',
	price       : 9.99,
	stock       : 15,
	images      :  "https://images-na.ssl-images-amazon.com/images/I/61hRBDQq3NL._AC_SL1000_.jpg"

})
var prodCatorce = Product.create({
	name        :   ' Automatic Cat Feeder',
	description :  'PETLIBRO Automatic Cat Feeder, Transnsparent Timed Cat Feeder with Desiccant Bag for Dry Food, Programmable Portion Control 1-4 Meals per Day & 10s Voice Recorder for Small / Medium Pets (4L)',
	price       : 50.99,
	stock       : 30,
	images      :  "https://images-na.ssl-images-amazon.com/images/I/71iv0ACcp5L._AC_SL1500_.jpg"

})
var prodQuince = Product.create({
	name        : 'Hamster Cage',
	description :  'Midwest Critterville Arcade Hamster Cage',
	price       : 70.99,
	stock       : 5,
	images      :  "https://images-na.ssl-images-amazon.com/images/I/91Pq-2ppDhL._AC_SL1500_.jpg"

})
var prodDieciseis = Product.create({
	name        : ' Dog Bed for Crate',
	description :  'PETLIBRO Dog Bed for Crate, Memory Foam Dog Crate Bed Orthopedic Plush Mattress for Therapeutic Joint&Muscle Relief Washable Bed Cover with Waterproof Inner Lining',
	price       : 20.99,
	stock       : 5,
	images      :  "https://images-na.ssl-images-amazon.com/images/I/91XelRs0T0L._AC_SL1500_.jpg"

})
var prodDiecisiete = Product.create({
	name        : 'Favola Hamster Cage',
	description : 'Favola Hamster Cage | Includes Free Water Bottle, Exercise Wheel, Food Dish & Hamster Hide-Out | Large Hamster Cage Measures 23.6L x 14.4W x 11.8H-Inches & Includes 1-Year Manufacturer',
	price       : 10.99,
	stock       : 6,
	images      :  "https://images-na.ssl-images-amazon.com/images/I/91sz1dozXRL._AC_SL1500_.jpg"

})
var prodDieciocho = Product.create({
	name        : ' Cat Nail Clippers',
	description:  'Pet Republique Cat Nail Clippers – Professional Claw Trimmer for Cat, Kitten, Hamster, & Small Breed Animals',
	price       : 18.99,
	stock       : 8,
	images      :  "https://images-na.ssl-images-amazon.com/images/I/81udd%2BvStBL._AC_SL1500_.jpg"

})
var prodDiecinueve = Product.create({
	name        : "Cat self grooming ",
	description :  'Cat self grooming wall brush that helps remove and collect loose cat hair',
	price       : 5.99,
	stock       : 0,
	images:  "https://images-na.ssl-images-amazon.com/images/I/51CnDlkEuIL._AC_SL1059_.jpg"

})
var prodDiecinueve = Product.create({
	name: "Cat self grooming wall brush ",
	description:  'Cat self grooming wall brush that helps remove and collect loose cat hair',
	price       : 5.99,
	stock       : 0,
	images:  "https://images-na.ssl-images-amazon.com/images/I/51CnDlkEuIL._AC_SL1059_.jpg"

})
var prodVeinte = Product.create({
	name        : "Feline Greenies ",
	description :  'Feline Greenies Natural Dental Care Cat Treats, Chicken Flavor, All Bag Sizes',
	price       : 10.99,
	stock       : 15,
	images      :  "https://images-na.ssl-images-amazon.com/images/I/91Gh4mbXe7L._AC_SL1500_.jpg"

})

var userUno = User.create({
	email            : 'usuario1@ecommerce.com',
	first_name       : 'first_name_uno',
	last_name        : 'last_name_uno',
	country          : 'co',
	city             : 'bo',
	shipping_address : 'Cualquiera',
	password         : '12345',
	role             : 'admin'
});

var userDos = User.create({
	email            : 'usuario2@ecommerce.com',
	first_name       : 'first_name_dos',
	last_name        : 'last_name_dos',
	country          : 'co',
	city             : 'bo',
	shipping_address : 'Cualquiera',
	password         : '67890'
});

var userTres = User.create({
	email            : 'andres792192@gmail.com',
	first_name       : 'first_name_tres',
	last_name        : 'last_name_tres',
	country          : 'co',
	city             : 'bo',
	shipping_address : 'Cualquiera ',
	password         : '24680',
	role             : 'buyer'
});

var userCuatro = User.create({
	email            : 'alejompm@gmail.com',
	first_name       : 'first_name_uno',
	last_name        : 'last_name_uno',
	country          : 'co',
	city             : 'bo',
	shipping_address : 'Cualquiera',
	password         : '12345',
	role             : 'buyer'
});

var orderOne = Order.create({
	state           : 'procesando',
	shippingAddress : 'mock address',
	ipAddress       : '168.212.226.204'
});

var orderTwo = Order.create({
	state           : 'completa',
	shippingAddress : 'fsfsfcompleta',
	ipAddress       : '165.29.127.30'
});

var orderThree = Order.create({
	state           : 'completa',
	shippingAddress : '32243 addfggf',
	ipAddress       : '186.29.127.35'
});

module.export = {
	catUno,
	catDos,
	catTres,
	prodUno,
	prodDos,
	prodTres,
	prodCuatro,
	prodCinco,
	prodSeis,
	prodSiete,
	prodOcho,
	prodNueve,
	prodDiez,
	prodOnce,
	prodDoce,
	prodTrece,
	prodCatorce,
	prodQuince,
	prodDieciseis,
	prodDiecisiete,
	prodDieciocho,
	prodDiecinueve,
	prodVeinte,
	userUno,
	userDos,
	userTres,
	userCuatro,
	orderOne,
	orderTwo,
	orderThree
};
// ! ********************************
