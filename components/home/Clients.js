import React from 'react';
import Swiper from 'react-id-swiper'

const params = {
  direction: 'horizontal',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  slidesPerView: 5,
  slidesPerColumn: 3,
  slidesPerGroup: 5,
  spaceBetween: 15,
  breakpoints: {
    1024: {
      slidesPerView: 5,
      slidesPerColumn: 3,
      slidesPerGroup: 5
    },
    768: {
      slidesPerView: 3,
      slidesPerColumn: 3,
      slidesPerGroup: 3
    },
    640: {
      slidesPerView: 3,
      slidesPerColumn: 3,
      slidesPerGroup: 3
    },
    320: {
      slidesPerView: 2,
      slidesPerColumn: 4,
      slidesPerGroup: 2
    }
  }
}

const Clients = ({ homepage }) => {
  return (
      <div>
        <section id="clients" className="Home__clients Home__section-padding bg-lightgray">

          <div className="container">

            <div className="row">
              <div className="col-sm-12">

                <h2 className="Home__section-title block-center">{homepage.acf.titulo_seccion_clientes}</h2>

              </div>
            </div>



            <div className="Home__clients__slider">

              <Swiper {...params}>

                {homepage.acf.clientes.map((client, index2) => {
                  return (
                      <img className="Home__clients__slider-item" src={client.logotipo.url} alt={client.nombre} title={client.nombre} key={index2} />
                  )
                })}

              </Swiper>

            </div>


          </div>

        </section>


        { /*language=CSS*/ }
        <style jsx>{`            
                .Home__clients {
                    box-sizing: border-box;
                }

                :global(.swiper-slide) {
                    margin-top: 0!important;
                    margin-right: 15px;
                    margin-bottom: 15px;
                }

                .Home__clients__slider {
                    position: relative;
                }

                .Home__clients__slider-item {
                    max-width: 260px;
                }

                :global(.swiper-container) {
                    padding-bottom: 30px;
                    padding-top: 70px;
                }

                :global(.swiper-wrapper) {
                    padding-bottom: 30px;
                }

                :global(.swiper-button-next) {
                    background: url('/img/next-active.png') no-repeat;
                    background-size: contain;
                    width: 40px;
                    height: 40px;
                    top: 30px;
                    right: 45%;
                }

                :global(.swiper-button-prev) {
                    background: url('/img/prev-active.png') no-repeat;
                    background-size: contain;
                    width: 40px;
                    height: 40px;
                    top: 30px;
                    left: 45%;
                }

                :global(.swiper-button-next:after) {
                    display: none;
                }

                :global(.swiper-button-prev:after) {
                    display: none;
                }

                :global(.swiper-pagination-bullet) {
                    width: 20px;
                    height: 20px;
                }

                :global(.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet) {
                    margin: 0 6px;
                }

                :global(.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction) {
                    bottom: 0;
                }


                @media (max-width: 1200px) {
                    
                }

                @media (max-width: 1024px) {
                    :global(.swiper-button-next) {
                        right: 0;
                    }

                    :global(.swiper-button-prev) {
                        left: 0;
                    }
                }

                @media (max-width: 991px) {

                }

                @media (max-width: 767px) {
                    
                }

                @media (max-width: 640px) {
                    :global(.swiper-button-next) {
                        right: 0;
                    }

                    :global(.swiper-button-prev) {
                        left: 0;
                    }
                }

            `}</style>
      </div>
  );
};

export default Clients;
