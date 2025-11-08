/*
* The root layout for the website containing the header,
* the footer, and outlet for the main content
*/

import { Outlet } from "react-router-dom";

import styled from "styled-components";
import colors from "styles/colors";

import { Toolbar } from "./components/Titlebar";
import { Infobar } from "./components/Infobar";

const Container = styled.div`
    display: grid;
    grid-template-rows: 30px 1fr 30px;
    grid-template-areas:
        "toolbar"
        "main"
        "infobar";
    box-sizing: border-box;
    gap: 2px;

    overflow: hidden;

    height: 100%;
    width: 100%;
    border-radius: 10px;

    font-size: 1.2rem;
`;

const Main = styled.main`
    grid-area: main;
    display: flex;
    overflow: auto;

    width: 100%;
    height: 100%;

    align-self: stretch;
    justify-self: stretch;

    background-color: ${colors.bg};
`;

export const Layout = () => {
    return (
        <Container className="roboto">
            <Toolbar />
            <Main>
                <Outlet />
            </Main>
            <Infobar />
        </Container>
    );
}
