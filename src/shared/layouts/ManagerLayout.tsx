import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function ManagerLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className='flex-1'>
                <Sidebar />
                {children}
            </main>
            <Footer />
        </>
    );
}

export default ManagerLayout;