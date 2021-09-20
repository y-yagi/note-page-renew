import React from "react";
import { Header, Icon } from "semantic-ui-react";

const Intro = () => {
  return (
    <>
      <Header as="h2" icon textAlign="center" color="grey">
        <Icon name="write" circular title="NoteBooks" />
      </Header>
    </>
  );
};

export default Intro;
