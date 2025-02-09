import './App.css';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { SearchForm } from './components/SearchForm';
import { Main } from './components/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<InputForm />} />
        <Route path="/inputForm" element={<InputForm />} />
        <Route path="/searchForm" element={<SearchForm />} />
      </Routes>
      <Main />
    </BrowserRouter>
  )
}

export default App
