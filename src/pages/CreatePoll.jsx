import { useState } from "react";
import { createPoll } from "../api/polls";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredOptions = options.filter(opt => opt.trim() !== "");

    await createPoll(question, filteredOptions);

    navigate("/");
  };

  return (
    <div>
      <h1>Crear encuesta</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pregunta"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Opción ${index + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(e.target.value, index)}
          />
        ))}

        <button type="button" onClick={addOption}>
          + Añadir opción
        </button>

        <button type="submit">Crear encuesta</button>
      </form>
    </div>
  );
};

export default CreatePoll;