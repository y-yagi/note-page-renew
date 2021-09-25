import { useState, useEffect, useMemo } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Formik } from "formik";
import SimpleMDE from "easymde";
import { Button, Form } from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import "easymde/dist/easymde.min.css";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import Page from "../types/page";

interface Props {
  page: Page;
  action: Function;
}

const SimpleMdeReact = dynamic(import("react-simplemde-editor"), {
  ssr: false,
});

const PageForm: NextPage<Props> = ({ page, action }) => {
  const router = useRouter();
  const [content, setContent] = useState(page.content);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (page.id !== "" && e.ctrlKey && e.key === "s") {
      e.preventDefault();

      if (page.content !== content) {
        action(page.name, content);
        setTimeout(() => {
          toast({ title: "info", description: "Updated!" });
        }, 1000);
      }
    }
  };

  const onMDEchange = (value: string) => {
    setContent(value);
  };

  const simpleMDEOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      inputStyle: "textarea",
    } as SimpleMDE.Options;
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <section>
      <SemanticToastContainer />
      <h3 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        Pages
      </h3>
      <Formik
        initialValues={{
          name: page.name,
          content: page.content,
        }}
        onSubmit={(values, { setSubmitting }) => {
          action(values["name"], content);
          router.push(`/?book=${page.noteBookId}`);
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
              <SimpleMdeReact
                value={values.content}
                onChange={onMDEchange}
                options={simpleMDEOptions}
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
