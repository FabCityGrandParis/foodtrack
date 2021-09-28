import { Client } from "@notionhq/client";

const notion = new Client({auth: process.env.NOTION_TOKEN,});
const databases = JSON.parse(process.env.DATABASES);


export const getDatabase = async (databaseId, filter, sort) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter : filter,
    sorts: sort
  });
  return response.results;
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  response.page_title = response.parent.type === 'database_id' ? response.properties.Name.title : response.properties.title.title ;
  return response;
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};

export const getContent = async (blockId) => {

  const blocks = await getBlocks(blockId);
  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

  const blocksWithChildren = await Promise.all(
    blocks.map(async (block) => {
      // Add child blocks if the block should contain children but none exists
      if (block.has_children && !block[block.type].children) {
        block[block.type]["children"] = childBlocks.find(
          (x) => x.id === block.id
        )?.children;
      }
      if (block.type === "child_database") {
        const database = databases.filter((database) => (database.name === block[block.type].title))[0]
        if (!database) return ({})
        block[block.type].blocks = await getDatabase(database.id, database.filter, database.sort);
      }
      return block;
    })
  );
  return blocksWithChildren;
};
