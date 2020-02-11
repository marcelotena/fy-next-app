import { Component } from 'react'
import Link from 'next/link'
import Headroom from 'react-headroom'
import { Container, Row, Col } from 'react-grid-system'


export default class Nav extends Component {

    render() {
        const { logo, menu } = this.props

        return (
            <Headroom
                pinStart={0}
                style={{
                    /*marginBottom: '-86px',
                    paddingBottom: '86px',*/
                    zIndex: '999',
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 10px 10px 0 rgba(0, 0, 0, 0.1)',
                }}
            >
                <nav>
                    <Container>
                        <Row>
                            <Col sm={6} xs={4}>
                                <Link href='/'>
                                    <a><img className='Nav__logo' src={logo} alt=""/></a>
                                </Link>
                            </Col>
                            <Col sm={6} xs={8}>
                                <ul>
                                    {menu.map(({ id, url, title }) => (
                                        <li key={id}>
                                            <a href={url}>{title}</a>
                                        </li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                    </Container>

                    { /*language=CSS*/ }
                    <style jsx>{`
                  :global(body) {
                    margin: 0;
                    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
                      Helvetica, sans-serif;
                  }
                  nav {
                    float: left;
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 101;
                    text-align: center;
                    padding-top: 15px;
                    padding-bottom: 12px;

                    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1);
                  }
                  /*.headroom--unpinned nav {
                    padding-top: 93px;
                    margin-top: 93px;
                  }*/

                  :global(.headroom) {
                    margin-bottom: -91px;
                    padding-bottom: 91px;
                  }

                  ul {
                    float: right;
                    padding-left: 0;
                  }
                  li {
                    padding: 4px 16px;
                    list-style: none;
                    float: left;
                    border-right: 1px solid #979797;
                  }
                  li:last-child {
                     border-right: 0;
                  }

                  a {
                    color: #4a4a4a;
                    text-decoration: none;
                    font-size: 18px;
                    font-weight: 600;
                    transition: color 0.3s ease-in-out;
                  }
                  a:visited {
                    color: #4a4a4a;
                  }
                  a:hover {
                    color: #4a90e2;
                  }
                  .Nav__logo {
                    float: left;
                    width: 100%;
                    max-width: 95px;
                  }

                  @media (max-width: 991px) {

                  }

                  @media (max-width: 767px) {
                      .Nav__logo {
                        max-width: 70px;
                        padding-top: 5px;
                      }

                      a {
                        font-size: 0.85rem;
                      }

                      nav {
                        padding-top: 10px;
                        padding-bottom: 6px;
                      }

                      ul {
                        margin-top: 14px;
                      }

                      :global(.headroom) {
                        margin-bottom: -74px;
                        padding-bottom: 74px;
                      }
                  }
                `}</style>
                </nav>
            </Headroom>
        )
    }
}
