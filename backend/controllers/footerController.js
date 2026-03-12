const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getFooter = async (req, res) => {
    try {
        const footer = await prisma.footer.findFirst();
        res.json(footer || {});
    } catch (err) {
        res.status(500).json({ message: "DB error", error: err });
    }
};

exports.updateFooter = async (req, res) => {
    try {
        // Get text fields safely
        const title = req.body.title || "";
        const content = req.body.content || "";
        const contact_email = req.body.contact_email || "";
        const contact_phone = req.body.contact_phone || "";
        const address = req.body.address || "";

        // Uploaded QR codes
        const uploadedQr = req.files?.map((file) => file.filename) || [];

        // Existing QR codes from frontend
        const existingQr = Array.isArray(req.body.existing_qr)
            ? req.body.existing_qr
            : req.body.existing_qr
                ? [req.body.existing_qr]
                : [];

        const finalQr = [];
        for (let i = 0; i < 4; i++) {
            finalQr[i] = uploadedQr[i] || existingQr[i] || "";
        }

        // Convert to JSON string safely
        const qr_code_json = JSON.stringify(finalQr);

        // Update or create footer row
        let footer = await prisma.footer.findFirst();
        if (footer) {
            footer = await prisma.footer.update({
                where: { id: footer.id },
                data: {
                    title,
                    content,
                    contact_email,
                    contact_phone,
                    address,
                    qr_code: qr_code_json,
                },
            });
        } else {
            footer = await prisma.footer.create({
                data: {
                    title,
                    content,
                    contact_email,
                    contact_phone,
                    address,
                    qr_code: qr_code_json,
                },
            });
        }

        res.json({ message: "Footer saved successfully", footer });
    } catch (err) {
        console.error("Error updating footer:", err);
        res.status(500).json({ message: "DB error", error: err.message });
    }
};

exports.deleteFooter = async (req, res) => {
    try {
        const footer = await prisma.footer.findFirst();
        if (!footer) {
            return res.status(404).json({ message: "No footer found to delete" });
        }

        await prisma.footer.delete({ where: { id: footer.id } });
        res.json({ message: "Footer deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "DB error", error: err });
    }
};