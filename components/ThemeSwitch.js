import styles from "@styles/theme-switch.module.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";


export default function Layout({ page, children }) {
    const [darkTheme, setTheme] = useState(false)

    const switchTheme = (darkTheme)=>{
        document.documentElement.setAttribute('data-theme', darkTheme ? "dark" : "light");
        setTheme(!darkTheme);
    }

    return ( 
    <div className={styles.themeSwitch} onClick={()=>{switchTheme(darkTheme)}}>
            {darkTheme ? <FaMoon /> : <FaSun/>}
    </div>
)}