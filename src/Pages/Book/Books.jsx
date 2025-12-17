import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import Container from '../../Components/Container';
import { Link } from 'react-router';

const Books = () => {
  const axiosSecure =useAxiosSecure()
  const {data:books =[]}=useQuery({
    queryKey:['books'],
    queryFn:async ()=>{
      const res =await axiosSecure.get('/books')
      return res.data
    }
  })
  console.log(books);
  
  return (
    <Container>
      <h1>Total books {books.length}</h1>
      <div className="  mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-center mb-8">Latest Books</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          { books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col"
            >
              {/* Image */}
              <img
                src="https://cdn.pixabay.com/photo/2016/10/26/10/05/book-1771073_1280.jpg"
                alt={book.bookName}
                className="w-full h-48 object-cover rounded-t-xl"
              />

              {/* Content */}
              <div className="p-4 space-y-2 flex-grow">
                <h3 className="text-lg font-semibold">{book.bookName}</h3>

                <p className="text-sm text-gray-600">Author: {book.author}</p>

                <p className="text-sm text-gray-600">
                  Seller: {book.sellerName}
                </p>

                <p className="font-bold">৳ {book.price}</p>
              </div>

              {/* Button */}
              <div className="p-4 pt-0 ">
                <Link to={`/book-details/${book._id}`}>
                  <button className="w-full btn btnStyle    py-2 rounded-lg hover:bg-primary/90 transition">
                    Book Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Books;