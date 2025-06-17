import ContactInput from "@/components/ContactInput";

import Image from "next/image";
import Link from "next/link";


const page = () => {
  return (
    <>
     
   

      {/* Mobile Navigation Bar */}
    

      {/* Main Content */}
      <div className=" min-h-screen">
        <div className="px-4 lg:px-8 py-6 lg:py-12">
          
          {/* Desktop/Mobile Content */}
          <div className="lg:max-w-6xl lg:mx-auto">
            
            {/* Header Section */}
            <div className="mb-8 lg:mb-12 mt-10">
              <h1 className="text-3xl lg:text-5xl font-bold text-black mb-4 lg:mb-6">
                Let's Connect
              </h1>
              <p className="text-gray-600 text-base lg:text-lg mb-6 lg:mb-8 max-w-lg">
                I'm always open to new opportunities. Feel free to drop me a line if having any questions or projects.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <button className="bg-black text-white px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-base font-medium hover:bg-gray-800 transition-colors">
                  Follow on X
                </button>
                <button className="bg-gray-200 text-gray-800 px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-base font-medium hover:bg-gray-300 transition-colors">
                  Email
                </button>
              </div>
            </div>

            {/* Contact Section */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Contact Form - Mobile First, Desktop Left */}
              <div className="order-2 lg:order-1">
                <ContactInput />
              </div>

              {/* Social Section - Mobile Second, Desktop Right */}
              <div className="order-2 lg:order-">
                <div className="bg-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm">
                  
                  {/* Profile Section */}
                  <div className="  flex flex-col items-start jusify-start " >
                    <div className="w-20 h-20 lg:w-23 lg:h-23 bg-gradient-to-br from-black to-black rounded-full  mb-4 flex items-center justify-center">
                      <Image  
                        src='/profileImage.png' 
                        width={80} 
                        height={80} 
                        alt="Profile"
                        className="flex items-start justify-start"
                      />
                    </div>
                    
                    <h2 className="text-lg lg:text-xl font-semibold text-black mb-2">
                      Also in Social
                    </h2>
                    <p className="text-gray-600 text-sm lg:text-base">
                      Feel free to reach me on any of social networks listed below.
                    </p>
                  </div>

                  {/* Social Icons */}
                  <div className="grid grid-cols-6 gap-3">
                    {[...Array(6)].map((_, index) => (
                      <Link 
                        key={index}
                        href="#"
                        className="w-10 h-10 lg:w-12 lg:h-12  flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Image 
                          src='/globe.svg' 
                          width={18} 
                          height={18} 
                          alt=""
                          className="opacity-60"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
   

      {/* Mobile Side Menu (Hidden by default) */}
      <div className="lg:hidden fixed right-0 top-0 h-full w-80 bg-gray-900 text-white transform translate-x-full transition-transform z-50">
     

          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="flex justify-center space-x-4">
              {[...Array(5)].map((_, index) => (
                <Link 
                  key={index}
                  href="#" 
                  className="text-gray-400"
                >
                  <Image 
                    src='/globe.svg' 
                    width={16} 
                    height={16} 
                    alt=""
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
       
      
    
    </>
  );
};

export default page;