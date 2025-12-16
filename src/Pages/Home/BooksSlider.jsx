import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";

const BooksSlider = () => {
  const slides = [
    {
      img: "https://i.ibb.co/RGbrVtKW/ecb2f761-0357-42d7-907e-e206cf850188.jpg",
      title: "Book One",
      desc: "A fascinating story about growth and habits.",
    },
    {
      img: "https://i.ibb.co/0VnMhKqb/804a4e97-df45-496c-b488-2e2c6e9ae840.jpg",
      title: "Book Two",
      desc: "Learn step-by-step methods for success.",
    },
    {
      img: "https://i.ibb.co/kgPgrVsp/flat-lay-student-using-disinfectant-desk.jpg",
      title: "Book Three",
      desc: "Transform small actions into long-term achievements.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative container mx-auto px-6">
        <div className="relative">
          {/* Custom Arrows */}
          <div className="custom-prev absolute left-3 top-1/2 -translate-y-1/2 z-50 bg-white/20 backdrop-blur-xl hover:bg-white/40 transition p-3 rounded-full cursor-pointer shadow-lg">
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
              <path
                d="M15 6l-6 6 6 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="custom-next absolute right-3 top-1/2 -translate-y-1/2 z-50 bg-white/20 backdrop-blur-xl hover:bg-white/40 transition p-3 rounded-full cursor-pointer shadow-lg">
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
              <path
                d="M9 18l6-6-6-6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Slider */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={40}
            className="rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.6)]"
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-[400px] sm:h-[500px] flex items-end justify-start group rounded-3xl overflow-hidden shadow-lg">
                  {/* Image */}
                  <img
                    src={slide.img}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-3xl"
                  />

                  {/* Caption with Gradient Background */}
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent rounded-b-3xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                      {slide.title}
                    </h3>
                    <p className="text-gray-200 mt-2">{slide.desc}</p>

                    <Link to="/books" className="btn btnStyle">
                      View All Books
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Pagination */}
      <style>
        {`
          .custom-bullet {
            width: 10px;
            height: 10px;
            background: rgba(255,255,255,0.4);
            border-radius: 50%;
            margin: 0 6px !important;
            transition: 0.3s;
          }
          .custom-bullet-active {
            width: 14px !important;
            height: 14px !important;
            background: #c084fc !important;
            box-shadow: 0 0 12px #c084fc;
          }
        `}
      </style>
    </section>
  );
};

export default BooksSlider;
