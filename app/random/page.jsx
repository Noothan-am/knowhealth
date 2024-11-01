"use client"; // This marks the component as a client component

import { useState, useEffect } from "react";

const FilesPage = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/random");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h1>Files in S3</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.key.split("/").pop()} {/* Display file name */}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilesPage;
