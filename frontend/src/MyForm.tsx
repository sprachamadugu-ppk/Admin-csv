import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";

type RowObject = { [key: string]: string };

export interface FormData {
  email: string;
  fileType: string;
  fileContents: RowObject[];
}

interface FileUploadFormProps {
  onSubmit: (data: FormData) => void;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [fileType, setFileType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileTypeValid, setFileTypeValid] = useState(true);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const isValidFileType = file.name.toLowerCase().endsWith(".csv");

      if (isValidFileType) {
        setSelectedFile(file);
        setFileTypeValid(true);
      } else {
        setSelectedFile(null);
        setFileTypeValid(false);
      }
    }
  };

  const handleSubmit = () => {
    if (email && fileType && selectedFile && fileTypeValid) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContentsString = event.target?.result as string;
        const parsedFileContents = fileContentsString
          .split("\n")
          .map((line) => line.split(","));

        const [header, ...data] = parsedFileContents;

        const formattedData = data.map((row) =>
          row.reduce((obj, value, index) => {
            const fieldName = header[index].trim();
            obj[fieldName] = value.trim();
            return obj;
          }, {} as RowObject),
        );

        onSubmit({
          email,
          fileType,
          fileContents: formattedData,
        });

        setEmail("");
        setFileType("");
        setSelectedFile(null);
        setFileTypeValid(true);
      };

      reader.readAsText(selectedFile);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", width: "300px", margin: "auto" }}
    >
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>File Type</InputLabel>
        <Select
          value={fileType}
          onChange={(e) => setFileType(e.target.value as string)}
        >
          <MenuItem value="site file">Site File</MenuItem>
          <MenuItem value="department file">Department File</MenuItem>
          <MenuItem value="employee file">Employee File</MenuItem>
        </Select>
      </FormControl>

      {fileType && (
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".csv"
            style={{ marginTop: "10px" }}
          />
        </div>
      )}

      {!fileTypeValid && (
        <Typography
          variant="caption"
          color="error"
          style={{ marginTop: "5px" }}
        >
          Invalid file type. Please select a valid CSV file.
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Paper>
  );
};

export default FileUploadForm;
