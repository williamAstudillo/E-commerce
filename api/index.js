//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
	server.listen(3000, () => {
		console.log('%s listening at 3000'); // eslint-disable-line no-console
		// ! *******Informacion de Prueba*******
		// ! *******Borrar o Comentar*******

		const data = require('./src/dataTemp/dataapi.js');

		Promise.all([
			data.catUno,
			data.catDos,
			data.catTres,
			data.prodUno,
			data.prodDos,
			data.prodTres,
			data.userUno,
			data.userDos,
			data.userTres
		]).then((res) => {
			console.log('Categorías, Productos y Usuarios precargados');
		});
		// ! ********************************
	});
});
