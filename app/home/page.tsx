"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Home from "@/components/Home";
import Dashboard from "@/components/User/Dashboard";
import AboutUs from "@/components/User/AboutUs";
import Gallery from "@/components/User/Gallery";
import Products from "@/components/User/Products";
import Events from "@/components/User/Events";
import OurTeam from "@/components/User/OurTeam";
import Blogs from "@/components/User/Blogs";
import ContactUs from "@/components/User/ContactUs";

export default function DashboardPage() {
    const [activeView, setActiveView] = useState("Home");

    const renderContent = () => {
        switch (activeView) {
            case "Home": return <Home />;
            case "Dashboard": return <Dashboard />;
            case "About Us": return <AboutUs />;
            case "Gallery": return <Gallery />;
            case "Products": return <Products />;
            case "Events": return <Events />;
            case "Our Team": return <OurTeam />;
            case "Blogs": return <Blogs />;
            case "Contact Us": return <ContactUs />;
            default: return <Home />;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#121212]">
            <Sidebar role="user" onNavigate={setActiveView} />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />
                {renderContent()}
            </div>
        </div>
    );
}