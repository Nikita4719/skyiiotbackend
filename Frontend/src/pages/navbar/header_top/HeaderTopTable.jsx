import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import BASE_URL from "../../../configs/api";

export default function HeaderTop() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const res = await axios.get(
            `${BASE_URL}/api/header-top`
        );

        // API returns single object → convert to array
        setData(res.data ? [res.data] : []);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(
            `${BASE_URL}/api/header-top/${id}`
        );
        fetchData();
    };

    return (

        <div className="mt-12 mb-8 px-6">

            <Card>

                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="flex justify-between items-center p-6"
                >

                    <Typography variant="h6" color="white">
                        Header Top
                    </Typography>

                    <Button
                        size="sm"
                        color="white"
                        onClick={() =>
                            navigate("/dashboard/navbar/navbar-top/add")
                        }
                    >

                        Add

                    </Button>

                </CardHeader>

                <CardBody className="overflow-x-auto">

                    <table className="w-full border border-blue-gray-200 table-auto">

                        <thead className="bg-blue-gray-50">

                            <tr>

                                {[
                                    "Phone",
                                    "Email",
                                    "Facebook",
                                    "Twitter",
                                    "LinkedIn",
                                    "YouTube",
                                    "Action",
                                ].map((head) => (

                                    <th
                                        key={head}
                                        className="border border-blue-gray-200 px-4 py-3 text-left text-xs font-bold uppercase text-blue-gray-600"
                                    >

                                        {head}

                                    </th>

                                ))}

                            </tr>

                        </thead>

                        <tbody>

                            {data.map((item) => (

                                <tr
                                    key={item.id}
                                    className="hover:bg-blue-gray-50"
                                >

                                    {/* Phone */}

                                    <td className="border border-blue-gray-200 px-4 py-3 max-w-xs">

                                        <div className="line-clamp-1">

                                            {item.phone}

                                        </div>

                                    </td>

                                    {/* Email */}

                                    <td className="border border-blue-gray-200 px-4 py-3 max-w-xs">

                                        <div className="line-clamp-1">

                                            {item.email}

                                        </div>

                                    </td>

                                    {/* Facebook */}

                                    <td className="border border-blue-gray-200 px-4 py-3 max-w-xs">

                                        <div className="line-clamp-1 text-blue-500">

                                            {item.facebook_link}

                                        </div>

                                    </td>

                                    {/* Twitter */}

                                    <td className="border border-blue-gray-200 px-4 py-3 max-w-xs">

                                        <div className="line-clamp-1 text-blue-500">

                                            {item.twitter_link}

                                        </div>

                                    </td>

                                    {/* LinkedIn */}

                                    <td className="border border-blue-gray-200 px-4 py-3 max-w-xs">

                                        <div className="line-clamp-1 text-blue-500">

                                            {item.linkedin_link}

                                        </div>

                                    </td>

                                    {/* YouTube */}

                                    <td className="border border-blue-gray-200 px-4 py-3 max-w-xs">

                                        <div className="line-clamp-1 text-blue-500">

                                            {item.youtube_link}

                                        </div>

                                    </td>

                                    {/* Actions */}

                                    <td className="border border-blue-gray-200 px-4 py-3">

                                        <div className="flex gap-2">

                                            <Button
                                                size="sm"
                                                variant="outlined"
                                                onClick={() =>
                                                    navigate(
                                                        `/dashboard/navbar/navbar-top/edit/${item.id}`
                                                    )
                                                }
                                            >

                                                Edit

                                            </Button>

                                            <Button
                                                size="sm"
                                                color="red"
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                            >

                                                Delete

                                            </Button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </CardBody>

            </Card>

        </div>

    );
}