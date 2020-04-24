import React from 'react';

const Hero = ({ homepage }) => {
  return (
      <div>
        <section className="Home__hero">
          <div className="container">

            <div className="row">
              <div className="col-sm-6">
                <h1 className="Home__title">{homepage.title.rendered}</h1>
                <div className="Home__content" dangerouslySetInnerHTML={{__html: homepage.content.rendered}}></div>
              </div>

              <div className="col-sm-6">
                <div className="Home__featured-image">
                  <img src={ homepage.better_featured_image.source_url } alt={homepage.better_featured_image.alt_text}/>
                </div>
              </div>
            </div>

          </div>
        </section>


        { /*language=CSS*/ }
        <style jsx>{`            
                .Home__hero {
                    float: left;
                    width: 100%;
                    background-image: linear-gradient(to right, #4a90e2 27%, #9ac4ff 44%, rgba(154, 196, 255, 0) 52%), linear-gradient(to bottom, #a6cafe 7%, #9ac4ff 24%, #9ac4ff 47%, #9ac4ff 68%, #a6cafe 91%);

                    padding-top: 30px;
                    padding-bottom: 40px;
                }

                .Home__title {
                    color: white;
                    font-size: 2.8rem; /* 48px */
                    line-height: 1.15;
                    max-width: 450px;
                    margin-bottom: 20px;
                }

                .Home__content {
                    color: white;
                    font-size: 1.5rem; /* 24px */
                    font-weight: 500;
                    line-height: 1.4;
                    max-width: 500px;
                }

                .Home__featured-image {
                    position: relative;
                    width: 100%;
                    max-width: 600px;
                }

                .Home__featured-image img {
                    padding-top: 0;
                    margin-right: -70px;
                    margin-bottom: -30px;
                }

                @media (max-width: 1200px) {
                    .Home__featured-image {
                        margin-right: 0;
                    }
                }

                @media (max-width: 991px) {
                    .Home__title {
                        font-size: 2.375rem; /* 38px */
                        line-height: 1.20;
                        margin-bottom: 10px;
                        margin-top: 15px;
                    }

                    .Home__content {
                        font-size: 1.125rem; /* 18px */
                        line-height: 1.5;
                        max-width: 370px;
                    }

                    .Home__featured-image img {
                        max-width: 550px;

                        padding-top: 30px;
                        margin-right: -70px;
                        margin-bottom: -100px;
                    }
                }

                @media (max-width: 767px) {
                    .Home__title {
                        text-align: center;
                        margin-left: auto;
                        margin-right: auto;
                        font-size: 1.8rem;
                        max-width: 400px;
                    }

                    .Home__content {
                        text-align: center;
                        margin-left: auto;
                        margin-right: auto;
                        font-size: 1.1rem;
                        max-width: 400px;
                    }

                    .Home__hero {
                        background-image: linear-gradient(to bottom, #4a90e2 27%, #9ac4ff 44%, rgba(154, 196, 255, 0) 52%), linear-gradient(to left, #a6cafe 7%, #9ac4ff 24%, #9ac4ff 47%, #9ac4ff 68%, #a6cafe 91%);
                    }

                    .Home__featured-image {
                        padding-top: 20px;
                        margin-right: auto;
                        margin-left: auto;
                        text-align: center;
                    }

                    .Home__featured-image img {
                        margin-bottom: -75px;
                        width: 100%;
                        max-width: 450px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                }

            `}</style>
      </div>
  );
};

export default Hero;
