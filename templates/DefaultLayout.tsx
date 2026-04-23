interface LayoutProps {
    children: React.ReactNode
}

export const DefaultLayout = ({ children }: LayoutProps) => {

    return (
        <div className="min-h-dvh flex flex-col">
            <div className={"h-14"} />
            {children}
        </div>
    );
};
