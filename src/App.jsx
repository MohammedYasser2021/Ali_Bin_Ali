import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import BookingPage  from "./pages/BookingPage";

import { useEffect, useState } from "react";

const App = () => {
  const [language, setLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem("language") || "AR";
    document.documentElement.dir = storedLanguage === "AR" ? "rtl" : "ltr"; // تعيين الاتجاه عند التحميل
    return storedLanguage;
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = language === "AR" ? "rtl" : "ltr"; // تحديث الاتجاه
  }, [language]);
  return (
    <Router>
      {/* Sidebar */}
      {/* Main content */}
      <Routes>
        <Route
          element={
            <Sidebar language={language} setLanguage={setLanguage} />
          }
        >
          <Route
            path="/"
            element={
              <BookingPage
                language={language}
                setLanguage={setLanguage}
              />
            }
          />
      
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
