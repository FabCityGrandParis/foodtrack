// import { getDatabase, getPage, getContent } from "@libs/notion";
// import { RenderText, RenderBlock } from "@components/RenderBlock";
// import Link from "next/link";
// import Layout from "@components/Layout";
// import styles from "@styles/works.module.css";
// import { FiArrowLeft } from "react-icons/fi";

export default function Database() {
  return (
    <div>
      {/* {database}
      {id} */}
      </div>
  );
}

// export const getStaticPaths = async () => {

//   const databases = Object.values(JSON.parse(process.env.DATABASES));
//   console.log(databases);
//   let filledDatabases = await Promise.all(
//     databases.map(async (database) => {
//         console.log(database);
//         return {
//           database: database.id,
//           ids: await getDatabase(database.id, database.filter, database.sort)
//         };
//       })
//   );
//   let paths = [];
//   filledDatabases.forEach((el, i)=>{
//     console.log(el);
//   })
//   console.log("paths", paths);

//   return {
//     paths: [{ params: { database: "team", id: "test" } }],
//     fallback: true,
//   };
// };

// export const getStaticProps = async (context) => {
//   console.log(context);
//   return {
//     props: context.params,
//   };
// };
