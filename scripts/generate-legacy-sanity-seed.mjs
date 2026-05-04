/**
 * Writes sanity/seeds/legacy-pages.ndjson for `sanity dataset import`.
 * Source text mirrors darelsalam.org / www.darelsalam.org pages captured 2026-05-04.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "sanity", "seeds");
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "legacy-pages.ndjson");

let keySeq = 0;
function block(style, text) {
  const k = `bk${++keySeq}`;
  return {
    _type: "block",
    _key: k,
    style: style || "normal",
    children: [
      {
        _type: "span",
        _key: `${k}s`,
        text,
        marks: [],
      },
    ],
    markDefs: [],
  };
}

const aboutIntro =
  "The following is adapted from the legacy Mission & Vision page (mission.html) published at darelsalam.org.";

const aboutBody = [
  block(
    "normal",
    "We strive to cultivate and strengthen our identity within the community, recognizing and celebrating the rich cultural diversity of our area. Our initiatives and programs are designed to improve the skills, well-being, and spiritual growth of our members and the wider community.",
  ),
  block("h2", "These include:"),
  block(
    "normal",
    "• Promoting the progressive values and teachings of Islam, and advocating for interfaith dialogue and understanding in accordance with the Qur'an and Sunnah.\n• Engaging in respectful communication and collaboration with all members of our surrounding community.\n• Establishing congregational prayers and offering a variety of religious and educational programs open to all.\n• Practicing moderation, tolerance, and inclusiveness to foster unity among Muslims.\n• Building mutual understanding with non-Muslims to effectively convey the principles of Islam.",
  ),
  block(
    "normal",
    "We invite you to connect with us and learn more about our community. Feel free to reach out to our leadership team, including Imam Mahmoud Qasim or any of our board members.",
  ),
  block("h2", "Our Mission"),
  block(
    "normal",
    "Our mission at Dar Elsalam Islamic Center is to cultivate the growth and leadership potential of the next generation of Muslims in our community by establishing safe, innovative, and spiritually enriching institutions. We are committed to nurturing their Islamic values, preserving their religious identity, fostering meaningful social connections, promoting academic excellence, and encouraging active citizenship.",
  ),
  block(
    "normal",
    "We aim to expand our facilities, build financial resources and endowments, and eventually establish a full-time Islamic school with the highest academic standards. Additionally, we plan to create a Youth and Family Center, complete with a café for social gatherings, to serve as a vibrant space for our community.",
  ),
  block("h2", "Our Vision"),
  block(
    "normal",
    "Dar Elsalam Islamic Center envisions itself as a beacon of Islamic worship and education, guided by the principles of the Qur'an and Sunnah, and marked by a spirit of moderation and tolerance. We aspire to be a community characterized by unity and inclusiveness among Muslims of diverse cultural and ethnic backgrounds, while also fostering mutual understanding with non-Muslims.",
  ),
  block(
    "normal",
    "Our long-term vision includes being recognized as a leading institution for Islamic education and a safe haven for social interaction among young Muslims and their families, all firmly rooted in Islamic values.",
  ),
];

const quranIntro =
  "The public legacy quran.html page listed only the word “Quran” as a heading; the masjid previously linked prayer times via Masjidbox and shared the illustrated guide PDF on the home carousel.";

const quranBody = [
  block(
    "normal",
    "Download the brief illustrated guide (legacy asset): https://darelsalam.org/assets/Brief_Illustrated.pdf",
  ),
  block(
    "normal",
    "Congregation prayer times (legacy Masjidbox link): https://masjidbox.com/prayer-times/darelsalam",
  ),
  block(
    "normal",
    "For reading and audio, many community members use quran.com or other trusted apps reviewed with Imam leadership.",
  ),
];

const newMuslimsIntro =
  "Here at Dar El Salam we offer classes that are not exclusive to anyone. All are invited and welcomed into our doors to expand your knowledge about the religion of peace. (Meta description from legacy new-muslims.html.)";

const newMuslimsBody = [
  block("h2", "Embracing the path"),
  block(
    "normal",
    "A journey to discover your faith — As a new Muslim, embarking on the journey to learn about your faith is an empowering and enriching experience. It is a journey that connects you to a global community, deepens your spirituality, and equips you to lead a more purposeful life in accordance with Islamic teachings. Remember that this journey is not a race but a lifelong pursuit of knowledge and spirituality. Embrace it with an open heart, and may your path be illuminated by the wisdom and beauty of Islam.",
  ),
  block("h3", "Understanding the significance"),
  block("h3", "Strengthening your faith"),
  block(
    "normal",
    "Learning about Islam allows you to deepen your faith and understanding of the religion's core beliefs and principles. It provides you with the knowledge needed to establish a strong foundation for your spiritual journey.",
  ),
  block("h3", "Navigating daily life"),
  block(
    "normal",
    "Islam is not just a religion for special occasions; it offers guidance for every aspect of your life. Learning about your faith equips you with the tools to make informed decisions in your personal, social, and professional life, in accordance with Islamic principles.",
  ),
  block("h3", "Connecting with the community"),
  block(
    "normal",
    "Becoming an active member of the Muslim community involves understanding the traditions, rituals, and cultural practices that bind individuals together. Learning about Islam helps you integrate into the community and build meaningful relationships with fellow Muslims.",
  ),
  block("h2", "Getting started"),
  block("h3", "Seek knowledge"),
  block(
    "normal",
    "The first step is to seek knowledge. Begin by reading introductory books about Islam. These books often cover the basics of faith, worship, and the life of the Prophet Muhammad (peace be upon him).",
  ),
  block("h3", "Find a mentor"),
  block(
    "normal",
    "Reach out to experienced Muslims who can guide you in your learning journey. A mentor can provide valuable insights, answer questions, and offer moral support.",
  ),
  block("h3", "Attend classes and workshops"),
  block(
    "normal",
    "Many mosques and Islamic centers offer classes and workshops for new Muslims. These sessions cover a wide range of topics, from Quranic studies to Islamic jurisprudence (fiqh). Participating in such programs can be a great way to learn and connect with the community.",
  ),
  block("h3", "Online resources"),
  block(
    "normal",
    "In today's digital age, there are numerous online resources available for learning about Islam. Websites, forums, and educational videos can be valuable tools for expanding your knowledge.",
  ),
  block("h3", "Visit local mosques"),
  block(
    "normal",
    "Regularly attending your local mosque for prayers and community events can provide you with opportunities to learn and engage with knowledgeable members of the community.",
  ),
  block("h3", "Conclusion"),
  block(
    "normal",
    "As a new Muslim, embarking on the journey to learn about your faith is an empowering and enriching experience. It is a journey that connects you to a global community, deepens your spirituality, and equips you to lead a more purposeful life in accordance with Islamic teachings. Remember that this journey is not a race but a lifelong pursuit of knowledge and spirituality. Embrace it with an open heart, and may your path be illuminated by the wisdom and beauty of Islam.",
  ),
  block(
    "normal",
    "Legacy site also referenced: newmuslims.com, newmuslimguide.com, newmuslim.net, islamway.com (verify with Imam before treating as endorsements).",
  ),
];

const privacyBody = [
  block(
    "normal",
    "We use cookies to give you the best experience. Read our cookie policy. (Legacy cookie banner text from darelsalam.org.)",
  ),
  block("h2", "Introduction"),
  block(
    "normal",
    "Dar Elsalam Islamic Center (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. (Adapted from legacy page9.html — review with legal counsel for your jurisdiction.)",
  ),
  block("h2", "Information we collect"),
  block(
    "normal",
    "We may collect the following types of information:\n• Personal Information: Such as your name, email address, phone number, and other contact details when you voluntarily submit them through forms on our website.\n• Non-Personal Information: Such as your IP address, browser type, and browsing behavior, which is automatically collected through cookies and similar technologies.",
  ),
  block("h2", "How we use your information"),
  block(
    "normal",
    "We use your information to communicate with you and respond to your inquiries; provide information about our programs, services, and events; improve our website’s functionality and user experience; and comply with legal obligations and protect our rights.",
  ),
  block("h2", "Data sharing and disclosure"),
  block(
    "normal",
    "We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our activities, provided they agree to keep your information confidential; and with legal authorities if required by law or to protect our rights.",
  ),
  block("h2", "Cookies and tracking technologies"),
  block(
    "normal",
    "Our website uses cookies to enhance your browsing experience. You can manage your cookie preferences through your browser settings. Please note that disabling cookies may affect your ability to use certain features of our site.",
  ),
  block("h2", "Data security"),
  block(
    "normal",
    "We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  ),
  block("h2", "Your rights"),
  block(
    "normal",
    "You have the right to access, correct, or delete your personal information; object to or restrict certain types of data processing; and withdraw your consent for data collection at any time. To exercise these rights, please contact us using the contact information published on this website.",
  ),
  block("h2", "Changes to this privacy policy"),
  block(
    "normal",
    "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.",
  ),
  block("h2", "Contact us"),
  block(
    "normal",
    "Dar Elsalam Islamic Center — 500 W Road to Six Flags St, Arlington, TX 76011 — +1 (817) 548-1700 — info@darelsalam.org",
  ),
];

const termsBody = [
  block("h2", "1. Acceptance of terms"),
  block(
    "normal",
    "By accessing or using the Dar Elsalam Islamic Center website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
  ),
  block("h2", "2. Purpose of the website"),
  block(
    "normal",
    "The website serves as a platform for promoting the mission and values of the Dar Elsalam Islamic Center. It provides information on our programs, services, and events aimed at fostering understanding, acceptance, and spiritual growth within our community and beyond.",
  ),
  block("h2", "3. Use of content"),
  block(
    "normal",
    "All content on this website, including text, graphics, logos, images, and information, is the property of Dar Elsalam Islamic Center and is protected by copyright laws. You may use the content for personal, non-commercial purposes, provided that you do not modify or alter the content in any way. Unauthorized use of any content may violate copyright, trademark, and other laws.",
  ),
  block("h2", "4. User conduct"),
  block(
    "normal",
    "Users are expected to engage with the website respectfully and in accordance with the teachings of Islam. You agree not to: use the website in any way that could harm, disable, or impair the site’s functionality; engage in any activity that violates any law or regulation; post or transmit any offensive, defamatory, or otherwise inappropriate content.",
  ),
  block("h2", "5. Privacy policy"),
  block(
    "normal",
    "Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms of Use, explains how we collect, use, and protect your information. By using this website, you consent to the collection and use of information as outlined in the Privacy Policy.",
  ),
  block("h2", "6. Third-party links"),
  block(
    "normal",
    "This website may contain links to third-party websites for your convenience. Dar Elsalam Islamic Center is not responsible for the content, policies, or practices of any third-party sites. Accessing these links is at your own risk.",
  ),
  block("h2", "7. Disclaimer of warranties"),
  block(
    "normal",
    'The website and its content are provided on an "as-is" basis. Dar Elsalam Islamic Center makes no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of the content on this site.',
  ),
  block("h2", "8. Limitation of liability"),
  block(
    "normal",
    "Dar Elsalam Islamic Center shall not be liable for any damages arising from the use or inability to use this website, including but not limited to direct, indirect, incidental, or consequential damages.",
  ),
  block("h2", "9. Modifications to terms"),
  block(
    "normal",
    "We reserve the right to modify these Terms of Use at any time without prior notice. Your continued use of the website constitutes acceptance of any changes to these terms.",
  ),
  block("h2", "10. Governing law"),
  block(
    "normal",
    "These terms are governed by and construed in accordance with the laws of the State of Texas, United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location. (Legacy placeholder updated from [Your State/Country].)",
  ),
  block("h2", "11. Contact information"),
  block(
    "normal",
    "If you have any questions about these Terms of Use, please contact Dar Elsalam Islamic Center at 500 W Road to Six Flags St, Arlington, TX 76011; +1 (817) 548-1700; info@darelsalam.org",
  ),
];

const guideSlide = {
  _id: "legacy-seed-slide-illustrated-guide",
  _type: "carouselSlide",
  title: "A Brief Illustrated Guide to Understanding Islam",
  subtitle: "Download the PDF shared on the legacy homepage carousel.",
  body: [],
  linkLabel: "Open guide (PDF)",
  linkHref: "https://darelsalam.org/assets/Brief_Illustrated.pdf",
  orderRank: 0,
};

const docs = [
  guideSlide,
  {
    _id: "legacy-seed-page-about",
    _type: "pageContent",
    title: "Mission • Vision",
    slug: { _type: "slug", current: "about" },
    intro: aboutIntro,
    body: aboutBody,
  },
  {
    _id: "legacy-seed-page-quran",
    _type: "pageContent",
    title: "Quran",
    slug: { _type: "slug", current: "quran" },
    intro: quranIntro,
    body: quranBody,
  },
  {
    _id: "legacy-seed-page-new-muslims",
    _type: "pageContent",
    title: "New Muslims",
    slug: { _type: "slug", current: "new-muslims" },
    intro: newMuslimsIntro,
    body: newMuslimsBody,
  },
  {
    _id: "legacy-seed-legal-privacy",
    _type: "legalPage",
    title: "Privacy Policy",
    slug: { _type: "slug", current: "privacy" },
    body: privacyBody,
  },
  {
    _id: "legacy-seed-legal-terms",
    _type: "legalPage",
    title: "Terms of Use",
    slug: { _type: "slug", current: "terms" },
    body: termsBody,
  },
];

const lines = docs.map((d) => JSON.stringify(d)).join("\n");
writeFileSync(outFile, lines + "\n", "utf8");
console.error("Wrote", outFile);
