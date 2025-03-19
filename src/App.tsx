import { ChangeEventHandler, useState } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleChangeInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    let { value } = e.target;
    setInputValue(value);
    if (!value) {
      setOutputValue('');
      return;
    }
    try {
      if (/^fetch/.test(value)) {
        const bodyString = value.match(/"body":\s*"(.*)",\n/)?.[1]?.replace(/\\/g, '') ?? "";
        const body = JSON.parse(bodyString);
        setOutputValue(JSON.stringify(body, null, 2));
      } else {
        if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
          value = value.replace(/^.*{\n/, '{\n')
        }
        const parsed = eval(`window.tmp_val = ${value};`);
        setOutputValue(JSON.stringify(parsed, null, 2));
      }
    } catch(e: any) {
      setOutputValue(`Invalid input: ${e.message}`);
    }
  }

  return (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        <textarea rows={40} style={{ width: "40vw" }} value={inputValue} onChange={handleChangeInput} />
        <textarea rows={40} style={{ width: "40vw" }} value={outputValue} readOnly disabled={!outputValue} />
      </div>
    </>
  )
}

export default App
