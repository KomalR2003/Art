import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AdminPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-[#121212]">
            <Sidebar role="admin" />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />
                <div className="p-8 text-white">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-400 mt-4">Welcome to the admin area.</p>
                </div>
            </div>
        </div>
    );
}