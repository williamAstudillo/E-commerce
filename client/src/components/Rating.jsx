import React from 'react';
import './Rating.css';

const Rating = ({ value, text }) => {


	return (
		<div>
			<div className='amountReviews'>{text && text}</div>
			<div className='starContainer'>

				<span>
					<i className={value >= 1 ? 'fas fa-star' : value >= 0.5} />
				</span>

				<span>
					<i className={value >= 2 ? 'fas fa-star' : value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
				</span>

				<span>
					<i className={value >= 3 ? 'fas fa-star' : value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
				</span>

				<span>
					<i className={value >= 4 ? 'fas fa-star' : value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
				</span>

				<span>
					<i className={value >= 5 ? 'fas fa-star' : value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
				</span>

			</div>
		</div>
	);
};

export default Rating;