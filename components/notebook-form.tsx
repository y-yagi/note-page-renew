import { Formik } from "formik";
import { Button, Form, Dimmer, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Notebook from "../types/notebook";

interface Props {
  notebook: Notebook;
  action: Function;
}

const NotebookForm: NextPage<Props> = ({ notebook, action }) => {
  const router = useRouter();

  return (
    <section>
      <h3 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        Notebooks
      </h3>
      <Formik
        initialValues={{
          id: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          action(values["id"]);
          router.push("/");
        }}
        enableReinitialize={true}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field required>
              <label>Notebook ID</label>
              <input
                placeholder="ID"
                required
                name="id"
                onChange={handleChange}
              />
            </Form.Field>
            <Button type="submit" disabled={isSubmitting} color="blue">
              submit
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NotebookForm;
