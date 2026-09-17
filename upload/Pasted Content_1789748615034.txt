# MASTER UX UPGRADE PROMPT
# Native Professional Bengali + Light/Dark Theme + App-Like Mobile Experience
# Abdullah Mozomdar — Journalist Portfolio / Personal Newsroom

You are working on an EXISTING production-oriented journalist portfolio.

The current site already has:

- English and Bangla versions
- /en/* and /bn/* localization
- premium editorial visual identity
- responsive layouts
- SEO infrastructure
- structured data
- accessibility features
- article/work architecture
- gallery
- contact system
- light/dark visual sections
- reusable content architecture

DO NOT rebuild the website from scratch.

This iteration has THREE major objectives:

1. Rewrite the entire Bangla website into natural, professional,
   human-quality Bengali instead of machine-translated Bengali.

2. Implement a complete LIGHT / DARK / SYSTEM theme architecture.

3. Upgrade the MOBILE EXPERIENCE so the website feels like a premium
   modern news/journalism app to mobile visitors while remaining a fast,
   SEO-friendly website.

These three objectives must be implemented carefully without breaking:

- SEO
- accessibility
- performance
- localization
- existing URLs
- structured data
- desktop editorial identity
- contact functionality
- article functionality
- gallery
- filters
- current factual safeguards


==================================================
PART 1 — FIX THE ENTIRE BANGLA WEBSITE
==================================================

CRITICAL PROBLEM:

The current Bangla version reads like machine translation.

This is unacceptable for a professional Bangladeshi journalist's website.

Do NOT simply translate English sentences word-for-word.

Rewrite the entire Bangla experience as if it were written by a
professional Bangladeshi newsroom editor.


==================================================
1. BANGLA LANGUAGE STANDARD
==================================================

Bangla should feel:

- natural
- fluent
- professional
- concise
- contemporary
- editorial
- journalist-friendly
- familiar to Bangladeshi readers

Use standard contemporary Bangladeshi Bengali.

Avoid unnecessarily literary or archaic vocabulary.

Avoid robotic translation.

Avoid English sentence structures copied into Bangla.

Avoid awkward literal translations.

Avoid overly formal সরকারি-চিঠি style Bengali.

Avoid excessive English words where a natural Bangla equivalent exists.

At the same time:

Do not force obscure Bangla translations for familiar professional terms.


==================================================
2. THINK IN BANGLA — DO NOT TRANSLATE WORD BY WORD
==================================================

For every Bangla UI string:

First understand the INTENT of the English copy.

Then write how a professional Bangladeshi publication would naturally
express that idea.

BAD APPROACH:

English:
Selected Journalism

Machine-like Bangla:
নির্বাচিত সাংবাদিকতা

BETTER CONTEXTUAL OPTIONS:

নির্বাচিত প্রতিবেদন

or:

বাছাই করা প্রতিবেদন

Choose based on the context.


Another example:

English:
Latest Reporting

Avoid awkward literal translation.

Prefer:

সাম্প্রতিক প্রতিবেদন

or where appropriate:

সর্বশেষ প্রতিবেদন


English:
Reporting Experience

Prefer:

সাংবাদিকতার অভিজ্ঞতা

or:

পেশাগত অভিজ্ঞতা

depending on the section.


==================================================
3. BANGLA EDITORIAL VOICE
==================================================

The Bangla version should sound like a professional journalist speaking
about their work.

It should NOT sound like:

- Google Translate
- AI translation
- corporate HR copy
- academic Bangla
- government correspondence

Keep sentences relatively short.

Prioritize clarity.


==================================================
4. REWRITE ALL BANGLA COPY
==================================================

Audit and rewrite EVERY Bangla-facing string.

This includes:

- navigation
- hero
- section headings
- section descriptions
- biography
- experience
- professional memberships
- education
- reporting-area labels
- article labels
- story metadata
- filters
- search
- gallery
- contact page
- contact form
- buttons
- CTAs
- empty states
- loading states
- validation errors
- success messages
- 404
- footer
- accessibility labels where localized
- metadata
- Open Graph text
- structured-data localized text where appropriate

Do not leave machine-translated strings hidden in secondary pages.


==================================================
5. BANGLA NAVIGATION
==================================================

Use concise natural navigation.

Recommended direction:

Home
হোম

About
পরিচিতি

Experience
অভিজ্ঞতা

Work
প্রতিবেদন

Articles
লেখা

Gallery
গ্যালারি

Contact
যোগাযোগ

However:

choose the most contextually natural wording based on the actual page.

Do not mechanically follow this list if a better term fits.


==================================================
6. BANGLA HERO
==================================================

Do NOT literally translate:

"Reporting stories that matter."

Create a natural Bangla editorial headline.

Explore concise directions such as:

গুরুত্বপূর্ণ গল্প,
মানুষের কাছে।

or:

যে গল্প
জানা জরুরি।

or:

খবরের ভেতরের
গল্প তুলে ধরা।

Choose ONE polished version that fits the actual visual composition.

Requirements:

- short
- memorable
- professional
- not sensational
- easy to read
- works as large display typography

Do not make it sound like advertising.


==================================================
7. BANGLA CTA LANGUAGE
==================================================

Rewrite CTA labels naturally.

Examples:

VIEW SELECTED WORK
→
নির্বাচিত প্রতিবেদন দেখুন

READ STORY
→
প্রতিবেদন পড়ুন

VIEW ALL
→
সব প্রতিবেদন

GET IN TOUCH
→
যোগাযোগ করুন

BACK TO HOME
→
হোমে ফিরুন

COPY LINK
→
লিংক কপি করুন

Again:

Use context rather than mechanical translation.


==================================================
8. CONTACT LANGUAGE
==================================================

The contact experience should sound professional and human.

Avoid machine-style phrases.

For example:

Have a story?
Let's talk.

Possible Bangla direction:

কোনো তথ্য বা
পেশাগত যোগাযোগ?

যোগাযোগ করুন।

Or another concise natural version.

Do NOT directly translate idiomatic English if it sounds unnatural.


==================================================
9. FORM LABELS
==================================================

Use natural labels:

Name
নাম

Email
ইমেইল

Organization
প্রতিষ্ঠান

Subject
বিষয়

Message
বার্তা

Send Message
বার্তা পাঠান


Loading:

পাঠানো হচ্ছে...


Success:

বার্তা পাঠানো হয়েছে।


Error:

বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।

Keep error messages specific where possible.


==================================================
10. BANGLA DATE FORMAT
==================================================

Use locale-aware Bangla dates.

Example:

17 September 2026

→

১৭ সেপ্টেম্বর ২০২৬

Use Intl.DateTimeFormat or another robust locale-aware solution.

Do not manually maintain translated date strings.


==================================================
11. BANGLA NUMERALS
==================================================

Use Bangla numerals where natural in the Bangla presentation:

২০২৫
২০২৪
২০০৯

Machine-readable:

schema
ISO dates
URLs

should remain technically correct.


==================================================
12. BANGLA TYPOGRAPHY
==================================================

Treat Bangla typography separately from English.

Do NOT inherit aggressive:

uppercase
tracking
letter-spacing
line-height

from English display styles.

For Bangla:

- increase line-height where needed
- avoid glyph clipping
- allow natural wrapping
- use appropriate font weight
- avoid excessive letter spacing
- check punctuation
- check conjunct characters


==================================================
13. BANGLA FONT
==================================================

Use one excellent production-quality Bangla family.

Priorities:

- readability
- Bangladeshi newsroom feel
- headline quality
- body readability
- performance

Do not load multiple unnecessary Bengali fonts.

Optimize font weights.


==================================================
14. BANGLA MOBILE QA
==================================================

Manually inspect Bangla at:

320px
360px
390px
430px

Check:

- hero
- navigation
- buttons
- article titles
- biography
- dates
- filters
- contact
- footer

Fix awkward line breaks individually where design requires it.


==================================================
15. BANGLA FACTUAL INTEGRITY
==================================================

Translation must NEVER change facts.

English and Bangla must agree on:

- employer
- position
- dates
- memberships
- education
- publications
- story metadata

Do not embellish the Bangla version.

Do not add claims during rewriting.


==================================================
16. HUMAN-QUALITY TRANSLATION TEST
==================================================

Before considering each section complete, ask:

"Would a Bangladeshi newsroom editor naturally write this?"

If NO:

rewrite it.

Then ask:

"Does this sound translated from English?"

If YES:

rewrite it.

The objective is NOT translation fidelity word-for-word.

The objective is meaning fidelity + natural Bengali.


==================================================
PART 2 — COMPLETE LIGHT & DARK THEME
==================================================

The website currently contains dark and light sections.

That is NOT the same as implementing a proper theme.

Implement a complete:

LIGHT
DARK
SYSTEM

theme system.


==================================================
17. THEME MODES
==================================================

Support:

Light
Dark
System

System should follow:

prefers-color-scheme


==================================================
18. DEFAULT BEHAVIOR
==================================================

On first visit:

use SYSTEM preference unless the project already has a deliberate
user preference strategy.

If the visitor manually selects Light or Dark:

remember the selection.

Use localStorage or the project's appropriate theme persistence solution.


==================================================
19. NO THEME FLASH
==================================================

Prevent:

white flash before dark theme

or:

dark flash before light theme.

Theme should be resolved as early as safely possible.

Avoid hydration mismatch.


==================================================
20. THEME TOGGLE
==================================================

Add an elegant theme control to:

desktop header
mobile app navigation/settings area

Possible compact UI:

Light / Dark / System

or a theme icon that opens a small accessible selector.

Do NOT create a huge toggle.

The control must match the editorial brand.


==================================================
21. ACCESSIBILITY
==================================================

Theme control must be keyboard accessible.

Provide proper:

aria-label
focus-visible
selected state

Do not communicate selected theme only by color.


==================================================
22. THEME DESIGN TOKENS
==================================================

Refactor colors into semantic CSS variables.

Example architecture:

--background
--foreground
--surface
--surface-elevated
--muted
--muted-foreground
--border
--accent
--accent-foreground
--header-background
--footer-background

Do not hardcode:

#fff
#000

throughout components.


==================================================
23. LIGHT THEME
==================================================

Preserve the warm editorial paper identity.

Suggested conceptual direction:

Background:
warm paper

Foreground:
near-black

Surface:
slightly different warm neutral

Accent:
newsroom red

Borders:
soft neutral rules


==================================================
24. DARK THEME
==================================================

Do NOT simply invert colors.

Create a proper editorial dark theme.

Suggested conceptual direction:

Background:
#0E0E0D / similar

Surface:
#161614 / similar

Elevated surface:
slightly lighter

Primary text:
warm off-white

Secondary:
muted warm gray

Accent:
slightly brighter newsroom red

Borders:
subtle dark-neutral rules

The result should feel like:

late-night newsroom / premium publication

not developer dark mode.


==================================================
25. DARK THEME IMAGES
==================================================

Do not aggressively dim editorial photography.

Images should remain visually accurate.

Only adjust placeholder/background treatments where needed.


==================================================
26. DARK THEME COMPONENT AUDIT
==================================================

Test:

- header
- hero
- selected journalism
- latest reporting
- experience
- profile
- memberships
- reporting areas
- education
- principles
- contact
- footer
- work archive
- story page
- articles
- gallery
- form
- 404
- mobile navigation
- buttons
- filters
- lightbox

No component should assume white background.


==================================================
27. DARK/LIGHT CHAPTER RHYTHM
==================================================

IMPORTANT:

The existing site intentionally uses contrasting dark/light editorial
chapters.

Preserve that artistic concept.

Theme mode should ADAPT those chapters rather than flattening everything.

For example:

In Light theme:

Hero → dark
Reporting → paper
Statement → dark
Career → paper
Principles → dark

In Dark theme:

Hero → deepest black
Reporting → dark surface
Statement → contrasting elevated/dark-red/ink treatment
Career → dark surface
Principles → alternate deep surface

Maintain chapter separation.

Do not make the entire dark theme one flat black page.


==================================================
28. BUTTON THEMING
==================================================

All existing button variants must work in both themes.

Test:

primary
secondary
outline
ghost
editorial link
icon
filter
submit

Verify:

default
hover
active
focus
disabled
loading


==================================================
29. FORM THEMING
==================================================

Inputs in dark mode must not look like default browser controls.

Theme:

background
border
text
placeholder
autofill
focus
error
disabled

Test Chrome autofill in dark mode conceptually.


==================================================
30. THEME META COLOR
==================================================

Update browser theme-color appropriately where supported.

Light theme:
paper/light surface

Dark:
dark surface

Do not compromise SSR/hydration to achieve this.


==================================================
PART 3 — MOBILE SHOULD FEEL LIKE A PREMIUM APP
==================================================

CRITICAL:

Do NOT turn the website into a fake mobile app.

It remains:

- a website
- crawlable
- linkable
- SEO-friendly
- browser-friendly

But the mobile UX should FEEL as polished and immediate as a premium
news app.


==================================================
31. MOBILE PRODUCT PHILOSOPHY
==================================================

Mobile visitors should feel:

- fast
- focused
- immersive
- touch-friendly
- content-first
- app-like

Avoid simply stacking desktop sections vertically.


==================================================
32. MOBILE APP SHELL
==================================================

Create a refined mobile shell.

Top area:

compact sticky app-style header.

Example:

AM/                     বাংলা   ◐

or:

AM/                     Search   Menu

Keep height approximately:

52–60px

depending on typography and safe areas.


==================================================
33. MOBILE BOTTOM NAVIGATION
==================================================

Implement a lightweight bottom navigation for mobile ONLY if it improves
navigation.

Recommended 4–5 destinations maximum:

Home
Reporting
Articles
Gallery
Menu

Possible Bangla:

হোম
প্রতিবেদন
লেখা
গ্যালারি
মেনু

Do NOT put seven destinations in the bottom bar.


==================================================
34. BOTTOM NAV DESIGN
==================================================

Requirements:

- fixed/sticky appropriately
- safe-area aware
- approximately 56–64px plus device safe area
- strong active state
- clear icons
- short labels
- touch targets approximately 44px+
- theme-aware
- subtle top border

Do NOT make it look like an Android Material template.

Keep editorial brand identity.


==================================================
35. DESKTOP MUST NOT SHOW MOBILE BOTTOM NAV
==================================================

Hide bottom navigation at tablet/desktop breakpoint.

Desktop keeps existing editorial header/navigation.


==================================================
36. MOBILE SAFE AREA
==================================================

Use:

env(safe-area-inset-bottom)

and where appropriate:

env(safe-area-inset-top)

Prevent content from hiding behind bottom navigation.


==================================================
37. PAGE BOTTOM PADDING
==================================================

When bottom navigation is present:

add enough page padding so:

buttons
footer links
article content

are not hidden behind it.


==================================================
38. MOBILE HEADER
==================================================

Keep header compact.

Do not show every desktop navigation item.

Provide:

brand
theme
language/menu

or another clean combination.


==================================================
39. MOBILE MENU
==================================================

Menu should feel like an app navigation sheet.

Consider:

full-screen sheet

or:

bottom sheet

depending on current architecture.

Include:

About
Experience
Contact
language
theme
other secondary destinations

Do not duplicate every primary bottom-nav destination unnecessarily.


==================================================
40. MOBILE MENU INTERACTION
==================================================

Must support:

- Escape
- backdrop close
- focus management
- scroll lock
- touch-friendly controls
- reduced motion


==================================================
41. MOBILE HERO
==================================================

The mobile hero must feel designed specifically for mobile.

Do NOT just scale down desktop.

Create a composition such as:

AM/

REPORTING
STORIES
THAT MATTER.

[PORTRAIT / AM FRAME]

Abdullah Mozomdar
Senior Reporter

VIEW REPORTING ↗

Use approximately:

75–90svh

depending on actual content.

Avoid forcing exactly 100vh if it hurts browser UI behavior.


==================================================
42. MOBILE STORY PRESENTATION
==================================================

Story items should feel like premium news-app cards/rows.

But avoid generic rounded cards.

Use:

image
category/date
headline
short deck
publication

with editorial separators.


==================================================
43. FEATURED STORY
==================================================

On mobile:

large edge-to-edge or near-edge image

then:

CATEGORY / DATE

large headline

deck

READ ↗

Make the lead story unmistakably important.


==================================================
44. LATEST REPORTING
==================================================

Mobile should use compact news-feed rows.

Example:

CATEGORY · TIME/DATE

Headline across 2–3 lines

Publication                         ↗

Optional small thumbnail.

Do not show desktop hover behavior.


==================================================
45. TOUCH INTERACTION
==================================================

Increase tap targets.

Important actions should generally have approximately:

44×44px minimum interaction area.

Do not require precise tapping on tiny arrows.


==================================================
46. MOBILE STORY HIT AREA
==================================================

Allow logical story region/title/image to open the story.

Do not make only a 12px arrow clickable.

Avoid nested links.


==================================================
47. MOBILE BUTTONS
==================================================

Primary actions should be easy to tap.

For important mobile CTA:

consider full-width or wide button.

Do not make every button full-width.

Editorial text links remain text-based where appropriate.


==================================================
48. MOBILE TYPOGRAPHY
==================================================

Use responsive typography intentionally.

Do not shrink everything.

Headline:
large enough to feel editorial.

Body:
approximately 16–18px where appropriate.

Metadata:
readable.

Bangla:
may require slightly larger sizing and line-height.


==================================================
49. MOBILE ARTICLE READING MODE
==================================================

Article pages should feel especially app-like.

Prioritize:

- headline
- deck
- byline
- hero
- reading content

Remove unnecessary visual clutter.


==================================================
50. MOBILE READING PROGRESS
==================================================

If reading progress already exists and works:

refine it for mobile.

A thin top progress bar is acceptable.

Do not add heavy interaction.


==================================================
51. MOBILE STICKY ARTICLE ACTIONS
==================================================

Consider a SMALL article action area for:

Share
Save/bookmark UI only if actual save functionality exists
Copy link

IMPORTANT:

Do not display a Save button that does nothing.

No fake functionality.


==================================================
52. NATIVE WEB SHARE
==================================================

On supported mobile browsers:

use Web Share API for Share.

Fallback:

existing share controls.

This provides a more native/app-like experience without heavy SDKs.


==================================================
53. PULL-TO-REFRESH
==================================================

Do NOT implement fake custom pull-to-refresh.

Let the browser handle it.


==================================================
54. HAPTICS
==================================================

Do NOT add unnecessary vibration/haptic gimmicks.


==================================================
55. MOBILE GALLERY
==================================================

Gallery should feel touch-native.

Support:

tap image
swipe/next where accessible and lightweight
close
caption
counter

Do not break keyboard accessibility on larger devices.


==================================================
56. MOBILE FILTERS
==================================================

For Work/Articles:

use a horizontally scrollable filter rail if needed.

Example:

All
Reports
Features
Interviews
...

Use:

scroll-snap where useful.

Hide scrollbar visually only if still usable.

Active filter must be obvious.


==================================================
57. MOBILE SEARCH
==================================================

If search already exists:

make it easy to open from mobile.

Use an app-like search overlay/sheet.

Do NOT add search infrastructure if search doesn't already exist unless
it can be implemented cleanly from existing local data.


==================================================
58. MOBILE CONTACT
==================================================

Optimize form for phones.

Use correct input types:

email
text

Use:

autocomplete
inputmode where appropriate

Ensure the keyboard does not obscure active controls.


==================================================
59. MOBILE FOOTER
==================================================

Because bottom navigation exists:

do not make the footer excessively long.

Preserve the back-cover identity.

Use:

large Abdullah Mozomdar branding
contact
secondary links

but keep it efficient.


==================================================
60. APP-LIKE PAGE TRANSITIONS
==================================================

Use very subtle transitions if already supported.

Possible:

opacity
small translate

approximately:

150–220ms

Do NOT make navigation slower.

No fake splash screen.

No loading animation between instant pages.


==================================================
61. SCROLL RESTORATION
==================================================

Ensure browser navigation behaves naturally.

Back should return users appropriately.

Do not override browser history unnecessarily.


==================================================
62. OPTIONAL PWA READINESS
==================================================

Make the site PWA-ready if this can be done cleanly.

At minimum verify:

manifest
icons architecture
theme colors
standalone-friendly layout

But:

DO NOT force installation prompts.

DO NOT show aggressive "Install App" banners.

This is optional enhancement, not the core objective.


==================================================
63. PERFORMANCE IS CRITICAL FOR APP FEEL
==================================================

App-like UX comes primarily from SPEED.

Prioritize:

- minimal JS
- Server Components
- image optimization
- font optimization
- route prefetching where appropriate
- small interactive bundles
- no heavy animation library

Do not achieve "app feel" through heavy JavaScript.


==================================================
64. MOBILE CORE WEB VITALS
==================================================

Optimize specifically for mobile:

LCP
CLS
INP

Avoid:

layout shifts
late font jumps
oversized hero assets
heavy hydration
blocking scripts


==================================================
PART 4 — CROSS-SYSTEM CONSISTENCY
==================================================

65. English Light
must work.

66. English Dark
must work.

67. Bangla Light
must work.

68. Bangla Dark
must work.

69. Mobile English Light
must work.

70. Mobile English Dark
must work.

71. Mobile Bangla Light
must work.

72. Mobile Bangla Dark
must work.

Do not treat any of these combinations as secondary.


==================================================
73. THEME + LANGUAGE PERSISTENCE
==================================================

Changing language should NOT reset theme.

Example:

User selects:

Dark

then switches:

EN → বাংলা

The site should remain Dark.


==================================================
74. MOBILE NAV + LANGUAGE
==================================================

Switching language should preserve equivalent page.

Example:

/en/work/story

→ বাংলা →

/bn/work/story

Bottom navigation should update labels automatically.


==================================================
75. MOBILE NAV + THEME
==================================================

Theme change must immediately update:

header
bottom navigation
menu
page
forms
footer
lightbox

No mixed-theme components.


==================================================
PART 5 — PROFESSIONAL BANGLA CONTENT ARCHITECTURE
==================================================

76. DO NOT HARD-CODE BANGLA THROUGH COMPONENTS

Keep locale copy centralized.

Use the existing localization architecture.


==================================================
77. SEPARATE UI COPY FROM JOURNALISM CONTENT
==================================================

Maintain separate concepts:

UI dictionary:
buttons
navigation
errors
labels

Content:
bio
stories
experience
education
membership

This makes editorial review easier.


==================================================
78. ADD TRANSLATION REVIEW COMMENTS/FLAGS
==================================================

For Bangla content that has NOT been manually verified:

support a developer/editorial review flag if useful.

Example concept:

translationStatus:
"reviewed"
"needs-review"

Do not display this publicly.

This is for content management quality.


==================================================
79. DO NOT MACHINE-TRANSLATE MISSING STORIES AT RUNTIME
==================================================

If a Bangla story translation does not exist:

do NOT send content to an automatic translation service.

Use a controlled fallback.

For example:

show English content with an appropriate language indication

or hide the unavailable translation.

Choose the cleanest architecture.


==================================================
80. BANGLA NAME SAFETY
==================================================

Do not assume AI-generated Bangla spelling of the journalist's name is
verified.

Keep it configurable until confirmed by the journalist.


==================================================
PART 6 — QA
==================================================

81. TEST VIEWPORTS

Desktop:

1920×1080
1440×900
1280×800

Tablet:

1024×768
768×1024

Mobile:

430×932
390×844
375×812
360×800
320×568


==================================================
82. TEST ALL FOUR VISUAL STATES
==================================================

At minimum inspect screenshots for:

EN / LIGHT
EN / DARK
BN / LIGHT
BN / DARK

on:

1440 desktop
390 mobile


==================================================
83. MOBILE APP QA
==================================================

Verify:

- bottom navigation
- active state
- safe area
- menu
- theme
- language
- scroll
- article links
- back navigation
- gallery
- forms
- footer
- no content hidden behind nav


==================================================
84. BANGLA HUMAN-QUALITY QA
==================================================

Review EVERY public Bangla page.

Search for:

- awkward literal translation
- English sentence structure
- unnatural vocabulary
- duplicated words
- mixed English/Bangla without reason
- inconsistent terminology
- incorrect punctuation
- unnatural CTA language

Rewrite them.


==================================================
85. DARK MODE QA
==================================================

Search the codebase for hardcoded:

white
black
gray
red
hex values

where semantic theme variables should be used.

Do not blindly replace intentional brand/decorative colors.


==================================================
86. ACCESSIBILITY QA
==================================================

Test:

keyboard
screen-reader semantics
focus
theme selector
bottom navigation
mobile menu
forms
lightbox
contrast
reduced motion

Dark mode must meet contrast requirements too.


==================================================
87. BUILD QA
==================================================

Run:

lint
type check
production build

Fix errors.

Check runtime console.

No hydration errors.

No theme hydration warnings.

No missing translation warnings.


==================================================
88. PERFORMANCE QA
==================================================

Check that the new:

theme system
mobile navigation
Bangla improvements

did NOT significantly increase client JS.

Avoid unnecessary global state libraries.


==================================================
89. DO NOT ADD UNNECESSARY LIBRARIES
==================================================

Use the existing stack whenever possible.

Do not add:

large animation frameworks
large localization frameworks
large state managers

unless the existing architecture genuinely requires them.


==================================================
PART 7 — COMPLETION CRITERIA
==================================================

This iteration is complete only when:

1. Bangla no longer feels machine translated.

2. Bangla reads naturally to a Bangladeshi audience.

3. Every major public Bangla string has been reviewed.

4. Light theme is complete.

5. Dark theme is complete.

6. System theme works.

7. Theme preference persists.

8. No theme flash/hydration problem exists.

9. Mobile feels intentionally designed like a premium journalism app.

10. Mobile bottom navigation works correctly if implemented.

11. Mobile safe areas are handled.

12. English and Bangla share the same brand quality.

13. Dark and light themes share the same brand quality.

14. SEO remains intact.

15. Accessibility remains intact.

16. Production build passes.

17. Performance remains strong.


==================================================
FINAL IMPLEMENTATION INSTRUCTION
==================================================

Do not return a proposal.

Do not simply explain how these features could be implemented.

OPEN THE EXISTING PROJECT AND IMPLEMENT THEM.

Work in this order:

PHASE 1
Audit every Bangla string.

PHASE 2
Rewrite Bangla into natural professional Bangladeshi editorial language.

PHASE 3
Refactor semantic theme tokens.

PHASE 4
Implement Light / Dark / System.

PHASE 5
Implement theme persistence and flash prevention.

PHASE 6
Redesign mobile navigation/app shell.

PHASE 7
Refine mobile homepage.

PHASE 8
Refine mobile story/article experience.

PHASE 9
Test Bangla mobile typography.

PHASE 10
Test EN/BN × Light/Dark.

PHASE 11
Run accessibility, SEO and performance regression checks.

PHASE 12
Run lint, type check and production build.

Do not redesign the desktop visual identity unnecessarily.

The final product should feel like:

A PREMIUM BANGLADESHI JOURNALIST'S DIGITAL PUBLICATION ON DESKTOP

and

A FAST, POLISHED JOURNALISM APP EXPERIENCE ON MOBILE.

Most importantly:

THE BANGLA VERSION MUST FEEL WRITTEN IN BANGLA,
NOT TRANSLATED INTO BANGLA.