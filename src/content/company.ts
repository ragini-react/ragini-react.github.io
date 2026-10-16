/**
 * Company facts. Every entry is sourced; see docs/RESEARCH.md.
 */

export const company = {
  name: "Walkover",
  legalName: "Walkover Web Solutions Pvt Ltd",
  founded: "2010",
  founders: ["Pushpendra Agrawal", "Ankita Agrawal", "Shubhendra Agrawal"],
  email: "info@walkover.in",
  phone: "+91 731 256 0056",
  phoneHref: "tel:+917312560056",
  callHours: "Monday to Friday, 10 am to 8 pm IST",
  address: {
    lines: ["5th Floor, Wing B, LIC Tower", "28-29-30, PU-03, Scheme No. 54", "Indore, Madhya Pradesh 452011", "India"],
    street: "5th Floor, Wing B, LIC Tower, 28-29-30, PU-03, Scheme No. 54",
    locality: "Indore",
    region: "Madhya Pradesh",
    postalCode: "452011",
    country: "IN",
    map: "https://goo.gl/maps/M93XQRyqzzArWdxU9",
  },
  careersPortal: "https://walkover.keka.com/careers",
  brandAssets: "https://stuff.walkover.in/",
  happinessArchive: "https://walkover.in/happiness/",
  blog: "https://medium.com/walkover-insights",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/walkover/" },
    { label: "Instagram", href: "https://www.instagram.com/walkover.inc/" },
    { label: "X (Twitter)", href: "https://x.com/walkoverltd" },
    { label: "Facebook", href: "https://www.facebook.com/walkoverltd" },
    { label: "GitHub", href: "https://github.com/Walkover-Web-Solution" },
  ],
  mission:
    "We are on a mission to support start-ups in realizing their vision of creating a better world through technology and innovation.",
  pillars: ["Design", "Culture", "Technology"],
  hiringMotto: "Passion First, Skill Second, Degree Last",
};

export interface Value {
  n: number;
  title: string;
  body: string;
  hindi: string;
}

/** Walkover's ten values, verbatim from walkover.in/about/culture-we-foster (checked 16 Oct 2026). */
export const values: Value[] = [
  {
    n: 1,
    title: "One move. Total focus.",
    body: "Give everything to the task at hand—nothing else matters. By mastering one thing at a time, you’re laying the foundation for greatness.",
    hindi: "ध्यान एकाग्र करो। कार्य में पूर्ण समर्पण ही सफलता का मार्ग प्रशस्त करता है। एकाग्रता से ही महानता की नींव रखी जा सकती है।",
  },
  {
    n: 2,
    title: "Bold risks, fearless steps!",
    body: "Don’t play it safe—safe kills growth. Be bold, take risks, and experiment without fear. The customer joined us because they believe in our potential. It’s our duty to exceed their expectations and deliver something extraordinary. Remember, even the CEO answers to the customer.",
    hindi: "साहस का परिचय दो। सुरक्षित राहों पर चलना विकास को रोकता है। जोखिम उठाओ, बिना भय के नए पथ अपनाओ। ग्राहक का विश्वास हमारा कर्तव्य है, इसे पूरा करना हमारा धर्म।",
  },
  {
    n: 3,
    title: "Only doers allowed!",
    body: "This is a team of doers. If you’re waiting around, you’re already behind. Take charge, make things happen, and lead the way forward. Proactive people create opportunities, not excuses.",
    hindi: "केवल कार्यकर्ता ही इस स्थान पर प्रवेश पाते हैं। जो ठहरते हैं, वे पीछे रह जाते हैं। पहल करो, कार्य को अंजाम दो, और आगे की राह बनाओ। सक्रियता ही अवसरों की रचना करती है।",
  },
  {
    n: 4,
    title: "Elevate or evolve!",
    body: "Push your peers to be better, or bring in fresh talent that’s ready to thrive. Together, we rise—through improvement or change. Our team’s strength comes from constantly growing.",
    hindi: "अपने साथियों को उन्नत करो या नई प्रतिभा को स्थान दो। सुधार या परिवर्तन के माध्यम से हम सबका विकास सुनिश्चित करो। टीम की शक्ति निरंतर वृद्धि में निहित है।",
  },
  {
    n: 5,
    title: "Respect time, sync minds!",
    body: "Before any meeting or call, send a message to give the other person time to prepare. During the call or meeting, speak clearly and concisely. Afterward, follow up with a MOM to ensure everyone is on the same page. Time is valuable—let’s make every second count.",
    hindi: "समय का आदर करो। किसी भी बैठक से पूर्व तैयारी का संदेश भेजो। संवाद के दौरान स्पष्ट और संक्षिप्त बोलो। बैठक के पश्चात मिनट्स ऑफ मीटिंग साझा करो। हर क्षण की कद्र करो।",
  },
  {
    n: 6,
    title: "Dream big, stay goal-oriented!",
    body: "We’re a team driven by change. Embrace the OKR philosophy—Objectives and Key Results—to align your efforts and ambitions. Aim for moonshots that challenge the status quo. Every step we take should lead us closer to meaningful change.",
    hindi: "बड़े सपने देखो और लक्ष्योन्मुख रहो। उद्देश्य और मुख्य परिणाम (OKR) को अपनाकर अपने प्रयासों को संरेखित करो। ऐसे लक्ष्य निर्धारित करो जो मौजूदा स्थिति को चुनौती दें।",
  },
  {
    n: 7,
    title: "Plan, then execute!",
    body: "Our minds excel at either planning or executing, but trying to do both at once slows us down. Take the time to strategize before you act. A focused plan leads to impactful execution.",
    hindi: "योजना बनाओ, फिर कार्यान्वित करो। दिमाग की एकाग्रता योजना या क्रियान्वयन में हो, दोनों में विभाजित न करो। सुविचारित योजना प्रभावी कार्यान्वयन की कुंजी है।",
  },
  {
    n: 8,
    title: "Version by version, we conquer!",
    body: "Perfection is a myth. Progress happens step by step. Create in stages, improve with each version, and keep moving forward.",
    hindi: "प्रगति क्रमबद्ध होती है। पूर्णता की चाह में अटकने की आवश्यकता नहीं। चरणबद्ध निर्माण करो, हर संस्करण के साथ सुधारो, और निरंतर आगे बढ़ो।",
  },
  {
    n: 9,
    title: "Follow the best or build it better!",
    body: "Don’t settle for mediocrity. If the best process exists, use it. If not, create a new one that sets the standard. We’re here to make things better—either by following excellence or by building it ourselves.",
    hindi: "श्रेष्ठता को अपनाओ या उसे बेहतर बनाओ। यदि उत्तम प्रक्रिया उपलब्ध है, तो उसका पालन करो। नहीं तो, एक नया मानक स्थापित करो। औसत पर संतुष्टि नहीं, उत्कृष्टता की ओर बढ़ो।",
  },
  {
    n: 10,
    title: "Copy smart, build sharp!",
    body: "There’s no need to start from scratch when the best ideas already exist. Take inspiration, refine it, and create something exceptional. We don’t reinvent—we elevate.",
    hindi: "स्मार्ट कॉपी करो, तेज़ी से निर्माण करो। श्रेष्ठ विचारों से प्रेरणा लेकर उन्हें परिष्कृत करो। पुन: आविष्कार नहीं, बल्कि उन्हें ऊंचा उठाओ।",
  },
];
