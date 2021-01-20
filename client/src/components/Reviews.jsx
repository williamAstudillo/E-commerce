import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux'
import { getReviewsId } from '../actions/actions'
import Rating from './Rating'
import CustomButton from './CustomButton'
import './Rating.css';
import './Reviews.css';

const Reviews = ({ id, users }) => {

    const [arrayReviews, setarrayReviews] = useState([]);

    useEffect(() => {
        if (!arrayReviews[0] && users) {
            setarrayReviews(users)
        }

    }, [users])

    return (
        <div>
            <h1 className='reviewTitle'>What Customers Have To Say About This Product</h1>

            { arrayReviews.map(review => (
                <div>

                    <br></br>
                    <div >
                        <span className='fecha' class="d-flex flex-row-reverse" >Fecha: {review.reviews.createdAt.split('T')[0]}</span>
                        <Rating className='stars' value={review.reviews.rating} />
                    </div>
                    <p className="customer">{review.first_name} {review.last_name}</p>
                    <p>{review.reviews.description}</p>
                    <br></br>
                    <hr></hr>
                </div>
            ))}
        </div>

    )


}



export default Reviews;

/* import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux'
import { getReviewsId } from '../actions/actions'
import Rating from './Rating'
import CustomButton from './CustomButton'
import './Reviews.css'

const Reviews = ({id, getReviewsId, reviews, users}) => {
     const [ arrayReviews, setarrayReviews ] = useState([]);

    useEffect(() => {
        if (!arrayReviews[0]){
        getReviewsId(id)
        setarrayReviews(reviews)
        console.log("array reviews cargadas",arrayReviews);
        }
    }
    , [reviews])

   return (
    <div>
    {arrayReviews.map(review=>(

           <div>
           <span>{review.createdAt}</span>
           <p>{review.description}</p>
           <Rating className='stars' value={review.rating} />
           </div>
       ))}
    </div>
    )
}

const mapStateToProps = ({products: {reviews}}) => ({
    reviews
})

function mapDispatchToProps(dispatch) {
return {
    getReviewsId:(id) =>dispatch(getReviewsId(id)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reviews)
 */