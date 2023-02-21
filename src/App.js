import React from "react";
import Pages from './pages/Pages'
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const App = () => {
    return (
        <div>
            <Navbar />
            <Pages />
            <Footer />
        </div>
    )
}

export default App;