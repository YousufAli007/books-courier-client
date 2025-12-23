import React from 'react';
import Container from '../../Components/Container';
import BooksSlider from './BooksSlider';
import WhyChooseBookCourier from './WhyChooseBookCourier';
import { HowBookCourierWorks } from './HowBookCourierWorks';
import { SpecialFeatures } from './SpecialFeatures';
import LatestBook from './LatestBook';
import Coverage from './Coverage ';

const Home = () => {
  return (
    <Container>
      
      <BooksSlider/>
      <LatestBook/>
      <WhyChooseBookCourier/>
      <Coverage></Coverage>
      <HowBookCourierWorks/>
      <SpecialFeatures/>
    </Container>
  );
};

export default Home;