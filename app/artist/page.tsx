import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ArtistPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-[#121212]">
            <Sidebar role="artist" />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />
                <div className="p-8 text-white">
                    <h1 className="text-3xl font-bold">Artist Dashboard</h1>
                    <p className="text-gray-400 mt-4">Welcome to your artist portfolio.</p>
                </div>
            </div>
        </div>
    );
}