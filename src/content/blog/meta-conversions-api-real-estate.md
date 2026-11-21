---
title: "Meta Conversions API and offline conversions for real estate, explained"
seoTitle: "Meta Conversions API for real estate: a plain-English setup"
description: "How real estate teams send qualified leads and site visits back to Meta with the Conversions API and offline conversions, so ads find buyers, not form-fillers."
summary: "The Meta pixel only sees what happens on a website. In real estate the events that matter, a qualified call, a site visit, a booking, happen later in the CRM or at the project. The Conversions API sends those events from your server or CRM back to Meta, matched to the original lead, so campaigns learn what a buyer looks like. On the accounts I set it up for, this was the base for lifting Meta lead qualification from a 5.9% average to 17.9%."
pubDate: 2026-11-22
stat: "CAPI"
statLabel: "qualified leads and site visits, sent back to Meta"
topic: real-estate
keyphrase: "meta conversions api real estate"
related: lucentia-digital
faq:
  - q: "What is the Meta Conversions API in simple words?"
    a: "It is a way to tell Meta about results that happen off the website, such as a lead becoming qualified or visiting a site, by sending those events from your server or CRM. Meta matches each event to the person who saw the ad and uses it to find more people like them."
  - q: "Do I need the Conversions API if I use Meta lead forms?"
    a: "Yes, if you want lead quality. A lead form only tells Meta that someone submitted. Sending back which of those leads qualified or visited is what lets Meta optimise for buyers instead of form-fillers."
  - q: "Which events should a real estate developer send back to Meta?"
    a: "Keep it to the stages that predict a sale and happen often enough to learn from: qualified lead, site visit scheduled, site visit done and booking. Use the same names every time and send them within a day or two of happening."
  - q: "Is it legal to send lead data back to Meta?"
    a: "Meta matches on hashed contact details, not plain text, and your privacy policy and lead form should say the data is used for advertising. Check the current rules for your market with your legal team; this post is about the marketing setup, not legal advice."
---

Every real estate marketer I know has the same complaint about Meta: plenty of leads, very few buyers. The fix most people try is in the ad. The fix that actually works is in the data you send back.

Meta only optimises for what it can see. If the only thing it ever hears is "someone submitted a form", it gets very good at finding people who submit forms. In real estate the moments that matter happen days later and far from the website: a sales call that confirms the budget, a family walking through the sample flat, a booking cheque. The **Conversions API** is how you tell Meta about those moments.

## The pixel versus the Conversions API

| | Meta pixel | Conversions API (CAPI) |
|---|---|---|
| Where it runs | In the visitor's browser | On your server or CRM |
| What it sees | Page views, form submits on your site | Anything you record: calls, visits, bookings |
| Blocked by ad blockers and browser privacy | Often | No |
| Real estate use | Landing page visits, website leads | Qualified leads, site visits, bookings |

Meta's own guidance is to run both together, with an event ID so the same action is not counted twice. The pixel catches the website moments; CAPI carries everything after.

## Offline conversions: the real estate version

"Offline conversion" just means a result that happened outside the website. For a developer, the ladder usually looks like this:

1. **Lead** (form or WhatsApp chat)
2. **Qualified lead** (budget, configuration and timeline confirmed on a call)
3. **Site visit scheduled**
4. **Site visit done**
5. **Booking**

Each step is an event you can send back. The deeper the step, the closer it is to money, but the fewer of them there are. Meta needs enough events each week to learn from, so for a single project the sweet spot is usually *qualified lead* and *site visit done*. Bookings are too rare to optimise on by themselves, but they are still worth sending for reporting and lookalike audiences.

## How the setup works, step by step

**1. Give every lead an ID the CRM keeps.** When a lead arrives from a Meta form, its lead ID and contact details land in the CRM or sheet. That ID is what lets Meta match a later event to the original ad click.

**2. Agree the stages with sales.** One definition of "qualified" that everyone uses. If one salesperson marks a lead qualified after a friendly chat and another only after a budget check, the signal Meta learns from is noise.

**3. Send stage changes back, automatically.** When a lead's status changes in the CRM, an event goes to Meta with the lead ID and hashed phone or email. This can be a native CRM integration, a tool like Zapier or Make, or a small script. Manual uploads work for a test, but they get forgotten within a month.

**4. Send fast.** An event sent two weeks later is far less useful than one sent the same day, because the campaign has already moved on.

**5. Check match quality.** Events Manager shows how many events were matched to a person. Low match rates usually mean phone numbers are stored in different formats; fix the format once, in the CRM.

## What changes when Meta gets the right signal

Once qualified leads and site visits flow back, three things become possible:

- **Optimising for quality.** Campaigns can be pointed at the qualified-lead event instead of raw leads, so delivery shifts toward people who look like past qualified leads.
- **Judging ads on cost per qualified lead.** Some ads look cheap and never produce a single site visit. You can only see that when the deeper events come back.
- **Better lookalikes.** A lookalike built from verified buyers and site visitors is a very different audience from one built from everyone who ever filled a form.

On the real estate accounts I set this up for, sending qualified leads back through the Conversions API, together with offline conversion tracking and lookalikes from verified buyer lists, was the base for the changes described in [lifting Meta lead quality from 5.9% to 17.9%](/blog/meta-ads-lead-quality-real-estate/). In the same month, Meta cost per lead fell 15.7%, because money moved away from ads that only produced form-fillers.

## Common mistakes

- **Sending every CRM stage.** Ten event types with three events each teach Meta nothing. Pick two or three stages that happen often.
- **Changing definitions mid-campaign.** If "qualified" changes, the learning resets. Agree it once and write it down.
- **No event deduplication.** If the pixel and the API both report the same lead without a shared event ID, results look doubled.
- **Forgetting the WhatsApp leads.** Many real estate enquiries now start as a chat. Those leads need to reach the CRM, and their stage changes need to go back too. I covered the chat side in [hot, warm, cold WhatsApp qualification](/blog/real-estate-lead-qualification-whatsapp/).

## Where to start this week

If you run Meta for a project and none of this is in place, start small: export last month's leads with their final status, upload the qualified ones and the site visits as an offline event set, and compare which ads they came from. Most teams find their "best" ad by cost per lead is not their best ad by site visits. That single table usually makes the case for automating the rest.

For the bigger picture of planning a launch around qualified leads, see [how I planned a luxury pre-launch in Noida](/blog/luxury-real-estate-pre-launch-marketing/). The official reference is Meta's [Conversions API documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/).
