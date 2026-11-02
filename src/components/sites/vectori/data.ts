// Homepage content for this local learning demo (captured 2026-10-29).

export const img = (name: string) => `/sites/vectori/images/${name}`;
export const productImg = (name: string) => `/sites/vectori/products/${name}`;

/** Every route is local now; kept so older call sites read clearly. */
export const sourceHref = (path: string) => path;

export const announcementMessages = [
  { text: "bundle & save" },
  { text: "fast shipping", icon: "truck" },
  { text: "30-day guarantee", icon: "guarantee" },
  { text: "free sticker sheet with every order" },
] as const;

export const saleText = "up to 50% off - fall sale ends soon!";

export type Product = {
  href: string;
  series: string;
  isNew: boolean;
  image: string;
  hoverImage: string;
  reviews: number;
  type: string;
  tagline: string;
  price: string;
};

export const products: Product[] = [
  {
    href: "/travel/custom-photobook/the-travel-series/Paris_1",
    series: "travel series",
    isNew: false,
    image: productImg("Paris_1.jpg"),
    hoverImage: productImg("travel_hover_upd.jpg"),
    reviews: 72,
    type: "custom photobook",
    tagline: "your journeys, perfectly told",
    price: "$39.59",
  },
  {
    href: "/travel/custom-photobook/stamped-series/Stamped_New_York",
    series: "stamped series",
    isNew: true,
    image: productImg("New_York.jpg"),
    hoverImage: productImg("stamped_series_hover.jpg"),
    reviews: 72,
    type: "custom photobook",
    tagline: "your travels, stamped and saved",
    price: "$39.59",
  },
  {
    href: "/travel/custom-magazine/the-travel-edit/Paris_classic_2",
    series: "travel edit",
    isNew: false,
    image: productImg("Paris_1.png"),
    hoverImage: productImg("m3.jpg"),
    reviews: 72,
    type: "custom magazine",
    tagline: "your travels, front-page featured",
    price: "$50.27",
  },
  {
    href: "/moments/custom-photobook/moments-series/Summer_2026",
    series: "moments series",
    isNew: true,
    image: productImg("moments-summer-2026.jpg"),
    hoverImage: productImg("moments_hover_upd.jpg"),
    reviews: 72,
    type: "custom photobook",
    tagline: "your moments, forever kept",
    price: "$39.59",
  },
  {
    href: "/romance/custom-photobook/romance-series/My_Valentine",
    series: "romance series",
    isNew: true,
    image: productImg("My_Valentine.jpg"),
    hoverImage: productImg("hover_romance_upd.jpg"),
    reviews: 72,
    type: "custom photobook",
    tagline: "your love story, held between pages",
    price: "$39.59",
  },
  {
    href: "/travel/custom-photobook/postcard-from-summer-series/Summer_2",
    series: "postcards from summer series",
    isNew: false,
    image: productImg("Summer_2.jpg"),
    hoverImage: productImg("hover_summer_series.jpg"),
    reviews: 72,
    type: "custom photobook",
    tagline: "your summer moments, sun-kissed and saved",
    price: "$39.59",
  },
  {
    href: "/travel/custom-photobook/summer-series/Summer_2026_1",
    series: "summer series",
    isNew: true,
    image: productImg("summer-series-2026.jpg"),
    hoverImage: productImg("summer_series_2026_hover_upd.jpg"),
    reviews: 72,
    type: "custom photobook",
    tagline: "your summer moments, sun-kissed and saved",
    price: "$39.59",
  },
  {
    href: "/travel/custom-photobook/the-travel-series/London_1",
    series: "travel series",
    isNew: false,
    image: productImg("London_1.jpg"),
    hoverImage: productImg("travel_hover_upd.jpg"),
    reviews: 72,
    type: "custom photobook",
    tagline: "your journeys, perfectly told",
    price: "$39.59",
  },
  {
    href: "/romance/custom-photobook/honeymoon-series/Honeymoon_1",
    series: "honeymoon series",
    isNew: true,
    image: productImg("Honeymoon_1.jpg"),
    hoverImage: productImg("honeymoon_series.jpg"),
    reviews: 72,
    type: "custom photobook",
    tagline: "the beginning of forever, saved with love",
    price: "$39.59",
  },
];

export type MenuCard = {
  href: string;
  title: string;
  tagline: string;
  image: string;
  isNew?: boolean;
};

export type ShopTab = { id: string; label: string; cards: MenuCard[]; cta: string };

const travelSeries: MenuCard = {
  href: "/travel/custom-photobook/the-travel-series/Paris_1",
  title: "travel series",
  tagline: "your journeys, perfectly told",
  image: productImg("Paris_1.jpg"),
};
const summerEdit: MenuCard = {
  href: "/travel/custom-magazine/summer-edit/Euro_summer_classic_2",
  title: "summer edit",
  tagline: "your summer, front-page featured",
  image: productImg("euro_summer_classic.png"),
  isNew: true,
};
const romanceSeries: MenuCard = {
  href: "/romance/custom-photobook/romance-series/My_Valentine",
  title: "romance series",
  tagline: "your love story, held between pages",
  image: productImg("My_Valentine.jpg"),
  isNew: true,
};

export const shopTabs: ShopTab[] = [
  { id: "featured", label: "featured", cards: [travelSeries, summerEdit, romanceSeries], cta: "/collections/all" },
  {
    id: "photobooks",
    label: "photobooks",
    cards: [
      travelSeries,
      {
        href: "/travel/custom-photobook/winter-snow-series/Ski_trip_1",
        title: "winter snow series",
        tagline: "your winter moments, frozen in time",
        image: productImg("Ski_Trip_1.jpg"),
      },
      romanceSeries,
    ],
    cta: "/collections/all",
  },
  {
    id: "magazines",
    label: "magazines",
    cards: [
      summerEdit,
      {
        href: "/travel/custom-magazine/the-travel-edit/Paris_classic_2",
        title: "travel edit",
        tagline: "your travels, front-page featured",
        image: productImg("Paris_1.png"),
      },
      {
        href: "/travel/custom-magazine/the-travel-edit/Europe_modern_2",
        title: "travel edit",
        tagline: "your travels, front-page featured",
        image: productImg("Europe_2.png"),
      },
    ],
    cta: "/collections/all",
  },
];

export const features = [
  {
    title: "printed to perfection",
    text: "what you see is what we print — sharp photos & true colours on thick, luxurious paper.",
    image: img("slide-1.jpg"),
    width: 886,
    height: 888,
  },
  {
    title: "crafted to last a lifetime",
    text: "a premium hardcover that protects every memory — with perfect & lay flat binding options, designed to last a lifetime of page turns.",
    image: img("slide-2.jpg"),
    width: 884,
    height: 884,
  },
  {
    title: "luxury in every detail",
    text: "premium gift boxes that turn every order into a moment worth unwrapping.",
    image: img("slide-3.jpg"),
    width: 886,
    height: 884,
  },
];

export const brandValues = [
  {
    title: "moments that last",
    text: "vectori brings your most cherished memories to life through thoughtfully crafted photobooks you can hold on to forever",
  },
  {
    title: "designed to be loved",
    text: "created to be flipped through often and proudly displayed, not tucked away",
  },
  {
    title: "your story, your way",
    text: "vectori makes it easy to turn your memories into something personal, with easy to use tools and flexible customisation options which put creativity in the user’s hands",
  },
  {
    title: "rooted in connection",
    text: "vectori goes beyond treasuring memories - we celebrate the bonds memories create between people, places and moments",
  },
];

export type Review = { href: string; title: string; comment: string; name: string };

const tp = (id: string) => `https://uk.trustpilot.com/reviews/${id}`;

export const reviews: Review[] = [
  {
    href: tp("68d73780e85e09649755203a"),
    title: "Loved the quality and style!",
    comment:
      "I absolutely love the two books I had made! I exclusively used photos from my iPhone 16 for both books and I am so impressed at how high quality the photos and the books are. I’ve had other photos books made from Walgreens and CVS and they do not compare. I can’t wait to keep documenting our special trips with these!",
    name: "Rebecca Stinson",
  },
  {
    href: tp("68e009e8f9087e816827633f"),
    title: "Grateful for my Cyprus album!",
    comment:
      "Thank you for this beautiful album! \n\n The photos are excellently printed and the design is beautiful. The whole process was smooth, the quality is outstanding and I truly value the attention to detail that went into creating it. It is more than just a collection of photos, it is a cherished piece of my memories and I am grateful to Vectori for bringing it to life!",
    name: "Medeea Mihăiescu",
  },
  {
    href: tp("68de9145fb40daf9360b0642"),
    title: "Gorgeous photo book",
    comment:
      "My book arrived in great condition and quality. Beautiful hard cover and pages feel lovely with all prints turning out exactly how they looked on my phone. It is a beautiful addition for my coffee table and have already ordered another! \n\n I reached out to customer support to ask about the status of my most recent order and received great communication from Keisha! Overall great experience and would recommend vectori to all!",
    name: "Nicolina",
  },
  {
    href: tp("68c20574caf9331c30071722"),
    title: "By far the greatest and most easy album…",
    comment:
      "By far the greatest and most easy album making website on the internet!!! The quality and the size and everything about the albums is PERFECT. I'll definitely be ordering again because these are absolutely incredible I'm really happy with the results.",
    name: "Tiago Veloso Sanches",
  },
  {
    href: tp("68b4c12011acc97bf504c3b7"),
    title: "I have been trying for years to figure…",
    comment:
      "I have been trying for years to figure out what to do with all of my travel photos-once I heard about Vectori I loved the idea of my photo books not looking like cookie cutter photo site books that take hours and hours to make. I received my first Vectori book in the mail and have already ordered two more and am working on another!",
    name: "Lauren Silverstein Schor",
  },
  {
    href: tp("68e3d989a5599589f708f481"),
    title: "If you’re debating…here’s your sign",
    comment:
      "Vectori was a random find on Instagram and let me be the first to say THE PRODUCT MATCHES THE AD!! The templates are so easy to work with and the premade covers are to die for. I ordered 5 books from them and they all came in a little over a week and the quality is amazing. I made an error without realizing and thought it was a print issue. Vectoris customer service was amazing and even offered to reprint it for free! Can’t say enough good things about them. If you’re thinking about it, DO IT.",
    name: "Olivia",
  },
  {
    href: tp("68c29970de54e9677148a2e7"),
    title: "Love it",
    comment:
      "I saw it on Instagram and immediately fell in love with these designs. Ordered 8 books so far and they are truly amazing and stunning!",
    name: "Melissa D",
  },
  {
    href: tp("68bc3597545a7ab45e93a6e1"),
    title: "Vectori, top websites for albums",
    comment:
      "I’m in love with this website and I highly recommend it. The way in which they can automatically create your album really fast is amazing. You can do it on your own, but in my opinion it takes longer and I love how mine came out. The thing that differentiates Vectori from the other websites of albums is the cute and hard cover, very colorful and very pretty, and for sure the quality of the pictures.",
    name: "Zaira Santos",
  },
  {
    href: tp("68197a1e0788d02be1b61e19"),
    title: "VECTORI - fantastic results…",
    comment:
      "Once I had seen these advertised on Instagram I knew I needed to make my latest holiday books through Vectori. Truely satisfied with my first book which has arrived. At 50 pages of thick quality paper made all my snaps look great! Website, and customer service over live chat and email all 5/5. Thank you :-)",
    name: "LisaLemons",
  },
];

export const memoryCards = [
  { image: img("home-card-1.jpg"), width: 1388, height: 1388 },
  { image: img("home-card-2.jpg"), width: 1498, height: 1498 },
];

export const communityPhotos = [
  { image: img("rectangle-33.jpg"), width: 636, height: 793 },
  { image: img("rectangle-34.jpg"), width: 634, height: 794 },
  { image: img("rectangle-35.jpg"), width: 635, height: 794 },
  { image: img("rectangle-36.jpg"), width: 665, height: 794 },
];

export const footerNavigate = [
  { label: "home", href: "/" },
  { label: "about", href: sourceHref("/about") },
  { label: "faq", href: sourceHref("/faq") },
];

export const footerSocial = [
  { label: "instagram", icon: "instagram" },
  { label: "tiktok", icon: "tiktok" },
  { label: "facebook", icon: "facebook" },
  { label: "youtube", icon: "youtube" },
  { label: "linkedin", icon: "linkedin" },
  { label: "pinterest", icon: "pinterest" },
  { label: "substack", icon: "substack" },
  { label: "whatsapp", icon: "whatsapp" },
] as const;

export const footerHelp = [
  { label: "orders", href: sourceHref("/help/orders") },
  { label: "refunds", href: sourceHref("/help/refund-policy") },
  { label: "terms", href: sourceHref("/help/terms-and-conditions") },
  { label: "contact", href: sourceHref("/contact") },
  { label: "privacy", href: sourceHref("/help/privacy-policy") },
  { label: "cookies", href: sourceHref("/help/cookies-policy") },
];
