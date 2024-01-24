import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddFreshItem from './AddFreshItem';

function PenpickFresh() {
    const [freshitems, setfreshitems] = useState([]);
    const [newFreshItem, setNewFreshItem] = useState({
        item_num : '',
        item_name : '',
        item_price : '',
    });

    const [cartItems, setcartitems] = useState([]);
    const [newCartItem, setNewCartItem] = useState({
        fresh_cartitem_num : '',
        item_count : '',
        item_num : '',
        res_num : '',
    });

    useEffect(() => {
        const fetchData = async () => {
        try{
            const regCart = await axios.get("http://localhost:8282/freshCart/list");
            setcartitems(regCart.data);
        } catch (error) {
            console.log('데이터를 불러오지 못했습니다.', error)
        } 
    };
    fetchData();
    },[]);

   


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8282/productItem/list');
                setfreshitems(response.data);
            } catch (error) {
                console.log('데이터를 불러오지 못했습니다.', error)
            }
        };
        fetchData();
    },[]);

    const carthandleInputChange = (e) => {
        const {name, value} = e.target;
        setNewCartItem((prevCartitem) => ({...prevCartitem, [name] : value}));
    };

    const handleAddCartItem = async () => {
        
        try {
            const response = await axios.post('http://localhost:8282/freshCart/add',
            newCartItem,{
                withCredentials: true
            });
            console.log('4');
            console.log('서버 응답:', response);

            setcartitems((prevCartitem) => [...prevCartitem, response.data]);
            setNewCartItem({
                fresh_cartitem_num : '',
                item_count : '',
                item_num : '',
                res_num : ''
            });

        } catch (error) {
            console.error('error',error);
        }
    };


    const itemhandleInputChange = (e) => {
        const {item_num, value} =e.target;
        setNewFreshItem((prevFreshitem) => ({...prevFreshitem, [item_num] : value}));
    }

    const handleAddFreshItem = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8282/productItem/add',
                newFreshItem,
                { withCredentials:true}
            );
            setfreshitems((prevFreshitem) => [...prevFreshitem, response.data]);
            setNewFreshItem({
                item_num : '',
                item_name : '',
                item_price : '',});
        } catch (error) {
            console.log('error:', error);
        }
    };

    return (     
        <Router>
            <div>
                <h1>물품 리스트</h1>
                <ul>
                    {freshitems.map((freshitem) => (
                        <div>
                        <li key={freshitem.item_num}>
                            {freshitem.item_name} - {freshitem.item_price}원
                            <div>
                            <input
                            type='text'
                            name="item_num"
                            value={freshitem.item_num}
                            onChange={carthandleInputChange}
                            />
                            <button onClick={handleAddCartItem}>카트에 담기</button>
                            </div>
                            
                        </li>
                        
                        </div>
                    ))}
                    <li>
                        <a href ="/add">물품 추가하기</a>
                    </li>
                </ul>

    
                  
           
                
            </div>

            <div>
                <h2>카트아이템 목록</h2>
                <div>
                    <label>카트 번호 : </label>
                    <input 
                        type='text'
                        name="fresh_cartitem_num"
                        value={newCartItem.fresh_cartitem_num}
                        onChange={carthandleInputChange}
                    />
                </div>
                <div>
                    <label>아이템 갯수 :</label>
                    <input 
                        type='text'
                        name="item_count"
                        value={newCartItem.item_count}
                        onChange={carthandleInputChange}
                    />
                </div>
                <div>
                    <label>아이템 번호 :</label>
                    <input 
                        type='text'
                        name="item_num"
                        value={newCartItem.item_num}
                        onChange={carthandleInputChange}
                    />
                </div>
                <div>
                    <label>아이템 번호 :</label>
                    <input 
                        type='text'
                        name="res_num"
                        value={newCartItem.res_num}
                        onChange={carthandleInputChange}
                    />
                </div>
            </div>

            <div>
                <h1>카트 물품 리스트</h1>
                <ul>
                    {cartItems.map((cartItem) => (
                        <li key= {cartItem.res_num}>
                            {cartItem.item_name} - {cartItem.item_price}
                        </li>
                    ))}
                    <li>
                        <Link to ="/add">장바구니 추가</Link>
                    </li>
                </ul>

                <Routes>
                    
                    <Route path="/list" element={<h1>카트 리스트</h1>}></Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App;