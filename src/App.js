import React, {useState, setEffect, useEffect} from "react"
import List from "./List"
import Alert from "./Alert"

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  }

  else {
    return[]
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  })

  const [editID, setEditID] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    // on submit event, we'll be checking for three known conditions
    if (!name) {
      //is the value is empty? if is empty, do nothing and return an alert message
      showAlert(true, "danger", "Item is empty" )
      console.log("input is empty")
    }

    else if (name && isEditing) {
      // if there is a name and we're in edit mode, execute the codes in here
      setList(list.map( (item) => {
        if (item.id === editID) {
          return{...item, title:name}
        }
        return item
      }))
      setName("")
      setEditID(null)
      setIsEditing(false)
      showAlert(true, "success", "Updated")
    }

    else {
      //if there is a name and we're not in edit mode, then save the item(name) to the list
      showAlert(true, "success", "Added")
      const newItem = {id: new Date().getTime().toString(), title:name}
      setList([...list, newItem])
      setName('')
    }
  }

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed")
    setList(list.filter((item) => item.id!== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  const clearList = () => {
    showAlert(true, "danger", "list cleared")
    setList([])
  }

  const showAlert = (show = false, type="", msg="") => {
    setAlert({show, type, msg})
  }

  useEffect( () => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
    <div className="alert-section">
    {alert.show && <Alert {...alert} removeAlert={showAlert} alertTime={list}/>}
    </div>


      <form className="grocery-form" onSubmit={handleSubmit}>
        <h2> Checklist Items </h2>
        <div className='form-control'>
          <input
            placeholder="e.g. Chocolate"
            value={name}
            type="text"
            onChange={(event) => setName(event.target.value)}
            className="grocery"
          />
          <button type="submit" className="submit-btn" > {isEditing? "Update" : "Submit"} </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list}  removeItem={removeItem} editItem={editItem}/>
          <button className="clear-btn" onClick={clearList}> Clear list </button>
        </div>
      )}

    </section>
  )
}

export default App














/*

(1st part)
  1. create boiler -DONE
  2. create an alert component for displaying the alert messages -INITIATED
  3. create a list component for displaying the items -INITIATED
  4. create the app function -INITIATED
     function includes:
      a.name of the item the user puts in -INITIATED
      b. the list items ( save names ) - INITIATED
      c. check if the user is editing (adding in an item or editing an item) -INITIATED
      d. create an id for every item they put in - INITIATED
      e. create an alert state message text:  saved, updated, removed, add a value, empty list
         1. is message currently showing? true or false - INITIATED
        ii. what the message is - INITIATED
        iii. and the type of message - INITIATED

  5. create the return section - INITIATED
     the return includes:
      a. form - INITIATED
          input: placeholder, value, type, onChange, className, set the name value - INITIATED
          button: type, check if user is editing - INITIATED
          onSubmit: a function to handle the submit event - INITIATED
      b. display the alert message -INITIATED
      c. display the list of items user created -INITIATED
          each item includes: the name of the item, edit button, remove button -INITIATED
      d. the entire list to have a clear list button - INITIATED

(2nd part)
1. User enters a value, need to check if it is empty first
*/
