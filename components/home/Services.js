import React from 'react';

const Services = ({ homepage }) => {
  return (
      <div>
        <section id="services" className="Home__services">

          <div className="Home__services__left-column">

            <div className="Home__services__inner-content Home__section-padding">
              {homepage.acf.servicios_destacados.map((service, index) => {
                return (
                    <div className="Home__services__service" key={index}>
                      <div className="row">

                        <div className="col-md-4 col-sm-3">
                          <div className="Home__services__icon-container" dangerouslySetInnerHTML={{__html: service.icono}}></div>
                        </div>
                        <div className='col-md-8 col-sm-9'>
                          <h2 className="Home__services__service-title">{service.titulo_del_servicio}</h2>
                          <p className="Home__services__service-content">{service.descripcion_del_servicio}</p>
                        </div>
                      </div>
                    </div>
                )
              })}
            </div>

          </div>

          <div className="Home__services__right-column">

            <div className="Home__services__inner-content Home__section-padding">
              <h2 className="Home__section-title">{homepage.acf.titulo_seccion_servicios}</h2>
              <div className="Home__section-content" dangerouslySetInnerHTML={{__html: homepage.acf.presentacion_servicios}}></div>
            </div>

          </div>

        </section>


        { /*language=CSS*/ }
        <style jsx>{`            
                .Home__services__left-column,
                .Home__services__right-column {
                    width: 50%;
                    float: left;
                }

                .Home__services__left-column .Home__services__inner-content,
                .Home__services__right-column .Home__services__inner-content {
                    max-width: 570px;
                    box-sizing: border-box;
                }

                .Home__services__left-column .Home__services__inner-content {
                    float: right;
                }

                .Home__services__right-column .Home__services__inner-content {
                    float: left;
                }

                .Home__services__left-column {
                    background: #4a4a4a;
                }

                .Home__services__service {
                    margin-bottom: 15px;
                }

                .Home__services__service-title {
                    color: white;
                    font-size: 1.125rem; /* 18px */
                    font-weight: 500;
                    margin-top: 20px;
                }

                .Home__services__service-content {
                    color: white;
                    font-size: 1rem; /* 16px */
                    font-weight: 400;
                    line-height: 1.5;
                }

                @media (max-width: 991px) {
                    /* Services section styles */
                    .Home__services__left-column,
                    .Home__services__right-column {
                        width: 100%;
                        float: left;
                    }

                    .Home__services__left-column .Home__services__inner-content,
                    .Home__services__right-column .Home__services__inner-content {
                        max-width: 750px;
                        box-sizing: border-box;
                    }

                    .Home__services__left-column .Home__services__inner-content,
                    .Home__services__right-column .Home__services__inner-content{
                        float: none;
                        margin: 0 auto;
                    }

                }

                @media (max-width: 767px) {
                    .Home__services__service {
                        margin-bottom: 30px;
                    }

                    .Home__services__left-column .Home__services__inner-content,
                    .Home__services__right-column .Home__services__inner-content {
                        max-width: 540px;
                        box-sizing: content-box;
                    }
                }

            `}</style>
      </div>
  );
};

export default Services;
