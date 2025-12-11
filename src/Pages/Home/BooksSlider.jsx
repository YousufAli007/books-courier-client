import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BooksSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const slides = [
    {
      img: "https://assets.meetnewbooks.com/docImageNew/1441/atomic-habits--an-easy---proven-way-to-build-good-habits---break-bad-ones-doc-image.webp",
      title: "Atomic Habits",
      author: "James Clear",
      desc: "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
    },
    {
      img: "https://m.media-amazon.com/images/I/01UwfHrld+BL._TSa|size:1910,1000|format:(A,f,b,d,pi,pl,o)|b-src:61Cd2rJZgRL.png|b-pos:0,0,1910,1000|pi-src:71wm29Etl4L.jpg|pi-pos:1000,100,840,840.json",
      title: "The Power of Habit",
      author: "Charles Duhigg",
      desc: "Why We Do What We Do in Life and Business.",
    },
    {
      img: "https://media.istockphoto.com/id/532852345/photo/stack-of-books-in-home-interior.jpg?s=612x612&w=0&k=20&c=xRc6atpQ6b6gYl4MBt42iFvQSi293kC8XyOtVhzYtTc=",
      title: "Discover More Great Reads",
      author: "",
      desc: "Explore our full collection of inspiring books.",
    },
  ];

  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-6">
        <div className="relative">
          {/* Custom Navigation Arrows */}
          <button
            ref={prevRef}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm shadow-xl p-4 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            ref={nextRef}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm shadow-xl p-4 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Swiper Slider */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-white/50",
              bulletActiveClass: "!bg-purple-600 !w-4 !h-4",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={30}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-[400px] md:h-[520px] flex items-center justify-center group cursor-pointer">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Dark Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Content */}
                  <div className="relative z-10 text-white max-w-2xl px-8 text-center md:text-left">
                    {slide.author && (
                      <p className="text-purple-300 text-sm md:text-base font-medium uppercase tracking-wider mb-2">
                        by {slide.author}
                      </p>
                    )}
                    <h2 className="text-3xl md:text-5xl font-bold drop-shadow-2xl mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 drop-shadow-lg mb-8 max-w-lg">
                      {slide.desc}
                    </p>
                    <a
                      href="/all-books"
                      className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-xl transition transform hover:scale-105"
                    >
                      View All Books →
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Styles */}
          <style jsx>{`
            .swiper-pagination {
              bottom: 20px !important;
            }
            .swiper-pagination-bullet {
              width: 12px;
              height: 12px;
              opacity: 0.7;
              transition: all 0.3s ease;
            }
            .swiper-pagination-bullet-active {
              opacity: 1;
              transform: scale(1.3);
              box-shadow: 0 0 15px rgba(147, 51, 234, 0.7);
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default BooksSlider;