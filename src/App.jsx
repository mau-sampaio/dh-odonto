
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/useTheme";
import { MainLayout } from "./Routes/MainLayout";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Detail from "./Routes/Detail";
import { AuthProvider } from "./context/useAuth";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<MainLayout />}>
              <Route path="" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dentista/:id" element={<Detail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider >
  );
}

export default App;
