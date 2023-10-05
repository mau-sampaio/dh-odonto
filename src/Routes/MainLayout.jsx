import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { useTheme } from "../context/useTheme";
import Footer from "../Components/Footer/Footer";

export function MainLayout() {
    const { theme } = useTheme();
    return (
        <div className={`${theme} app`}>
            <header >
                <Navbar />
            </header>
            <main className={theme}>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}