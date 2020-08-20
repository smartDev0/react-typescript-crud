import React, { Component } from "react";
import styled from "styled-components";
import * as routes from "./../../constants/routes";
import { Navigation } from "./../../components/Navigation/Navigation";

class HomePage extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <div>
                    home
                </div>
            </div>
        );
    }

};
export default HomePage;