interface LayoutProps {
    children: React.ReactNode
}

export const DefaultLayout = ({children}: LayoutProps) => {

    return (
        <div>
            <div className={"h-14"}/>
            {children}
        </div>
    );
};
