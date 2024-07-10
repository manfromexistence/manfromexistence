import React, { useState, useEffect } from 'react';
import './Style.css'


const Todo = () => {
    //  get the localStorage data backk
    const getLocalData = () => {
         const lists = localStorage.getItem("mytodolist");
         if (lists){
             return JSON.parse(lists);
         }else {
             return [];
         }
     };
     const [inputData, setInputData] = useState('');
     const [items, setItems] = useState(getLocalData());
     const [iseditItem, setisEditItem] = useState('');
     const [toggleButton, settoggleButton] = useState(false);
     const addItem=() => {
         if (!inputData){
             alert ('please fill the Data');
         }else if(inputData && toggleButton){
             setItems(items.map( (curElem) => {
                 if (curElem.id === iseditItem){
                     return {...curElem, name: inputData };
                 }
                 return curElem;
             })
                 )
         setInputData('');
         setisEditItem(null);
         settoggleButton(false);
         }
         else{
             const myNewInputData={
                 id:new Date().getTime().toString(),
                 name:inputData,
             }
             setItems([...items, myNewInputData]);
             setInputData('');
         }
     };
     
     
     
    //  edit the items
    const editItem= (index) => {
        const item_todo_edited =items.find((curElem) => {
            return curElem.id === index;
        });
         setInputData(item_todo_edited.name);
         setisEditItem(index);
         settoggleButton(true);
    };
      
      
      
      
    //  how to delete item
    const deleteItem= (index) => {
        const updateItem=items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updateItem);
    };
    // Remove all Elements
    const removeAll= () => {
        setItems([]);
    };
    // adding localStorage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
        const a='Hello';
        localStorage.setItem('data', a);
     }, [items]);
  return (
    <>
    <div className="main-div">
        <div className="child-div">
            <figure>
                <h1 className="alert alert-warning text-center better2">Don't try to be Best</h1>
                <h1 className="alert alert-primary text-center better1">Try to be Better</h1>
                <div className="input">
                    <input type="text/submit/hidden/button/image" name="" id="" value={ inputData } onChange={ (event) => setInputData(event.target.value)} placeholder="Add Todo"/>
                        {toggleButton ? (<i class="far fa-edit add-btn plus add_plus" onClick={addItem}></i>) : 
                                        (<i class="fa fa-plus add-btn plus add_plus" onClick={addItem}></i>)
                        }
                </div>
                  
                        <a href="" className="btn btn-danger btn1 ml-4" onClick={removeAll}>Remove All</a>
                <div className="text-center add">
                    <span className="text-center alert alert-danger span mr-2">please 🥺 add todo</span>
                </div>
                <div className='showItems text-center'>
                {items.map( (curElem)=> {
                    return(
                    <div className='eachItem alert alert-primary bg-light p-4' key={curElem.id}>
                         <h3 className='hero'>{curElem.name}</h3>
                             <div className="h3">
                                    <i class="far fa-edit add-btn plus icon1" onClick={ () => editItem (curElem.id)}></i> 
                                    <i class="far fa-trash-alt add-btn plus icon2" onClick={ () => deleteItem(curElem.id)}></i>
                             </div>
                    </div> )
                })}
                   </div>
            </figure>
        </div>
    </div>
       
      
      
    </>
   );
};
export default Todo;


