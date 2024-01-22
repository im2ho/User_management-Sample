import React,{useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

function SearchPage() {

  const[newInput, setNewInput] = useState('');

  //useLocation으로 location 객체 얻어옴
  const location = useLocation();

  //페이지 전환 시 전달된 state에서 inputValue 받아오기
  //검색값없으면 그냥 빈값
  const inputValue = location.state?.inputValue || '';

  //화면 렌더링한 다음 setNuwInput를 호출.. 아니면 무슨 무한루프 뭐시기라는데 잘 모르겟음
  useEffect(() => {
    setNewInput(inputValue);
  }, [inputValue]);

  // input에 값을 입력하면 newInput 상태가 업데이트 됨
  const handleInputChange = (event) => {
    setNewInput(event.target.value);
  };

  return (
    <div>
      <h2>검색 페이지</h2>
      <input
        type="text" 
        value={newInput}
        onChange={handleInputChange} 
      />
    </div>  
  );
}

export default SearchPage;