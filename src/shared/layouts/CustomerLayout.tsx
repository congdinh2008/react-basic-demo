import Footer from "../components/Footer";
import Header from "../components/Header";

function CustomerLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className='flex-1'>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default CustomerLayout;