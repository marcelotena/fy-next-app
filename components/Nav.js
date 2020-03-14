import { Component } from 'react'
import Link from 'next/link'
import Headroom from 'react-headroom'
import { Container, Row, Col } from 'react-grid-system'
import ScrollspyNav from 'react-scrollspy-nav'
import fetch from "isomorphic-unfetch";
import {DOMAIN_URL, FY_CUSTOM_API, WP_REST_API} from "../utils/constants";
import { defaultLocale } from "../translations/config"


const processResponse = res => {
    if (res.status < 200 || res.status >= 400) {
        throw new Error ("Not accepted response code " + res.status)
    }

    return res.json()
}

function getLogo() {
    let url = `${DOMAIN_URL}${FY_CUSTOM_API}/logo`
    return fetch(url).then(processResponse)
}

function getMenu(loc) {
    const primarymenuId = 3
    let locale = loc;

    if (loc === defaultLocale) {
        locale = '';
    } else {
        locale = `/${loc}`;
    }

    let url = `${DOMAIN_URL}${locale}${WP_REST_API}/menus/${primarymenuId}`
    return fetch(url).then(processResponse)
}


export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logo : {},
            primarymenu : []
        };
    }

    async componentDidMount() {

        Promise.all([
            getLogo(),
            getMenu(this.props.locale)
        ]).then( results => {
            const [logo, primarymenu] = results

            this.setState({
                logo: logo,
                primarymenu : primarymenu.data.items
            })

        }).catch( failure => {
            const errorState = {
                failure,
                failed : true
            }
            this.setState(errorState)
        })

    }

    componentDidUpdate() {

        /*Promise.all([
            getLogo(),
            getMenu(this.props.locale)
        ]).then( results => {
            const [logo, primarymenu] = results

            this.setState({
                logo: logo,
                primarymenu : primarymenu.data.items
            })

        }).catch( failure => {
            const errorState = {
                failure,
                failed : true
            }
            this.setState(errorState)
        })*/

    }


    render() {

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
                            <Col md={6} sm={4} xs={3}>
                                <Link href='/'>
                                    <a><img className='Nav__logo' src={this.state.logo.source_url} alt=""/></a>
                                </Link>
                            </Col>
                            <Col md={6} sm={8} xs={9}>
                                <ul>
                                    <ScrollspyNav
                                        scrollTargetIds={['services', 'clients', 'contact']}
                                        activeNavClass='active'
                                        scrollDuration='500'
                                    >
                                    {this.state.primarymenu.map(({ id, url, title }) => (
                                            <li key={id}>
                                                <a href={url}>{title}</a>
                                            </li>
                                    ))}
                                    </ScrollspyNav>
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
                  a:hover,
                  a.active {
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
                        font-size: 0.80rem;
                      }

                      nav {
                        padding-top: 10px;
                        padding-bottom: 6px;
                      }

                      ul {
                        margin-top: 14px;
                      }

                      li {
                        padding: 4px 10px;
                      }

                      :global(.headroom) {
                        margin-bottom: -74px;
                        padding-bottom: 74px;
                      }
                  }

                  @media (max-width: 380px) {

                      a {
                        font-size: 0.60rem;
                      }

                      li {
                        padding: 4px 8px;
                      }

                  }

                  @media (max-width: 350px) {
                      .Nav__logo {
                        max-width: 49px;
                        padding-top: 10px;
                      }

                      a {
                        font-size: 0.55rem;
                      }

                      li {
                        padding: 4px 8px;
                      }

                  }
                `}</style>
                </nav>
            </Headroom>
        )
    }
}
