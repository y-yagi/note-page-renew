import { useUser } from "../lib/useUser";
import Intro from "../components/intro";
import Layout from "../components/layout";
import Pages from "../components/pages";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Container } from "semantic-ui-react";

const Index = () => {
  const { user, logout } = useUser();

  if (!user) {
    return (
      <>
        <p>
          Please signed in.{" "}
          <Link href={"/auth"}>
            <a>Sign in</a>
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      <Layout>
        <Head>
          <title>NoteBook</title>
        </Head>
        <Container className="main-container">
          <Intro />
          <Pages />
        </Container>
      </Layout>
    </>
  );
};

export default Index;
