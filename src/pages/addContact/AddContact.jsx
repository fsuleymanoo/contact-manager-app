import { useState } from "react";
import GlassCard from "../../components/glassCard/GlassCard";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import { createContact } from "../../utils/api";

import { Link, useNavigate } from "react-router";

function AddContact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const { store, dispatch } = useGlobalStore();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const body = {
      user_id: store.user.user_id,
      full_name: fullName,
      phone_number: number,
      email: email,
      street: street,
      city: city,
      state: state,
      postal_code: zip,
      country: country,
    };

    try {
      const newContactResponse = await createContact(body);
      console.log(newContactResponse);


      setSuccessMessage('Contact added successfully!');

      navigate('/home', { state: { successMessage: 'Contact added successfully!' } });

    
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 text-light">
      <GlassCard>
        <form
          onSubmit={handleSubmit}
          className="row g-3 needs-validation"
          noValidate
        >
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              Full Name
            </label>
            <input 
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              className="form-control"
              id="validationCustom01"
              value={fullName}
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>

          <div className="col-md-4">
            <label htmlFor="validationCustom02" className="form-label">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="validationCustom02"
              value={email}
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>

          <div className="col-md-4">
            <label htmlFor="validationCustomUsername" className="form-label">
              Phone Number
            </label>
            <div className="input-group has-validation">
              <input
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                type="text"
                className="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                required
              />
              <div className="invalid-feedback">Please add a phone number.</div>
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="validationCustom03" className="form-label">
              Street
            </label>
            <input
              onChange={(e) => setStreet(e.target.value)}
              value={street}
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
              onChange={(e) => setCity(e.target.value)}
              value={city}
              type="text"
              className="form-control"
              id="validationCustom03"
              required
            />
            <div className="invalid-feedback">Please provide a valid city.</div>
          </div>

          <div className="col-md-3">
            <label htmlFor="validationCustom03" className="form-label">
              State
            </label>
            <input
              onChange={(e) => setState(e.target.value)}
              value={state}
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
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              type="text"
              className="form-control"
              id="validationCustom03"
              required
            />
            <div className="invalid-feedback">
              Please provide a valid country.
            </div>
          </div>

          <div className="col-md-3">
            <label htmlFor="validationCustom05" className="form-label">
              Zip
            </label>
            <input
              onChange={(e) => setZip(e.target.value)}
              value={zip}
              type="text"
              className="form-control"
              id="validationCustom05"
              required
            />
            <div className="invalid-feedback">Please provide a valid zip.</div>
          </div>

      

          <div className="col-12 text-center">
            <button className="btn btn-primary" type="submit">
              Add Contact
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}

export default AddContact;
