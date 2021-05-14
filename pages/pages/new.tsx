import Head from "next/head";
import { useCollection } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router";
import * as firebase from "firebase/app";
import { useUser } from "../../lib/useUser";
import Layout from "../../components/layout";
import Page from "../../types/page";
import PageForm from "../../components/page-form";
import Intro from "../../components/intro";
import Signin from "../../components/signin";
import { Container } from "semantic-ui-react";

const New = () => {
  const { user } = useUser();
  const router = useRouter();
  const { book } = router.query;

  const page: Page = {
    id: "",
    userId: "",
    noteBookId: "",
    name: "",
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const collection = `notebooks-renew/${user?.id}/notebooks/${book}/pages`;
  const { add } = useCollection(collection);
  const timestamp = () => firebase.firestore.FieldValue.serverTimestamp();

  if (!user) {
    return <Signin />;
  }

  function submit(name: string, content: string) {
    add({
      name: name,
      content: content,
      userId: user?.id,
      noteBookId: book as string,
      createdAt: timestamp(),
      updatedAt: timestamp(),
    });
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Okini</title>
        </Head>
        <Container>
          <Intro />
          <PageForm page={page} action={submit} />
        </Container>
      </Layout>
    </>
  );
};

export default New;
