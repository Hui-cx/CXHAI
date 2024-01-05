import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';
import { GoogleGenerativeAI } from '@google/generative-ai'
const { TextArea } = Input;
const API_KEY = 'AIzaSyDgtKHUSpqRNgK5HnnUjRhZNviUKr4N_lk'
const App: React.FC = () => {
  const [inpVal, setInpVal] = useState<string>('');
  const [areaVal, setAreaVal] = useState<string>('');
  const genAI = new GoogleGenerativeAI(API_KEY);
  const run = async (e: string) => {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContentStream(e);
    setAreaVal('')
    let text = ''
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      text += chunkText;
      setAreaVal(text)
    }
  }
  const submit = () => {
    run(inpVal)
    setAreaVal('')
  }
  return (
    <div>
      <Space.Compact style={{ width: '50%', marginBottom: '20px' }}>
        <Input value={inpVal} onChange={e => setInpVal(e.target.value)} />
        <Button type="primary" onClick={submit}>Submit</Button>
      </Space.Compact>
      <TextArea
        showCount
        placeholder="disable resize"
        style={{ height: 500, resize: 'none' }}
        value={areaVal}
      />
    </div>
  );
};

export default App;