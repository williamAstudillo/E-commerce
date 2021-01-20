import  React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getCategory, filterProduct } from '../actions/actions'
import './CatBar.css'

const CatBar = (props) => {

        return (
            <div >
                {console.log("props.category.name",props.category.name)}
              { 
                <Link 
                     onClick={()=>filterProduct(props.category.name)} //cuando le doy click lleno el array cat
                     to={`/products/category/${props.category.name}`}
                     style={{ textDecoration: 'none' }}
                     >  
                            
                    <h4 className='displayedCatTitle'>
                        {props.category.name}
                    </h4>
                </Link>
                            
              }   
            
            
        </div>
    )
}



function mapStateToProps(state) {
    return {        
        categories: state.products.categories
    }}

    function mapDispatchToProps(dispatch) {
    return {        
        filterProduct:() =>dispatch(filterProduct()),
        getCategory:() =>dispatch(getCategory())
}}


export default connect(
        mapStateToProps, 
        mapDispatchToProps)
(CatBar)
