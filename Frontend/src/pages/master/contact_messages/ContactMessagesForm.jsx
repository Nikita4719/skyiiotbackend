import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input,
    Textarea
} from "@material-tailwind/react";

import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../configs/api";

export default function ContactMessageForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });

    useEffect(() => {

        if (id) {

            axios
                .get(`${BASE_URL}/api/contact-messages/${id}`)
                .then((res) => {

                    const data = res.data;

                    setFormData({
                        firstName: data.first_name || "",
                        lastName: data.last_name || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        message: data.message || "",
                    });

                })
                .catch(() => {
                    alert("Message not found");
                    navigate("/dashboard/master/contact-messages");
                });

        }

    }, [id]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const payload = {
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            message: formData.message.trim(),
        };

        if (!payload.first_name || !payload.last_name || !payload.email || !payload.message) {
            alert("Please fill all required fields");
            return;
        }

        try {

            setLoading(true);

            if (id) {

                await axios.put(
                    `${BASE_URL}/api/contact-messages/${id}`,
                    payload
                );

                alert("Message Updated Successfully");

            } else {

                await axios.post(
                    `${BASE_URL}/api/contact-messages`,
                    payload
                );

                alert("Message Saved Successfully");

            }

            navigate("/dashboard/master/contact-messages");

        } catch (error) {

            console.error(error);
            alert("Something went wrong");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="mt-12 mb-8 px-6 flex justify-center">

            <Card className="w-full max-w-5xl shadow-lg">

                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none border-b p-6"
                >

                    <Typography variant="h4">
                        {id ? "Edit Contact Message" : "Add Contact Message"}
                    </Typography>

                    <Typography variant="small" className="text-gray-600 mt-1">
                        Manage messages received from website contact form
                    </Typography>

                </CardHeader>

                <CardBody className="p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >

                        <Input
                            label="First Name"
                            icon={<UserIcon className="h-5 w-5" />}
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            size="lg"
                        />

                        <Input
                            label="Last Name"
                            icon={<UserIcon className="h-5 w-5" />}
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            size="lg"
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            icon={<EnvelopeIcon className="h-5 w-5" />}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            size="lg"
                            required
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        />

                        <Input
                            label="Phone Number"
                            icon={<PhoneIcon className="h-5 w-5" />}
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            size="lg"
                            required
                            pattern="[0-9]{10}"
                            maxLength={10}
                        />

                        <div className="md:col-span-2">

                            <Textarea
                                label="Message"
                                icon={<ChatBubbleBottomCenterTextIcon className="h-5 w-5" />}
                                rows={6}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="md:col-span-2 flex justify-end gap-4 pt-6 border-t">

                            {/* <Button
                                variant="outlined"
                                color="blue-gray"
                                onClick={() =>
                                    navigate("/dashboard/master/contact-messages")
                                }
                            >
                                Cancel
                            </Button>

                            <Button
                                color="blue"
                                type="submit"
                                disabled={loading}
                            >

                                {loading ? "Saving..." : "Save Message"}

                            </Button> */}
                            <Button type="submit" fullWidth>Save</Button>
                        </div>

                    </form>

                </CardBody>

            </Card>

        </div>

    );

}