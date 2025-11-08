/*
 *
 * @TODO Should display word count, current file name, etc; which will be
 * accessed from the redux store
 */

import styled from "styled-components";
import colors from "styles/colors";

const Container = styled.footer`
  grid-area: infobar;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas: "project filename wordcount saved";
  height: 30px;
  width: 100%;

  align-content: center;

  background-color: ${colors.bg};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 2px 2px 5px ${colors.shade};
`;

const Item = styled.span<{ area: "project" | "filename" | "wordcount" | "saved" }>`
  text-align: center;
  grid-area: ${p => p.area};
  ${p => (p.area === "filename" ? "justify-self: left;" : "")}
  ${p => (p.area === "wordcount" ? "justify-self: right;" : "")}
`;

export const Infobar = () => {
    return (
        <Container>
            <Item area="project">{"odyssey"}</Item>
            <Item area="filename">{"scene one"}</Item>
            <Item area="wordcount">word count: {12}</Item>
            <Item area="saved">last saved: {"now" || "12 minutes ago"}</Item>
        </Container>
    );
}
