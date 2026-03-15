const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const slugify = (text) =>
    text
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/\s+/g, "-");

exports.getFooter = async (req, res) => {
    try {
        const footer = await prisma.footer.findFirst();
        if (!footer) return res.json({});

        // Generate links from content if links field is null
        let links = footer.links;
        if (!links && footer.content) {
            links = footer.content.split(/\r?\n/).map((item) => ({
                name: item.trim(),
                link: `/solutions/${slugify(item.trim())}`,
            }));
        }

        res.json({ ...footer, links });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "DB error", error: err.message });
    }
};

exports.updateFooter = async (req, res) => {
    try {
        const title = req.body.title || "";
        const content = req.body.content || "";
        const contact_email = req.body.contact_email || "";
        const contact_phone = req.body.contact_phone || "";
        const address = req.body.address || "";

        // QR codes
        const uploadedQr = req.files?.map((file) => file.filename) || [];
        const existingQr = Array.isArray(req.body.existing_qr)
            ? req.body.existing_qr
            : req.body.existing_qr
                ? [req.body.existing_qr]
                : [];
        const finalQr = [];
        for (let i = 0; i < 4; i++) finalQr[i] = uploadedQr[i] || existingQr[i] || "";
        const qr_code_json = JSON.stringify(finalQr);

        // Links
        let links = req.body.links ? JSON.parse(req.body.links) : null;

        if (!links && content) {
            // Generate ID-based links for frontend
            const items = content.split(/\r?\n/);
            links = items.map((item, index) => ({
                name: item.trim(),
                link: `/transform-monitor/${index + 1}`, // ✅ ID-based route
            }));
        }

        // Update or create footer row
        let footer = await prisma.footer.findFirst();
        if (footer) {
            footer = await prisma.footer.update({
                where: { id: footer.id },
                data: { title, content, contact_email, contact_phone, address, qr_code: qr_code_json, links },
            });
        } else {
            footer = await prisma.footer.create({
                data: { title, content, contact_email, contact_phone, address, qr_code: qr_code_json, links },
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