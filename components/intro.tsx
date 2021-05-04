import React from "react";
import { Header, Icon } from "semantic-ui-react";

const Intro = () => {
  return (
    <>
      <Header as="h2" icon textAlign="center" color="grey">
        <Icon name="write" circular />
      </Header>
      <Header as="h3" icon textAlign="center" color="grey">
        <Header.Content>NoteBooks</Header.Content>
      </Header>
    </>
  );
};

export default Intro;
