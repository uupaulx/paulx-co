export type Locale = "th" | "en";

export const translations = {
  th: {
    nav: {
      home: "หน้าแรก",
      about: "เกี่ยวกับ",
      portfolio: "ผลงาน",
      skills: "ทักษะ",
      blog: "บทความ",
      resume: "Resume",
      contact: "ติดต่อ",
    },
    hero: {
      greeting: "สวัสดีครับ, ผมชื่อ",
      name: "Paul",
      title: "Data, Automation, AI & Vibe Coding Expert",
      subtitle:
        "10+ ปีประสบการณ์ในการสร้างระบบ Automation และ Data Solutions ที่ช่วยให้องค์กรทำงานได้อย่างมีประสิทธิภาพ",
      cta: {
        contact: "ติดต่อเพื่อพูดคุย",
        resume: "ขอดู Resume",
        portfolio: "ดูผลงานทั้งหมด",
      },
    },
    about: {
      title: "เกี่ยวกับผม",
      description:
        "ผมเป็นผู้เชี่ยวชาญด้าน Data, Automation และ AI ที่มีความหลงใหลในการสร้างโซลูชันที่ช่วยให้องค์กรทำงานได้ดีขึ้น",
      experience: "ประสบการณ์",
      years: "ปี",
      education: "การศึกษา",
      educationDetail: "ปริญญาตรี คณะมนุษยศาสตร์ สาขาภาษาอังกฤษ",
    },
    portfolio: {
      title: "ผลงานของผม",
      subtitle: "โปรเจคที่ภูมิใจนำเสนอ",
      viewDetails: "ดูรายละเอียด",
      categories: {
        all: "ทั้งหมด",
        data: "Data",
        automation: "Automation",
        ai: "AI",
        vibeCoding: "Vibe Coding",
      },
      impact: "ผลลัพธ์",
    },
    skills: {
      title: "ทักษะและความเชี่ยวชาญ",
      subtitle: "เครื่องมือและเทคโนโลยีที่ใช้งาน",
    },
    contact: {
      title: "ติดต่อผม",
      subtitle: "พร้อมรับฟังโอกาสใหม่ๆ",
      verifyHuman: "กรุณายืนยันว่าคุณไม่ใช่ Robot",
      revealContact: "แสดงข้อมูลติดต่อ",
      email: "อีเมล",
      phone: "โทรศัพท์",
      lineId: "LINE ID",
      linkedin: "LinkedIn",
    },
    blog: {
      title: "บทความ",
      subtitle: "แบ่งปันความรู้และประสบการณ์",
      readMore: "อ่านต่อ",
      readTime: "นาทีในการอ่าน",
      publishedAt: "เผยแพร่เมื่อ",
    },
    resume: {
      title: "Resume",
      subtitle: "ขอข้อมูลเพื่อเข้าดู Resume",
      loginWith: "เข้าสู่ระบบด้วย",
      orEmail: "หรือใช้อีเมล",
      emailPlaceholder: "กรอกอีเมลของคุณ",
      sendOtp: "ส่งรหัส OTP",
      verifyOtp: "ยืนยันรหัส OTP",
      otpSent: "ส่งรหัส OTP ไปที่อีเมลของคุณแล้ว",
      download: "ดาวน์โหลด Resume",
    },
    footer: {
      rights: "สงวนลิขสิทธิ์",
      madeWith: "สร้างด้วย",
    },
    theme: {
      light: "สว่าง",
      dark: "มืด",
      system: "ตามระบบ",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      portfolio: "Portfolio",
      skills: "Skills",
      blog: "Blog",
      resume: "Resume",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Paul",
      title: "Data, Automation, AI & Vibe Coding Expert",
      subtitle:
        "10+ years of experience building Automation and Data Solutions that help organizations work more efficiently",
      cta: {
        contact: "Get in Touch",
        resume: "View Resume",
        portfolio: "View Portfolio",
      },
    },
    about: {
      title: "About Me",
      description:
        "I'm a Data, Automation, and AI expert passionate about creating solutions that help organizations work better",
      experience: "Experience",
      years: "years",
      education: "Education",
      educationDetail: "Bachelor of Arts, English Language",
    },
    portfolio: {
      title: "My Portfolio",
      subtitle: "Projects I'm proud to present",
      viewDetails: "View Details",
      categories: {
        all: "All",
        data: "Data",
        automation: "Automation",
        ai: "AI",
        vibeCoding: "Vibe Coding",
      },
      impact: "Impact",
    },
    skills: {
      title: "Skills & Expertise",
      subtitle: "Tools and technologies I work with",
    },
    contact: {
      title: "Contact Me",
      subtitle: "Open to new opportunities",
      verifyHuman: "Please verify you're not a robot",
      revealContact: "Reveal Contact Info",
      email: "Email",
      phone: "Phone",
      lineId: "LINE ID",
      linkedin: "LinkedIn",
    },
    blog: {
      title: "Blog",
      subtitle: "Sharing knowledge and experiences",
      readMore: "Read More",
      readTime: "min read",
      publishedAt: "Published on",
    },
    resume: {
      title: "Resume",
      subtitle: "Provide your info to view Resume",
      loginWith: "Login with",
      orEmail: "or use email",
      emailPlaceholder: "Enter your email",
      sendOtp: "Send OTP",
      verifyOtp: "Verify OTP",
      otpSent: "OTP sent to your email",
      download: "Download Resume",
    },
    footer: {
      rights: "All rights reserved",
      madeWith: "Made with",
    },
    theme: {
      light: "Light",
      dark: "Dark",
      system: "System",
    },
  },
} as const;

export function getTranslation(locale: Locale) {
  return translations[locale];
}
