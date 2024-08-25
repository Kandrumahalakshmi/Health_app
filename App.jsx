import { useState } from "react";

function App() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const sendRequest = async () => {
    const requestBody = {
      data: value
    };

    try {
      const result = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      const data = await result.json();
      console.log(data);
      setResult(JSON.stringify(data));

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="container">
        <label htmlFor="input" className="form-label">API Input</label>
        <input
          type="text"
          id="input"
          value={value}
          onChange={handleChange}
          placeholder='Enter values separated by commas (e.g., M,1,a)'
          className="form-control"
        />

        <div className="d-grid">
          <button
            type="button" // Use "button" to avoid form submission issues
            className="btn btn-primary"
            onClick={sendRequest}
          >
            Submit
          </button>
        </div>

        <textarea className="form-control" value={result} name="" id="">

        </textarea>
      </div>
    </>
  );
}

export default App;
