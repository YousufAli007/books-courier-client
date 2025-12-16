import React from 'react';
import Container from '../../Components/Container';
import BooksSlider from './BooksSlider';
import WhyChooseBookCourier from './WhyChooseBookCourier';
import { HowBookCourierWorks } from './HowBookCourierWorks';
import { SpecialFeatures } from './SpecialFeatures';
import LatestBook from './LatestBook';

const Home = () => {
  return (
    <Container>
      
      <BooksSlider/>
      <LatestBook/>
      <WhyChooseBookCourier/>
      <HowBookCourierWorks/>
      <SpecialFeatures/>
    </Container>
  );
};

export default Home;