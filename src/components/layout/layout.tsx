import React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "../ui/button";
import { ChevronUp } from "lucide-react";
interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="relative">
            <div className="w-full shadow-lg rounded-lg mb-16">
                <Header />
            </div>
            <main className="my-2 min-h-svh pt-4">{children}</main> {/* Main content */}
            <footer>
                <Footer />
            </footer>

            <Button variant={"default"} size={ "icon"} onClick={() => window.scrollTo(0, 0)} className="fixed bottom-4 right-4">
                <ChevronUp size={24} />
            </Button>

        </div>
    );
};

export default Layout;