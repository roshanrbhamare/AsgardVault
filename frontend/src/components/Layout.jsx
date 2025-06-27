import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </>
  );
};

export default Layout;
