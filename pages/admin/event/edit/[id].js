import { useState, useEffect, useRef } from 'react';
import { db, storage } from '../../../../firebaseConfig';
import { collection, doc, setDocs, Timestamp, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ref, uploadBytesResumable, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import Layout from '../../../../component/Layout';
import "../../../../src/app/styles/main.scss";
import BasicInfoSection from '../../../../component/BasicInfo';
import FacilitatorSection from '../../../../component/FacilatorSection';
import ReferralSection from '../../../../component/ReferralSection';
import E2ASection from '../../../../component/E2ASection';
import ProspectSection from '../../../../component/ProspectSection';
import KnowledgeSharingSection from '../../../../component/KnowledgeSharingSection';
import RequirementPage from '../../../../component/RequirementSection';
import DocumentUpload from '../../../../component/UploadMOM';
import ImageUpload from '../../../../component/UploadImage';
import ParticipantSection from '../../../../component/ParticipantsSection';

const EditAdminEvent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState(0);
  const [eventData, seteventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [requirementSections, setRequirementSections] = useState([]);
  


  const tabs = [
    'Basic Info', 'Facilitator', 'Referral Possibility', '1-2-1 Interaction', 'E2A', 'Prospect Identified', 'Knowledge Sharing', 'Upload Mom', 'Add Creatives', 'Requirement'
  ];

  const fetchEvent = async (index) => {
    try {
      const eventDoc = doc(db, 'MonthlyMeeting', id);
      const eventSnapshot = await getDoc(eventDoc);
      if (eventSnapshot.exists()) {
        const data = eventSnapshot.data();
        console.log("entire data", data);
        seteventData(data);
         // setEventName(data.Eventname || '');
         setEventTime(new Date(data.time?.seconds * 1000).toISOString().slice(0, 16));
    
        setRequirementSections(data.requirements || []);
        handleTabClick(index);
      } else {
        setError('Event not found.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch event data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;   
    fetchEvent(0);
  }, [router.isReady, id]);
  
  useEffect(() => {
    if (router.isReady) {
      setLoading(true);
      setError('');
      setSuccess('');
      seteventData([]);
    }
  }, [router.query.id]);
    
  
  

   const handleTabClick = (index) => {
    setActiveTab(index);
  };
  
  return (
    <Layout>
      <section className='c-form box'>
        <h2>Edit Event</h2>
        <div className='tab-header'>
         
           {tabs.map((tab, index) => (
        <button
          key={index}
          className={index === activeTab ? 'active' : ''}
          onClick={() => handleTabClick(index)}
        >
          {tab}
        </button>
      ))}
        </div>
        {loading ? (
  <p>Loading...</p>
) : (
  <>
   {activeTab === 0 && <>
          <BasicInfoSection data={eventData} id={id} />
        </>}
   </>
)}

       
        {activeTab === 1 && (
          <>
            <FacilitatorSection fetchData={fetchEvent} eventID={id} data={eventData} />
          </>
        )}


        {activeTab === 2 && (
          <>
           <ReferralSection fetchData={fetchEvent} eventID={id} data={eventData} />
          </>
        )}

        {activeTab === 3 && (
          <>
<ParticipantSection fetchData={fetchEvent} eventID={id} data={eventData} />
          </>
        )}


        {activeTab === 4 && (
          <>
<E2ASection fetchData={fetchEvent} eventID={id} data={eventData} />
          </>
        )}
        {activeTab === 5 && (
          <>
<ProspectSection fetchData={fetchEvent} eventID={id} data={eventData} />
          </>
        )}

{activeTab === 6 && (
          <>
<KnowledgeSharingSection fetchData={fetchEvent} eventID={id} data={eventData} />
          </>
        )}


        {activeTab === 7 && (
          <>
<DocumentUpload fetchData={fetchEvent} eventID={id} data={eventData} />
          </>
        )}

{activeTab === 8 && (
          <>
<ImageUpload fetchData={fetchEvent} eventID={id} data={eventData} />
          </>
        )}

{activeTab === 9 && (
          <>

<RequirementPage fetchData={fetchEvent} eventID={id} data={eventData} />
          </>
        )}



        {/* <div className='tab-navigation'>
          {activeTab > 0 && <button onClick={handlePrev}>Previous</button>}
          {activeTab < 7 && <button onClick={handleNext}>Next</button>}
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>} */}
      </section>
    </Layout>
  );

};

export default EditAdminEvent;