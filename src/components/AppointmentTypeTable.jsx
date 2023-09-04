import { Table, Button } from 'react-bootstrap';

const AppointmentTypeTable = ({ appointments, onEdit, onDelete }) => {
    return (
        <div className="table-responsive">
            <Table className='mt-5 table' striped bordered hover responsive="sm" >
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>description</th>
                        <th>duration (minutes)</th>
                        <th>color</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {appointments.map(appointment => (
                    <tr key={appointment.Id}>
                        <td>{appointment.name}</td>
                        <td>{appointment.description}</td>
                        <td>{appointment.duration_minutes}</td>
                        <td><div style={{backgroundColor: "#"+appointment.color_hex_code}}>{appointment.color_hex_code}</div></td>
                        <td>
                            <Button className='me-1' variant="outline-primary" onClick={() => onEdit(appointment)}>Edit</Button>
                            <Button variant="outline-info" onClick={() => onDelete(appointment.Id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default AppointmentTypeTable;