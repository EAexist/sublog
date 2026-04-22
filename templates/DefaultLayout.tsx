interface LayoutProps {
    children: React.ReactNode
}

export const DefaultLayout = ({ children }: LayoutProps) => {

    return (
        <div className="min-h-screen flex flex-col">
            <div className={"h-14"} />
            {children}
        </div>
    );
};
