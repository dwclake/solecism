/*
 *
 */

import { Menu, X } from "lucide-react";
import styled from "styled-components";

import { Dropdown, NavButton, WebGLCanvas, Button } from "./ui";
import { init, render } from "../animations/flower/RainbowFlower";

import colors from "styles/colors";

const Container = styled.header`
    grid-area: toolbar;

    display: grid;
    grid-template-columns: 70px 70px 90px 40px 100px 1fr 70px;
    grid-template-areas: "traffic-lights logo title nav actions social spacer";
    height: 30px;
    width: 100%;

    align-content: center;
    align-items: center;

    background-color: ${colors.bg};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 2px 2px 5px ${colors.shade};

    -webkit-app-region: drag;
`;

const Logo = styled(WebGLCanvas)`
    grid-area: logo;
    display: flex;
    object-fit: contain;
    height: 30px;
    width: 30px;

    align-items: center;
    justify-self: center;
`;

const Title = styled.h1`
    grid-area: title;
    display: flex;

    font-size: 2rem;
    color: ${colors.text};
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    margin: 0;
`;

const Socials = styled.nav`
    grid-area: social;
    display: flex;

    position: relative;

    align-items: center;
    justify-self: right;
`;

const SocialButton = styled(Button)``;

export const Toolbar = () => {
    const sendNotification = () => {
        window.electron.os.notify.send("Hello from React!");
    };

    return (
        <Container>
            <Logo
                className="logo"
                width="600"
                height="600"
                onInit={init}
                onRender={render}
            />
            <Title className="abril-fatface-regular">solecism</Title>

            <Dropdown>
                {/**/}
                <Menu size={12} strokeWidth={3} />
                <X size={12} strokeWidth={3} />

                {/**/}
                <NavButton to="/" end>
                    Home
                </NavButton>
                <NavButton to="/about">
                    About
                </NavButton>
            </Dropdown>

            <Socials>
                <SocialButton onClick={sendNotification}>click me</SocialButton>
            </Socials>
        </Container>
    );
};
