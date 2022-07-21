const food = [
  {
    id: 1,
    name: "HDFC Bank Regalia Credit Card",
    benefits: [
      "Complimentary Zomato Gold membership for one year.",
      "Up to 40% discount on dining spends on weekends at partner restaurants.",
      "Up to 25% discount on dinner buffets.",
    ],
    minAge: 21,
    maxAge: 60,
    income: 100000,
    cScore: 750,
    joiningFee: 2500,
    renewalFee: 2500,
    link: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia",
    img: "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/c3bbd7ad-6a6e-4c7b-92f9-319d5859567c/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/Super%20Premium/Regalia/Regalia-MC.png",
  },
  {
    id: 2,
    name: "SBI Card Prime",
    benefits: [
      "Pizza Hut e-vouchers worth ₹1,000.",
      "10 reward points for every ₹100 spent on dining activities.",
      "Complimentary Club Vistara and Trident Privilege membership.",
    ],
    minAge: 21,
    maxAge: 60,
    income: 0,
    cScore: 750,
    joiningFee: 2999,
    renewalFee: 2999,
    link: "https://www.sbicard.com/en/personal/credit-cards/rewards/sbi-card-prime.page",
    img: "https://www.sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/rewards/card-faces/sbi-prime-cardface.png",
  },
  {
    id: 3,
    name: "HDFC Bank Diners Club Privilege Credit Card",
    priority: 2,
    benefits: [
      "Premium dining services, such as table reservation.",
      "Complimentary Zomato Gold membership.",
      "Complimentary Annual memberships of Amazon Prime, MMT BLACK, Dineout Passport etc.",
    ],
    minAge: 21,
    maxAge: 60,
    income: 70000,
    cScore: 750,
    joiningFee: 2500,
    renewalFee: 2500,
    link: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/diners-privilege",
    img: "https://v1.hdfcbank.com/dinersclub/images/card2.png",
  },
  {
    id: 4,
    name: "ICICI Bank Rubyx Credit Card",
    priority: 3,
    benefits: [
      "30% discount on online food orders over Zomato.",
      "Access to ICICI Bank’s Culinary Treats Program.",
      "20% off on Sunday Brunches under the Culinary Treats Program.",
      "Additional 20% off on Swiggy.",
    ],
    minAge: 21,
    maxAge: 60,
    income: 0,
    cScore: 750,
    joiningFee: 2000,
    renewalFee: 2000,
    link: "https://www.icicibank.com/Personal-Banking/cards/Consumer-Cards/Credit-Card/rubyx-card/key-privileges.page",
    img: "https://cardinsider.com/wp-content/uploads/2021/07/ICICI-Bank-Rubyx-Credit-Card.png",
  },
  {
    id: 5,
    name: "Citi Cashback Credit Card",
    priority: 4,
    benefits: [
      "15% discount for spends at select partner restaurants from over 2000 dining partners.",
      "0.5% cashback on all other purchases.",
      "5% cashback on movie ticket purchases.",
    ],
    minAge: 23,
    maxAge: 60,
    income: 0,
    cScore: 750,
    joiningFee: 500,
    renewalFee: 500,
    link: "https://www.online.citibank.co.in/credit-card/cash-back/citi-cash-back-credit-card?tab=documents-for-salaried-employee",
    img: "https://static.paisabazaar.com/components/images/credit_card/small_images/50.png",
  },
];

module.exports = food;