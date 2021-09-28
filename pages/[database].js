import { getContent, getPage } from "@libs/notion";
import Layout from "@components/Layout";
import { RenderBlock } from "@components/RenderBlock";


export default function Database({ page, blocks }) {

  return (
    <Layout >
      {blocks && blocks.map((block) => (<RenderBlock block={block} key={block.id} />))}
    </Layout>
  );
}


export const getStaticPaths = async () => {

  const pages = Object.values(JSON.parse(process.env.PAGES));
  let paths = pages.map((page)=>{
    return({
      params : {
      database : page.route
    }})
  });

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const pages = JSON.parse(process.env.PAGES);
  const pageId = pages.filter((page) => (page.route === context.params.database ))[0].id
  const page = await getPage(pageId);
  const blocksWithChildren = await getContent(pageId);
  return {
    props: {
      page,
      blocks: blocksWithChildren
    },
    revalidate: 1,
  };
};
