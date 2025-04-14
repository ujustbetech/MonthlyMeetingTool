import React, { useState, useRef } from 'react';
import { storage, db } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const DocumentUpload = ({ eventID, data = {}, fetchData }) => {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [docDescription, setDocDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDocUpload = async () => {
    if (!eventID) {
      console.error("Missing or invalid 'id' prop passed to DocumentUpload");
      alert("Something went wrong. Please try again later.");
      return;
    }
  
    if (selectedDocs.length === 0 || !docDescription) {
      alert("Please select files and enter a description.");
      return;
    }
  
    setLoading(true);
  
    try {
      const uploadedUrls = [];
  
      for (const file of selectedDocs) {
        const fileRef = ref(
          storage,
          `MonthlyMeeting/${eventID}/docs/${Date.now()}_${file.name}`
        );
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        uploadedUrls.push({
          name: file.name,
          url,
        });
      }
  
      const eventRef = doc(db, 'MonthlyMeeting', eventID);
  
      await updateDoc(eventRef, {
        documentUploads: arrayUnion({
          description: docDescription,
          files: uploadedUrls,
          timestamp: new Date().toISOString(),
        }),
      });
      fetchData();
      alert('Documents uploaded successfully!');
      setSelectedDocs([]);
      setDocDescription('');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Check console for details.');
    }
  
    setLoading(false);
  };
  

  return (
    <ul>
      <li className="form-row">
        <h4>Upload PDF/Word Document:<sup>*</sup></h4>
        <div className="multipleitem">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            multiple
            ref={fileInputRef}
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                setSelectedDocs(Array.from(files));
              }
            }}
            style={{ display: 'none' }}
          />
          <button type="button" onClick={() => fileInputRef.current.click()}>
            Select Files
          </button>

          {selectedDocs.length > 0 && (
            <ul style={{ marginTop: '10px' }}>
              {selectedDocs.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
      </li>

      <li className="form-row">
        <h4>Document Description:<sup>*</sup></h4>
        <div className="multipleitem">
          <textarea
            placeholder="Enter description"
            value={docDescription}
            onChange={(e) => setDocDescription(e.target.value)}
            required
          />
        </div>
      </li>

      <li className="form-row">
        <div className="multipleitem">
          <button
            className="submitbtn"
            type="button"
            onClick={handleDocUpload}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </li>
    </ul>
  );
};

export default DocumentUpload;
