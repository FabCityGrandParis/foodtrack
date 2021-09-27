import { getContent, getPage } from "@libs/notion";
import Layout from "@components/Layout";
import { RenderBlock } from "@components/RenderBlock";

const homePageId = process.env.HOMEPAGE_ID;

export default function Home({ page, blocks }) {

  return (
    <Layout page={page}>
      {blocks.map((block) => (<RenderBlock block={block} key={block.id} />))}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const page = await getPage(homePageId);
  const blocksWithChildren = await getContent(homePageId);
  return {
    props: {
      page,
      blocks: blocksWithChildren
    },
    revalidate: 1,
  };
};
