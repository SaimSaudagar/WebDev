const Image = require('../../models/components/CTAButton');
const Page = require('../../models/Page');

// Create a CTA Button and update the Page document
exports.createCTAButton = async (req, res) => {
  try {
    const ctaButton = new CTAButton(req.body);
    await ctaButton.save();

    await Page.findByIdAndUpdate(req.body.page, {
      $push: { content: { componentId: ctaButton._id, componentType: 'CTAButton' } }
    });

    res.status(201).json({ message: 'CTA Button created successfully', ctaButton });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCTAButton = async (req, res) => {
  try {
      const ctaButton = await CTAButton.findById(req.params.id);
      if (!ctaButton) {
          return res.status(404).json({ message: 'CTA Button not found' });
      }
      res.status(200).json(ctaButton);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

exports.updateCTAButton = async (req, res) => {
  try {
      const ctaButton = await CTAButton.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!ctaButton) {
          return res.status(404).json({ message: 'CTA Button not found' });
      }
      res.status(200).json({ message: 'CTA Button updated successfully', ctaButton });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

exports.deleteCTAButton = async (req, res) => {
  try {
      const ctaButton = await CTAButton.findById(req.params.id);
      if (!ctaButton) {
          return res.status(404).json({ message: 'CTA Button not found' });
      }

      await Page.findByIdAndUpdate(ctaButton.page, {
          $pull: { content: { componentId: ctaButton._id, componentType: 'CTAButton' } }
      });

      await ctaButton.remove();
      res.status(200).json({ message: 'CTA Button deleted successfully' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};