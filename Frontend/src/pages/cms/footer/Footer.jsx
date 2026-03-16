import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../../configs/api";

export default function Footer() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/footer`);
                console.log(res);
                if (res.data) setData([res.data]); // wrap in array
            } catch (err) {
                console.error("Error fetching footer:", err);
            }
        };
        fetchFooter();
    }, []);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete the footer?")) return;
        try {
            await axios.delete(`${BASE_URL}/api/footer`);
            alert("Footer deleted successfully!");
            setData([]);
        } catch (err) {
            console.error("Error deleting footer:", err);
        }
    };

    const handleLinkChange = (footerId, index, newLink) => {
        const updatedData = data.map((item) => {
            if (item.id === footerId) {
                const newLinks = [...item.links];
                newLinks[index].link = newLink;
                return { ...item, links: newLinks };
            }
            return item;
        });
        setData(updatedData);
    };


    return (
        <div className="mt-12 mb-8 flex flex-col gap-12 px-6">
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6 flex justify-between items-center"
                >
                    <Typography variant="h6" color="white">
                        Footer Section
                    </Typography>
                    <Button
                        color="white"
                        size="sm"
                        onClick={() => navigate("/dashboard/cms/footer/add")}
                    >
                        Add
                    </Button>
                </CardHeader>

                <CardBody className="overflow-x-auto">
                    <table className="w-full min-w-[1300px] table-auto">
                        <thead>
                            <tr>
                                {[
                                    "Logo",
                                    "Title",
                                    "Content",
                                    "Email",
                                    "Phone",
                                    "Address",
                                    "QR Code 1",
                                    "QR Code 2",
                                    "QR Code 3",
                                    "QR Code 4",
                                    "Links",
                                    "Action",
                                ].map((head) => (
                                    <th key={head} className="border-b py-3 px-5 text-left">
                                        <Typography
                                            variant="small"
                                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item) => {
                                const qrCodes =
                                    item.qr_code && item.qr_code !== "null"
                                        ? JSON.parse(item.qr_code)
                                        : [];

                                return (
                                    <tr key={item.id}>
                                        
                                            <td className="py-3 px-5 border-b">
                                                {item.logo ? (
                                                    <img
                                                        src={`${BASE_URL}/uploads/qrcodes/${item.logo}`}
                                                        alt="logo"
                                                        className="h-12 w-12 object-contain rounded"
                                                    />
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                            {/* {item.logo} */}
                                        
                                        {/* Title */}
                                        <td className="py-3 px-5 border-b">
                                            {item.title || "-"}
                                        </td>

                                        {/* Content */}
                                        <td className="py-3 px-5 border-b">
                                            {item.content || "-"}
                                        </td>

                                        {/* Email */}
                                        <td className="py-3 px-5 border-b">
                                            {item.contact_email || "-"}
                                        </td>

                                        {/* Phone */}
                                        <td className="py-3 px-5 border-b">
                                            {item.contact_phone || "-"}
                                        </td>

                                        {/* Address */}
                                        <td className="py-3 px-5 border-b">
                                            {item.address || "-"}
                                        </td>

                                        {/* QR Codes */}
                                        {[0, 1, 2, 3].map((i) => (
                                            <td key={i} className="py-3 px-5 border-b">
                                                {qrCodes[i] ? (
                                                    <img
                                                        // src={
                                                        //     qrCodes[i].startsWith("http")
                                                        //         ? qrCodes[i]
                                                        //         : `http://localhost:5000/uploads/qrcodes/${qrCodes[i]}`
                                                        // }
                                                        src={
                                                            qrCodes[i].startsWith("http")
                                                                ? qrCodes[i]
                                                                : `${BASE_URL}/uploads/qrcodes/${qrCodes[i]}`
                                                        }
                                                        alt={`QR ${i + 1}`}
                                                        className="h-12 w-12 object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                        ))}

                                        {/* Links Column */}
                                        <td className="py-3 px-5 border-b">
                                            {item.links && item.links.length > 0 ? (
                                                <ul className="text-[11px]">
                                                    {item.links.map((linkObj, index) => (
                                                        <li key={index}>
                                                            <input
                                                                type="text"
                                                                value={linkObj.link}
                                                                onChange={(e) => handleLinkChange(item.id, index, e.target.value)}
                                                                className="w-full border px-1 rounded text-[11px]"
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                "-"
                                            )}
                                        </td>


                                        {/* Action */}
                                        <td className="py-3 px-5 border-b flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outlined"
                                                onClick={() =>
                                                    navigate(`/dashboard/cms/footer/edit/${item.id}`)
                                                }
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                size="sm"
                                                color="red"
                                                onClick={() => handleDelete()}
                                            >
                                                Delete
                                            </Button>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}