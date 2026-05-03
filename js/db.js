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
        title: 'Menstrual Hygiene Awareness',
        shortDesc: 'Spreading awareness about period hygiene and sanitation across villages.',
        image: 'assets/images/menstrual_hygiene_program.png',
        status: 'Active',
        category: 'Awareness',
        content: {
            about: 'SakhiHub conducts awareness camps in rural areas to educate women and girls about period hygiene, sanitary pad usage, infection prevention, and safe disposal.',
            problem: 'Lack of awareness and taboos around menstruation leading to health complications.',
            solution: 'Educational workshops and access to affordable, high-quality sanitary products.',
            activities: ['Community Awareness Camps', 'School & College Sessions', 'Sanitary Pad Distribution']
        }
    },
    {
        id: 'p2',
        title: 'Health & Hygiene Awareness',
        shortDesc: 'Dedicated to overall women health and personal sanitation.',
        image: 'assets/images/health_awareness.png',
        status: 'Active',
        category: 'Health',
        content: {
            about: 'Our comprehensive health program focuses on general wellness, preventive care, and nutrition for rural women.',
            problem: 'Limited access to healthcare and lack of basic health knowledge.',
            solution: 'Mobile health checkups, nutrition counseling, and wellness workshops.',
            activities: ['Free Health Camps', 'Nutrition Guidance', 'Mental Health Awareness']
        }
    },
    {
        id: 'p3',
        title: 'Women Empowerment',
        shortDesc: 'Empowering women socially and economically for a better future.',
        image: 'assets/images/women_employment_program.png',
        status: 'Active',
        category: 'Empowerment',
        content: {
            about: 'Building a support network that empowers women to take control of their social and economic lives.',
            problem: 'Gender inequality and limited financial independence.',
            solution: 'Formation of Self-Help Groups (SHGs) and leadership training.',
            activities: ['SHG Network Formation', 'Leadership Workshops', 'Financial Literacy Training']
        }
    },
    {
        id: 'p4',
        title: 'Education & Skill Development',
        shortDesc: 'Building the future of women through modern vocational skills.',
        image: 'assets/images/hero3.png',
        status: 'Active',
        category: 'Skill',
        content: {
            about: 'Equipping women with practical skills to increase their employability and income potential.',
            problem: 'Significant skill gap and lack of vocational opportunities in villages.',
            solution: 'Certified training courses in high-demand vocational fields.',
            activities: ['Advanced Tailoring', 'Digital Literacy', 'Handicraft Training']
        }
    },
    {
        id: 'p5',
        title: 'MSME & Business Support',
        shortDesc: 'Creating opportunities for startups and financial independence.',
        image: 'assets/images/msme_support.png',
        status: 'Active',
        category: 'Business',
        content: {
            about: 'Fostering local entrepreneurship by supporting women-led micro-enterprises.',
            problem: 'Lack of capital and business knowledge for starting small ventures.',
            solution: 'MSME registration assistance, mentorship, and market connectivity.',
            activities: ['MSME Registration Help', 'Business Mentorship', 'Supply Chain Integration']
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
