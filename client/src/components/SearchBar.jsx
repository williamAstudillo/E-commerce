import React, { useState } from 'react';
import { searchProduct } from '../actions/actions';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import  './SearchBar.css';
/* nuestro componente recibe una funcion onSearch como parametro que viene dede App.js
pero tambien define dos funciones anonimas para pasarle a los eventos que suceden en el componente,
usa hooks para mantener su estado */
function SearchBar({ searchProduct }) {
	//console.log('hay props en el buscador---------->',props)
	const [ valor, setValor ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault(); //evitamos que al darle submit se envie el formulario y se refresque la pagina
		searchProduct(valor); // buscamos la ciudad haciendole nuestro request a la api
		setValor(''); // cambiamos el estado del boton a un string vacio para que al añadir una ciudad, se limpie el campo del input
	};

	return (
		<form onSubmit={()=>{
			handleSubmit(valor)
		}}>
				<div id="display">
			<div className="buscar">
			<input
				type="text"
				placeholder="search..."
				value={valor}
				onChange={(e) => setValor(e.target.value)} //cada vez que el campo de mi input cambie, mi estado cambiara a lo que esté escrito en el inpút
			/>

			</div>
			<NavLink onClick={() => searchProduct(valor)} to={`/search/${valor}`}>
				<div className="botoncito">
				<i class="icon fas fa-search"></i>				
				</div>
			</NavLink>

			</div>
		</form>
	);
}

function mapDispatchToProps(dispatch) {
	return {
		searchProduct: (valor) => dispatch(searchProduct(valor))
	};
}

export default connect(null, mapDispatchToProps)(SearchBar);
