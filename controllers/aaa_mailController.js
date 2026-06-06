const transporter = require("../config/mailer");

const submitForm = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      organization,
      service,
      requirements
    } = req.body;

    // Validation

    if (
      !fullName ||
      ! email ||
      !phone ||
      !organization ||
      !service ||
      !requirements
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Your company email

      subject: "New Inquiry",

      html: `
        <h2>New Inquiry Received</h2>

         <table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <td><strong>Full Name</strong></td>
            <td>${fullName}</td>
          </tr>

          <tr>
            <td><strong>Work Email</strong></td>
            <td>${email}</td>
          </tr>

          <tr>
            <td><strong>Phone Number</strong></td>
            <td>${phone}</td>
          </tr>

          <tr>
            <td><strong>Organization Name</strong></td>
            <td>${organization}</td>
          </tr>

          <tr>
            <td><strong>Service Interests</strong></td>
            <td>${service}</td>
          </tr>

          <tr>
            <td><strong>Requirements</strong></td>
            <td>${requirements}</td>
          </tr>
        </table>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully"
    });

  } catch (error) {
    console.error("Contact Form Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit form",
      error: error.message
    });
  }
};

module.exports = {
  submitForm
};