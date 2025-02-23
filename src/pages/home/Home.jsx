import ContactList from "../../components/contactList/ContactList";
import "./Home.css";
import { fetchUserByEmail, fetchContacts } from "../../utils/api";
import { useEffect } from "react";
import { useGlobalStore } from "../../hooks/useGlobalStore";



function Home() {

  const { store, dispatch } = useGlobalStore();
const getContacts = async () => {


  const getContactsResponse = await fetchContacts(
    store.user.user_id
  );
  console.log("Fetched Contacts: ", getContactsResponse);
  dispatch({ type: "SET_CONTACTS", payload: getContactsResponse });

}

useEffect(() => {
  getContacts();

}, [])

  return (
    <div className="d-flex flex-column justify-content-center w-100 p-1">
      <h3 className="fs-1 fw-bold front text-cust-color text-center mt-4">
        Contacts
      </h3>
      <ContactList />
    </div>
  );
}

export default Home;
