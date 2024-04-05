const EmailCampaign = require('../models/EmailCampaign');
const User = require('../models/User');
const sendEmail = require('../utils/emailSender');

exports.createCampaign = async (req, res) => {
    const { title, content, userEmails } = req.body;

    if (!title || !content || !userEmails) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const users = await User.find({
        'email': { $in: userEmails }
        });

        if (!users.length) {
        return res.status(404).json({ message: 'No users found with the provided emails' });
        }

        const foundEmails = users.map(user => user.email);

        const newCampaign = new EmailCampaign({
        title,
        content,
        recipientList: foundEmails,
        sent: false
        });

        await newCampaign.save();

        res.status(201).json({ message: 'Email campaign created successfully', campaign: newCampaign });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create email campaign', error: error.message });
    }
};
  
exports.sendCampaign = async (req, res) => {
    const campaignId = req.params.id;
  
    try {
      const campaign = await EmailCampaign.findById(campaignId);
  
      if (!campaign) {
        return res.status(404).json({ message: 'Email campaign not found' });
      }
  
      if (campaign.sent) {
        return res.status(400).json({ message: 'Email campaign has already been sent' });
      }
  
      const emailOptions = {
        from: 'saudagarsaim@gmail.com',
        bcc: campaign.recipientList,
        subject: campaign.title,
        html: campaign.content,
      };
  
      await sendEmail(emailOptions);
      
      campaign.sent = true;
      campaign.sentAt = new Date();
      await campaign.save();
  
      res.status(200).json({ message: 'Email campaign sent successfully' });
    } catch (error) {
      console.error('Failed to send email campaign:', error);
      res.status(500).json({ message: 'Failed to send email campaign', error: error.toString() });
    }
  };
  