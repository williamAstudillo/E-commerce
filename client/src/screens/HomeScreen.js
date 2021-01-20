import React, { useEffect } from 'react';
import Product from '../components/product';
import products from '../products';
import { Jumbotron, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import './HomeScreen.css';
import { logInGoogle } from '../actions/actionAuth';
import background from '../components/images/bannerLow.jpg'


const HomeScreen = ({ logInGoogle }) => {
  // useEffect(() => {
  //   logInGoogle();
  // });
  return (
    <div className='containerHome'>
      <img src={background} className='bannerImage' />
      <div className='bannerContent'>
        <h1 className='bannerTitle'>PETECTIVES</h1>
        <div className='containerIntro'>
          <p className='bannerSub'>
            WE KNOW YOUR PET
          </p>
          <p className='bannerCommitment'>
            We’re commited with providing your loved ones with nothing but the best products
          </p>
        </div>
      </div>
      <LinkContainer to='/products'>
        <button className='welcomeButton'>Enter</button>
      </LinkContainer>
    </div>
    
  );
};

const mapDispatchToProps = (dispatch) => ({
  logInGoogle: () => dispatch(logInGoogle()),
});

export default connect(null, mapDispatchToProps)(HomeScreen);
