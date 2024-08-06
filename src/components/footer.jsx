import React from 'react'

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light text-center">
            <div className="container p-4 flex flex-col lg:flex-row justify-between items-center">
                <h5 className='text mb-4 lg:mb-0'>© 2024 Todos los derechos reservados</h5>
                <ul className="list-inline flex space-x-4 mb-4 lg:mb-0">
                    <li className="list-inline-item">
                        <a href="https://github.com/Edwinestrada07" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://www.facebook.com/ewiin.estrada" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer

