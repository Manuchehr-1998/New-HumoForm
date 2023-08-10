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

      if (ageValue <= 0 || isNaN(ageValue)) {
        // Проверяем на отрицательное число или не число
        setInputs((prevInputs) => ({ ...prevInputs, [name]: "" })); // Сбрасываем значение инпута обратно на пустую строку
        setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
        console.log(`${name} is invalid`);
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
      }
    } else if (name === "phone") {
      const regex = /^\d{10}$/;
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary form submission logic

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
    alert("Form submitted successfully!");
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name</label>{" "}
          <input
            type="text"
            name="firstname"
            value={inputs.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={errors.firstname ? "invalid" : ""}
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <label htmlFor="lastname">Last Name</label>{" "}
          <input
            type="text"
            name="lastname"
            value={inputs.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={errors.lastname ? "invalid" : ""}
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <label htmlFor="age">Age</label>{" "}
          <input
            type="number"
            name="age"
            value={inputs.age}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={errors.age ? "invalid" : ""}
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <label htmlFor="phone">Phone</label>{" "}
          <input
            type="tel"
            name="phone"
            value={inputs.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={errors.phone ? "invalid" : ""}
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <label htmlFor="email">Email</label>{" "}
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={errors.email ? "invalid" : ""}
          />{" "}
        </div>{" "}
        <button type="submit">Submit</button>{" "}
      </form>
    </div>
  );
};

export default YourComponent;
