import * as React from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";

export const Navigation = () => (
    <Navbar bg="dark" variant="dark" collapseOnSelect
        expand="lg">
        <Navbar.Brand>FunColl</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href={routes.HOME}>Home</Nav.Link>
            <Nav.Link href={routes.PROFILE}>My profile</Nav.Link>
        </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info" className="mr-sm-2">Search</Button>
            <Button type="button" className="register">
                Logout
            </Button>
        </Form>
    </Navbar>
);

