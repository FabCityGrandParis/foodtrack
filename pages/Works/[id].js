import { getDatabase, getPage, getContent } from "@libs/notion";
import { RenderText, RenderBlock } from "@components/RenderBlock";
import Link from "next/link";
import Layout from "@components/Layout";
import styles from "@styles/works.module.css";
import { FiArrowLeft } from "react-icons/fi";

export default function Post({ page, blocks }) {
  if(!page)return(<div/>)
  console.log(page.page_title[0].plain_text);
  const date = new Date(page.properties.Date.date.start).toLocaleString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    }
  );
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
      <div className={styles.infos}>
        
      {page.page_title &&
        <h2 className={styles.title}>
          {page.icon && page.icon.emoji} <RenderText text={page.page_title} />
        </h2>
        }

        {page.properties.Documentation.url &&
          <div className={styles.documentation}>
            <Link href={`${page.properties.Documentation.url}`}>
              {page.properties.Documentation.url}
            </Link>
          </div>
        }
      {date && 
        <div className={styles.date}>
          {date}
          {page.properties.Status.select &&
           <span className={styles.status}>
            {page.properties.Status.select.name}
          </span>  
          }
        </div>
        }
      {page.properties.Tags.multi_select &&
        <div className={styles.tags}>
          {page.properties.Tags.multi_select.map((tag,i) => (
            <span key={i}>{tag.name}</span>
          ))}
        </div>
        }
        {/* {page.properties.Category.select &&
        <div className={styles.category}>
          {page.properties.Category.select.name}
        </div>
      } */}
      </div>

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
