import Page from "../types/page";
import { Formik } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import { Button, Form, Tab } from "semantic-ui-react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useState, ChangeEventHandler, SyntheticEvent } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

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

  function handleFormChange(e: SyntheticEvent) {
    const element = e.target as HTMLElement;
    if (element.getAttribute("name") === "content")
      [setContentForPreview((element as HTMLTextAreaElement).value)];
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
          <Form onSubmit={handleSubmit} onChange={handleFormChange}>
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
