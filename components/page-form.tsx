import Page from "../types/page";
import { Formik } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import { Button, Form, Dimmer, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { NextPage } from "next";

interface Props {
  page: Page;
  action: Function;
}

const PageForm: NextPage<Props> = ({ page, action }) => {
  const router = useRouter();

  function scrollToBottom(): void {
    window.scrollTo(0, document.body.scrollHeight);
  }

  return (
    <section>
      <h3 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        Pages
      </h3>
      <Formik
        initialValues={{
          name: page.name,
          content: page.content,
        }}
        onSubmit={(values, { setSubmitting }) => {
          action(values["name"], values["content"]);
          router.push("/");
        }}
        enableReinitialize={true}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field required>
              <label>Page Name</label>
              <input
                placeholder="Name"
                required
                name="name"
                onChange={handleChange}
                value={values.name}
                data-testid="pagename"
              />
            </Form.Field>
            <Form.Field required>
              <label>Content</label>
              <TextareaAutosize
                name="content"
                placeholder="Content"
                required
                value={values.content}
                onChange={handleChange}
                onHeightChange={scrollToBottom}
                data-testid="pagecontent"
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

export default PageForm;
