import {
    Card,
    Typography,
    Input,
    Button
} from "@material-tailwind/react"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

import BASE_URL from "../../../configs/api"

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

                        <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onChange={(event, editor) => {

                                const data = editor.getData()
                                setDescription(data)

                            }}
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