export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  students: number;
  duration: string;
  price: number;
  lessons: number;
  tags: string[];
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "AWS Solutions Architect Professional",
    description: "Master cloud architecture patterns, design highly available systems, and prepare for the AWS SAP certification.",
    instructor: "Sarah Chen",
    thumbnail: "",
    category: "Cloud Computing",
    level: "Advanced",
    rating: 4.9,
    students: 12400,
    duration: "42h",
    price: 89.99,
    lessons: 186,
    tags: ["AWS", "Cloud", "DevOps"],
  },
  {
    id: "2",
    title: "Full-Stack React & Node.js Masterclass",
    description: "Build production-ready apps with React, TypeScript, Node.js, and PostgreSQL from scratch.",
    instructor: "Marcus Rodriguez",
    thumbnail: "",
    category: "Web Development",
    level: "Intermediate",
    rating: 4.8,
    students: 28300,
    duration: "56h",
    price: 79.99,
    lessons: 240,
    tags: ["React", "Node.js", "TypeScript"],
  },
  {
    id: "3",
    title: "Machine Learning with Python",
    description: "From linear regression to deep learning — build real ML models with scikit-learn and TensorFlow.",
    instructor: "Dr. Aisha Patel",
    thumbnail: "",
    category: "Data Science",
    level: "Intermediate",
    rating: 4.7,
    students: 19800,
    duration: "38h",
    price: 94.99,
    lessons: 156,
    tags: ["Python", "ML", "AI"],
  },
  {
    id: "4",
    title: "Kubernetes & Container Orchestration",
    description: "Deploy, scale, and manage containerized applications with Kubernetes in production.",
    instructor: "James O'Brien",
    thumbnail: "",
    category: "DevOps",
    level: "Advanced",
    rating: 4.8,
    students: 8700,
    duration: "28h",
    price: 69.99,
    lessons: 120,
    tags: ["Kubernetes", "Docker", "DevOps"],
  },
  {
    id: "5",
    title: "UI/UX Design Fundamentals",
    description: "Learn design thinking, Figma, prototyping, and create stunning user experiences.",
    instructor: "Yuki Tanaka",
    thumbnail: "",
    category: "Design",
    level: "Beginner",
    rating: 4.6,
    students: 34200,
    duration: "24h",
    price: 49.99,
    lessons: 98,
    tags: ["Design", "Figma", "UX"],
  },
  {
    id: "6",
    title: "Cybersecurity & Ethical Hacking",
    description: "Master penetration testing, network security, and prepare for CompTIA Security+ certification.",
    instructor: "Alex Kim",
    thumbnail: "",
    category: "Security",
    level: "Intermediate",
    rating: 4.9,
    students: 15600,
    duration: "45h",
    price: 99.99,
    lessons: 198,
    tags: ["Security", "Hacking", "CompTIA"],
  },
];

export const categories = [
  "All",
  "Web Development",
  "Cloud Computing",
  "Data Science",
  "DevOps",
  "Design",
  "Security",
];
