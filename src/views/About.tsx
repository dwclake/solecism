/*
 * The view for the about page
 */

import styled from "styled-components";

const View = styled.div`
    display: grid;

    grid-template-columns: 100%;
    grid-template-areas: "idk";
    width: 100%;
    height: 100%;
`;

const P = styled.p`
    justify-self: center;
`;

export const About = () => {
    return (
        <>
            <View>
                <P>About stuff</P>
            </View>
        </>
    );
}