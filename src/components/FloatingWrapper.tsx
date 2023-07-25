import { styled } from "styled-components";

interface Size {
    width?: string;
    height?: string;
    borderRadius?: string;
}

export const FloatingWrapper = styled.div<Size>`
    display: flex;
    padding: 4%;
    flex-direction: column;
    align-items: center;
    width: ${(props) => props.width || ""};
    height: ${(props) => props.height || ""};
    border-radius: ${(props) => props.borderRadius || "50px"};
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
