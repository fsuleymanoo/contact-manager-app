import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import NavButton from "../components/common/NavButton";
import Circle from "../components/circle/Circle";


function RootLayout() {
  return (
    <>
    <div className="circle-container">
    <Circle width="20rem" positionY="6%" positionX="20%"/>
    <Circle width="25rem" positionY="35%" positionX="90%"/>
    <Circle width="8rem" positionY="90%" positionX="-3%"/>
    </div>
    
      <div className="main-bg-color min-vh-100 d-flex flex-column">
        <Navbar>
          <NavButton to="/login" text="Login" />
        </Navbar>

        <main className="flex-grow-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default RootLayout;
