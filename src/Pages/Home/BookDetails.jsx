import React from 'react';
import Container from '../../Components/Container';
import { useParams } from 'react-router';

const BookDetails = () => {
  const {id} =useParams()
  console.log(id);
  
  return (
     <Container>
      <h1>book details Pages</h1>
     </Container>
  );
};

export default BookDetails;