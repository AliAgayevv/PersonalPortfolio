const Service = require("../models/Service");

// [GET] /api/services/:serviceName
exports.getServiceByName = async (req, res) => {
  const { serviceName } = req.params;
  const language = req.headers["accept-language"] || "az";

  try {
    const service = await Service.findOne({ serviceName });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const serviceData = {
      _id: service._id,
      serviceName: service.serviceName,
      title: service.title[language] || "",
      description: service.description[language] || "",
      techStack: service.techStack,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    };

    res.status(200).json(serviceData);
  } catch (err) {
    console.error("Error fetching service by name:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// [GET] /api/services
exports.getAllServices = async (req, res) => {
  const language = req.headers["accept-language"] || "az";

  try {
    const services = await Service.find();
    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    const servicesData = services.map((service) => ({
      _id: service._id,
      serviceName: service.serviceName,
      title: service.title[language] || "",
      description: service.description[language] || "",
      techStack: service.techStack,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    }));

    res.status(200).json(servicesData);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// [POST] /api/services
exports.createService = async (req, res) => {
  try {
    const newService = new Service({
      ...req.body,
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [PUT] /api/services/:serviceName
exports.updateService = async (req, res) => {
  const { serviceName } = req.params;

  try {
    const updatedService = await Service.findOneAndUpdate(
      { serviceName },
      {
        ...req.body,
        techStack: req.body.techStack.map((tech) => ({ name: tech })),
      },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(updatedService);
  } catch (err) {
    console.error("Error updating service:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// [DELETE] /api/services/:serviceName
exports.deleteService = async (req, res) => {
  const { serviceName } = req.params;

  try {
    const deletedService = await Service.findOneAndDelete({ serviceName });
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// [PATCH] /api/services/:serviceName
exports.patchService = async (req, res) => {
  const { serviceName } = req.params;

  try {
    const updatedService = await Service.findOneAndUpdate(
      { serviceName },
      { $set: req.body },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(updatedService);
  } catch (err) {
    console.error("Error patching service:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
