const Contact = require("../models/Contact");
const deleteOldContacts = async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await Contact.deleteMany({
      sentedTime: { $lt: thirtyDaysAgo },
    });
    console.log(`Deleted ${result.deletedCount} old contact forms.`);
  } catch (error) {
    console.error("Error deleting old contacts:", error);
  }
};
exports.getContactInfo = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    res.status(500).json({ error: "Failed to fetch contact info." });
  }
};
exports.sendContactForm = async (req, res) => {
  const { name, email, message, phoneNumber } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }
  try {
    const sentedTime = new Date();
    const newContact = new Contact({
      name,
      email,
      message,
      phoneNumber,
      createdAt: sentedTime,
    });

    await newContact.save();

    await deleteOldContacts();

    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=
    New contact form submission:\n\n\n 
    Name: ${name} 
     Email: ${email} Phone Number: ${phoneNumber}  Message: ${message}`;

    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error sending contact form:", error);
    return res.status(500).json({ error: "Failed to send contact form." });
  }
};
exports.getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error fetching contact by ID:", error);
    res.status(500).json({ error: "Failed to fetch contact." });
  }
};
exports.deleteContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    console.error("Error deleting contact by ID:", error);
    res.status(500).json({ error: "Failed to delete contact." });
  }
};
