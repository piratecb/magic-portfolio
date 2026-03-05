import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Bernardo",
  lastName: "Carvalheiro",
  name: `Bernardo Carvalheiro`,
  role: "Full-Stack Developer | Linux & Infrastructure",
  avatar: "/images/avatar.jpg",
  email: "b.carvalheiro@proton.me",
  location: "Europe/Lisbon", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Portuguese", "English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/piratecb",
    essential: true,
  },
  /*
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "",
    essential: false,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "/",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "",
    essential: false,
  },*/
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home-v2.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Bernardo Carvalheiro</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Open to work</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          View Projects
        </Text>
      </Row>
    ),
    href: "/work/my-project-template",
  },
  subline: (
    <>
    Full-stack developer with hands-on experience in <Text as="span" size="xl" weight="strong">Linux</Text> environments,
    system monitoring and backend architecture.
    Focused on building reliable and maintainable systems.
</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
      I'm a full-stack developer with a strong interest in Linux systems,
      infrastructure and backend architecture. 
      Currently gaining experience in system monitoring and operational workflows
      in a professional environment.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Kyndryl",
        timeframe: "2026 - Present",
        role: "IT Intern – Systems Monitoring",
        achievements: [
        <>Monitoring scheduled jobs and system processes in production environment.</>,
        <>Observing system behavior and identifying recurring failure patterns.</>,
        <>Executing operational workflows and reporting system incidents.</>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Kyndryl – IT Systems Monitoring dashboard",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Hipercálculo II",
        timeframe: "2023 - 2023",
        role: "Technician Intern",
        achievements: [
          <>
            Repair of computers and other electronic devices, diagnosing hardware and software issues, replacing faulty components, and ensuring proper functionality.
          </>,
          <>
            Customer assisting, installation of Ubiquiti APs and Server Rack assembly.
          </>,
        ],
        images: [],
      },
      {
        company: "Catering Company",
        timeframe: "2022 - Present",
        role: "Waiter",
        achievements: [
          <>
            Provided excellent customer service in a fast-paced environment, consistently.
            Events, Weddings.
          </>,
          <>
            Collaborated with team members to ensure smooth operations and customer satisfaction.
          </>,
        ],
        images: [],
      },
      
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "High School Jácome Ratton",
        description: <>IT Technician - Systems.</>,
      },
      {
        name: "Institute Polytechnic of Tomar",
        description: <>Information Systems Technologies and Programming.</>,
      }

    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Backend & Full-Stack",
        description: (
          <>Experience building full-stack applications using modern web technologies.</>
        ),
        tags: [
          { name: "Next.js", icon: "nextjs" },
          { name: "Node.js", icon: "javascript" },
          { name: "PostgreSQL", icon: "database" },
          { name: "Supabase", icon: "supabase" },
          { name: "C", icon: "C" },
          { name: "Python", icon: "python" },
          { name: "Java", icon: "java" },
          { name: "Strapi", icon: "strapi" },
          { name: "HTML", icon: "html" },
          { name: "CSS", icon: "css" },
          { name: "PHP", icon: "php" },
          { name: "Tailwind CSS", icon: "tailwind" },
          { name: "Power Apps", icon: "powerApps" },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Next.js",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Supabase dashboard",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Linux & Systems",
        description: (
          <>Experience working with Linux systems and infrastructure.</>
        ),
        tags: [
          {
            name: "Linux",
            icon: "linux",
          },
          {
            name: "Bash",
            icon: "bash",
          },
          {
            name: "Nginx",
            icon: "nginx",
          },
          {
            name: "Docker",
            icon: "docker",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Linux terminal and system infrastructure environment",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Windows Server & Windows Tools",
        description: (
          <>Knowledge of Windows Server and Windows tools.</>
        ),
        tags: [
          {
            name: "Windows Server",
            icon: "windows",
          },
          {
            name: "PowerShell",
            icon: "powershell",
          },
          {
            name: "Active Directory",
            icon: "activeDirectory",
          },
          {
            name: "Debloating",
            icon: "debloating",
          },
          {
            name: "Office",
            icon: "office",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-06.jpg",
            alt: "Windows Server and Active Directory administration",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Cybersecurity",
        description: (
          <>Fundamentals of safety practices on system and networks.</>
        ),
        tags: [
          {
            name: "Fail2Ban",
            icon: "fail2ban",
          },
          {
            name: "Nmap",
            icon: "nmap",
          },
          {
            name: "Wireshark",
            icon: "wireshark",
          },
          {
            name: "John the Ripper",
            icon: "johnTheRipper",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-07.jpg",
            alt: "Cybersecurity tools – network analysis and penetration testing",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about development and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Full-stack and infrastructure projects by Bernardo Carvalheiro – Next.js, Node.js, Linux and backend systems.`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};
export { person, social, newsletter, home, about, blog, work, gallery };
