import React, { useState } from 'react';

function StudentAdmin() {
    const [studentData, setStudentData] = useState([]);
    const [editingEmail, setEditingEmail] = useState(null);
    const [editForm, setEditForm] = useState({ name: "", email: "", password: "" });

    // Function to fetch and display student data
    async function showData(e) {
        e.preventDefault();
        const sid = e.target.sid.value;

        try {
            const response = await fetch(`http://localhost:3005/admin/show?sid=${sid}`);
            const res = await response.json();
            setStudentData(res.msg);
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    }

    // Function to handle deleting a student
    async function handleDelete(email) {
        try {
            const response = await fetch(`http://localhost:3005/admin/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const result = await response.json();
            if (result.msg === "Student deleted successfully") {
                setStudentData(prev => prev.filter(stu => stu.email !== email));
            } else {
                console.error("Failed to delete student:", result.msg);
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }

    // Function to handle editing a student's details
    function handleEdit(student) {
        setEditingEmail(student.email);
        setEditForm({ ...student });
    }

    // Function to handle form input changes during editing
    function handleInputChange(e) {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    }

    // Function to handle updating a student's details
    async function handleUpdateSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3005/admin/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editForm)
            });

            const result = await response.json();
            if (result.msg === "Student updated successfully") {
                setStudentData(prev =>
                    prev.map(stu => stu.email === editingEmail ? editForm : stu)
                );
                setEditingEmail(null);
            } else {
                console.error("Update failed");
            }
        } catch (err) {
            console.error("Update failed:", err);
        }
    }

    return (
        <div>
            <div style={{ backgroundColor: "red", color: "white", fontSize: '25px', margin: '20px' }}>StudentAdmin</div>
            <form onSubmit={showData}>
                <input type='text' name='sid' placeholder='Enter * or Student email' required />
                <button>Search Student</button>
            </form>

            <div>
                {studentData.length > 0 ? (
                    <table border="1" style={{ marginTop: '20px', width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.map((student, index) => (
                                <tr key={index}>
                                    {editingEmail === student.email ? (
                                        <>
                                            <td><input name="name" value={editForm.name} onChange={handleInputChange} /></td>
                                            <td><input name="email" value={editForm.email} onChange={handleInputChange} /></td>
                                            <td><input name="password" value={editForm.password} onChange={handleInputChange} /></td>
                                            <td>
                                                <button onClick={handleUpdateSubmit}>Save</button>
                                                <button onClick={() => setEditingEmail(null)}>Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{student.name}</td>
                                            <td>{student.email}</td>
                                            <td>{student.password}</td>
                                            <td>
                                                <button onClick={() => handleEdit(student)}>Edit</button>
                                                <button onClick={() => handleDelete(student.email)}>Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h2>No student available</h2>
                )}
            </div>
        </div>
    );
}

export default StudentAdmin;
