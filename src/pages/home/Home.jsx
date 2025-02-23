import ContactList from "../../components/contactList/ContactList";
import "./Home.css";
import { fetchUserByEmail, fetchContacts } from "../../utils/api";
import { useEffect, useState } from "react";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import "../../components/circle/Circle.jsx";
import { useLocation } from "react-router";

function Home() {
  const location = useLocation();

  const successMessage = location.state?.successMessage;
  const [message, setMessage] = useState(true);
  const handleMessage = () => {
    setMessage(false);
  }


  const { store, dispatch } = useGlobalStore();

  const getContacts = async () => {
    const getContactsResponse = await fetchContacts(store.user.user_id);
    console.log("Fetched Contacts: ", getContactsResponse);
    dispatch({ type: "SET_CONTACTS", payload: getContactsResponse });
    
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
     
      <div className={`d-flex justify-content-center align-items-center ${message ? '' : 'd-none'} sticky-top`}>
        {successMessage && (
          <div className="p-1 bg-light fw-bold fs-4 text-center mt-5 d-flex rounded">
            {successMessage}
            <button onClick={handleMessage} className="close-btn ms-2 btn btn-sm btn-primary text-light">OK</button>
          </div>
        )}
      </div>
      
      <div className="d-flex flex-column justify-content-center w-100 p-1">
        <h3 className="fs-1 fw-bold front text-cust-color text-center mt-4">
          Contacts
        </h3>
        <ContactList />
      </div>
    </div>
  );
}

export default Home;
