import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { Skills } from '../../components/skills/skills';
import { Projects } from '../../components/projects/projects';
import { Terminal } from '../../components/terminal/terminal';
import { Achievements } from '../../components/achievements/achievements';
import { Education } from '../../components/education/education';
import { Certifications } from '../../components/certifications/certifications';
import { Contact } from '../../components/contact/contact';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [
    Navbar,
    Hero,
    About,
    Skills,
    Projects,
    Terminal,
    Achievements,
    Education,
    Certifications,
    Contact,
    Footer
  ],
  standalone: true
})
export class Home {}
