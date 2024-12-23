function AnonymousLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className='flex-1 relative h-screen'>
                <img src="https://media.tapchitaichinh.vn/w1480/images/upload//2023/09/18/fpt-tower.jpg" alt="FPT Tower" className="w-full h-screen object-cover" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {children}
                </div>
            </main>
        </>
    );
}

export default AnonymousLayout;