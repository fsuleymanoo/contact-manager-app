import React from 'react';
import ContactCard from '../contactCard/ContactCard';
import { useGlobalStore } from '../../hooks/useGlobalStore.js';

function ContactList() {
  const { store, dispatch } = useGlobalStore();

  return (
    <div className="d-flex justify-content-center flex-column align-items-center gap-2">
      {store.contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          base64_image={contact.base64_image}
          city={contact.city}
          country={contact.country}
          email={contact.email}
          full_name={contact.full_name}
          id={contact.id}
          is_favorite={contact.is_favorite}
          phone_number={contact.phone_number}
        />
      ))}
    </div>
  );
}

export default ContactList;
