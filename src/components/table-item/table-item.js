import React from 'react';

import './table-item.css';


const TableItem = ({item}) => {
    
   const { name, insertions, deletions, commits}=item;
   
    return (
        <>
           <tr>
                <td>{name}</td>
                <td>{insertions}</td>
                <td>{deletions}</td>
                <td>{commits}</td>              
           </tr>      
            
          
        </>
    )
}

export default TableItem;
