import { RNTag } from "../interfaces/releaseNote.interface";
import NewIcon from "../assets/images/new.png";
import DepIcon from "../assets/images/deprecated.png";
import FeaturedIcon from "../assets/images/featured.png";
import FixedIcon from "../assets/images/fixed.png";
import BugIcon from "../assets/images/bug.png";
import ChangedIcon from "../assets/images/changed.png";
import Styled from "styled-components";

export const RNBadge = ({ tag, type }: { tag: RNTag; type?: string }) => {
    return (
        <RNBadgeContainer tag={tag} type={type}>
            <div className="icon">
                {
                    <img
                        src={
                            tag === "new"
                                ? NewIcon
                                : tag === "deprecated"
                                ? DepIcon
                                : tag === "featured"
                                ? FeaturedIcon
                                : tag === "fixed"
                                ? FixedIcon
                                : tag === "bug"
                                ? BugIcon
                                : tag === "changed"
                                ? ChangedIcon
                                : null
                        }
                        width={type === "tag" ? "18px" : "22px"}
                    />
                }
            </div>
            <RNBadgeTitle type={type}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</RNBadgeTitle>
        </RNBadgeContainer>
    );
};

interface IRNBadgeContainer {
    tag: RNTag;
    type?: string;
}
interface IRNBadgeTItle {
    type?: string;
}

const RNBadgeContainer = Styled.div<IRNBadgeContainer>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${(props) => (props.type === "tag" ? "4px" : "6px")};
    border-radius: 4px;
    width: fit-content;
    margin-top: 4px;
    margin-bottom: 4px;
    background-color: ${(props) =>
        props.tag === "new"
            ? "rgba(0,87,255,0.15)"
            : props.tag === "deprecated"
            ? "rgba(235, 87, 87, 0.15)"
            : props.tag === "featured"
            ? "rgba(71,255,145, 0.15)"
            : props.tag === "fixed"
            ? "#E8E8E8"
            : props.tag === "bug"
            ? "rgba(255,0,0,0.38)"
            : props.tag === "changed"
            ? "#F4E7DB"
            : "#FFFFFF"};
`;
const RNBadgeTitle = Styled.div<IRNBadgeTItle>`
    margin-left: 6px;
    margin-bottom: 0;
    text-align: center;
    font-size: ${(props) => (props.type === "tag" ? "12px" : "19px")}
    font-weight: 800
`;
