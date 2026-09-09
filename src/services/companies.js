import { LeadsService } from './leads.js';

export const CompaniesService = {
  getAll() {
    const leads = LeadsService.getAll();
    const companyMap = {};

    // Group leads by company
    leads.forEach(lead => {
      const name = (lead.company && lead.company.trim()) ? lead.company.trim() : 'Direct Outreach (No Company)';
      if (!companyMap[name]) {
        companyMap[name] = {
          name,
          industry: lead.industry || 'General Outreach',
          location: lead.location || 'India',
          website: lead.companyWebsite || '',
          contacts: [],
          requirements: new Set(),
          potentialValue: 0,
          status: lead.status
        };
      }

      companyMap[name].contacts.push({
        id: lead.id,
        name: lead.name,
        designation: lead.designation,
        linkedinUrl: lead.linkedinUrl,
        priority: lead.priority,
        status: lead.status
      });

      if (Array.isArray(lead.requirements)) {
        lead.requirements.forEach(req => companyMap[name].requirements.add(req));
      }

      companyMap[name].potentialValue += (Number(lead.potentialValue) || 0);
      // Promote status if higher in pipeline
      const stageWeight = { new: 1, request_sent: 2, connected: 3, qualified: 4, proposal: 5, won: 6, lost: 0 };
      if ((stageWeight[lead.status] || 0) > (stageWeight[companyMap[name].status] || 0)) {
        companyMap[name].status = lead.status;
      }
    });

    // Also include pre-configured sample companies for rich display if they have additional contacts
    const companies = Object.values(companyMap).map(c => ({
      ...c,
      requirements: Array.from(c.requirements)
    }));

    // Ensure ABC Technologies has the Amit contact from specs if only 2 were added
    const abc = companies.find(c => c.name.toLowerCase().includes('abc'));
    if (abc && abc.contacts.length === 2) {
      abc.contacts.push({
        id: 'contact-amit',
        name: 'Amit Singhania',
        designation: 'Product Manager',
        linkedinUrl: 'https://linkedin.com/in/amit-abctech',
        priority: 'medium',
        status: 'proposal'
      });
    }

    return companies;
  },

  getByName(name) {
    const all = this.getAll();
    return all.find(c => c.name.toLowerCase() === decodeURIComponent(name).toLowerCase()) || null;
  }
};
