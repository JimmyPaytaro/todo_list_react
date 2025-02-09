import './App.css';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { SearchForm } from './components/SearchForm';
import { Main } from './components/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Test } from './components/test';

function App() {

  return (
    <BrowserRouter>
    <body>
      <Header />
      <Routes>
        <Route path="/" element={<InputForm />} />
        <Route path="/inputForm" element={<InputForm />} />
        <Route path="/searchForm" element={<SearchForm />} />
      </Routes>
      <Main />
    </body>
    </BrowserRouter>
  )
}

export default App
