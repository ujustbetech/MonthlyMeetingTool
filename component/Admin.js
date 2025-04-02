import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, doc, setDoc, Timestamp, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';

const CreateEvent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [eventName, setEventName] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [agendaPoints, setAgendaPoints] = useState(['']);
  const [zoomLink, setZoomLink] = useState('');
  const [facilitator, setFacilitator] = useState('');
  const [topic, setTopic] = useState('');
  const [referralFrom, setReferralFrom] = useState('');
  const [referralDesc, setReferralDesc] = useState('');
  const [facilitatorDesc, setFacilitatorDesc] = useState('');
  const [e2aDesc, setE2aDesc] = useState('');
  const [interactionParticipants, setInteractionParticipants] = useState(['', '']);
  const [interactionDate, setInteractionDate] = useState('');
  const [e2aDate, setE2aDate] = useState('');
  const [e2a, setE2a] = useState('');
  const [reqfrom, setReq] = useState('');
  const [knowledgeSharing,setKnowledgeSharin] = useState('');
  const [prospect, setProspect] = useState('');
 
  const [prospectName, setProspectName] = useState('');
  const [prospectDescription, setProspectDescription] = useState('');
  const [reqDescription, setReqDescription] = useState('');
  const [knowledgeSharingName, setKnowledgeSharingName] = useState('');
  const [knowledgeSharingDesc, setKnowledgeSharingDesc] = useState('');
  const [contentTopic, setContentTopic] = useState('');
  const [contentType, setContentType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userList, setUserList] = useState([]);
  const [facilitatorSearch, setFacilitatorSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [referralFromSearch, setReferralFromSearch] = useState('');

const [filteredReferralUsers, setFilteredReferralUsers] = useState([]);

  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [e2aSearch, setE2aSearch] = useState('');

  const [filteredReferralFromUsers, setFilteredReferralFromUsers] = useState([]);

  const [sections, setSections] = useState([{ id: 1, facilitator: '', facilitatorDesc: '' }]);
  const [referralSections, setReferralSections] = useState([
    { id: 1, referralFrom: '', referralFromSearch: '', referralTo: '', referralToSearch: '', referralDesc: '' }
  ]);
  

  // State for Referral To
  const [referralToSearch, setReferralToSearch] = useState("");
  const [filteredReferralToUsers, setFilteredReferralToUsers] = useState([]);
  const [referralTo, setReferralTo] = useState([]);
  const [prospectSearch, setProspectSearch] = useState('');
  const [reqSearch, setReqSearch] = useState('');
  const [knowledgeSharingSearch, setknowledgeSharingSearch] = useState('');

  // Handle Search Input
  const handleSearchknowledgeSharing = (e) => {
    const query = e.target.value;
    setknowledgeSharingSearch(query);
    setFilteredUsers(
      userList.filter(user => user.name?.toLowerCase().includes(query.toLowerCase()))
    );
  };
  
  // Handle Selecting a User
  const handleSelectKnowledgeSharing = (name) => {
    setKnowledgeSharin(name);
    setknowledgeSharingSearch('');
    setFilteredUsers([]);
  };

  // Handle Search Input
  const handleSearchReq = (e) => {
    const query = e.target.value;
    setReqSearch(query);
    setFilteredUsers(
      userList.filter(user => user.name?.toLowerCase().includes(query.toLowerCase()))
    );
  };
  const handleSearchReferralFrom = (index, value) => {
    setReferralSections(prev =>
      prev.map((section, i) => 
        i === index ? { ...section, referralFromSearch: value } : section
      )
    );
  
    const filteredUsers = userList.filter(user =>
      user.name?.toLowerCase().includes(value.toLowerCase())
    );
  
    setFilteredReferralFromUsers(filteredUsers);
  };
  
  const handleSelectReferralFrom = (index, name) => {
    setReferralSections(prev =>
      prev.map((section, i) => 
        i === index ? { ...section, referralFrom: name, referralFromSearch: '' } : section
      )
    );
  
    setFilteredReferralFromUsers([]); // Clear dropdown
  };
  
  const handleSearchReferralTo = (index, value) => {
    setReferralSections(prev =>
      prev.map((section, i) => 
        i === index ? { ...section, referralToSearch: value } : section
      )
    );
  
    const filteredUsers = userList.filter(user =>
      user.name?.toLowerCase().includes(value.toLowerCase())
    );
  
    setFilteredReferralToUsers(filteredUsers);
  };
  
  const handleSelectReferralTo = (index, name) => {
    setReferralSections(prev =>
      prev.map((section, i) => 
        i === index ? { ...section, referralTo: name, referralToSearch: '' } : section
      )
    );
  
    setFilteredReferralToUsers([]); // Clear dropdown
  };
  
  const handleReferralDescChange = (index, value) => {
    setReferralSections(prev =>
      prev.map((section, i) => 
        i === index ? { ...section, referralDesc: value } : section
      )
    );
  };
  
  const handleAddReferralSection = () => {
    setReferralSections(prev => [
      ...prev,
      { id: prev.length + 1, referralFrom: '', referralFromSearch: '', referralTo: '', referralToSearch: '', referralDesc: '' }
    ]);
  };
 
  
  // Handle Selecting a User
  const handleSelectReq = (name) => {
    setReq(name);
    setReqSearch('');
    setFilteredUsers([]);
  };

// Handle Search Input
const handleSearchProspect = (e) => {
  const query = e.target.value;
  setProspectSearch(query);
  setFilteredUsers(
    userList.filter(user => user.name?.toLowerCase().includes(query.toLowerCase()))
  );
};

// Handle Selecting a User
const handleSelectProspect = (name) => {
  setProspect(name);
  setProspectSearch('');
  setFilteredUsers([]);
};
  
  
  
  
  


// Handle Search Input
const handleSearchE2a = (e) => {
  const query = e.target.value;
  setE2aSearch(query);
  setFilteredUsers(
    userList.filter(user => user.name?.toLowerCase().includes(query.toLowerCase()))
  );
};

// Handle Selecting a User
const handleSelectE2a = (name) => {
  setE2a(name);
  setE2aSearch('');
  setFilteredUsers([]);
};

  const handleSelect = (index, value, setSearchTerm, setShowDropdown) => {
    const newParticipants = [...interactionParticipants];
    newParticipants[index] = value;
    setInteractionParticipants(newParticipants);
    setSearchTerm(value);
    setShowDropdown(false); // Hide dropdown after selecting
  };

  // Handle Search Input
  const handleSearchFacilitator = (e) => {
    const query = e.target.value;
    setFacilitatorSearch(query);
    setFilteredUsers(
      userList.filter(user => user.name?.toLowerCase().includes(query.toLowerCase()))
    );
    
  };
  
  const handleSelectFacilitator = (index, name) => {
    setFacilitatorSearch('');
    setFilteredUsers([]);
  
    // Update the specific section in the array
    setSections(prev => 
      prev.map((sec, i) => 
        i === index ? { ...sec, facilitator: name } : sec
      )
    );
  };
  
  const handleNext = () => {
    if (activeTab < 7) setActiveTab(activeTab + 1);
  };

  const handlePrev = () => {
    if (activeTab > 0) setActiveTab(activeTab - 1);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRef = collection(db, 'userdetails'); // Firestore collection name
        const snapshot = await getDocs(userRef);
        const users = snapshot.docs.map(doc => ({
          id: doc.id, // Phone number (if needed)
          name: doc.data()[" Name"], // Ensure 'Name' is correctly capitalized (case-sensitive)
        }));
        setUserList(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const monthlyMeetRef = collection(db, 'MonthlyMeeting');
      const uniqueId = doc(monthlyMeetRef).id;
      const eventDocRef = doc(monthlyMeetRef, uniqueId);

   await setDoc(eventDocRef, {
 
    time: Timestamp.fromDate(new Date(eventTime)),
    agenda: agendaPoints,
    zoomLink
  ,
  Eventname: eventName,
  Facilitator: sections.map(sec => ({
    facilitator: sec.facilitator,
    facilitatorDesc: sec.facilitatorDesc
  })),
  referral: referralSections.map(sec => ({
    from: sec.referralFrom,
    to: sec.referralTo,
    description: sec.referralDesc
  })),
  interaction: { participants: interactionParticipants, date: interactionDate },
  E2a: { organizer: e2a, e2atopic: e2aDesc, e2adate: e2aDate },
  prospect: { organizer: prospect, name: prospectName, description: prospectDescription },
  knowledgeSharing: { name: knowledgeSharing, topic: knowledgeSharingName, description: knowledgeSharingDesc },
  requirements: { requirement: reqfrom, reqdescription: reqDescription },
  uniqueId,
});

      
      setSuccess('Event created successfully!');
      setLoading(false);

    } catch (error) {
      setError('Error creating event. Please try again.');
      setLoading(false);
    }
  };

  const tabs = [
    'Basic Info', 'Facilitator', 'Referral Possibility', '1-2-1 Interaction', 'E2A', 'Prospect Identified', 'Knowledge Sharing' ,'Upload Mom','Upload Image' , 'Requirement'
  ];
  const handleAgendaChange = (index, value) => {
    const updatedPoints = [...agendaPoints];
    updatedPoints[index] = value; // Update the specific agenda point
    setAgendaPoints(updatedPoints);
  };
 
  const handleAddSection = () => {
    setSections([...sections, { id: sections.length + 1, facilitator: '', facilitatorDesc: '' }]);
  };

  const handleDescChange = (index, value) => {
    setSections(prev => prev.map((sec, i) => i === index ? { ...sec, facilitatorDesc: value } : sec));
  };
  return (
    <section className='c-form box'>
      <h2>Create New Event</h2>
      <div className='tab-header'>
        {tabs.map((tab, index) => (
          <button key={index} className={index === activeTab ? 'active' : ''} onClick={() => setActiveTab(index)}>
            {tab}
          </button>
        ))}
      </div>
      <form onSubmit={handleCreateEvent}>
        {activeTab === 0 && <section className='c-form  box'>
          <h2>Create New Event</h2>


          <ul>
            <li className='form-row'>
              <h4>Event Name<sup>*</sup></h4>
              <div className='multipleitem'>

                <input
                  type="text"
                  placeholder="Event Name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>
            </li>
            <li className='form-row'>
              <h4>Date<sup>*</sup></h4>
              <div className='multipleitem'>
                <input
                  type="datetime-local"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  required
                />
              </div>
            </li>

            <li className='form-row'>
              <h4>Agenda<sup>*</sup></h4>
              <div className='multipleitem'>
                {/* Dynamic agenda input fields */}
                {agendaPoints.map((point, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <textarea
                      value={point}
                      onChange={(e) => handleAgendaChange(index, e.target.value)}
                      placeholder={`Agenda Point ${index + 1}`}
                      required
                      rows={3}
                      style={{ width: '300px', marginRight: '10px' }}
                    />
                    {agendaPoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAgendaPoint(index)}
                        style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </li>

            <li className='form-row'>
              <h4>Zoom link</h4>
              <div className='multipleitem'>
                <input
                  type="text"
                  placeholder="Zoom Link"
                  value={zoomLink}
                  onChange={(e) => setZoomLink(e.target.value)}
                  required
                />
              </div>
            </li>


          </ul>


          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          {/* Loader while submitting */}
          {loading && (
            <div className='loader'> <span className="loader2"></span> </div>
          )}
        </section>}
        {activeTab === 1 && (
  <>
    <ul>
      {sections.map((section, index) => (
        <li key={section.id} className='form-row'>
          <h4>Select Name:<sup>*</sup></h4>
          <div className='multipleitem'>
            <input
              type="text"
              placeholder="Search Facilitator"
              value={facilitatorSearch}
              onChange={handleSearchFacilitator}
            />
            {filteredUsers.length > 0 && (
              <ul className="dropdown">
                {filteredUsers.map(user => (
                  <li key={user.id} onClick={() => handleSelectFacilitator(index, user.name)}>
                    {user.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <h4>Selected Facilitator:<sup>*</sup></h4>
          <div className='multipleitem'>
            <p>{section.facilitator}</p>
          </div>

          <h4>Description:<sup>*</sup></h4>
          <div className='multipleitem'>
            <textarea
              placeholder="Description"
              value={section.facilitatorDesc}
              onChange={(e) => handleDescChange(index, e.target.value)}
            />
          </div>
        </li>
      ))}
    </ul>

    <button className="submitbtn" type="button" onClick={handleAddSection}>
      Add More
    </button>
  </>
)}


{activeTab === 2 && (
  <>
    <ul>
      {referralSections.map((section, index) => (
        <li key={section.id} className='form-row'>

          {/* Referral From */}
          <h4>Select Name:<sup>*</sup></h4>
          <div className='multipleitem'>
            <input
              type="text"
              placeholder="Search Referral From"
              value={section.referralFromSearch}
              onChange={(e) => handleSearchReferralFrom(index, e.target.value)}
            />
            {filteredReferralFromUsers.length > 0 && (
              <ul className="dropdown">
                {filteredReferralFromUsers.map((user) => (
                  <li key={user.id} onClick={() => handleSelectReferralFrom(index, user.name)}>
                    {user.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p>Selected Referral From: {section.referralFrom}</p>

          {/* Referral To */}
          <h4>Select Name:<sup>*</sup></h4>
          <div className='multipleitem'>
            <input
              type="text"
              placeholder="Search Referral To"
              value={section.referralToSearch}
              onChange={(e) => handleSearchReferralTo(index, e.target.value)}
            />
            {filteredReferralToUsers.length > 0 && (
              <ul className="dropdown">
                {filteredReferralToUsers.map((user) => (
                  <li key={user.id} onClick={() => handleSelectReferralTo(index, user.name)}>
                    {user.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p>Selected Referral To: {section.referralTo}</p>

          {/* Description */}
          <h4>Description:<sup>*</sup></h4>
          <div className='multipleitem'>
            <textarea
              placeholder='Description'
              value={section.referralDesc}
              onChange={(e) => handleReferralDescChange(index, e.target.value)}
              required
            />
          </div>

        </li>
      ))}
    </ul>

    {/* Button to Add More Referral Sections */}
    <button className="submitbtn" type="button" onClick={handleAddReferralSection}>
      Add More
    </button>
  </>
)}


        {activeTab === 3 && (
          <>
           <ul>
      <li className='form-row'>
        <h4>Select Name:<sup>*</sup></h4>
        <div className='multipleitem'>

          <input
        type="text"
        placeholder="Search Participant 1"
        value={searchTerm1}
        onChange={(e) => {
          setSearchTerm1(e.target.value);
          setShowDropdown1(e.target.value.length > 0); // Show only if typing
        }}
        onFocus={() => setShowDropdown1(searchTerm1.length > 0)}
      />
      {showDropdown1 && (
        <div style={{ border: "1px solid #ccc", maxHeight: "150px", overflowY: "auto" }}>
          {userList
            .filter(user => user.name?.toLowerCase().includes(searchTerm1.toLowerCase()))
            .map(user => (
              <div
                key={user.id}
                onClick={() => handleSelect(0, user.name, setSearchTerm1, setShowDropdown1)}
                style={{ cursor: "pointer", padding: "5px", borderBottom: "1px solid #ccc" }}
              >
                {user.name}
              </div>
            ))}
        </div>
      )}
 <button className="submitbtn" type="button">
            Search
          </button>
        </div>
      </li>
      {/* Participant 2 Searchable Input */}
      <li className='form-row'>
        <h4>Select Name 1:<sup>*</sup></h4>
        <div className='multipleitem'>
      <input
        type="text"
        placeholder="Search Participant 2"
        value={searchTerm2}
        onChange={(e) => {
          setSearchTerm2(e.target.value);
          setShowDropdown2(e.target.value.length > 0); // Show only if typing
        }}
        onFocus={() => setShowDropdown2(searchTerm2.length > 0)}
      />
      {showDropdown2 && (
        <div style={{ border: "1px solid #ccc", maxHeight: "150px", overflowY: "auto" }}>
          {userList
            .filter(user => user.name?.toLowerCase().includes(searchTerm2.toLowerCase()))
            .map(user => (
              <div
                key={user.id}
                onClick={() => handleSelect(1, user.name, setSearchTerm2, setShowDropdown2)}
                style={{ cursor: "pointer", padding: "5px", borderBottom: "1px solid #ccc" }}
              >
                {user.name}
              </div>
            ))}
        </div>
      )}
      <button className="submitbtn" type="button">
            Search
          </button>
          </div>
</li> 
       
<li className='form-row'>
        <h4>Select Date:<sup>*</sup></h4>
        <div className='multipleitem'>
 
      {/* Date Input */}
      <input type="datetime-local" value={interactionDate} onChange={(e) => setInteractionDate(e.target.value)} required />
      </div>
      </li>
        </ul>  </>
        )}
          {activeTab === 4 && (
            <>
             <ul>
      <li className='form-row'>
        <h4>Select Name:<sup>*</sup></h4>
        <div className='multipleitem'>

              <input
      type="text"
      placeholder="Search E2A orgainzer"
      value={e2aSearch}
      onChange={handleSearchE2a}
    />
    {filteredUsers.length > 0 && (
      <ul className="dropdown">
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => handleSelectE2a(user.name)}>
            {user.name}
          </li>
        ))}
      </ul>
      
    )}
     <button className="submitbtn" type="button">
            Search
          </button>
          </div>
</li> 
<li className='form-row'>
            <h4>Selecled E2A orgainzer:<sup>*</sup></h4>
            <div className='multipleitem'>
            <p>  {e2a}</p>
          </div>
    </li>
    <li className='form-row'>
        <h4>Select Description:<sup>*</sup></h4>
        <div className='multipleitem'>

    <textarea placeholder='Description' value={e2aDesc} onChange={(e) => setE2aDesc(e.target.value)} required />
      </div>
      </li>
    <li className='form-row'>
        <h4>Select Date:<sup>*</sup></h4>
        <div className='multipleitem'>
 <input type="datetime-local" value={e2aDate} onChange={(e) => setE2aDate(e.target.value)} required />
 </div>
 </li>
    </ul>
            </>
          )}
           {activeTab === 5 && (
            <>
               <ul>
      <li className='form-row'>
        <h4>Select Name:<sup>*</sup></h4>
        <div className='multipleitem'>

              <input
      type="text"
      placeholder="Search Prospect"
      value={prospectSearch}
      onChange={handleSearchProspect}
    />
    {filteredUsers.length > 0 && (
      <ul className="dropdown">
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => handleSelectProspect(user.name)}>
            {user.name}
          </li>
        ))}
      </ul>
    )}
    <button className="submitbtn" type="button">
            Search
          </button>
          </div>
</li> 
<li className='form-row'>
            <h4>Selecled Prospect:<sup>*</sup></h4>
            <div className='multipleitem'>
            <p>{prospect}</p>
          </div>
    </li>
    <li className='form-row'>
            <h4>Name:<sup>*</sup></h4>
            <div className='multipleitem'>
    <textarea placeholder='Name' value={prospectName} onChange={(e) => setProspectName(e.target.value)} required />
      </div>
      </li>
      <li className='form-row'>
            <h4>Description:<sup>*</sup></h4>
            <div className='multipleitem'>
    <textarea placeholder='Description' value={prospectDescription} onChange={(e) => setProspectDescription(e.target.value)} required />
      </div>
      </li>
         </ul>   </>
           )}
            {activeTab === 6 && (
              <>
                 <ul>
      <li className='form-row'>
        <h4>Select Name:<sup>*</sup></h4>
        <div className='multipleitem'>
                <input
      type="text"
      placeholder="Search Knowledge"
      value={knowledgeSharingSearch}
      onChange={handleSearchknowledgeSharing}
    />
    {filteredUsers.length > 0 && (
      <ul className="dropdown">
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => handleSelectKnowledgeSharing(user.name)}>
            {user.name}
          </li>
        ))}
      </ul>
      
    )}
     <button className="submitbtn" type="button">
            Search
          </button>
          </div>
</li> 
    <li className='form-row'>
            <h4>Selecled Name:<sup>*</sup></h4>
            <div className='multipleitem'>
            <p>{knowledgeSharing}</p>
          </div>
    </li>
    <li className='form-row'>
            <h4>Name:<sup>*</sup></h4>
            <div className='multipleitem'>
    <textarea placeholder='Name'  value={knowledgeSharingName} onChange={(e) => setKnowledgeSharingName(e.target.value)} required />
      </div>
      </li>
      <li className='form-row'>
            <h4>Description:<sup>*</sup></h4>
            <div className='multipleitem'>
    <textarea placeholder='Description' value={knowledgeSharingDesc} onChange={(e) => setKnowledgeSharingDesc(e.target.value)} required />
      </div>
      </li>
 </ul>
              </>
            )}
              {activeTab === 7 && (<>
              
              </>)}
              {activeTab === 8 && (<></>)}
        {activeTab === 9 && (
            <>
              <ul>
      <li className='form-row'>
        <h4>Select Name:<sup>*</sup></h4>
        <div className='multipleitem'>
              <input
      type="text"
      placeholder="Search Name"
      value={reqSearch}
      onChange={handleSearchReq}
    />
    {filteredUsers.length > 0 && (
      <ul className="dropdown">
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => handleSelectReq(user.name)}>
            {user.name}
          </li>
        ))}
      </ul>
    )}
     <button className="submitbtn" type="button">
            Search
          </button>
          </div>
</li>
      <li className='form-row'>
            <h4>Selecled Name:<sup>*</sup></h4>
            <div className='multipleitem'>
            <p>{reqfrom}</p>
          </div>
    </li>
  
    <li className='form-row'>
            <h4>Description:<sup>*</sup></h4>
            <div className='multipleitem'>
    <textarea placeholder='Description' value={reqDescription} onChange={(e) => setReqDescription(e.target.value)} required />
      </div>
      </li>
      <li className='form-row'>
           
            <div className='multipleitem'>
    <button  className='submitbtn' type='submit' disabled={loading}>Submit</button>
    </div>
    </li>
  </ul>
            </>
            
           )}
           
      </form>
      
      <div className='tab-navigation'>
        {activeTab > 0 && <button onClick={handlePrev}>Previous</button>}
        {activeTab < 7 && <button onClick={handleNext}>Next</button>}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </section>
  );
};

export default CreateEvent;
