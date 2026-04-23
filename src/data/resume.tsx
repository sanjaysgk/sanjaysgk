import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { ReactNative } from "@/components/ui/svgs/reactNative";
import { FastAPI } from "@/components/ui/svgs/fastapi";
import { SQL } from "@/components/ui/svgs/sql";
import { Nextflow } from "@/components/ui/svgs/nextflow";
import { Snakemake } from "@/components/ui/svgs/snakemake";
import { Slurm } from "@/components/ui/svgs/slurm";
import { Bioinformatics } from "@/components/ui/svgs/bioinformatics";
import { PyTorch } from "@/components/ui/svgs/pytorch";
import { TensorFlow } from "@/components/ui/svgs/tensorflow";
import { ScikitLearn } from "@/components/ui/svgs/scikitlearn";
import { HuggingFace } from "@/components/ui/svgs/huggingface";
import { Pandas } from "@/components/ui/svgs/pandas";
import { NumPy } from "@/components/ui/svgs/numpy";
import { SciPy } from "@/components/ui/svgs/scipy";
import { Matplotlib } from "@/components/ui/svgs/matplotlib";
import { Jupyter } from "@/components/ui/svgs/jupyter";

export const DATA = {
  name: "Sanjay",
  initials: "S",
  url: "https://sanjaysgk.vercel.app",
  location: "Melbourne, Australia",
  locationLink: "https://www.google.com/maps/place/Melbourne+VIC+Australia",
  description:
    "Researcher, builder, and aspiring entrepreneur. Turning scientific curiosity into research, products, and everything in between.",
  summary:
    "Curious by nature, builder by obsession. I can't help but ask *why*  and then immediately start building the answer. By day I work as a bioinformatician at Monash University, researching cancer genomics and immunopeptidomics. By night, I'm shipping side projects and hunting for the next problem worth solving. In the past, [I completed a Master of Data Science at Monash](/#education), worked as a Data Scientist and Analyst across healthtech and startups, and participated in Monash's Startup Validator program. I'm currently building [Scrollpaper](/#projects) (swipe through science, not social media), [LabScrib](/#projects) (turning lab meetings into actionable insights), and a SaaS platform making bioinformatics pipelines less painful.",
  avatarUrl: "/me.png",
  skillCategories: [
    {
      category: "Dev",
      skills: [
        { name: "React", icon: ReactLight },
        { name: "React Native", icon: ReactNative },
        { name: "Next.js", icon: NextjsIconDark },
        { name: "TypeScript", icon: Typescript },
        { name: "Python", icon: Python },
        { name: "FastAPI", icon: FastAPI },
        { name: "SQL", icon: SQL },
        { name: "PostgreSQL", icon: Postgresql },
        { name: "Docker", icon: Docker },
      ],
    },
    {
      category: "AI / ML",
      skills: [
        { name: "PyTorch", icon: PyTorch },
        { name: "TensorFlow", icon: TensorFlow },
        { name: "Scikit-learn", icon: ScikitLearn },
        { name: "Hugging Face", icon: HuggingFace },
        { name: "Pandas", icon: Pandas },
        { name: "NumPy", icon: NumPy },
      ],
    },
    {
      category: "Data / Workflows",
      skills: [
        { name: "Nextflow", icon: Nextflow },
        { name: "Snakemake", icon: Snakemake },
        { name: "SLURM", icon: Slurm },
      ],
    },
    {
      category: "Bioinformatics & Proteomics",
      skills: [
        { name: "STAR", icon: Bioinformatics },
        { name: "GATK", icon: Bioinformatics },
        { name: "MaxQuant", icon: Bioinformatics },
        { name: "MSFragger", icon: Bioinformatics },
        { name: "NetMHCpan", icon: Bioinformatics },
        { name: "OpenMS", icon: Bioinformatics },
        { name: "AlphaFold", icon: Bioinformatics },
      ],
    },
    {
      category: "Scientific Computing",
      skills: [
        { name: "SciPy", icon: SciPy },
        { name: "Matplotlib", icon: Matplotlib },
        { name: "Seaborn", icon: Matplotlib },
        { name: "Biopython", icon: Python },
        { name: "Jupyter", icon: Jupyter },
      ],
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/sanjaysgk",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sanjaygowda6",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/SanjaySGK1",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://youtube.com/@sanjaysgk",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:sanjaysgk@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Monash University",
      href: "https://www.monash.edu",
      badges: [],
      location: "Melbourne, Australia",
      title: "Research Assistant (Bioinformatician)",
      logoUrl: "/monash.png",
      start: "March 2024",
      end: "Present",
      description:
        "Developing computational pipelines for cancer neoantigen discovery and immunopeptidomics research. Building the CANELIB/CAN-IMMUNE platform spanning 33 cancer types and 6.7M+ mutations. Working across proteomics, genomics, and HPC workflows on the Monash M3 cluster.",
    },
    {
      company: "Eastern Health",
      href: "https://www.easternhealth.org.au",
      badges: [],
      location: "Melbourne, Australia",
      title: "Data Analyst",
      logoUrl: "/easternhealth.png",
      start: "2023",
      end: "2023",
      description:
        "Analysed clinical and operational data to support performance reporting and decision-making across hospital services.",
    },
    {
      company: "Audacix",
      href: "https://audacix.com",
      badges: [],
      location: "Melbourne, Australia",
      title: "Data Scientist",
      logoUrl: "/audacix.png",
      start: "2022",
      end: "2023",
      description:
        "Built a business plan recommendation system using NLP and collaborative filtering on ASX 50 data. Developed machine learning models to surface actionable insights for clients.",
    },
  ],
  education: [
    {
      school: "Monash University",
      href: "https://www.monash.edu",
      degree: "Master of Science, Data Science",
      logoUrl: "/monash.png",
      start: "Feb 2022",
      end: "Dec 2023",
    },
    {
      school: "Coursera",
      href: "https://www.coursera.org",
      degree: "Professional Certificates — Deep Learning Specialisation, Big Data, MLOps",
      logoUrl: "/coursera.svg",
      start: "2020",
      end: "2022",
    },
    {
      school: "Bangalore Institute of Technology",
      href: "https://bit-bangalore.edu.in",
      degree: "Bachelor of Engineering",
      logoUrl: "/bit.png",
      start: "2017",
      end: "2020",
    },
  ],
  projects: [
    {
      title: "Scrollpaper",
      href: "https://scrollpaper.com",
      dates: "2025 – Present",
      active: true,
      category: "Products" as const,
      description:
        "Frustrated by how hard it is to keep up with research? I built Scrollpaper to distill scientific papers into bite-sized daily reads — swipe through science, not social media.",
      technologies: [
        "React Native",
        "Expo",
        "FastAPI",
        "Python",
        "PostgreSQL",
        "Gemini AI",
        "AWS Lambda",
      ],
      links: [
        {
          type: "Website",
          href: "https://scrollpaper.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/scrollpaper.png",
      video: "",
    },
    {
      title: "LabScribe",
      href: "https://github.com/sanjaysgk/LabScribe",
      dates: "Feb 2026 - Present",
      active: true,
      category: "Products" as const,
      description:
        "An iOS voice recording and AI-powered transcription app for academics, researchers, and students. Records audio, transcribes using Google Gemini AI, and rewrites notes in multiple styles — lab notes, summaries, action items, and more.",
      technologies: [
        "SwiftUI",
        "Swift",
        "SwiftData",
        "AVFoundation",
        "Google Gemini API",
        "Groq API",
        "watchOS",
        "iOS Keychain",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/sanjaysgk/LabScribe",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "CAN-IMMUNE",
      href: "https://canelib.erc.monash.edu/index",
      dates: "2026",
      active: true,
      category: "Research" as const,
      description:
        "Cancer immunotherapy needs better neoantigen targets. I built CAN-IMMUNE, a comprehensive platform documenting 1.2M+ mutant peptides across 33 cancer types and 1,460 cell lines, enabling researchers to generate bespoke cancer-specific libraries for LC-MS/MS neoantigen discovery.",
      technologies: [
        "Python",
        "Flask",
        "MySQL",
        "Elasticsearch",
        "NetMHCpan",
        "MSFragger",
      ],
      links: [
        {
          type: "Website",
          href: "https://canelib.erc.monash.edu/index",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/canimmune.png",
      images: [
        "/canimmune.png",
        "/canimmune-rnaseq.png",
        "/canimmune-table.png",
        "/canimmune-hla-tcr.png",
        "/canimmune-workflow.png",
        "/canimmune-suppl.png",
      ],
      video: "",
    },
    {
      title: "Immunolyser",
      href: "https://spj.science.org/doi/10.1016/j.csbj.2025.10.007",
      dates: "2023",
      active: true,
      category: "Research" as const,
      description:
        "Immunopeptidomics data analysis lacks standardisation. Immunolyser is an automated web-based pipeline that brings together peptide length distribution, motif analysis, sequence clustering, and MHC binding affinity prediction in one reproducible workflow. Published in Computational and Structural Biotechnology Journal.",
      technologies: [
        "Python",
        "Web-based",
        "NetMHCpan",
        "GibbsCluster",
      ],
      links: [
        {
          type: "Website",
          href: "https://immunolyser.erc.monash.edu/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Paper",
          href: "https://spj.science.org/doi/10.1016/j.csbj.2025.10.007",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "PubMed",
          href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12590289/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/immunolyser-fig1.jpg",
      images: [
        "/immunolyser-fig1.jpg",
        "/immunolyser-fig2.jpg",
        "/immunolyser-fig3.jpg",
        "/immunolyser-fig4.jpg",
      ],
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Where It All Converges",
      dates: "Mar 2024 – Present",
      location: "Monash BDI, Clayton",
      description:
        "Research Assistant (Bioinformatician) at Monash Biomedicine Discovery Institute. Researching cancer neoantigens. Building Scrollpaper, LabScrib, and an omics SaaS on the side.",
      image: "/monash.png",
      links: [] as { title: string; icon: React.ReactNode; href: string }[],
    },
    {
      title: "Industry",
      dates: "2023",
      location: "Melbourne, Australia",
      description:
        "Data Scientist at Audacix and Data Analyst at Eastern Health. Applied ML to real-world healthcare problems.",
      image: "/audacix.png",
      links: [] as { title: string; icon: React.ReactNode; href: string }[],
    },
    {
      title: "Monash University",
      dates: "Feb 2022 – Dec 2023",
      location: "Melbourne, Australia",
      description:
        "Master of Data Science. Confirmed the path — science, data, and building things that matter.",
      image: "/monash.png",
      links: [] as { title: string; icon: React.ReactNode; href: string }[],
    },
    {
      title: "Self-Taught Developer",
      dates: "2017 – 2020",
      location: "Bangalore, India",
      description:
        "Transitioned from AutoCAD and STAAD Pro to Python, ML, and data science through 50+ online courses and certifications.",
      image: "/coursera.png",
      links: [] as { title: string; icon: React.ReactNode; href: string }[],
    },
    {
      title: "The Spark",
      dates: "2016",
      location: "Bangalore, India",
      description:
        "Discovered programming as a civil engineering student. Built my first app and never looked back.",
      image: "/bit.png",
      links: [] as { title: string; icon: React.ReactNode; href: string }[],
    },
  ],
} as const;
