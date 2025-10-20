import { CatalogPage } from "./pages/catalogPages/CatalogPage";
import {BrowserRouter, Routes, Route} from 'react-router'
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import Cart from "./pages/cartPage/cartPage"; 
import HomePage from "./pages/homePage/homePage";


function App() {

  return (
    <BrowserRouter> 
    <Header/>
    <Routes> 
      {/* <Route path="/" element={<Homepage/>} /> */}
      <Route path="/Category" element={<CatalogPage/>}/>
      <Route path="/cart" element={<Cart />} />
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/Product" element={<ShowPage/>}/>
      <Route path="/:type/:id" element={<DetailPage/>} />
      <Route path="/person/:id" element={<CastPage/>} />
      <Route path="/SignIn" element={<SignInPage/>} />
      <Route path="/SignUp" element={<SignUpPage/>} /> */}
    </Routes>
    <Footer />  
    </BrowserRouter>
);
}

export default App;