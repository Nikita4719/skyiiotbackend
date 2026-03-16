import {
    Card,
    Typography,
    Input,
    Button
} from "@material-tailwind/react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../configs/api";

export default function NavbarLogoForm() {

    const navigate = useNavigate();

    const [logo, setLogo] = useState(null)
    const [preview, setPreview] = useState(null)

    const [logo_text, setLogoText] = useState("")
    const [logo_tagline, setLogoTagline] = useState("")

    useEffect(() => {

        axios.get(`${BASE_URL}/api/navbar-logo`)
            .then(res => {

                if (res.data) {

                    setLogoText(res.data.logo_text || "")
                    setLogoTagline(res.data.logo_tagline || "")

                    if (res.data.logo) {
                        setPreview(`${BASE_URL}/${res.data.logo}`)
                    }

                }

            })

    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()

        const formData = new FormData()

        formData.append("logo", logo)
        formData.append("logo_text", logo_text)
        formData.append("logo_tagline", logo_tagline)

        await axios.post(
            `${BASE_URL}/api/navbar-logo`,
            formData
        )

        navigate("../navbar/navbar-logo");

    }

    return (

        <div className="mt-12 mb-8 px-6">

            <Card className="p-8">

                <form onSubmit={handleSubmit} className="space-y-6">

                    <Typography variant="h6">
                        Navbar Logo
                    </Typography>

                    <Input
                        label="Logo Title"
                        value={logo_text}
                        onChange={(e) => setLogoText(e.target.value)}
                    />

                    <Input
                        label="Logo Tagline"
                        value={logo_tagline}
                        onChange={(e) => setLogoTagline(e.target.value)}
                    />

                    <div>

                        <Typography>Logo Image</Typography>

                        <input
                            type="file"
                            onChange={(e) => setLogo(e.target.files[0])}
                        />

                        {preview && (

                            <img
                                src={preview}
                                className="h-20 mt-3"
                            />

                        )}

                    </div>

                    <Button type="submit" fullWidth>
                        Save
                    </Button>

                </form>
            </Card>
        </div>

    )
}