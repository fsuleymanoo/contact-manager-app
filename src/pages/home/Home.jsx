import { Link, Navigate } from 'react-router';
import './Home.css'
import ContactList from '../../components/contactList/ContactList';



function Home() {
  return (
    <div className='d-flex flex-column justify-content-center w-100'>
      <h3 className='fs-1 fw-bold mt-4 front text-light text-center text-cust-color'>Contacts</h3>
      <ContactList/>
      
    </div>
  );
}

export default Home;
