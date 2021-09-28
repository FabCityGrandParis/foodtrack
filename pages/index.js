import { getContent, getPage } from "@libs/notion";
import Layout from "@components/Layout";
import { RenderBlock } from "@components/RenderBlock";


export default function Home({ page, blocks }) {
  
  return (
    <Layout page={page}>
      {blocks.map((block) => (<RenderBlock block={block} key={block.id} />))}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const homePage = JSON.parse(process.env.PAGES).filter((pages)=>(pages.route === ""))[0];
  const page = await getPage(homePage.id);
  const pageContent = await getContent(homePage.id);
  return {
    props: {
      page,
      blocks: pageContent
    },
    revalidate: 1,
  };
};
