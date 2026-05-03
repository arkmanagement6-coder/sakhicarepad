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
        // Core Platform Data
        if (!localStorage.getItem('sakhi_programs')) {
            localStorage.setItem('sakhi_programs', JSON.stringify(INITIAL_PROGRAMS));
        }
        if (!localStorage.getItem('sakhi_products')) {
            localStorage.setItem('sakhi_products', JSON.stringify(INITIAL_PRODUCTS));
        }

        // Field Force Management Data
        if (!localStorage.getItem('sakhi_users')) {
            // Seed a Super Admin by default
            const admin = {
                id: 'ADMIN001',
                name: 'Super Admin',
                mobile: '8076611842',
                role: 'Admin',
                status: 'Active',
                password: 'admin'
            };
            localStorage.setItem('sakhi_users', JSON.stringify([admin]));
        }
        if (!localStorage.getItem('sakhi_groups')) localStorage.setItem('sakhi_groups', JSON.stringify([]));
        if (!localStorage.getItem('sakhi_members')) localStorage.setItem('sakhi_members', JSON.stringify([]));
        if (!localStorage.getItem('sakhi_payments')) localStorage.setItem('sakhi_payments', JSON.stringify([]));
        if (!localStorage.getItem('sakhi_campaigns')) {
            const seedCampaigns = [
                { id: 'c1', title: 'Healthy Sakhi Campaign', desc: 'Focus on menstrual hygiene awareness.', status: 'Active', target: 'Village Women', date: '2026-05-01' },
                { id: 'c2', title: 'Sakhi Swavlamban', desc: 'Economic independence through skill training.', status: 'Active', target: 'Young Girls', date: '2026-05-10' }
            ];
            localStorage.setItem('sakhi_campaigns', JSON.stringify(seedCampaigns));
        }
        if (!localStorage.getItem('sakhi_reports')) localStorage.setItem('sakhi_reports', JSON.stringify([]));
        
        // Legacy/General data
        if (!localStorage.getItem('sakhi_applications')) localStorage.setItem('sakhi_applications', JSON.stringify([]));
        if (!localStorage.getItem('sakhi_inquiries')) localStorage.setItem('sakhi_inquiries', JSON.stringify([]));
    }

    // Generic Getters/Setters
    _get(key) { return JSON.parse(localStorage.getItem(key)) || []; }
    _set(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

    // Programs & Products
    getPrograms() { return this._get('sakhi_programs'); }
    getProgramById(id) { return this.getPrograms().find(p => p.id === id); }
    getProducts() { return this._get('sakhi_products'); }

    // Users (Employees/Coordinators)
    getUsers() { return this._get('sakhi_users'); }
    addUser(user) {
        const users = this.getUsers();
        const newUser = { 
            ...user, 
            id: user.id || 'SKH' + Math.floor(1000 + Math.random() * 9000), 
            status: user.status || 'Pending',
            dateJoined: new Date().toISOString()
        };
        users.push(newUser);
        this._set('sakhi_users', users);
        return newUser;
    }
    updateUser(id, updates) {
        const users = this.getUsers();
        const idx = users.findIndex(u => u.id === id || u.mobile === id);
        if (idx !== -1) {
            users[idx] = { ...users[idx], ...updates };
            this._set('sakhi_users', users);
        }
    }

    // Groups
    getGroups() { return this._get('sakhi_groups'); }
    addGroup(group) {
        const groups = this.getGroups();
        const newGroup = { ...group, id: 'GRP' + Date.now(), timestamp: new Date().toISOString() };
        groups.push(newGroup);
        this._set('sakhi_groups', groups);
        return newGroup;
    }

    // Members
    getMembers() { return this._get('sakhi_members'); }
    addMember(member) {
        const members = this.getMembers();
        const newMember = { ...member, id: 'MEM' + Date.now(), membershipStatus: 'Free', dateAdded: new Date().toISOString() };
        members.push(newMember);
        this._set('sakhi_members', members);
        return newMember;
    }

    // Payments / Memberships
    getPayments() { return this._get('sakhi_payments'); }
    addPayment(pay) {
        const payments = this.getPayments();
        const newPay = { 
            ...pay, 
            id: 'PAY' + Date.now(), 
            receiptNo: 'REC' + Math.floor(100000 + Math.random() * 900000),
            timestamp: new Date().toISOString() 
        };
        payments.push(newPay);
        this._set('sakhi_payments', payments);
        
        // Update member status
        const members = this.getMembers();
        const midx = members.findIndex(m => m.mobile === pay.memberMobile);
        if (midx !== -1) {
            members[midx].membershipStatus = 'Paid';
            this._set('sakhi_members', members);
        }
        return newPay;
    }

    // Campaigns
    getCampaigns() { return this._get('sakhi_campaigns'); }

    // Reports
    getReports() { return this._get('sakhi_reports'); }
    addReport(report) {
        const reports = this.getReports();
        reports.push({ ...report, id: 'REP' + Date.now(), timestamp: new Date().toISOString() });
        this._set('sakhi_reports', reports);
    }

    // Legacy Support
    addApplication(app) {
        const apps = this._get('sakhi_applications');
        apps.push({ ...app, id: Date.now().toString(), date: new Date().toISOString(), status: 'New' });
        this._set('sakhi_applications', apps);
    }
    getApplications() { return this._get('sakhi_applications'); }
    addInquiry(inquiry) {
        const inqs = this._get('sakhi_inquiries');
        inqs.push({ ...inquiry, id: Date.now().toString(), date: new Date().toISOString(), status: 'New' });
        this._set('sakhi_inquiries', inqs);
    }
    getInquiries() { return this._get('sakhi_inquiries'); }
}

export const db = new Database();
export default db;
