/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AppointmentTypeForm = ({ show, onHide, onSave, appointment }) => {

  const [name, setName] = useState(appointment ? appointment.name : '');
  const [description, setDescription] = useState(appointment ? appointment.description : '');
  const [duration_minutes, setDurationMinutes] = useState(appointment ? appointment.duration_minutes : '');
  const [color_hex_code, setColorHexCode] = useState(appointment ? appointment.color_hex_code : '');

  const handleSave = () => {
    onSave({ Id: appointment ? appointment.Id : null, name, description, duration_minutes, color_hex_code });
    onHide();
  };

  useLayoutEffect(() => {
    if(appointment){
        setName(appointment.name);
        setDescription(appointment.description);
        setDurationMinutes(appointment.duration_minutes);
        setColorHexCode(appointment.color_hex_code);
    }else{
        setName("");
        setDescription("");
        setDurationMinutes("");
        setColorHexCode("");
    }
}, [appointment]);

  return (
    <Modal show={show} fullscreen={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{appointment ? 'Edit Appointment' : 'Add Appointment'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
            <Form >
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control required type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDurationMinutes">
                <Form.Label>Duration (Minutes)</Form.Label>
                <Form.Control required type="text" value={duration_minutes} onChange={e => setDurationMinutes(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formColorHexCode">
                <Form.Label>Color Hex Code</Form.Label>
                <Form.Control required type="text" value={color_hex_code} onChange={e => setColorHexCode(e.target.value)} />
            </Form.Group>
            </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AppointmentTypeForm;