import { DollarSign, Globe, HomeIcon, Rss, Share2, Users } from "lucide-react";

export const sideMenu = [
  {
    title: "Home",
    link: "/dashboard",
    icon: HomeIcon
  },
  {
    title: "Sites",
    link: "/dashboard/sites",
    icon: Globe
  },
  {
    title: "pricing",
    link: "/dashboard/pricing",
    icon: DollarSign
  }
];

export const pricingList = [
  {
    id: 0,
    price: 0,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing ",
    priceTitle: "Free",
    benefites: [
      {
        title: "1 site",
        icon: Globe
      },
      {
        title: "1000 users ",
        icon: Users
      },
      {
        title: "100 Blogs Free",
        icon: Rss
      },
      {
        title: " 0 Share Blogs",
        icon: Share2
      },
      {
        title: " 0 Verify ",
        icon: Share2
      }
    ]
  },
  {
    id: 1,
    price: 29.99,
    priceId: "price_1PsWx7D6G6Qp32eCRywQjPQ8",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    priceTitle: "Golden",
    benefites: [
      {
        title: "10 site",
        icon: Globe
      },
      {
        title: "10000 users ",
        icon: Users
      },
      {
        title: "unlimted Blogs Free",
        icon: Rss
      },
      {
        title: " 100 Share Blogs",
        icon: Share2
      },
      {
        title: " 100 Verify ",
        icon: Share2
      }
    ]
  },
  {
    id: 2,
    priceId: "price_1PsWy7D6G6Qp32eCKY42ftxa",
    price: 49.99,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    priceTitle: "Platinum",
    benefites: [
      {
        title: "100 site",
        icon: Globe
      },
      {
        title: "10000 users ",
        icon: Users
      },
      {
        title: "unlimted Blogs Free",
        icon: Rss
      },
      {
        title: " 1000 Share Blogs",
        icon: Share2
      },
      {
        title: " 1000 Verify ",
        icon: Share2
      }
    ]
  }
];
