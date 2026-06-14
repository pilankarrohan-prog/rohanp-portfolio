import { Component, ElementRef, ViewChild, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TerminalLine {
  text: string;
  isHtml: boolean;
}

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss',
  imports: [FormsModule],
  standalone: true
})
export class Terminal implements OnInit {
  @ViewChild('terminalScreen') private screenRef!: ElementRef<HTMLDivElement>;
  
  readonly currentDate = signal('---');
  readonly commandLogs = signal<TerminalLine[]>([]);
  cmdInput = '';

  private readonly commandMap: Record<string, string> = {
    'help': `
<div class="terminal-table">
    <div class="terminal-row">
        <div class="terminal-cell cmd-name">about</div>
        <div class="terminal-cell">Summary of professional profile</div>
    </div>
    <div class="terminal-row">
        <div class="terminal-cell cmd-name">skills</div>
        <div class="terminal-cell">Return active developer systems & skills</div>
    </div>
    <div class="terminal-row">
        <div class="terminal-cell cmd-name">projects</div>
        <div class="terminal-cell">List of deployed project artifacts</div>
    </div>
    <div class="terminal-row">
        <div class="terminal-cell cmd-name">achievements</div>
        <div class="terminal-cell">Academic and community milestones</div>
    </div>
    <div class="terminal-row">
        <div class="terminal-cell cmd-name">clear</div>
        <div class="terminal-cell">Clear terminal buffer nodes</div>
    </div>
</div>`,
    'about': `<div class="terminal-line"><span class="text-blue">Profile:</span> Rohan Pilankar</div>
<div class="terminal-line"><span class="text-blue">Location:</span> Pune, Maharashtra, India</div>
<div class="terminal-line"><span class="text-blue">Summary:</span> AI & Data Science student passionate about software development, web technologies, data analytics, and machine learning. Experienced in Java, C++, Python, Angular, Firebase, Linux, and modern web development. Actively building projects and exploring AI-driven solutions.</div>`,
    'skills': `<div class="terminal-line"><span class="text-purple">[Languages]</span> Java, C++, Python, TypeScript</div>
<div class="terminal-line"><span class="text-purple">[AI & Science]</span> Machine Learning, Data Analytics, Statistical Modeling</div>
<div class="terminal-line"><span class="text-purple">[Web Dev]</span> Angular, Firebase, HTML5 & CSS3, Modern Responsive Design</div>
<div class="terminal-line"><span class="text-purple">[Systems & Tools]</span> Linux Command Line, Git & GitHub, SQL & Databases</div>`,
    'projects': `<div class="terminal-line"><span class="text-blue">1. LabourLink</span> - A platform that connects workers and employers, helping users find jobs, hire workers, and manage labor-related opportunities efficiently. [Angular, TypeScript, Firebase, HTML, CSS]</div>`,
    'achievements': `<div class="terminal-line">- College Ambassador at Techfest IIT Bombay (Lead tech campaigns)</div>
<div class="terminal-line">- Rank Under 6000 (Entrance percentile validation)</div>
<div class="terminal-line">- Actively participated in multiple hackathons and national level dev challenges</div>
<div class="terminal-line">- Certifications in Machine Learning structures and Advanced Java algorithms</div>`
  };

  ngOnInit() {
    this.currentDate.set(new Date().toLocaleString('en-US', { timeZoneName: 'short' }));
  }

  onCommandSubmit() {
    const cmd = this.cmdInput.trim();
    if (!cmd) return;
    this.processCommand(cmd);
    this.cmdInput = '';
  }

  processCommand(rawCmd: string) {
    const cleanCmd = rawCmd.trim().toLowerCase();
    
    if (cleanCmd === 'clear') {
      this.commandLogs.set([]);
      return;
    }

    const logs = [...this.commandLogs()];
    
    // Add command echo
    logs.push({
      text: `<span class="terminal-prompt">rohan@cyber-node:~$</span> <span class="text-white">${rawCmd}</span>`,
      isHtml: true
    });

    let reply = '';
    if (this.commandMap.hasOwnProperty(cleanCmd)) {
      reply = this.commandMap[cleanCmd];
    } else {
      reply = `<div class="terminal-line text-red">System command error: '${cleanCmd}' not found. Type <span class="text-blue">help</span> for assistance.</div>`;
    }

    logs.push({ text: reply, isHtml: true });
    this.commandLogs.set(logs);
    
    // Schedule scroll down
    setTimeout(() => this.scrollToBottom(), 50);
  }

  private scrollToBottom() {
    if (this.screenRef) {
      const el = this.screenRef.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}
