import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLearnMore, setShowLearnMore] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica si el usuario está autenticado
        if (!localStorage.getItem('token')) {
            // Redirige al login si no está autenticado
            navigate('/login');
        } else {
            setLoggedIn(true);
        }
    }, [navigate]);

    const handleLearnMoreClick = () => {
        setShowLearnMore(true);
    };

    return (
        <section className="bg-gradient-to-b from-[#E8E3F5] via-[#EDEAFB] to-[#F7FAFC]">
            <div className="items-center px-8 mx-auto max-w-7xl lg:px-16 md:px-12">
                <div className="justify-center w-full text-center lg:p-5 max-auto">
                    <div className="justify-center w-full mx-auto">
                        <div class="flex flex-col items-center justify-center max-w-xl gap-3 mx-auto lg:flex-row">
                            <img
                                class='w-28 h-28 rounded-full border border-[#E8E3F4]'
                                src='https://i.pinimg.com/736x/97/f0/cb/97f0cb0bd91313be32a74ff14584d0f7.jpg'
                            />
                        </div>

                        <p class="sm:mt-8 mt-3 sm:px-44 text-[#10172A] text-4xl sm:text-6xl font-semibold tracking-tighter">
                            <span class="underline leading-8 underline-offset-8	decoration-8 decoration-[#8B5CF6]">TaskMaster </span> 
                            es tu aliado perfecto para organizar tus tareas diarias.
                        </p>

                        <p class="sm:mt-8 mt-2.5 text-[#10172A] sm:px-72  sm:leading-loose text-lg font-normal tracking-tighter">
                            TaskMaster transforma tu manera de gestionar tus tareas, haciéndolo todo más simple y eficiente. ¡Empieza ahora y alcanza tus metas con facilidad!
                        </p>

                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <NavLink
                                to="/get-started"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Empezar
                            </NavLink>
                            <NavLink to="/home" className="text-sm font-semibold leading-6 text-gray-900">
                                Leer más <span aria-hidden="true">→</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div className="container mx-auto px-4">
                
                
                <div className="mt-8">
                    <Carousel showThumbs={false} autoPlay infiniteLoop>
                        <div>
                            <img src="./assets/blog-2.jpg" alt="Imagen 1" />
                        </div>
                        <div>
                            <img src="./assets/blog-2.jpg" alt="Imagen 2" />
                        </div>
                        <div>
                            <img src="./assets/blog-1.jpg" alt="Imagen 3" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default Home;





<section class="pb-12 bg-gradient-to-b from-[#E8E3F5] via-[#EDEAFB] to-[#F7FAFC]">
                <div class="items-center pt-12 px-8 mx-auto max-w-7xl lg:px-16 md:px-12">
                  <div class="justify-center w-full text-center lg:p-10 max-auto">
                    <div class="justify-center w-full mx-auto">

                    <div class="flex flex-col items-center justify-center max-w-xl gap-3 mx-auto lg:flex-row">
                    <img
                        class='w-32 h-32 rounded-full border border-[#E8E3F4]'
                        src='https://i.pinimg.com/736x/97/f0/cb/97f0cb0bd91313be32a74ff14584d0f7.jpg'
                    />
                    </div>


                    <p class="mt-4 sm:px-32 text-[#10172A] sm:text-xl text-sm font-semibold tracking-tighter">
                       by @Coderinbay 🏝️
                      </p>

                      <p class="sm:mt-8 mt-3 sm:px-44 text-[#10172A] text-4xl sm:text-6xl font-semibold tracking-tighter">
                       Failed <span class="underline leading-8 underline-offset-8	decoration-8 decoration-[#8B5CF6]">Products</span> Of Top Brands.
                      </p>

                      <p class="sm:mt-8 mt-2.5 text-[#10172A] sm:px-72  sm:leading-loose text-lg font-normal tracking-tighter">
                      I'm a <span class="font-semibold">fullstack developer</span>, 9 - 9 <span class="font-semibold">remote</span> worker, community builder, and a <span class="font-semibold">solo</span> traveller. I love to build <span class="font-semibold">apps</span> that solve real life problems.
                      </p>
                    </div>
                  </div>
              
                </div>
           


 <div class="text-center space-x-4 mt-6">
  <button class="bg-[#8B5CF6] translate-y-1 text-[#fff] sm:text-lg text-xs font-bold py-2.5 px-6  rounded-full inline-flex items-center">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
</svg>


    &nbsp; &nbsp;<span> Add A Product </span>
  </button>
</div>

</section>