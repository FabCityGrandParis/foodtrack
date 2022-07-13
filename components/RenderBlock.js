import styles from "@styles/blocks.module.css";
import Link from "next/link";


export const RenderText = ({ text }) => {
    console.log(text);

    if (!text) {
        return null;
    }
    return text.map((value, id) => {
        const {
            annotations: { bold, code, color, italic, strikethrough, underline },
            text,
        } = value;
        return (
            <span key={id}
                className={[
                    bold ? styles.bold : "",
                    code ? styles.code : "",
                    italic ? styles.italic : "",
                    strikethrough ? styles.strikethrough : "",
                    underline ? styles.underline : "",
                ].join(" ")}
                style={color !== "default" ? { color } : {}}
            >
                {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
            </span>
        );
    });
};


export const RenderBlock = ({block}) => {
    const { type, id } = block;
    const value = block[type];
    
    switch (type) {
        case "paragraph":
            return (
                <p>
                    <RenderText text={value.text} />
                </p>
            );
        case "heading_1":
            return (
                <h1>
                    <RenderText text={value.text} />
                </h1>
            );
        case "heading_2":
            return (
                <h2>
                    <RenderText text={value.text} />
                </h2>
            );
        case "heading_3":
            return (
                <h3>
                    <RenderText text={value.text} />
                </h3>
            );
        case "bulleted_list_item":
        case "numbered_list_item":
            return (
                <li>
                    <RenderText text={value.text} />
                </li>
            );
        case "to_do":
            return (
                <div>
                    <label htmlFor={id}>
                        <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
                        <RenderText text={value.text} />
                    </label>
                </div>
            );
        case "toggle":
            return (
                <details>
                    <summary>
                        <RenderText text={value.text} />
                    </summary>
                    {value.children?.map((block) => (
                        <RenderBlock key={block.id} block={block}/>
                    ))}
                </details>
            );
        case "child_page":
            return(
            <Link href={`/${value.id}`}>
                <a>
                    {value.title}
                </a>
            </Link>);
        case "image":
            const src = value.type === "external" ? value.external.url : value.file.url;
            return (
                <img className={styles.image} src={src} />
            );
        case "child_database":
            const items = value.blocks;
            if(!items) return("")
            return (
            <ul className={styles.items}>
                {items.map((item) => {
                    const date = new Date(item.properties.Date.date.start).toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            year: "numeric",
                        }
                    );

                    let src = null;
                    if ( !!item?.cover ){
                        src = item?.cover?.type === "external" ? item.cover.external.url : item.cover.file.url;
                    }
                    return (
                        <Link key={item.id}  href={`/${value.title}/${item.id}`}>
                        <li key={item.id} className={styles.item}>
                            {src && <img className={styles.itemImage} src={src} />}
                                <h3 className={styles.itemTitle}>
                                    <RenderText text={item.properties.Name.title} />
                                    {/* <span className={styles.itemStatus} status={item.properties.Status.select.name}>{item.properties.Status.select.name}</span> */}
                                </h3>
                                <p className={styles.itemDescription}>{date}</p>
                        </li>
                    </Link>
                    );
                })}
            </ul>
            );
        default:
            console.log(`❌ Unsupported block (${type === "unsupported" ? "unsupported by Notion API" : type
                })`);
            return ``;
    }
}
