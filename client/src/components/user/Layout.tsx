const Layout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={`body flex flex-col items-center min-h-screen p-4 gap-5 mt-10 px-10 w-full ${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </section>
  );
};

export default Layout;
