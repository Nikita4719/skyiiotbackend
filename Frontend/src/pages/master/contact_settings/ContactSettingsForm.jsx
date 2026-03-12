import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input
} from "@material-tailwind/react";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../configs/api";

export default function ContactSettingsForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [mapUrl, setMapUrl] = useState("");
    const [bgImage, setBgImage] = useState("");

    useEffect(() => {

        if (id) {

            axios.get(`${BASE_URL}/api/contact-settings/${id}`)
                .then(res => {
                    setMapUrl(res.data.map_url)
                })

        }

    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("map_url", mapUrl);
            if (bgImage) formData.append("bg_image", bgImage);

            await axios.put(`${BASE_URL}/api/contact-settings/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Updated Successfully");
            navigate("/master/contact-settings");
        } catch (error) {
            console.error(error);
            alert("Update failed!");
        }
    };

    return (

        <div className="mt-12 mb-8 px-6 flex justify-center">

            <Card className="w-full max-w-3xl">

                <CardHeader shadow={false} floated={false} className="border-b p-6">

                    <Typography variant="h5">
                        Edit Contact Settings
                    </Typography>

                </CardHeader>

                <CardBody>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <Input
                            label="Google Map URL"
                            value={mapUrl}
                            onChange={(e) => setMapUrl(e.target.value)}
                        />

                        <input
                            type="file"
                            onChange={(e) => setBgImage(e.target.files[0])}
                            className="border p-2 w-full"
                        />

                        <Button type="submit" fullWidth>
                            Update
                        </Button>

                    </form>

                </CardBody>

            </Card>

        </div>

    )

}