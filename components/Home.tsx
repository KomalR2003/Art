import Image from 'next/image';
import group from '../public/Images/Group 370.png';

export default function Home() {
    return (
        <div className="w-full h-full bg-[#121212] text-white p-8 md:p-12 overflow-y-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Left Side: Text Content */}
                <div className="flex-1 space-y-8 w-6/12">
                    <h1 className="text-4xl md:text-6xl font-bold  text-gray-400 leading-relaxed">Step into <br /><span className="text-gray-400 lending-relaxed">creativity, where</span> Art comes alive.</h1>

                    <div className="space-y-4 text-gray-200 text-lg max-w-xl">
                        <p>
                            Explore the beauty of Expression, where creativity knows no
                            limits and inspiration awaits at every corner.
                        </p>
                        <p>
                            Welcome to a space where imagination meets reality, and every
                            piece of art tells a unique story. Step inside, explore, and let
                            creativity inspire your journey.
                        </p>
                    </div>

                    <button className="bg-gradient-to-r from-gray-200 to-gray-400 text-black font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform">
                        EXPLORE MORE
                    </button>
                </div>

                {/* Right Side: Image Collage */}
                <div className="flex-1 h-[500px] w-6/12 flex items-center justify-center">
                    <div className="transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <Image
                            src={group}
                            alt="Art Collage"
                            className="w-[450px] h-auto"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center -800 pt-6">
                <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-gray-400">200+</h3>
                    <p className="font-medium">Artworks Available</p>
                    <p className="text-sm text-gray-500">Explore now</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-gray-400">20</h3>
                    <p className="font-medium">Exhibitions Held</p>
                    <p className="text-sm text-gray-500">Join Our Exhibitions</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-gray-400">1000+</h3>
                    <p className="font-medium">Happy Customers</p>
                    <p className="text-sm text-gray-500">Join with Us</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-gray-400">30</h3>
                    <p className="font-medium">Talented Artists</p>
                    <p className="text-sm text-gray-500">Explore more</p>
                </div>
            </div>
        </div>
    );
}
