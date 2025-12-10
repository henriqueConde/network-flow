export const STRATEGIES_PAGE_CONFIG = {
    copy: {
        title: 'Strategies',
        subtitle: 'Learn proven strategies to get interviews and track your progress',
        sidebar: {
            title: 'Strategies',
        },
    },
    ui: {
        sidebar: {
            width: 280,
        },
        content: {
            maxWidth: 900,
        },
    },
} as const;

export const STRATEGIES = [
    {
        id: 'smart',
        title: 'SMART Strategy',
        description: 'Systematic approach to warm and cold referrals',
    },
    {
        id: 'recently-funded-startup',
        title: 'Recently Funded Startup',
        description: 'Target startups that recently raised money before job ads get flooded',
    },
    {
        id: 'proof-of-work-outreach',
        title: 'Proof-Of-Work Outreach',
        description: 'Stand out by fixing real problems or building with the company\'s own product',
    },
    {
        id: 'loom-email-outreach',
        title: 'Loom Email Outreach',
        description: 'High-signal emails + 1–2 minute Loom videos to get direct replies from decision-makers',
    },
    {
        id: 'job-board-lead-sniping',
        title: 'Job Board Lead Sniping (LinkedIn)',
        description: 'Use LinkedIn jobs as lead generation, not as your main application channel',
    },
    {
        id: '100-connection-week',
        title: 'The 100-Connection Week',
        description: 'A focused one-week challenge to send 100 targeted outreaches and track the funnel to interviews',
    },
] as const;

export const SMART_STRATEGY_CONFIG = {
    copy: {
        title: 'SMART Strategy',
        subtitle: 'Systematic approach to warm and cold referrals',
        sections: {
            coreIdea: {
                title: '1. Core idea in plain English',
                icon: 'lightbulb',
                content: [
                    { text: 'Referrals are the #1 fastest way to get interviews.', type: 'highlight' },
                    { text: 'Referred candidates are 4–5x more likely to get hired/interviewed.', type: 'stat' },
                    { text: 'Companies are drowning in low-quality, spammy, AI-generated applications → they trust employees more than random resumes.' },
                    { text: 'Employees often get paid (sometimes $2k–$10k) for successful referrals, so helping you is literally in their interest.', type: 'info' },
                    { text: 'Your job:' },
                    { text: '• Squeeze all possible warm referrals (people you know / are connected to)' },
                    { text: '• Then do cold outreach to people at your dream companies' },
                    { text: '• Stay organized & follow up like a pro.' },
                ],
            },
            warmReferrals: {
                title: '2. Warm referrals (people you already know)',
                steps: {
                    title: 'Step-by-step',
                    items: [
                        'Scan your LinkedIn network',
                        '• Developers',
                        '• Managers',
                        '• Recruiters',
                        '• CEOs/CTOs/founders (especially in startups)',
                        '• Anyone in tech or related companies',
                        'Message everyone relevant',
                        '• Treat every dev/manager/recruiter as a potential referral source.',
                        '• Don\'t assume "they\'re too busy" or "they wouldn\'t help."',
                        'Goal of first message',
                        '• Find out: "Is your team/company hiring?"',
                        '• If no: "Do you know anyone who is hiring that you could introduce me to?"',
                        'Always ask for introductions',
                        '• Every person you talk to = potential gateway to another person.',
                        '• Warm introductions > totally cold outreach.',
                        'Follow up smart',
                        '• Follow up every 1–2 days',
                        '• Up to 3 follow-ups (4 messages total).',
                        '• Last follow-up: the "Please don\'t ghost me, man" hack.',
                    ],
                },
                templates: {
                    title: 'Warm outreach templates',
                    wellKnown: {
                        title: '2.1. To someone you know fairly well',
                        content: `Hey [Name],

Hope you're doing well! Quick question — is your team/company currently hiring developers?

I'm working as a [your level/stack, e.g. junior full-stack dev focused on React/Node] and actively looking for opportunities. If you're hiring, I'd love to throw my hat in the ring. And if not, do you know any managers/recruiters/CTOs who might be looking that you could introduce me to?

Either way, thanks a lot!`,
                    },
                    looseConnection: {
                        title: '2.2. To a loose connection / someone you\'ve never really talked to',
                        content: `Hey [Name],

We're connected here on LinkedIn, so I thought I'd reach out. I'm a [your level/stack: e.g. junior backend developer focused on Python/Django] and I'm currently looking for new opportunities.

Are you aware of any open roles on your team or in your company right now? If not, do you know any hiring managers, recruiters or developers I could reach out to?

Thanks a lot for any help — really appreciate it.`,
                    },
                    followUps: {
                        title: '2.3. Follow-up messages (sequence)',
                        items: [
                            {
                                title: 'Follow-up 1 (after 1–2 days):',
                                content: `Hey [Name], just bumping this in case it got buried in your inbox 😊

No rush at all — would really appreciate any pointer or intro if you have one.`,
                            },
                            {
                                title: 'Follow-up 2:',
                                content: `Hey [Name], totally understand you're busy.

If you're not hiring or can't help right now, no worries — just let me know so I don't keep bothering you.`,
                            },
                            {
                                title: 'Follow-up 3 (the "hack"):',
                                content: `Please don't ghost me, man 😄

A quick "yes, no, or later" would help a lot so I know where I stand.

(You can adjust tone if you want more formal, but that casual line often triggers a reply.)`,
                            },
                        ],
                    },
                },
            },
            coldReferrals: {
                title: '3. Cold referrals (people you don\'t know yet)',
                description: 'Use this after you\'ve squeezed everything from warm contacts.',
                chooseTargets: {
                    title: '3.1. Choose your targets',
                    items: [
                        'Make a list of 20–50 dream companies.',
                        'Go to their careers page and find roles that match you.',
                        'DO NOT apply yet. First, try to get a referral.',
                    ],
                },
                findConnectionPoints: {
                    title: '3.2. Find "connection points"',
                    items: [
                        'On LinkedIn, search for people at those companies:',
                        '• Developers in your stack',
                        '• Managers / Team leads',
                        '• Recruiters',
                        'Alumni from:',
                        '• Your school/bootcamp',
                        '• Your city/country',
                        '• Shared past companies',
                        '• Shared interests, communities, tech stack, etc.',
                        'People are more likely to help if they feel, "This person is kind of like me."',
                    ],
                },
                makeProfileReferralWorthy: {
                    title: '3.3. Make your profile "referral-worthy" first',
                    beforeReachingOut: {
                        title: 'Before you reach out:',
                        items: [
                            'LinkedIn should clearly show:',
                            '• Who you are (headline & About)',
                            '• Your tech stack',
                            '• Your projects (ideally with links/GitHub)',
                            '• Clear, clean, no cringey buzzwords',
                        ],
                    },
                    assume: {
                        title: 'Assume:',
                        items: [
                            'Before referring you, they WILL open your profile and think:',
                            '"If I refer this person, will they make me look good or bad?"',
                            'If the answer is "Not sure", they won\'t refer you.',
                        ],
                    },
                },
                connectionRequest: {
                    title: '3.4. Connection request message (cold, but with common ground)',
                    goal: 'Goal: Short, genuine, shows common ground, hints that you\'re interested in their company.',
                    template: `Hey [Name],

I noticed we both [common point: e.g. studied at [School] / are from [Country] / work with [Tech stack]].

I'm a [your level/stack: e.g. junior frontend dev focused on React/TypeScript], and I've been really interested in [Company] — especially [specific thing: e.g. your work on X / your remote-first culture / tech stack].

I'd love to connect!

That's it. Short. No essay.`,
                },
                askForReferral: {
                    title: '3.5. After they accept your request: ask for the referral',
                    template: `Hey [Name], thanks for accepting my request!

I've been following [Company] for a while and I'm really impressed by [something specific: product, tech, culture, recent launch]. I saw this role that looks like a great fit for my background:

[Job title] – [link to job posting]

Would you feel comfortable referring me for this role? I'd be happy to share my CV, portfolio and a short summary of why I think I'd be a strong fit to make it as easy as possible for you.

Totally understand if you can't — either way, I really appreciate your time.`,
                    ifYes: {
                        title: 'If they say yes:',
                        content: `Amazing, thank you so much! 🙏

Here's everything you might need:

• My CV: [link/file]

• LinkedIn: [link]

• GitHub/Portfolio: [link]

• Short summary of why I'm a fit:

– [1–2 lines with relevant experience/skills]

– [1 line about why you want that company specifically]

And if there's any extra info you need from me, I'll send it right away.`,
                    },
                    ifNo: {
                        title: 'If they say no / not comfortable:',
                        content: `No worries at all — thanks for being honest and for taking the time to reply. Really appreciate it. If you ever hear about other opportunities that might fit my profile, I'd be grateful if you kept me in mind.`,
                    },
                },
            },
            dailyRoutine: {
                title: '4. Daily routine (1 hour a day)',
                description: 'You mentioned 1 hour/day. Here\'s a clean breakdown:',
                everyDay: {
                    title: 'Every day:',
                    items: [
                        '30 min – Warm outreach & follow-ups',
                        '• Message 20+ people from your existing network.',
                        '• Follow up with people who:',
                        '  - Accepted your request but didn\'t reply',
                        '  - Replied but didn\'t answer your last question',
                        '30 min – Cold outreach',
                        '• Pick 3–5 people at your target companies.',
                        '• Send personalized connection requests (with common ground).',
                        '• After they accept, send the referral message above.',
                    ],
                },
            },
            howToTrackInApp: {
                title: '5. How to track this strategy in Network Flow',
                icon: 'track_changes',
                description: 'Network Flow makes it easy to track your SMART strategy outreach. Here\'s how:',
                step1: {
                    title: 'Step 1: Create contacts for each person you reach out to',
                    icon: 'person_add',
                    link: { text: 'Go to Contacts page', route: '/contacts' },
                    items: [
                        { text: 'Go to the Contacts page (click "Contacts" in the top navigation).', link: '/contacts' },
                        { text: 'Click "Create Contact" to add a new person.' },
                        { text: 'Fill in their basic info: name, LinkedIn URL, company, role.' },
                        { text: 'In the "Strategy Tracking" section:' },
                        { text: '  • Select "SMART Strategy" from the Strategies dropdown' },
                        { text: '  • Choose "Warm" or "Cold" based on whether you know them' },
                        { text: '  • Add any "Common Ground" (shared school, city, tech stack, etc.)' },
                        { text: '  • Set "Contact Type" (e.g., Developer, Manager, Recruiter)' },
                    ],
                },
                step2: {
                    title: 'Step 2: Track connection lifecycle',
                    icon: 'link',
                    items: [
                        { text: 'When you send a connection request, update the contact:' },
                        { text: '  • Set "Connection Request Sent At" to today\'s date' },
                        { text: '  • Set "Connection Status" to "Request Sent"' },
                        { text: 'When they accept:' },
                        { text: '  • Set "Connection Accepted At" to the acceptance date' },
                        { text: '  • Update "Connection Status" to "Connected"' },
                        { text: 'When you send your first DM:' },
                        { text: '  • Set "DM Sent At" to today\'s date' },
                        { text: '  • Set "First Message Date" if this is your first outreach' },
                    ],
                },
                step3: {
                    title: 'Step 3: Create conversations and track follow-ups',
                    icon: 'chat_bubble_outline',
                    link: { text: 'Go to Conversations page', route: '/conversations' },
                    items: [
                        { text: 'For each contact, create a Conversation (go to Conversations page or from the contact detail page).', link: '/conversations' },
                        { text: 'Paste the message thread from LinkedIn into the conversation.' },
                        { text: 'In the conversation detail page, you can track:' },
                        { text: '  • Message status: Click the status chip on your messages to toggle between "Pending" (not sent yet) and "Confirmed" (already sent)' },
                        { text: '  • To see if they replied: Check if there are messages from the contact in the conversation thread' },
                        { text: '  • Add notes about the conversation progress in the Notes section' },
                        { text: 'Automatic follow-ups: The system will automatically remind you to follow up on conversations where the contact hasn\'t replied. You\'ll get reminders every 2 days, up to 3 follow-ups per conversation. View your pending follow-ups in the Follow-ups page.', link: { text: 'Go to Follow-ups page', route: '/followups' } },
                    ],
                },
                step4: {
                    title: 'Step 4: Track referrals',
                    icon: 'handshake',
                    items: [
                        { text: 'When someone gives you a referral:' },
                        { text: '  • Go to the contact detail page', link: '/contacts' },
                        { text: '  • Check "Referral Given"' },
                        { text: '  • Set "Referral Given At" to today\'s date' },
                        { text: '  • Add details about the referral in "Referral Details"' },
                    ],
                },
                step5: {
                    title: 'Step 5: Filter and analyze your progress',
                    icon: 'filter_list',
                    items: [
                        { text: 'Use the Contacts page filters to:', link: '/contacts' },
                        { text: '  • Filter by "Warm" or "Cold" to see your outreach mix' },
                        { text: '  • Filter by "Connection Status" to see who hasn\'t accepted yet' },
                        { text: '  • Filter by strategy to see all SMART strategy contacts' },
                        { text: 'Use the Conversations page to:', link: '/conversations' },
                        { text: '  • See which conversations need follow-ups' },
                        { text: '  • Track response rates and engagement' },
                    ],
                },
                tip: {
                    text: 'Pro tip: Link contacts to companies (if the company exists in your Companies list) to get a complete view of all your outreach at each target company.',
                    link: { text: 'Go to Companies page', route: '/companies' },
                    type: 'info',
                },
            },
        },
    },
} as const;

export const RECENTLY_FUNDED_STARTUP_STRATEGY_CONFIG = {
    copy: {
        title: 'Recently Funded Startup',
        subtitle: 'Target startups that recently raised money before job ads get flooded',
        sections: {
            whatItIs: {
                title: '1. What this strategy actually is',
                goal: {
                    title: 'Goal:',
                    icon: 'flag',
                    content: 'Get interviews by targeting startups that recently raised money (especially Series A/B), before they post public job ads or before those ads get flooded.',
                    type: 'goal',
                },
                whyItWorks: {
                    title: 'Why it works:',
                    icon: 'check_circle',
                    items: [
                        { text: 'Fresh funding ⇒ they need to hire engineers soon', type: 'highlight' },
                        { text: 'Less competition ⇒ you\'re not 1 of 1,000 applicants', type: 'highlight' },
                        { text: 'Startups are more flexible on requirements (years of experience, background)' },
                        { text: 'Interviews are usually faster, more practical, less LeetCode-heavy' },
                    ],
                },
                note: {
                    text: 'This is basically the "Code Vendor job strategy": you find startups right after they raise, then reach out directly to decision-makers instead of sitting on job boards.',
                    type: 'info',
                },
            },
            workflow: {
                title: '2. Step-by-step workflow',
                description: 'You can think of it as a loop:',
                prep: {
                    title: 'Prep (one-time, but keep improving)',
                    items: [
                        'Optimize your LinkedIn:',
                        '• Good, clear profile photo',
                        '• Strong headline that shows your role/stack',
                        '• About section, experience, projects, links (GitHub/portfolio)',
                        'When someone clicks your profile, they should immediately think:',
                        '"This person is clearly a [X] developer and looks serious."',
                        'If your profile isn\'t solid, this strategy loses a lot of power.',
                    ],
                },
                findStartups: {
                    title: 'Find recently funded startups (weekly)',
                    items: [
                        'Use:',
                        '• Funding databases (e.g. Crunchbase)',
                        '• Funding lists / newsletters (e.g. "startups that raised funding this month")',
                        '• Simple Google searches like:',
                        '  - "startups who got funding recently USA"',
                        '  - Or swap "USA" for your target country/region',
                        'Look for pages that show a table/list of companies with:',
                        '• Funding date',
                        '• Industry',
                        '• Country',
                        '• Funding amount',
                        '• Round (Seed, Series A, Series B, etc.)',
                        'Filters / preferences:',
                        '• Funding in the last 3 months (up to 12 months max if needed)',
                        '• Prefer Series A/B for more stability and better comp, but don\'t ignore others',
                        '• Filter by industry you care about (fintech, health, AI, creator economy, databases, etc.)',
                        'Build a list of ~100 target startups in a spreadsheet or inside your app.',
                    ],
                },
                forEachStartup: {
                    title: 'For each startup (fast pass, ~1–2 min each)',
                    items: [
                        'Open their website',
                        'Look for Careers / Jobs / Join us',
                        'Check if they have a role that\'s even roughly relevant:',
                        '• If yes → Apply, even if you don\'t tick all boxes',
                        '  Startups often treat requirements as a "wish list", not a strict filter.',
                        '• If no → Great, this is where you can be early. Still proceed to outreach.',
                        'Sometimes there\'s no careers page, only an email like "jobs@company.com". That\'s fine — you\'ll still go to LinkedIn and find people.',
                    ],
                },
                findDecisionMakers: {
                    title: 'Find hiring decision-makers on LinkedIn',
                    items: [
                        'For each company:',
                        '• Go to their LinkedIn company page → People tab',
                        '• Look for titles like:',
                        '  - "Engineering Manager", "Head of Engineering", "CTO", "VP Engineering"',
                        '  - "Technical Recruiter", "Talent Acquisition", "HR"',
                        '  - For small startups: CEO / CTO / founders, "Chief of Staff", etc.',
                        '• You can reach out to multiple people at the same company if needed.',
                        'Add them all to your outreach list.',
                    ],
                },
                sendConnectionRequests: {
                    title: 'Send connection requests with a short note (3 sentences)',
                    items: [
                        'Use a simple 3-part structure:',
                        'You – who you are',
                        '• Role + stack, optionally location',
                        '• Example: "I\'m a full-stack developer focused on React/Next.js based in NYC."',
                        'Why them – show you did some research',
                        '• Mention their recent funding',
                        '• Mention something specific: product, industry, tech, creator economy, AI, Postgres, etc.',
                        '• Add one little unique element about you that fits them:',
                        '  - "I\'ve built several AI projects."',
                        '  - "I\'ve worked a lot with Postgres."',
                        '  - "I\'m very interested in tools for creators / healthcare / data infra."',
                        'Clear ask – don\'t be vague',
                        '• If they have a job:',
                        '  "I saw you\'re hiring for [role] — I just applied and was wondering if you\'d be open to a quick call."',
                        '• If they don\'t have a visible job yet:',
                        '  "I was wondering if you\'re hiring or planning to grow the engineering team."',
                        'Keep it short, honest, and obviously about jobs. This is not about months of small talk.',
                        'Hint: LinkedIn free accounts limit how many personalized invites you can send.',
                        'You can:',
                        '• Use LinkedIn Premium\'s free trial to send more notes, and',
                        '• In many cases, get extended trials as a student or by asking support if you\'re job hunting.',
                    ],
                },
                convertToConversations: {
                    title: 'Convert accepted requests into conversations',
                    items: [
                        'If they accept but don\'t send a message:',
                        '• That\'s a lead, not a finished step.',
                        '• You send a DM.',
                        'Your goal in the DM is to move toward a clear next step:',
                        '• "Are you hiring engineers at the moment, or planning to soon?"',
                        '• "Can I send you my CV/GitHub so you can see if there might be a fit?"',
                        '• "Would you be open to a quick call to see if there\'s alignment?"',
                        'You can test variations:',
                        '• Sometimes asking for a quick call works better.',
                        '• Sometimes asking "Are you hiring?" is enough.',
                        'The key is: be clear and job-focused.',
                    ],
                },
                followUp: {
                    title: 'Follow up + analyze weekly',
                    items: [
                        'People are busy and get distracted. A lot of "no replies" are just "I forgot".',
                        'Follow up with people who:',
                        '• Accepted your request but didn\'t answer your DM',
                        '• Replied once but then went quiet',
                        'Once a week, check your numbers:',
                        '• How many companies did you target?',
                        '• How many people did you reach out to?',
                        '• How many accepted your connection?',
                        '• How many replied to your DMs?',
                        '• How many interviews did this produce?',
                        'Then tweak:',
                        '• Few accepts → maybe your profile or connection note is weak.',
                        '• Many accepts but few replies → your DM / ask might be weak or unclear.',
                        '• Many chats but few interviews → your ask is too vague or too passive (not moving toward calls/referrals).',
                        'The idea is not to blindly message 100 people. It\'s to improve your funnel each week.',
                    ],
                },
            },
            templates: {
                title: '3. Message templates you can actually use',
                description: 'You can adapt these 1:1 in your app as templates.',
                connectionRequest: {
                    title: '3.1. Connection request to a hiring manager / founder',
                    context: 'Context: Startup recently raised a round; you\'re reaching out to a manager, recruiter, or founder.',
                    template: `Hi [Name], congrats on the recent [round type, e.g. Series A] at [Company] 🎉

I'm a [your level + stack, e.g. junior full-stack developer focused on React/Node] based in [city/country], and I really like what you're building around [product/space].

I'm wondering if you're looking to grow your engineering team in the next months — I'd love to stay on your radar for any opportunities.`,
                    note: 'Short, clear, obviously about jobs.',
                },
                ifTheyAccept: {
                    title: '3.2. If they accept your request but don\'t message',
                    template: `Hey [Name], thanks for accepting my request!

I've been following [Company] since your recent [round/funding news] and I'm really excited about what you're doing in [space]. I work as a [your level + stack] and I'm currently looking for my next role.

Are you hiring engineers at the moment, or planning to soon? If so, I'd be happy to share my CV/GitHub so you can see if there might be a fit.`,
                },
                ifNotHiring: {
                    title: '3.3. If they say "we\'re not hiring right now"',
                    template: `Thanks for the quick reply, really appreciate it!

If you don't mind me asking — do you know any other teams, hiring managers or recruiters in your network who are currently looking for [your role/stack]? I'd be very grateful for any intros or names to reach out to.

Either way, I'll keep cheering for what you're building at [Company] 🙂`,
                },
                ifJobPosting: {
                    title: '3.4. If there is a job posting (and you applied)',
                    template: `Hey [Name],

I saw that [Company] is hiring for a [Job Title] and I've just applied via your careers page. Given your recent [funding/launch], it looks like a really exciting time to join.

Would you be open to taking a quick look at my profile and letting me know if I might be a good fit? I'd be happy to send my CV and a short overview of my relevant projects.`,
                },
                followUpNudge: {
                    title: '3.5. Follow-up nudge (no response after a few days)',
                    template: `Hey [Name], just bumping this in case it got buried in your inbox.

No rush at all — I'd really appreciate any pointer or intro if you have one.`,
                },
                finalFollowUp: {
                    title: '3.6. Final, light-hearted follow-up (if the tone is casual)',
                    template: `Please don't ghost me, man 😄  

A quick "yes", "no" or "maybe later" would help me a lot so I know where I stand.`,
                },
            },
            howToTrackInApp: {
                title: '4. How to track this strategy in Network Flow',
                icon: 'track_changes',
                description: 'Network Flow is perfect for tracking recently funded startups. Here\'s your workflow:',
                step1: {
                    title: 'Step 1: Add companies when you find them',
                    icon: 'business',
                    link: { text: 'Go to Companies page', route: '/companies' },
                    items: [
                        { text: 'Go to the Companies page (click "Companies" in the top navigation).', link: '/companies' },
                        { text: 'Click "Create Company" for each startup you discover.' },
                        { text: 'Fill in the funding details:' },
                        { text: '  • Company name and industry' },
                        { text: '  • Funding round (Seed, Series A, Series B, etc.)' },
                        { text: '  • Funding date (when they raised)' },
                        { text: '  • Funding source (Crunchbase, article, etc.)' },
                        { text: '  • Careers page URL (if they have one)' },
                        { text: 'Use the filters to find companies by:' },
                        { text: '  • Industry' },
                        { text: '  • Funding round' },
                        { text: '  • Whether they have relevant roles' },
                        { text: '  • Whether you\'ve applied' },
                    ],
                },
                step2: {
                    title: 'Step 2: Track application status',
                    icon: 'assignment',
                    items: [
                        { text: 'When you check their careers page:' },
                        { text: '  • Check "Has Relevant Role" if they have a role that fits' },
                        { text: '  • Add the "Role Title" if applicable' },
                        { text: 'When you apply:' },
                        { text: '  • Check "Applied"' },
                        { text: '  • Set "Application Date" to today' },
                    ],
                },
                step3: {
                    title: 'Step 3: Create contacts for decision-makers',
                    icon: 'person_add',
                    link: { text: 'Go to Contacts page', route: '/contacts' },
                    items: [
                        { text: 'For each company, create Contacts for the people you reach out to:' },
                        { text: '  • Go to Contacts page → Create Contact', link: '/contacts' },
                        { text: '  • Link the contact to the company (select from Companies dropdown)' },
                        { text: '  • Select "Recently Funded Startup" from the Strategies dropdown' },
                        { text: '  • Set "Contact Type" (hiring manager, recruiter, founder, etc.)' },
                        { text: '  • Add their LinkedIn URL and role' },
                    ],
                },
                step4: {
                    title: 'Step 4: Track your outreach',
                    icon: 'chat_bubble_outline',
                    link: { text: 'Go to Conversations page', route: '/conversations' },
                    items: [
                        { text: 'Create a Conversation for each person you message:' },
                        { text: '  • Go to Conversations page or create from the contact detail page', link: '/conversations' },
                        { text: '  • Paste the LinkedIn message thread' },
                        { text: '  • Tag the conversation with "Recently Funded Startup" strategy' },
                        { text: 'Track connection lifecycle on the contact:' },
                        { text: '  • Connection Request Sent At' },
                        { text: '  • Connection Accepted At' },
                        { text: '  • DM Sent At' },
                        { text: '  • Last Follow-up At' },
                    ],
                },
                step5: {
                    title: 'Step 5: Monitor your pipeline',
                    icon: 'view_kanban',
                    items: [
                        { text: 'Use the Pipeline page to see all opportunities grouped by stage.', link: '/pipeline' },
                        { text: 'Use the Companies page to see which companies you\'ve targeted and their status.', link: '/companies' },
                        { text: 'Filter contacts by strategy to see all your "Recently Funded Startup" outreach.', link: '/contacts' },
                        { text: 'Check the Today page for follow-ups and next actions.', link: '/' },
                    ],
                },
                tip: {
                    text: 'Pro tip: Create an Opportunity for each company/role you\'re pursuing. Link it to the contact and tag it with "Recently Funded Startup" strategy to track the full journey from discovery to interview.',
                    link: { text: 'Go to Opportunities page', route: '/opportunities' },
                    type: 'info',
                },
            },
        },
    },
} as const;

export const PROOF_OF_WORK_OUTREACH_STRATEGY_CONFIG = {
    copy: {
        title: 'Proof-Of-Work Outreach',
        subtitle: 'Value-First "Sniper" Outreach',
        description: 'Stand out by fixing real problems or building with the company\'s own product',
        exampleResult: {
            text: 'Example result: In ~20 days, this strategy led to 5 interviews and 2 offers (plus more in the pipeline).',
            type: 'success',
            icon: 'emoji_events',
        },
        intro: 'This strategy is about showing, not just telling. Instead of "Hi, I\'d love to work with you 🙏", you:',
        introSteps: [
            'Find a company you genuinely like.',
            'Either spot real UI/UX / product issues or build something using their product.',
            'Send them that value on a silver platter (screenshots, Loom, live demo, GitHub).',
            'Ask directly for a chat/interview.',
        ],
        worksWellFor: {
            title: 'It works especially well for:',
            items: [
                'Early-stage startups (10–100 employees)',
                'Devtools / AI / infra companies with public products',
                'Any company with an active Slack/Discord/community',
            ],
        },
        layersWithOtherStrategies: {
            title: 'And it layers beautifully on top of your other strategies:',
            items: [
                'Use it on recently funded startups you discover',
                'Use it on companies you got to via warm referrals',
            ],
        },
        sections: {
            twoFlavors: {
                title: '1. The Two Flavors of This Strategy',
                description: 'There are two main ways to run this:',
                flavorA: {
                    title: 'A) UI/UX & Product Bugs Strategy (best for early-stage startups)',
                    steps: [
                        'You:',
                        '• Go through their site/app as a user',
                        '• Spot UI/UX issues, visual inconsistencies, or even basic vulnerabilities',
                        '• Capture 4–5 of the most important issues (screenshots + notes)',
                        '• Send a short, focused report privately to a decision-maker',
                    ],
                    worksGreatOn: {
                        title: 'This works great on:',
                        items: [
                            'Early-stage startups (10–50, 50–100 employees)',
                            'Companies still polishing product-market fit',
                            'Tools where you don\'t necessarily have full access to the paid product',
                        ],
                    },
                },
                flavorB: {
                    title: 'B) Build-With-Their-Product Strategy (best for devtools / AI tools)',
                    steps: [
                        'You:',
                        '• Use their product or API to build a small but real project',
                        '• Deploy it, record a Loom demo, and share the GitHub repo',
                        '• Post it publicly (LinkedIn / X / their Slack/Discord), tag the company',
                        '• DM the hiring manager / DevRel / CTO linking to what you built',
                    ],
                    worksEspeciallyWellFor: {
                        title: 'This works especially well for:',
                        items: [
                            'Devtools (e.g. Zencoder-style AI agents, Lovable, etc.)',
                            'Tools with public communities (Slack/Discord)',
                            'Companies hiring DevRel / evangelists / product-minded engineers',
                        ],
                    },
                },
            },
            bugsUxStrategy: {
                title: '2. Step-by-step – Bugs & UX Strategy (Flavor A)',
                step1: {
                    title: 'Step 1 — Pick the right kind of company',
                    prioritize: {
                        title: 'Prioritize:',
                        items: [
                            'Early-stage startups:',
                            '• On LinkedIn, filter companies by size: 10–50 or 50–100 employees',
                            '• Bonus: those that recently raised funding (combos nicely with your other playbook)',
                            'Companies whose product/mission you actually care about (you\'ll do better work)',
                        ],
                    },
                },
                step2: {
                    title: 'Step 2 — Scan their website & product',
                    goal: 'Goal: find a small handful of meaningful issues, not 50 tiny nitpicks.',
                    focusFirst: {
                        title: 'Focus first on business-critical parts:',
                        items: [
                            'Landing page hero',
                            '• Headline clarity, layout, spacing, alignment',
                            'Pricing section',
                            '• Card layout, hover states, colors, hierarchy ("which plan should I pick?")',
                            'Main CTA (sign up / demo / start)',
                            '• Visibility, contrast, placement',
                            'FAQ / "How it works"',
                            '• Readability, structure, spacing',
                        ],
                    },
                    thenIfPossible: {
                        title: 'Then, if possible:',
                        items: [
                            'Inside the product (if they have a free trial/plan):',
                            '• Core flows: signup, login, "aha moment" feature',
                            '• Anything confusing / broken / misaligned',
                        ],
                    },
                    optionalAdvanced: {
                        title: 'Optional advanced angle (only if you know what you\'re doing):',
                        items: [
                            'Simple security-ish checks, like:',
                            '• Clickjacking vulnerability (can their login page be iframed on another site?)',
                            '• Other basic, non-destructive checks',
                        ],
                        note: 'Important: You\'re not hacking them. You\'re highlighting basic, well-known vulnerabilities and UX issues in a professional way.',
                    },
                },
                step3: {
                    title: 'Step 3 — Take screenshots & write mini-notes',
                    forEachIssue: {
                        title: 'For each issue:',
                        items: [
                            'Take a clear screenshot',
                            'Add a short note:',
                            '• What the issue is (e.g. "misaligned text on pricing card")',
                            '• Why it matters (e.g. "This is your money page, design polish here boosts trust")',
                            '• Optional: a tiny suggestion ("Increasing spacing and making the CTA more prominent could help")',
                        ],
                    },
                    aimFor: {
                        title: 'Aim for:',
                        items: [
                            '4–5 high-impact issues',
                            'Not a 10-page PDF — just enough to show you have taste + attention to detail',
                        ],
                    },
                },
                step4: {
                    title: 'Step 4 — Choose channel: private, not public',
                    description: 'For bugs / vulnerabilities / UX problems, prefer private channels:',
                    channels: {
                        title: 'Direct DM on:',
                        items: [
                            'LinkedIn',
                            'Slack / Discord (if they have a community)',
                            'Email (e.g. via tools like Apollo, or contact@ / jobs@ addresses)',
                        ],
                    },
                    avoid: 'Avoid posting their bugs publicly on social media. You\'re trying to help, not embarrass them.',
                },
                step5: {
                    title: 'Step 5 — Send the "value-first" DM',
                    ifFewIssues: {
                        title: 'If it\'s just a few issues:',
                        content: 'Attach the screenshots directly in the DM (Slack/Discord/LinkedIn)',
                    },
                    ifLongerList: {
                        title: 'If it\'s a longer list:',
                        items: [
                            'Bundle into one PDF / Notion doc / Google Doc',
                            'Share a single link + 1–2 key points in the message',
                        ],
                    },
                    optional: {
                        title: 'Optional but powerful:',
                        content: 'Record a short Loom walking through the issues. They hear your voice, see your face → more trust.',
                    },
                },
            },
            buildWithProductStrategy: {
                title: '3. Step-by-step – Build-With-Their-Product Strategy (Flavor B)',
                whenToUse: {
                    title: 'Use this when:',
                    items: [
                        'The product is polished (harder to find bugs), but',
                        'They\'re devtools / AI / infra and want users building cool stuff',
                    ],
                },
                step1: {
                    title: 'Step 1 — Make sure you actually like the product + niche',
                    choose: {
                        title: 'Choose a company whose product you\'d actually use:',
                        items: [
                            'AI tools, dev tools, builder platforms, etc.',
                            'Align with your niche:',
                            '• Creator tools, AI copilots, data tools, etc.',
                            'You\'ll put more energy into something you genuinely find fun/useful.',
                        ],
                    },
                },
                step2: {
                    title: 'Step 2 — Build a small, real project',
                    examples: {
                        title: 'Examples:',
                        items: [
                            'With an AI coding tool:',
                            '→ small stock analysis dashboard, AI travel planner, etc.',
                            'With a dev tool:',
                            '→ sample app that shows off what their API does best.',
                        ],
                    },
                    guidelines: {
                        title: 'Guidelines:',
                        items: [
                            'It doesn\'t have to be huge. Think weekend project or even 1–2 days.',
                            'Include:',
                            '• A bit of UI (not just a CLI)',
                            '• A clear "aha" use case',
                            '• Basic deployment (so they can click and play)',
                        ],
                    },
                },
                step3: {
                    title: 'Step 3 — Package it: Loom + Live Demo + GitHub',
                    description: 'For maximum credibility, prepare:',
                    loom: {
                        title: 'Loom video',
                        items: [
                            '3–5 minutes',
                            'Show:',
                            '• What the app does',
                            '• How you used their product/tool',
                            '• Why it\'s interesting for their users',
                        ],
                    },
                    liveProject: {
                        title: 'Live project URL',
                        content: 'Deployed somewhere simple (Vercel, Netlify, etc.)',
                    },
                    github: {
                        title: 'GitHub repo',
                        items: [
                            'Public',
                            'Even if code isn\'t "perfect", it shows:',
                            '• You ship',
                            '• You\'re transparent',
                            '• You understand their stack',
                            'Most people will not read your code deeply. Just seeing real code + working app gives you huge trust points.',
                        ],
                    },
                },
                step4: {
                    title: 'Step 4 — Share it in places they actually watch',
                    whereToPost: {
                        title: 'Where to post:',
                        items: [
                            'Their public Slack/Discord community (if they have one)',
                            '• Often the best place – the team actually lives there.',
                            'Your LinkedIn or X:',
                            '• Share the Loom + demo + repo',
                            '• Tag the company account',
                            '• Optionally tag a couple of relevant team members',
                            'In communities:',
                            '• Post in channels like #showcase, #projects, #built-with-[product] etc.',
                        ],
                    },
                    ruleOfThumb: {
                        title: 'Rule of thumb:',
                        items: [
                            'Bugs/vulnerabilities → private DMs/email',
                            'Cool project built with their tool → public post + tag + community share',
                        ],
                    },
                },
                step5: {
                    title: 'Step 5 — Turn attention into interviews',
                    onceYouveShared: {
                        title: 'Once you\'ve shared:',
                        items: [
                            'Watch for reactions from:',
                            '• DevRel leads',
                            '• Hiring managers',
                            '• Founder/CTO',
                            'When someone from the team comments / reacts / says "Great job!", you follow up:',
                            '"Thanks! I\'d actually love to explore if there might be a fit to work with you – are you hiring or open to chatting?"',
                        ],
                    },
                    youCanAlsoDm: {
                        title: 'You can also still DM:',
                        template: '"Hey [Name], I just built [short description] using [product] and shared it in your community. Here are the Loom/live demo/GitHub. I\'d love to explore if there\'s a way I could help the team more permanently – are you hiring [role] or open to a quick chat?"',
                    },
                },
            },
            whenToDmVsPost: {
                title: '4. When to DM vs When to Post',
                ifBugs: {
                    title: 'If you found BUGS / UX issues / vulnerabilities:',
                    do: '✅ DM / email directly',
                    dont: '❌ Don\'t post publicly to "expose" them',
                    attach: 'Attach screenshots / PDF / Loom privately',
                },
                ifBuilt: {
                    title: 'If you BUILT something using their product:',
                    items: [
                        '✅ Post publicly (LinkedIn/X)',
                        '✅ Share in their Slack/Discord community',
                        '✅ Tag the company, optionally key team members',
                        '✅ DM hiring managers / DevRel / founders, linking to your post + demo',
                    ],
                },
            },
            howMuchIsEnough: {
                title: '5. How much is "enough"?',
                forBugReports: {
                    title: 'For bug/UX reports:',
                    items: [
                        '4–5 important issues is plenty',
                        'Focus on:',
                        '• Landing page hero',
                        '• Pricing',
                        '• Main CTAs',
                        '• FAQ / how-it-works',
                        '• Any critical product flows you can access',
                    ],
                },
                forProjects: {
                    title: 'For projects:',
                    items: [
                        'Scope: something you can do in a few days, not a month',
                        'Use it as:',
                        '• A portfolio piece',
                        '• A conversation starter',
                        '• Proof of your skills & interest',
                    ],
                },
            },
            whyItWorks: {
                title: '6. Why this works so well right now',
                jobMarket: {
                    title: 'The job market is flooded with:',
                    items: [
                        'AI-generated CVs',
                        'Copy-pasted cold messages',
                        'Thousands of "I\'d love to join your team" DMs',
                        'Trust is low. Most candidates look identical.',
                    ],
                },
                thisStrategy: {
                    title: 'This strategy:',
                    items: [
                        'Shows you\'re real',
                        'Shows you care about their company in particular',
                        'Lowers their risk:',
                        '• They\'ve already seen you think, build, and communicate',
                        'Makes it easy for them to justify:',
                        '"Let\'s give this person an interview"',
                    ],
                },
            },
            howToTrackInApp: {
                title: '7. How to track this strategy in Network Flow',
                icon: 'track_changes',
                description: 'Network Flow has special features for tracking proof-of-work outreach. Here\'s how:',
                step1: {
                    title: 'Step 1: Create an opportunity for each company',
                    icon: 'work_outline',
                    link: { text: 'Go to Opportunities page', route: '/opportunities' },
                    items: [
                        { text: 'Go to the Opportunities page or create from a Contact detail page.', link: '/opportunities' },
                        { text: 'Create a new Opportunity for the company you\'re targeting.' },
                        { text: 'Link it to the contact (the person you\'re reaching out to).' },
                        { text: 'Tag it with "Proof-Of-Work Outreach" strategy.' },
                    ],
                },
                step2: {
                    title: 'Step 2: Track your proof-of-work type',
                    icon: 'category',
                    items: [
                        { text: 'On the Opportunity detail page, find the "Proof-of-Work Tracking" section.' },
                        { text: 'Select your proof-of-work type:' },
                        { text: '  • "Proof of Work - Bugs" (if you found UI/UX issues)' },
                        { text: '  • "Proof of Work - Build" (if you built something with their product)' },
                        { text: '  • "Other" (for other types of proof-of-work)' },
                    ],
                },
                step3: {
                    title: 'Step 3: Document bugs/issues (Flavor A)',
                    icon: 'bug_report',
                    items: [
                        { text: 'If you found bugs or UX issues:' },
                        { text: '  • Click "Add Issue" in the "Issues Found" section' },
                        { text: '  • For each issue, add:' },
                        { text: '    - Issue description (what the problem is)' },
                        { text: '    - Notes (why it matters, suggestions)' },
                        { text: '    - Screenshot URL (if you have one)' },
                        { text: '  • Add 4–5 high-impact issues' },
                    ],
                },
                step4: {
                    title: 'Step 4: Document your build (Flavor B)',
                    icon: 'code',
                    items: [
                        { text: 'If you built something with their product:' },
                        { text: '  • Add "Project Details" describing what you built' },
                        { text: '  • Add "Loom Video URL" (your demo video)' },
                        { text: '  • Add "GitHub Repository URL" (your code)' },
                        { text: '  • Add "Live Demo URL" (deployed project)' },
                        { text: '  • Add "Shared Channels" (where you posted: slack, linkedin, discord, etc.)' },
                    ],
                },
                step5: {
                    title: 'Step 5: Track team responses',
                    icon: 'reply',
                    items: [
                        { text: 'When team members respond to your work:' },
                        { text: '  • Click "Add Team Response"' },
                        { text: '  • Add their name, their response, and the date' },
                        { text: '  • Track positive reactions, questions, or interview invitations' },
                    ],
                },
                step6: {
                    title: 'Step 6: Link to conversations',
                    icon: 'chat_bubble_outline',
                    link: { text: 'Go to Conversations page', route: '/conversations' },
                    items: [
                        { text: 'Create a Conversation for your outreach:' },
                        { text: '  • Go to Conversations page or create from the opportunity', link: '/conversations' },
                        { text: '  • Paste the message thread where you shared your proof-of-work' },
                        { text: '  • Tag it with "Proof-Of-Work Outreach" strategy' },
                        { text: '  • Track responses and follow-ups in the conversation' },
                    ],
                },
                tip: {
                    text: 'Pro tip: Use the Pipeline page to see all your proof-of-work opportunities at a glance. Filter by strategy to focus on this approach.',
                    link: { text: 'Go to Pipeline page', route: '/pipeline' },
                    type: 'info',
                },
            },
        },
    },
} as const;

export const LOOM_EMAIL_OUTREACH_STRATEGY_CONFIG = {
    copy: {
        title: 'Loom Email Outreach',
        subtitle: 'High-signal emails + 1–2 minute Loom videos to get direct replies from decision-makers',
        description: '💡 This works extremely well together with your SMART strategy.\n\nSMART = how you pick the right companies.\n\nLoom Email Outreach = how you get those companies to actually talk to you.',
        note: {
            text: 'This works extremely well together with your SMART strategy. SMART = how you pick the right companies. Loom Email Outreach = how you get those companies to actually talk to you.',
            type: 'info',
            icon: 'tips_and_updates',
        },
        sections: {
            whatThisStrategyIs: {
                title: '1. What this strategy is',
                insteadOf: {
                    title: 'Instead of:',
                    items: [
                        'Clicking "Easy Apply"',
                        'Or sending generic LinkedIn DMs',
                    ],
                },
                youDo: {
                    title: '…you:',
                    items: [
                        'Identify high-value target companies (ideally from your SMART strategy: recently funded, right niche, etc.).',
                        'Find direct emails of decision-makers.',
                        'Send a very short, targeted email (3–4 sentences).',
                        'Attach a 1–2 minute Loom video where you:',
                        '• Introduce yourself',
                        '• Show 1–2 relevant projects',
                        '• Share 1–2 ideas for their business',
                        '• End with a clear invitation to a quick call',
                        'This makes you stand out like crazy in a world of boring, copy-pasted messages.',
                    ],
                },
            },
            whyItWorks: {
                title: '2. Why it works',
                reasons: [
                    {
                        title: 'Inboxes are less crowded than LinkedIn DMs',
                        content: 'Everyone is spamming LinkedIn. Far fewer people take the time to send thoughtful emails.',
                    },
                    {
                        title: 'You show real effort',
                        content: 'A custom email + Loom = "this person did homework", not "mass spammer".',
                    },
                    {
                        title: 'Decision-makers love it',
                        content: 'Founders/CEOs/Eng managers see almost nobody sending personalized videos.',
                        quote: {
                            text: '"What a cool way to make an introduction. I\'m reaching out to her immediately."',
                            author: 'CEO reaction to a student\'s Loom video',
                        },
                    },
                    {
                        title: 'Pairs perfectly with SMART',
                        content: 'SMART helps you choose the right companies at the right time.\n\nLoom Email Outreach is how you get their attention once you\'ve picked them.',
                    },
                ],
            },
            stepByStep: {
                title: '3. Step-by-step',
                step1: {
                    title: 'Step 1 – Use SMART to choose your targets',
                    description: 'Use your SMART strategy first:',
                    narrowDown: {
                        title: 'Narrow down:',
                        items: [
                            'Industry you care about',
                            'Recently funded / growing startups',
                            'Companies where your projects are relevant',
                        ],
                    },
                    fromList: {
                        title: 'From that list, pick:',
                        items: [
                            'Top 10–20 "dream" companies for Loom videos',
                            'Others can still get email-only outreach',
                        ],
                    },
                    note: 'So SMART = "who and where".\n\nLoom Email Outreach = "how you approach them".',
                },
                step2: {
                    title: 'Step 2 – Get their emails (Apollo etc.)',
                    description: 'Use a tool like Apollo (apollo.io):',
                    items: [
                        'Go to People.',
                        'Filter by:',
                        '• Company name(s)',
                        '• Job title (e.g. "Engineering Manager", "Head of Engineering", "CTO", "Talent", "Recruiter").',
                        'Click to reveal/verify their work email.',
                        'Save these in your tracker (company + name + role + email).',
                    ],
                },
                step3: {
                    title: 'Step 3 – Decide who to contact (by company size)',
                    description: 'Use this simple rule of thumb:',
                    smallCompanies: {
                        title: 'Small companies (≈ under 30 people)',
                        content: '→ Email CEO / CTO / founder directly.',
                    },
                    mediumCompanies: {
                        title: 'Medium companies (≈ 30–100 people)',
                        content: '→ Email Engineering Managers / Heads of Engineering.',
                    },
                    largerCompanies: {
                        title: 'Larger companies (100+ people)',
                        content: '→ Email:\n\n• Engineering managers → about roles\n\n• Senior engineers / tech leads → for referrals',
                    },
                    note: 'This keeps your outreach realistic and targeted.',
                },
                step4: {
                    title: 'Step 4 – Write a short, high-signal email',
                    description: 'Aim for 3–4 sentences. That\'s it.',
                    structure: {
                        title: 'Structure:',
                        whoYouAre: {
                            title: 'Who you are (impressive but concise)',
                            description: 'Role, stack, 1–2 sharp details (experience, projects, niche).',
                            example: '"I\'m a full-stack developer focused on React/Next.js, with 3 years of experience and several shipped projects in [their industry/niche]."',
                        },
                        connectionPoint: {
                            title: 'Connection point (prove you did your homework)',
                            description: 'Something specific about:',
                            items: [
                                'Their product',
                                'Their recent launch/funding',
                                'Their industry/tech',
                            ],
                            example: '"I\'ve been following [Company] since your recent [funding/launch], and I really like how you\'re tackling [specific problem/feature]."',
                        },
                        clearAsk: {
                            title: 'Clear, easy-to-answer ask',
                            description: 'Don\'t end with "Let me know if you have opportunities." That\'s not a question.',
                            example: '"I\'m wondering if you\'re currently looking to grow your engineering team — would you be open to a quick chat?"',
                        },
                        optionalLinks: {
                            title: 'Optional links',
                            description: 'Add your:',
                            items: [
                                'LinkedIn profile',
                                'Portfolio/GitHub',
                                'Link to the Loom video (see next step)',
                            ],
                        },
                        note: 'You can use an AI assistant to generate variations, but keep this 3-part logic.',
                    },
                },
                step5: {
                    title: 'Step 5 – Add a 1–2 minute Loom video (for top targets)',
                    description: 'Do this especially for your top 10–20 companies.',
                    whatIsLoom: {
                        title: 'What is a Loom video?',
                        items: [
                            'Screen + webcam recording',
                            'You appear in a small bubble',
                            'You show their website/product and your projects while talking',
                        ],
                    },
                    outline: {
                        title: 'Outline for the video (1–2 minutes):',
                        intro: {
                            title: 'Intro (20–30s)',
                            items: [
                                'Who you are (repeat your email intro in spoken form).',
                                'Your role/stack, niche, and why you\'re excited about their company.',
                            ],
                        },
                        showProjects: {
                            title: 'Show 1–2 relevant projects (40–60s)',
                            items: [
                                'Share your screen with your most relevant project(s):',
                                '"Here\'s a dashboard I built…"',
                                '"Here\'s an AI tool I shipped…"',
                                'Tie it to their world:',
                                '"This is similar to what you do with [feature/product]. It gave me ideas on how I could help with [X]."',
                            ],
                        },
                        shareIdeas: {
                            title: 'Share 1–2 ideas for them (20–30s)',
                            items: [
                                'Something like:',
                                '"It made me think you could [small suggestion], similar to what [competitor] is doing."',
                                'This shows you think about their business, not just your CV.',
                            ],
                        },
                        clearCta: {
                            title: 'Clear CTA (10–15s)',
                            example: '"If this resonates at all, I\'d love to jump on a quick call and see if there\'s a way I can contribute. Thanks for watching."',
                        },
                    },
                    whyLoomWorks: {
                        title: 'Why Loom works:',
                        items: [
                            'They see your face → trust',
                            'They see your work → proof of skill',
                            'Almost no one does this → instant differentiation',
                        ],
                    },
                },
                step6: {
                    title: 'Step 6 – Send at the right time & follow up',
                    timing: {
                        title: 'Timing (their timezone):',
                        bestDays: 'Best days: Tuesday to Thursday',
                        bestTime: 'Best time: 9:00–11:00 in the morning',
                        avoid: {
                            title: 'Avoid:',
                            items: [
                                'Mondays (busy backlog)',
                                'Fridays (weekend mode)',
                                'Weekends (no one checks work email)',
                            ],
                        },
                    },
                    followUps: {
                        title: 'Follow-ups:',
                        items: [
                            'If no reply after 3–5 days, send a short bump:',
                            '"Just wanted to bump this in case it got buried — would you be open to a quick chat sometime this week?"',
                            'Max 2–3 follow-ups per contact, spaced out.',
                        ],
                    },
                },
            },
            howItFits: {
                title: '4. How it fits into your overall system',
                description: 'You can position it in your app like this:',
                strategy: 'Strategy: Loom Email Outreach',
                worksBestWith: {
                    title: 'Works best with:',
                    items: [
                        'SMART strategy (to select the right companies)',
                        'Recently Funded Startups (as a source of high-priority targets)',
                        'Proof-of-Work Outreach (bugs/projects) — Loom can showcase that work too',
                    ],
                },
                pipelineIdea: {
                    title: 'Pipeline idea:',
                    items: [
                        'Use SMART → shortlist 20–50 high-potential companies.',
                        'For top 10–20:',
                        '• Run Proof-of-Work Outreach (bugs or mini-builds)',
                        '• Wrap it with Loom Email Outreach (email + video)',
                        'Track everything inside your app.',
                    ],
                },
            },
            howToTrackInApp: {
                title: '5. How to track this strategy in Network Flow',
                icon: 'track_changes',
                description: 'Network Flow has built-in email and Loom tracking. Here\'s your workflow:',
                step1: {
                    title: 'Step 1: Create contacts with email addresses',
                    icon: 'email',
                    link: { text: 'Go to Contacts page', route: '/contacts' },
                    items: [
                        { text: 'Go to the Contacts page → Create Contact.', link: '/contacts' },
                        { text: 'Add the person\'s email address (use Apollo or similar to find it).' },
                        { text: 'Tag the contact with "Loom Email Outreach" strategy.' },
                        { text: 'Set "Contact Type" (CTO, Engineering Manager, Recruiter, etc.).' },
                        { text: 'Link to their company if it exists in your Companies list.', link: '/companies' },
                    ],
                },
                step2: {
                    title: 'Step 2: Create a conversation for email tracking',
                    icon: 'chat_bubble_outline',
                    link: { text: 'Go to Conversations page', route: '/conversations' },
                    items: [
                        { text: 'Create a Conversation for this outreach (channel: "email").', link: '/conversations' },
                        { text: 'Tag it with "Loom Email Outreach" strategy.' },
                        { text: 'On the conversation detail page, find the "Email Tracking" card.' },
                    ],
                },
                step3: {
                    title: 'Step 3: Track your email and Loom video',
                    icon: 'videocam',
                    items: [
                        { text: 'When you send the email:' },
                        { text: '  • Add the email as a message in the conversation (sender: "You")' },
                        { text: '  • Click the status chip on your message to mark it as "Confirmed" (already sent) or "Pending" (not sent yet)' },
                        { text: '  • Set "Email Sent At" to today\'s date and time in the Email & Loom Tracking card' },
                        { text: '  • Add "Loom Video URL" (the link to your video)' },
                        { text: '  • Check "Loom Sent" if you included the video in the email' },
                        { text: 'Set "Email Status" to track progress:' },
                        { text: '  • "No Reply" (default - waiting for response)' },
                        { text: '  • "Replied" (when they respond)' },
                        { text: '  • "Call Scheduled" (when you book a call)' },
                        { text: '  • "In Process" (ongoing conversation)' },
                        { text: '  • "Rejected" (if they decline)' },
                    ],
                },
                step4: {
                    title: 'Step 4: Track follow-ups',
                    icon: 'schedule',
                    items: [
                        { text: 'Add follow-up dates in "Email Follow-up Dates" (click to add multiple dates).' },
                        { text: 'Or use the individual follow-up fields:' },
                        { text: '  • "Follow-up 1 Date" (first bump)' },
                        { text: '  • "Follow-up 2 Date" (second bump)' },
                        { text: '  • "Follow-up 3 Date" (final follow-up)' },
                        { text: 'When they respond:' },
                        { text: '  • Paste their reply as a new message in the conversation (sender: "Contact")' },
                        { text: '  • Update "Email Status" to "Replied" in the Email & Loom Tracking card' },
                        { text: '  • If the conversation moves forward, update "Email Status" to "In Process" or "Call Scheduled"' },
                    ],
                },
                step5: {
                    title: 'Step 5: Paste email thread into conversation',
                    icon: 'content_paste',
                    items: [
                        { text: 'Copy the email exchange from your email client.' },
                        { text: 'Paste it into the Conversation as messages.' },
                        { text: 'This keeps your full email history in one place.' },
                    ],
                },
                step6: {
                    title: 'Step 6: Monitor and analyze',
                    icon: 'analytics',
                    items: [
                        { text: 'Use the Conversations page filters:', link: '/conversations' },
                        { text: '  • Filter by "Email Status" to see who hasn\'t replied' },
                        { text: '  • Filter by strategy to see all Loom Email Outreach' },
                        { text: 'Check the Today page for:', link: '/' },
                        { text: '  • Conversations that need follow-ups' },
                        { text: '  • Emails sent that are waiting for responses' },
                    ],
                },
                tip: {
                    text: 'Pro tip: Combine this with Proof-of-Work Outreach. Create an Opportunity with your proof-of-work details, then create a Conversation for the email outreach. Link them together to see the full picture.',
                    link: { text: 'Go to Opportunities page', route: '/opportunities' },
                    type: 'info',
                },
            },
        },
    },
} as const;

export const JOB_BOARD_LEAD_SNIPING_STRATEGY_CONFIG = {
    copy: {
        title: 'Job Board Lead Sniping (LinkedIn)',
        subtitle: 'Use LinkedIn jobs as lead generation, not as your main application channel',
        sections: {
            whatThisStrategyIs: {
                title: '1. What this strategy actually is',
                insteadOf: {
                    title: 'Instead of:',
                    content: '"See job on LinkedIn → click Easy Apply → disappear into a pool of 500 CVs."',
                },
                youDo: {
                    title: 'you do this:',
                    description: 'Use LinkedIn posts and job search to find roles that:',
                    items: [
                        'Were posted very recently, or',
                        'Are being talked about by recruiters / hiring managers',
                    ],
                    treatAsLeads: {
                        title: 'Treat those jobs as LEADS, not the end goal.',
                        description: 'For each good lead:',
                        items: [
                            'Yes, you can apply…',
                            'But the real move is to:',
                            '• Look up the company',
                            '• Find key people (recruiters, HR, hiring managers, founders)',
                            '• Reach out to them directly using your other strategies (referrals, email, Loom, etc.)',
                        ],
                    },
                    note: 'So:\n\nJob board = radar, not the whole strategy.',
                },
            },
            whyThisWorks: {
                title: '2. Why this works',
                description: 'Every public job posting is a competition:',
                competition: {
                    items: [
                        'One open seat',
                        'Dozens or hundreds of applicants',
                        'Most people apply late and never talk to a human',
                    ],
                },
                youImproveOdds: {
                    title: 'You improve your odds by:',
                    beingEarly: {
                        title: 'Being early',
                        items: [
                            'Find jobs within minutes / first hour after they\'re posted.',
                            'When they first open the "applicants" list, you\'re already there.',
                        ],
                    },
                    notJustCv: {
                        title: 'Not just being "one more CV"',
                        items: [
                            'Use the posting to:',
                            '• Discover the company',
                            '• Identify who\'s hiring',
                            'Then you message those people directly instead of waiting passively.',
                        ],
                    },
                },
                note: 'This strategy is a bit noisy and takes scrolling, so it\'s great as an extra / last-resort channel, not your main one.',
            },
            method1: {
                title: '3. Method 1 – LinkedIn posts: "I\'m hiring" posts',
                goal: 'Goal: find people (recruiters/managers) who just announced they\'re hiring.',
                steps: {
                    title: 'Steps:',
                    step1: {
                        title: 'On LinkedIn, go to Search → Posts.',
                        description: 'Search with quotes + "hiring". Examples:',
                        examples: [
                            '"software engineer" AND hiring',
                            '"frontend developer" AND hiring',
                            '"full-stack developer" AND job',
                        ],
                    },
                    step2: {
                        title: 'Filter:',
                        items: [
                            'Date → "Past 24 hours"',
                        ],
                    },
                    step3: {
                        title: 'Scroll and filter by eye:',
                        ignore: {
                            title: 'Ignore:',
                            items: [
                                'Spam, scammy stuff, obvious ads.',
                                'Skip roles way above your level (e.g. "12+ years experience" if you\'re junior).',
                            ],
                        },
                        lookFor: {
                            title: 'Look for:',
                            items: [
                                'HR/recruiters saying "we\'re hiring X engineers"',
                                'Engineering managers / founders posting about open roles',
                                'Posts where an email is included',
                            ],
                        },
                    },
                    step4: {
                        title: 'For each good post:',
                        items: [
                            'Check the role & company.',
                            'If relevant:',
                            '• Optionally apply via the link.',
                            '• More importantly: click their profile and send a short DM:',
                            '  - Introduce yourself (role + stack).',
                            '  - Mention their post.',
                            '  - Ask a clear question like:',
                            '    "Are you still hiring for [role]? I\'d love to send my CV/GitHub if there\'s a potential fit."',
                        ],
                    },
                },
                benefits: {
                    title: 'This method is noisy, but it can reveal:',
                    items: [
                        'Brand new positions',
                        'Roles that are not yet in the official job board',
                        'The exact person who controls the process',
                    ],
                },
            },
            method2: {
                title: '4. Method 2 – LinkedIn Jobs + "freshness" URL hack',
                goal: 'Goal: find fresh jobs with very few applicants.',
                steps: {
                    title: 'Steps:',
                    step1: {
                        title: 'Go to LinkedIn Jobs.',
                        description: 'Set your search:',
                        items: [
                            'Keywords: e.g. Frontend Developer, Software Engineer, React, etc.',
                            'Location / Remote if relevant.',
                            'Use "Date posted" → "Past 24 hours".',
                        ],
                    },
                    step2: {
                        title: 'Now tweak the URL:',
                        description: 'In the address bar you\'ll see a parameter like:',
                        example: 'f_TPR=R86400',
                        explanation: '86400 = seconds in 24 hours.',
                        changeNumber: {
                            title: 'Change that number to reduce the time window:',
                            examples: [
                                'f_TPR=R3600 → last ~1 hour',
                                'f_TPR=R600 → last ~10 minutes',
                                'f_TPR=R60 → roughly last ~minute',
                            ],
                        },
                        note: 'It\'s not perfectly precise, but it pulls very recent postings:\n\n"4 minutes ago", "17 minutes ago", "43 minutes ago", etc.\n\nMany of them still show 0–few applicants.',
                    },
                    step3: {
                        title: 'Scan the results:',
                        items: [
                            'Focus on jobs posted in the last 60–90 minutes.',
                            'Prioritize:',
                            '• Good tech stack',
                            '• Acceptable experience range',
                            '• Locations that make sense for you (or remote)',
                        ],
                    },
                    step4: {
                        title: 'For each interesting job:',
                        stepA: {
                            title: 'Step A – Basic:',
                            content: 'You can click "Apply". It costs you almost nothing.',
                        },
                        stepB: {
                            title: 'Step B – The important part:',
                            description: 'Use the posting as a lead:',
                            items: [
                                'Click the company name → go to company page.',
                                'Click "People".',
                                'Search inside for:',
                                '• "Engineering Manager"',
                                '• "Head of Engineering"',
                                '• "CTO"',
                                '• "Recruiter", "Talent", "HR"',
                                'Then:',
                                '• Connect or email them.',
                                '• Reference the specific role:',
                                '  "I saw you just posted a [Job Title] role on LinkedIn…"',
                                '• Use your preferred outreach style:',
                                '  - Ask for a referral',
                                '  - Send a Loom video with your intro + projects',
                                '  - Share proof-of-work (mini audit, bug report, small build, etc.)',
                            ],
                        },
                    },
                },
                conclusion: 'That\'s how you turn a job board from "click & pray" into a lead generation engine.',
            },
            howToTrack: {
                title: '5. How to explain / track it in your system',
                description: 'You can define it in your product or docs as:',
                strategyName: 'Strategy name: Job Board Lead Sniping (LinkedIn)',
                type: 'Type: Lead discovery / "top of funnel"',
                forEachLead: {
                    title: 'For each lead you pull from this strategy, track:',
                    items: [
                        'job_title',
                        'job_url',
                        'posted_at (approx — from LinkedIn)',
                        'applicants_when_found (e.g. "0", "<25", "100+")',
                        'company_name',
                        'source = LinkedIn Post or LinkedIn Job',
                        'contacts_found (names/roles of people you identified)',
                        'outreach_done (Yes/No + which channel: DM, email, Loom, etc.)',
                        'status (Not contacted / Contacted / In conversation / Interview / Rejected / Offer)',
                    ],
                },
                yourAppCanShow: {
                    title: 'This way, your app can show:',
                    items: [
                        'How many leads came from this strategy',
                        'How many turned into conversations / interviews',
                        'Whether this "last-resort" channel is pulling its weight for the user',
                    ],
                },
            },
            howToTrackInApp: {
                title: '6. How to track this strategy in Network Flow',
                icon: 'track_changes',
                description: 'Network Flow has a dedicated Job Postings feature perfect for this strategy. Here\'s how:',
                step1: {
                    title: 'Step 1: Create job postings for each lead',
                    icon: 'work',
                    link: { text: 'Go to Job Postings page', route: '/job-postings' },
                    items: [
                        { text: 'Go to the Job Postings page (click "Job Postings" in the top navigation).', link: '/job-postings' },
                        { text: 'Click "Create Job Posting" for each job you find.' },
                        { text: 'Fill in the details:' },
                        { text: '  • Job Title' },
                        { text: '  • Job URL (the LinkedIn job posting URL)' },
                        { text: '  • Posted At (when it was posted, if known)' },
                        { text: '  • Applicants When Found (e.g., "0", "<25", "100+")' },
                        { text: '  • Source: Select "LinkedIn Job" or "LinkedIn Post"' },
                        { text: '  • Link to Company (if the company exists in your Companies list)', link: '/companies' },
                    ],
                },
                step2: {
                    title: 'Step 2: Track contacts you find',
                    icon: 'person_add',
                    link: { text: 'Go to Contacts page', route: '/contacts' },
                    items: [
                        { text: 'In the "Contacts Found" field (or notes), list the people you identified:' },
                        { text: '  • Hiring managers' },
                        { text: '  • Recruiters' },
                        { text: '  • Engineering managers' },
                        { text: '  • Founders/CTOs' },
                        { text: 'Or create actual Contact records for each person:' },
                        { text: '  • Go to Contacts page → Create Contact', link: '/contacts' },
                        { text: '  • Link them to the company' },
                        { text: '  • Tag with "Job Board Lead Sniping" strategy' },
                    ],
                },
                step3: {
                    title: 'Step 3: Track your outreach',
                    icon: 'send',
                    link: { text: 'Go to Conversations page', route: '/conversations' },
                    items: [
                        { text: 'When you reach out to people from the job posting:' },
                        { text: '  • Check "Outreach Done" on the job posting' },
                        { text: '  • Add "Outreach Channels" (e.g., ["dm", "email", "loom"])' },
                        { text: 'Create Conversations for each outreach:', link: '/conversations' },
                        { text: '  • Tag with "Job Board Lead Sniping" strategy' },
                        { text: '  • Reference the job posting in notes' },
                    ],
                },
                step4: {
                    title: 'Step 4: Convert to opportunity',
                    icon: 'work_outline',
                    link: { text: 'Go to Opportunities page', route: '/opportunities' },
                    items: [
                        { text: 'If the job posting leads to a real opportunity:' },
                        { text: '  • Create an Opportunity (link to the contact)', link: '/opportunities' },
                        { text: '  • Link the job posting to the opportunity' },
                        { text: '  • Tag the opportunity with "Job Board Lead Sniping" strategy' },
                        { text: '  • Track the full interview process in the opportunity' },
                    ],
                },
                step5: {
                    title: 'Step 5: Filter and analyze',
                    icon: 'filter_list',
                    items: [
                        { text: 'Use the Job Postings page filters:', link: '/job-postings' },
                        { text: '  • Filter by "Source" to see LinkedIn Post vs LinkedIn Job' },
                        { text: '  • Filter by "Outreach Done" to see which leads you\'ve acted on' },
                        { text: 'Use the Contacts page:', link: '/contacts' },
                        { text: '  • Filter by "Job Board Lead Sniping" strategy' },
                        { text: '  • See all people you found through job postings' },
                    ],
                },
                tip: {
                    text: 'Pro tip: Use the Job Postings page to quickly see which fresh postings you haven\'t acted on yet. Sort by "Posted At" to prioritize the newest leads.',
                    link: { text: 'Go to Job Postings page', route: '/job-postings' },
                    type: 'info',
                },
            },
        },
    },
} as const;

export const THE_100_CONNECTION_WEEK_STRATEGY_CONFIG = {
    copy: {
        title: 'The 100-Connection Week',
        subtitle: 'What You Can Realistically Get',
        description: 'A very simple piece of math so you can see what\'s possible if you actually run these outreach strategies seriously for just one focused week.',
        sections: {
            topOfFunnel: {
                title: '1. Top of funnel: 100 targeted outreaches',
                description: 'You commit to 100 targeted connection requests / outreaches (LinkedIn + email etc.).',
                note: 'This is not "100 in a day".',
                commitment: 'It\'s 100 in a week, which is absolutely doable with:',
                requirements: [
                    '~1–2 hours per day',
                    'A prepared list of companies + people',
                    '1–2 good message templates',
                ],
                linkedInLimit: 'On LinkedIn, the free tier usually allows you around 100 connection requests per week, so this already fits the platform\'s natural limit.',
                mindset: 'Think of it as: "This week, my job is to hit 100 quality shots."',
            },
            conversion1: {
                title: '2. Conversion 1: Accepted connections (~30%)',
                description: 'Out of those 100 people you reach out to, not everyone will accept.',
                conservativeNumbers: 'Let\'s use conservative numbers and say:',
                acceptRate: '30% accept rate → 30 people accept your request',
                whatYouGet: {
                    title: 'This already gives you:',
                    items: [
                        '30 new relevant connections:',
                        'hiring managers, recruiters, founders, engineers who work at companies you actually want to join.',
                    ],
                },
            },
            conversion2: {
                title: '3. Conversion 2: People who actually reply (~15%)',
                description: 'Not everyone who accepts will reply to your DM. Some are busy, travelling, distracted, or just bad at LinkedIn.',
                conservativeAgain: 'Let\'s stay conservative again:',
                replyRate: 'Out of those 30 accepted connections, maybe about half reply',
                result: 'That gives you roughly 15 people who actually engage in DMs',
                whatThisMeans: {
                    title: 'Now you\'re no longer "just a CV".',
                    description: 'You\'re in actual conversations with 15 humans who:',
                    items: [
                        'Work at your target companies',
                        'Know about your profile',
                        'Can refer you / interview you / pass you internally',
                    ],
                },
            },
            conversion3: {
                title: '4. Conversion 3: Calls / interviews (~5)',
                description: 'From those ~15 engaged conversations, not all will move forward. Some might just share info, some will ghost, some don\'t have the right role right now.',
                lowEstimate: 'Again, let\'s use a low, realistic estimate:',
                interviewRate: 'Out of 15 conversations, 5 people invite you to:',
                interviewTypes: [
                    'A "quick call"',
                    'An intro chat',
                    'A screening / interview',
                ],
                whatTheseAre: 'These are interviews.',
                whyItMatters: 'If a hiring manager / recruiter / founder books a call with you, they\'re not doing it "for fun". They\'re investing time because they might hire you.',
                summary: {
                    text: 'So:\n\n100 outreaches → ~30 accepts → ~15 engaged chats → ~5 interviews\n\nEven with humble, conservative conversion rates.',
                    type: 'highlight',
                    icon: 'trending_up',
                },
            },
            endgame: {
                title: '5. The endgame: from 5 interviews to 1 offer',
                description: 'With around 5 interviews in play, it\'s completely realistic to aim for:',
                goal: 'At least 1 job offer',
                ifThatOffer: {
                    title: 'And if that offer is:',
                    items: [
                        'Remote',
                        'In a good market (e.g. US/EU)',
                        'With a strong salary (e.g. ~100k+ USD for a solid dev role)',
                    ],
                },
                impact: {
                    title: '…that can be completely life-changing for you.',
                    items: [
                        'Your financial baseline changes.',
                        'Your experience and CV level up.',
                        'Your next job becomes much easier to get.',
                        'Your trajectory shifts from "struggling to break in" to "playing from the inside".',
                    ],
                },
                conclusion: 'One serious week of focused outreach can literally start that chain.',
            },
            theChallenge: {
                title: '6. The 100-Connection Challenge',
                description: 'Here\'s the concrete challenge you (or your students/users) can follow:',
                pickWeek: {
                    title: 'Pick 1 week',
                    note: 'Not full-time — just commit 1–2 hours per day.',
                },
                setGoal: {
                    title: 'Set the goal:',
                    goal: '"I will send 100 targeted connection requests / outreaches this week."',
                },
                prepare: {
                    title: 'Prepare before you start:',
                    items: [
                        'A list of companies you actually want to target',
                        'A list of people at those companies (recruiters, managers, founders, engineers)',
                        '1–2 solid outreach templates (you can A/B test them)',
                    ],
                },
                duringWeek: {
                    title: 'During the week:',
                    items: [
                        'Send your 100 requests',
                        'Track everything:',
                        '• Who you contacted',
                        '• Who accepted',
                        '• Who replied',
                        '• Who booked calls',
                    ],
                },
                afterWeek: {
                    title: 'After the week:',
                    doRecap: {
                        title: 'Do a short recap:',
                        questions: [
                            'How many outreaches?',
                            'How many accepts?',
                            'How many replies?',
                            'How many calls / interviews?',
                        ],
                    },
                    adjust: {
                        title: 'Adjust your:',
                        items: [
                            'Profile (if accepts are low)',
                            'Messages (if replies are low)',
                            'Ask / CTA (if conversations don\'t convert to calls)',
                        ],
                    },
                },
                communityWrap: {
                    title: 'If you have a community (Discord, Slack, etc.), you can wrap it like this:',
                    content: '"Post in the community:\n\n\'I\'m starting the 100-Connection Week Challenge today.\'\n\nAt the end of the week, share your results and screenshots so others can learn from your experience."',
                },
                finalNote: 'The goal is not perfection.\n\nThe goal is volume + learning → which turns into interviews → which turns into offers.',
            },
            howToTrackInApp: {
                title: '7. How to track this strategy in Network Flow',
                icon: 'track_changes',
                description: 'Network Flow has a Challenges feature perfect for tracking your 100-Connection Week. Here\'s how:',
                step1: {
                    title: 'Step 1: Create a challenge',
                    icon: 'emoji_events',
                    link: { text: 'Go to Challenges page', route: '/challenges' },
                    items: [
                        { text: 'Go to the Challenges page (click "Challenges" in the top navigation).', link: '/challenges' },
                        { text: 'Click "Create Challenge".' },
                        { text: 'Set up your challenge:' },
                        { text: '  • Name: "100-Connection Week" (or your custom name)' },
                        { text: '  • Start Date: First day of your challenge week' },
                        { text: '  • End Date: Last day of your challenge week' },
                        { text: '  • Goal: 100 (or your target number)' },
                        { text: '  • Initial metrics: Set all to 0' },
                    ],
                },
                step2: {
                    title: 'Step 2: Track outreaches as you go',
                    icon: 'person_add',
                    link: { text: 'Go to Contacts page', route: '/contacts' },
                    items: [
                        { text: 'For each person you reach out to:' },
                        { text: '  • Create a Contact (go to Contacts page)', link: '/contacts' },
                        { text: '  • Tag the contact with "The 100-Connection Week" strategy' },
                        { text: '  • Link the contact to your challenge (this will be tracked automatically)' },
                        { text: 'Update the challenge metrics weekly:' },
                        { text: '  • "Outreaches Count": Total connection requests sent' },
                        { text: '  • "Accepts Count": How many accepted your request' },
                        { text: '  • "Replies Count": How many replied to your DMs' },
                        { text: '  • "Calls Count": How many calls/interviews scheduled' },
                        { text: '  • "Interviews Count": How many actual interviews' },
                    ],
                },
                step3: {
                    title: 'Step 3: Track conversations and follow-ups',
                    icon: 'chat_bubble_outline',
                    link: { text: 'Go to Conversations page', route: '/conversations' },
                    items: [
                        { text: 'Create Conversations for each person who accepts:', link: '/conversations' },
                        { text: '  • Tag with "The 100-Connection Week" strategy' },
                        { text: '  • Paste the message thread' },
                        { text: '  • Track follow-up dates (Follow-up 1, 2, 3) in the Email & Loom Tracking card' },
                        { text: '  • Track message status: Click the status chip on your messages to mark them as "Pending" or "Confirmed"' },
                        { text: '  • To see if they replied: Check if there are messages from the contact in the conversation thread' },
                    ],
                },
                step4: {
                    title: 'Step 4: Monitor your funnel',
                    icon: 'analytics',
                    items: [
                        { text: 'Check the Challenges page to see your progress:', link: '/challenges' },
                        { text: '  • Progress bars show how close you are to your goal' },
                        { text: '  • Metrics show your conversion funnel' },
                        { text: 'Use the Contacts page:', link: '/contacts' },
                        { text: '  • Filter by "The 100-Connection Week" strategy' },
                        { text: '  • See all contacts from your challenge' },
                        { text: '  • Filter by connection status to see who hasn\'t accepted' },
                    ],
                },
                step5: {
                    title: 'Step 5: Convert to opportunities',
                    icon: 'work_outline',
                    link: { text: 'Go to Opportunities page', route: '/opportunities' },
                    items: [
                        { text: 'When conversations turn into real opportunities:' },
                        { text: '  • Create an Opportunity (link to the contact)', link: '/opportunities' },
                        { text: '  • Tag with "The 100-Connection Week" strategy' },
                        { text: '  • Track the interview process' },
                        { text: 'Update challenge metrics:' },
                        { text: '  • Increment "Calls Count" when calls are scheduled' },
                        { text: '  • Increment "Interviews Count" for actual interviews' },
                    ],
                },
                step6: {
                    title: 'Step 6: Weekly recap',
                    icon: 'summarize',
                    items: [
                        { text: 'At the end of the week, update your challenge:' },
                        { text: '  • Review all metrics' },
                        { text: '  • Add notes about what worked and what didn\'t' },
                        { text: '  • Calculate your conversion rates:' },
                        { text: '    - Outreaches → Accepts' },
                        { text: '    - Accepts → Replies' },
                        { text: '    - Replies → Calls' },
                        { text: '    - Calls → Interviews' },
                    ],
                },
                tip: {
                    text: 'Pro tip: Use the Today page to see your daily action items. Focus on hitting your daily outreach target (e.g., ~14 outreaches per day for 100 in a week).',
                    link: { text: 'Go to Today page', route: '/' },
                    type: 'info',
                },
            },
        },
    },
} as const;

