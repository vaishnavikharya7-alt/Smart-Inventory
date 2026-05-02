// ===== JOBS DATA =====
const JOBS = [
  {
    id: 1,
    title: 'E-Commerce Website Redesign',
    cat: 'Web Development',
    budget: 75000,
    duration: '3-4 weeks',
    proposals: 12,
    desc: 'Modern React + Node.js e-commerce site banana hai. Payment gateway integration, admin panel, aur responsive design chahiye. Product catalog, cart system, checkout flow, aur order tracking bhi include hona chahiye.',
    skills: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    posted: '2 hours ago',
    client: 'TechStart Pvt Ltd',
    rating: 4.8
  },
  {
    id: 2,
    title: 'Mobile App for Food Delivery',
    cat: 'Mobile App',
    budget: 120000,
    duration: '6-8 weeks',
    proposals: 24,
    desc: 'Flutter se Android + iOS food delivery app banana hai. Real-time tracking, payment integration, restaurant panel, aur rider app required. Google Maps API for live location tracking.',
    skills: ['Flutter', 'Firebase', 'Dart', 'Maps API'],
    posted: '5 hours ago',
    client: 'FoodQuick',
    rating: 4.5
  },
  {
    id: 3,
    title: 'Brand Identity & Logo Design',
    cat: 'Design',
    budget: 15000,
    duration: '1 week',
    proposals: 38,
    desc: 'Naye startup ke liye complete brand identity chahiye — logo, color palette, typography, aur brand guidelines. Multiple concepts chahiye with revisions.',
    skills: ['Figma', 'Illustrator', 'Branding'],
    posted: '8 hours ago',
    client: 'GreenLeaf Organics',
    rating: 4.9
  },
  {
    id: 4,
    title: 'SEO Optimization for SaaS Website',
    cat: 'Marketing',
    budget: 25000,
    duration: 'Ongoing',
    proposals: 8,
    desc: 'Technical SEO audit, on-page optimization, content strategy, aur monthly reporting chahiye. B2B SaaS product hai with 50+ landing pages.',
    skills: ['SEO', 'Analytics', 'Content Strategy'],
    posted: '1 day ago',
    client: 'CloudMetrics',
    rating: 4.6
  },
  {
    id: 5,
    title: 'Python Data Pipeline Development',
    cat: 'Data Science',
    budget: 90000,
    duration: '4-5 weeks',
    proposals: 6,
    desc: 'ETL pipeline banana hai Python mein — multiple data sources se data fetch karke clean aur transform karna hai. Apache Airflow use karna hai for scheduling.',
    skills: ['Python', 'Airflow', 'SQL', 'Pandas'],
    posted: '1 day ago',
    client: 'DataBridge Analytics',
    rating: 4.7
  },
  {
    id: 6,
    title: 'Technical Blog Articles (10 posts)',
    cat: 'Writing',
    budget: 20000,
    duration: '2 weeks',
    proposals: 19,
    desc: 'Tech startup ke liye 10 high-quality blog posts likhne hain. Topics: AI, cloud computing, devops. 1500+ words each with proper research.',
    skills: ['Technical Writing', 'SEO Writing', 'English'],
    posted: '2 days ago',
    client: 'DevInsight',
    rating: 4.4
  },
  {
    id: 7,
    title: 'React Native Social Media App',
    cat: 'Mobile App',
    budget: 200000,
    duration: '8-10 weeks',
    proposals: 15,
    desc: 'Social media app with stories, reels, messaging, aur real-time notifications. Backend already hai, sirf frontend chahiye with smooth animations.',
    skills: ['React Native', 'TypeScript', 'Redux', 'WebSockets'],
    posted: '2 days ago',
    client: 'SocialBuzz',
    rating: 4.3
  },
  {
    id: 8,
    title: 'Landing Page with Animations',
    cat: 'Web Development',
    budget: 8000,
    duration: '3-5 days',
    proposals: 42,
    desc: 'SaaS product ke liye stunning landing page chahiye. GSAP animations, parallax effects, aur high conversion rate design. Mobile-first approach.',
    skills: ['HTML/CSS', 'GSAP', 'JavaScript', 'Figma'],
    posted: '3 days ago',
    client: 'LaunchPad',
    rating: 4.9
  }
];

// ===== FREELANCERS DATA =====
const FREELANCERS = [
  {
    id: 1, name: 'Priya Sharma', title: 'Senior UI/UX Designer',
    rate: 2500, rating: 4.9, reviews: 87, earned: '₹18.5L',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'Design Systems'],
    avatar: 'PS', color: 'var(--accent)', available: true,
    location: 'Mumbai', completed: 124
  },
  {
    id: 2, name: 'Arjun Patel', title: 'Full Stack Developer',
    rate: 3000, rating: 4.8, reviews: 112, earned: '₹32L',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    avatar: 'AP', color: 'var(--blue)', available: true,
    location: 'Bangalore', completed: 198
  },
  {
    id: 3, name: 'Neha Gupta', title: 'Flutter Developer',
    rate: 2200, rating: 4.7, reviews: 64, earned: '₹12L',
    skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
    avatar: 'NG', color: 'var(--purple)', available: false,
    location: 'Delhi', completed: 76
  },
  {
    id: 4, name: 'Rahul Verma', title: 'Python Data Scientist',
    rate: 3500, rating: 4.9, reviews: 93, earned: '₹28L',
    skills: ['Python', 'ML', 'TensorFlow', 'SQL'],
    avatar: 'RV', color: 'var(--orange)', available: true,
    location: 'Hyderabad', completed: 156
  },
  {
    id: 5, name: 'Sneha Kulkarni', title: 'Content Strategist',
    rate: 1500, rating: 4.6, reviews: 48, earned: '₹6.8L',
    skills: ['SEO Writing', 'Content Strategy', 'Copywriting'],
    avatar: 'SK', color: 'var(--pink)', available: true,
    location: 'Pune', completed: 89
  },
  {
    id: 6, name: 'Vikram Singh', title: 'DevOps Engineer',
    rate: 4000, rating: 4.8, reviews: 71, earned: '₹24L',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    avatar: 'VS', color: 'var(--accent)', available: false,
    location: 'Chennai', completed: 134
  },
  {
    id: 7, name: 'Ananya Reddy', title: 'React Native Developer',
    rate: 2800, rating: 4.7, reviews: 56, earned: '₹15L',
    skills: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    avatar: 'AR', color: 'var(--blue)', available: true,
    location: 'Hyderabad', completed: 92
  },
  {
    id: 8, name: 'Karthik Nair', title: 'SEO Specialist',
    rate: 1800, rating: 4.5, reviews: 39, earned: '₹5.2L',
    skills: ['SEO', 'Analytics', 'Link Building', 'SEM'],
    avatar: 'KN', color: 'var(--orange)', available: true,
    location: 'Kochi', completed: 67
  }
];