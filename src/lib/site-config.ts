/**
 * SGF site configuration — EDIT PLACEHOLDERS HERE.
 * Phone, email, social links, donation link, stats, bank/QR details all live here
 * so they are easy to find and update without touching page code.
 */

export const siteConfig = {
  name: "Special Guys Foundation",
  acronym: "SGF",
  tagline: "Sharing Hands, Saving Lives",
  heroLine: "Together, We Save Lives. Together, We Build Hope.",
  teluguName: "స్పెషల్ గయ్స్ ఫౌండేషన్",

  // Contact — EDIT THESE
  contact: {
    location: "Srikakulam District, Andhra Pradesh, India",
    phone: "+91 89850 33300",
    email: "specialguysfoundationsgf@gmail.com",
    whatsapp: "+91 89850 33300",
  },

  // Social links — EDIT THESE
  social: {
    facebook: "https://www.facebook.com/joinwithsgf/",
    instagram: "https://instagram.com/specialguysfoundation_sgf?utm_medium=copy_link",
    telegram: "https://t.me/+ZTI6MTqiaBVkZDNl",
    whatsapp: "https://wa.me/918985033300",
  },

  // Donation — EDIT THESE
  donate: {
    campaignUrl: "https://www.donatekart.com/",
    upiId: "8985033300@sbi",
    payeeName: "Special Guys Foundation",
    bank: {
      accountName: "Special Guys Foundation",
      accountNumber: "41351184720",
      ifsc: "SBIN0008820",
      bankName: "State Bank of India, Silagam Branch",
    },
  },

  // Home page impact stats — EDIT NUMBERS & LABELS
  stats: [
    { value: 500, suffix: "+", label: "Emergency Cases Responded To" },
    { value: 25, suffix: "+", label: "Blood Donation Camps" },
    { value: 100, suffix: "+", label: "Cancer & Kidney Patients Supported" },
    { value: 50, suffix: "+", label: "Communities Served in Srikakulam" },
  ],

  // Volunteer network — EDIT THESE
  volunteers: {
    total: 520, // total registered volunteers
    activeToday: 48, // approx. volunteers active in the field today
    cities: 32, // towns / mandals covered
    yearsActive: 6,
    // Core coordinators / team leads shown on the volunteers page.
    // Add or edit members here. Photo is optional (initials show otherwise).
    team: [
      { name: "Coordinator Name", role: "Founder & President", area: "Srikakulam" },
      { name: "Coordinator Name", role: "General Secretary", area: "Srikakulam" },
      { name: "Coordinator Name", role: "Blood Donation Lead", area: "Amadalavalasa" },
      { name: "Coordinator Name", role: "Medical Aid Coordinator", area: "Tekkali" },
      { name: "Coordinator Name", role: "Education Programs Lead", area: "Palasa" },
      { name: "Coordinator Name", role: "Disaster Response Lead", area: "Ichchapuram" },
      { name: "Coordinator Name", role: "Community Welfare Lead", area: "Narasannapeta" },
      { name: "Coordinator Name", role: "Volunteer & Outreach", area: "Rajam" },
    ],
  },

};

export type SiteConfig = typeof siteConfig;
