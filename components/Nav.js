import { Component } from 'react'
import Link from 'next/link'
import Headroom from 'react-headroom'
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
            primarymenu : [
                { id: 139, url: '#services', title: 'Servicios' },
                { id: 138, url: '#clients', title: 'Clientes' },
                { id: 71, url: '#contact', title: 'Contacto' }
            ],
            locale: ''
        };
    }

    async componentDidMount() {

        Promise.all([
            getMenu(this.props.locale)
        ]).then( results => {
            const [primarymenu] = results

            this.setState({
                primarymenu : primarymenu.data.items,
                locale: this.props.locale
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

        if (this.props.locale !== this.state.locale) {

            Promise.all([
                getMenu(this.props.locale)
            ]).then( results => {
                const [primarymenu] = results

                this.setState({
                    primarymenu : primarymenu.data.items,
                    locale : this.props.locale
                })

            }).catch( failure => {
                const errorState = {
                    failure,
                    failed : true
                }
                this.setState(errorState)
            })

        }

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
                    <div className="container">
                        <div className="row">

                            <div className="col-md-6 col-sm-4 col-xs-3">
                                <Link href='/'>
                                    <a>
                                        <svg className='Nav__logo' viewBox="0 0 79 51" xmlns="http://www.w3.org/2000/svg"><path d="M8.134 22v-8.071h4.057v-5.04H8.134V5.8h4.629V.613H2.172V22h5.962zm9.946 0l.454-3.15h3.53L22.52 22h5.815L23.661.613h-6.724L12.25 22h5.83zm3.413-7.47H19.12l1.172-7.926 1.201 7.925zm12.041 7.895c2.178 0 3.926-.633 5.244-1.897 1.319-1.265 1.978-2.942 1.978-5.032 0-1.25-.264-2.336-.791-3.26-.528-.922-1.68-2.096-3.457-3.522a3.377 3.377 0 01-.176-.147c-1.025-.8-1.538-1.474-1.538-2.021 0-.381.137-.691.41-.93.274-.24.635-.36 1.084-.36.518 0 1.089.145 1.714.433.625.288 1.294.715 2.007 1.282V1.419c-.86-.41-1.692-.718-2.498-.923a9.46 9.46 0 00-2.336-.308c-1.924 0-3.499.584-4.724 1.751-1.226 1.167-1.839 2.654-1.839 4.46 0 1.055.254 2.037.762 2.945.508.908 1.655 2.187 3.442 3.838l.059.058c1.035.977 1.553 1.719 1.553 2.227 0 .43-.154.786-.462 1.07-.307.282-.7.424-1.179.424-.537 0-1.164-.176-1.882-.527-.718-.352-1.502-.865-2.351-1.538v5.903c.86.556 1.694.967 2.505 1.23.81.264 1.635.396 2.475.396zM50.717 22V6.033h3.545V.613H41.18v5.42h3.545V22h5.99zm10.898.454c.938 0 1.836-.132 2.696-.395.859-.264 1.699-.664 2.52-1.202L67.488 22H73.7l-2.973-4.497c.273-.274.546-.574.82-.9.273-.328.552-.687.835-1.078l-2.695-4.145c-.264.41-.533.786-.806 1.128a7.63 7.63 0 01-.85.908l-2.168-3.208c1.084-.82 1.887-1.643 2.41-2.468.522-.825.784-1.682.784-2.571 0-1.416-.525-2.59-1.575-3.523C66.432.713 65.097.247 63.476.247c-1.768 0-3.216.466-4.344 1.399-1.128.933-1.692 2.126-1.692 3.582 0 .722.14 1.447.418 2.175.278.727.7 1.462 1.267 2.204-1.309 1.084-2.27 2.161-2.886 3.23a6.723 6.723 0 00-.923 3.406c0 1.895.567 3.403 1.7 4.527 1.132 1.123 2.666 1.684 4.6 1.684zm1.92-15.366c-.333-.4-.577-.762-.733-1.084-.156-.322-.235-.62-.235-.894 0-.341.105-.622.315-.842.21-.22.476-.33.799-.33a.94.94 0 01.732.33c.195.22.293.5.293.842 0 .284-.073.557-.22.82-.146.264-.464.65-.952 1.158zm-1.392 10.268c-.44 0-.823-.168-1.15-.505a1.64 1.64 0 01-.491-1.18c0-.312.093-.634.278-.966.186-.332.484-.698.894-1.099l2.095 3.018a4.06 4.06 0 01-.857.557 1.853 1.853 0 01-.77.175zM11.59 50v-8.584l4.951-12.803h-6.299l-1.626 6.563-1.611-6.563H.707l4.937 12.803V50h5.947zm12.1.425c2.538 0 4.501-.967 5.888-2.9 1.387-1.934 2.08-4.669 2.08-8.204 0-3.545-.696-6.286-2.087-8.225-1.392-1.938-3.352-2.908-5.882-2.908-2.539 0-4.509.972-5.91 2.916-1.402 1.943-2.102 4.682-2.102 8.217 0 3.526.698 6.258 2.094 8.196 1.397 1.939 3.37 2.908 5.918 2.908zm0-5.464c-.733 0-1.246-.408-1.539-1.223-.293-.816-.44-2.337-.44-4.563 0-2.227.147-3.75.44-4.57.293-.82.806-1.231 1.538-1.231.723 0 1.228.405 1.517 1.216.288.81.432 2.339.432 4.585s-.144 3.772-.432 4.577c-.289.806-.794 1.209-1.517 1.209zm16.933 5.464c2.549 0 4.417-.647 5.603-1.941 1.187-1.294 1.78-3.338 1.78-6.13v-13.74h-5.991v14.31c0 .626-.113 1.087-.337 1.385-.225.298-.576.447-1.055.447-.469 0-.815-.15-1.04-.447-.225-.298-.337-.76-.337-1.384V28.613h-5.962v13.74c0 2.793.589 4.837 1.765 6.13 1.177 1.295 3.035 1.942 5.574 1.942zM56.269 50v-8.276L58.964 50h6.328l-4.233-9.478c1.2-.527 2.102-1.232 2.702-2.116.6-.884.901-1.95.901-3.2 0-2.032-.669-3.639-2.007-4.82-1.338-1.182-3.169-1.773-5.493-1.773h-6.87V50h5.977zm0-11.85v-5.098h.234c.693 0 1.216.212 1.567.637.352.425.528 1.062.528 1.912 0 .869-.186 1.506-.557 1.911-.371.405-.962.618-1.772.637zm14.633 12.275c2.178 0 3.926-.633 5.244-1.897 1.319-1.265 1.978-2.942 1.978-5.032 0-1.25-.264-2.336-.791-3.26-.527-.922-1.68-2.096-3.457-3.522a3.377 3.377 0 01-.176-.147c-1.025-.8-1.538-1.474-1.538-2.021 0-.381.137-.691.41-.93.274-.24.635-.36 1.084-.36.518 0 1.09.145 1.714.433.625.288 1.294.715 2.007 1.282v-5.552c-.86-.41-1.692-.718-2.498-.923a9.46 9.46 0 00-2.336-.308c-1.924 0-3.499.584-4.724 1.751-1.226 1.167-1.839 2.654-1.839 4.46 0 1.055.254 2.037.762 2.945.508.908 1.655 2.187 3.443 3.838l.058.058c1.035.977 1.553 1.719 1.553 2.227 0 .43-.154.786-.462 1.07-.307.282-.7.424-1.179.424-.537 0-1.164-.176-1.882-.527-.718-.352-1.502-.865-2.351-1.538v5.903c.86.556 1.694.967 2.505 1.23.81.264 1.635.396 2.475.396z" fill="#000" fillRule="nonzero"/></svg>
                                    </a>
                                </Link>
                            </div>

                            <div className="col-md-6 col-sm-8 col-xs-9">
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
                            </div>
                        </div>
                    </div>

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
                    width: 95px;
                    height: 61px;
                  }

                  @media (max-width: 991px) {

                  }

                  @media (max-width: 767px) {
                      .Nav__logo {
                        width: 70px;
                        height: 50px;
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
                        font-size: 0.75rem;
                      }

                      li {
                        padding: 4px 8px;
                      }

                  }

                  @media (max-width: 350px) {
                      .Nav__logo {
                        width: 49px;
                        height: 50px;
                        padding-top: 10px;
                      }

                      a {
                        font-size: 0.65rem;
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
