const CONFIG = {
    brandName: 'SakhiHub',
    tagline: 'Empowering Women Across India',
    phone: '8076611842',
    whatsapp: '8076611842',
    email: 'contact@sakhihub.in',
    googleForm: 'https://forms.gle/oX8yX4UgUMmVvp8J9'
};

const INITIAL_PROGRAMS = [
    {
        id: 'p1',
        title: 'मासिक धर्म स्वच्छता जागरूकता',
        titleEn: 'Menstrual Hygiene Awareness',
        shortDesc: 'गांव-गांव जाकर महिलाओं और बेटियों को period hygiene की जानकारी देना।',
        image: 'assets/images/menstrual_hygiene_program.png',
        status: 'Active',
        category: 'Awareness',
        content: {
            about: 'SakhiHub गांव-गांव जाकर महिलाओं और बेटियों को period hygiene, sanitary pad use, infection prevention, safe disposal और health awareness की जानकारी देता है।',
            problem: 'Lack of awareness and taboos around menstruation leading to infections.',
            solution: 'Educational workshops and access to quality pads.',
            activities: ['Community Awareness', 'School Sessions', 'Distribution']
        }
    },
    {
        id: 'p2',
        title: 'महिला स्वास्थ्य एवं स्वच्छता',
        titleEn: 'Health & Hygiene Awareness',
        shortDesc: 'महिलाओं के संपूर्ण स्वास्थ्य और व्यक्तिगत स्वच्छता के लिए समर्पित।',
        image: 'assets/images/health_awareness.png',
        status: 'Active',
        category: 'Health',
        content: {
            about: 'Comprehensive health programs for rural women.',
            problem: 'Poor healthcare facilities and general health ignorance.',
            solution: 'Mobile health checkups and nutrition education.',
            activities: ['Health Camps', 'Nutrition Guide', 'Mental Health Support']
        }
    },
    {
        id: 'p3',
        title: 'महिला सशक्तिकरण',
        titleEn: 'Women Empowerment',
        shortDesc: 'महिलाओं को सामाजिक और आर्थिक रूप से सशक्त बनाना।',
        image: 'assets/images/women_employment_program.png',
        status: 'Active',
        category: 'Empowerment',
        content: {
            about: 'Social and economic empowerment through networking.',
            problem: 'Gender inequality and lack of decision-making power.',
            solution: 'Self-Help Groups (SHG) and leadership training.',
            activities: ['Group Formation', 'Leadership Workshops', 'Financial Literacy']
        }
    },
    {
        id: 'p4',
        title: 'शिक्षा एवं कौशल विकास',
        titleEn: 'Education & Skill Development',
        shortDesc: 'आधुनिक कौशलों के साथ महिलाओं के भविष्य का निर्माण।',
        image: 'assets/images/hero3.png',
        status: 'Active',
        category: 'Skill',
        content: {
            about: 'Skill training programs for better employability.',
            problem: 'Skill gap in rural areas.',
            solution: 'Certified vocational training courses.',
            activities: ['Tailoring', 'Digital Literacy', 'Handicrafts']
        }
    },
    {
        id: 'p5',
        title: 'MSME एवं व्यापार सहायता',
        titleEn: 'MSME & Business Support',
        shortDesc: 'स्वयं का व्यवसाय शुरू करने के अवसर और आर्थिक आजादी।',
        image: 'assets/images/msme_support.png',
        status: 'Active',
        category: 'Business',
        content: {
            about: 'Creating entrepreneurs at the village level.',
            problem: 'Unemployment and financial dependency.',
            solution: 'MSME support and delivery partner network.',
            activities: ['MSME Registration', 'Business Mentorship', 'Market Linkage']
        }
    }
];

const INITIAL_PRODUCTS = [
    {
        id: 'prod1',
        name: 'Sakhi Regular Pack',
        pads: '16 Pads',
        mrp: '100',
        price: '80',
        features: ['Regular + XL', 'Day Use', 'Soft & Comfortable', 'Leak Protection'],
        description: 'Perfect for daily protection with maximum comfort.',
        image: 'assets/images/sakhi_care_pads_product.png'
    },
    {
        id: 'prod2',
        name: 'Sakhi Family Pack',
        pads: '24 Pads',
        mrp: '150',
        price: '120',
        features: ['XL + XXL', 'Day & Night Protection', 'High Absorbency', 'Skin Friendly'],
        description: 'Value pack for complete protection during heavy flow.',
        image: 'assets/images/sakhi_care_pads_product.png'
    }
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        // Force refresh programs to fix broken image paths
        localStorage.setItem('sakhi_programs', JSON.stringify(INITIAL_PROGRAMS));
        
        if (!localStorage.getItem('sakhi_products')) {
            localStorage.setItem('sakhi_products', JSON.stringify(INITIAL_PRODUCTS));
        }
        if (!localStorage.getItem('sakhi_applications')) {
            localStorage.setItem('sakhi_applications', JSON.stringify([]));
        }
        if (!localStorage.getItem('sakhi_inquiries')) {
            localStorage.setItem('sakhi_inquiries', JSON.stringify([]));
        }
    }

    getConfig() { return CONFIG; }

    getPrograms() {
        return JSON.parse(localStorage.getItem('sakhi_programs'));
    }

    getProgramById(id) {
        return this.getPrograms().find(p => p.id === id);
    }

    addProgram(program) {
        const programs = this.getPrograms();
        programs.push({ ...program, id: Date.now().toString() });
        localStorage.setItem('sakhi_programs', JSON.stringify(programs));
    }

    getProducts() {
        return JSON.parse(localStorage.getItem('sakhi_products'));
    }

    addApplication(app) {
        const apps = JSON.parse(localStorage.getItem('sakhi_applications'));
        apps.push({ ...app, id: Date.now().toString(), date: new Date().toISOString(), status: 'New' });
        localStorage.setItem('sakhi_applications', JSON.stringify(apps));
    }

    getApplications() {
        return JSON.parse(localStorage.getItem('sakhi_applications'));
    }

    addInquiry(inquiry) {
        const inqs = JSON.parse(localStorage.getItem('sakhi_inquiries'));
        inqs.push({ ...inquiry, id: Date.now().toString(), date: new Date().toISOString(), status: 'New' });
        localStorage.setItem('sakhi_inquiries', JSON.stringify(inqs));
    }

    getInquiries() {
        return JSON.parse(localStorage.getItem('sakhi_inquiries'));
    }
}

export const db = new Database();
export default db;
