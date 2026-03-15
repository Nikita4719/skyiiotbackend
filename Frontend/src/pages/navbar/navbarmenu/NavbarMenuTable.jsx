import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button
} from "@material-tailwind/react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"
import BASE_URL from "../../../configs/api"

export default function NavbarMenuTable() {

    const navigate = useNavigate()

    const [data, setData] = useState([])

    const fetchData = async () => {

        const res = await axios.get(
            `${BASE_URL}/api/navbar-menu`
        )

        setData(res.data)

    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = async (id) => {

        await axios.delete(
            `${BASE_URL}/api/navbar-menu/${id}`
        )

        fetchData()

    }

    return (

        <div className="mt-12 mb-8 px-6">

            <Card>

                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="flex justify-between items-center p-6"
                >

                    <Typography variant="h6" color="white">
                        Navbar Menu
                    </Typography>

                    <Button
                        size="sm"
                        color="white"
                        onClick={() => navigate("/dashboard/navbar/navbar-menu/add")}
                    >

                        Add Menu

                    </Button>

                </CardHeader>

                <CardBody>

                    <table className="w-full border table-auto text-sm">

                        <thead className="border-blue-gray-200 bg-blue-gray-50">

                            <tr>

                                <th className="border border-blue-gray-200 px-3 py-2">Name</th>
                                <th className="border border-blue-gray-200 px-3 py-2">Link</th>
                                <th className="border border-blue-gray-200 px-3 py-2">Order</th>
                                <th className="border border-blue-gray-200  px-3 py-2">Type</th>
                                <th className="border border-blue-gray-200 px-3 py-2">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {data.map(item => (
                                <tr key={item.id}>

                                    <td className="border border-blue-gray-200 px-3 py-2">
                                        {item.name}
                                    </td>

                                    <td className="border border-blue-gray-200 px-3 py-2">
                                        {item.link}
                                    </td>

                                    <td className="border border-blue-gray-200 px-3 py-2">
                                        {item.order_no}
                                    </td>

                                    <td className="border border-blue-gray-200  px-3 py-2">
                                        {item.is_button ? "Button" : "Menu"}
                                    </td>

                                    <td className="border border-blue-gray-200 px-3 py-2">

                                        <div className="flex gap-2">

                                            <Button
                                                size="sm"
                                                variant="outlined"
                                                onClick={() => navigate(`/dashboard/navbar/navbar-menu/edit/${item.id}`)}
                                            >

                                                Edit

                                            </Button>

                                            <Button
                                                size="sm"
                                                color="red"
                                                onClick={() => handleDelete(item.id)}
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

    )

}

