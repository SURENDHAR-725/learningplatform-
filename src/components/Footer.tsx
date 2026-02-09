import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card/50">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground mb-4">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            NexusLearn
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The next-generation learning platform powered by AI. Master skills, earn certifications, and advance your career.
          </p>
        </div>
        {[
          { title: "Platform", links: ["Courses", "Mock Tests", "Career Hub", "Pricing"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          { title: "Support", links: ["Help Center", "Community", "Privacy", "Terms"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-semibold text-foreground mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
        © 2026 NexusLearn. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
