/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import AppointmentTypeTable from './components/AppointmentTypeTable';
import AppointmentTypeForm from './components/AppointmentTypeForm';
import Toast from './components/Toast';


const App = () => {
  const apiUrl = "http://localhost:8080";

  const [alertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("info");

  const [modalShow, setModalShow] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/appointment_type/all`);
      setAppointments(response.data);
    } catch (error) {
      toast('Error fetching appointments: ' + error, 'danger');
      console.error('Error fetching appointments:', error);
    }
  };

  useLayoutEffect(() => {
    fetchAppointments();
  }, []);

  const handleEdit = appointment => {
    setSelectedAppointment(appointment);
    setModalShow(true);
  };

  const handleDelete = async appointmentId => {
    try {
      await axios.delete(`${apiUrl}/appointment_type/${appointmentId}`);
      toast('Delete appointment type', 'success');
      fetchAppointments();
    } catch (error) {
      toast('Error deleting appointment: ' + error, 'danger');
      console.error('Error deleting appointment:', error);
    }
  };

  const handleSave = async appointmentData => {
    try {
      if (appointmentData.Id) {
        await axios.put(`${apiUrl}/appointment_type/${appointmentData.Id}`, appointmentData);
      } else {
        await axios.post(`${apiUrl}/appointment_type`, appointmentData); 
      }
      toast('Saving appointment', 'success');
      fetchAppointments();
    } catch (error) {
      toast('Error saving appointment: ' + error, 'danger');
      console.error('Error saving appointment:', error);
    }
  };

  const toast = (message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setAlertShow(true);
    setTimeout(() => {
      setAlertShow(false);
    }, "4000");
  }


  return (
    <div className="App container">
      {alertShow &&
        <Toast message={alertMessage} variant={alertVariant} />
      }
      <h1><strong>Appointment Type Management</strong></h1>
      <button className="btn  btn-outline-primary mt-5" onClick={() => { setSelectedAppointment(null); setModalShow(true); }}>Add appointment type</button>
      <AppointmentTypeTable appointments={appointments} onEdit={handleEdit} onDelete={handleDelete} />
      <AppointmentTypeForm show={modalShow} onHide={() => setModalShow(false)} onSave={handleSave} appointment={selectedAppointment}/>
    </div>
  );
}

export default App;
