import { getDatabase, getPage, getContent } from "@libs/notion";
import { RenderText, RenderBlock } from "@components/RenderBlock";
import Link from "next/link";
import Layout from "@components/Layout";
import styles from "@styles/works.module.css";
import { FiArrowLeft } from "react-icons/fi";

export default function Post({ page, blocks }) {
  return (
    <Layout page={page}>
      {page.cover &&
        <img className={styles.cover} src={page.cover.type === "external" ? page.cover.external.url : 
page.cover.file.url} alt="Picture of the author" />
      }
      <Link href={`/`} >
        <div className={styles.back}>
          <FiArrowLeft />
        </div>
      </Link>
      {page.page_title &&
      <h1 className={styles.title}>
        {page.icon && page.icon.emoji} <RenderText text={page.page_title} />
      </h1>
      }

          {blocks.map((block) => (<RenderBlock block={block} key={block.id}/>))}
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const databases = JSON.parse(process.env.DATABASES);
  const database = await getDatabase(databases["Works"].id, databases["Works"].filter, databases["Works"].sort);

  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocksWithChildren = await getContent(id); 

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
