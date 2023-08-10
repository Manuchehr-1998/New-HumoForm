import { useState } from "react";
import "./App.css";

const YourComponent = () => {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    age: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    age: false,
    phone: false,
    email: false,
  });

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Perform any necessary validation or data manipulation
    console.log(`Blur event on ${name}. Value: ${value}`);
    if (name === "firstname" || name === "lastname") {
      const regex = /^[A-Za-z]+$/;
      if (!regex.test(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
        console.log(`${name} is invalid`);
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
      }
    } else if (name === "age") {
      const ageValue = parseInt(value); // Преобразуем значение в число

      if (ageValue <= 0 || isNaN(ageValue) || ageValue > 100) {
        // Проверяем на отрицательное число или не число
        setInputs((prevInputs) => ({ ...prevInputs, [name]: "" })); // Сбрасываем значение инпута обратно на пустую строку
        setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
        console.log(`${name} is invalid`);
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
      }
    } else if (name === "phone") {
      const regex = /^\d{9}$/;
      if (!regex.test(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
        console.log(`${name} is invalid`);
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
      }
    } else if (name === "email") {
      const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!regex.test(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
        console.log(`${name} is invalid`);
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
      }
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    console.log(`Focus event on ${name}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    inputs.age = parseInt(inputs.age); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary form submission logic
    inputs.age = parseInt(inputs.age);
    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      console.log("Form has errors. Please fix them before submitting.");
      return;
    }

    // Reset inputs after successful submission
    setInputs({
      firstname: "",
      lastname: "",
      age: "",
      phone: "",
      email: "",
    });

    // Show alert indicating successful submission
    console.table("Form submitted successfully!",inputs);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name</label>{" "}
          <input
            type="text"
            name="firstname"
            required
            value={inputs.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={`
              ${inputs.firstname && !errors.firstname ? "success" : ""} ${
              errors.firstname ? "invalid" : ""
            }`}
          />
          {errors.firstname  && (
            <p className="error">The firstname you entered is not valid</p>
          )}
          {inputs.firstname && !errors.firstname && (
            <p className="success">The firstname you entered looks good</p>
          )}
        </div>
        <div>
          <label htmlFor="lastname">Last Name</label>{" "}
          <input
            type="text"
            name="lastname"
            required
            value={inputs.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={`
              ${inputs.lastname && !errors.lastname ? "success" : ""} ${
              errors.lastname ? "invalid" : ""
            }`}
          />
          {errors.lastname && (
            <p className="error">The lastname you entered is not valid</p>
          )}
          {inputs.lastname && !errors.lastname && (
            <p className="success">The lastname you entered looks good</p>
          )}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            required
            value={inputs.age}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={`
            ${inputs.age && !errors.age ? "success" : ""} ${
              errors.age ? "invalid" : ""
            }`}
          />
          {errors.age && (
            <p className="error">
              Please note that the age field only accepts digits and values
              between 1 and 100.
            </p>
          )}
          {inputs.age && !errors.age && (
            <p className="success">The age you entered looks good</p>
          )}
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            value={inputs.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={`
            ${inputs.phone && !errors.phone ? "success" : ""} ${
              errors.phone ? "invalid" : ""
            }`}
          />
          {errors.phone && (
            <p className="error">
              Please correctly display the fields of the bodies will take the
              sense of 9 ciphers from 1 to 9
            </p>
          )}
          {inputs.phone && !errors.phone && (
            <p className="success">The phone you entered looks good</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            value={inputs.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={`
              ${inputs.email && !errors.email ? "success" : ""} ${
              errors.email ? "invalid" : ""
            }`}
          />
          {errors.email && (
            <p className="error">The email you entered is not valid</p>
          )}
          {inputs.email && !errors.email && (
            <p className="success">The email you entered looks good</p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default YourComponent;
