import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { SearchForm } from './components/SearchForm';
import { Main } from './components/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [data, setData] = useState([]);
  const [start, setStart] = useState<number>(0); // 最初は0番目(=最新)の要素から
  const [perPage, setPerPage] = useState<number>(10); // 1ページには10行表示

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<InputForm setData={setData} setStart={setStart} perPage={perPage} />} />
        <Route path="/inputForm" element={<InputForm setData={setData} setStart={setStart} perPage={perPage} />} />
        <Route path="/searchForm" element={<SearchForm setData={setData} data={data} setStart={setStart} perPage={perPage} />} />
      </Routes>
      <Main setData={setData} data={data} start={start} perPage={perPage} />
    </BrowserRouter>
  )
}

export default App
