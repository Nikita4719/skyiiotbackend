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
    const [bgImage, setBgImage] = useState(null); // file
    const [preview, setPreview] = useState("");   // image preview

    const isEdit = !!id;

    useEffect(() => {
        if (!isEdit) return;

        axios.get(`${BASE_URL}/api/contact-settings/${id}`)
            .then(res => {
                setMapUrl(res.data.map_url || "");

                // ✅ SET PREVIEW IMAGE FROM API
                if (res.data.bg_image) {
                    setPreview(`${BASE_URL}/uploads/${res.data.bg_image}`);
                }
            })
            .catch(err => console.error(err));

    }, [id]);

    // ✅ HANDLE FILE CHANGE + PREVIEW
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setBgImage(file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("map_url", mapUrl);

            if (bgImage) {
                formData.append("bg_image", bgImage);
            }

            if (!isEdit) {
                await axios.post(`${BASE_URL}/api/contact-settings`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.put(`${BASE_URL}/api/contact-settings/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            navigate("/dashboard/master/contact-settings");

        } catch (error) {
            console.error(error);
            alert("Operation failed!");
        }
    };

    return (
        <div className="mt-12 mb-8 px-6 flex justify-center">
            <Card className="w-full max-w-3xl">

                <CardHeader className="border-b p-6" color="gray">
                    <Typography variant="h5">
                        {isEdit ? "Edit Contact Settings" : "Add Contact Settings"}
                    </Typography>
                </CardHeader>

                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <Input
                            label="Google Map URL"
                            value={mapUrl}
                            onChange={(e) => setMapUrl(e.target.value)}
                        />

                        {/* FILE INPUT */}
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="border p-2 w-full"
                        />

                        {/* ✅ IMAGE PREVIEW */}
                        {preview && (
                            <div>
                                <p className="text-sm mb-2">Preview:</p>
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="h-32 rounded object-cover border"
                                />
                            </div>
                        )}

                        <Button type="submit" fullWidth>
                            {isEdit ? "Update" : "Create"}
                        </Button>

                    </form>
                </CardBody>

            </Card>
        </div>
    );
}
