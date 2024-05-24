import Logo from "@/components/layout/logo";
import NavigationBar from "@/components/layout/navbar";

const Header = () => {
    return (
        <header className="mx-auto lg:px-36 container h-20 justify-between flex items-center text-primary">
            <Logo />
            <NavigationBar />
        </header>
    );
}

export default Header;