const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const app = express();
const port = 3005;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// GET endpoint to show all or a specific student
app.get("/admin/show", async (req, res) => {
    try {
        const data = await fs.readFile('student.json', { encoding: 'utf-8' });
        const students = JSON.parse(data);
        const sid = req.query.sid;

        if (sid === "*" || !sid) {
            return res.json({ msg: students });
        }

        const result = students.find(ele => ele.email === sid);
        if (!result) {
            return res.json({ msg: [] });
        }

        return res.json({ msg: [result] });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// DELETE endpoint to delete a student by email
app.delete("/admin/delete", async (req, res) => {
    try {
        const { email } = req.body;
        
        // Read the student data
        const data = await fs.readFile('student.json', { encoding: 'utf-8' });
        let students = JSON.parse(data);
        
        // Remove the student from the list
        students = students.filter(student => student.email !== email);
        
        // Save the updated list back to the file
        await fs.writeFile('student.json', JSON.stringify(students, null, 2));
        
        return res.json({ msg: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// PUT endpoint to update a student's details
app.put("/admin/update", async (req, res) => {
    try {
        const { email, name, password } = req.body;
        
        const data = await fs.readFile('student.json', { encoding: 'utf-8' });
        let students = JSON.parse(data);

        const studentIndex = students.findIndex(student => student.email === email);
        
        if (studentIndex === -1) {
            return res.status(404).json({ msg: "Student not found" });
        }

        students[studentIndex] = { email, name, password };
        
        await fs.writeFile('student.json', JSON.stringify(students, null, 2));
        
        return res.json({ msg: "Student updated successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log("Express server is running on port: " + port);
});
