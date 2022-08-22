import { Nav, Navbar, NavItem } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <>
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="Home" style={{ marginLeft: "10%" }}>
            Home
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="Cars" style={{ marginLeft: "20%" }}>
              Cars
            </Nav.Link>
            <Nav.Link href="Categories" style={{ marginLeft: "20%" }}>
              Categories
            </Nav.Link>
          </Nav>
        </Navbar>
        <br />
      </div>
    </>
  );
};
export default NavigationBar;
