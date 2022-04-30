import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "antd";
import { Input, Label } from "reactstrap";

import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

const App = () => {
  const [message, setMessage] = useState(null);
  const [words, setWords] = useState([]);
  const [loader, setLoader] = useState(false);
  const [valid, setValid] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#ccc";
  }, []);

  const checkCorrectNess = async () => {
    try {
      setLoader(true);
      const response = await axios.post("/api/v1/check-correctness", { message });
      const { data } = response;
      setWords(data?.words || []);
      setInvalid(data?.words?.length > 0 || false);
      setValid(data?.words?.length === 0);
      setLoader(false);
    } catch (error) {
      console.log("🚀 ~ file: App.js ~ error", error);
      setLoader(false);
      message.error("Something went wrong while checking!");
    }
  };
  return (
    <div className="App">
      <Label for="exampleText">Type sentence here</Label>
      <Input
        placeholder="Type here ..."
        name="text"
        type="textarea"
        valid={valid}
        disabled={loader}
        invalid={invalid}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="mt-4 d-flex align-items-center justify-content-start">
        <p>Non English words: {words.join(", ")}</p>
      </div>
      <div className="mt-4 d-flex align-items-center justify-content-end">
        <Button
          type="primary"
          className="button"
          onClick={checkCorrectNess}
          loading={loader}
          disabled={loader || !message}
        >
          Check
        </Button>
      </div>
    </div>
  );
};

export default App;
