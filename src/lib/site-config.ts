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
    phone: "+91 00000 00000",
    email: "info@specialguysfoundation.org",
    whatsapp: "+91 00000 00000",
  },

  // Social links — EDIT THESE (placeholders)
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    whatsapp: "https://wa.me/910000000000",
  },

  // Donation — EDIT THESE
  donate: {
    campaignUrl: "https://www.donatekart.com/",
    upiId: "specialguysfoundation@upi",
    bank: {
      accountName: "Special Guys Foundation",
      accountNumber: "0000 0000 0000",
      ifsc: "XXXX0000000",
      bankName: "Bank Name, Branch",
    },
  },

  // Home page impact stats — EDIT NUMBERS & LABELS
  stats: [
    { value: 500, suffix: "+", label: "Emergency Cases Responded To" },
    { value: 25, suffix: "+", label: "Blood Donation Camps" },
    { value: 100, suffix: "+", label: "Cancer & Kidney Patients Supported" },
    { value: 50, suffix: "+", label: "Communities Served in Srikakulam" },
  ],
};

export type SiteConfig = typeof siteConfig;
