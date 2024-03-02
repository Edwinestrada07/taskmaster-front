import React from 'react'

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light text-center">
            <div className="container p-4">
                <h5 className='text'>Redes Sociales</h5>
                
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="https://github.com/Edwinestrada07">
                                <i className="fab fa-github"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="https://www.linkedin.com/feed/">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="https://www.facebook.com/ewiin.estrada">
                                <i className="fab fa-facebook"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="https://twitter.com">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </li>
                    </ul>
                <span>© 2024 Todos los derechos reservados</span>
            </div>
        </footer>
    );
}

export default Footer;
