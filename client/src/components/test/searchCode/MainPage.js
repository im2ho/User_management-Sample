import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

import SearchPage from "./SearchPage";

function MainPage() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  //input에 작성한 값으로 state 변경
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    //페이지 이동 경로, 값 전달
    navigate('/search', { state: { inputValue } });
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>검색</button>
    </div>
  );
}

function App() {
  return(
    <Router>
      <Link to='/'>main</Link>
      <Link to='/search'>search</Link>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
      </Routes>
    </Router>
  )
}

export default App;