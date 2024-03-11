import { useState } from "react";
import "./App.css";

// require('dotenv').config();

function App() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    dueDate: new Date(),
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // console.log(`https://api.trello.com/1/cards?idList=5abbe4b7ddc1b351ef961414&key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`)
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const { name, description, startDate, dueDate } = formData;
    let dueComplete = true;
    if(dueDate.toString().length > 0) {
      dueComplete= true;
    }else{
      dueComplete = false;
    }
    console.log(name, description, startDate);
    try{
      const res = await fetch(
        `https://api.trello.com/1/cards?idList=65ef31d5ceef56bd9bb0fa5a&key=437a5a195e043099bbf4a625f8f48ece&token=ATTA6787dc4bbb2454af3f6589dd161de92c6a59c76dfff753441d811bae7f250f5a3CC1B8F1&name=${name}&desc=${description}&startDate=${startDate}&dueComplete=${dueComplete}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          }
        }
      )

      const data = await res.json();
    console.log(data);

    if (res.statusCode === 400 || !data) {
      console.log("failed");
    } else {
      console.log("success");
      console.log("Card Created Successfully On Trello");
    }
      
    }catch(err) {
      console.error(err);
    };
    

    
  };

  return (
    <>
      <form
        className="flex flex-col mx-auto w-[10/12] justify-center items-center gap-1"
        onSubmit={submitHandler}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Please enter you name..."
          id="name"
          value={formData.name}
          onChange={changeHandler}
          className="outline outline-2 rounded-md outline-slate-400 "
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          placeholder="Please enter description.."
          id="description"
          value={formData.description}
          onChange={changeHandler}
          className="outline outline-2 rounded-md outline-slate-400 "
        />

        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          id="startDate"
          value={formData.startDate}
          onChange={changeHandler}
          className="outline outline-2 rounded-md outline-slate-400 "
        />

        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          name="dueDate"
          placeholder="Due Date"
          id="dueDate"
          value={formData.dueDate}
          onChange={changeHandler}
          className="outline outline-2 rounded-md outline-slate-400 "
        />

        <button className="bg-blue-500 text-white rounded-md py-2 px-4">
          Save
        </button>
      </form>
    </>
  );
}

export default App;
