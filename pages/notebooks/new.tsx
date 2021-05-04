import Head from "next/head";
import Link from "next/link";
import { useCollection } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router";
import * as firebase from "firebase/app";
import { useUser } from "../../lib/useUser";
import Layout from "../../components/layout";
import Notebook from "../../types/notebook";
import NotebookForm from "../../components/notebook-form";
import Signin from "../../components/signin";
import Intro from "../../components/intro";
import { Container } from "semantic-ui-react";
import { fuego } from "@nandorojo/swr-firestore";

const New = () => {
  const { user } = useUser();
  const router = useRouter();
  const { book } = router.query;

  const notebook: Notebook = {
    id: "",
  };

  if (!user) {
    return <Signin />;
  }

  function submit(id: string) {
    const collection = `notebooks-renew/${user?.id}/notebooks/`;
    fuego.db.collection(collection).doc(id).set({});
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Okini</title>
        </Head>
        <Container>
          <Intro />
          <NotebookForm notebook={notebook} action={submit} />
        </Container>
      </Layout>
    </>
  );
};

export default New;
