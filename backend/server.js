const express = require("express");
const cors = require("cors");
require("dotenv").config();

const path = require("path");
const authRoutes = require("./routes/authRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const aboutUsEnterpriseRoutes = require("./routes/aboutUsEnterpriseRoutes");
const aboutUsBenefitsRoutes = require("./routes/aboutUsBenefitsRoutes")
const slidesRoutes = require("./routes/slidesRoutes");
const whatSectionRoutes = require("./routes/whatSectionRoutes");
const imageButton = require("./routes/imageButton")
const embeddedRoutes = require("./routes/embeddedRoutes");
const networkSectionRoutes = require("./routes/networkSectionRoutes");
const cloudSectionRoutes = require("./routes/cloudSectionRoutes");
const managementSectionRoutes = require("./routes/managementSectionRoutes");
const supportedContentRoutes = require("./routes/supportedContentRoutes");
const offerRoutes = require("./routes/offerRoutes");
const everywhereSlideRoutes = require("./routes/everywhereSlideRoutes");
const ourTeamRoutes = require("./routes/ourTeamRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const smarterRoutes = require("./routes/smarterRoutes");
const aiPoweredRoutes = require("./routes/aiPoweredRoutes");
const faqsRoutes = require("./routes/faqsRoutes");
const cmsFaqRoutes = require("./routes/cmsFaqRoutes");
const solutionCatRoutes = require("./routes/solutionCatRoutes");
const solutionSubCatRoutes = require("./routes/solutionSubCatRoutes");
const solutionImageRoutes = require("./routes/solutionImageRoutes");
const contactMessagesRoutes = require("./routes/contactMessagesRoutes");
const systemArchitectureRoutes = require("./routes/systemArchitectureRoutes");
const footerRoutes = require("./routes/footerRoutes");
const contactSettingsRoutes = require("./routes/contactSettingsRoutes");
const app = express();

app.use(cors());
app.use(express.json());
// app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/footer", footerRoutes);
app.use("/api", contactSettingsRoutes);
app.use("/qrcodes", express.static(path.join(__dirname, "uploads/qrcodes")));
app.use("/api/system-architecture",systemArchitectureRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/aboutusenterprise", aboutUsEnterpriseRoutes);
app.use("/api/aboutusbenefits", aboutUsBenefitsRoutes);
app.use("/api/solution-cat", solutionCatRoutes);
app.use("/api/solution-sub-cat", solutionSubCatRoutes);
app.use("/api/what-section" , whatSectionRoutes);
app.use("/api/slides" , slidesRoutes);
app.use("/api/embeddedsection" , embeddedRoutes);
app.use("/api/networksection" , networkSectionRoutes);
app.use("/api/cloudsection" , cloudSectionRoutes);
app.use("/api/managementsection" , managementSectionRoutes);
app.use("/api/image" , imageButton );
app.use("/api/supported-content" , supportedContentRoutes);
app.use("/api/offer" , offerRoutes);
app.use("/api/everywhere-slide" , everywhereSlideRoutes);
app.use("/api/our-team" , ourTeamRoutes);
app.use("/api/testimonials" , testimonialRoutes);
app.use("/api/smarter" , smarterRoutes);
app.use("/api/ai-powered" , aiPoweredRoutes);
app.use("/api/faqs" , faqsRoutes);
app.use("/api/cms-faqs" , cmsFaqRoutes);
app.use("/api/solution-images" , solutionImageRoutes);
// app.use("/api/faqs" , faqsRoutes);
// app.use("/api/faqs" , faqsRoutes);
app.use("/api/contact-messages", contactMessagesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
