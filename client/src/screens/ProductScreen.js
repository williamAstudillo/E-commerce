import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import CustomButton from '../components/CustomButton'
import Reviews from '../components/Reviews'
//import products from '../products'
import { connect } from 'react-redux'
import { productDetail } from '../actions/actions'
import { addItem } from '../actions/cartActions'
import publicIP from 'react-native-public-ip';
import './ProductScreen.css'

const ProductScreen = ({ product, match, productDetail, addItem }) => {//cuando lo renderizamos en app le estamos pasando un path, eso es lo que llega por props
    const [producto, setProducto] = useState('')
    const [score, setScore] = useState(0)
    const [cantReviews, setCantReviews] = useState(0)
    const [ip, setIp]=useState(null)

    useEffect(() => {
        
        if(!producto){
        productDetail(match.params.id)    
        setProducto(product)
        }
        if(producto){
        var temporal=0;
        for (let i=0; i<product.users.length;i++){
            temporal=temporal+product.users[i].reviews.rating;
        }
        temporal=temporal/product.users.length;
        setScore(temporal)
        setCantReviews(product.users.length)
        }    
        if(!ip){
            publicIP().then(ipaddress => {
                setIp(ipaddress);
                console.log(ip)
              })
              .catch(error => {
                console.log(error);
            
              });
        } 
    }
    , [product,ip])
    
    return(
        <div className='detailScreenContainer'>
           <Link className='btn btn-light' to='/'></Link>
           <Row>
                <Col className='productColumn' md={6}>
                    <img className='detailImage' src={product.images} alt={product.name} fluid />
                </Col>
                <Col className='infoColumn' md={3}>
                    <h3>{product.name}</h3>
                    <Rating
                        value={score} 
                        text={`${cantReviews} reviews`}
                    />    
                    <div>
                        <div className='descriptionTitle'>
                            Description: 
                        </div>
                        <div className='descriptionText'>
                            {product.description}
                        </div>
                    </div>
                     <div className='detailPriceTitle'>
                        Price:
                     </div>
                     <div className='detailPriceText'>
                        ${product.price}
                     </div>            
                   
                </Col>
                <Col md={3}>
                    <div className='cardDetailScreen'>
                      
                            <Row>
                                <Col className='detailPriceTitle'>
                                    Price:
                                </Col>
                                <Col className='detailPriceText'>
                                    ${product.price}
                                </Col>
                            </Row>             
                             <Row>
                                <Col className='detailPriceTitle'>
                                    Status:
                                </Col>
                                <Col className='detailPriceText'>
                                    {product.stock > 0 ? 'In Stock' : 'Out Of Stock'}
                                </Col>
                             </Row>
                       
                      
                         
                             <button id={product.stock === 0 ? 'disabledButton' : 'addToCartButtonDetail'} type='button' onClick={() => addItem({ product: product, ip: ip })} disabled={product.stock < 1}>
                                Add To Cart
			                </button>
                  
                     
                    </div>
                </Col>
           </Row>
           
           <Reviews id={match.params.id}  users={product.users} ></Reviews>
        </div>
    )
}
    
    

const mapStateToProps = ({products: {product}}) => ({   
        product    
})

function mapDispatchToProps(dispatch) {
    return {        
        productDetail:(id) =>dispatch(productDetail(id)),
        addItem: item => dispatch(addItem(item))
        };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductScreen);