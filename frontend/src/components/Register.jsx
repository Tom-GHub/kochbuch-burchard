import { Form, Button } from "react-bootstrap";
import { useState } from "react";



function Register() {

    const [formData, setFormData] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordCheck: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData( (prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Formular-Daten: ", formData);

        try {
            const res = await fetch("http://fi.mshome.net:3001/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(formData),
            });
        

        if(res.ok) {
            alert("Sie haben sich erfolgreich Registriert.");
        } else {
            const errorData = await res.json();
            alert("Fehler bei der Registrierung.");
        }
        } catch(err) {
            console.error("Fehler: ", err);
        }
    };


    return(
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
            <Form.Label>Benutzername</Form.Label>
            <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Benutzename eingeben"
                required
            />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Vorname</Form.Label>
                <Form.Control
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Vorname eingeben"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Nachname</Form.Label>
                <Form.Control
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Nachname eingeben"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-Mail eingeben"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Passwort</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Passwort eingeben"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Passwort bestätigen</Form.Label>
                <Form.Control
                    type="password"
                    name="passwordCheck"
                    value={formData.passwordCheck}
                    onChange={handleChange}
                    placeholder="Passwort erneut eingeben"
                    required
                />
</Form.Group>

        <Button type="submit" variant="primary">Registrieren</Button>

        </Form>
        </>
    );
}

export default Register