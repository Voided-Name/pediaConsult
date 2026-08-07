import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="w-full">
      <h1>PediaConsult</h1>
      <form className="flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 flex flex-col gap-2">
          <legend className="fieldset-legend">Patient Details</legend>

          <label htmlFor="first-name" className="label">First Name</label>
          <input
            type="text"
            className="input"
            id="first-name"
            name="first-name"
          />
          <label htmlFor="last-name" className="label">Last Name</label>
          <input
            type="text"
            className="input"
            id="last-name"
            name="last-name"
          />
          <label htmlFor="middle-name" className="label">Middle Name</label>
          <input
            type="text"
            className="input"
            id="middle-name"
            name="middle-name"
          />
          <label htmlFor="dob" className="label">Date of Birth</label>
          <input
            type="date"
            className="input"
            id="dob"
            name="dob"
          />
          <label htmlFor="sex" className="label">Date of Birth</label>
          <select id="sex" name="sex" className="select">
            <option value="U">Unknown</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
            <option value="O">Other/Intersex</option>
          </select>
        </fieldset>
      </form>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
