import { Component } from 'react'
import Link from 'next/link'

/*const links = [
  { href: '#', label: 'Contact' },
  { href: '#', label: 'Log-in' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})*/

export default class Nav extends Component {

    render() {
        const { logo, menu } = this.props

        return (
            <nav>
                <div className="container">
                    <div className='Nav__columns'>
                        <div className='Nav__column'>
                            <Link href='/'>
                                <a><img className='Nav__logo' src={logo} alt=""/></a>
                            </Link>
                        </div>
                        <div className='Nav__column'>
                            <ul>
                                {menu.map(({ id, url, title }) => (
                                    <li key={id}>
                                        <a href={url}>{title}</a>
                                    </li>
                                ))}
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
                    position: relative;
                    z-index: 101;
                    text-align: center;
                    padding-top: 15px;
                    padding-bottom: 10px;

                    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1);
                  }
                  .Nav__columns {
                    display: flex;
                    justify-content: space-between;

                  }
                  ul {
                    float: right;
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
                  .Nav__column {
                    display: flex;
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
                    max-width: 100px;
                  }
                `}</style>
            </nav>
        )
    }
}
