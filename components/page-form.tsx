import Page from "../types/page";
import { Formik } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import { Button, Form, Tab, TabPane, TabPaneProps } from "semantic-ui-react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useState, ChangeEventHandler } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

// NOTE: use `require` to avoid "Could not find a declaration file for module" error.
const WithOnChangeHandler = require("formik-form-callbacks");

interface Props {
  page: Page;
  action: Function;
}

const PageForm: NextPage<Props> = ({ page, action }) => {
  const router = useRouter();
  const [contentForPreview, setContentForPreview] = useState(page.content);

  function scrollToBottom(): void {
    window.scrollTo(0, document.body.scrollHeight);
  }

  function panes(content: string, handleChange: ChangeEventHandler) {
    const panes: any = [
      {
        menuItem: "Write",
        render: () => (
          <Tab.Pane attached={false}>
            <TextareaAutosize
              name="content"
              placeholder="Content"
              required
              value={content}
              onChange={handleChange}
              onHeightChange={scrollToBottom}
              data-testid="pagecontent"
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Preview",
        render: () => (
          <Tab.Pane attached={false}>
            <ReactMarkdown plugins={[gfm]} children={contentForPreview} />
          </Tab.Pane>
        ),
      },
    ];

    return panes;
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
              <WithOnChangeHandler>
                {({ values }: { values: any }) =>
                  setContentForPreview(values["content"])
                }
              </WithOnChangeHandler>
              <Tab
                panes={panes(values.content, handleChange)}
                menu={{ pointing: true }}
              />
            </Form.Field>
            <Button
              type="button"
              color="red"
              floated="left"
              onClick={() => router.back()}
            >
              cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              color="blue"
              floated="right"
            >
              submit
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default PageForm;
