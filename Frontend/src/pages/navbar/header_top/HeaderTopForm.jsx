import {
    Card,
    Typography,
    Input,
    Button
} from "@material-tailwind/react";

import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../../configs/api";
import { useNavigate } from "react-router-dom";
export default function HeaderTopForm() {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        phone: "",
        email: "",
        facebook_link: "",
        twitter_link: "",
        linkedin_link: "",
        youtube_link: ""
    })

    useEffect(() => {
        axios.get(`${BASE_URL}/api/header-top`)
            .then(res => {
                if (res.data) {
                    setForm(res.data)
                }
            })
    }, [])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post(
            `${BASE_URL}/api/header-top`,
            form
        )

        navigate("../navbar/navbar-top");
    }

    return (

        <div className="mt-12 mb-8 px-6">

            <Card className="p-8">

                <form onSubmit={handleSubmit} className="space-y-6">

                    <Typography variant="h6">
                        Header Top Settings
                    </Typography>

                    <Input
                        label="Phone"
                        name="phone"
                        value={form.phone || ""}
                        onChange={handleChange}
                    />

                    <Input
                        label="Email"
                        name="email"
                        value={form.email || ""}
                        onChange={handleChange}
                    />

                    <Input
                        label="Facebook Link"
                        name="facebook_link"
                        value={form.facebook_link || ""}
                        onChange={handleChange}
                    />

                    <Input
                        label="Twitter Link"
                        name="twitter_link"
                        value={form.twitter_link || ""}
                        onChange={handleChange}
                    />

                    <Input
                        label="LinkedIn Link"
                        name="linkedin_link"
                        value={form.linkedin_link || ""}
                        onChange={handleChange}
                    />

                    <Input
                        label="YouTube Link"
                        name="youtube_link"
                        value={form.youtube_link || ""}
                        onChange={handleChange}
                    />

                    <Button type="submit" fullWidth>
                        Save
                    </Button>

                </form>
            </Card>
        </div>

    )
}