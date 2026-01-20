interface ViewportHeightLayoutProps {
    children: React.ReactNode
}

export const ViewportHeightLayout = ({ children }: ViewportHeightLayoutProps) => {

    return (
        <main className="h-svh w-full flex flex-col">
            {children}
        </main>
    );
};
