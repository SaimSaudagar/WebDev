const { isValidObjectId } = require('mongoose');
const TextBlock = require('../../models/components/TextBlock');
const Page = require('../../models/Page');

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

exports.deleteTextBlock = async (req, res) => {
  try {
    const textBlock = await TextBlock.findById(req.params.id);
    if (!textBlock) {
      return res.status(404).json({ message: 'Text Block not found' });
    }

    await Page.findByIdAndUpdate(textBlock.page, {
      $pull: { content: { componentId: textBlock._id, componentType: 'TextBlock' } }
    });

    await textBlock.remove();

    res.status(200).json({ message: 'Text Block deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

exports.updateTextBlock = async (req, res) => {
  try {
    const { content, font, size, color, alignment } = req.body;

    const textBlock = await TextBlock.findByIdAndUpdate(req.params.id, {content, font, size, color, alignment}, { new: true });
    if (!textBlock) {
      return res.status(404).json({ message: 'Text Block not found' });
    }
    res.status(200).json({ message: 'Text Block updated successfully', textBlock });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listTextBlocks = async (req, res) => {
  try {
    const textBlocks = await TextBlock.find({ page: req.params.pageId });
    res.status(200).json(textBlocks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
