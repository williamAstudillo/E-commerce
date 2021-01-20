'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config();

this.enviar_mail = (mail) => {
	let transporter = nodemailer.createTransport({
		service : 'gmail',
		auth    : {
			user : process.env.MAILUSER,
			pass : process.env.MAILPSSWD
		}
	});

	let mail_options = {
		from    : 'Pabs',
		to      : mail.user.email,
		subject : 'Compra exitosa',
		html    : `
            <div>
                <h1>Su compra ha sido exitosa</h1>
                <p>La orden será despachada en los próximos 3 días hábiles</p>
                <br></br>

                <h2 >Detalle de la orden</h2>
                
                <table style="margin-left:auto; margin-right:auto; font-size: 20px; border-collapse: 
                collapse;">
                <thead>
                <th style="background-color:#95C21E">
                Name</th>
                <th style="background-color:#95C21E">
                Description</th>
                <th style="background-color:#95C21E">
                Quantity</th>
                <th style="background-color:#95C21E">
                Price</th>
                </thead>

                <tbody>

                ${mail.order.map(
					(producto) => `<tr>
                    <td style="border: 1px solid #ddd;padding: 8px;">
                      ${producto.name}
                    </td>
                    <td style="border: 1px solid #ddd;padding: 8px;">
                      ${producto.description}
                    </td>
                    <td style="border: 1px solid #ddd;padding: 8px;">
                      ${producto.orderLine.units}
                    </td>
                    <td style="border: 1px solid #ddd;padding: 8px;">
                      ${producto.price}
                    </td>
                  </tr>`
				)}
                
                </tbody>
                </table>
                </div>
                `
	};

	transporter.sendMail(mail_options, (error, info) => {
		if (error) {
			console.log(error);
			return res.status(200).send({ salt, statusEmail: 'error' });
		}
		else {
			console.log('El correo se envio' + info.response);
			return res.status(200).send({ salt, statusEmail: 'enviado' });
		}
	});
};

module.export = this;
