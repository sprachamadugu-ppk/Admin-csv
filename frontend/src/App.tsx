import React, { useState } from "react";
import { processData } from "./api-data";
import FileUploadForm, { FormData } from "./MyForm";

const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFormSubmit = async (data: FormData) => {
    console.log(data);

    try {
      const result = await processData(data);
      console.log("Backend response:", result);
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>File Upload Form</h1>
      <FileUploadForm key={refreshKey} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
