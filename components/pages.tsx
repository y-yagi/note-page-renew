import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCollection, deleteDocument } from "@nandorojo/swr-firestore";
import Page from "../types/page";
import Notebook from "../types/notebook";
import { useUser } from "../lib/useUser";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {
  Divider,
  Header,
  Button,
  Segment,
  Select,
  Tab,
  TabProps,
} from "semantic-ui-react";

interface NoteBookOption {
  key: string;
  value: string;
  text: string;
}

const Pages = () => {
  const { user } = useUser();
  const notebookCollection = `notebooks-renew/${user?.id}/notebooks/`;
  const router = useRouter();
  const [noteBookPath, setNoteBookPath] = useState("default");
  const [tabActiveIndex, setTabActiveIndex] = useState(0);

  const { data, error } = useCollection<Page>(
    `${notebookCollection}${noteBookPath}/pages`,
    {
      orderBy: ["updatedAt", "desc"],
    }
  );

  const { data: notebooks } = useCollection<Notebook>(notebookCollection, {});

  if (error) {
    console.error(error);
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  if (!data) return <p>Loading...</p>;

  function noteBooksOptions(): NoteBookOption[] {
    let options: NoteBookOption[] = [];
    if (!notebooks) return options;

    notebooks.forEach((book) => {
      options.push({
        key: book.id,
        value: book.id,
        text: book.id,
      });
    });
    options.push({
      key: "create_new_note_book",
      value: "create_new_note_book",
      text: "Create a new note book",
    });

    return options;
  }

  function panes(data: Page[]) {
    let panes: any[] = [];

    data.forEach((page) =>
      panes.push({
        menuItem: page.name,
        render: () => (
          <Tab.Pane className="Tab-body">
            <Button
              type="submit"
              floated="right"
              color="red"
              size="mini"
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  deleteDocument(
                    `${notebookCollection}${noteBookPath}/pages/${page.id}`
                  );
              }}
            >
              Destroy
            </Button>
            <Link href={`/pages/${page.id}?book=${noteBookPath}`}>
              <Button type="submit" floated="right" color="blue" size="mini">
                Edit
              </Button>
            </Link>
            <ReactMarkdown plugins={[gfm]} children={page.content} />
          </Tab.Pane>
        ),
      })
    );

    return panes;
  }

  function handleTabChange(data: TabProps) {
    setTabActiveIndex(data.activeIndex as number);
  }

  function onSelectChange(_event: any, data: any): void {
    if (data.value === "create_new_note_book") {
      router.push("/notebooks/new");
      return;
    }
    setNoteBookPath(data.value);
  }

  function destroyNotebook() {
    if (noteBookPath === "default") return "";

    return (
      <Button
        type="submit"
        floated="right"
        color="red"
        onClick={() => {
          if (window.confirm("Are you sure you wish to delete this item?"))
            deleteDocument(`${notebookCollection}${noteBookPath}`);
          setNoteBookPath("default");
        }}
      >
        Destroy a note book
      </Button>
    );
  }

  return (
    <>
      <Header as="h3" icon textAlign="center" color="grey">
        <Select
          options={noteBooksOptions()}
          onChange={onSelectChange}
          defaultValue={noteBookPath}
        />
      </Header>
      <Divider hidden section />
      <Link href={`/pages/new?book=${noteBookPath}`}>
        <Button as="a" color="blue">
          Create a new page
        </Button>
      </Link>
      <Segment>
        <Tab
          panes={panes(data)}
          menu={{ pointing: true, className: "Tab-wrapped" }}
          activeIndex={tabActiveIndex}
          onTabChange={handleTabChange}
        />
      </Segment>
      {destroyNotebook()}
    </>
  );
};

export default Pages;
