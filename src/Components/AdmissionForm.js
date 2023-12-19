import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import db from "./firebase";
import { collection, addDoc } from "firebase/firestore";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import bgimg from "./wp3157182.jpg";

const AdmissionForm = () => {

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      selectedBatch: "",
      paymentDate: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      age: Yup.number()
        .required("Required")
        .min(18, "Must be at least 18")
        .max(65, "Must be at most 65"),
      selectedBatch: Yup.string().required("Required"),
      paymentDate: Yup.date().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        // Save user data to Firestore
        const docRef = await addDoc(collection(db, "users"), values);

        const paymentResponse = await CompletePayment(values);

        if (paymentResponse.success) {
          toast("Payment successful!");
        } else {
          toast("Payment failed. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast("Error submitting form. Please try again.");
      }
    },
  });

  // Function for payment processing
  const CompletePayment = (userDetails) => {
    return Promise.resolve({ success: true });
  };

  return (
    <div
      className="min-h-screen bg-amber-300 p-4 bg-cover bg-center w-full h-screen"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="flex justify-center align-middle mt-4 h-28">
        <div className="font-bold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-800">
          Yoga Classes Admission Form
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="ml-96">
        <div className="max-w-md mx-auto mt-20 p-4 bg-green-300 bg-opacity-0">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="mt-1 p-2 border rounded-md w-full"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-600 text-xs">{formik.errors.name}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-black"
              >
                Age:
              </label>
              <input
                type="number"
                id="age"
                name="age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
                className="mt-1 p-2 border rounded-md w-full"
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-red-600 text-xs">{formik.errors.age}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="selectedBatch"
                className="block text-sm font-medium text-black"
              >
                Select Batch:
              </label>
              <select
                id="selectedBatch"
                name="selectedBatch"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.selectedBatch}
                className="mt-1 p-2 border rounded-md w-full"
              >
                <option value="">Select Batch</option>
                <option value="6-7AM">6-7 AM</option>
                <option value="7-8AM">7-8 AM</option>
                <option value="8-9AM">8-9 AM</option>
                <option value="5-6PM">5-6 PM</option>
              </select>
              {formik.touched.selectedBatch && formik.errors.selectedBatch && (
                <div className="text-red-600 text-xs">
                  {formik.errors.selectedBatch}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="paymentDate"
                className="block text-sm font-medium text-black"
              >
                Enrollment Date:
              </label>
              <input
                type="date"
                id="paymentDate"
                name="paymentDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.paymentDate}
                className="mt-1 p-2 border rounded-md w-full"
              />
              {formik.touched.paymentDate && formik.errors.paymentDate && (
                <div className="text-red-600 text-xs">
                  {formik.errors.paymentDate}
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-blue-500  text-white p-2 rounded-md hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring focus:border-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
