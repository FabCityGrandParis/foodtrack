import styles from "@styles/theme-switch.module.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";


export default function Layout({ page, children }) {
    const [darkTheme, setTheme] = useState(document.documentElement.dataset.theme === "dark" ? true : false)
    
    const switchTheme = (darkTheme)=>{
        console.log(darkTheme ? "set dark" : "set light");
        document.documentElement.setAttribute('data-theme', darkTheme ? "dark" : "light");
        setTheme(darkTheme);
    }
    useEffect(() => {
        switchTheme(darkTheme);
    }, []);

    return ( 
    <div className={styles.themeSwitch} onClick={()=>{switchTheme(!darkTheme)}}>
            {darkTheme ? <FaSun /> : <FaMoon /> }
    </div>
)}