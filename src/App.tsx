import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { SearchForm } from './components/SearchForm';
import { Main } from './components/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [data, setData] = useState([]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<InputForm setData={setData} />} />
        <Route path="/inputForm" element={<InputForm setData={setData} />} />
        <Route path="/searchForm" element={<SearchForm setData={setData} />} />
      </Routes>
      <Main setData={setData} data={data} />
    </BrowserRouter>
  )
}

export default App
