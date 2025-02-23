import { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      user_id: store.user.user_id,
      full_name: full_name,
      phone_number: phone_number,
      email: email,
      // street: street,
      city: city,
      // state: state,
      // postal_code: zip,
      country: country,
    };

    try {
      const newContactResponse = await createContact(body);
      console.log(newContactResponse);

      dispatch({ type: "SET_CONTACTS", payload: newContactResponse });
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };


  

 


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
            <button className="btn border border-0 btn-sm m-0 p-0">
              <FcEditImage
              
                className="fs-3 opacity-50 me-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              />
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
        className="modal"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4 fw-bold" id="exampleModalLabel">
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
                onSubmit={handleSubmit}
                className="row g-3 needs-validation"
                noValidate
              >
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Full Name
                  </label>
                  <input
                    onChange={(e) => e.target.value}
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    value={""}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">
                    Email
                  </label>
                  <input
                    onChange={(e) => e.target.value}
                    type="email"
                    className="form-control"
                    id="validationCustom02"
                    value={"email"}
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
                      onChange={(e) => e.target.value}
                      // value={phone_number}
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
                    onChange={(e) => e.target.value}
                    value={"street"}
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
                    onChange={(e) => e.target.value}
                    value={"city"}
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
                    onChange={(e) => e.target.value}
                    value={"state"}
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
                    onChange={(e) => e.target.value}
                    value={"country"}
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
                    onChange={(e) => e.target.value}
                    value={"zip"}
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
                  Save changes
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
