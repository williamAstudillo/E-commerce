import React from 'react'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from './product'
import './Products.css'
import { filterProduct } from '../actions/actions'
import './productFilter.css'

//hago mi peticion al back para traer la data
/* const getProducts = () => {
	return fetch('http://localhost:3000/products', {
		method: 'GET'
	}).then(res => {
		return res.json()
	}).catch(err => console.log(err))
} */

const ProductFilter = ({ filtrados, catFilter , filterProduct, }) => {
    //const allProducts = useSelector(state => state.products)
   // const [allProducts, setAllProducts] = useState([])
    //const [error, setError] = useState(false)
//inicializo el estado de mi componente con la data que me llega de mi request
/*     const init = () => {
        getProducts().then(pro => {
            console.log('que hay en la data', pro)
            if (pro.error) {
                setError(pro.error)
                console.log('Error------>', pro.error)
            } else {
                setAllProducts(pro)
                console.log('Estado ------>', allProducts)
            }
        })
    } */
//le digo al componwente que precargue la data con la que lo inicialicé
   useEffect(()=>{
      
    filterProduct(filtrados)
    console.log('FILTRADOS::',filtrados)
        },[ProductFilter, filtrados]) 

    return (
        <div className='productFilterBackground'>
           
					
							<div className='flexThis' >
                              
                           
						    {catFilter.map((product) => {
							return (								
                                <Link to={`/products/category/${product.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Product product={product} />
                                </Link>
								
							);
						})} 
                                </div>			
					
				
            
        </div>
    )
}


function mapStateToProps(state) {
  //console.log('-------->', state)
    return {
        catFilter: state.products.catFilter
    };
}

function mapDispatchToProps(dispatch) {
    return {        
        filterProduct:(filtrados) =>dispatch(filterProduct(filtrados))
        };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductFilter);