import { useEffect, useState } from "react";
import GlassCard from "../glassCard/GlassCard";
import "./ContactCard.css";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { BsFillBookmarkDashFill } from "react-icons/bs";
import { FcEditImage } from "react-icons/fc";
import { FcRemoveImage } from "react-icons/fc";
import { IoMdContact } from "react-icons/io";

import {
  addToFavorites,
  fetchContacts,
  deleteFromFavorites,
  deleteContact,
  fetchSingleContact,
  updateContact,
} from "../../utils/api";
import { useGlobalStore } from "../../hooks/useGlobalStore";

function ContactCard({
  base64_image,
  city,
  country,
  email,
  full_name,
  id,
  is_favorite,
  phone_number,
}) {
  const { store, dispatch } = useGlobalStore();
  const [isFav, setIsFav] = useState(is_favorite);
  const [contact, setContact] = useState(null);

  const handleModal = () => {
    setShow(false);
  };

  const handleFavorite = async () => {
    setIsFav((prev) => !prev);

    try {
      if (isFav) {
        await deleteFromFavorites(store.user.user_id, id);
      } else {
        await addToFavorites(store.user.user_id, id);
      }

      const getContactsResponse = await fetchContacts(store.user.user_id);
      console.log("Fetched Contacts: ", getContactsResponse);
      dispatch({ type: "SET_CONTACTS", payload: getContactsResponse });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteContact = async () => {
    try {
      await deleteContact(store.user.user_id, id);
      const getContactsResponse = await fetchContacts(store.user.user_id);
      console.log("Fetched Contacts: ", getContactsResponse);
      dispatch({ type: "SET_CONTACTS", payload: getContactsResponse });
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const body = {
      user_id: store.user.user_id,
      full_name: contact.full_name,
      phone_number: contact.phone_number,
      email: contact.email,
      street: contact.street,
      city: contact.city,
      state: contact.state,
      postal_code: contact.postal_code,
      country: contact.country,
    };

    try {
      const updatedContactResponse = await updateContact(id, body);
      console.log(updatedContactResponse);

      dispatch({ type: "SET_CONTACT", payload: updatedContactResponse });

      const getContactsResponse = await fetchContacts(store.user.user_id);
      console.log("Fetched Contacts: ", getContactsResponse);
      dispatch({ type: "SET_CONTACTS", payload: getContactsResponse });
    } catch (e) {
      console.log(e);
    }
  };

  const getContact = async (id) => {
    try {
      const getContactResp = await fetchSingleContact(store.user.user_id, id);
      setContact(getContactResp);
      dispatch({ type: "SET_CONTACT", payload: getContactResp });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getContact(id);
  }, [id]);

  return (
    <>
      <GlassCard type="glass-contact-card">
        {/* hadle the whole card */}
        <div className="d-flex justify-content-between">
          {/* handle left part of the card */}
          <div className="d-flex justify-content-start align-items-center">
            <button
              onClick={handleFavorite}
              className="btn border border-0 m-0 p-0"
            >
              {is_favorite ? (
                <BsFillBookmarkCheckFill className="fs-5 text-primary opacity-75" />
              ) : (
                <BsFillBookmarkDashFill className="fs-5 text-light opacity-25" />
              )}
            </button>
            <div className="image-container">
              {base64_image ? (
                <img
                  className="profile-image ms-4"
                  src={base64_image}
                  alt="Profile image"
                />
              ) : (
                <IoMdContact className="placeholder-image ms-4" />
              )}
            </div>
            <div className="text-light ms-5">
              <div className="fs-6 fw-bold cust-border">{full_name}</div>
              <div className="card-info-secondary">{phone_number}</div>
              <div className="card-info-secondary">{email}</div>
              <div className="card-info-secondary">{city}</div>
            </div>
          </div>
          {/* hadle the right part of the card */}
          <div className="d-flex align-items-center justify-content-center">
            <button
              className="btn border border-0 btn-sm m-0 p-0"
              onClick={() => getContact(id)}
              data-bs-toggle="modal"
              data-bs-target={`#editModal-${id}`}
            >
              <FcEditImage className="fs-3 opacity-50 me-3" />
            </button>

            <button
              onClick={handleDeleteContact}
              className="btn border border-0 btn-sm m-0 p-0"
            >
              <FcRemoveImage className="fs-3 opacity-50" />
            </button>
          </div>
        </div>
      </GlassCard>

      <div
        // onClick={(e)  => e.stopPropagation()}
        className="modal fade"
        id={`editModal-${id}`}
        tabIndex="-1"
        aria-labelledby={`editModalLabel-${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-4 fw-bold"
                id={`#editModalLabel-${id}`}
              >
                Edit Contact
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleUpdate}
                className="row g-3 needs-validation"
                noValidate
              >
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Full Name
                  </label>
                  <input
                    onChange={(e) =>
                      setContact({ ...contact, full_name: e.target.value })
                    }
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    value={contact?.full_name}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">
                    Email
                  </label>
                  <input
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    type="email"
                    className="form-control"
                    id="validationCustom02"
                    value={contact?.email}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    Phone Number
                  </label>
                  <div className="input-group has-validation">
                    <input
                      onChange={(e) =>
                        setContact({ ...contact, phone_number: e.target.value })
                      }
                      value={contact?.phone_number}
                      type="text"
                      className="form-control"
                      id="validationCustomUsername"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <div className="invalid-feedback">
                      Please add a phone number.
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="validationCustom03" className="form-label">
                    Street
                  </label>
                  <input
                    onChange={(e) =>
                      setContact({ ...contact, street: e.target.value })
                    }
                    value={contact?.street}
                    type="text"
                    className="form-control"
                    id="validationCustom03"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid street.
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="validationCustom03" className="form-label">
                    City
                  </label>
                  <input
                    onChange={(e) =>
                      setContact({ ...contact, city: e.target.value })
                    }
                    value={contact?.city}
                    type="text"
                    className="form-control"
                    id="validationCustom03"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid city.
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="validationCustom03" className="form-label">
                    State
                  </label>
                  <input
                    onChange={(e) =>
                      setContact({ ...contact, state: e.target.value })
                    }
                    value={contact?.state}
                    type="text"
                    className="form-control"
                    id="validationCustom03"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="validationCustom03" className="form-label">
                    Country
                  </label>
                  <input
                    onChange={(e) =>
                      setContact({ ...contact, country: e.target.value })
                    }
                    value={contact?.country}
                    type="text"
                    className="form-control"
                    id="validationCustom03"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid country.
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="validationCustom05" className="form-label">
                    Zip
                  </label>
                  <input
                    onChange={(e) =>
                      setContact({ ...contact, postal_code: e.target.value })
                    }
                    value={contact?.postal_code}
                    type="text"
                    className="form-control mb-4"
                    id="validationCustom05"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid zip.
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactCard;
