const Page = require('../models/Page');
const TextBlock = require('../models/components/TextBlock');
const Image = require('../models/components/Image');
const CTAButton = require('../models/components/CTAButton');

async function populatePageContent(page) {
    const contentPromises = page.content.map(async (item) => {
        switch (item.componentType) {
            case 'TextBlock':
                return TextBlock.findById(item.componentId);
            case 'Image':
                return Image.findById(item.componentId);
            case 'CTAButton':
                return CTAButton.findById(item.componentId);
            default:
                return null;
        }
    });
    const populatedContent = await Promise.all(contentPromises);
    // console.log(populatedContent);
    return populatedContent;
}

exports.createPage = async (req, res) => {
    try {
        const { title, metaDescription, slug } = req.body;
        const page = new Page({
            title,
            metaDescription,
            slug,
        });
        await page.save();
        res.status(201).json({ message: 'Page created successfully', page });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPage = async (req, res) => {
    try {
        console.log(req.params.slug);
        const page = await Page.findOne({ slug: "/" + req.params.slug }).lean();
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        let populatedContent = await populatePageContent(page);
        populatedContent = populatedContent.map((item, index) => ({
            ...item.toObject(),
            componentType: page.content[index].componentType
        }));

        console.log(populatedContent);
        page.content = populatedContent;
        console.log(page);
        res.status(200).json(page);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePage = async (req, res) => {
    try {
        const { title, metaDescription, slug } = req.body;
        console.log(slug);
        const page = await Page.findOneAndUpdate({ slug: req.params.slug }, {title, metaDescription, slug}, { new: true });
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        page.content = await populatePageContent(page);
        res.status(200).json({ message: 'Page updated successfully', page });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePage = async (req, res) => {
    try {
        const page = await Page.findOneAndDelete({ slug: req.params.slug });
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.status(200).json({ message: 'Page deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.listPages = async (req, res) => {
    try {
        const pages = await Page.find({});
        // // Optionally, populate content for each page in the list
        // for (let page of pages) {
        //     page.content = await populatePageContent(page);
        // }
        res.status(200).json(pages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.changeContentOrder = async (req, res) => {
    try {
        const { content } = req.body;
        const page = await Page.findOne({ slug: "/" + req.params.slug });
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        console.log(req.body);
        page.content = req.body;
        await page.save();
        res.status(200).json({ message: 'Page content order updated successfully', page });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}