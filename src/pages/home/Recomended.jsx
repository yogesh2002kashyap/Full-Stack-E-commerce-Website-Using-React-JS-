import React from 'react'
import BookCard from '../books/bookCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination , Navigation} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';




const Recomended = () => {

   const {data: books = [] } = useFetchAllBooksQuery();
  
  return (
    <div className='py-17'>
        <h2 className='text-3xl font-semibold mb-6'>Recomended For You</h2>

          <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
       
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          }, 
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1150: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper">
         {
             books.length > 0 && books.slice(8,18).map((book, index)=> (
                    <SwiperSlide key={index}>
                      <BookCard  book={book} />
                    </SwiperSlide>
          
              ))
         }
       
        </Swiper>

    </div>
  )
}

export default Recomended