import { getDatabase, getPage, getContent } from "@libs/notion";
import { RenderText, RenderBlock } from "@components/RenderBlock";
import Link from "next/link";
import Layout from "@components/Layout";
import styles from "@styles/works.module.css";
import { FiArrowLeft } from "react-icons/fi";


export default function Database({ page, blocks }) {
  if (!page) return (<div />)
  const date = new Date(page.properties.Date.date.start).toLocaleString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    }
  );
  if (!!page.properties.Documentation.url) {
    const website = new Url(page.properties.Documentation.url);
    page.properties.Documentation.hostname = website.host;
  }
  return (
    <Layout page={page}>
      {page.cover &&

        <img className={styles.cover} src={page.cover.type === "external" ? page.cover.external.url :
          page.cover.file.url} alt="" />
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
            {page.properties.Category.select &&
              <span className={styles.category}>
                {page.properties.Category.select.name}
              </span>
            }
          </h2>
        }

        {page.properties.Documentation.url &&
          <div className={styles.documentation}>
            <Link href={`${page.properties.Documentation.url}`}>
              {page.properties.Documentation.hostname}
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
            {page.properties.Tags.multi_select.map((tag, i) => (
              <span key={i}>{tag.name}</span>
            ))}
          </div>
        }

      </div>

      {blocks.map((block) => (<RenderBlock block={block} key={block.id} />))}
    </Layout>
  );
}
export const getStaticPaths = async () => {

  const databases = Object.values(JSON.parse(process.env.DATABASES));
  let paths = [];
  let filledDatabases = await Promise.all(
    databases.map(async (database, i) => {
        return {
          database: database.name,
          ids: await getDatabase(database.id, database.filter, database.sort)
        };
      })
  );
  filledDatabases.forEach((database)=>{
    database.ids.forEach((el)=>{
      paths.push({
        params :{
        database: database.database,
        id : el.id
      }})
    })
  })

  return {
    paths: paths,
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
      blocks: blocksWithChildren
    },
    revalidate: 1,
  };
};
