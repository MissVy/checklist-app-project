import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'


const List = ({items, removeItem, }) => {
  return (
    <ol className="grocery-list">
      {items.map((item) => {
        const {id, title} = item
        return (
          <div key={id} className="grocery-item">
            <li className="title"> {title} </li>
            <div className="btn-container">
              <button type="button" className="edit-btn"> <FaEdit /> </button>
              <button type="button" className="delete-btn" onClick={() => removeItem(id)}> <FaTrash /> </button>
            </div>
          </div>
        )
      })}
    </ol>
  )
}

export default List