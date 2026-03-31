import {
    Card,
    Typography,
    Input,
    Button
} from "@material-tailwind/react"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import BASE_URL from "../../../configs/api"
import Editor from "@/pages/editor/editor";

export default function NavbarMenuForm() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [name, setName] = useState("")
    const [link, setLink] = useState("")
    const [order, setOrder] = useState("")
    const [isButton, setIsButton] = useState(false)
    const [description, setDescription] = useState("")

    useEffect(() => {

        if (id) {

            axios.get(`${BASE_URL}/api/navbar-menu/${id}`)
                .then(res => {

                    setName(res.data.name)
                    setLink(res.data.link)
                    setOrder(res.data.order_no)
                    setIsButton(res.data.is_button)
                    setDescription(res.data.description || "")

                })

        }

    }, [id])

    const handleEditorChange = (field, value) => {
        if (field === "title") setTitle(value);
    };


    const handleSubmit = async (e) => {

        e.preventDefault()

        const data = {
            name,
            link,
            order_no: order,
            is_button: isButton,
            description
        }

        if (id) {

            await axios.put(
                `${BASE_URL}/api/navbar-menu/${id}`,
                data
            )

        } else {

            await axios.post(
                `${BASE_URL}/api/navbar-menu`,
                data
            )

        }

        navigate("/dashboard/navbar/navbar-menu")

    }

    return (

        <div className="mt-12 mb-8 px-6">

            <Card className="p-8">

                <form onSubmit={handleSubmit} className="space-y-6">

                    <Typography variant="h6">
                        Navbar Menu
                    </Typography>

                    <Input
                        label="Menu Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <Input
                        label="Menu Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                    />

                    <Input
                        label="Menu Order"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                    />

                    <label className="flex gap-2">

                        <input
                            type="checkbox"
                            checked={isButton}
                            onChange={(e) => setIsButton(e.target.checked)}
                        />

                        Is Button

                    </label>

                    <div>

                        <Typography>
                            Menu Description
                        </Typography>

                        <Editor
                            value={description}
                            onChange={(val) => handleEditorChange("description", val)}
                            height={300}
                        />

                    </div>

                    <Button type="submit" fullWidth>

                        {id ? "Update" : "Save"}

                    </Button>

                </form>
            </Card>
        </div>

    )

}