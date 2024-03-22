const { isValidObjectId } = require('mongoose');
const TextBlock = require('../../models/components/TextBlock');
const Page = require('../../models/Page');

// Create a Text Block and update the Page document
exports.createTextBlock = async (req, res) => {
  try {
    const { content, font, size, color, alignment, page } = req.body;

    if(!isValidObjectId(page)){
      return res.status(400).json({ message: 'Invalid Page ID' });
    }
    const currPage = await Page.findById(page);

    if (!currPage) {
      return res.status(404).json({ message: 'Page not found' });
    }

    const textBlock = new TextBlock({ content, font, size, color, alignment, page });
    await textBlock.save();

    await Page.findByIdAndUpdate(page, {
      $push: { content: { componentId: textBlock._id, componentType: 'TextBlock' } }
    });

    res.status(201).json({ message: 'Text Block created successfully', textBlock });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Text Block and update the Page document
exports.deleteTextBlock = async (req, res) => {
  try {
    const textBlock = await TextBlock.findById(req.params.id);
    if (!textBlock) {
      return res.status(404).json({ message: 'Text Block not found' });
    }

    // Remove the Text Block reference from the Page's content array
    await Page.findByIdAndUpdate(textBlock.page, {
      $pull: { content: { componentId: textBlock._id, componentType: 'TextBlock' } }
    });

    await textBlock.remove();

    res.status(200).json({ message: 'Text Block deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve a Text Block
exports.getTextBlock = async (req, res) => {
  try {
    const textBlock = await TextBlock.findById(req.params.id);
    if (!textBlock) {
      return res.status(404).json({ message: 'Text Block not found' });
    }
    res.status(200).json(textBlock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a Text Block
exports.updateTextBlock = async (req, res) => {
  try {
    const textBlock = await TextBlock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!textBlock) {
      return res.status(404).json({ message: 'Text Block not found' });
    }
    res.status(200).json({ message: 'Text Block updated successfully', textBlock });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List all Text Blocks for a Page
exports.listTextBlocks = async (req, res) => {
  try {
    const textBlocks = await TextBlock.find({ page: req.params.pageId });
    res.status(200).json(textBlocks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
