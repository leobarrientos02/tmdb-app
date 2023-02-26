import React, { useState } from "react";
import Pages from './pages/Pages'
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const App = () => {
    const [language, setLanguage] = useState("en");
    return (
        <div>
            <Navbar setLanguage={setLanguage} language={language} />
            <Pages language={language} />
            <Footer />
        </div>
    )
}

export default App;