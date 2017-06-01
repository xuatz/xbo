import React from "react";
import { Container, Item } from "./common/FlexContainer";

const styles = {
    groupCard: {
        marginRight: "10px"
    }
};

const GroupCards = props => {
    let { popularDomains = [] } = props;

    return (
        <Container
            style={{
                flexFlow: "row wrap",
                justifyContent: "flex-start"
            }}>
            <Item style={styles.groupCard}>
                <h2>
                    Popular Websites
                </h2>

                {popularDomains.map((item, key) => (
                    <div key={key}>
                        <a>
                            {item.domain + ": " + item.bookmarks.length}
                        </a>
                    </div>
                ))}
            </Item>
            <Item style={styles.groupCard}>
                <h2>
                    TODO items
                </h2>
            </Item>
        </Container>
    );
};

export default GroupCards;
