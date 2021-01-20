import React from 'react'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import CategoryFilter from './CategoryFilter';
import Products from './Products';
import './AllProducts.css'


const AllProducts = () => {
    return (
        <div id='allProductsContainer'>
            <Row>
                <Col className='categoriesBar' md={2}>
                    <CategoryFilter />
                </Col>
                <Col md={10} className='catalogContainer'>
                    <Products />
                </Col>
            </Row>
        </div>
        
    )
}

export default AllProducts
