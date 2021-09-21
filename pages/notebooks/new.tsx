import Head from "next/head";
import { useRouter } from "next/router";
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
          <title>NoteBook</title>
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
