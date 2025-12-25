interface ViewportHeightLayoutProps {
    children: React.ReactNode
}

export const ViewportHeightLayout = ({children} : ViewportHeightLayoutProps) => {

  return (
      <div className="h-dvh w-full flex flex-col">
          {children}
        </div>
  );
};
