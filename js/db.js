const INITIAL_PROGRAMS = [
    {
        id: 'p1',
        title: 'Menstrual Hygiene Campaign',
        shortDesc: 'Breaking taboos and providing safe hygiene solutions for rural women.',
        image: 'assets/images/menstrual_hygiene_program.png',
        status: 'Active',
        category: 'Health',
        content: {
            about: 'Our flagship campaign focused on education and distribution of organic pads.',
            problem: 'Lack of awareness and access to sanitary products leads to health issues and school dropouts.',
            solution: 'Educational workshops combined with local production and distribution.',
            activities: ['Community Workshops', 'School Sessions', 'Sanitary Pad Distribution']
        }
    },
    {
        id: 'p2',
        title: 'Women Employment Program',
        shortDesc: 'Creating sustainable livelihoods through local manufacturing and distribution.',
        image: 'assets/images/women_employment_program.png',
        status: 'Active',
        category: 'Employment',
        content: {
            about: 'Empowering women by making them entrepreneurs and skilled workers.',
            problem: 'Unemployment and financial dependency among rural women.',
            solution: 'Setting up local production units for Sakhi Care products.',
            activities: ['Skill Training', 'Business Management Support', 'Micro-finance Links']
        }
    },
    {
        id: 'p3',
        title: 'MSME & Business Support',
        shortDesc: 'Helping women-led small businesses scale with training and networking.',
        image: 'assets/images/msme_support.png',
        status: 'Active',
        category: 'Business',
        content: {
            about: 'Technical and financial guidance for women starting small businesses.',
            problem: 'Limited access to formal business training and markets.',
            solution: 'Mentorship and market linkage programs.',
            activities: ['MSME Registration Help', 'Packaging Support', 'Digital Marketing Training']
        }
    },
    {
        id: 'p4',
        title: 'Skill Training Program',
        shortDesc: 'Equipping women with modern skills for the digital and manufacturing age.',
        image: 'assets/images/skill_training.png',
        status: 'Active',
        category: 'Growth',
        content: {
            about: 'Vocational training focused on market demand.',
            problem: 'Skill gap hindering employment opportunities.',
            solution: 'Certified training modules in various domains.',
            activities: ['Tailoring', 'IT Basics', 'Customer Service']
        }
    },
    {
        id: 'p5',
        title: 'Health Awareness',
        shortDesc: 'Comprehensive health checkups and education for village communities.',
        image: 'assets/images/health_awareness.png',
        status: 'Active',
        category: 'Health',
        content: {
            about: 'General health camps focusing on maternal and child health.',
            problem: 'Poor healthcare access in remote villages.',
            solution: 'Mobile health clinics and volunteer networks.',
            activities: ['Regular Checkups', 'Nutrition Awareness', 'Maternal Care']
        }
    }
];

const INITIAL_PRODUCTS = [
    {
        id: 'prod1',
        name: 'Sakhi Regular Pack',
        price: '40',
        description: 'Pack of 8 ultra-thin organic pads.',
        image: 'assets/images/sakhi_care_pads_product.png'
    },
    {
        id: 'prod2',
        name: 'Sakhi Family Pack',
        price: '150',
        description: 'Value pack for the entire family, 32 pads.',
        image: 'assets/images/sakhi_care_pads_product.png'
    }
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem('sakhi_programs')) {
            localStorage.setItem('sakhi_programs', JSON.stringify(INITIAL_PROGRAMS));
        }
        if (!localStorage.getItem('sakhi_products')) {
            localStorage.setItem('sakhi_products', JSON.stringify(INITIAL_PRODUCTS));
        }
        if (!localStorage.getItem('sakhi_applications')) {
            localStorage.setItem('sakhi_applications', JSON.stringify([]));
        }
        if (!localStorage.getItem('sakhi_groups')) {
            localStorage.setItem('sakhi_groups', JSON.stringify([]));
        }
    }

    // Programs
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

    // Products
    getProducts() {
        return JSON.parse(localStorage.getItem('sakhi_products'));
    }

    // Applications
    addApplication(app) {
        const apps = JSON.parse(localStorage.getItem('sakhi_applications'));
        apps.push({ ...app, id: Date.now().toString(), date: new Date().toISOString(), status: 'Pending' });
        localStorage.setItem('sakhi_applications', JSON.stringify(apps));
    }

    getApplications() {
        return JSON.parse(localStorage.getItem('sakhi_applications'));
    }

    // Groups
    getGroups() {
        return JSON.parse(localStorage.getItem('sakhi_groups'));
    }
}

export const db = new Database();
export default db;
