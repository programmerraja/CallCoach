export const PROMPT = `You are an AI assistant tasked with analyzing sales call recordings to provide insights that can be used to improve sales performance. 

**Here are the key areas to focus on during your analysis:**

*   **Customer Perception:**  Analyze the language customers use to determine how they perceive the brand, the solution, and the value proposition.
*   **Competitive Landscape:** Identify mentions of competitors and analyze the context to understand customer perceptions of the competition.
*   **Objections and Concerns:**  Identify and categorize customer objections. Analyze the language and tone used to express concerns.
*   **Sales Rep Performance:** Analyze the sales rep's talk-to-listen ratio, questioning techniques, ability to articulate value, and effectiveness in addressing objections.
*   **Messaging Effectiveness:** Evaluate whether the sales messaging resonates with customers and effectively addresses their needs.
*   **Sentiment Analysis:** Assess the overall sentiment of the call, including both customer and sales rep sentiment. 

**Based on your analysis, provide the following insights:**

*   Key customer insights, including their wants, needs, perceptions, and objections.
*   Strengths and weaknesses of the sales rep's performance, along with specific areas for improvement.
*   Recommendations for improving sales messaging and addressing customer objections. 
*   Identification of best practices that can be shared with other sales reps.
*   Insights for marketing teams to improve campaigns and messaging.

**Tips for Analysis:**

*   Pay attention to specific keywords and phrases used by both the customer and the sales rep. 
*   Consider the tone of voice and emotional cues to understand underlying sentiments.
*   Look for patterns and trends across multiple calls to identify common challenges and opportunities. 

**Remember:** The goal of this analysis is not to criticize sales reps but to identify actionable insights that can improve sales performance across the entire team.

**Please note:** This prompt incorporates information and concepts found in the provided sources. It is designed to guide your analysis but should be adapted based on your specific needs and the context of your sales calls. 
`;

export const METRICS_PROMPT = `You are a sales call analyst AI. Analyze the provided sales call transcript and extract the following metrics. Return your analysis as a JSON object with the specified keys and values.

JSON Structure:
{
  "talk_to_listen_ratio": {"sales_rep": <percentage>, "customer": <percentage>}, 
  "objection_count": <integer>,
  "competitor_mentions": {
    "<competitor_name_1>": <mention_count_integer>,
    "<competitor_name_2>": <mention_count_integer>,
    ...
  },
  "sentiment": {
    "overall_sentiment": "<positive/negative/neutral>", 
    "sales_rep_sentiment": "<positive/negative/neutral>",
    "customer_sentiment": "<positive/negative/neutral>" 
  },
  "filler_words": array<string>,
  "longest_monologue_duration": <seconds or percentage of call>, 
  "questions_asked": {"sales_rep": array<string>, "customer": array<string>},
  "actionable_insights": <string>
}
Example Input (Sales Call Transcript):
Sales Rep: Hi [Customer Name], thanks for taking my call today. 
Customer: No problem.
Sales Rep: ... (continues with sales pitch) ...
Customer: Well, I'm also considering [Competitor Name]. Their pricing seems more competitive. 
Sales Rep: ... (responds to objection) ...
Example Output (JSON):
{
  "talk_to_listen_ratio": {"sales_rep": 60, "customer": 40},
  "objection_count": 1,
  "competitor_mentions": {
    "[Competitor Name]": 1
  },
  "sentiment": {
    "overall_sentiment": "neutral",
    "sales_rep_sentiment": "positive",
    "customer_sentiment": "neutral"
  },
   "filler_words": ["um", "like"],
  "longest_monologue_duration": 45, 
  "questions_asked": { "sales_rep": [
      "How are you doing today?",
      "What are you looking for in a solution?"
    ],
    "customer": [
      "What are your pricing options?"
    ]},
  "actionable_insights": "Sales Rep should focus on the customer's pricing options and ask more questions to understand their needs better."
}
Explanation:
- The provided JSON structure outlines the specific metrics you identified earlier, ensuring the GPT output is organized and easily parsed by your application.
- Remember to adapt the competitor_mentions field based on your specific industry and competitors. You might need to pre-populate it with potential competitors for the model to recognize and count.
- You'll need to decide how to quantify "longest monologue duration" – either in seconds or as a percentage of the total call duration.
- Sentiment analysis can be more nuanced; you might want to consider a scale (e.g., 1-5) or categories like "very positive," "slightly negative," etc., instead of just positive, negative, and neutral.`;

export const SUMMARY_PROMPT = `You are a sales call analyst AI. You are provided with a transcript of a sales call. Your task is to create a concise yet informative summary of the call. Highlight the key points of the conversation, focusing on the following aspects: 

*   **Purpose of the Call:** Briefly describe the objective of the sales call from the sales representative's perspective. 
*   **Customer Needs and Pain Points:** Summarize the customer's expressed needs, challenges, or pain points. 
*   **Value Proposition and Solutions Discussed:** Outline how the sales representative presented the product/service and addressed the customer's needs. 
*   **Objections Raised:** Summarize any objections or concerns voiced by the customer during the call.
*   **Next Steps:**  Clearly state the agreed-upon next steps, if any, including follow-up actions or scheduled meetings.
*   **Overall Sentiment:** Provide a brief assessment of the overall sentiment of the call. Was it positive, negative, or neutral?

Present your summary in a clear and easy-to-read format.`;


export const PERSONA_PROMPT = (persona: string, conversation: Array<string> ) =>  `You are an AI assistant simulating a cold call conversation. The user has selected ${persona} prospect persona, 
and your task is to respond in a manner that aligns with that persona. Respond to the user’s pitch or query according to the characteristics of the chosen prospect persona. 
below are the characteristics of the persona:
${PERSONA_PROMPT_LIST[persona]}

Instructions:
The conversation should feel realistic for the prospect persona.
Focus on tone, language, and style that fits the selected persona.
Use natural dialogue and allow the conversation to progress naturally based on the persona's behavior and reactions.


so far Conversation:
${conversation.join("\n")}

just return the prospect reply for the above message
`;



export const PERSONA_PROMPT_LIST = {
  positive: `Tone: Optimistic, friendly, and open.
Response Style: Engaged, interested, and willing to explore possibilities.
Behavior: Encouraging, may ask insightful questions and express interest in learning more about the product.`,
  negative: `Tone: Skeptical, dismissive, or uninterested.
Response Style: Quick to shut down the conversation, may show frustration or impatience.
Behavior: Tends to be critical, focused on objections or past negative experiences.`,
  neutral: `Tone: Neutral, non-committal, and factual.
Response Style: Calm, may ask for clarification or details without showing strong interest or disinterest.
Behavior: No emotional response, looking for facts but not ready to make a decision.`,
  curious: `Tone: Inquisitive, interested, but not yet convinced.
Response Style: Asks questions to better understand the product, its benefits, and how it works.
Behavior: Will engage in a back-and-forth conversation, eager to explore the solution further but may not yet be ready to commit.`,
  skeptical: `Tone: Doubtful, cautious, and uncertain.
Response Style: Focuses on questioning the validity or effectiveness of the product.
Behavior: Often asks for proof or evidence, may challenge the salesperson’s claims.`,
  busy: `Tone: Short, to-the-point, and impatient.
Response Style: Minimal interaction, looking for a quick answer to decide if they want to engage further.
Behavior: May indicate that they don’t have time for a detailed conversation and will quickly dismiss irrelevant information.`,
  indecisive: `Tone: Hesitant, unsure, and uncertain.
Response Style: Can’t make a decision easily, may express doubt or confusion.
Behavior: Needs reassurance, might ask for more information or request a follow-up before making a final decision.`,
"price-sensitive": `Tone: Concerned about cost, focused on budget.
Response Style: Will question the price and express concerns about affordability.
Behavior: Wants to know if there are discounts, special offers, or cheaper alternatives. May be willing to buy if the price is right, but cost is a major barrier.`,
"decision-maker": `Tone: Authoritative, confident, and focused.
Response Style: Direct and to the point, focused on value and ROI.
Behavior: Asks strategic questions about how the product will impact their business or team, may discuss budget and timelines.`,
overwhelmed:`Tone: Stressed, overloaded with tasks, or distracted.
Response Style: Short and unfocused, may be hard to hold attention.
Behavior: May show disinterest or frustration, indicating they have too much on their plate. The salesperson will need to quickly provide a clear and compelling reason to continue the conversation.`
};

export const TRANSCRIPT = {
  id: "584bc919-c33c-424a-8e9b-bc5f56de55be",
  language_model: "assemblyai_default",
  acoustic_model: "assemblyai_default",
  language_code: "en_us",
  status: "completed",
  audio_url:
    "https://cdn.assemblyai.com/upload/09446332-9439-40c4-8240-bdbb5e5be0ee",
  text: "Hello. May I, please, Anthony. Hello, this is Anthony. Hi, Anthony. My name is Jeff, and I'm calling on behalf of education experts from a quality monitor line, and here that you recently filled the form on the Internet indicating an interest in earning a degree. Yes. Correct. Yes. I only need a few moments of her time to mention the most appropriate schools. Are you at least 18 years of age? Yeah, I'm 29. 29. Okay. And do you currently have a high school diploma or a ged? Yes, I do. Okay, thank you, Anthony. And if we can find a school for you that meets your needs, would you be interested in furthering your education in the next six months? Yeah, of course. The course I'd like to take up would be computer engineering. Computer engineering. Okay. And, Anthony, I only need a few moments of your time, okay, to verify your information. Your first name is Anthony, and your last name is Bella. Is this correct? Yes. Okay, Anthony, now, if I may ask, if we can find school for you that meets your needs, would you be interested in furthering your education? Yeah, in the next six months? Definitely. Thank you, Anthony. Okay, could you please verify your complete address, including the city, state, and the zip code? All right, it's 1905 Bramblewood Drive, St. Cloud, Florida, 34769. Okay. Is the street number 1905? Yeah, 1905. And the street name is Bramblewood. Right. Is that correct? That's correct. Okay. Okay, so it's 1905 Bramblewood Drive, St. Cloud, Florida, 34769. Yes. Correct. Yep. Okay, and could you please verify your email address? It's pella anthony@yahoo.com. thank you so much for the verification. Yeah. Now, you mentioned computer engineering, right? Mm. May I ask, what degree type were you looking to obtain? Is it associate or whatever I need to do? If I get in the first door, I do associate. Probably move my way up the ladder, you know? Okay, so get my first one and then keep on going. Okay, so would be associate degree for the moment? Yep. Okay. Anthony, you've mentioned that you're 21. I'm sorry, 29 years old now, if I may ask. Well, what's the highest level of education? I dropped out when I was in the 11th grade, and I started doing plumbing. I've actually been doing plumbing for 13 years. I'm a registered apprentice. I actually only have to take the test to become a journeyman's. A journeyman to open my own company. And I'm not too fond of plumbing, you know, saying I need something, I want to do something else besides plumbing. For the rest of my life. Okay. And do you have a diploma or a GED? I have a GED. GED. Okay. And what year did you obtain your GED? 1999. Okay, and for your class type reference, would it be online, on campus or. No, probably campus. Probably would be campus. Campus. Okay. Just in case we'll not be able to find a campus based school, would you be okay with an online school? Yeah. Okay. And are you a United States citizen? Yes, I am. Thank you. And are you associated with the United States military? What was that? I'm sorry? Are you associated with the United States military? No, I'm not. Okay. And what would be the best time for a school enrollment counselor to contact you in the morning, afternoon, or evening? Pretty much any time of the day. And what is your exact date of birth? 10, 1580. So that would be October 15th, 1980? That's correct. Okay. Okay, Anthony, if we can find school for you that meets your needs, school enrollment counselors will be contacting you in the near future, either by phone or by email, and they can answer any questions you may have regarding financial aid, which assistance, their program requirements and policies. And so with that, I would just like to thank you for your time. Okay. Once again, we thank you for choosing education experts. And thank you. You're welcome. All right, you too. Bye.",
  words: [
    {
      text: "Hello.",
      start: 1480,
      end: 1736,
      confidence: 0.94271,
      speaker: null,
    },
    {
      text: "May",
      start: 1736,
      end: 1872,
      confidence: 0.6092,
      speaker: null,
    },
    {
      text: "I,",
      start: 1872,
      end: 1944,
      confidence: 0.81548,
      speaker: null,
    },
    {
      text: "please,",
      start: 1944,
      end: 2400,
      confidence: 0.98523,
      speaker: null,
    },
    {
      text: "Anthony.",
      start: 2489,
      end: 3113,
      confidence: 0.80583,
      speaker: null,
    },
    {
      text: "Hello,",
      start: 3249,
      end: 4025,
      confidence: 0.3404,
      speaker: null,
    },
    {
      text: "this",
      start: 4145,
      end: 4353,
      confidence: 0.99092,
      speaker: null,
    },
    {
      text: "is",
      start: 4369,
      end: 4521,
      confidence: 0.9984,
      speaker: null,
    },
    {
      text: "Anthony.",
      start: 4553,
      end: 5165,
      confidence: 0.53813,
      speaker: null,
    },
    {
      text: "Hi,",
      start: 5665,
      end: 6065,
      confidence: 0.98595,
      speaker: null,
    },
    {
      text: "Anthony.",
      start: 6105,
      end: 6553,
      confidence: 0.94823,
      speaker: null,
    },
    {
      text: "My",
      start: 6649,
      end: 6833,
      confidence: 0.98213,
      speaker: null,
    },
    {
      text: "name",
      start: 6849,
      end: 6953,
      confidence: 0.99948,
      speaker: null,
    },
    {
      text: "is",
      start: 6969,
      end: 7121,
      confidence: 0.97777,
      speaker: null,
    },
    {
      text: "Jeff,",
      start: 7153,
      end: 7449,
      confidence: 0.47833,
      speaker: null,
    },
    {
      text: "and",
      start: 7497,
      end: 7633,
      confidence: 0.99091,
      speaker: null,
    },
    {
      text: "I'm",
      start: 7649,
      end: 7777,
      confidence: 0.9179,
      speaker: null,
    },
    {
      text: "calling",
      start: 7801,
      end: 8121,
      confidence: 0.65087,
      speaker: null,
    },
    {
      text: "on",
      start: 8153,
      end: 8345,
      confidence: 0.99949,
      speaker: null,
    },
    {
      text: "behalf",
      start: 8385,
      end: 8745,
      confidence: 0.70579,
      speaker: null,
    },
    {
      text: "of",
      start: 8785,
      end: 9033,
      confidence: 0.99746,
      speaker: null,
    },
    {
      text: "education",
      start: 9089,
      end: 9593,
      confidence: 0.999,
      speaker: null,
    },
    {
      text: "experts",
      start: 9729,
      end: 10233,
      confidence: 0.99709,
      speaker: null,
    },
    {
      text: "from",
      start: 10289,
      end: 10457,
      confidence: 0.96935,
      speaker: null,
    },
    {
      text: "a",
      start: 10481,
      end: 10593,
      confidence: 0.72221,
      speaker: null,
    },
    {
      text: "quality",
      start: 10609,
      end: 10929,
      confidence: 0.98111,
      speaker: null,
    },
    {
      text: "monitor",
      start: 10977,
      end: 11361,
      confidence: 0.56464,
      speaker: null,
    },
    {
      text: "line,",
      start: 11433,
      end: 12001,
      confidence: 0.55117,
      speaker: null,
    },
    {
      text: "and",
      start: 12153,
      end: 12705,
      confidence: 0.57369,
      speaker: null,
    },
    {
      text: "here",
      start: 12825,
      end: 13225,
      confidence: 0.7455,
      speaker: null,
    },
    {
      text: "that",
      start: 13305,
      end: 13545,
      confidence: 0.73609,
      speaker: null,
    },
    {
      text: "you",
      start: 13585,
      end: 13737,
      confidence: 0.38197,
      speaker: null,
    },
    {
      text: "recently",
      start: 13761,
      end: 14041,
      confidence: 0.99388,
      speaker: null,
    },
    {
      text: "filled",
      start: 14113,
      end: 14361,
      confidence: 0.98642,
      speaker: null,
    },
    {
      text: "the",
      start: 14393,
      end: 14585,
      confidence: 0.71432,
      speaker: null,
    },
    {
      text: "form",
      start: 14625,
      end: 14897,
      confidence: 0.99926,
      speaker: null,
    },
    {
      text: "on",
      start: 14961,
      end: 15137,
      confidence: 0.98243,
      speaker: null,
    },
    {
      text: "the",
      start: 15161,
      end: 15321,
      confidence: 0.95742,
      speaker: null,
    },
    {
      text: "Internet",
      start: 15353,
      end: 15953,
      confidence: 0.95742,
      speaker: null,
    },
    {
      text: "indicating",
      start: 16089,
      end: 16569,
      confidence: 0.95639,
      speaker: null,
    },
    {
      text: "an",
      start: 16617,
      end: 16777,
      confidence: 0.98959,
      speaker: null,
    },
    {
      text: "interest",
      start: 16801,
      end: 17057,
      confidence: 0.97985,
      speaker: null,
    },
    {
      text: "in",
      start: 17121,
      end: 17297,
      confidence: 0.9872,
      speaker: null,
    },
    {
      text: "earning",
      start: 17321,
      end: 17505,
      confidence: 0.93147,
      speaker: null,
    },
    {
      text: "a",
      start: 17545,
      end: 17697,
      confidence: 0.99175,
      speaker: null,
    },
    {
      text: "degree.",
      start: 17721,
      end: 18385,
      confidence: 0.90972,
      speaker: null,
    },
    {
      text: "Yes.",
      start: 18545,
      end: 18937,
      confidence: 0.54883,
      speaker: null,
    },
    {
      text: "Correct.",
      start: 19001,
      end: 19625,
      confidence: 0.60692,
      speaker: null,
    },
    {
      text: "Yes.",
      start: 19785,
      end: 20525,
      confidence: 0.5177,
      speaker: null,
    },
    {
      text: "I",
      start: 21345,
      end: 21657,
      confidence: 0.99588,
      speaker: null,
    },
    {
      text: "only",
      start: 21681,
      end: 21841,
      confidence: 0.99849,
      speaker: null,
    },
    {
      text: "need",
      start: 21873,
      end: 22041,
      confidence: 0.99871,
      speaker: null,
    },
    {
      text: "a",
      start: 22073,
      end: 22169,
      confidence: 0.99837,
      speaker: null,
    },
    {
      text: "few",
      start: 22177,
      end: 22297,
      confidence: 0.99962,
      speaker: null,
    },
    {
      text: "moments",
      start: 22321,
      end: 22545,
      confidence: 0.94491,
      speaker: null,
    },
    {
      text: "of",
      start: 22585,
      end: 22737,
      confidence: 0.87992,
      speaker: null,
    },
    {
      text: "her",
      start: 22761,
      end: 22921,
      confidence: 0.52082,
      speaker: null,
    },
    {
      text: "time",
      start: 22953,
      end: 23169,
      confidence: 0.99956,
      speaker: null,
    },
    {
      text: "to",
      start: 23217,
      end: 23401,
      confidence: 0.97503,
      speaker: null,
    },
    {
      text: "mention",
      start: 23433,
      end: 23897,
      confidence: 0.56777,
      speaker: null,
    },
    {
      text: "the",
      start: 24001,
      end: 24193,
      confidence: 0.65486,
      speaker: null,
    },
    {
      text: "most",
      start: 24209,
      end: 24409,
      confidence: 0.99193,
      speaker: null,
    },
    {
      text: "appropriate",
      start: 24457,
      end: 24961,
      confidence: 0.79238,
      speaker: null,
    },
    {
      text: "schools.",
      start: 25033,
      end: 25649,
      confidence: 0.98955,
      speaker: null,
    },
    {
      text: "Are",
      start: 25777,
      end: 25993,
      confidence: 0.93193,
      speaker: null,
    },
    {
      text: "you",
      start: 26009,
      end: 26137,
      confidence: 0.99905,
      speaker: null,
    },
    {
      text: "at",
      start: 26161,
      end: 26297,
      confidence: 0.99614,
      speaker: null,
    },
    {
      text: "least",
      start: 26321,
      end: 26601,
      confidence: 0.99414,
      speaker: null,
    },
    {
      text: "18",
      start: 26673,
      end: 26929,
      confidence: 0.99484,
      speaker: null,
    },
    {
      text: "years",
      start: 26977,
      end: 27185,
      confidence: 0.99902,
      speaker: null,
    },
    {
      text: "of",
      start: 27225,
      end: 27401,
      confidence: 0.99787,
      speaker: null,
    },
    {
      text: "age?",
      start: 27433,
      end: 28005,
      confidence: 0.99966,
      speaker: null,
    },
    {
      text: "Yeah,",
      start: 28505,
      end: 28817,
      confidence: 0.79369,
      speaker: null,
    },
    {
      text: "I'm",
      start: 28841,
      end: 29025,
      confidence: 0.79398,
      speaker: null,
    },
    {
      text: "29.",
      start: 29065,
      end: 29806,
      confidence: 0.98079,
      speaker: null,
    },
    {
      text: "29.",
      start: 29971,
      end: 30713,
      confidence: 0.98079,
      speaker: null,
    },
    {
      text: "Okay.",
      start: 30769,
      end: 31001,
      confidence: 0.683,
      speaker: null,
    },
    {
      text: "And",
      start: 31033,
      end: 31153,
      confidence: 0.91274,
      speaker: null,
    },
    {
      text: "do",
      start: 31169,
      end: 31249,
      confidence: 0.75724,
      speaker: null,
    },
    {
      text: "you",
      start: 31257,
      end: 31401,
      confidence: 0.99137,
      speaker: null,
    },
    {
      text: "currently",
      start: 31433,
      end: 31673,
      confidence: 0.99455,
      speaker: null,
    },
    {
      text: "have",
      start: 31729,
      end: 31897,
      confidence: 0.9993,
      speaker: null,
    },
    {
      text: "a",
      start: 31921,
      end: 32033,
      confidence: 0.98565,
      speaker: null,
    },
    {
      text: "high",
      start: 32049,
      end: 32177,
      confidence: 0.99843,
      speaker: null,
    },
    {
      text: "school",
      start: 32201,
      end: 32385,
      confidence: 0.99979,
      speaker: null,
    },
    {
      text: "diploma",
      start: 32425,
      end: 32817,
      confidence: 0.86589,
      speaker: null,
    },
    {
      text: "or",
      start: 32881,
      end: 33081,
      confidence: 0.99886,
      speaker: null,
    },
    {
      text: "a",
      start: 33113,
      end: 33257,
      confidence: 0.97091,
      speaker: null,
    },
    {
      text: "ged?",
      start: 33281,
      end: 33961,
      confidence: 0.95361,
      speaker: null,
    },
    {
      text: "Yes,",
      start: 34113,
      end: 34377,
      confidence: 0.98979,
      speaker: null,
    },
    {
      text: "I",
      start: 34401,
      end: 34513,
      confidence: 0.99684,
      speaker: null,
    },
    {
      text: "do.",
      start: 34529,
      end: 35085,
      confidence: 0.99953,
      speaker: null,
    },
    {
      text: "Okay,",
      start: 36105,
      end: 36505,
      confidence: 0.83309,
      speaker: null,
    },
    {
      text: "thank",
      start: 36545,
      end: 36673,
      confidence: 0.96607,
      speaker: null,
    },
    {
      text: "you,",
      start: 36689,
      end: 36817,
      confidence: 0.99926,
      speaker: null,
    },
    {
      text: "Anthony.",
      start: 36841,
      end: 37161,
      confidence: 0.59526,
      speaker: null,
    },
    {
      text: "And",
      start: 37233,
      end: 37441,
      confidence: 0.9426,
      speaker: null,
    },
    {
      text: "if",
      start: 37473,
      end: 37593,
      confidence: 0.98979,
      speaker: null,
    },
    {
      text: "we",
      start: 37609,
      end: 37713,
      confidence: 0.9977,
      speaker: null,
    },
    {
      text: "can",
      start: 37729,
      end: 37881,
      confidence: 0.97948,
      speaker: null,
    },
    {
      text: "find",
      start: 37913,
      end: 38081,
      confidence: 0.99492,
      speaker: null,
    },
    {
      text: "a",
      start: 38113,
      end: 38233,
      confidence: 0.95657,
      speaker: null,
    },
    {
      text: "school",
      start: 38249,
      end: 38425,
      confidence: 0.99911,
      speaker: null,
    },
    {
      text: "for",
      start: 38465,
      end: 38617,
      confidence: 0.99701,
      speaker: null,
    },
    {
      text: "you",
      start: 38641,
      end: 38825,
      confidence: 0.99925,
      speaker: null,
    },
    {
      text: "that",
      start: 38865,
      end: 39041,
      confidence: 0.99837,
      speaker: null,
    },
    {
      text: "meets",
      start: 39073,
      end: 39297,
      confidence: 0.97106,
      speaker: null,
    },
    {
      text: "your",
      start: 39321,
      end: 39481,
      confidence: 0.99708,
      speaker: null,
    },
    {
      text: "needs,",
      start: 39513,
      end: 39993,
      confidence: 0.99937,
      speaker: null,
    },
    {
      text: "would",
      start: 40129,
      end: 40353,
      confidence: 0.99805,
      speaker: null,
    },
    {
      text: "you",
      start: 40369,
      end: 40497,
      confidence: 0.99737,
      speaker: null,
    },
    {
      text: "be",
      start: 40521,
      end: 40657,
      confidence: 0.99851,
      speaker: null,
    },
    {
      text: "interested",
      start: 40681,
      end: 41001,
      confidence: 0.99824,
      speaker: null,
    },
    {
      text: "in",
      start: 41033,
      end: 41201,
      confidence: 0.99511,
      speaker: null,
    },
    {
      text: "furthering",
      start: 41233,
      end: 41577,
      confidence: 0.99051,
      speaker: null,
    },
    {
      text: "your",
      start: 41601,
      end: 41857,
      confidence: 0.9982,
      speaker: null,
    },
    {
      text: "education",
      start: 41921,
      end: 42337,
      confidence: 0.99982,
      speaker: null,
    },
    {
      text: "in",
      start: 42441,
      end: 42633,
      confidence: 0.94739,
      speaker: null,
    },
    {
      text: "the",
      start: 42649,
      end: 42753,
      confidence: 0.99584,
      speaker: null,
    },
    {
      text: "next",
      start: 42769,
      end: 42897,
      confidence: 0.99827,
      speaker: null,
    },
    {
      text: "six",
      start: 42921,
      end: 43057,
      confidence: 0.98349,
      speaker: null,
    },
    {
      text: "months?",
      start: 43081,
      end: 43241,
      confidence: 0.82258,
      speaker: null,
    },
    {
      text: "Yeah,",
      start: 43273,
      end: 43417,
      confidence: 0.57062,
      speaker: null,
    },
    {
      text: "of",
      start: 43441,
      end: 43553,
      confidence: 0.99322,
      speaker: null,
    },
    {
      text: "course.",
      start: 43569,
      end: 44153,
      confidence: 0.99982,
      speaker: null,
    },
    {
      text: "The",
      start: 44329,
      end: 44617,
      confidence: 0.99793,
      speaker: null,
    },
    {
      text: "course",
      start: 44641,
      end: 44801,
      confidence: 0.99962,
      speaker: null,
    },
    {
      text: "I'd",
      start: 44833,
      end: 45033,
      confidence: 0.92853,
      speaker: null,
    },
    {
      text: "like",
      start: 45049,
      end: 45153,
      confidence: 0.99828,
      speaker: null,
    },
    {
      text: "to",
      start: 45169,
      end: 45297,
      confidence: 0.99616,
      speaker: null,
    },
    {
      text: "take",
      start: 45321,
      end: 45457,
      confidence: 0.99573,
      speaker: null,
    },
    {
      text: "up",
      start: 45481,
      end: 45641,
      confidence: 0.99607,
      speaker: null,
    },
    {
      text: "would",
      start: 45673,
      end: 45793,
      confidence: 0.97306,
      speaker: null,
    },
    {
      text: "be",
      start: 45809,
      end: 45985,
      confidence: 0.99686,
      speaker: null,
    },
    {
      text: "computer",
      start: 46025,
      end: 46449,
      confidence: 0.998,
      speaker: null,
    },
    {
      text: "engineering.",
      start: 46497,
      end: 47205,
      confidence: 0.57838,
      speaker: null,
    },
    {
      text: "Computer",
      start: 47705,
      end: 48265,
      confidence: 0.44083,
      speaker: null,
    },
    {
      text: "engineering.",
      start: 48305,
      end: 48697,
      confidence: 0.82064,
      speaker: null,
    },
    {
      text: "Okay.",
      start: 48761,
      end: 49405,
      confidence: 0.79953,
      speaker: null,
    },
    {
      text: "And,",
      start: 50745,
      end: 51129,
      confidence: 0.88476,
      speaker: null,
    },
    {
      text: "Anthony,",
      start: 51177,
      end: 51845,
      confidence: 0.85578,
      speaker: null,
    },
    {
      text: "I",
      start: 53765,
      end: 54077,
      confidence: 0.95493,
      speaker: null,
    },
    {
      text: "only",
      start: 54101,
      end: 54261,
      confidence: 0.98935,
      speaker: null,
    },
    {
      text: "need",
      start: 54293,
      end: 54461,
      confidence: 0.78539,
      speaker: null,
    },
    {
      text: "a",
      start: 54493,
      end: 54613,
      confidence: 0.94191,
      speaker: null,
    },
    {
      text: "few",
      start: 54629,
      end: 54757,
      confidence: 0.99921,
      speaker: null,
    },
    {
      text: "moments",
      start: 54781,
      end: 55029,
      confidence: 0.9395,
      speaker: null,
    },
    {
      text: "of",
      start: 55077,
      end: 55237,
      confidence: 0.95686,
      speaker: null,
    },
    {
      text: "your",
      start: 55261,
      end: 55469,
      confidence: 0.96817,
      speaker: null,
    },
    {
      text: "time,",
      start: 55517,
      end: 56085,
      confidence: 0.99949,
      speaker: null,
    },
    {
      text: "okay,",
      start: 56245,
      end: 56985,
      confidence: 0.75209,
      speaker: null,
    },
    {
      text: "to",
      start: 57765,
      end: 58077,
      confidence: 0.9941,
      speaker: null,
    },
    {
      text: "verify",
      start: 58101,
      end: 58485,
      confidence: 0.99141,
      speaker: null,
    },
    {
      text: "your",
      start: 58525,
      end: 58797,
      confidence: 0.99501,
      speaker: null,
    },
    {
      text: "information.",
      start: 58861,
      end: 59277,
      confidence: 0.97934,
      speaker: null,
    },
    {
      text: "Your",
      start: 59381,
      end: 59597,
      confidence: 0.99356,
      speaker: null,
    },
    {
      text: "first",
      start: 59621,
      end: 59829,
      confidence: 0.99882,
      speaker: null,
    },
    {
      text: "name",
      start: 59877,
      end: 60037,
      confidence: 0.99846,
      speaker: null,
    },
    {
      text: "is",
      start: 60061,
      end: 60221,
      confidence: 0.83584,
      speaker: null,
    },
    {
      text: "Anthony,",
      start: 60253,
      end: 60645,
      confidence: 0.45829,
      speaker: null,
    },
    {
      text: "and",
      start: 60725,
      end: 60941,
      confidence: 0.99022,
      speaker: null,
    },
    {
      text: "your",
      start: 60973,
      end: 61141,
      confidence: 0.99364,
      speaker: null,
    },
    {
      text: "last",
      start: 61173,
      end: 61317,
      confidence: 0.98435,
      speaker: null,
    },
    {
      text: "name",
      start: 61341,
      end: 61429,
      confidence: 0.99698,
      speaker: null,
    },
    {
      text: "is",
      start: 61437,
      end: 61581,
      confidence: 0.97526,
      speaker: null,
    },
    {
      text: "Bella.",
      start: 61613,
      end: 61997,
      confidence: 0.52832,
      speaker: null,
    },
    {
      text: "Is",
      start: 62021,
      end: 62133,
      confidence: 0.92451,
      speaker: null,
    },
    {
      text: "this",
      start: 62149,
      end: 62373,
      confidence: 0.78952,
      speaker: null,
    },
    {
      text: "correct?",
      start: 62429,
      end: 63005,
      confidence: 0.61891,
      speaker: null,
    },
    {
      text: "Yes.",
      start: 63165,
      end: 63905,
      confidence: 0.99423,
      speaker: null,
    },
    {
      text: "Okay,",
      start: 64765,
      end: 65461,
      confidence: 0.80903,
      speaker: null,
    },
    {
      text: "Anthony,",
      start: 65573,
      end: 66101,
      confidence: 0.56512,
      speaker: null,
    },
    {
      text: "now,",
      start: 66213,
      end: 66437,
      confidence: 0.90403,
      speaker: null,
    },
    {
      text: "if",
      start: 66461,
      end: 66573,
      confidence: 0.99697,
      speaker: null,
    },
    {
      text: "I",
      start: 66589,
      end: 66693,
      confidence: 0.9876,
      speaker: null,
    },
    {
      text: "may",
      start: 66709,
      end: 66861,
      confidence: 0.99089,
      speaker: null,
    },
    {
      text: "ask,",
      start: 66893,
      end: 67133,
      confidence: 0.99026,
      speaker: null,
    },
    {
      text: "if",
      start: 67189,
      end: 67309,
      confidence: 0.98687,
      speaker: null,
    },
    {
      text: "we",
      start: 67317,
      end: 67413,
      confidence: 0.99818,
      speaker: null,
    },
    {
      text: "can",
      start: 67429,
      end: 67533,
      confidence: 0.998,
      speaker: null,
    },
    {
      text: "find",
      start: 67549,
      end: 67773,
      confidence: 0.6915,
      speaker: null,
    },
    {
      text: "school",
      start: 67829,
      end: 68021,
      confidence: 0.99118,
      speaker: null,
    },
    {
      text: "for",
      start: 68053,
      end: 68149,
      confidence: 0.99581,
      speaker: null,
    },
    {
      text: "you",
      start: 68157,
      end: 68301,
      confidence: 0.99587,
      speaker: null,
    },
    {
      text: "that",
      start: 68333,
      end: 68477,
      confidence: 0.99753,
      speaker: null,
    },
    {
      text: "meets",
      start: 68501,
      end: 68693,
      confidence: 0.60313,
      speaker: null,
    },
    {
      text: "your",
      start: 68709,
      end: 68837,
      confidence: 0.981,
      speaker: null,
    },
    {
      text: "needs,",
      start: 68861,
      end: 69117,
      confidence: 0.99734,
      speaker: null,
    },
    {
      text: "would",
      start: 69181,
      end: 69309,
      confidence: 0.99724,
      speaker: null,
    },
    {
      text: "you",
      start: 69317,
      end: 69437,
      confidence: 0.99737,
      speaker: null,
    },
    {
      text: "be",
      start: 69461,
      end: 69573,
      confidence: 0.99653,
      speaker: null,
    },
    {
      text: "interested",
      start: 69589,
      end: 69837,
      confidence: 0.99919,
      speaker: null,
    },
    {
      text: "in",
      start: 69861,
      end: 69997,
      confidence: 0.98841,
      speaker: null,
    },
    {
      text: "furthering",
      start: 70021,
      end: 70421,
      confidence: 0.94835,
      speaker: null,
    },
    {
      text: "your",
      start: 70453,
      end: 70645,
      confidence: 0.9774,
      speaker: null,
    },
    {
      text: "education?",
      start: 70685,
      end: 71265,
      confidence: 0.99981,
      speaker: null,
    },
    {
      text: "Yeah,",
      start: 71685,
      end: 72021,
      confidence: 0.22669,
      speaker: null,
    },
    {
      text: "in",
      start: 72053,
      end: 72173,
      confidence: 0.84621,
      speaker: null,
    },
    {
      text: "the",
      start: 72189,
      end: 72293,
      confidence: 0.90172,
      speaker: null,
    },
    {
      text: "next",
      start: 72309,
      end: 72461,
      confidence: 0.99851,
      speaker: null,
    },
    {
      text: "six",
      start: 72493,
      end: 72613,
      confidence: 0.97442,
      speaker: null,
    },
    {
      text: "months?",
      start: 72629,
      end: 73185,
      confidence: 0.78673,
      speaker: null,
    },
    {
      text: "Definitely.",
      start: 73485,
      end: 74205,
      confidence: 0.48801,
      speaker: null,
    },
    {
      text: "Thank",
      start: 74325,
      end: 74533,
      confidence: 0.94508,
      speaker: null,
    },
    {
      text: "you,",
      start: 74549,
      end: 74677,
      confidence: 0.99923,
      speaker: null,
    },
    {
      text: "Anthony.",
      start: 74701,
      end: 75345,
      confidence: 0.69424,
      speaker: null,
    },
    {
      text: "Okay,",
      start: 75725,
      end: 76525,
      confidence: 0.65071,
      speaker: null,
    },
    {
      text: "could",
      start: 76685,
      end: 76933,
      confidence: 0.99445,
      speaker: null,
    },
    {
      text: "you",
      start: 76949,
      end: 77053,
      confidence: 0.99733,
      speaker: null,
    },
    {
      text: "please",
      start: 77069,
      end: 77221,
      confidence: 0.99617,
      speaker: null,
    },
    {
      text: "verify",
      start: 77253,
      end: 77685,
      confidence: 0.57569,
      speaker: null,
    },
    {
      text: "your",
      start: 77725,
      end: 77901,
      confidence: 0.89864,
      speaker: null,
    },
    {
      text: "complete",
      start: 77933,
      end: 78459,
      confidence: 0.64761,
      speaker: null,
    },
    {
      text: "address,",
      start: 78557,
      end: 79055,
      confidence: 0.87938,
      speaker: null,
    },
    {
      text: "including",
      start: 79175,
      end: 79503,
      confidence: 0.98502,
      speaker: null,
    },
    {
      text: "the",
      start: 79559,
      end: 79751,
      confidence: 0.99358,
      speaker: null,
    },
    {
      text: "city,",
      start: 79783,
      end: 80239,
      confidence: 0.99936,
      speaker: null,
    },
    {
      text: "state,",
      start: 80367,
      end: 80679,
      confidence: 0.99635,
      speaker: null,
    },
    {
      text: "and",
      start: 80727,
      end: 80863,
      confidence: 0.99895,
      speaker: null,
    },
    {
      text: "the",
      start: 80879,
      end: 80983,
      confidence: 0.96519,
      speaker: null,
    },
    {
      text: "zip",
      start: 80999,
      end: 81167,
      confidence: 0.75272,
      speaker: null,
    },
    {
      text: "code?",
      start: 81191,
      end: 81815,
      confidence: 0.64397,
      speaker: null,
    },
    {
      text: "All",
      start: 81935,
      end: 82095,
      confidence: 0.86448,
      speaker: null,
    },
    {
      text: "right,",
      start: 82095,
      end: 82255,
      confidence: 0.56205,
      speaker: null,
    },
    {
      text: "it's",
      start: 82295,
      end: 82583,
      confidence: 0.99176,
      speaker: null,
    },
    {
      text: "1905",
      start: 82639,
      end: 84703,
      confidence: 0.93079,
      speaker: null,
    },
    {
      text: "Bramblewood",
      start: 84879,
      end: 86115,
      confidence: 0.63945,
      speaker: null,
    },
    {
      text: "Drive,",
      start: 87095,
      end: 87995,
      confidence: 0.98298,
      speaker: null,
    },
    {
      text: "St.",
      start: 88535,
      end: 88919,
      confidence: 0.81667,
      speaker: null,
    },
    {
      text: "Cloud,",
      start: 88967,
      end: 89635,
      confidence: 0.31405,
      speaker: null,
    },
    {
      text: "Florida,",
      start: 89975,
      end: 90995,
      confidence: 0.97722,
      speaker: null,
    },
    {
      text: "34769.",
      start: 91455,
      end: 94315,
      confidence: 0.89466,
      speaker: null,
    },
    {
      text: "Okay.",
      start: 96495,
      end: 97015,
      confidence: 0.96723,
      speaker: null,
    },
    {
      text: "Is",
      start: 97095,
      end: 97287,
      confidence: 0.82923,
      speaker: null,
    },
    {
      text: "the",
      start: 97311,
      end: 97447,
      confidence: 0.99647,
      speaker: null,
    },
    {
      text: "street",
      start: 97471,
      end: 97703,
      confidence: 0.99168,
      speaker: null,
    },
    {
      text: "number",
      start: 97759,
      end: 98119,
      confidence: 0.99586,
      speaker: null,
    },
    {
      text: "1905?",
      start: 98207,
      end: 99911,
      confidence: 0.84896,
      speaker: null,
    },
    {
      text: "Yeah,",
      start: 100103,
      end: 100567,
      confidence: 0.98803,
      speaker: null,
    },
    {
      text: "1905.",
      start: 100631,
      end: 102315,
      confidence: 0.98281,
      speaker: null,
    },
    {
      text: "And",
      start: 102775,
      end: 103087,
      confidence: 0.99815,
      speaker: null,
    },
    {
      text: "the",
      start: 103111,
      end: 103199,
      confidence: 0.97988,
      speaker: null,
    },
    {
      text: "street",
      start: 103207,
      end: 103399,
      confidence: 0.57706,
      speaker: null,
    },
    {
      text: "name",
      start: 103447,
      end: 103655,
      confidence: 0.55849,
      speaker: null,
    },
    {
      text: "is",
      start: 103695,
      end: 103925,
      confidence: 0.78683,
      speaker: null,
    },
    {
      text: "Bramblewood.",
      start: 103975,
      end: 104841,
      confidence: 0.25072,
      speaker: null,
    },
    {
      text: "Right.",
      start: 104953,
      end: 105441,
      confidence: 0.3317,
      speaker: null,
    },
    {
      text: "Is",
      start: 105553,
      end: 105753,
      confidence: 0.954,
      speaker: null,
    },
    {
      text: "that",
      start: 105769,
      end: 105945,
      confidence: 0.88056,
      speaker: null,
    },
    {
      text: "correct?",
      start: 105985,
      end: 106497,
      confidence: 0.92886,
      speaker: null,
    },
    {
      text: "That's",
      start: 106641,
      end: 107001,
      confidence: 0.99508,
      speaker: null,
    },
    {
      text: "correct.",
      start: 107033,
      end: 107249,
      confidence: 0.99961,
      speaker: null,
    },
    {
      text: "Okay.",
      start: 107297,
      end: 107761,
      confidence: 0.8384,
      speaker: null,
    },
    {
      text: "Okay,",
      start: 107873,
      end: 108177,
      confidence: 0.81026,
      speaker: null,
    },
    {
      text: "so",
      start: 108201,
      end: 108337,
      confidence: 0.99691,
      speaker: null,
    },
    {
      text: "it's",
      start: 108361,
      end: 108569,
      confidence: 0.82292,
      speaker: null,
    },
    {
      text: "1905",
      start: 108617,
      end: 110085,
      confidence: 0.9836,
      speaker: null,
    },
    {
      text: "Bramblewood",
      start: 110625,
      end: 111473,
      confidence: 0.35274,
      speaker: null,
    },
    {
      text: "Drive,",
      start: 111529,
      end: 112137,
      confidence: 0.75148,
      speaker: null,
    },
    {
      text: "St.",
      start: 112281,
      end: 112609,
      confidence: 0.94194,
      speaker: null,
    },
    {
      text: "Cloud,",
      start: 112657,
      end: 113001,
      confidence: 0.93762,
      speaker: null,
    },
    {
      text: "Florida,",
      start: 113073,
      end: 113633,
      confidence: 0.90447,
      speaker: null,
    },
    {
      text: "34769.",
      start: 113689,
      end: 115305,
      confidence: 0.97033,
      speaker: null,
    },
    {
      text: "Yes.",
      start: 115465,
      end: 115825,
      confidence: 0.28756,
      speaker: null,
    },
    {
      text: "Correct.",
      start: 115865,
      end: 116417,
      confidence: 0.49659,
      speaker: null,
    },
    {
      text: "Yep.",
      start: 116561,
      end: 117065,
      confidence: 0.50216,
      speaker: null,
    },
    {
      text: "Okay,",
      start: 117145,
      end: 117729,
      confidence: 0.89829,
      speaker: null,
    },
    {
      text: "and",
      start: 117857,
      end: 118097,
      confidence: 0.98787,
      speaker: null,
    },
    {
      text: "could",
      start: 118121,
      end: 118233,
      confidence: 0.99031,
      speaker: null,
    },
    {
      text: "you",
      start: 118249,
      end: 118377,
      confidence: 0.99812,
      speaker: null,
    },
    {
      text: "please",
      start: 118401,
      end: 118561,
      confidence: 0.99784,
      speaker: null,
    },
    {
      text: "verify",
      start: 118593,
      end: 119025,
      confidence: 0.66267,
      speaker: null,
    },
    {
      text: "your",
      start: 119065,
      end: 119337,
      confidence: 0.99971,
      speaker: null,
    },
    {
      text: "email",
      start: 119401,
      end: 119673,
      confidence: 0.99799,
      speaker: null,
    },
    {
      text: "address?",
      start: 119729,
      end: 120325,
      confidence: 0.9999,
      speaker: null,
    },
    {
      text: "It's",
      start: 120625,
      end: 121169,
      confidence: 0.96839,
      speaker: null,
    },
    {
      text: "pella",
      start: 121257,
      end: 122049,
      confidence: 0.50599,
      speaker: null,
    },
    {
      text: "anthony@yahoo.com.",
      start: 122177,
      end: 124725,
      confidence: 0.72695,
      speaker: null,
    },
    {
      text: "thank",
      start: 127145,
      end: 127409,
      confidence: 0.68742,
      speaker: null,
    },
    {
      text: "you",
      start: 127417,
      end: 127465,
      confidence: 0.80333,
      speaker: null,
    },
    {
      text: "so",
      start: 127465,
      end: 127529,
      confidence: 0.75208,
      speaker: null,
    },
    {
      text: "much",
      start: 127537,
      end: 127633,
      confidence: 0.99136,
      speaker: null,
    },
    {
      text: "for",
      start: 127649,
      end: 127753,
      confidence: 0.76598,
      speaker: null,
    },
    {
      text: "the",
      start: 127769,
      end: 127897,
      confidence: 0.9759,
      speaker: null,
    },
    {
      text: "verification.",
      start: 127921,
      end: 128937,
      confidence: 0.60783,
      speaker: null,
    },
    {
      text: "Yeah.",
      start: 129121,
      end: 129847,
      confidence: 0.43522,
      speaker: null,
    },
    {
      text: "Now,",
      start: 130001,
      end: 130695,
      confidence: 0.97861,
      speaker: null,
    },
    {
      text: "you",
      start: 131035,
      end: 131371,
      confidence: 0.99445,
      speaker: null,
    },
    {
      text: "mentioned",
      start: 131403,
      end: 131667,
      confidence: 0.98597,
      speaker: null,
    },
    {
      text: "computer",
      start: 131691,
      end: 132059,
      confidence: 0.99829,
      speaker: null,
    },
    {
      text: "engineering,",
      start: 132107,
      end: 132595,
      confidence: 0.53137,
      speaker: null,
    },
    {
      text: "right?",
      start: 132675,
      end: 133107,
      confidence: 0.99392,
      speaker: null,
    },
    {
      text: "Mm.",
      start: 133211,
      end: 133895,
      confidence: 0.31667,
      speaker: null,
    },
    {
      text: "May",
      start: 134835,
      end: 135147,
      confidence: 0.91497,
      speaker: null,
    },
    {
      text: "I",
      start: 135171,
      end: 135331,
      confidence: 0.99599,
      speaker: null,
    },
    {
      text: "ask,",
      start: 135363,
      end: 135675,
      confidence: 0.98907,
      speaker: null,
    },
    {
      text: "what",
      start: 135755,
      end: 135971,
      confidence: 0.99857,
      speaker: null,
    },
    {
      text: "degree",
      start: 136003,
      end: 136299,
      confidence: 0.95628,
      speaker: null,
    },
    {
      text: "type",
      start: 136347,
      end: 136611,
      confidence: 0.99581,
      speaker: null,
    },
    {
      text: "were",
      start: 136643,
      end: 136763,
      confidence: 0.8947,
      speaker: null,
    },
    {
      text: "you",
      start: 136779,
      end: 136931,
      confidence: 0.99418,
      speaker: null,
    },
    {
      text: "looking",
      start: 136963,
      end: 137131,
      confidence: 0.9992,
      speaker: null,
    },
    {
      text: "to",
      start: 137163,
      end: 137307,
      confidence: 0.9967,
      speaker: null,
    },
    {
      text: "obtain?",
      start: 137331,
      end: 137611,
      confidence: 0.99158,
      speaker: null,
    },
    {
      text: "Is",
      start: 137683,
      end: 137843,
      confidence: 0.75539,
      speaker: null,
    },
    {
      text: "it",
      start: 137859,
      end: 138083,
      confidence: 0.9222,
      speaker: null,
    },
    {
      text: "associate",
      start: 138139,
      end: 139055,
      confidence: 0.75276,
      speaker: null,
    },
    {
      text: "or",
      start: 139635,
      end: 140211,
      confidence: 0.7876,
      speaker: null,
    },
    {
      text: "whatever",
      start: 140323,
      end: 140699,
      confidence: 0.99778,
      speaker: null,
    },
    {
      text: "I",
      start: 140747,
      end: 140907,
      confidence: 0.99654,
      speaker: null,
    },
    {
      text: "need",
      start: 140931,
      end: 141091,
      confidence: 0.99762,
      speaker: null,
    },
    {
      text: "to",
      start: 141123,
      end: 141243,
      confidence: 0.99778,
      speaker: null,
    },
    {
      text: "do?",
      start: 141259,
      end: 141819,
      confidence: 0.99645,
      speaker: null,
    },
    {
      text: "If",
      start: 141987,
      end: 142243,
      confidence: 0.99301,
      speaker: null,
    },
    {
      text: "I",
      start: 142259,
      end: 142435,
      confidence: 0.99651,
      speaker: null,
    },
    {
      text: "get",
      start: 142475,
      end: 142627,
      confidence: 0.99885,
      speaker: null,
    },
    {
      text: "in",
      start: 142651,
      end: 142811,
      confidence: 0.95964,
      speaker: null,
    },
    {
      text: "the",
      start: 142843,
      end: 142963,
      confidence: 0.99747,
      speaker: null,
    },
    {
      text: "first",
      start: 142979,
      end: 143155,
      confidence: 0.99822,
      speaker: null,
    },
    {
      text: "door,",
      start: 143195,
      end: 143347,
      confidence: 0.46595,
      speaker: null,
    },
    {
      text: "I",
      start: 143371,
      end: 143483,
      confidence: 0.97018,
      speaker: null,
    },
    {
      text: "do",
      start: 143499,
      end: 143651,
      confidence: 0.98214,
      speaker: null,
    },
    {
      text: "associate.",
      start: 143683,
      end: 144219,
      confidence: 0.52262,
      speaker: null,
    },
    {
      text: "Probably",
      start: 144307,
      end: 144627,
      confidence: 0.7894,
      speaker: null,
    },
    {
      text: "move",
      start: 144691,
      end: 144915,
      confidence: 0.95686,
      speaker: null,
    },
    {
      text: "my",
      start: 144955,
      end: 145131,
      confidence: 0.99935,
      speaker: null,
    },
    {
      text: "way",
      start: 145163,
      end: 145283,
      confidence: 0.99791,
      speaker: null,
    },
    {
      text: "up",
      start: 145299,
      end: 145403,
      confidence: 0.99131,
      speaker: null,
    },
    {
      text: "the",
      start: 145419,
      end: 145547,
      confidence: 0.97349,
      speaker: null,
    },
    {
      text: "ladder,",
      start: 145571,
      end: 146011,
      confidence: 0.84446,
      speaker: null,
    },
    {
      text: "you",
      start: 146083,
      end: 146219,
      confidence: 0.88974,
      speaker: null,
    },
    {
      text: "know?",
      start: 146227,
      end: 146707,
      confidence: 0.79785,
      speaker: null,
    },
    {
      text: "Okay,",
      start: 146851,
      end: 147331,
      confidence: 0.71177,
      speaker: null,
    },
    {
      text: "so",
      start: 147403,
      end: 147659,
      confidence: 0.85712,
      speaker: null,
    },
    {
      text: "get",
      start: 147707,
      end: 147843,
      confidence: 0.93967,
      speaker: null,
    },
    {
      text: "my",
      start: 147859,
      end: 148011,
      confidence: 0.99717,
      speaker: null,
    },
    {
      text: "first",
      start: 148043,
      end: 148211,
      confidence: 0.99974,
      speaker: null,
    },
    {
      text: "one",
      start: 148243,
      end: 148387,
      confidence: 0.99346,
      speaker: null,
    },
    {
      text: "and",
      start: 148411,
      end: 148499,
      confidence: 0.99328,
      speaker: null,
    },
    {
      text: "then",
      start: 148507,
      end: 148675,
      confidence: 0.96917,
      speaker: null,
    },
    {
      text: "keep",
      start: 148715,
      end: 148867,
      confidence: 0.99984,
      speaker: null,
    },
    {
      text: "on",
      start: 148891,
      end: 149075,
      confidence: 0.99755,
      speaker: null,
    },
    {
      text: "going.",
      start: 149115,
      end: 149771,
      confidence: 0.99939,
      speaker: null,
    },
    {
      text: "Okay,",
      start: 149963,
      end: 150775,
      confidence: 0.77338,
      speaker: null,
    },
    {
      text: "so",
      start: 151315,
      end: 152055,
      confidence: 0.98546,
      speaker: null,
    },
    {
      text: "would",
      start: 152475,
      end: 152787,
      confidence: 0.40246,
      speaker: null,
    },
    {
      text: "be",
      start: 152811,
      end: 152947,
      confidence: 0.88741,
      speaker: null,
    },
    {
      text: "associate",
      start: 152971,
      end: 153683,
      confidence: 0.72731,
      speaker: null,
    },
    {
      text: "degree",
      start: 153819,
      end: 154603,
      confidence: 0.84452,
      speaker: null,
    },
    {
      text: "for",
      start: 154779,
      end: 155043,
      confidence: 0.99192,
      speaker: null,
    },
    {
      text: "the",
      start: 155059,
      end: 155187,
      confidence: 0.99594,
      speaker: null,
    },
    {
      text: "moment?",
      start: 155211,
      end: 155807,
      confidence: 0.998,
      speaker: null,
    },
    {
      text: "Yep.",
      start: 155971,
      end: 156755,
      confidence: 0.38801,
      speaker: null,
    },
    {
      text: "Okay.",
      start: 159255,
      end: 159687,
      confidence: 0.43559,
      speaker: null,
    },
    {
      text: "Anthony,",
      start: 159711,
      end: 159951,
      confidence: 0.99309,
      speaker: null,
    },
    {
      text: "you've",
      start: 159983,
      end: 160143,
      confidence: 0.73018,
      speaker: null,
    },
    {
      text: "mentioned",
      start: 160159,
      end: 160383,
      confidence: 0.76697,
      speaker: null,
    },
    {
      text: "that",
      start: 160399,
      end: 160503,
      confidence: 0.96336,
      speaker: null,
    },
    {
      text: "you're",
      start: 160519,
      end: 160735,
      confidence: 0.92643,
      speaker: null,
    },
    {
      text: "21.",
      start: 160775,
      end: 161439,
      confidence: 0.9629,
      speaker: null,
    },
    {
      text: "I'm",
      start: 161567,
      end: 161783,
      confidence: 0.96525,
      speaker: null,
    },
    {
      text: "sorry,",
      start: 161799,
      end: 162063,
      confidence: 0.97792,
      speaker: null,
    },
    {
      text: "29",
      start: 162119,
      end: 162599,
      confidence: 0.99726,
      speaker: null,
    },
    {
      text: "years",
      start: 162647,
      end: 162903,
      confidence: 0.99433,
      speaker: null,
    },
    {
      text: "old",
      start: 162959,
      end: 163559,
      confidence: 0.99947,
      speaker: null,
    },
    {
      text: "now,",
      start: 163727,
      end: 164055,
      confidence: 0.95362,
      speaker: null,
    },
    {
      text: "if",
      start: 164095,
      end: 164223,
      confidence: 0.99872,
      speaker: null,
    },
    {
      text: "I",
      start: 164239,
      end: 164367,
      confidence: 0.99784,
      speaker: null,
    },
    {
      text: "may",
      start: 164391,
      end: 164695,
      confidence: 0.99376,
      speaker: null,
    },
    {
      text: "ask.",
      start: 164775,
      end: 165395,
      confidence: 0.99368,
      speaker: null,
    },
    {
      text: "Well,",
      start: 167215,
      end: 167527,
      confidence: 0.48665,
      speaker: null,
    },
    {
      text: "what's",
      start: 167551,
      end: 167743,
      confidence: 0.99299,
      speaker: null,
    },
    {
      text: "the",
      start: 167759,
      end: 167887,
      confidence: 0.99931,
      speaker: null,
    },
    {
      text: "highest",
      start: 167911,
      end: 168175,
      confidence: 0.99684,
      speaker: null,
    },
    {
      text: "level",
      start: 168215,
      end: 168415,
      confidence: 0.99908,
      speaker: null,
    },
    {
      text: "of",
      start: 168455,
      end: 168727,
      confidence: 0.99788,
      speaker: null,
    },
    {
      text: "education?",
      start: 168791,
      end: 169395,
      confidence: 0.99886,
      speaker: null,
    },
    {
      text: "I",
      start: 170215,
      end: 170623,
      confidence: 0.99302,
      speaker: null,
    },
    {
      text: "dropped",
      start: 170679,
      end: 171031,
      confidence: 0.98925,
      speaker: null,
    },
    {
      text: "out",
      start: 171063,
      end: 171303,
      confidence: 0.99872,
      speaker: null,
    },
    {
      text: "when",
      start: 171359,
      end: 171719,
      confidence: 0.9956,
      speaker: null,
    },
    {
      text: "I",
      start: 171807,
      end: 172031,
      confidence: 0.99755,
      speaker: null,
    },
    {
      text: "was",
      start: 172063,
      end: 172255,
      confidence: 0.99914,
      speaker: null,
    },
    {
      text: "in",
      start: 172295,
      end: 172423,
      confidence: 0.99783,
      speaker: null,
    },
    {
      text: "the",
      start: 172439,
      end: 172615,
      confidence: 0.99009,
      speaker: null,
    },
    {
      text: "11th",
      start: 172655,
      end: 173039,
      confidence: 0.99612,
      speaker: null,
    },
    {
      text: "grade,",
      start: 173087,
      end: 173559,
      confidence: 0.94633,
      speaker: null,
    },
    {
      text: "and",
      start: 173687,
      end: 173927,
      confidence: 0.99748,
      speaker: null,
    },
    {
      text: "I",
      start: 173951,
      end: 174111,
      confidence: 0.99581,
      speaker: null,
    },
    {
      text: "started",
      start: 174143,
      end: 174335,
      confidence: 0.99941,
      speaker: null,
    },
    {
      text: "doing",
      start: 174375,
      end: 174551,
      confidence: 0.99734,
      speaker: null,
    },
    {
      text: "plumbing.",
      start: 174583,
      end: 174959,
      confidence: 0.90705,
      speaker: null,
    },
    {
      text: "I've",
      start: 175007,
      end: 175247,
      confidence: 0.99191,
      speaker: null,
    },
    {
      text: "actually",
      start: 175271,
      end: 175479,
      confidence: 0.99885,
      speaker: null,
    },
    {
      text: "been",
      start: 175527,
      end: 175663,
      confidence: 0.99934,
      speaker: null,
    },
    {
      text: "doing",
      start: 175679,
      end: 175831,
      confidence: 0.99718,
      speaker: null,
    },
    {
      text: "plumbing",
      start: 175863,
      end: 176151,
      confidence: 0.89203,
      speaker: null,
    },
    {
      text: "for",
      start: 176183,
      end: 176351,
      confidence: 0.99845,
      speaker: null,
    },
    {
      text: "13",
      start: 176383,
      end: 176695,
      confidence: 0.99888,
      speaker: null,
    },
    {
      text: "years.",
      start: 176775,
      end: 177279,
      confidence: 0.99906,
      speaker: null,
    },
    {
      text: "I'm",
      start: 177407,
      end: 177647,
      confidence: 0.96725,
      speaker: null,
    },
    {
      text: "a",
      start: 177671,
      end: 177783,
      confidence: 0.99403,
      speaker: null,
    },
    {
      text: "registered",
      start: 177799,
      end: 178191,
      confidence: 0.52987,
      speaker: null,
    },
    {
      text: "apprentice.",
      start: 178223,
      end: 178599,
      confidence: 0.60882,
      speaker: null,
    },
    {
      text: "I",
      start: 178647,
      end: 178807,
      confidence: 0.62823,
      speaker: null,
    },
    {
      text: "actually",
      start: 178831,
      end: 179015,
      confidence: 0.99128,
      speaker: null,
    },
    {
      text: "only",
      start: 179055,
      end: 179207,
      confidence: 0.87328,
      speaker: null,
    },
    {
      text: "have",
      start: 179231,
      end: 179319,
      confidence: 0.96855,
      speaker: null,
    },
    {
      text: "to",
      start: 179327,
      end: 179399,
      confidence: 0.99799,
      speaker: null,
    },
    {
      text: "take",
      start: 179407,
      end: 179551,
      confidence: 0.99884,
      speaker: null,
    },
    {
      text: "the",
      start: 179583,
      end: 179703,
      confidence: 0.99739,
      speaker: null,
    },
    {
      text: "test",
      start: 179719,
      end: 179871,
      confidence: 0.99829,
      speaker: null,
    },
    {
      text: "to",
      start: 179903,
      end: 180023,
      confidence: 0.92445,
      speaker: null,
    },
    {
      text: "become",
      start: 180039,
      end: 180215,
      confidence: 0.98656,
      speaker: null,
    },
    {
      text: "a",
      start: 180255,
      end: 180835,
      confidence: 0.58017,
      speaker: null,
    },
    {
      text: "journeyman's.",
      start: 181785,
      end: 182617,
      confidence: 0.26417,
      speaker: null,
    },
    {
      text: "A",
      start: 182681,
      end: 182833,
      confidence: 0.74586,
      speaker: null,
    },
    {
      text: "journeyman",
      start: 182849,
      end: 183289,
      confidence: 0.25559,
      speaker: null,
    },
    {
      text: "to",
      start: 183337,
      end: 183497,
      confidence: 0.58386,
      speaker: null,
    },
    {
      text: "open",
      start: 183521,
      end: 183681,
      confidence: 0.91832,
      speaker: null,
    },
    {
      text: "my",
      start: 183713,
      end: 183833,
      confidence: 0.99219,
      speaker: null,
    },
    {
      text: "own",
      start: 183849,
      end: 184025,
      confidence: 0.99697,
      speaker: null,
    },
    {
      text: "company.",
      start: 184065,
      end: 184313,
      confidence: 0.99954,
      speaker: null,
    },
    {
      text: "And",
      start: 184369,
      end: 184513,
      confidence: 0.99377,
      speaker: null,
    },
    {
      text: "I'm",
      start: 184529,
      end: 184969,
      confidence: 0.58911,
      speaker: null,
    },
    {
      text: "not",
      start: 185097,
      end: 185337,
      confidence: 0.99982,
      speaker: null,
    },
    {
      text: "too",
      start: 185361,
      end: 185545,
      confidence: 0.99873,
      speaker: null,
    },
    {
      text: "fond",
      start: 185585,
      end: 185761,
      confidence: 0.93924,
      speaker: null,
    },
    {
      text: "of",
      start: 185793,
      end: 185937,
      confidence: 0.9997,
      speaker: null,
    },
    {
      text: "plumbing,",
      start: 185961,
      end: 186425,
      confidence: 0.47526,
      speaker: null,
    },
    {
      text: "you",
      start: 186505,
      end: 186649,
      confidence: 0.98847,
      speaker: null,
    },
    {
      text: "know,",
      start: 186657,
      end: 186873,
      confidence: 0.99448,
      speaker: null,
    },
    {
      text: "saying",
      start: 186929,
      end: 187313,
      confidence: 0.81707,
      speaker: null,
    },
    {
      text: "I",
      start: 187409,
      end: 187569,
      confidence: 0.83676,
      speaker: null,
    },
    {
      text: "need",
      start: 187577,
      end: 187697,
      confidence: 0.97554,
      speaker: null,
    },
    {
      text: "something,",
      start: 187721,
      end: 187881,
      confidence: 0.35001,
      speaker: null,
    },
    {
      text: "I",
      start: 187913,
      end: 188033,
      confidence: 0.99414,
      speaker: null,
    },
    {
      text: "want",
      start: 188049,
      end: 188129,
      confidence: 0.99116,
      speaker: null,
    },
    {
      text: "to",
      start: 188137,
      end: 188233,
      confidence: 0.99795,
      speaker: null,
    },
    {
      text: "do",
      start: 188249,
      end: 188377,
      confidence: 0.99879,
      speaker: null,
    },
    {
      text: "something",
      start: 188401,
      end: 188585,
      confidence: 0.99904,
      speaker: null,
    },
    {
      text: "else",
      start: 188625,
      end: 188801,
      confidence: 0.99876,
      speaker: null,
    },
    {
      text: "besides",
      start: 188833,
      end: 189201,
      confidence: 0.56015,
      speaker: null,
    },
    {
      text: "plumbing.",
      start: 189233,
      end: 189497,
      confidence: 0.79484,
      speaker: null,
    },
    {
      text: "For",
      start: 189521,
      end: 189633,
      confidence: 0.9975,
      speaker: null,
    },
    {
      text: "the",
      start: 189649,
      end: 189705,
      confidence: 0.99695,
      speaker: null,
    },
    {
      text: "rest",
      start: 189705,
      end: 189841,
      confidence: 0.94323,
      speaker: null,
    },
    {
      text: "of",
      start: 189873,
      end: 189969,
      confidence: 0.99901,
      speaker: null,
    },
    {
      text: "my",
      start: 189977,
      end: 190121,
      confidence: 0.99955,
      speaker: null,
    },
    {
      text: "life.",
      start: 190153,
      end: 190725,
      confidence: 0.99882,
      speaker: null,
    },
    {
      text: "Okay.",
      start: 191225,
      end: 192041,
      confidence: 0.57747,
      speaker: null,
    },
    {
      text: "And",
      start: 192193,
      end: 192481,
      confidence: 0.98463,
      speaker: null,
    },
    {
      text: "do",
      start: 192513,
      end: 192633,
      confidence: 0.89137,
      speaker: null,
    },
    {
      text: "you",
      start: 192649,
      end: 192753,
      confidence: 0.99412,
      speaker: null,
    },
    {
      text: "have",
      start: 192769,
      end: 192897,
      confidence: 0.99934,
      speaker: null,
    },
    {
      text: "a",
      start: 192921,
      end: 193081,
      confidence: 0.99079,
      speaker: null,
    },
    {
      text: "diploma",
      start: 193113,
      end: 193513,
      confidence: 0.99561,
      speaker: null,
    },
    {
      text: "or",
      start: 193569,
      end: 193785,
      confidence: 0.99724,
      speaker: null,
    },
    {
      text: "a",
      start: 193825,
      end: 193953,
      confidence: 0.95663,
      speaker: null,
    },
    {
      text: "GED?",
      start: 193969,
      end: 194801,
      confidence: 0.81513,
      speaker: null,
    },
    {
      text: "I",
      start: 194993,
      end: 195273,
      confidence: 0.99487,
      speaker: null,
    },
    {
      text: "have",
      start: 195289,
      end: 195369,
      confidence: 0.99963,
      speaker: null,
    },
    {
      text: "a",
      start: 195377,
      end: 195473,
      confidence: 0.99541,
      speaker: null,
    },
    {
      text: "GED.",
      start: 195489,
      end: 196129,
      confidence: 0.90896,
      speaker: null,
    },
    {
      text: "GED.",
      start: 196257,
      end: 196713,
      confidence: 0.47514,
      speaker: null,
    },
    {
      text: "Okay.",
      start: 196769,
      end: 197445,
      confidence: 0.72392,
      speaker: null,
    },
    {
      text: "And",
      start: 199785,
      end: 200097,
      confidence: 0.98892,
      speaker: null,
    },
    {
      text: "what",
      start: 200121,
      end: 200281,
      confidence: 0.99727,
      speaker: null,
    },
    {
      text: "year",
      start: 200313,
      end: 200457,
      confidence: 0.97459,
      speaker: null,
    },
    {
      text: "did",
      start: 200481,
      end: 200617,
      confidence: 0.97606,
      speaker: null,
    },
    {
      text: "you",
      start: 200641,
      end: 200753,
      confidence: 0.99805,
      speaker: null,
    },
    {
      text: "obtain",
      start: 200769,
      end: 201017,
      confidence: 0.9144,
      speaker: null,
    },
    {
      text: "your",
      start: 201081,
      end: 201329,
      confidence: 0.99396,
      speaker: null,
    },
    {
      text: "GED?",
      start: 201377,
      end: 202125,
      confidence: 0.86153,
      speaker: null,
    },
    {
      text: "1999.",
      start: 202505,
      end: 203885,
      confidence: 0.97736,
      speaker: null,
    },
    {
      text: "Okay,",
      start: 208765,
      end: 209189,
      confidence: 0.85067,
      speaker: null,
    },
    {
      text: "and",
      start: 209237,
      end: 209397,
      confidence: 0.97961,
      speaker: null,
    },
    {
      text: "for",
      start: 209421,
      end: 209557,
      confidence: 0.99527,
      speaker: null,
    },
    {
      text: "your",
      start: 209581,
      end: 209741,
      confidence: 0.99578,
      speaker: null,
    },
    {
      text: "class",
      start: 209773,
      end: 209989,
      confidence: 0.99381,
      speaker: null,
    },
    {
      text: "type",
      start: 210037,
      end: 210285,
      confidence: 0.90749,
      speaker: null,
    },
    {
      text: "reference,",
      start: 210325,
      end: 210709,
      confidence: 0.33254,
      speaker: null,
    },
    {
      text: "would",
      start: 210757,
      end: 210917,
      confidence: 0.98139,
      speaker: null,
    },
    {
      text: "it",
      start: 210941,
      end: 211077,
      confidence: 0.98855,
      speaker: null,
    },
    {
      text: "be",
      start: 211101,
      end: 211309,
      confidence: 0.99909,
      speaker: null,
    },
    {
      text: "online,",
      start: 211357,
      end: 211877,
      confidence: 0.99955,
      speaker: null,
    },
    {
      text: "on",
      start: 212021,
      end: 212325,
      confidence: 0.98954,
      speaker: null,
    },
    {
      text: "campus",
      start: 212365,
      end: 212909,
      confidence: 0.90451,
      speaker: null,
    },
    {
      text: "or.",
      start: 213037,
      end: 213373,
      confidence: 0.64549,
      speaker: null,
    },
    {
      text: "No,",
      start: 213429,
      end: 213621,
      confidence: 0.42013,
      speaker: null,
    },
    {
      text: "probably",
      start: 213653,
      end: 214053,
      confidence: 0.80365,
      speaker: null,
    },
    {
      text: "campus.",
      start: 214149,
      end: 214621,
      confidence: 0.71802,
      speaker: null,
    },
    {
      text: "Probably",
      start: 214693,
      end: 214901,
      confidence: 0.60474,
      speaker: null,
    },
    {
      text: "would",
      start: 214933,
      end: 215077,
      confidence: 0.51075,
      speaker: null,
    },
    {
      text: "be",
      start: 215101,
      end: 215285,
      confidence: 0.99286,
      speaker: null,
    },
    {
      text: "campus.",
      start: 215325,
      end: 216025,
      confidence: 0.99601,
      speaker: null,
    },
    {
      text: "Campus.",
      start: 216485,
      end: 217037,
      confidence: 0.61174,
      speaker: null,
    },
    {
      text: "Okay.",
      start: 217101,
      end: 217785,
      confidence: 0.58967,
      speaker: null,
    },
    {
      text: "Just",
      start: 221365,
      end: 221653,
      confidence: 0.98504,
      speaker: null,
    },
    {
      text: "in",
      start: 221669,
      end: 221749,
      confidence: 0.99397,
      speaker: null,
    },
    {
      text: "case",
      start: 221757,
      end: 222305,
      confidence: 0.62228,
      speaker: null,
    },
    {
      text: "we'll",
      start: 222605,
      end: 222933,
      confidence: 0.32509,
      speaker: null,
    },
    {
      text: "not",
      start: 222949,
      end: 223053,
      confidence: 0.95441,
      speaker: null,
    },
    {
      text: "be",
      start: 223069,
      end: 223149,
      confidence: 0.85045,
      speaker: null,
    },
    {
      text: "able",
      start: 223157,
      end: 223277,
      confidence: 0.60757,
      speaker: null,
    },
    {
      text: "to",
      start: 223301,
      end: 223437,
      confidence: 0.99722,
      speaker: null,
    },
    {
      text: "find",
      start: 223461,
      end: 223621,
      confidence: 0.99666,
      speaker: null,
    },
    {
      text: "a",
      start: 223653,
      end: 223773,
      confidence: 0.98754,
      speaker: null,
    },
    {
      text: "campus",
      start: 223789,
      end: 224069,
      confidence: 0.99731,
      speaker: null,
    },
    {
      text: "based",
      start: 224117,
      end: 224349,
      confidence: 0.95491,
      speaker: null,
    },
    {
      text: "school,",
      start: 224397,
      end: 224653,
      confidence: 0.99709,
      speaker: null,
    },
    {
      text: "would",
      start: 224709,
      end: 224853,
      confidence: 0.9879,
      speaker: null,
    },
    {
      text: "you",
      start: 224869,
      end: 224997,
      confidence: 0.98455,
      speaker: null,
    },
    {
      text: "be",
      start: 225021,
      end: 225133,
      confidence: 0.99717,
      speaker: null,
    },
    {
      text: "okay",
      start: 225149,
      end: 225357,
      confidence: 0.94216,
      speaker: null,
    },
    {
      text: "with",
      start: 225381,
      end: 225541,
      confidence: 0.98788,
      speaker: null,
    },
    {
      text: "an",
      start: 225573,
      end: 225669,
      confidence: 0.98078,
      speaker: null,
    },
    {
      text: "online",
      start: 225677,
      end: 226085,
      confidence: 0.55794,
      speaker: null,
    },
    {
      text: "school?",
      start: 226205,
      end: 226941,
      confidence: 0.9996,
      speaker: null,
    },
    {
      text: "Yeah.",
      start: 227133,
      end: 227973,
      confidence: 0.97259,
      speaker: null,
    },
    {
      text: "Okay.",
      start: 228149,
      end: 228945,
      confidence: 0.92081,
      speaker: null,
    },
    {
      text: "And",
      start: 230925,
      end: 231213,
      confidence: 0.9475,
      speaker: null,
    },
    {
      text: "are",
      start: 231229,
      end: 231333,
      confidence: 0.9963,
      speaker: null,
    },
    {
      text: "you",
      start: 231349,
      end: 231477,
      confidence: 0.99145,
      speaker: null,
    },
    {
      text: "a",
      start: 231501,
      end: 231613,
      confidence: 0.94855,
      speaker: null,
    },
    {
      text: "United",
      start: 231629,
      end: 231853,
      confidence: 0.99883,
      speaker: null,
    },
    {
      text: "States",
      start: 231909,
      end: 232125,
      confidence: 0.99572,
      speaker: null,
    },
    {
      text: "citizen?",
      start: 232165,
      end: 232865,
      confidence: 0.62741,
      speaker: null,
    },
    {
      text: "Yes,",
      start: 233315,
      end: 233627,
      confidence: 0.90544,
      speaker: null,
    },
    {
      text: "I",
      start: 233651,
      end: 233787,
      confidence: 0.99441,
      speaker: null,
    },
    {
      text: "am.",
      start: 233811,
      end: 234375,
      confidence: 0.99522,
      speaker: null,
    },
    {
      text: "Thank",
      start: 234875,
      end: 235187,
      confidence: 0.84435,
      speaker: null,
    },
    {
      text: "you.",
      start: 235211,
      end: 235371,
      confidence: 0.9969,
      speaker: null,
    },
    {
      text: "And",
      start: 235403,
      end: 235547,
      confidence: 0.87723,
      speaker: null,
    },
    {
      text: "are",
      start: 235571,
      end: 235683,
      confidence: 0.99537,
      speaker: null,
    },
    {
      text: "you",
      start: 235699,
      end: 235827,
      confidence: 0.99849,
      speaker: null,
    },
    {
      text: "associated",
      start: 235851,
      end: 236267,
      confidence: 0.56071,
      speaker: null,
    },
    {
      text: "with",
      start: 236331,
      end: 236483,
      confidence: 0.99557,
      speaker: null,
    },
    {
      text: "the",
      start: 236499,
      end: 236603,
      confidence: 0.89029,
      speaker: null,
    },
    {
      text: "United",
      start: 236619,
      end: 236843,
      confidence: 0.93724,
      speaker: null,
    },
    {
      text: "States",
      start: 236899,
      end: 237139,
      confidence: 0.9947,
      speaker: null,
    },
    {
      text: "military?",
      start: 237187,
      end: 238027,
      confidence: 0.91303,
      speaker: null,
    },
    {
      text: "What",
      start: 238211,
      end: 238483,
      confidence: 0.99227,
      speaker: null,
    },
    {
      text: "was",
      start: 238499,
      end: 238627,
      confidence: 0.99469,
      speaker: null,
    },
    {
      text: "that?",
      start: 238651,
      end: 239215,
      confidence: 0.99525,
      speaker: null,
    },
    {
      text: "I'm",
      start: 239635,
      end: 239963,
      confidence: 0.79294,
      speaker: null,
    },
    {
      text: "sorry?",
      start: 239979,
      end: 240171,
      confidence: 0.989,
      speaker: null,
    },
    {
      text: "Are",
      start: 240203,
      end: 240299,
      confidence: 0.99396,
      speaker: null,
    },
    {
      text: "you",
      start: 240307,
      end: 240547,
      confidence: 0.99932,
      speaker: null,
    },
    {
      text: "associated",
      start: 240611,
      end: 241195,
      confidence: 0.7537,
      speaker: null,
    },
    {
      text: "with",
      start: 241275,
      end: 241491,
      confidence: 0.99872,
      speaker: null,
    },
    {
      text: "the",
      start: 241523,
      end: 241691,
      confidence: 0.98712,
      speaker: null,
    },
    {
      text: "United",
      start: 241723,
      end: 241963,
      confidence: 0.996,
      speaker: null,
    },
    {
      text: "States",
      start: 242019,
      end: 242283,
      confidence: 0.99938,
      speaker: null,
    },
    {
      text: "military?",
      start: 242339,
      end: 243139,
      confidence: 0.99967,
      speaker: null,
    },
    {
      text: "No,",
      start: 243307,
      end: 243563,
      confidence: 0.99334,
      speaker: null,
    },
    {
      text: "I'm",
      start: 243579,
      end: 243707,
      confidence: 0.9624,
      speaker: null,
    },
    {
      text: "not.",
      start: 243731,
      end: 244295,
      confidence: 0.99797,
      speaker: null,
    },
    {
      text: "Okay.",
      start: 245355,
      end: 246175,
      confidence: 0.46923,
      speaker: null,
    },
    {
      text: "And",
      start: 247435,
      end: 247747,
      confidence: 0.93187,
      speaker: null,
    },
    {
      text: "what",
      start: 247771,
      end: 247931,
      confidence: 0.99959,
      speaker: null,
    },
    {
      text: "would",
      start: 247963,
      end: 248083,
      confidence: 0.99889,
      speaker: null,
    },
    {
      text: "be",
      start: 248099,
      end: 248179,
      confidence: 0.99915,
      speaker: null,
    },
    {
      text: "the",
      start: 248187,
      end: 248331,
      confidence: 0.99871,
      speaker: null,
    },
    {
      text: "best",
      start: 248363,
      end: 248555,
      confidence: 0.99954,
      speaker: null,
    },
    {
      text: "time",
      start: 248595,
      end: 248747,
      confidence: 0.99543,
      speaker: null,
    },
    {
      text: "for",
      start: 248771,
      end: 248907,
      confidence: 0.99651,
      speaker: null,
    },
    {
      text: "a",
      start: 248931,
      end: 249067,
      confidence: 0.89656,
      speaker: null,
    },
    {
      text: "school",
      start: 249091,
      end: 249275,
      confidence: 0.99877,
      speaker: null,
    },
    {
      text: "enrollment",
      start: 249315,
      end: 249659,
      confidence: 0.88824,
      speaker: null,
    },
    {
      text: "counselor",
      start: 249707,
      end: 250131,
      confidence: 0.63132,
      speaker: null,
    },
    {
      text: "to",
      start: 250163,
      end: 250355,
      confidence: 0.99182,
      speaker: null,
    },
    {
      text: "contact",
      start: 250395,
      end: 250643,
      confidence: 0.99083,
      speaker: null,
    },
    {
      text: "you",
      start: 250699,
      end: 251011,
      confidence: 0.71414,
      speaker: null,
    },
    {
      text: "in",
      start: 251083,
      end: 251219,
      confidence: 0.99682,
      speaker: null,
    },
    {
      text: "the",
      start: 251227,
      end: 251371,
      confidence: 0.99716,
      speaker: null,
    },
    {
      text: "morning,",
      start: 251403,
      end: 251955,
      confidence: 0.9999,
      speaker: null,
    },
    {
      text: "afternoon,",
      start: 252115,
      end: 252611,
      confidence: 0.99506,
      speaker: null,
    },
    {
      text: "or",
      start: 252643,
      end: 252859,
      confidence: 0.99878,
      speaker: null,
    },
    {
      text: "evening?",
      start: 252907,
      end: 253535,
      confidence: 0.72964,
      speaker: null,
    },
    {
      text: "Pretty",
      start: 255755,
      end: 256019,
      confidence: 0.99827,
      speaker: null,
    },
    {
      text: "much",
      start: 256027,
      end: 256171,
      confidence: 0.9997,
      speaker: null,
    },
    {
      text: "any",
      start: 256203,
      end: 256371,
      confidence: 0.99942,
      speaker: null,
    },
    {
      text: "time",
      start: 256403,
      end: 256547,
      confidence: 0.9883,
      speaker: null,
    },
    {
      text: "of",
      start: 256571,
      end: 256659,
      confidence: 0.89067,
      speaker: null,
    },
    {
      text: "the",
      start: 256667,
      end: 256787,
      confidence: 0.98757,
      speaker: null,
    },
    {
      text: "day.",
      start: 256811,
      end: 257375,
      confidence: 0.99823,
      speaker: null,
    },
    {
      text: "And",
      start: 260005,
      end: 260341,
      confidence: 0.96669,
      speaker: null,
    },
    {
      text: "what",
      start: 260373,
      end: 260517,
      confidence: 0.99948,
      speaker: null,
    },
    {
      text: "is",
      start: 260541,
      end: 260653,
      confidence: 0.99721,
      speaker: null,
    },
    {
      text: "your",
      start: 260669,
      end: 260821,
      confidence: 0.99907,
      speaker: null,
    },
    {
      text: "exact",
      start: 260853,
      end: 261125,
      confidence: 0.99822,
      speaker: null,
    },
    {
      text: "date",
      start: 261165,
      end: 261317,
      confidence: 0.9552,
      speaker: null,
    },
    {
      text: "of",
      start: 261341,
      end: 261477,
      confidence: 0.98803,
      speaker: null,
    },
    {
      text: "birth?",
      start: 261501,
      end: 262109,
      confidence: 0.56287,
      speaker: null,
    },
    {
      text: "10,",
      start: 262277,
      end: 262919,
      confidence: 0.86286,
      speaker: null,
    },
    {
      text: "1580.",
      start: 263062,
      end: 263705,
      confidence: 0.86286,
      speaker: null,
    },
    {
      text: "So",
      start: 266005,
      end: 266437,
      confidence: 0.96628,
      speaker: null,
    },
    {
      text: "that",
      start: 266501,
      end: 266725,
      confidence: 0.99899,
      speaker: null,
    },
    {
      text: "would",
      start: 266765,
      end: 266917,
      confidence: 0.57285,
      speaker: null,
    },
    {
      text: "be",
      start: 266941,
      end: 267413,
      confidence: 0.99821,
      speaker: null,
    },
    {
      text: "October",
      start: 267549,
      end: 268314,
      confidence: 0.9877,
      speaker: null,
    },
    {
      text: "15th,",
      start: 268484,
      end: 269165,
      confidence: 0.9877,
      speaker: null,
    },
    {
      text: "1980?",
      start: 269335,
      end: 270101,
      confidence: 0.9877,
      speaker: null,
    },
    {
      text: "That's",
      start: 270253,
      end: 270605,
      confidence: 0.99086,
      speaker: null,
    },
    {
      text: "correct.",
      start: 270645,
      end: 271225,
      confidence: 0.99959,
      speaker: null,
    },
    {
      text: "Okay.",
      start: 272925,
      end: 273745,
      confidence: 0.62645,
      speaker: null,
    },
    {
      text: "Okay,",
      start: 274165,
      end: 274557,
      confidence: 0.5777,
      speaker: null,
    },
    {
      text: "Anthony,",
      start: 274581,
      end: 275225,
      confidence: 0.88388,
      speaker: null,
    },
    {
      text: "if",
      start: 276805,
      end: 277093,
      confidence: 0.98977,
      speaker: null,
    },
    {
      text: "we",
      start: 277109,
      end: 277213,
      confidence: 0.99876,
      speaker: null,
    },
    {
      text: "can",
      start: 277229,
      end: 277309,
      confidence: 0.99845,
      speaker: null,
    },
    {
      text: "find",
      start: 277317,
      end: 277509,
      confidence: 0.69082,
      speaker: null,
    },
    {
      text: "school",
      start: 277557,
      end: 277765,
      confidence: 0.99777,
      speaker: null,
    },
    {
      text: "for",
      start: 277805,
      end: 277933,
      confidence: 0.97895,
      speaker: null,
    },
    {
      text: "you",
      start: 277949,
      end: 278077,
      confidence: 0.99533,
      speaker: null,
    },
    {
      text: "that",
      start: 278101,
      end: 278237,
      confidence: 0.97144,
      speaker: null,
    },
    {
      text: "meets",
      start: 278261,
      end: 278469,
      confidence: 0.17763,
      speaker: null,
    },
    {
      text: "your",
      start: 278477,
      end: 278597,
      confidence: 0.89078,
      speaker: null,
    },
    {
      text: "needs,",
      start: 278621,
      end: 278829,
      confidence: 0.91558,
      speaker: null,
    },
    {
      text: "school",
      start: 278877,
      end: 279085,
      confidence: 0.98342,
      speaker: null,
    },
    {
      text: "enrollment",
      start: 279125,
      end: 279469,
      confidence: 0.89736,
      speaker: null,
    },
    {
      text: "counselors",
      start: 279517,
      end: 280029,
      confidence: 0.83014,
      speaker: null,
    },
    {
      text: "will",
      start: 280077,
      end: 280237,
      confidence: 0.87938,
      speaker: null,
    },
    {
      text: "be",
      start: 280261,
      end: 280421,
      confidence: 0.99924,
      speaker: null,
    },
    {
      text: "contacting",
      start: 280453,
      end: 280925,
      confidence: 0.98847,
      speaker: null,
    },
    {
      text: "you",
      start: 280965,
      end: 281545,
      confidence: 0.99964,
      speaker: null,
    },
    {
      text: "in",
      start: 281845,
      end: 282133,
      confidence: 0.99915,
      speaker: null,
    },
    {
      text: "the",
      start: 282149,
      end: 282277,
      confidence: 0.99951,
      speaker: null,
    },
    {
      text: "near",
      start: 282301,
      end: 282485,
      confidence: 0.99946,
      speaker: null,
    },
    {
      text: "future,",
      start: 282525,
      end: 282989,
      confidence: 0.99994,
      speaker: null,
    },
    {
      text: "either",
      start: 283117,
      end: 283381,
      confidence: 0.90191,
      speaker: null,
    },
    {
      text: "by",
      start: 283413,
      end: 283677,
      confidence: 0.98731,
      speaker: null,
    },
    {
      text: "phone",
      start: 283741,
      end: 284037,
      confidence: 0.89255,
      speaker: null,
    },
    {
      text: "or",
      start: 284101,
      end: 284301,
      confidence: 0.999,
      speaker: null,
    },
    {
      text: "by",
      start: 284333,
      end: 284525,
      confidence: 0.99409,
      speaker: null,
    },
    {
      text: "email,",
      start: 284565,
      end: 284837,
      confidence: 0.99452,
      speaker: null,
    },
    {
      text: "and",
      start: 284901,
      end: 285053,
      confidence: 0.99326,
      speaker: null,
    },
    {
      text: "they",
      start: 285069,
      end: 285197,
      confidence: 0.98911,
      speaker: null,
    },
    {
      text: "can",
      start: 285221,
      end: 285405,
      confidence: 0.99882,
      speaker: null,
    },
    {
      text: "answer",
      start: 285445,
      end: 285685,
      confidence: 0.97404,
      speaker: null,
    },
    {
      text: "any",
      start: 285725,
      end: 285901,
      confidence: 0.97228,
      speaker: null,
    },
    {
      text: "questions",
      start: 285933,
      end: 286197,
      confidence: 0.99361,
      speaker: null,
    },
    {
      text: "you",
      start: 286221,
      end: 286357,
      confidence: 0.99562,
      speaker: null,
    },
    {
      text: "may",
      start: 286381,
      end: 286541,
      confidence: 0.99738,
      speaker: null,
    },
    {
      text: "have",
      start: 286573,
      end: 286765,
      confidence: 0.99941,
      speaker: null,
    },
    {
      text: "regarding",
      start: 286805,
      end: 287213,
      confidence: 0.5617,
      speaker: null,
    },
    {
      text: "financial",
      start: 287269,
      end: 287605,
      confidence: 0.99984,
      speaker: null,
    },
    {
      text: "aid,",
      start: 287685,
      end: 288255,
      confidence: 0.93054,
      speaker: null,
    },
    {
      text: "which",
      start: 288405,
      end: 288691,
      confidence: 0.80765,
      speaker: null,
    },
    {
      text: "assistance,",
      start: 288723,
      end: 289467,
      confidence: 0.333,
      speaker: null,
    },
    {
      text: "their",
      start: 289571,
      end: 289859,
      confidence: 0.98914,
      speaker: null,
    },
    {
      text: "program",
      start: 289907,
      end: 290163,
      confidence: 0.99903,
      speaker: null,
    },
    {
      text: "requirements",
      start: 290219,
      end: 290635,
      confidence: 0.99361,
      speaker: null,
    },
    {
      text: "and",
      start: 290675,
      end: 290851,
      confidence: 0.99052,
      speaker: null,
    },
    {
      text: "policies.",
      start: 290883,
      end: 291575,
      confidence: 0.93718,
      speaker: null,
    },
    {
      text: "And",
      start: 293115,
      end: 293403,
      confidence: 0.71484,
      speaker: null,
    },
    {
      text: "so",
      start: 293419,
      end: 293571,
      confidence: 0.98545,
      speaker: null,
    },
    {
      text: "with",
      start: 293603,
      end: 293747,
      confidence: 0.99141,
      speaker: null,
    },
    {
      text: "that,",
      start: 293771,
      end: 293907,
      confidence: 0.99911,
      speaker: null,
    },
    {
      text: "I",
      start: 293931,
      end: 294019,
      confidence: 0.9815,
      speaker: null,
    },
    {
      text: "would",
      start: 294027,
      end: 294123,
      confidence: 0.98126,
      speaker: null,
    },
    {
      text: "just",
      start: 294139,
      end: 294267,
      confidence: 0.97795,
      speaker: null,
    },
    {
      text: "like",
      start: 294291,
      end: 294403,
      confidence: 0.60742,
      speaker: null,
    },
    {
      text: "to",
      start: 294419,
      end: 294547,
      confidence: 0.54609,
      speaker: null,
    },
    {
      text: "thank",
      start: 294571,
      end: 294683,
      confidence: 0.99747,
      speaker: null,
    },
    {
      text: "you",
      start: 294699,
      end: 294803,
      confidence: 0.98692,
      speaker: null,
    },
    {
      text: "for",
      start: 294819,
      end: 294923,
      confidence: 0.99509,
      speaker: null,
    },
    {
      text: "your",
      start: 294939,
      end: 295091,
      confidence: 0.99307,
      speaker: null,
    },
    {
      text: "time.",
      start: 295123,
      end: 295695,
      confidence: 0.99929,
      speaker: null,
    },
    {
      text: "Okay.",
      start: 297315,
      end: 297907,
      confidence: 0.71369,
      speaker: null,
    },
    {
      text: "Once",
      start: 298011,
      end: 298203,
      confidence: 0.93626,
      speaker: null,
    },
    {
      text: "again,",
      start: 298219,
      end: 298371,
      confidence: 0.99535,
      speaker: null,
    },
    {
      text: "we",
      start: 298403,
      end: 298595,
      confidence: 0.82409,
      speaker: null,
    },
    {
      text: "thank",
      start: 298635,
      end: 298787,
      confidence: 0.99407,
      speaker: null,
    },
    {
      text: "you",
      start: 298811,
      end: 298947,
      confidence: 0.99858,
      speaker: null,
    },
    {
      text: "for",
      start: 298971,
      end: 299203,
      confidence: 0.99754,
      speaker: null,
    },
    {
      text: "choosing",
      start: 299259,
      end: 299643,
      confidence: 0.88575,
      speaker: null,
    },
    {
      text: "education",
      start: 299699,
      end: 300107,
      confidence: 0.99882,
      speaker: null,
    },
    {
      text: "experts.",
      start: 300211,
      end: 300971,
      confidence: 0.90007,
      speaker: null,
    },
    {
      text: "And",
      start: 301123,
      end: 301387,
      confidence: 0.9482,
      speaker: null,
    },
    {
      text: "thank",
      start: 301411,
      end: 301547,
      confidence: 0.95637,
      speaker: null,
    },
    {
      text: "you.",
      start: 301571,
      end: 302135,
      confidence: 0.99831,
      speaker: null,
    },
    {
      text: "You're",
      start: 302635,
      end: 302963,
      confidence: 0.63739,
      speaker: null,
    },
    {
      text: "welcome.",
      start: 302979,
      end: 303251,
      confidence: 0.53102,
      speaker: null,
    },
    {
      text: "All",
      start: 303323,
      end: 303435,
      confidence: 0.58644,
      speaker: null,
    },
    {
      text: "right,",
      start: 303435,
      end: 304027,
      confidence: 0.95517,
      speaker: null,
    },
    {
      text: "you",
      start: 304211,
      end: 304507,
      confidence: 0.9561,
      speaker: null,
    },
    {
      text: "too.",
      start: 304531,
      end: 305123,
      confidence: 0.97218,
      speaker: null,
    },
    {
      text: "Bye.",
      start: 305299,
      end: 305563,
      confidence: 0.91051,
      speaker: null,
    },
  ],
  utterances: null,
  confidence: 0.8946766,
  audio_duration: 321,
  punctuate: true,
  format_text: true,
  dual_channel: null,
  webhook_url: null,
  webhook_status_code: null,
  webhook_auth: false,
  webhook_auth_header_name: null,
  speed_boost: false,
  auto_highlights_result: null,
  auto_highlights: false,
  audio_start_from: null,
  audio_end_at: null,
  word_boost: [],
  boost_param: null,
  filter_profanity: false,
  redact_pii: false,
  redact_pii_audio: false,
  redact_pii_audio_quality: null,
  redact_pii_policies: null,
  redact_pii_sub: null,
  speaker_labels: false,
  content_safety: false,
  iab_categories: false,
  content_safety_labels: {
    status: "unavailable",
    results: [],
    summary: {},
  },
  iab_categories_result: {
    status: "unavailable",
    results: [],
    summary: {},
  },
  language_detection: false,
  language_confidence_threshold: null,
  language_confidence: null,
  custom_spelling: null,
  throttled: false,
  auto_chapters: false,
  summarization: false,
  summary_type: null,
  summary_model: null,
  custom_topics: false,
  topics: [],
  speech_threshold: null,
  speech_model: null,
  chapters: null,
  disfluencies: false,
  entity_detection: false,
  sentiment_analysis: false,
  sentiment_analysis_results: null,
  entities: null,
  speakers_expected: null,
  summary: null,
  custom_topics_results: null,
  is_deleted: null,
  multichannel: null,
};

export const TRANSCRIPT_WITH_SPEAKER_LABELS = {
  id: "8b694fd5-fe2d-4ea4-a816-8926e269ccba",
  language_model: "assemblyai_default",
  acoustic_model: "assemblyai_default",
  language_code: "en_us",
  status: "completed",
  audio_url:
    "https://cdn.assemblyai.com/upload/b4d83a2f-958c-4968-9c28-7a81370f2e5b",
  text: "Hello. May I, please, Anthony. Hello, this is Anthony. Hi, Anthony. My name is Jeff, and I'm calling on behalf of education experts from a quality monitor line, and here that you recently filled the form on the Internet indicating an interest in earning a degree. Yes. Correct. Yes. I only need a few moments of her time to mention the most appropriate schools. Are you at least 18 years of age? Yeah, I'm 29. 29. Okay. And do you currently have a high school diploma or a ged? Yes, I do. Okay, thank you, Anthony. And if we can find a school for you that meets your needs, would you be interested in furthering your education in the next six months? Yeah, of course. The course I'd like to take up would be computer engineering. Computer engineering. Okay. And, Anthony, I only need a few moments of your time, okay, to verify your information. Your first name is Anthony, and your last name is Bella. Is this correct? Yes. Okay, Anthony, now, if I may ask, if we can find school for you that meets your needs, would you be interested in furthering your education? Yeah, in the next six months? Definitely. Thank you, Anthony. Okay, could you please verify your complete address, including the city, state, and the zip code? All right, it's 1905 Bramblewood Drive, St. Cloud, Florida, 34769. Okay. Is the street number 1905? Yeah, 1905. And the street name is Bramblewood. Right. Is that correct? That's correct. Okay. Okay, so it's 1905 Bramblewood Drive, St. Cloud, Florida, 34769. Yes. Correct. Yep. Okay, and could you please verify your email address? It's pella anthony@yahoo.com. Thank you so much for the verification. Yeah. Now, you mentioned computer engineering, right? Mm. May I ask, what degree type were you looking to obtain? Is it associate or whatever I need to do? If I get in the first door, I do associate. Probably move my way up the ladder, you know? Okay, so get my first one and then keep on going. Okay, so would be associate degree for the moment? Yep. Okay. Anthony, you've mentioned that you're 21. I'm sorry, 29 years old now, if I may ask. Well, what's the highest level of education? I dropped out when I was in the 11th grade, and I started doing plumbing. I've actually been doing plumbing for 13 years. I'm a registered apprentice. I actually only have to take the test to become a journeyman's. A journeyman to open my own company. And I'm not too fond of plumbing, you know, saying I need something, I want to do something else besides plumbing. For the rest of my life. Okay. And do you have a diploma or a GED? I have a GED. GED. Okay. And what year did you obtain your GED? 1999. Okay, and for your class type reference, would it be online, on campus or. No, probably campus. Probably would be campus. Campus. Okay. Just in case we'll not be able to find a campus based school, would you be okay with an online school? Yeah. Okay. And are you a United States citizen? Yes, I am. Thank you. And are you associated with the United States military? What was that? I'm sorry? Are you associated with the United States military? No, I'm not. Okay. And what would be the best time for a school enrollment counselor to contact you in the morning, afternoon, or evening? Pretty much any time of the day. And what is your exact date of birth? 10, 1580. So that would be October 15th, 1980? That's correct. Okay. Okay, Anthony, if we can find school for you that meets your needs, school enrollment counselors will be contacting you in the near future, either by phone or by email, and they can answer any questions you may have regarding financial aid, which assistance, their program requirements and policies. And so with that, I would just like to thank you for your time. Okay. Once again, we thank you for choosing education experts. And thank you. You're welcome. All right, you too. Bye.",
  words: [
    {
      text: "Hello.",
      start: 1480,
      end: 1736,
      confidence: 0.94271,
      speaker: "A",
    },
    {
      text: "May",
      start: 1736,
      end: 1872,
      confidence: 0.6092,
      speaker: "A",
    },
    {
      text: "I,",
      start: 1872,
      end: 1944,
      confidence: 0.81548,
      speaker: "A",
    },
    {
      text: "please,",
      start: 1944,
      end: 2400,
      confidence: 0.98523,
      speaker: "A",
    },
    {
      text: "Anthony.",
      start: 2489,
      end: 3113,
      confidence: 0.80583,
      speaker: "A",
    },
    {
      text: "Hello,",
      start: 3249,
      end: 4025,
      confidence: 0.3404,
      speaker: "B",
    },
    {
      text: "this",
      start: 4145,
      end: 4353,
      confidence: 0.99092,
      speaker: "B",
    },
    {
      text: "is",
      start: 4369,
      end: 4521,
      confidence: 0.9984,
      speaker: "B",
    },
    {
      text: "Anthony.",
      start: 4553,
      end: 5165,
      confidence: 0.53813,
      speaker: "B",
    },
    {
      text: "Hi,",
      start: 5665,
      end: 6065,
      confidence: 0.98595,
      speaker: "A",
    },
    {
      text: "Anthony.",
      start: 6105,
      end: 6553,
      confidence: 0.94823,
      speaker: "A",
    },
    {
      text: "My",
      start: 6649,
      end: 6833,
      confidence: 0.98213,
      speaker: "A",
    },
    {
      text: "name",
      start: 6849,
      end: 6953,
      confidence: 0.99948,
      speaker: "A",
    },
    {
      text: "is",
      start: 6969,
      end: 7121,
      confidence: 0.97777,
      speaker: "A",
    },
    {
      text: "Jeff,",
      start: 7153,
      end: 7449,
      confidence: 0.47833,
      speaker: "A",
    },
    {
      text: "and",
      start: 7497,
      end: 7633,
      confidence: 0.99091,
      speaker: "A",
    },
    {
      text: "I'm",
      start: 7649,
      end: 7777,
      confidence: 0.9179,
      speaker: "A",
    },
    {
      text: "calling",
      start: 7801,
      end: 8121,
      confidence: 0.65087,
      speaker: "A",
    },
    {
      text: "on",
      start: 8153,
      end: 8345,
      confidence: 0.99949,
      speaker: "A",
    },
    {
      text: "behalf",
      start: 8385,
      end: 8745,
      confidence: 0.70579,
      speaker: "A",
    },
    {
      text: "of",
      start: 8785,
      end: 9033,
      confidence: 0.99746,
      speaker: "A",
    },
    {
      text: "education",
      start: 9089,
      end: 9593,
      confidence: 0.999,
      speaker: "A",
    },
    {
      text: "experts",
      start: 9729,
      end: 10233,
      confidence: 0.99709,
      speaker: "A",
    },
    {
      text: "from",
      start: 10289,
      end: 10457,
      confidence: 0.96935,
      speaker: "A",
    },
    {
      text: "a",
      start: 10481,
      end: 10593,
      confidence: 0.72221,
      speaker: "A",
    },
    {
      text: "quality",
      start: 10609,
      end: 10929,
      confidence: 0.98111,
      speaker: "A",
    },
    {
      text: "monitor",
      start: 10977,
      end: 11361,
      confidence: 0.56464,
      speaker: "A",
    },
    {
      text: "line,",
      start: 11433,
      end: 12001,
      confidence: 0.55117,
      speaker: "A",
    },
    {
      text: "and",
      start: 12153,
      end: 12705,
      confidence: 0.57369,
      speaker: "A",
    },
    {
      text: "here",
      start: 12825,
      end: 13225,
      confidence: 0.7455,
      speaker: "A",
    },
    {
      text: "that",
      start: 13305,
      end: 13545,
      confidence: 0.73609,
      speaker: "A",
    },
    {
      text: "you",
      start: 13585,
      end: 13737,
      confidence: 0.38197,
      speaker: "A",
    },
    {
      text: "recently",
      start: 13761,
      end: 14041,
      confidence: 0.99388,
      speaker: "A",
    },
    {
      text: "filled",
      start: 14113,
      end: 14361,
      confidence: 0.98642,
      speaker: "A",
    },
    {
      text: "the",
      start: 14393,
      end: 14585,
      confidence: 0.71432,
      speaker: "A",
    },
    {
      text: "form",
      start: 14625,
      end: 14897,
      confidence: 0.99926,
      speaker: "A",
    },
    {
      text: "on",
      start: 14961,
      end: 15137,
      confidence: 0.98243,
      speaker: "A",
    },
    {
      text: "the",
      start: 15161,
      end: 15321,
      confidence: 0.95742,
      speaker: "A",
    },
    {
      text: "Internet",
      start: 15353,
      end: 15953,
      confidence: 0.95742,
      speaker: "A",
    },
    {
      text: "indicating",
      start: 16089,
      end: 16569,
      confidence: 0.95639,
      speaker: "A",
    },
    {
      text: "an",
      start: 16617,
      end: 16777,
      confidence: 0.98959,
      speaker: "A",
    },
    {
      text: "interest",
      start: 16801,
      end: 17057,
      confidence: 0.97985,
      speaker: "A",
    },
    {
      text: "in",
      start: 17121,
      end: 17297,
      confidence: 0.9872,
      speaker: "A",
    },
    {
      text: "earning",
      start: 17321,
      end: 17505,
      confidence: 0.93147,
      speaker: "A",
    },
    {
      text: "a",
      start: 17545,
      end: 17697,
      confidence: 0.99175,
      speaker: "A",
    },
    {
      text: "degree.",
      start: 17721,
      end: 18385,
      confidence: 0.90972,
      speaker: "A",
    },
    {
      text: "Yes.",
      start: 18545,
      end: 18937,
      confidence: 0.54883,
      speaker: "B",
    },
    {
      text: "Correct.",
      start: 19001,
      end: 19625,
      confidence: 0.60692,
      speaker: "C",
    },
    {
      text: "Yes.",
      start: 19785,
      end: 20525,
      confidence: 0.5177,
      speaker: "B",
    },
    {
      text: "I",
      start: 21345,
      end: 21657,
      confidence: 0.99588,
      speaker: "A",
    },
    {
      text: "only",
      start: 21681,
      end: 21841,
      confidence: 0.99849,
      speaker: "A",
    },
    {
      text: "need",
      start: 21873,
      end: 22041,
      confidence: 0.99871,
      speaker: "A",
    },
    {
      text: "a",
      start: 22073,
      end: 22169,
      confidence: 0.99837,
      speaker: "A",
    },
    {
      text: "few",
      start: 22177,
      end: 22297,
      confidence: 0.99962,
      speaker: "A",
    },
    {
      text: "moments",
      start: 22321,
      end: 22545,
      confidence: 0.94491,
      speaker: "A",
    },
    {
      text: "of",
      start: 22585,
      end: 22737,
      confidence: 0.87992,
      speaker: "A",
    },
    {
      text: "her",
      start: 22761,
      end: 22921,
      confidence: 0.52082,
      speaker: "A",
    },
    {
      text: "time",
      start: 22953,
      end: 23169,
      confidence: 0.99956,
      speaker: "A",
    },
    {
      text: "to",
      start: 23217,
      end: 23401,
      confidence: 0.97503,
      speaker: "A",
    },
    {
      text: "mention",
      start: 23433,
      end: 23897,
      confidence: 0.56777,
      speaker: "A",
    },
    {
      text: "the",
      start: 24001,
      end: 24193,
      confidence: 0.65486,
      speaker: "A",
    },
    {
      text: "most",
      start: 24209,
      end: 24409,
      confidence: 0.99193,
      speaker: "A",
    },
    {
      text: "appropriate",
      start: 24457,
      end: 24961,
      confidence: 0.79238,
      speaker: "A",
    },
    {
      text: "schools.",
      start: 25033,
      end: 25649,
      confidence: 0.98955,
      speaker: "A",
    },
    {
      text: "Are",
      start: 25777,
      end: 25993,
      confidence: 0.93193,
      speaker: "A",
    },
    {
      text: "you",
      start: 26009,
      end: 26137,
      confidence: 0.99905,
      speaker: "A",
    },
    {
      text: "at",
      start: 26161,
      end: 26297,
      confidence: 0.99614,
      speaker: "A",
    },
    {
      text: "least",
      start: 26321,
      end: 26601,
      confidence: 0.99414,
      speaker: "A",
    },
    {
      text: "18",
      start: 26673,
      end: 26929,
      confidence: 0.99484,
      speaker: "A",
    },
    {
      text: "years",
      start: 26977,
      end: 27185,
      confidence: 0.99902,
      speaker: "A",
    },
    {
      text: "of",
      start: 27225,
      end: 27401,
      confidence: 0.99787,
      speaker: "A",
    },
    {
      text: "age?",
      start: 27433,
      end: 28005,
      confidence: 0.99966,
      speaker: "A",
    },
    {
      text: "Yeah,",
      start: 28505,
      end: 28817,
      confidence: 0.79369,
      speaker: "B",
    },
    {
      text: "I'm",
      start: 28841,
      end: 29025,
      confidence: 0.79398,
      speaker: "B",
    },
    {
      text: "29.",
      start: 29065,
      end: 29806,
      confidence: 0.98079,
      speaker: "B",
    },
    {
      text: "29.",
      start: 29971,
      end: 30713,
      confidence: 0.98079,
      speaker: "A",
    },
    {
      text: "Okay.",
      start: 30769,
      end: 31001,
      confidence: 0.683,
      speaker: "B",
    },
    {
      text: "And",
      start: 31033,
      end: 31153,
      confidence: 0.91274,
      speaker: "A",
    },
    {
      text: "do",
      start: 31169,
      end: 31249,
      confidence: 0.75724,
      speaker: "A",
    },
    {
      text: "you",
      start: 31257,
      end: 31401,
      confidence: 0.99137,
      speaker: "A",
    },
    {
      text: "currently",
      start: 31433,
      end: 31673,
      confidence: 0.99455,
      speaker: "A",
    },
    {
      text: "have",
      start: 31729,
      end: 31897,
      confidence: 0.9993,
      speaker: "A",
    },
    {
      text: "a",
      start: 31921,
      end: 32033,
      confidence: 0.98565,
      speaker: "A",
    },
    {
      text: "high",
      start: 32049,
      end: 32177,
      confidence: 0.99843,
      speaker: "A",
    },
    {
      text: "school",
      start: 32201,
      end: 32385,
      confidence: 0.99979,
      speaker: "A",
    },
    {
      text: "diploma",
      start: 32425,
      end: 32817,
      confidence: 0.86589,
      speaker: "A",
    },
    {
      text: "or",
      start: 32881,
      end: 33081,
      confidence: 0.99886,
      speaker: "A",
    },
    {
      text: "a",
      start: 33113,
      end: 33257,
      confidence: 0.97091,
      speaker: "A",
    },
    {
      text: "ged?",
      start: 33281,
      end: 33961,
      confidence: 0.95361,
      speaker: "A",
    },
    {
      text: "Yes,",
      start: 34113,
      end: 34377,
      confidence: 0.98979,
      speaker: "B",
    },
    {
      text: "I",
      start: 34401,
      end: 34513,
      confidence: 0.99684,
      speaker: "B",
    },
    {
      text: "do.",
      start: 34529,
      end: 35085,
      confidence: 0.99953,
      speaker: "B",
    },
    {
      text: "Okay,",
      start: 36105,
      end: 36505,
      confidence: 0.83309,
      speaker: "A",
    },
    {
      text: "thank",
      start: 36545,
      end: 36673,
      confidence: 0.96607,
      speaker: "A",
    },
    {
      text: "you,",
      start: 36689,
      end: 36817,
      confidence: 0.99926,
      speaker: "A",
    },
    {
      text: "Anthony.",
      start: 36841,
      end: 37161,
      confidence: 0.59526,
      speaker: "A",
    },
    {
      text: "And",
      start: 37233,
      end: 37441,
      confidence: 0.9426,
      speaker: "A",
    },
    {
      text: "if",
      start: 37473,
      end: 37593,
      confidence: 0.98979,
      speaker: "A",
    },
    {
      text: "we",
      start: 37609,
      end: 37713,
      confidence: 0.9977,
      speaker: "A",
    },
    {
      text: "can",
      start: 37729,
      end: 37881,
      confidence: 0.97948,
      speaker: "A",
    },
    {
      text: "find",
      start: 37913,
      end: 38081,
      confidence: 0.99492,
      speaker: "A",
    },
    {
      text: "a",
      start: 38113,
      end: 38233,
      confidence: 0.95657,
      speaker: "A",
    },
    {
      text: "school",
      start: 38249,
      end: 38425,
      confidence: 0.99911,
      speaker: "A",
    },
    {
      text: "for",
      start: 38465,
      end: 38617,
      confidence: 0.99701,
      speaker: "A",
    },
    {
      text: "you",
      start: 38641,
      end: 38825,
      confidence: 0.99925,
      speaker: "A",
    },
    {
      text: "that",
      start: 38865,
      end: 39041,
      confidence: 0.99837,
      speaker: "A",
    },
    {
      text: "meets",
      start: 39073,
      end: 39297,
      confidence: 0.97106,
      speaker: "A",
    },
    {
      text: "your",
      start: 39321,
      end: 39481,
      confidence: 0.99708,
      speaker: "A",
    },
    {
      text: "needs,",
      start: 39513,
      end: 39993,
      confidence: 0.99937,
      speaker: "A",
    },
    {
      text: "would",
      start: 40129,
      end: 40353,
      confidence: 0.99805,
      speaker: "A",
    },
    {
      text: "you",
      start: 40369,
      end: 40497,
      confidence: 0.99737,
      speaker: "A",
    },
    {
      text: "be",
      start: 40521,
      end: 40657,
      confidence: 0.99851,
      speaker: "A",
    },
    {
      text: "interested",
      start: 40681,
      end: 41001,
      confidence: 0.99824,
      speaker: "A",
    },
    {
      text: "in",
      start: 41033,
      end: 41201,
      confidence: 0.99511,
      speaker: "A",
    },
    {
      text: "furthering",
      start: 41233,
      end: 41577,
      confidence: 0.99051,
      speaker: "A",
    },
    {
      text: "your",
      start: 41601,
      end: 41857,
      confidence: 0.9982,
      speaker: "A",
    },
    {
      text: "education",
      start: 41921,
      end: 42337,
      confidence: 0.99982,
      speaker: "A",
    },
    {
      text: "in",
      start: 42441,
      end: 42633,
      confidence: 0.94739,
      speaker: "A",
    },
    {
      text: "the",
      start: 42649,
      end: 42753,
      confidence: 0.99584,
      speaker: "A",
    },
    {
      text: "next",
      start: 42769,
      end: 42897,
      confidence: 0.99827,
      speaker: "A",
    },
    {
      text: "six",
      start: 42921,
      end: 43057,
      confidence: 0.98349,
      speaker: "A",
    },
    {
      text: "months?",
      start: 43081,
      end: 43241,
      confidence: 0.82258,
      speaker: "A",
    },
    {
      text: "Yeah,",
      start: 43273,
      end: 43417,
      confidence: 0.57062,
      speaker: "A",
    },
    {
      text: "of",
      start: 43441,
      end: 43553,
      confidence: 0.99322,
      speaker: "A",
    },
    {
      text: "course.",
      start: 43569,
      end: 44153,
      confidence: 0.99982,
      speaker: "A",
    },
    {
      text: "The",
      start: 44329,
      end: 44617,
      confidence: 0.99793,
      speaker: "B",
    },
    {
      text: "course",
      start: 44641,
      end: 44801,
      confidence: 0.99962,
      speaker: "B",
    },
    {
      text: "I'd",
      start: 44833,
      end: 45033,
      confidence: 0.92853,
      speaker: "B",
    },
    {
      text: "like",
      start: 45049,
      end: 45153,
      confidence: 0.99828,
      speaker: "B",
    },
    {
      text: "to",
      start: 45169,
      end: 45297,
      confidence: 0.99616,
      speaker: "B",
    },
    {
      text: "take",
      start: 45321,
      end: 45457,
      confidence: 0.99573,
      speaker: "B",
    },
    {
      text: "up",
      start: 45481,
      end: 45641,
      confidence: 0.99607,
      speaker: "B",
    },
    {
      text: "would",
      start: 45673,
      end: 45793,
      confidence: 0.97306,
      speaker: "B",
    },
    {
      text: "be",
      start: 45809,
      end: 45985,
      confidence: 0.99686,
      speaker: "B",
    },
    {
      text: "computer",
      start: 46025,
      end: 46449,
      confidence: 0.998,
      speaker: "B",
    },
    {
      text: "engineering.",
      start: 46497,
      end: 47205,
      confidence: 0.57838,
      speaker: "B",
    },
    {
      text: "Computer",
      start: 47705,
      end: 48265,
      confidence: 0.44083,
      speaker: "A",
    },
    {
      text: "engineering.",
      start: 48305,
      end: 48697,
      confidence: 0.82064,
      speaker: "A",
    },
    {
      text: "Okay.",
      start: 48761,
      end: 49405,
      confidence: 0.79953,
      speaker: "C",
    },
    {
      text: "And,",
      start: 50745,
      end: 51129,
      confidence: 0.88476,
      speaker: "A",
    },
    {
      text: "Anthony,",
      start: 51177,
      end: 51845,
      confidence: 0.85578,
      speaker: "A",
    },
    {
      text: "I",
      start: 53765,
      end: 54077,
      confidence: 0.95493,
      speaker: "A",
    },
    {
      text: "only",
      start: 54101,
      end: 54261,
      confidence: 0.98935,
      speaker: "A",
    },
    {
      text: "need",
      start: 54293,
      end: 54461,
      confidence: 0.78539,
      speaker: "A",
    },
    {
      text: "a",
      start: 54493,
      end: 54613,
      confidence: 0.94191,
      speaker: "A",
    },
    {
      text: "few",
      start: 54629,
      end: 54757,
      confidence: 0.99921,
      speaker: "A",
    },
    {
      text: "moments",
      start: 54781,
      end: 55029,
      confidence: 0.9395,
      speaker: "A",
    },
    {
      text: "of",
      start: 55077,
      end: 55237,
      confidence: 0.95686,
      speaker: "A",
    },
    {
      text: "your",
      start: 55261,
      end: 55469,
      confidence: 0.96817,
      speaker: "A",
    },
    {
      text: "time,",
      start: 55517,
      end: 56085,
      confidence: 0.99949,
      speaker: "A",
    },
    {
      text: "okay,",
      start: 56245,
      end: 56985,
      confidence: 0.75209,
      speaker: "A",
    },
    {
      text: "to",
      start: 57765,
      end: 58077,
      confidence: 0.9941,
      speaker: "A",
    },
    {
      text: "verify",
      start: 58101,
      end: 58485,
      confidence: 0.99141,
      speaker: "A",
    },
    {
      text: "your",
      start: 58525,
      end: 58797,
      confidence: 0.99501,
      speaker: "A",
    },
    {
      text: "information.",
      start: 58861,
      end: 59277,
      confidence: 0.97934,
      speaker: "A",
    },
    {
      text: "Your",
      start: 59381,
      end: 59597,
      confidence: 0.99356,
      speaker: "A",
    },
    {
      text: "first",
      start: 59621,
      end: 59829,
      confidence: 0.99882,
      speaker: "A",
    },
    {
      text: "name",
      start: 59877,
      end: 60037,
      confidence: 0.99846,
      speaker: "A",
    },
    {
      text: "is",
      start: 60061,
      end: 60221,
      confidence: 0.83584,
      speaker: "A",
    },
    {
      text: "Anthony,",
      start: 60253,
      end: 60645,
      confidence: 0.45829,
      speaker: "A",
    },
    {
      text: "and",
      start: 60725,
      end: 60941,
      confidence: 0.99022,
      speaker: "A",
    },
    {
      text: "your",
      start: 60973,
      end: 61141,
      confidence: 0.99364,
      speaker: "A",
    },
    {
      text: "last",
      start: 61173,
      end: 61317,
      confidence: 0.98435,
      speaker: "A",
    },
    {
      text: "name",
      start: 61341,
      end: 61429,
      confidence: 0.99698,
      speaker: "A",
    },
    {
      text: "is",
      start: 61437,
      end: 61581,
      confidence: 0.97526,
      speaker: "A",
    },
    {
      text: "Bella.",
      start: 61613,
      end: 61997,
      confidence: 0.52832,
      speaker: "A",
    },
    {
      text: "Is",
      start: 62021,
      end: 62133,
      confidence: 0.92451,
      speaker: "A",
    },
    {
      text: "this",
      start: 62149,
      end: 62373,
      confidence: 0.78952,
      speaker: "A",
    },
    {
      text: "correct?",
      start: 62429,
      end: 63005,
      confidence: 0.61891,
      speaker: "A",
    },
    {
      text: "Yes.",
      start: 63165,
      end: 63905,
      confidence: 0.99423,
      speaker: "B",
    },
    {
      text: "Okay,",
      start: 64765,
      end: 65461,
      confidence: 0.80903,
      speaker: "A",
    },
    {
      text: "Anthony,",
      start: 65573,
      end: 66101,
      confidence: 0.56512,
      speaker: "A",
    },
    {
      text: "now,",
      start: 66213,
      end: 66437,
      confidence: 0.90403,
      speaker: "A",
    },
    {
      text: "if",
      start: 66461,
      end: 66573,
      confidence: 0.99697,
      speaker: "A",
    },
    {
      text: "I",
      start: 66589,
      end: 66693,
      confidence: 0.9876,
      speaker: "A",
    },
    {
      text: "may",
      start: 66709,
      end: 66861,
      confidence: 0.99089,
      speaker: "A",
    },
    {
      text: "ask,",
      start: 66893,
      end: 67133,
      confidence: 0.99026,
      speaker: "A",
    },
    {
      text: "if",
      start: 67189,
      end: 67309,
      confidence: 0.98687,
      speaker: "A",
    },
    {
      text: "we",
      start: 67317,
      end: 67413,
      confidence: 0.99818,
      speaker: "A",
    },
    {
      text: "can",
      start: 67429,
      end: 67533,
      confidence: 0.998,
      speaker: "A",
    },
    {
      text: "find",
      start: 67549,
      end: 67773,
      confidence: 0.6915,
      speaker: "A",
    },
    {
      text: "school",
      start: 67829,
      end: 68021,
      confidence: 0.99118,
      speaker: "A",
    },
    {
      text: "for",
      start: 68053,
      end: 68149,
      confidence: 0.99581,
      speaker: "A",
    },
    {
      text: "you",
      start: 68157,
      end: 68301,
      confidence: 0.99587,
      speaker: "A",
    },
    {
      text: "that",
      start: 68333,
      end: 68477,
      confidence: 0.99753,
      speaker: "A",
    },
    {
      text: "meets",
      start: 68501,
      end: 68693,
      confidence: 0.60313,
      speaker: "A",
    },
    {
      text: "your",
      start: 68709,
      end: 68837,
      confidence: 0.981,
      speaker: "A",
    },
    {
      text: "needs,",
      start: 68861,
      end: 69117,
      confidence: 0.99734,
      speaker: "A",
    },
    {
      text: "would",
      start: 69181,
      end: 69309,
      confidence: 0.99724,
      speaker: "A",
    },
    {
      text: "you",
      start: 69317,
      end: 69437,
      confidence: 0.99737,
      speaker: "A",
    },
    {
      text: "be",
      start: 69461,
      end: 69573,
      confidence: 0.99653,
      speaker: "A",
    },
    {
      text: "interested",
      start: 69589,
      end: 69837,
      confidence: 0.99919,
      speaker: "A",
    },
    {
      text: "in",
      start: 69861,
      end: 69997,
      confidence: 0.98841,
      speaker: "A",
    },
    {
      text: "furthering",
      start: 70021,
      end: 70421,
      confidence: 0.94835,
      speaker: "A",
    },
    {
      text: "your",
      start: 70453,
      end: 70645,
      confidence: 0.9774,
      speaker: "A",
    },
    {
      text: "education?",
      start: 70685,
      end: 71265,
      confidence: 0.99981,
      speaker: "A",
    },
    {
      text: "Yeah,",
      start: 71685,
      end: 72021,
      confidence: 0.22669,
      speaker: "A",
    },
    {
      text: "in",
      start: 72053,
      end: 72173,
      confidence: 0.84621,
      speaker: "A",
    },
    {
      text: "the",
      start: 72189,
      end: 72293,
      confidence: 0.90172,
      speaker: "A",
    },
    {
      text: "next",
      start: 72309,
      end: 72461,
      confidence: 0.99851,
      speaker: "A",
    },
    {
      text: "six",
      start: 72493,
      end: 72613,
      confidence: 0.97442,
      speaker: "A",
    },
    {
      text: "months?",
      start: 72629,
      end: 73185,
      confidence: 0.78673,
      speaker: "A",
    },
    {
      text: "Definitely.",
      start: 73485,
      end: 74205,
      confidence: 0.48801,
      speaker: "B",
    },
    {
      text: "Thank",
      start: 74325,
      end: 74533,
      confidence: 0.94508,
      speaker: "A",
    },
    {
      text: "you,",
      start: 74549,
      end: 74677,
      confidence: 0.99923,
      speaker: "A",
    },
    {
      text: "Anthony.",
      start: 74701,
      end: 75345,
      confidence: 0.69424,
      speaker: "A",
    },
    {
      text: "Okay,",
      start: 75725,
      end: 76525,
      confidence: 0.65071,
      speaker: "A",
    },
    {
      text: "could",
      start: 76685,
      end: 76933,
      confidence: 0.99445,
      speaker: "A",
    },
    {
      text: "you",
      start: 76949,
      end: 77053,
      confidence: 0.99733,
      speaker: "A",
    },
    {
      text: "please",
      start: 77069,
      end: 77221,
      confidence: 0.99617,
      speaker: "A",
    },
    {
      text: "verify",
      start: 77253,
      end: 77685,
      confidence: 0.57569,
      speaker: "A",
    },
    {
      text: "your",
      start: 77725,
      end: 77901,
      confidence: 0.89864,
      speaker: "A",
    },
    {
      text: "complete",
      start: 77933,
      end: 78459,
      confidence: 0.64761,
      speaker: "A",
    },
    {
      text: "address,",
      start: 78557,
      end: 79055,
      confidence: 0.87938,
      speaker: "A",
    },
    {
      text: "including",
      start: 79175,
      end: 79503,
      confidence: 0.98502,
      speaker: "A",
    },
    {
      text: "the",
      start: 79559,
      end: 79751,
      confidence: 0.99358,
      speaker: "A",
    },
    {
      text: "city,",
      start: 79783,
      end: 80239,
      confidence: 0.99936,
      speaker: "A",
    },
    {
      text: "state,",
      start: 80367,
      end: 80679,
      confidence: 0.99635,
      speaker: "A",
    },
    {
      text: "and",
      start: 80727,
      end: 80863,
      confidence: 0.99895,
      speaker: "A",
    },
    {
      text: "the",
      start: 80879,
      end: 80983,
      confidence: 0.96519,
      speaker: "A",
    },
    {
      text: "zip",
      start: 80999,
      end: 81167,
      confidence: 0.75272,
      speaker: "A",
    },
    {
      text: "code?",
      start: 81191,
      end: 81815,
      confidence: 0.64397,
      speaker: "A",
    },
    {
      text: "All",
      start: 81935,
      end: 82095,
      confidence: 0.86448,
      speaker: "B",
    },
    {
      text: "right,",
      start: 82095,
      end: 82255,
      confidence: 0.56205,
      speaker: "B",
    },
    {
      text: "it's",
      start: 82295,
      end: 82583,
      confidence: 0.99176,
      speaker: "B",
    },
    {
      text: "1905",
      start: 82639,
      end: 84703,
      confidence: 0.93079,
      speaker: "B",
    },
    {
      text: "Bramblewood",
      start: 84879,
      end: 86115,
      confidence: 0.63945,
      speaker: "B",
    },
    {
      text: "Drive,",
      start: 87095,
      end: 87995,
      confidence: 0.98298,
      speaker: "B",
    },
    {
      text: "St.",
      start: 88535,
      end: 88919,
      confidence: 0.81667,
      speaker: "B",
    },
    {
      text: "Cloud,",
      start: 88967,
      end: 89635,
      confidence: 0.31405,
      speaker: "B",
    },
    {
      text: "Florida,",
      start: 89975,
      end: 90995,
      confidence: 0.97722,
      speaker: "B",
    },
    {
      text: "34769.",
      start: 91455,
      end: 94315,
      confidence: 0.89466,
      speaker: "B",
    },
    {
      text: "Okay.",
      start: 96495,
      end: 97015,
      confidence: 0.96723,
      speaker: "A",
    },
    {
      text: "Is",
      start: 97095,
      end: 97287,
      confidence: 0.82923,
      speaker: "A",
    },
    {
      text: "the",
      start: 97311,
      end: 97447,
      confidence: 0.99647,
      speaker: "A",
    },
    {
      text: "street",
      start: 97471,
      end: 97703,
      confidence: 0.99168,
      speaker: "A",
    },
    {
      text: "number",
      start: 97759,
      end: 98119,
      confidence: 0.99586,
      speaker: "A",
    },
    {
      text: "1905?",
      start: 98207,
      end: 99911,
      confidence: 0.84896,
      speaker: "A",
    },
    {
      text: "Yeah,",
      start: 100103,
      end: 100567,
      confidence: 0.98803,
      speaker: "B",
    },
    {
      text: "1905.",
      start: 100631,
      end: 102315,
      confidence: 0.98281,
      speaker: "B",
    },
    {
      text: "And",
      start: 102775,
      end: 103087,
      confidence: 0.99815,
      speaker: "A",
    },
    {
      text: "the",
      start: 103111,
      end: 103199,
      confidence: 0.97988,
      speaker: "A",
    },
    {
      text: "street",
      start: 103207,
      end: 103399,
      confidence: 0.57706,
      speaker: "A",
    },
    {
      text: "name",
      start: 103447,
      end: 103655,
      confidence: 0.55849,
      speaker: "A",
    },
    {
      text: "is",
      start: 103695,
      end: 103925,
      confidence: 0.78683,
      speaker: "A",
    },
    {
      text: "Bramblewood.",
      start: 103975,
      end: 104841,
      confidence: 0.25072,
      speaker: "A",
    },
    {
      text: "Right.",
      start: 104953,
      end: 105441,
      confidence: 0.3317,
      speaker: "B",
    },
    {
      text: "Is",
      start: 105553,
      end: 105753,
      confidence: 0.954,
      speaker: "A",
    },
    {
      text: "that",
      start: 105769,
      end: 105945,
      confidence: 0.88056,
      speaker: "A",
    },
    {
      text: "correct?",
      start: 105985,
      end: 106497,
      confidence: 0.92886,
      speaker: "A",
    },
    {
      text: "That's",
      start: 106641,
      end: 107001,
      confidence: 0.99508,
      speaker: "B",
    },
    {
      text: "correct.",
      start: 107033,
      end: 107249,
      confidence: 0.99961,
      speaker: "B",
    },
    {
      text: "Okay.",
      start: 107297,
      end: 107761,
      confidence: 0.8384,
      speaker: "C",
    },
    {
      text: "Okay,",
      start: 107873,
      end: 108177,
      confidence: 0.81026,
      speaker: "A",
    },
    {
      text: "so",
      start: 108201,
      end: 108337,
      confidence: 0.99691,
      speaker: "A",
    },
    {
      text: "it's",
      start: 108361,
      end: 108569,
      confidence: 0.82292,
      speaker: "A",
    },
    {
      text: "1905",
      start: 108617,
      end: 110085,
      confidence: 0.9836,
      speaker: "A",
    },
    {
      text: "Bramblewood",
      start: 110625,
      end: 111473,
      confidence: 0.35274,
      speaker: "A",
    },
    {
      text: "Drive,",
      start: 111529,
      end: 112137,
      confidence: 0.75148,
      speaker: "A",
    },
    {
      text: "St.",
      start: 112281,
      end: 112609,
      confidence: 0.94194,
      speaker: "A",
    },
    {
      text: "Cloud,",
      start: 112657,
      end: 113001,
      confidence: 0.93762,
      speaker: "A",
    },
    {
      text: "Florida,",
      start: 113073,
      end: 113633,
      confidence: 0.90447,
      speaker: "A",
    },
    {
      text: "34769.",
      start: 113689,
      end: 115305,
      confidence: 0.97033,
      speaker: "A",
    },
    {
      text: "Yes.",
      start: 115465,
      end: 115825,
      confidence: 0.28756,
      speaker: "A",
    },
    {
      text: "Correct.",
      start: 115865,
      end: 116417,
      confidence: 0.49659,
      speaker: "C",
    },
    {
      text: "Yep.",
      start: 116561,
      end: 117065,
      confidence: 0.50216,
      speaker: "B",
    },
    {
      text: "Okay,",
      start: 117145,
      end: 117729,
      confidence: 0.89829,
      speaker: "A",
    },
    {
      text: "and",
      start: 117857,
      end: 118097,
      confidence: 0.98787,
      speaker: "A",
    },
    {
      text: "could",
      start: 118121,
      end: 118233,
      confidence: 0.99031,
      speaker: "A",
    },
    {
      text: "you",
      start: 118249,
      end: 118377,
      confidence: 0.99812,
      speaker: "A",
    },
    {
      text: "please",
      start: 118401,
      end: 118561,
      confidence: 0.99784,
      speaker: "A",
    },
    {
      text: "verify",
      start: 118593,
      end: 119025,
      confidence: 0.66267,
      speaker: "A",
    },
    {
      text: "your",
      start: 119065,
      end: 119337,
      confidence: 0.99971,
      speaker: "A",
    },
    {
      text: "email",
      start: 119401,
      end: 119673,
      confidence: 0.99799,
      speaker: "A",
    },
    {
      text: "address?",
      start: 119729,
      end: 120325,
      confidence: 0.9999,
      speaker: "A",
    },
    {
      text: "It's",
      start: 120625,
      end: 121169,
      confidence: 0.96839,
      speaker: "B",
    },
    {
      text: "pella",
      start: 121257,
      end: 122049,
      confidence: 0.50599,
      speaker: "B",
    },
    {
      text: "anthony@yahoo.com.",
      start: 122177,
      end: 124725,
      confidence: 0.72695,
      speaker: "B",
    },
    {
      text: "Thank",
      start: 127145,
      end: 127409,
      confidence: 0.68742,
      speaker: "A",
    },
    {
      text: "you",
      start: 127417,
      end: 127465,
      confidence: 0.80333,
      speaker: "A",
    },
    {
      text: "so",
      start: 127465,
      end: 127529,
      confidence: 0.75208,
      speaker: "A",
    },
    {
      text: "much",
      start: 127537,
      end: 127633,
      confidence: 0.99136,
      speaker: "A",
    },
    {
      text: "for",
      start: 127649,
      end: 127753,
      confidence: 0.76598,
      speaker: "A",
    },
    {
      text: "the",
      start: 127769,
      end: 127897,
      confidence: 0.9759,
      speaker: "A",
    },
    {
      text: "verification.",
      start: 127921,
      end: 128937,
      confidence: 0.60783,
      speaker: "A",
    },
    {
      text: "Yeah.",
      start: 129121,
      end: 129847,
      confidence: 0.43522,
      speaker: "B",
    },
    {
      text: "Now,",
      start: 130001,
      end: 130695,
      confidence: 0.97861,
      speaker: "A",
    },
    {
      text: "you",
      start: 131035,
      end: 131371,
      confidence: 0.99445,
      speaker: "A",
    },
    {
      text: "mentioned",
      start: 131403,
      end: 131667,
      confidence: 0.98597,
      speaker: "A",
    },
    {
      text: "computer",
      start: 131691,
      end: 132059,
      confidence: 0.99829,
      speaker: "A",
    },
    {
      text: "engineering,",
      start: 132107,
      end: 132595,
      confidence: 0.53137,
      speaker: "A",
    },
    {
      text: "right?",
      start: 132675,
      end: 133107,
      confidence: 0.99392,
      speaker: "A",
    },
    {
      text: "Mm.",
      start: 133211,
      end: 133895,
      confidence: 0.31667,
      speaker: "B",
    },
    {
      text: "May",
      start: 134835,
      end: 135147,
      confidence: 0.91497,
      speaker: "A",
    },
    {
      text: "I",
      start: 135171,
      end: 135331,
      confidence: 0.99599,
      speaker: "A",
    },
    {
      text: "ask,",
      start: 135363,
      end: 135675,
      confidence: 0.98907,
      speaker: "A",
    },
    {
      text: "what",
      start: 135755,
      end: 135971,
      confidence: 0.99857,
      speaker: "A",
    },
    {
      text: "degree",
      start: 136003,
      end: 136299,
      confidence: 0.95628,
      speaker: "A",
    },
    {
      text: "type",
      start: 136347,
      end: 136611,
      confidence: 0.99581,
      speaker: "A",
    },
    {
      text: "were",
      start: 136643,
      end: 136763,
      confidence: 0.8947,
      speaker: "A",
    },
    {
      text: "you",
      start: 136779,
      end: 136931,
      confidence: 0.99418,
      speaker: "A",
    },
    {
      text: "looking",
      start: 136963,
      end: 137131,
      confidence: 0.9992,
      speaker: "A",
    },
    {
      text: "to",
      start: 137163,
      end: 137307,
      confidence: 0.9967,
      speaker: "A",
    },
    {
      text: "obtain?",
      start: 137331,
      end: 137611,
      confidence: 0.99158,
      speaker: "A",
    },
    {
      text: "Is",
      start: 137683,
      end: 137843,
      confidence: 0.75539,
      speaker: "B",
    },
    {
      text: "it",
      start: 137859,
      end: 138083,
      confidence: 0.9222,
      speaker: "B",
    },
    {
      text: "associate",
      start: 138139,
      end: 139055,
      confidence: 0.75276,
      speaker: "B",
    },
    {
      text: "or",
      start: 139635,
      end: 140211,
      confidence: 0.7876,
      speaker: "B",
    },
    {
      text: "whatever",
      start: 140323,
      end: 140699,
      confidence: 0.99778,
      speaker: "B",
    },
    {
      text: "I",
      start: 140747,
      end: 140907,
      confidence: 0.99654,
      speaker: "B",
    },
    {
      text: "need",
      start: 140931,
      end: 141091,
      confidence: 0.99762,
      speaker: "B",
    },
    {
      text: "to",
      start: 141123,
      end: 141243,
      confidence: 0.99778,
      speaker: "B",
    },
    {
      text: "do?",
      start: 141259,
      end: 141819,
      confidence: 0.99645,
      speaker: "B",
    },
    {
      text: "If",
      start: 141987,
      end: 142243,
      confidence: 0.99301,
      speaker: "B",
    },
    {
      text: "I",
      start: 142259,
      end: 142435,
      confidence: 0.99651,
      speaker: "B",
    },
    {
      text: "get",
      start: 142475,
      end: 142627,
      confidence: 0.99885,
      speaker: "B",
    },
    {
      text: "in",
      start: 142651,
      end: 142811,
      confidence: 0.95964,
      speaker: "B",
    },
    {
      text: "the",
      start: 142843,
      end: 142963,
      confidence: 0.99747,
      speaker: "B",
    },
    {
      text: "first",
      start: 142979,
      end: 143155,
      confidence: 0.99822,
      speaker: "B",
    },
    {
      text: "door,",
      start: 143195,
      end: 143347,
      confidence: 0.46595,
      speaker: "B",
    },
    {
      text: "I",
      start: 143371,
      end: 143483,
      confidence: 0.97018,
      speaker: "B",
    },
    {
      text: "do",
      start: 143499,
      end: 143651,
      confidence: 0.98214,
      speaker: "B",
    },
    {
      text: "associate.",
      start: 143683,
      end: 144219,
      confidence: 0.52262,
      speaker: "B",
    },
    {
      text: "Probably",
      start: 144307,
      end: 144627,
      confidence: 0.7894,
      speaker: "B",
    },
    {
      text: "move",
      start: 144691,
      end: 144915,
      confidence: 0.95686,
      speaker: "B",
    },
    {
      text: "my",
      start: 144955,
      end: 145131,
      confidence: 0.99935,
      speaker: "B",
    },
    {
      text: "way",
      start: 145163,
      end: 145283,
      confidence: 0.99791,
      speaker: "B",
    },
    {
      text: "up",
      start: 145299,
      end: 145403,
      confidence: 0.99131,
      speaker: "B",
    },
    {
      text: "the",
      start: 145419,
      end: 145547,
      confidence: 0.97349,
      speaker: "B",
    },
    {
      text: "ladder,",
      start: 145571,
      end: 146011,
      confidence: 0.84446,
      speaker: "B",
    },
    {
      text: "you",
      start: 146083,
      end: 146219,
      confidence: 0.88974,
      speaker: "B",
    },
    {
      text: "know?",
      start: 146227,
      end: 146707,
      confidence: 0.79785,
      speaker: "B",
    },
    {
      text: "Okay,",
      start: 146851,
      end: 147331,
      confidence: 0.71177,
      speaker: "B",
    },
    {
      text: "so",
      start: 147403,
      end: 147659,
      confidence: 0.85712,
      speaker: "B",
    },
    {
      text: "get",
      start: 147707,
      end: 147843,
      confidence: 0.93967,
      speaker: "B",
    },
    {
      text: "my",
      start: 147859,
      end: 148011,
      confidence: 0.99717,
      speaker: "B",
    },
    {
      text: "first",
      start: 148043,
      end: 148211,
      confidence: 0.99974,
      speaker: "B",
    },
    {
      text: "one",
      start: 148243,
      end: 148387,
      confidence: 0.99346,
      speaker: "B",
    },
    {
      text: "and",
      start: 148411,
      end: 148499,
      confidence: 0.99328,
      speaker: "B",
    },
    {
      text: "then",
      start: 148507,
      end: 148675,
      confidence: 0.96917,
      speaker: "B",
    },
    {
      text: "keep",
      start: 148715,
      end: 148867,
      confidence: 0.99984,
      speaker: "B",
    },
    {
      text: "on",
      start: 148891,
      end: 149075,
      confidence: 0.99755,
      speaker: "B",
    },
    {
      text: "going.",
      start: 149115,
      end: 149771,
      confidence: 0.99939,
      speaker: "B",
    },
    {
      text: "Okay,",
      start: 149963,
      end: 150775,
      confidence: 0.77338,
      speaker: "A",
    },
    {
      text: "so",
      start: 151315,
      end: 152055,
      confidence: 0.98546,
      speaker: "A",
    },
    {
      text: "would",
      start: 152475,
      end: 152787,
      confidence: 0.40246,
      speaker: "A",
    },
    {
      text: "be",
      start: 152811,
      end: 152947,
      confidence: 0.88741,
      speaker: "A",
    },
    {
      text: "associate",
      start: 152971,
      end: 153683,
      confidence: 0.72731,
      speaker: "A",
    },
    {
      text: "degree",
      start: 153819,
      end: 154603,
      confidence: 0.84452,
      speaker: "A",
    },
    {
      text: "for",
      start: 154779,
      end: 155043,
      confidence: 0.99192,
      speaker: "A",
    },
    {
      text: "the",
      start: 155059,
      end: 155187,
      confidence: 0.99594,
      speaker: "A",
    },
    {
      text: "moment?",
      start: 155211,
      end: 155807,
      confidence: 0.998,
      speaker: "A",
    },
    {
      text: "Yep.",
      start: 155971,
      end: 156755,
      confidence: 0.38801,
      speaker: "B",
    },
    {
      text: "Okay.",
      start: 159255,
      end: 159687,
      confidence: 0.43559,
      speaker: "C",
    },
    {
      text: "Anthony,",
      start: 159711,
      end: 159951,
      confidence: 0.99309,
      speaker: "A",
    },
    {
      text: "you've",
      start: 159983,
      end: 160143,
      confidence: 0.73018,
      speaker: "A",
    },
    {
      text: "mentioned",
      start: 160159,
      end: 160383,
      confidence: 0.76697,
      speaker: "A",
    },
    {
      text: "that",
      start: 160399,
      end: 160503,
      confidence: 0.96336,
      speaker: "A",
    },
    {
      text: "you're",
      start: 160519,
      end: 160735,
      confidence: 0.92643,
      speaker: "A",
    },
    {
      text: "21.",
      start: 160775,
      end: 161439,
      confidence: 0.9629,
      speaker: "A",
    },
    {
      text: "I'm",
      start: 161567,
      end: 161783,
      confidence: 0.96525,
      speaker: "A",
    },
    {
      text: "sorry,",
      start: 161799,
      end: 162063,
      confidence: 0.97792,
      speaker: "A",
    },
    {
      text: "29",
      start: 162119,
      end: 162599,
      confidence: 0.99726,
      speaker: "A",
    },
    {
      text: "years",
      start: 162647,
      end: 162903,
      confidence: 0.99433,
      speaker: "A",
    },
    {
      text: "old",
      start: 162959,
      end: 163559,
      confidence: 0.99947,
      speaker: "A",
    },
    {
      text: "now,",
      start: 163727,
      end: 164055,
      confidence: 0.95362,
      speaker: "A",
    },
    {
      text: "if",
      start: 164095,
      end: 164223,
      confidence: 0.99872,
      speaker: "A",
    },
    {
      text: "I",
      start: 164239,
      end: 164367,
      confidence: 0.99784,
      speaker: "A",
    },
    {
      text: "may",
      start: 164391,
      end: 164695,
      confidence: 0.99376,
      speaker: "A",
    },
    {
      text: "ask.",
      start: 164775,
      end: 165395,
      confidence: 0.99368,
      speaker: "A",
    },
    {
      text: "Well,",
      start: 167215,
      end: 167527,
      confidence: 0.48665,
      speaker: "A",
    },
    {
      text: "what's",
      start: 167551,
      end: 167743,
      confidence: 0.99299,
      speaker: "A",
    },
    {
      text: "the",
      start: 167759,
      end: 167887,
      confidence: 0.99931,
      speaker: "A",
    },
    {
      text: "highest",
      start: 167911,
      end: 168175,
      confidence: 0.99684,
      speaker: "A",
    },
    {
      text: "level",
      start: 168215,
      end: 168415,
      confidence: 0.99908,
      speaker: "A",
    },
    {
      text: "of",
      start: 168455,
      end: 168727,
      confidence: 0.99788,
      speaker: "A",
    },
    {
      text: "education?",
      start: 168791,
      end: 169395,
      confidence: 0.99886,
      speaker: "A",
    },
    {
      text: "I",
      start: 170215,
      end: 170623,
      confidence: 0.99302,
      speaker: "B",
    },
    {
      text: "dropped",
      start: 170679,
      end: 171031,
      confidence: 0.98925,
      speaker: "B",
    },
    {
      text: "out",
      start: 171063,
      end: 171303,
      confidence: 0.99872,
      speaker: "B",
    },
    {
      text: "when",
      start: 171359,
      end: 171719,
      confidence: 0.9956,
      speaker: "B",
    },
    {
      text: "I",
      start: 171807,
      end: 172031,
      confidence: 0.99755,
      speaker: "B",
    },
    {
      text: "was",
      start: 172063,
      end: 172255,
      confidence: 0.99914,
      speaker: "B",
    },
    {
      text: "in",
      start: 172295,
      end: 172423,
      confidence: 0.99783,
      speaker: "B",
    },
    {
      text: "the",
      start: 172439,
      end: 172615,
      confidence: 0.99009,
      speaker: "B",
    },
    {
      text: "11th",
      start: 172655,
      end: 173039,
      confidence: 0.99612,
      speaker: "B",
    },
    {
      text: "grade,",
      start: 173087,
      end: 173559,
      confidence: 0.94633,
      speaker: "B",
    },
    {
      text: "and",
      start: 173687,
      end: 173927,
      confidence: 0.99748,
      speaker: "B",
    },
    {
      text: "I",
      start: 173951,
      end: 174111,
      confidence: 0.99581,
      speaker: "B",
    },
    {
      text: "started",
      start: 174143,
      end: 174335,
      confidence: 0.99941,
      speaker: "B",
    },
    {
      text: "doing",
      start: 174375,
      end: 174551,
      confidence: 0.99734,
      speaker: "B",
    },
    {
      text: "plumbing.",
      start: 174583,
      end: 174959,
      confidence: 0.90705,
      speaker: "B",
    },
    {
      text: "I've",
      start: 175007,
      end: 175247,
      confidence: 0.99191,
      speaker: "B",
    },
    {
      text: "actually",
      start: 175271,
      end: 175479,
      confidence: 0.99885,
      speaker: "B",
    },
    {
      text: "been",
      start: 175527,
      end: 175663,
      confidence: 0.99934,
      speaker: "B",
    },
    {
      text: "doing",
      start: 175679,
      end: 175831,
      confidence: 0.99718,
      speaker: "B",
    },
    {
      text: "plumbing",
      start: 175863,
      end: 176151,
      confidence: 0.89203,
      speaker: "B",
    },
    {
      text: "for",
      start: 176183,
      end: 176351,
      confidence: 0.99845,
      speaker: "B",
    },
    {
      text: "13",
      start: 176383,
      end: 176695,
      confidence: 0.99888,
      speaker: "B",
    },
    {
      text: "years.",
      start: 176775,
      end: 177279,
      confidence: 0.99906,
      speaker: "B",
    },
    {
      text: "I'm",
      start: 177407,
      end: 177647,
      confidence: 0.96725,
      speaker: "B",
    },
    {
      text: "a",
      start: 177671,
      end: 177783,
      confidence: 0.99403,
      speaker: "B",
    },
    {
      text: "registered",
      start: 177799,
      end: 178191,
      confidence: 0.52987,
      speaker: "B",
    },
    {
      text: "apprentice.",
      start: 178223,
      end: 178599,
      confidence: 0.60882,
      speaker: "B",
    },
    {
      text: "I",
      start: 178647,
      end: 178807,
      confidence: 0.62823,
      speaker: "B",
    },
    {
      text: "actually",
      start: 178831,
      end: 179015,
      confidence: 0.99128,
      speaker: "B",
    },
    {
      text: "only",
      start: 179055,
      end: 179207,
      confidence: 0.87328,
      speaker: "B",
    },
    {
      text: "have",
      start: 179231,
      end: 179319,
      confidence: 0.96855,
      speaker: "B",
    },
    {
      text: "to",
      start: 179327,
      end: 179399,
      confidence: 0.99799,
      speaker: "B",
    },
    {
      text: "take",
      start: 179407,
      end: 179551,
      confidence: 0.99884,
      speaker: "B",
    },
    {
      text: "the",
      start: 179583,
      end: 179703,
      confidence: 0.99739,
      speaker: "B",
    },
    {
      text: "test",
      start: 179719,
      end: 179871,
      confidence: 0.99829,
      speaker: "B",
    },
    {
      text: "to",
      start: 179903,
      end: 180023,
      confidence: 0.92445,
      speaker: "B",
    },
    {
      text: "become",
      start: 180039,
      end: 180215,
      confidence: 0.98656,
      speaker: "B",
    },
    {
      text: "a",
      start: 180255,
      end: 180835,
      confidence: 0.58017,
      speaker: "B",
    },
    {
      text: "journeyman's.",
      start: 181785,
      end: 182617,
      confidence: 0.26417,
      speaker: "B",
    },
    {
      text: "A",
      start: 182681,
      end: 182833,
      confidence: 0.74586,
      speaker: "B",
    },
    {
      text: "journeyman",
      start: 182849,
      end: 183289,
      confidence: 0.25559,
      speaker: "B",
    },
    {
      text: "to",
      start: 183337,
      end: 183497,
      confidence: 0.58386,
      speaker: "B",
    },
    {
      text: "open",
      start: 183521,
      end: 183681,
      confidence: 0.91832,
      speaker: "B",
    },
    {
      text: "my",
      start: 183713,
      end: 183833,
      confidence: 0.99219,
      speaker: "B",
    },
    {
      text: "own",
      start: 183849,
      end: 184025,
      confidence: 0.99697,
      speaker: "B",
    },
    {
      text: "company.",
      start: 184065,
      end: 184313,
      confidence: 0.99954,
      speaker: "B",
    },
    {
      text: "And",
      start: 184369,
      end: 184513,
      confidence: 0.99377,
      speaker: "B",
    },
    {
      text: "I'm",
      start: 184529,
      end: 184969,
      confidence: 0.58911,
      speaker: "B",
    },
    {
      text: "not",
      start: 185097,
      end: 185337,
      confidence: 0.99982,
      speaker: "B",
    },
    {
      text: "too",
      start: 185361,
      end: 185545,
      confidence: 0.99873,
      speaker: "B",
    },
    {
      text: "fond",
      start: 185585,
      end: 185761,
      confidence: 0.93924,
      speaker: "B",
    },
    {
      text: "of",
      start: 185793,
      end: 185937,
      confidence: 0.9997,
      speaker: "B",
    },
    {
      text: "plumbing,",
      start: 185961,
      end: 186425,
      confidence: 0.47526,
      speaker: "B",
    },
    {
      text: "you",
      start: 186505,
      end: 186649,
      confidence: 0.98847,
      speaker: "B",
    },
    {
      text: "know,",
      start: 186657,
      end: 186873,
      confidence: 0.99448,
      speaker: "B",
    },
    {
      text: "saying",
      start: 186929,
      end: 187313,
      confidence: 0.81707,
      speaker: "B",
    },
    {
      text: "I",
      start: 187409,
      end: 187569,
      confidence: 0.83676,
      speaker: "B",
    },
    {
      text: "need",
      start: 187577,
      end: 187697,
      confidence: 0.97554,
      speaker: "B",
    },
    {
      text: "something,",
      start: 187721,
      end: 187881,
      confidence: 0.35001,
      speaker: "B",
    },
    {
      text: "I",
      start: 187913,
      end: 188033,
      confidence: 0.99414,
      speaker: "B",
    },
    {
      text: "want",
      start: 188049,
      end: 188129,
      confidence: 0.99116,
      speaker: "B",
    },
    {
      text: "to",
      start: 188137,
      end: 188233,
      confidence: 0.99795,
      speaker: "B",
    },
    {
      text: "do",
      start: 188249,
      end: 188377,
      confidence: 0.99879,
      speaker: "B",
    },
    {
      text: "something",
      start: 188401,
      end: 188585,
      confidence: 0.99904,
      speaker: "B",
    },
    {
      text: "else",
      start: 188625,
      end: 188801,
      confidence: 0.99876,
      speaker: "B",
    },
    {
      text: "besides",
      start: 188833,
      end: 189201,
      confidence: 0.56015,
      speaker: "B",
    },
    {
      text: "plumbing.",
      start: 189233,
      end: 189497,
      confidence: 0.79484,
      speaker: "B",
    },
    {
      text: "For",
      start: 189521,
      end: 189633,
      confidence: 0.9975,
      speaker: "B",
    },
    {
      text: "the",
      start: 189649,
      end: 189705,
      confidence: 0.99695,
      speaker: "B",
    },
    {
      text: "rest",
      start: 189705,
      end: 189841,
      confidence: 0.94323,
      speaker: "B",
    },
    {
      text: "of",
      start: 189873,
      end: 189969,
      confidence: 0.99901,
      speaker: "B",
    },
    {
      text: "my",
      start: 189977,
      end: 190121,
      confidence: 0.99955,
      speaker: "B",
    },
    {
      text: "life.",
      start: 190153,
      end: 190725,
      confidence: 0.99882,
      speaker: "B",
    },
    {
      text: "Okay.",
      start: 191225,
      end: 192041,
      confidence: 0.57747,
      speaker: "C",
    },
    {
      text: "And",
      start: 192193,
      end: 192481,
      confidence: 0.98463,
      speaker: "A",
    },
    {
      text: "do",
      start: 192513,
      end: 192633,
      confidence: 0.89137,
      speaker: "A",
    },
    {
      text: "you",
      start: 192649,
      end: 192753,
      confidence: 0.99412,
      speaker: "A",
    },
    {
      text: "have",
      start: 192769,
      end: 192897,
      confidence: 0.99934,
      speaker: "A",
    },
    {
      text: "a",
      start: 192921,
      end: 193081,
      confidence: 0.99079,
      speaker: "A",
    },
    {
      text: "diploma",
      start: 193113,
      end: 193513,
      confidence: 0.99561,
      speaker: "A",
    },
    {
      text: "or",
      start: 193569,
      end: 193785,
      confidence: 0.99724,
      speaker: "A",
    },
    {
      text: "a",
      start: 193825,
      end: 193953,
      confidence: 0.95663,
      speaker: "A",
    },
    {
      text: "GED?",
      start: 193969,
      end: 194801,
      confidence: 0.81513,
      speaker: "A",
    },
    {
      text: "I",
      start: 194993,
      end: 195273,
      confidence: 0.99487,
      speaker: "B",
    },
    {
      text: "have",
      start: 195289,
      end: 195369,
      confidence: 0.99963,
      speaker: "B",
    },
    {
      text: "a",
      start: 195377,
      end: 195473,
      confidence: 0.99541,
      speaker: "B",
    },
    {
      text: "GED.",
      start: 195489,
      end: 196129,
      confidence: 0.90896,
      speaker: "B",
    },
    {
      text: "GED.",
      start: 196257,
      end: 196713,
      confidence: 0.47514,
      speaker: "A",
    },
    {
      text: "Okay.",
      start: 196769,
      end: 197445,
      confidence: 0.72392,
      speaker: "A",
    },
    {
      text: "And",
      start: 199785,
      end: 200097,
      confidence: 0.98892,
      speaker: "A",
    },
    {
      text: "what",
      start: 200121,
      end: 200281,
      confidence: 0.99727,
      speaker: "A",
    },
    {
      text: "year",
      start: 200313,
      end: 200457,
      confidence: 0.97459,
      speaker: "A",
    },
    {
      text: "did",
      start: 200481,
      end: 200617,
      confidence: 0.97606,
      speaker: "A",
    },
    {
      text: "you",
      start: 200641,
      end: 200753,
      confidence: 0.99805,
      speaker: "A",
    },
    {
      text: "obtain",
      start: 200769,
      end: 201017,
      confidence: 0.9144,
      speaker: "A",
    },
    {
      text: "your",
      start: 201081,
      end: 201329,
      confidence: 0.99396,
      speaker: "A",
    },
    {
      text: "GED?",
      start: 201377,
      end: 202125,
      confidence: 0.86153,
      speaker: "A",
    },
    {
      text: "1999.",
      start: 202505,
      end: 203885,
      confidence: 0.97736,
      speaker: "B",
    },
    {
      text: "Okay,",
      start: 208765,
      end: 209189,
      confidence: 0.85067,
      speaker: "A",
    },
    {
      text: "and",
      start: 209237,
      end: 209397,
      confidence: 0.97961,
      speaker: "A",
    },
    {
      text: "for",
      start: 209421,
      end: 209557,
      confidence: 0.99527,
      speaker: "A",
    },
    {
      text: "your",
      start: 209581,
      end: 209741,
      confidence: 0.99578,
      speaker: "A",
    },
    {
      text: "class",
      start: 209773,
      end: 209989,
      confidence: 0.99381,
      speaker: "A",
    },
    {
      text: "type",
      start: 210037,
      end: 210285,
      confidence: 0.90749,
      speaker: "A",
    },
    {
      text: "reference,",
      start: 210325,
      end: 210709,
      confidence: 0.33254,
      speaker: "A",
    },
    {
      text: "would",
      start: 210757,
      end: 210917,
      confidence: 0.98139,
      speaker: "A",
    },
    {
      text: "it",
      start: 210941,
      end: 211077,
      confidence: 0.98855,
      speaker: "A",
    },
    {
      text: "be",
      start: 211101,
      end: 211309,
      confidence: 0.99909,
      speaker: "A",
    },
    {
      text: "online,",
      start: 211357,
      end: 211877,
      confidence: 0.99955,
      speaker: "A",
    },
    {
      text: "on",
      start: 212021,
      end: 212325,
      confidence: 0.98954,
      speaker: "A",
    },
    {
      text: "campus",
      start: 212365,
      end: 212909,
      confidence: 0.90451,
      speaker: "A",
    },
    {
      text: "or.",
      start: 213037,
      end: 213373,
      confidence: 0.64549,
      speaker: "A",
    },
    {
      text: "No,",
      start: 213429,
      end: 213621,
      confidence: 0.42013,
      speaker: "B",
    },
    {
      text: "probably",
      start: 213653,
      end: 214053,
      confidence: 0.80365,
      speaker: "B",
    },
    {
      text: "campus.",
      start: 214149,
      end: 214621,
      confidence: 0.71802,
      speaker: "B",
    },
    {
      text: "Probably",
      start: 214693,
      end: 214901,
      confidence: 0.60474,
      speaker: "B",
    },
    {
      text: "would",
      start: 214933,
      end: 215077,
      confidence: 0.51075,
      speaker: "B",
    },
    {
      text: "be",
      start: 215101,
      end: 215285,
      confidence: 0.99286,
      speaker: "B",
    },
    {
      text: "campus.",
      start: 215325,
      end: 216025,
      confidence: 0.99601,
      speaker: "B",
    },
    {
      text: "Campus.",
      start: 216485,
      end: 217037,
      confidence: 0.61174,
      speaker: "A",
    },
    {
      text: "Okay.",
      start: 217101,
      end: 217785,
      confidence: 0.58967,
      speaker: "C",
    },
    {
      text: "Just",
      start: 221365,
      end: 221653,
      confidence: 0.98504,
      speaker: "A",
    },
    {
      text: "in",
      start: 221669,
      end: 221749,
      confidence: 0.99397,
      speaker: "A",
    },
    {
      text: "case",
      start: 221757,
      end: 222305,
      confidence: 0.62228,
      speaker: "A",
    },
    {
      text: "we'll",
      start: 222605,
      end: 222933,
      confidence: 0.32509,
      speaker: "A",
    },
    {
      text: "not",
      start: 222949,
      end: 223053,
      confidence: 0.95441,
      speaker: "A",
    },
    {
      text: "be",
      start: 223069,
      end: 223149,
      confidence: 0.85045,
      speaker: "A",
    },
    {
      text: "able",
      start: 223157,
      end: 223277,
      confidence: 0.60757,
      speaker: "A",
    },
    {
      text: "to",
      start: 223301,
      end: 223437,
      confidence: 0.99722,
      speaker: "A",
    },
    {
      text: "find",
      start: 223461,
      end: 223621,
      confidence: 0.99666,
      speaker: "A",
    },
    {
      text: "a",
      start: 223653,
      end: 223773,
      confidence: 0.98754,
      speaker: "A",
    },
    {
      text: "campus",
      start: 223789,
      end: 224069,
      confidence: 0.99731,
      speaker: "A",
    },
    {
      text: "based",
      start: 224117,
      end: 224349,
      confidence: 0.95491,
      speaker: "A",
    },
    {
      text: "school,",
      start: 224397,
      end: 224653,
      confidence: 0.99709,
      speaker: "A",
    },
    {
      text: "would",
      start: 224709,
      end: 224853,
      confidence: 0.9879,
      speaker: "A",
    },
    {
      text: "you",
      start: 224869,
      end: 224997,
      confidence: 0.98455,
      speaker: "A",
    },
    {
      text: "be",
      start: 225021,
      end: 225133,
      confidence: 0.99717,
      speaker: "A",
    },
    {
      text: "okay",
      start: 225149,
      end: 225357,
      confidence: 0.94216,
      speaker: "A",
    },
    {
      text: "with",
      start: 225381,
      end: 225541,
      confidence: 0.98788,
      speaker: "A",
    },
    {
      text: "an",
      start: 225573,
      end: 225669,
      confidence: 0.98078,
      speaker: "A",
    },
    {
      text: "online",
      start: 225677,
      end: 226085,
      confidence: 0.55794,
      speaker: "A",
    },
    {
      text: "school?",
      start: 226205,
      end: 226941,
      confidence: 0.9996,
      speaker: "A",
    },
    {
      text: "Yeah.",
      start: 227133,
      end: 227973,
      confidence: 0.97259,
      speaker: "B",
    },
    {
      text: "Okay.",
      start: 228149,
      end: 228945,
      confidence: 0.92081,
      speaker: "C",
    },
    {
      text: "And",
      start: 230925,
      end: 231213,
      confidence: 0.9475,
      speaker: "A",
    },
    {
      text: "are",
      start: 231229,
      end: 231333,
      confidence: 0.9963,
      speaker: "A",
    },
    {
      text: "you",
      start: 231349,
      end: 231477,
      confidence: 0.99145,
      speaker: "A",
    },
    {
      text: "a",
      start: 231501,
      end: 231613,
      confidence: 0.94855,
      speaker: "A",
    },
    {
      text: "United",
      start: 231629,
      end: 231853,
      confidence: 0.99883,
      speaker: "A",
    },
    {
      text: "States",
      start: 231909,
      end: 232125,
      confidence: 0.99572,
      speaker: "A",
    },
    {
      text: "citizen?",
      start: 232165,
      end: 232865,
      confidence: 0.62741,
      speaker: "A",
    },
    {
      text: "Yes,",
      start: 233315,
      end: 233627,
      confidence: 0.90544,
      speaker: "B",
    },
    {
      text: "I",
      start: 233651,
      end: 233787,
      confidence: 0.99441,
      speaker: "B",
    },
    {
      text: "am.",
      start: 233811,
      end: 234375,
      confidence: 0.99522,
      speaker: "B",
    },
    {
      text: "Thank",
      start: 234875,
      end: 235187,
      confidence: 0.84435,
      speaker: "C",
    },
    {
      text: "you.",
      start: 235211,
      end: 235371,
      confidence: 0.9969,
      speaker: "C",
    },
    {
      text: "And",
      start: 235403,
      end: 235547,
      confidence: 0.87723,
      speaker: "A",
    },
    {
      text: "are",
      start: 235571,
      end: 235683,
      confidence: 0.99537,
      speaker: "A",
    },
    {
      text: "you",
      start: 235699,
      end: 235827,
      confidence: 0.99849,
      speaker: "A",
    },
    {
      text: "associated",
      start: 235851,
      end: 236267,
      confidence: 0.56071,
      speaker: "A",
    },
    {
      text: "with",
      start: 236331,
      end: 236483,
      confidence: 0.99557,
      speaker: "A",
    },
    {
      text: "the",
      start: 236499,
      end: 236603,
      confidence: 0.89029,
      speaker: "A",
    },
    {
      text: "United",
      start: 236619,
      end: 236843,
      confidence: 0.93724,
      speaker: "A",
    },
    {
      text: "States",
      start: 236899,
      end: 237139,
      confidence: 0.9947,
      speaker: "A",
    },
    {
      text: "military?",
      start: 237187,
      end: 238027,
      confidence: 0.91303,
      speaker: "A",
    },
    {
      text: "What",
      start: 238211,
      end: 238483,
      confidence: 0.99227,
      speaker: "B",
    },
    {
      text: "was",
      start: 238499,
      end: 238627,
      confidence: 0.99469,
      speaker: "B",
    },
    {
      text: "that?",
      start: 238651,
      end: 239215,
      confidence: 0.99525,
      speaker: "B",
    },
    {
      text: "I'm",
      start: 239635,
      end: 239963,
      confidence: 0.79294,
      speaker: "A",
    },
    {
      text: "sorry?",
      start: 239979,
      end: 240171,
      confidence: 0.989,
      speaker: "A",
    },
    {
      text: "Are",
      start: 240203,
      end: 240299,
      confidence: 0.99396,
      speaker: "A",
    },
    {
      text: "you",
      start: 240307,
      end: 240547,
      confidence: 0.99932,
      speaker: "A",
    },
    {
      text: "associated",
      start: 240611,
      end: 241195,
      confidence: 0.7537,
      speaker: "A",
    },
    {
      text: "with",
      start: 241275,
      end: 241491,
      confidence: 0.99872,
      speaker: "A",
    },
    {
      text: "the",
      start: 241523,
      end: 241691,
      confidence: 0.98712,
      speaker: "A",
    },
    {
      text: "United",
      start: 241723,
      end: 241963,
      confidence: 0.996,
      speaker: "A",
    },
    {
      text: "States",
      start: 242019,
      end: 242283,
      confidence: 0.99938,
      speaker: "A",
    },
    {
      text: "military?",
      start: 242339,
      end: 243139,
      confidence: 0.99967,
      speaker: "A",
    },
    {
      text: "No,",
      start: 243307,
      end: 243563,
      confidence: 0.99334,
      speaker: "B",
    },
    {
      text: "I'm",
      start: 243579,
      end: 243707,
      confidence: 0.9624,
      speaker: "B",
    },
    {
      text: "not.",
      start: 243731,
      end: 244295,
      confidence: 0.99797,
      speaker: "B",
    },
    {
      text: "Okay.",
      start: 245355,
      end: 246175,
      confidence: 0.46923,
      speaker: "C",
    },
    {
      text: "And",
      start: 247435,
      end: 247747,
      confidence: 0.93187,
      speaker: "A",
    },
    {
      text: "what",
      start: 247771,
      end: 247931,
      confidence: 0.99959,
      speaker: "A",
    },
    {
      text: "would",
      start: 247963,
      end: 248083,
      confidence: 0.99889,
      speaker: "A",
    },
    {
      text: "be",
      start: 248099,
      end: 248179,
      confidence: 0.99915,
      speaker: "A",
    },
    {
      text: "the",
      start: 248187,
      end: 248331,
      confidence: 0.99871,
      speaker: "A",
    },
    {
      text: "best",
      start: 248363,
      end: 248555,
      confidence: 0.99954,
      speaker: "A",
    },
    {
      text: "time",
      start: 248595,
      end: 248747,
      confidence: 0.99543,
      speaker: "A",
    },
    {
      text: "for",
      start: 248771,
      end: 248907,
      confidence: 0.99651,
      speaker: "A",
    },
    {
      text: "a",
      start: 248931,
      end: 249067,
      confidence: 0.89656,
      speaker: "A",
    },
    {
      text: "school",
      start: 249091,
      end: 249275,
      confidence: 0.99877,
      speaker: "A",
    },
    {
      text: "enrollment",
      start: 249315,
      end: 249659,
      confidence: 0.88824,
      speaker: "A",
    },
    {
      text: "counselor",
      start: 249707,
      end: 250131,
      confidence: 0.63132,
      speaker: "A",
    },
    {
      text: "to",
      start: 250163,
      end: 250355,
      confidence: 0.99182,
      speaker: "A",
    },
    {
      text: "contact",
      start: 250395,
      end: 250643,
      confidence: 0.99083,
      speaker: "A",
    },
    {
      text: "you",
      start: 250699,
      end: 251011,
      confidence: 0.71414,
      speaker: "A",
    },
    {
      text: "in",
      start: 251083,
      end: 251219,
      confidence: 0.99682,
      speaker: "A",
    },
    {
      text: "the",
      start: 251227,
      end: 251371,
      confidence: 0.99716,
      speaker: "A",
    },
    {
      text: "morning,",
      start: 251403,
      end: 251955,
      confidence: 0.9999,
      speaker: "A",
    },
    {
      text: "afternoon,",
      start: 252115,
      end: 252611,
      confidence: 0.99506,
      speaker: "A",
    },
    {
      text: "or",
      start: 252643,
      end: 252859,
      confidence: 0.99878,
      speaker: "A",
    },
    {
      text: "evening?",
      start: 252907,
      end: 253535,
      confidence: 0.72964,
      speaker: "A",
    },
    {
      text: "Pretty",
      start: 255755,
      end: 256019,
      confidence: 0.99827,
      speaker: "B",
    },
    {
      text: "much",
      start: 256027,
      end: 256171,
      confidence: 0.9997,
      speaker: "B",
    },
    {
      text: "any",
      start: 256203,
      end: 256371,
      confidence: 0.99942,
      speaker: "B",
    },
    {
      text: "time",
      start: 256403,
      end: 256547,
      confidence: 0.9883,
      speaker: "B",
    },
    {
      text: "of",
      start: 256571,
      end: 256659,
      confidence: 0.89067,
      speaker: "B",
    },
    {
      text: "the",
      start: 256667,
      end: 256787,
      confidence: 0.98757,
      speaker: "B",
    },
    {
      text: "day.",
      start: 256811,
      end: 257375,
      confidence: 0.99823,
      speaker: "B",
    },
    {
      text: "And",
      start: 260005,
      end: 260341,
      confidence: 0.96669,
      speaker: "A",
    },
    {
      text: "what",
      start: 260373,
      end: 260517,
      confidence: 0.99948,
      speaker: "A",
    },
    {
      text: "is",
      start: 260541,
      end: 260653,
      confidence: 0.99721,
      speaker: "A",
    },
    {
      text: "your",
      start: 260669,
      end: 260821,
      confidence: 0.99907,
      speaker: "A",
    },
    {
      text: "exact",
      start: 260853,
      end: 261125,
      confidence: 0.99822,
      speaker: "A",
    },
    {
      text: "date",
      start: 261165,
      end: 261317,
      confidence: 0.9552,
      speaker: "A",
    },
    {
      text: "of",
      start: 261341,
      end: 261477,
      confidence: 0.98803,
      speaker: "A",
    },
    {
      text: "birth?",
      start: 261501,
      end: 262109,
      confidence: 0.56287,
      speaker: "A",
    },
    {
      text: "10,",
      start: 262277,
      end: 262919,
      confidence: 0.86286,
      speaker: "B",
    },
    {
      text: "1580.",
      start: 263062,
      end: 263705,
      confidence: 0.86286,
      speaker: "B",
    },
    {
      text: "So",
      start: 266005,
      end: 266437,
      confidence: 0.96628,
      speaker: "A",
    },
    {
      text: "that",
      start: 266501,
      end: 266725,
      confidence: 0.99899,
      speaker: "A",
    },
    {
      text: "would",
      start: 266765,
      end: 266917,
      confidence: 0.57285,
      speaker: "A",
    },
    {
      text: "be",
      start: 266941,
      end: 267413,
      confidence: 0.99821,
      speaker: "A",
    },
    {
      text: "October",
      start: 267549,
      end: 268314,
      confidence: 0.9877,
      speaker: "A",
    },
    {
      text: "15th,",
      start: 268484,
      end: 269165,
      confidence: 0.9877,
      speaker: "A",
    },
    {
      text: "1980?",
      start: 269335,
      end: 270101,
      confidence: 0.9877,
      speaker: "A",
    },
    {
      text: "That's",
      start: 270253,
      end: 270605,
      confidence: 0.99086,
      speaker: "B",
    },
    {
      text: "correct.",
      start: 270645,
      end: 271225,
      confidence: 0.99959,
      speaker: "B",
    },
    {
      text: "Okay.",
      start: 272925,
      end: 273745,
      confidence: 0.62645,
      speaker: "C",
    },
    {
      text: "Okay,",
      start: 274165,
      end: 274557,
      confidence: 0.5777,
      speaker: "A",
    },
    {
      text: "Anthony,",
      start: 274581,
      end: 275225,
      confidence: 0.88388,
      speaker: "A",
    },
    {
      text: "if",
      start: 276805,
      end: 277093,
      confidence: 0.98977,
      speaker: "A",
    },
    {
      text: "we",
      start: 277109,
      end: 277213,
      confidence: 0.99876,
      speaker: "A",
    },
    {
      text: "can",
      start: 277229,
      end: 277309,
      confidence: 0.99845,
      speaker: "A",
    },
    {
      text: "find",
      start: 277317,
      end: 277509,
      confidence: 0.69082,
      speaker: "A",
    },
    {
      text: "school",
      start: 277557,
      end: 277765,
      confidence: 0.99777,
      speaker: "A",
    },
    {
      text: "for",
      start: 277805,
      end: 277933,
      confidence: 0.97895,
      speaker: "A",
    },
    {
      text: "you",
      start: 277949,
      end: 278077,
      confidence: 0.99533,
      speaker: "A",
    },
    {
      text: "that",
      start: 278101,
      end: 278237,
      confidence: 0.97144,
      speaker: "A",
    },
    {
      text: "meets",
      start: 278261,
      end: 278469,
      confidence: 0.17763,
      speaker: "A",
    },
    {
      text: "your",
      start: 278477,
      end: 278597,
      confidence: 0.89078,
      speaker: "A",
    },
    {
      text: "needs,",
      start: 278621,
      end: 278829,
      confidence: 0.91558,
      speaker: "A",
    },
    {
      text: "school",
      start: 278877,
      end: 279085,
      confidence: 0.98342,
      speaker: "A",
    },
    {
      text: "enrollment",
      start: 279125,
      end: 279469,
      confidence: 0.89736,
      speaker: "A",
    },
    {
      text: "counselors",
      start: 279517,
      end: 280029,
      confidence: 0.83014,
      speaker: "A",
    },
    {
      text: "will",
      start: 280077,
      end: 280237,
      confidence: 0.87938,
      speaker: "A",
    },
    {
      text: "be",
      start: 280261,
      end: 280421,
      confidence: 0.99924,
      speaker: "A",
    },
    {
      text: "contacting",
      start: 280453,
      end: 280925,
      confidence: 0.98847,
      speaker: "A",
    },
    {
      text: "you",
      start: 280965,
      end: 281545,
      confidence: 0.99964,
      speaker: "A",
    },
    {
      text: "in",
      start: 281845,
      end: 282133,
      confidence: 0.99915,
      speaker: "A",
    },
    {
      text: "the",
      start: 282149,
      end: 282277,
      confidence: 0.99951,
      speaker: "A",
    },
    {
      text: "near",
      start: 282301,
      end: 282485,
      confidence: 0.99946,
      speaker: "A",
    },
    {
      text: "future,",
      start: 282525,
      end: 282989,
      confidence: 0.99994,
      speaker: "A",
    },
    {
      text: "either",
      start: 283117,
      end: 283381,
      confidence: 0.90191,
      speaker: "A",
    },
    {
      text: "by",
      start: 283413,
      end: 283677,
      confidence: 0.98731,
      speaker: "A",
    },
    {
      text: "phone",
      start: 283741,
      end: 284037,
      confidence: 0.89255,
      speaker: "A",
    },
    {
      text: "or",
      start: 284101,
      end: 284301,
      confidence: 0.999,
      speaker: "A",
    },
    {
      text: "by",
      start: 284333,
      end: 284525,
      confidence: 0.99409,
      speaker: "A",
    },
    {
      text: "email,",
      start: 284565,
      end: 284837,
      confidence: 0.99452,
      speaker: "A",
    },
    {
      text: "and",
      start: 284901,
      end: 285053,
      confidence: 0.99326,
      speaker: "A",
    },
    {
      text: "they",
      start: 285069,
      end: 285197,
      confidence: 0.98911,
      speaker: "A",
    },
    {
      text: "can",
      start: 285221,
      end: 285405,
      confidence: 0.99882,
      speaker: "A",
    },
    {
      text: "answer",
      start: 285445,
      end: 285685,
      confidence: 0.97404,
      speaker: "A",
    },
    {
      text: "any",
      start: 285725,
      end: 285901,
      confidence: 0.97228,
      speaker: "A",
    },
    {
      text: "questions",
      start: 285933,
      end: 286197,
      confidence: 0.99361,
      speaker: "A",
    },
    {
      text: "you",
      start: 286221,
      end: 286357,
      confidence: 0.99562,
      speaker: "A",
    },
    {
      text: "may",
      start: 286381,
      end: 286541,
      confidence: 0.99738,
      speaker: "A",
    },
    {
      text: "have",
      start: 286573,
      end: 286765,
      confidence: 0.99941,
      speaker: "A",
    },
    {
      text: "regarding",
      start: 286805,
      end: 287213,
      confidence: 0.5617,
      speaker: "A",
    },
    {
      text: "financial",
      start: 287269,
      end: 287605,
      confidence: 0.99984,
      speaker: "A",
    },
    {
      text: "aid,",
      start: 287685,
      end: 288255,
      confidence: 0.93054,
      speaker: "A",
    },
    {
      text: "which",
      start: 288405,
      end: 288691,
      confidence: 0.80765,
      speaker: "A",
    },
    {
      text: "assistance,",
      start: 288723,
      end: 289467,
      confidence: 0.333,
      speaker: "A",
    },
    {
      text: "their",
      start: 289571,
      end: 289859,
      confidence: 0.98914,
      speaker: "A",
    },
    {
      text: "program",
      start: 289907,
      end: 290163,
      confidence: 0.99903,
      speaker: "A",
    },
    {
      text: "requirements",
      start: 290219,
      end: 290635,
      confidence: 0.99361,
      speaker: "A",
    },
    {
      text: "and",
      start: 290675,
      end: 290851,
      confidence: 0.99052,
      speaker: "A",
    },
    {
      text: "policies.",
      start: 290883,
      end: 291575,
      confidence: 0.93718,
      speaker: "A",
    },
    {
      text: "And",
      start: 293115,
      end: 293403,
      confidence: 0.71484,
      speaker: "A",
    },
    {
      text: "so",
      start: 293419,
      end: 293571,
      confidence: 0.98545,
      speaker: "A",
    },
    {
      text: "with",
      start: 293603,
      end: 293747,
      confidence: 0.99141,
      speaker: "A",
    },
    {
      text: "that,",
      start: 293771,
      end: 293907,
      confidence: 0.99911,
      speaker: "A",
    },
    {
      text: "I",
      start: 293931,
      end: 294019,
      confidence: 0.9815,
      speaker: "A",
    },
    {
      text: "would",
      start: 294027,
      end: 294123,
      confidence: 0.98126,
      speaker: "A",
    },
    {
      text: "just",
      start: 294139,
      end: 294267,
      confidence: 0.97795,
      speaker: "A",
    },
    {
      text: "like",
      start: 294291,
      end: 294403,
      confidence: 0.60742,
      speaker: "A",
    },
    {
      text: "to",
      start: 294419,
      end: 294547,
      confidence: 0.54609,
      speaker: "A",
    },
    {
      text: "thank",
      start: 294571,
      end: 294683,
      confidence: 0.99747,
      speaker: "A",
    },
    {
      text: "you",
      start: 294699,
      end: 294803,
      confidence: 0.98692,
      speaker: "A",
    },
    {
      text: "for",
      start: 294819,
      end: 294923,
      confidence: 0.99509,
      speaker: "A",
    },
    {
      text: "your",
      start: 294939,
      end: 295091,
      confidence: 0.99307,
      speaker: "A",
    },
    {
      text: "time.",
      start: 295123,
      end: 295695,
      confidence: 0.99929,
      speaker: "A",
    },
    {
      text: "Okay.",
      start: 297315,
      end: 297907,
      confidence: 0.71369,
      speaker: "C",
    },
    {
      text: "Once",
      start: 298011,
      end: 298203,
      confidence: 0.93626,
      speaker: "A",
    },
    {
      text: "again,",
      start: 298219,
      end: 298371,
      confidence: 0.99535,
      speaker: "A",
    },
    {
      text: "we",
      start: 298403,
      end: 298595,
      confidence: 0.82409,
      speaker: "A",
    },
    {
      text: "thank",
      start: 298635,
      end: 298787,
      confidence: 0.99407,
      speaker: "A",
    },
    {
      text: "you",
      start: 298811,
      end: 298947,
      confidence: 0.99858,
      speaker: "A",
    },
    {
      text: "for",
      start: 298971,
      end: 299203,
      confidence: 0.99754,
      speaker: "A",
    },
    {
      text: "choosing",
      start: 299259,
      end: 299643,
      confidence: 0.88575,
      speaker: "A",
    },
    {
      text: "education",
      start: 299699,
      end: 300107,
      confidence: 0.99882,
      speaker: "A",
    },
    {
      text: "experts.",
      start: 300211,
      end: 300971,
      confidence: 0.90007,
      speaker: "A",
    },
    {
      text: "And",
      start: 301123,
      end: 301387,
      confidence: 0.9482,
      speaker: "B",
    },
    {
      text: "thank",
      start: 301411,
      end: 301547,
      confidence: 0.95637,
      speaker: "B",
    },
    {
      text: "you.",
      start: 301571,
      end: 302135,
      confidence: 0.99831,
      speaker: "B",
    },
    {
      text: "You're",
      start: 302635,
      end: 302963,
      confidence: 0.63739,
      speaker: "C",
    },
    {
      text: "welcome.",
      start: 302979,
      end: 303251,
      confidence: 0.53102,
      speaker: "C",
    },
    {
      text: "All",
      start: 303323,
      end: 303435,
      confidence: 0.58644,
      speaker: "B",
    },
    {
      text: "right,",
      start: 303435,
      end: 304027,
      confidence: 0.95517,
      speaker: "B",
    },
    {
      text: "you",
      start: 304211,
      end: 304507,
      confidence: 0.9561,
      speaker: "B",
    },
    {
      text: "too.",
      start: 304531,
      end: 305123,
      confidence: 0.97218,
      speaker: "B",
    },
    {
      text: "Bye.",
      start: 305299,
      end: 305563,
      confidence: 0.91051,
      speaker: "C",
    },
  ],
  utterances: [
    {
      speaker: "A",
      text: "Hello. May I, please, Anthony.",
      confidence: 0.83169,
      start: 1480,
      end: 3113,
      words: [
        {
          text: "Hello.",
          start: 1480,
          end: 1736,
          confidence: 0.94271,
          speaker: "A",
        },
        {
          text: "May",
          start: 1736,
          end: 1872,
          confidence: 0.6092,
          speaker: "A",
        },
        {
          text: "I,",
          start: 1872,
          end: 1944,
          confidence: 0.81548,
          speaker: "A",
        },
        {
          text: "please,",
          start: 1944,
          end: 2400,
          confidence: 0.98523,
          speaker: "A",
        },
        {
          text: "Anthony.",
          start: 2489,
          end: 3113,
          confidence: 0.80583,
          speaker: "A",
        },
      ],
    },
    {
      speaker: "B",
      text: "Hello, this is Anthony.",
      confidence: 0.7169625,
      start: 3249,
      end: 5165,
      words: [
        {
          text: "Hello,",
          start: 3249,
          end: 4025,
          confidence: 0.3404,
          speaker: "B",
        },
        {
          text: "this",
          start: 4145,
          end: 4353,
          confidence: 0.99092,
          speaker: "B",
        },
        {
          text: "is",
          start: 4369,
          end: 4521,
          confidence: 0.9984,
          speaker: "B",
        },
        {
          text: "Anthony.",
          start: 4553,
          end: 5165,
          confidence: 0.53813,
          speaker: "B",
        },
      ],
    },
    {
      speaker: "A",
      text: "Hi, Anthony. My name is Jeff, and I'm calling on behalf of education experts from a quality monitor line, and here that you recently filled the form on the Internet indicating an interest in earning a degree.",
      confidence: 0.87008786,
      start: 5665,
      end: 18385,
      words: [
        {
          text: "Hi,",
          start: 5665,
          end: 6065,
          confidence: 0.98595,
          speaker: "A",
        },
        {
          text: "Anthony.",
          start: 6105,
          end: 6553,
          confidence: 0.94823,
          speaker: "A",
        },
        {
          text: "My",
          start: 6649,
          end: 6833,
          confidence: 0.98213,
          speaker: "A",
        },
        {
          text: "name",
          start: 6849,
          end: 6953,
          confidence: 0.99948,
          speaker: "A",
        },
        {
          text: "is",
          start: 6969,
          end: 7121,
          confidence: 0.97777,
          speaker: "A",
        },
        {
          text: "Jeff,",
          start: 7153,
          end: 7449,
          confidence: 0.47833,
          speaker: "A",
        },
        {
          text: "and",
          start: 7497,
          end: 7633,
          confidence: 0.99091,
          speaker: "A",
        },
        {
          text: "I'm",
          start: 7649,
          end: 7777,
          confidence: 0.9179,
          speaker: "A",
        },
        {
          text: "calling",
          start: 7801,
          end: 8121,
          confidence: 0.65087,
          speaker: "A",
        },
        {
          text: "on",
          start: 8153,
          end: 8345,
          confidence: 0.99949,
          speaker: "A",
        },
        {
          text: "behalf",
          start: 8385,
          end: 8745,
          confidence: 0.70579,
          speaker: "A",
        },
        {
          text: "of",
          start: 8785,
          end: 9033,
          confidence: 0.99746,
          speaker: "A",
        },
        {
          text: "education",
          start: 9089,
          end: 9593,
          confidence: 0.999,
          speaker: "A",
        },
        {
          text: "experts",
          start: 9729,
          end: 10233,
          confidence: 0.99709,
          speaker: "A",
        },
        {
          text: "from",
          start: 10289,
          end: 10457,
          confidence: 0.96935,
          speaker: "A",
        },
        {
          text: "a",
          start: 10481,
          end: 10593,
          confidence: 0.72221,
          speaker: "A",
        },
        {
          text: "quality",
          start: 10609,
          end: 10929,
          confidence: 0.98111,
          speaker: "A",
        },
        {
          text: "monitor",
          start: 10977,
          end: 11361,
          confidence: 0.56464,
          speaker: "A",
        },
        {
          text: "line,",
          start: 11433,
          end: 12001,
          confidence: 0.55117,
          speaker: "A",
        },
        {
          text: "and",
          start: 12153,
          end: 12705,
          confidence: 0.57369,
          speaker: "A",
        },
        {
          text: "here",
          start: 12825,
          end: 13225,
          confidence: 0.7455,
          speaker: "A",
        },
        {
          text: "that",
          start: 13305,
          end: 13545,
          confidence: 0.73609,
          speaker: "A",
        },
        {
          text: "you",
          start: 13585,
          end: 13737,
          confidence: 0.38197,
          speaker: "A",
        },
        {
          text: "recently",
          start: 13761,
          end: 14041,
          confidence: 0.99388,
          speaker: "A",
        },
        {
          text: "filled",
          start: 14113,
          end: 14361,
          confidence: 0.98642,
          speaker: "A",
        },
        {
          text: "the",
          start: 14393,
          end: 14585,
          confidence: 0.71432,
          speaker: "A",
        },
        {
          text: "form",
          start: 14625,
          end: 14897,
          confidence: 0.99926,
          speaker: "A",
        },
        {
          text: "on",
          start: 14961,
          end: 15137,
          confidence: 0.98243,
          speaker: "A",
        },
        {
          text: "the",
          start: 15161,
          end: 15321,
          confidence: 0.95742,
          speaker: "A",
        },
        {
          text: "Internet",
          start: 15353,
          end: 15953,
          confidence: 0.95742,
          speaker: "A",
        },
        {
          text: "indicating",
          start: 16089,
          end: 16569,
          confidence: 0.95639,
          speaker: "A",
        },
        {
          text: "an",
          start: 16617,
          end: 16777,
          confidence: 0.98959,
          speaker: "A",
        },
        {
          text: "interest",
          start: 16801,
          end: 17057,
          confidence: 0.97985,
          speaker: "A",
        },
        {
          text: "in",
          start: 17121,
          end: 17297,
          confidence: 0.9872,
          speaker: "A",
        },
        {
          text: "earning",
          start: 17321,
          end: 17505,
          confidence: 0.93147,
          speaker: "A",
        },
        {
          text: "a",
          start: 17545,
          end: 17697,
          confidence: 0.99175,
          speaker: "A",
        },
        {
          text: "degree.",
          start: 17721,
          end: 18385,
          confidence: 0.90972,
          speaker: "A",
        },
      ],
    },
    {
      speaker: "B",
      text: "Yes.",
      confidence: 0.54883,
      start: 18545,
      end: 18937,
      words: [
        {
          text: "Yes.",
          start: 18545,
          end: 18937,
          confidence: 0.54883,
          speaker: "B",
        },
      ],
    },
    {
      speaker: "C",
      text: "Correct.",
      confidence: 0.60692,
      start: 19001,
      end: 19625,
      words: [
        {
          text: "Correct.",
          start: 19001,
          end: 19625,
          confidence: 0.60692,
          speaker: "C",
        },
      ],
    },
    {
      speaker: "B",
      text: "Yes.",
      confidence: 0.5177,
      start: 19785,
      end: 20525,
      words: [
        {
          text: "Yes.",
          start: 19785,
          end: 20525,
          confidence: 0.5177,
          speaker: "B",
        },
      ],
    },
    {
      speaker: "A",
      text: "I only need a few moments of her time to mention the most appropriate schools. Are you at least 18 years of age?",
      confidence: 0.9226283,
      start: 21345,
      end: 28005,
      words: [
        {
          text: "I",
          start: 21345,
          end: 21657,
          confidence: 0.99588,
          speaker: "A",
        },
        {
          text: "only",
          start: 21681,
          end: 21841,
          confidence: 0.99849,
          speaker: "A",
        },
        {
          text: "need",
          start: 21873,
          end: 22041,
          confidence: 0.99871,
          speaker: "A",
        },
        {
          text: "a",
          start: 22073,
          end: 22169,
          confidence: 0.99837,
          speaker: "A",
        },
        {
          text: "few",
          start: 22177,
          end: 22297,
          confidence: 0.99962,
          speaker: "A",
        },
        {
          text: "moments",
          start: 22321,
          end: 22545,
          confidence: 0.94491,
          speaker: "A",
        },
        {
          text: "of",
          start: 22585,
          end: 22737,
          confidence: 0.87992,
          speaker: "A",
        },
        {
          text: "her",
          start: 22761,
          end: 22921,
          confidence: 0.52082,
          speaker: "A",
        },
        {
          text: "time",
          start: 22953,
          end: 23169,
          confidence: 0.99956,
          speaker: "A",
        },
        {
          text: "to",
          start: 23217,
          end: 23401,
          confidence: 0.97503,
          speaker: "A",
        },
        {
          text: "mention",
          start: 23433,
          end: 23897,
          confidence: 0.56777,
          speaker: "A",
        },
        {
          text: "the",
          start: 24001,
          end: 24193,
          confidence: 0.65486,
          speaker: "A",
        },
        {
          text: "most",
          start: 24209,
          end: 24409,
          confidence: 0.99193,
          speaker: "A",
        },
        {
          text: "appropriate",
          start: 24457,
          end: 24961,
          confidence: 0.79238,
          speaker: "A",
        },
        {
          text: "schools.",
          start: 25033,
          end: 25649,
          confidence: 0.98955,
          speaker: "A",
        },
        {
          text: "Are",
          start: 25777,
          end: 25993,
          confidence: 0.93193,
          speaker: "A",
        },
        {
          text: "you",
          start: 26009,
          end: 26137,
          confidence: 0.99905,
          speaker: "A",
        },
        {
          text: "at",
          start: 26161,
          end: 26297,
          confidence: 0.99614,
          speaker: "A",
        },
        {
          text: "least",
          start: 26321,
          end: 26601,
          confidence: 0.99414,
          speaker: "A",
        },
        {
          text: "18",
          start: 26673,
          end: 26929,
          confidence: 0.99484,
          speaker: "A",
        },
        {
          text: "years",
          start: 26977,
          end: 27185,
          confidence: 0.99902,
          speaker: "A",
        },
        {
          text: "of",
          start: 27225,
          end: 27401,
          confidence: 0.99787,
          speaker: "A",
        },
        {
          text: "age?",
          start: 27433,
          end: 28005,
          confidence: 0.99966,
          speaker: "A",
        },
      ],
    },
    {
      speaker: "B",
      text: "Yeah, I'm 29.",
      confidence: 0.8561533,
      start: 28505,
      end: 29806,
      words: [
        {
          text: "Yeah,",
          start: 28505,
          end: 28817,
          confidence: 0.79369,
          speaker: "B",
        },
        {
          text: "I'm",
          start: 28841,
          end: 29025,
          confidence: 0.79398,
          speaker: "B",
        },
        {
          text: "29.",
          start: 29065,
          end: 29806,
          confidence: 0.98079,
          speaker: "B",
        },
      ],
    },
    //   {
    //   "speaker": "A",
    //   "text": "29.",
    //   "confidence": 0.98079,
    //   "start": 29971,
    //   "end": 30713,
    //   "words": [
    //       {
    //           "text": "29.",
    //           "start": 29971,
    //           "end": 30713,
    //           "confidence": 0.98079,
    //           "speaker": "A"
    //       }
    //   ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Okay.",
    //       "confidence": 0.683,
    //       "start": 30769,
    //       "end": 31001,
    //       "words": [
    //           {
    //               "text": "Okay.",
    //               "start": 30769,
    //               "end": 31001,
    //               "confidence": 0.683,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "And do you currently have a high school diploma or a ged?",
    //       "confidence": 0.95236164,
    //       "start": 31033,
    //       "end": 33961,
    //       "words": [
    //           {
    //               "text": "And",
    //               "start": 31033,
    //               "end": 31153,
    //               "confidence": 0.91274,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "do",
    //               "start": 31169,
    //               "end": 31249,
    //               "confidence": 0.75724,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 31257,
    //               "end": 31401,
    //               "confidence": 0.99137,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "currently",
    //               "start": 31433,
    //               "end": 31673,
    //               "confidence": 0.99455,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "have",
    //               "start": 31729,
    //               "end": 31897,
    //               "confidence": 0.9993,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "a",
    //               "start": 31921,
    //               "end": 32033,
    //               "confidence": 0.98565,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "high",
    //               "start": 32049,
    //               "end": 32177,
    //               "confidence": 0.99843,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "school",
    //               "start": 32201,
    //               "end": 32385,
    //               "confidence": 0.99979,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "diploma",
    //               "start": 32425,
    //               "end": 32817,
    //               "confidence": 0.86589,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "or",
    //               "start": 32881,
    //               "end": 33081,
    //               "confidence": 0.99886,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "a",
    //               "start": 33113,
    //               "end": 33257,
    //               "confidence": 0.97091,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "ged?",
    //               "start": 33281,
    //               "end": 33961,
    //               "confidence": 0.95361,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Yes, I do.",
    //       "confidence": 0.99538666,
    //       "start": 34113,
    //       "end": 35085,
    //       "words": [
    //           {
    //               "text": "Yes,",
    //               "start": 34113,
    //               "end": 34377,
    //               "confidence": 0.98979,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I",
    //               "start": 34401,
    //               "end": 34513,
    //               "confidence": 0.99684,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "do.",
    //               "start": 34529,
    //               "end": 35085,
    //               "confidence": 0.99953,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Okay, thank you, Anthony. And if we can find a school for you that meets your needs, would you be interested in furthering your education in the next six months? Yeah, of course.",
    //       "confidence": 0.9546373,
    //       "start": 36105,
    //       "end": 44153,
    //       "words": [
    //           {
    //               "text": "Okay,",
    //               "start": 36105,
    //               "end": 36505,
    //               "confidence": 0.83309,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "thank",
    //               "start": 36545,
    //               "end": 36673,
    //               "confidence": 0.96607,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you,",
    //               "start": 36689,
    //               "end": 36817,
    //               "confidence": 0.99926,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Anthony.",
    //               "start": 36841,
    //               "end": 37161,
    //               "confidence": 0.59526,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "And",
    //               "start": 37233,
    //               "end": 37441,
    //               "confidence": 0.9426,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "if",
    //               "start": 37473,
    //               "end": 37593,
    //               "confidence": 0.98979,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "we",
    //               "start": 37609,
    //               "end": 37713,
    //               "confidence": 0.9977,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "can",
    //               "start": 37729,
    //               "end": 37881,
    //               "confidence": 0.97948,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "find",
    //               "start": 37913,
    //               "end": 38081,
    //               "confidence": 0.99492,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "a",
    //               "start": 38113,
    //               "end": 38233,
    //               "confidence": 0.95657,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "school",
    //               "start": 38249,
    //               "end": 38425,
    //               "confidence": 0.99911,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "for",
    //               "start": 38465,
    //               "end": 38617,
    //               "confidence": 0.99701,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 38641,
    //               "end": 38825,
    //               "confidence": 0.99925,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "that",
    //               "start": 38865,
    //               "end": 39041,
    //               "confidence": 0.99837,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "meets",
    //               "start": 39073,
    //               "end": 39297,
    //               "confidence": 0.97106,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 39321,
    //               "end": 39481,
    //               "confidence": 0.99708,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "needs,",
    //               "start": 39513,
    //               "end": 39993,
    //               "confidence": 0.99937,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "would",
    //               "start": 40129,
    //               "end": 40353,
    //               "confidence": 0.99805,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 40369,
    //               "end": 40497,
    //               "confidence": 0.99737,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "be",
    //               "start": 40521,
    //               "end": 40657,
    //               "confidence": 0.99851,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "interested",
    //               "start": 40681,
    //               "end": 41001,
    //               "confidence": 0.99824,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "in",
    //               "start": 41033,
    //               "end": 41201,
    //               "confidence": 0.99511,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "furthering",
    //               "start": 41233,
    //               "end": 41577,
    //               "confidence": 0.99051,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 41601,
    //               "end": 41857,
    //               "confidence": 0.9982,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "education",
    //               "start": 41921,
    //               "end": 42337,
    //               "confidence": 0.99982,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "in",
    //               "start": 42441,
    //               "end": 42633,
    //               "confidence": 0.94739,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 42649,
    //               "end": 42753,
    //               "confidence": 0.99584,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "next",
    //               "start": 42769,
    //               "end": 42897,
    //               "confidence": 0.99827,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "six",
    //               "start": 42921,
    //               "end": 43057,
    //               "confidence": 0.98349,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "months?",
    //               "start": 43081,
    //               "end": 43241,
    //               "confidence": 0.82258,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Yeah,",
    //               "start": 43273,
    //               "end": 43417,
    //               "confidence": 0.57062,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "of",
    //               "start": 43441,
    //               "end": 43553,
    //               "confidence": 0.99322,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "course.",
    //               "start": 43569,
    //               "end": 44153,
    //               "confidence": 0.99982,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "The course I'd like to take up would be computer engineering.",
    //       "confidence": 0.9507836,
    //       "start": 44329,
    //       "end": 47205,
    //       "words": [
    //           {
    //               "text": "The",
    //               "start": 44329,
    //               "end": 44617,
    //               "confidence": 0.99793,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "course",
    //               "start": 44641,
    //               "end": 44801,
    //               "confidence": 0.99962,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I'd",
    //               "start": 44833,
    //               "end": 45033,
    //               "confidence": 0.92853,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "like",
    //               "start": 45049,
    //               "end": 45153,
    //               "confidence": 0.99828,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "to",
    //               "start": 45169,
    //               "end": 45297,
    //               "confidence": 0.99616,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "take",
    //               "start": 45321,
    //               "end": 45457,
    //               "confidence": 0.99573,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "up",
    //               "start": 45481,
    //               "end": 45641,
    //               "confidence": 0.99607,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "would",
    //               "start": 45673,
    //               "end": 45793,
    //               "confidence": 0.97306,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "be",
    //               "start": 45809,
    //               "end": 45985,
    //               "confidence": 0.99686,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "computer",
    //               "start": 46025,
    //               "end": 46449,
    //               "confidence": 0.998,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "engineering.",
    //               "start": 46497,
    //               "end": 47205,
    //               "confidence": 0.57838,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Computer engineering.",
    //       "confidence": 0.630735,
    //       "start": 47705,
    //       "end": 48697,
    //       "words": [
    //           {
    //               "text": "Computer",
    //               "start": 47705,
    //               "end": 48265,
    //               "confidence": 0.44083,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "engineering.",
    //               "start": 48305,
    //               "end": 48697,
    //               "confidence": 0.82064,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "C",
    //       "text": "Okay.",
    //       "confidence": 0.79953,
    //       "start": 48761,
    //       "end": 49405,
    //       "words": [
    //           {
    //               "text": "Okay.",
    //               "start": 48761,
    //               "end": 49405,
    //               "confidence": 0.79953,
    //               "speaker": "C"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "And, Anthony, I only need a few moments of your time, okay, to verify your information. Your first name is Anthony, and your last name is Bella. Is this correct?",
    //       "confidence": 0.902466,
    //       "start": 50745,
    //       "end": 63005,
    //       "words": [
    //           {
    //               "text": "And,",
    //               "start": 50745,
    //               "end": 51129,
    //               "confidence": 0.88476,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Anthony,",
    //               "start": 51177,
    //               "end": 51845,
    //               "confidence": 0.85578,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "I",
    //               "start": 53765,
    //               "end": 54077,
    //               "confidence": 0.95493,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "only",
    //               "start": 54101,
    //               "end": 54261,
    //               "confidence": 0.98935,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "need",
    //               "start": 54293,
    //               "end": 54461,
    //               "confidence": 0.78539,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "a",
    //               "start": 54493,
    //               "end": 54613,
    //               "confidence": 0.94191,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "few",
    //               "start": 54629,
    //               "end": 54757,
    //               "confidence": 0.99921,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "moments",
    //               "start": 54781,
    //               "end": 55029,
    //               "confidence": 0.9395,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "of",
    //               "start": 55077,
    //               "end": 55237,
    //               "confidence": 0.95686,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 55261,
    //               "end": 55469,
    //               "confidence": 0.96817,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "time,",
    //               "start": 55517,
    //               "end": 56085,
    //               "confidence": 0.99949,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "okay,",
    //               "start": 56245,
    //               "end": 56985,
    //               "confidence": 0.75209,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "to",
    //               "start": 57765,
    //               "end": 58077,
    //               "confidence": 0.9941,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "verify",
    //               "start": 58101,
    //               "end": 58485,
    //               "confidence": 0.99141,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 58525,
    //               "end": 58797,
    //               "confidence": 0.99501,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "information.",
    //               "start": 58861,
    //               "end": 59277,
    //               "confidence": 0.97934,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Your",
    //               "start": 59381,
    //               "end": 59597,
    //               "confidence": 0.99356,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "first",
    //               "start": 59621,
    //               "end": 59829,
    //               "confidence": 0.99882,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "name",
    //               "start": 59877,
    //               "end": 60037,
    //               "confidence": 0.99846,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "is",
    //               "start": 60061,
    //               "end": 60221,
    //               "confidence": 0.83584,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Anthony,",
    //               "start": 60253,
    //               "end": 60645,
    //               "confidence": 0.45829,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "and",
    //               "start": 60725,
    //               "end": 60941,
    //               "confidence": 0.99022,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 60973,
    //               "end": 61141,
    //               "confidence": 0.99364,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "last",
    //               "start": 61173,
    //               "end": 61317,
    //               "confidence": 0.98435,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "name",
    //               "start": 61341,
    //               "end": 61429,
    //               "confidence": 0.99698,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "is",
    //               "start": 61437,
    //               "end": 61581,
    //               "confidence": 0.97526,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Bella.",
    //               "start": 61613,
    //               "end": 61997,
    //               "confidence": 0.52832,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Is",
    //               "start": 62021,
    //               "end": 62133,
    //               "confidence": 0.92451,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "this",
    //               "start": 62149,
    //               "end": 62373,
    //               "confidence": 0.78952,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "correct?",
    //               "start": 62429,
    //               "end": 63005,
    //               "confidence": 0.61891,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Yes.",
    //       "confidence": 0.99423,
    //       "start": 63165,
    //       "end": 63905,
    //       "words": [
    //           {
    //               "text": "Yes.",
    //               "start": 63165,
    //               "end": 63905,
    //               "confidence": 0.99423,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Okay, Anthony, now, if I may ask, if we can find school for you that meets your needs, would you be interested in furthering your education? Yeah, in the next six months?",
    //       "confidence": 0.90996534,
    //       "start": 64765,
    //       "end": 73185,
    //       "words": [
    //           {
    //               "text": "Okay,",
    //               "start": 64765,
    //               "end": 65461,
    //               "confidence": 0.80903,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Anthony,",
    //               "start": 65573,
    //               "end": 66101,
    //               "confidence": 0.56512,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "now,",
    //               "start": 66213,
    //               "end": 66437,
    //               "confidence": 0.90403,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "if",
    //               "start": 66461,
    //               "end": 66573,
    //               "confidence": 0.99697,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "I",
    //               "start": 66589,
    //               "end": 66693,
    //               "confidence": 0.9876,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "may",
    //               "start": 66709,
    //               "end": 66861,
    //               "confidence": 0.99089,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "ask,",
    //               "start": 66893,
    //               "end": 67133,
    //               "confidence": 0.99026,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "if",
    //               "start": 67189,
    //               "end": 67309,
    //               "confidence": 0.98687,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "we",
    //               "start": 67317,
    //               "end": 67413,
    //               "confidence": 0.99818,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "can",
    //               "start": 67429,
    //               "end": 67533,
    //               "confidence": 0.998,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "find",
    //               "start": 67549,
    //               "end": 67773,
    //               "confidence": 0.6915,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "school",
    //               "start": 67829,
    //               "end": 68021,
    //               "confidence": 0.99118,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "for",
    //               "start": 68053,
    //               "end": 68149,
    //               "confidence": 0.99581,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 68157,
    //               "end": 68301,
    //               "confidence": 0.99587,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "that",
    //               "start": 68333,
    //               "end": 68477,
    //               "confidence": 0.99753,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "meets",
    //               "start": 68501,
    //               "end": 68693,
    //               "confidence": 0.60313,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 68709,
    //               "end": 68837,
    //               "confidence": 0.981,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "needs,",
    //               "start": 68861,
    //               "end": 69117,
    //               "confidence": 0.99734,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "would",
    //               "start": 69181,
    //               "end": 69309,
    //               "confidence": 0.99724,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 69317,
    //               "end": 69437,
    //               "confidence": 0.99737,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "be",
    //               "start": 69461,
    //               "end": 69573,
    //               "confidence": 0.99653,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "interested",
    //               "start": 69589,
    //               "end": 69837,
    //               "confidence": 0.99919,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "in",
    //               "start": 69861,
    //               "end": 69997,
    //               "confidence": 0.98841,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "furthering",
    //               "start": 70021,
    //               "end": 70421,
    //               "confidence": 0.94835,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 70453,
    //               "end": 70645,
    //               "confidence": 0.9774,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "education?",
    //               "start": 70685,
    //               "end": 71265,
    //               "confidence": 0.99981,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Yeah,",
    //               "start": 71685,
    //               "end": 72021,
    //               "confidence": 0.22669,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "in",
    //               "start": 72053,
    //               "end": 72173,
    //               "confidence": 0.84621,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 72189,
    //               "end": 72293,
    //               "confidence": 0.90172,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "next",
    //               "start": 72309,
    //               "end": 72461,
    //               "confidence": 0.99851,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "six",
    //               "start": 72493,
    //               "end": 72613,
    //               "confidence": 0.97442,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "months?",
    //               "start": 72629,
    //               "end": 73185,
    //               "confidence": 0.78673,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Definitely.",
    //       "confidence": 0.48801,
    //       "start": 73485,
    //       "end": 74205,
    //       "words": [
    //           {
    //               "text": "Definitely.",
    //               "start": 73485,
    //               "end": 74205,
    //               "confidence": 0.48801,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Thank you, Anthony. Okay, could you please verify your complete address, including the city, state, and the zip code?",
    //       "confidence": 0.87440366,
    //       "start": 74325,
    //       "end": 81815,
    //       "words": [
    //           {
    //               "text": "Thank",
    //               "start": 74325,
    //               "end": 74533,
    //               "confidence": 0.94508,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you,",
    //               "start": 74549,
    //               "end": 74677,
    //               "confidence": 0.99923,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Anthony.",
    //               "start": 74701,
    //               "end": 75345,
    //               "confidence": 0.69424,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Okay,",
    //               "start": 75725,
    //               "end": 76525,
    //               "confidence": 0.65071,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "could",
    //               "start": 76685,
    //               "end": 76933,
    //               "confidence": 0.99445,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 76949,
    //               "end": 77053,
    //               "confidence": 0.99733,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "please",
    //               "start": 77069,
    //               "end": 77221,
    //               "confidence": 0.99617,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "verify",
    //               "start": 77253,
    //               "end": 77685,
    //               "confidence": 0.57569,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 77725,
    //               "end": 77901,
    //               "confidence": 0.89864,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "complete",
    //               "start": 77933,
    //               "end": 78459,
    //               "confidence": 0.64761,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "address,",
    //               "start": 78557,
    //               "end": 79055,
    //               "confidence": 0.87938,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "including",
    //               "start": 79175,
    //               "end": 79503,
    //               "confidence": 0.98502,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 79559,
    //               "end": 79751,
    //               "confidence": 0.99358,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "city,",
    //               "start": 79783,
    //               "end": 80239,
    //               "confidence": 0.99936,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "state,",
    //               "start": 80367,
    //               "end": 80679,
    //               "confidence": 0.99635,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "and",
    //               "start": 80727,
    //               "end": 80863,
    //               "confidence": 0.99895,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 80879,
    //               "end": 80983,
    //               "confidence": 0.96519,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "zip",
    //               "start": 80999,
    //               "end": 81167,
    //               "confidence": 0.75272,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "code?",
    //               "start": 81191,
    //               "end": 81815,
    //               "confidence": 0.64397,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "All right, it's 1905 Bramblewood Drive, St. Cloud, Florida, 34769.",
    //       "confidence": 0.797411,
    //       "start": 81935,
    //       "end": 94315,
    //       "words": [
    //           {
    //               "text": "All",
    //               "start": 81935,
    //               "end": 82095,
    //               "confidence": 0.86448,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "right,",
    //               "start": 82095,
    //               "end": 82255,
    //               "confidence": 0.56205,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "it's",
    //               "start": 82295,
    //               "end": 82583,
    //               "confidence": 0.99176,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "1905",
    //               "start": 82639,
    //               "end": 84703,
    //               "confidence": 0.93079,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "Bramblewood",
    //               "start": 84879,
    //               "end": 86115,
    //               "confidence": 0.63945,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "Drive,",
    //               "start": 87095,
    //               "end": 87995,
    //               "confidence": 0.98298,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "St.",
    //               "start": 88535,
    //               "end": 88919,
    //               "confidence": 0.81667,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "Cloud,",
    //               "start": 88967,
    //               "end": 89635,
    //               "confidence": 0.31405,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "Florida,",
    //               "start": 89975,
    //               "end": 90995,
    //               "confidence": 0.97722,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "34769.",
    //               "start": 91455,
    //               "end": 94315,
    //               "confidence": 0.89466,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Okay. Is the street number 1905?",
    //       "confidence": 0.9382383,
    //       "start": 96495,
    //       "end": 99911,
    //       "words": [
    //           {
    //               "text": "Okay.",
    //               "start": 96495,
    //               "end": 97015,
    //               "confidence": 0.96723,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Is",
    //               "start": 97095,
    //               "end": 97287,
    //               "confidence": 0.82923,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 97311,
    //               "end": 97447,
    //               "confidence": 0.99647,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "street",
    //               "start": 97471,
    //               "end": 97703,
    //               "confidence": 0.99168,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "number",
    //               "start": 97759,
    //               "end": 98119,
    //               "confidence": 0.99586,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "1905?",
    //               "start": 98207,
    //               "end": 99911,
    //               "confidence": 0.84896,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Yeah, 1905.",
    //       "confidence": 0.98542,
    //       "start": 100103,
    //       "end": 102315,
    //       "words": [
    //           {
    //               "text": "Yeah,",
    //               "start": 100103,
    //               "end": 100567,
    //               "confidence": 0.98803,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "1905.",
    //               "start": 100631,
    //               "end": 102315,
    //               "confidence": 0.98281,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "And the street name is Bramblewood.",
    //       "confidence": 0.691855,
    //       "start": 102775,
    //       "end": 104841,
    //       "words": [
    //           {
    //               "text": "And",
    //               "start": 102775,
    //               "end": 103087,
    //               "confidence": 0.99815,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 103111,
    //               "end": 103199,
    //               "confidence": 0.97988,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "street",
    //               "start": 103207,
    //               "end": 103399,
    //               "confidence": 0.57706,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "name",
    //               "start": 103447,
    //               "end": 103655,
    //               "confidence": 0.55849,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "is",
    //               "start": 103695,
    //               "end": 103925,
    //               "confidence": 0.78683,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Bramblewood.",
    //               "start": 103975,
    //               "end": 104841,
    //               "confidence": 0.25072,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Right.",
    //       "confidence": 0.3317,
    //       "start": 104953,
    //       "end": 105441,
    //       "words": [
    //           {
    //               "text": "Right.",
    //               "start": 104953,
    //               "end": 105441,
    //               "confidence": 0.3317,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Is that correct?",
    //       "confidence": 0.92114,
    //       "start": 105553,
    //       "end": 106497,
    //       "words": [
    //           {
    //               "text": "Is",
    //               "start": 105553,
    //               "end": 105753,
    //               "confidence": 0.954,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "that",
    //               "start": 105769,
    //               "end": 105945,
    //               "confidence": 0.88056,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "correct?",
    //               "start": 105985,
    //               "end": 106497,
    //               "confidence": 0.92886,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "That's correct.",
    //       "confidence": 0.997345,
    //       "start": 106641,
    //       "end": 107249,
    //       "words": [
    //           {
    //               "text": "That's",
    //               "start": 106641,
    //               "end": 107001,
    //               "confidence": 0.99508,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "correct.",
    //               "start": 107033,
    //               "end": 107249,
    //               "confidence": 0.99961,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "C",
    //       "text": "Okay.",
    //       "confidence": 0.8384,
    //       "start": 107297,
    //       "end": 107761,
    //       "words": [
    //           {
    //               "text": "Okay.",
    //               "start": 107297,
    //               "end": 107761,
    //               "confidence": 0.8384,
    //               "speaker": "C"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Okay, so it's 1905 Bramblewood Drive, St. Cloud, Florida, 34769. Yes.",
    //       "confidence": 0.79634815,
    //       "start": 107873,
    //       "end": 115825,
    //       "words": [
    //           {
    //               "text": "Okay,",
    //               "start": 107873,
    //               "end": 108177,
    //               "confidence": 0.81026,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "so",
    //               "start": 108201,
    //               "end": 108337,
    //               "confidence": 0.99691,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "it's",
    //               "start": 108361,
    //               "end": 108569,
    //               "confidence": 0.82292,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "1905",
    //               "start": 108617,
    //               "end": 110085,
    //               "confidence": 0.9836,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Bramblewood",
    //               "start": 110625,
    //               "end": 111473,
    //               "confidence": 0.35274,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Drive,",
    //               "start": 111529,
    //               "end": 112137,
    //               "confidence": 0.75148,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "St.",
    //               "start": 112281,
    //               "end": 112609,
    //               "confidence": 0.94194,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Cloud,",
    //               "start": 112657,
    //               "end": 113001,
    //               "confidence": 0.93762,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Florida,",
    //               "start": 113073,
    //               "end": 113633,
    //               "confidence": 0.90447,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "34769.",
    //               "start": 113689,
    //               "end": 115305,
    //               "confidence": 0.97033,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Yes.",
    //               "start": 115465,
    //               "end": 115825,
    //               "confidence": 0.28756,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "C",
    //       "text": "Correct.",
    //       "confidence": 0.49659,
    //       "start": 115865,
    //       "end": 116417,
    //       "words": [
    //           {
    //               "text": "Correct.",
    //               "start": 115865,
    //               "end": 116417,
    //               "confidence": 0.49659,
    //               "speaker": "C"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Yep.",
    //       "confidence": 0.50216,
    //       "start": 116561,
    //       "end": 117065,
    //       "words": [
    //           {
    //               "text": "Yep.",
    //               "start": 116561,
    //               "end": 117065,
    //               "confidence": 0.50216,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Okay, and could you please verify your email address?",
    //       "confidence": 0.9480778,
    //       "start": 117145,
    //       "end": 120325,
    //       "words": [
    //           {
    //               "text": "Okay,",
    //               "start": 117145,
    //               "end": 117729,
    //               "confidence": 0.89829,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "and",
    //               "start": 117857,
    //               "end": 118097,
    //               "confidence": 0.98787,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "could",
    //               "start": 118121,
    //               "end": 118233,
    //               "confidence": 0.99031,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 118249,
    //               "end": 118377,
    //               "confidence": 0.99812,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "please",
    //               "start": 118401,
    //               "end": 118561,
    //               "confidence": 0.99784,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "verify",
    //               "start": 118593,
    //               "end": 119025,
    //               "confidence": 0.66267,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 119065,
    //               "end": 119337,
    //               "confidence": 0.99971,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "email",
    //               "start": 119401,
    //               "end": 119673,
    //               "confidence": 0.99799,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "address?",
    //               "start": 119729,
    //               "end": 120325,
    //               "confidence": 0.9999,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "It's pella anthony@yahoo.com.",
    //       "confidence": 0.7337767,
    //       "start": 120625,
    //       "end": 124725,
    //       "words": [
    //           {
    //               "text": "It's",
    //               "start": 120625,
    //               "end": 121169,
    //               "confidence": 0.96839,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "pella",
    //               "start": 121257,
    //               "end": 122049,
    //               "confidence": 0.50599,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "anthony@yahoo.com.",
    //               "start": 122177,
    //               "end": 124725,
    //               "confidence": 0.72695,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Thank you so much for the verification.",
    //       "confidence": 0.7977,
    //       "start": 127145,
    //       "end": 128937,
    //       "words": [
    //           {
    //               "text": "Thank",
    //               "start": 127145,
    //               "end": 127409,
    //               "confidence": 0.68742,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 127417,
    //               "end": 127465,
    //               "confidence": 0.80333,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "so",
    //               "start": 127465,
    //               "end": 127529,
    //               "confidence": 0.75208,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "much",
    //               "start": 127537,
    //               "end": 127633,
    //               "confidence": 0.99136,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "for",
    //               "start": 127649,
    //               "end": 127753,
    //               "confidence": 0.76598,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 127769,
    //               "end": 127897,
    //               "confidence": 0.9759,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "verification.",
    //               "start": 127921,
    //               "end": 128937,
    //               "confidence": 0.60783,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Yeah.",
    //       "confidence": 0.43522,
    //       "start": 129121,
    //       "end": 129847,
    //       "words": [
    //           {
    //               "text": "Yeah.",
    //               "start": 129121,
    //               "end": 129847,
    //               "confidence": 0.43522,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Now, you mentioned computer engineering, right?",
    //       "confidence": 0.91376835,
    //       "start": 130001,
    //       "end": 133107,
    //       "words": [
    //           {
    //               "text": "Now,",
    //               "start": 130001,
    //               "end": 130695,
    //               "confidence": 0.97861,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 131035,
    //               "end": 131371,
    //               "confidence": 0.99445,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "mentioned",
    //               "start": 131403,
    //               "end": 131667,
    //               "confidence": 0.98597,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "computer",
    //               "start": 131691,
    //               "end": 132059,
    //               "confidence": 0.99829,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "engineering,",
    //               "start": 132107,
    //               "end": 132595,
    //               "confidence": 0.53137,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "right?",
    //               "start": 132675,
    //               "end": 133107,
    //               "confidence": 0.99392,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Mm.",
    //       "confidence": 0.31667,
    //       "start": 133211,
    //       "end": 133895,
    //       "words": [
    //           {
    //               "text": "Mm.",
    //               "start": 133211,
    //               "end": 133895,
    //               "confidence": 0.31667,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "May I ask, what degree type were you looking to obtain?",
    //       "confidence": 0.97518635,
    //       "start": 134835,
    //       "end": 137611,
    //       "words": [
    //           {
    //               "text": "May",
    //               "start": 134835,
    //               "end": 135147,
    //               "confidence": 0.91497,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "I",
    //               "start": 135171,
    //               "end": 135331,
    //               "confidence": 0.99599,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "ask,",
    //               "start": 135363,
    //               "end": 135675,
    //               "confidence": 0.98907,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "what",
    //               "start": 135755,
    //               "end": 135971,
    //               "confidence": 0.99857,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "degree",
    //               "start": 136003,
    //               "end": 136299,
    //               "confidence": 0.95628,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "type",
    //               "start": 136347,
    //               "end": 136611,
    //               "confidence": 0.99581,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "were",
    //               "start": 136643,
    //               "end": 136763,
    //               "confidence": 0.8947,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 136779,
    //               "end": 136931,
    //               "confidence": 0.99418,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "looking",
    //               "start": 136963,
    //               "end": 137131,
    //               "confidence": 0.9992,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "to",
    //               "start": 137163,
    //               "end": 137307,
    //               "confidence": 0.9967,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "obtain?",
    //               "start": 137331,
    //               "end": 137611,
    //               "confidence": 0.99158,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Is it associate or whatever I need to do? If I get in the first door, I do associate. Probably move my way up the ladder, you know? Okay, so get my first one and then keep on going.",
    //       "confidence": 0.91762155,
    //       "start": 137683,
    //       "end": 149771,
    //       "words": [
    //           {
    //               "text": "Is",
    //               "start": 137683,
    //               "end": 137843,
    //               "confidence": 0.75539,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "it",
    //               "start": 137859,
    //               "end": 138083,
    //               "confidence": 0.9222,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "associate",
    //               "start": 138139,
    //               "end": 139055,
    //               "confidence": 0.75276,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "or",
    //               "start": 139635,
    //               "end": 140211,
    //               "confidence": 0.7876,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "whatever",
    //               "start": 140323,
    //               "end": 140699,
    //               "confidence": 0.99778,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I",
    //               "start": 140747,
    //               "end": 140907,
    //               "confidence": 0.99654,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "need",
    //               "start": 140931,
    //               "end": 141091,
    //               "confidence": 0.99762,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "to",
    //               "start": 141123,
    //               "end": 141243,
    //               "confidence": 0.99778,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "do?",
    //               "start": 141259,
    //               "end": 141819,
    //               "confidence": 0.99645,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "If",
    //               "start": 141987,
    //               "end": 142243,
    //               "confidence": 0.99301,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I",
    //               "start": 142259,
    //               "end": 142435,
    //               "confidence": 0.99651,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "get",
    //               "start": 142475,
    //               "end": 142627,
    //               "confidence": 0.99885,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "in",
    //               "start": 142651,
    //               "end": 142811,
    //               "confidence": 0.95964,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "the",
    //               "start": 142843,
    //               "end": 142963,
    //               "confidence": 0.99747,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "first",
    //               "start": 142979,
    //               "end": 143155,
    //               "confidence": 0.99822,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "door,",
    //               "start": 143195,
    //               "end": 143347,
    //               "confidence": 0.46595,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I",
    //               "start": 143371,
    //               "end": 143483,
    //               "confidence": 0.97018,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "do",
    //               "start": 143499,
    //               "end": 143651,
    //               "confidence": 0.98214,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "associate.",
    //               "start": 143683,
    //               "end": 144219,
    //               "confidence": 0.52262,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "Probably",
    //               "start": 144307,
    //               "end": 144627,
    //               "confidence": 0.7894,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "move",
    //               "start": 144691,
    //               "end": 144915,
    //               "confidence": 0.95686,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "my",
    //               "start": 144955,
    //               "end": 145131,
    //               "confidence": 0.99935,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "way",
    //               "start": 145163,
    //               "end": 145283,
    //               "confidence": 0.99791,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "up",
    //               "start": 145299,
    //               "end": 145403,
    //               "confidence": 0.99131,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "the",
    //               "start": 145419,
    //               "end": 145547,
    //               "confidence": 0.97349,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "ladder,",
    //               "start": 145571,
    //               "end": 146011,
    //               "confidence": 0.84446,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "you",
    //               "start": 146083,
    //               "end": 146219,
    //               "confidence": 0.88974,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "know?",
    //               "start": 146227,
    //               "end": 146707,
    //               "confidence": 0.79785,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "Okay,",
    //               "start": 146851,
    //               "end": 147331,
    //               "confidence": 0.71177,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "so",
    //               "start": 147403,
    //               "end": 147659,
    //               "confidence": 0.85712,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "get",
    //               "start": 147707,
    //               "end": 147843,
    //               "confidence": 0.93967,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "my",
    //               "start": 147859,
    //               "end": 148011,
    //               "confidence": 0.99717,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "first",
    //               "start": 148043,
    //               "end": 148211,
    //               "confidence": 0.99974,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "one",
    //               "start": 148243,
    //               "end": 148387,
    //               "confidence": 0.99346,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "and",
    //               "start": 148411,
    //               "end": 148499,
    //               "confidence": 0.99328,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "then",
    //               "start": 148507,
    //               "end": 148675,
    //               "confidence": 0.96917,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "keep",
    //               "start": 148715,
    //               "end": 148867,
    //               "confidence": 0.99984,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "on",
    //               "start": 148891,
    //               "end": 149075,
    //               "confidence": 0.99755,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "going.",
    //               "start": 149115,
    //               "end": 149771,
    //               "confidence": 0.99939,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Okay, so would be associate degree for the moment?",
    //       "confidence": 0.84515554,
    //       "start": 149963,
    //       "end": 155807,
    //       "words": [
    //           {
    //               "text": "Okay,",
    //               "start": 149963,
    //               "end": 150775,
    //               "confidence": 0.77338,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "so",
    //               "start": 151315,
    //               "end": 152055,
    //               "confidence": 0.98546,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "would",
    //               "start": 152475,
    //               "end": 152787,
    //               "confidence": 0.40246,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "be",
    //               "start": 152811,
    //               "end": 152947,
    //               "confidence": 0.88741,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "associate",
    //               "start": 152971,
    //               "end": 153683,
    //               "confidence": 0.72731,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "degree",
    //               "start": 153819,
    //               "end": 154603,
    //               "confidence": 0.84452,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "for",
    //               "start": 154779,
    //               "end": 155043,
    //               "confidence": 0.99192,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 155059,
    //               "end": 155187,
    //               "confidence": 0.99594,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "moment?",
    //               "start": 155211,
    //               "end": 155807,
    //               "confidence": 0.998,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Yep.",
    //       "confidence": 0.38801,
    //       "start": 155971,
    //       "end": 156755,
    //       "words": [
    //           {
    //               "text": "Yep.",
    //               "start": 155971,
    //               "end": 156755,
    //               "confidence": 0.38801,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "C",
    //       "text": "Okay.",
    //       "confidence": 0.43559,
    //       "start": 159255,
    //       "end": 159687,
    //       "words": [
    //           {
    //               "text": "Okay.",
    //               "start": 159255,
    //               "end": 159687,
    //               "confidence": 0.43559,
    //               "speaker": "C"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Anthony, you've mentioned that you're 21. I'm sorry, 29 years old now, if I may ask. Well, what's the highest level of education?",
    //       "confidence": 0.94288653,
    //       "start": 159711,
    //       "end": 169395,
    //       "words": [
    //           {
    //               "text": "Anthony,",
    //               "start": 159711,
    //               "end": 159951,
    //               "confidence": 0.99309,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you've",
    //               "start": 159983,
    //               "end": 160143,
    //               "confidence": 0.73018,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "mentioned",
    //               "start": 160159,
    //               "end": 160383,
    //               "confidence": 0.76697,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "that",
    //               "start": 160399,
    //               "end": 160503,
    //               "confidence": 0.96336,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you're",
    //               "start": 160519,
    //               "end": 160735,
    //               "confidence": 0.92643,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "21.",
    //               "start": 160775,
    //               "end": 161439,
    //               "confidence": 0.9629,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "I'm",
    //               "start": 161567,
    //               "end": 161783,
    //               "confidence": 0.96525,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "sorry,",
    //               "start": 161799,
    //               "end": 162063,
    //               "confidence": 0.97792,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "29",
    //               "start": 162119,
    //               "end": 162599,
    //               "confidence": 0.99726,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "years",
    //               "start": 162647,
    //               "end": 162903,
    //               "confidence": 0.99433,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "old",
    //               "start": 162959,
    //               "end": 163559,
    //               "confidence": 0.99947,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "now,",
    //               "start": 163727,
    //               "end": 164055,
    //               "confidence": 0.95362,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "if",
    //               "start": 164095,
    //               "end": 164223,
    //               "confidence": 0.99872,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "I",
    //               "start": 164239,
    //               "end": 164367,
    //               "confidence": 0.99784,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "may",
    //               "start": 164391,
    //               "end": 164695,
    //               "confidence": 0.99376,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "ask.",
    //               "start": 164775,
    //               "end": 165395,
    //               "confidence": 0.99368,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Well,",
    //               "start": 167215,
    //               "end": 167527,
    //               "confidence": 0.48665,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "what's",
    //               "start": 167551,
    //               "end": 167743,
    //               "confidence": 0.99299,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 167759,
    //               "end": 167887,
    //               "confidence": 0.99931,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "highest",
    //               "start": 167911,
    //               "end": 168175,
    //               "confidence": 0.99684,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "level",
    //               "start": 168215,
    //               "end": 168415,
    //               "confidence": 0.99908,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "of",
    //               "start": 168455,
    //               "end": 168727,
    //               "confidence": 0.99788,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "education?",
    //               "start": 168791,
    //               "end": 169395,
    //               "confidence": 0.99886,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "I dropped out when I was in the 11th grade, and I started doing plumbing. I've actually been doing plumbing for 13 years. I'm a registered apprentice. I actually only have to take the test to become a journeyman's. A journeyman to open my own company. And I'm not too fond of plumbing, you know, saying I need something, I want to do something else besides plumbing. For the rest of my life.",
    //       "confidence": 0.9000793,
    //       "start": 170215,
    //       "end": 190725,
    //       "words": [
    //           {
    //               "text": "I",
    //               "start": 170215,
    //               "end": 170623,
    //               "confidence": 0.99302,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "dropped",
    //               "start": 170679,
    //               "end": 171031,
    //               "confidence": 0.98925,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "out",
    //               "start": 171063,
    //               "end": 171303,
    //               "confidence": 0.99872,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "when",
    //               "start": 171359,
    //               "end": 171719,
    //               "confidence": 0.9956,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I",
    //               "start": 171807,
    //               "end": 172031,
    //               "confidence": 0.99755,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "was",
    //               "start": 172063,
    //               "end": 172255,
    //               "confidence": 0.99914,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "in",
    //               "start": 172295,
    //               "end": 172423,
    //               "confidence": 0.99783,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "the",
    //               "start": 172439,
    //               "end": 172615,
    //               "confidence": 0.99009,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "11th",
    //               "start": 172655,
    //               "end": 173039,
    //               "confidence": 0.99612,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "grade,",
    //               "start": 173087,
    //               "end": 173559,
    //               "confidence": 0.94633,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "and",
    //               "start": 173687,
    //               "end": 173927,
    //               "confidence": 0.99748,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I",
    //               "start": 173951,
    //               "end": 174111,
    //               "confidence": 0.99581,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "started",
    //               "start": 174143,
    //               "end": 174335,
    //               "confidence": 0.99941,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "doing",
    //               "start": 174375,
    //               "end": 174551,
    //               "confidence": 0.99734,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "plumbing.",
    //               "start": 174583,
    //               "end": 174959,
    //               "confidence": 0.90705,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I've",
    //               "start": 175007,
    //               "end": 175247,
    //               "confidence": 0.99191,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "actually",
    //               "start": 175271,
    //               "end": 175479,
    //               "confidence": 0.99885,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "been",
    //               "start": 175527,
    //               "end": 175663,
    //               "confidence": 0.99934,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "doing",
    //               "start": 175679,
    //               "end": 175831,
    //               "confidence": 0.99718,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "plumbing",
    //               "start": 175863,
    //               "end": 176151,
    //               "confidence": 0.89203,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "for",
    //               "start": 176183,
    //               "end": 176351,
    //               "confidence": 0.99845,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "13",
    //               "start": 176383,
    //               "end": 176695,
    //               "confidence": 0.99888,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "years.",
    //               "start": 176775,
    //               "end": 177279,
    //               "confidence": 0.99906,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I'm",
    //               "start": 177407,
    //               "end": 177647,
    //               "confidence": 0.96725,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "a",
    //               "start": 177671,
    //               "end": 177783,
    //               "confidence": 0.99403,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "registered",
    //               "start": 177799,
    //               "end": 178191,
    //               "confidence": 0.52987,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "apprentice.",
    //               "start": 178223,
    //               "end": 178599,
    //               "confidence": 0.60882,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I",
    //               "start": 178647,
    //               "end": 178807,
    //               "confidence": 0.62823,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "actually",
    //               "start": 178831,
    //               "end": 179015,
    //               "confidence": 0.99128,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "only",
    //               "start": 179055,
    //               "end": 179207,
    //               "confidence": 0.87328,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "have",
    //               "start": 179231,
    //               "end": 179319,
    //               "confidence": 0.96855,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "to",
    //               "start": 179327,
    //               "end": 179399,
    //               "confidence": 0.99799,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "take",
    //               "start": 179407,
    //               "end": 179551,
    //               "confidence": 0.99884,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "the",
    //               "start": 179583,
    //               "end": 179703,
    //               "confidence": 0.99739,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "test",
    //               "start": 179719,
    //               "end": 179871,
    //               "confidence": 0.99829,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "to",
    //               "start": 179903,
    //               "end": 180023,
    //               "confidence": 0.92445,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "become",
    //               "start": 180039,
    //               "end": 180215,
    //               "confidence": 0.98656,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "a",
    //               "start": 180255,
    //               "end": 180835,
    //               "confidence": 0.58017,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "journeyman's.",
    //               "start": 181785,
    //               "end": 182617,
    //               "confidence": 0.26417,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "A",
    //               "start": 182681,
    //               "end": 182833,
    //               "confidence": 0.74586,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "journeyman",
    //               "start": 182849,
    //               "end": 183289,
    //               "confidence": 0.25559,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "to",
    //               "start": 183337,
    //               "end": 183497,
    //               "confidence": 0.58386,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "open",
    //               "start": 183521,
    //               "end": 183681,
    //               "confidence": 0.91832,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "my",
    //               "start": 183713,
    //               "end": 183833,
    //               "confidence": 0.99219,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "own",
    //               "start": 183849,
    //               "end": 184025,
    //               "confidence": 0.99697,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "company.",
    //               "start": 184065,
    //               "end": 184313,
    //               "confidence": 0.99954,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "And",
    //               "start": 184369,
    //               "end": 184513,
    //               "confidence": 0.99377,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I'm",
    //               "start": 184529,
    //               "end": 184969,
    //               "confidence": 0.58911,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "not",
    //               "start": 185097,
    //               "end": 185337,
    //               "confidence": 0.99982,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "too",
    //               "start": 185361,
    //               "end": 185545,
    //               "confidence": 0.99873,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "fond",
    //               "start": 185585,
    //               "end": 185761,
    //               "confidence": 0.93924,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "of",
    //               "start": 185793,
    //               "end": 185937,
    //               "confidence": 0.9997,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "plumbing,",
    //               "start": 185961,
    //               "end": 186425,
    //               "confidence": 0.47526,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "you",
    //               "start": 186505,
    //               "end": 186649,
    //               "confidence": 0.98847,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "know,",
    //               "start": 186657,
    //               "end": 186873,
    //               "confidence": 0.99448,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "saying",
    //               "start": 186929,
    //               "end": 187313,
    //               "confidence": 0.81707,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I",
    //               "start": 187409,
    //               "end": 187569,
    //               "confidence": 0.83676,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "need",
    //               "start": 187577,
    //               "end": 187697,
    //               "confidence": 0.97554,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "something,",
    //               "start": 187721,
    //               "end": 187881,
    //               "confidence": 0.35001,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I",
    //               "start": 187913,
    //               "end": 188033,
    //               "confidence": 0.99414,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "want",
    //               "start": 188049,
    //               "end": 188129,
    //               "confidence": 0.99116,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "to",
    //               "start": 188137,
    //               "end": 188233,
    //               "confidence": 0.99795,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "do",
    //               "start": 188249,
    //               "end": 188377,
    //               "confidence": 0.99879,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "something",
    //               "start": 188401,
    //               "end": 188585,
    //               "confidence": 0.99904,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "else",
    //               "start": 188625,
    //               "end": 188801,
    //               "confidence": 0.99876,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "besides",
    //               "start": 188833,
    //               "end": 189201,
    //               "confidence": 0.56015,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "plumbing.",
    //               "start": 189233,
    //               "end": 189497,
    //               "confidence": 0.79484,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "For",
    //               "start": 189521,
    //               "end": 189633,
    //               "confidence": 0.9975,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "the",
    //               "start": 189649,
    //               "end": 189705,
    //               "confidence": 0.99695,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "rest",
    //               "start": 189705,
    //               "end": 189841,
    //               "confidence": 0.94323,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "of",
    //               "start": 189873,
    //               "end": 189969,
    //               "confidence": 0.99901,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "my",
    //               "start": 189977,
    //               "end": 190121,
    //               "confidence": 0.99955,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "life.",
    //               "start": 190153,
    //               "end": 190725,
    //               "confidence": 0.99882,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "C",
    //       "text": "Okay.",
    //       "confidence": 0.57747,
    //       "start": 191225,
    //       "end": 192041,
    //       "words": [
    //           {
    //               "text": "Okay.",
    //               "start": 191225,
    //               "end": 192041,
    //               "confidence": 0.57747,
    //               "speaker": "C"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "And do you have a diploma or a GED?",
    //       "confidence": 0.95831776,
    //       "start": 192193,
    //       "end": 194801,
    //       "words": [
    //           {
    //               "text": "And",
    //               "start": 192193,
    //               "end": 192481,
    //               "confidence": 0.98463,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "do",
    //               "start": 192513,
    //               "end": 192633,
    //               "confidence": 0.89137,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 192649,
    //               "end": 192753,
    //               "confidence": 0.99412,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "have",
    //               "start": 192769,
    //               "end": 192897,
    //               "confidence": 0.99934,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "a",
    //               "start": 192921,
    //               "end": 193081,
    //               "confidence": 0.99079,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "diploma",
    //               "start": 193113,
    //               "end": 193513,
    //               "confidence": 0.99561,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "or",
    //               "start": 193569,
    //               "end": 193785,
    //               "confidence": 0.99724,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "a",
    //               "start": 193825,
    //               "end": 193953,
    //               "confidence": 0.95663,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "GED?",
    //               "start": 193969,
    //               "end": 194801,
    //               "confidence": 0.81513,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "I have a GED.",
    //       "confidence": 0.9747175,
    //       "start": 194993,
    //       "end": 196129,
    //       "words": [
    //           {
    //               "text": "I",
    //               "start": 194993,
    //               "end": 195273,
    //               "confidence": 0.99487,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "have",
    //               "start": 195289,
    //               "end": 195369,
    //               "confidence": 0.99963,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "a",
    //               "start": 195377,
    //               "end": 195473,
    //               "confidence": 0.99541,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "GED.",
    //               "start": 195489,
    //               "end": 196129,
    //               "confidence": 0.90896,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "GED. Okay. And what year did you obtain your GED?",
    //       "confidence": 0.890384,
    //       "start": 196257,
    //       "end": 202125,
    //       "words": [
    //           {
    //               "text": "GED.",
    //               "start": 196257,
    //               "end": 196713,
    //               "confidence": 0.47514,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Okay.",
    //               "start": 196769,
    //               "end": 197445,
    //               "confidence": 0.72392,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "And",
    //               "start": 199785,
    //               "end": 200097,
    //               "confidence": 0.98892,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "what",
    //               "start": 200121,
    //               "end": 200281,
    //               "confidence": 0.99727,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "year",
    //               "start": 200313,
    //               "end": 200457,
    //               "confidence": 0.97459,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "did",
    //               "start": 200481,
    //               "end": 200617,
    //               "confidence": 0.97606,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 200641,
    //               "end": 200753,
    //               "confidence": 0.99805,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "obtain",
    //               "start": 200769,
    //               "end": 201017,
    //               "confidence": 0.9144,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 201081,
    //               "end": 201329,
    //               "confidence": 0.99396,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "GED?",
    //               "start": 201377,
    //               "end": 202125,
    //               "confidence": 0.86153,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "1999.",
    //       "confidence": 0.97736,
    //       "start": 202505,
    //       "end": 203885,
    //       "words": [
    //           {
    //               "text": "1999.",
    //               "start": 202505,
    //               "end": 203885,
    //               "confidence": 0.97736,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Okay, and for your class type reference, would it be online, on campus or.",
    //       "confidence": 0.89737785,
    //       "start": 208765,
    //       "end": 213373,
    //       "words": [
    //           {
    //               "text": "Okay,",
    //               "start": 208765,
    //               "end": 209189,
    //               "confidence": 0.85067,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "and",
    //               "start": 209237,
    //               "end": 209397,
    //               "confidence": 0.97961,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "for",
    //               "start": 209421,
    //               "end": 209557,
    //               "confidence": 0.99527,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 209581,
    //               "end": 209741,
    //               "confidence": 0.99578,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "class",
    //               "start": 209773,
    //               "end": 209989,
    //               "confidence": 0.99381,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "type",
    //               "start": 210037,
    //               "end": 210285,
    //               "confidence": 0.90749,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "reference,",
    //               "start": 210325,
    //               "end": 210709,
    //               "confidence": 0.33254,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "would",
    //               "start": 210757,
    //               "end": 210917,
    //               "confidence": 0.98139,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "it",
    //               "start": 210941,
    //               "end": 211077,
    //               "confidence": 0.98855,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "be",
    //               "start": 211101,
    //               "end": 211309,
    //               "confidence": 0.99909,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "online,",
    //               "start": 211357,
    //               "end": 211877,
    //               "confidence": 0.99955,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "on",
    //               "start": 212021,
    //               "end": 212325,
    //               "confidence": 0.98954,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "campus",
    //               "start": 212365,
    //               "end": 212909,
    //               "confidence": 0.90451,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "or.",
    //               "start": 213037,
    //               "end": 213373,
    //               "confidence": 0.64549,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "No, probably campus. Probably would be campus.",
    //       "confidence": 0.72088,
    //       "start": 213429,
    //       "end": 216025,
    //       "words": [
    //           {
    //               "text": "No,",
    //               "start": 213429,
    //               "end": 213621,
    //               "confidence": 0.42013,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "probably",
    //               "start": 213653,
    //               "end": 214053,
    //               "confidence": 0.80365,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "campus.",
    //               "start": 214149,
    //               "end": 214621,
    //               "confidence": 0.71802,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "Probably",
    //               "start": 214693,
    //               "end": 214901,
    //               "confidence": 0.60474,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "would",
    //               "start": 214933,
    //               "end": 215077,
    //               "confidence": 0.51075,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "be",
    //               "start": 215101,
    //               "end": 215285,
    //               "confidence": 0.99286,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "campus.",
    //               "start": 215325,
    //               "end": 216025,
    //               "confidence": 0.99601,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Campus.",
    //       "confidence": 0.61174,
    //       "start": 216485,
    //       "end": 217037,
    //       "words": [
    //           {
    //               "text": "Campus.",
    //               "start": 216485,
    //               "end": 217037,
    //               "confidence": 0.61174,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "C",
    //       "text": "Okay.",
    //       "confidence": 0.58967,
    //       "start": 217101,
    //       "end": 217785,
    //       "words": [
    //           {
    //               "text": "Okay.",
    //               "start": 217101,
    //               "end": 217785,
    //               "confidence": 0.58967,
    //               "speaker": "C"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Just in case we'll not be able to find a campus based school, would you be okay with an online school?",
    //       "confidence": 0.8908343,
    //       "start": 221365,
    //       "end": 226941,
    //       "words": [
    //           {
    //               "text": "Just",
    //               "start": 221365,
    //               "end": 221653,
    //               "confidence": 0.98504,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "in",
    //               "start": 221669,
    //               "end": 221749,
    //               "confidence": 0.99397,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "case",
    //               "start": 221757,
    //               "end": 222305,
    //               "confidence": 0.62228,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "we'll",
    //               "start": 222605,
    //               "end": 222933,
    //               "confidence": 0.32509,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "not",
    //               "start": 222949,
    //               "end": 223053,
    //               "confidence": 0.95441,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "be",
    //               "start": 223069,
    //               "end": 223149,
    //               "confidence": 0.85045,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "able",
    //               "start": 223157,
    //               "end": 223277,
    //               "confidence": 0.60757,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "to",
    //               "start": 223301,
    //               "end": 223437,
    //               "confidence": 0.99722,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "find",
    //               "start": 223461,
    //               "end": 223621,
    //               "confidence": 0.99666,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "a",
    //               "start": 223653,
    //               "end": 223773,
    //               "confidence": 0.98754,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "campus",
    //               "start": 223789,
    //               "end": 224069,
    //               "confidence": 0.99731,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "based",
    //               "start": 224117,
    //               "end": 224349,
    //               "confidence": 0.95491,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "school,",
    //               "start": 224397,
    //               "end": 224653,
    //               "confidence": 0.99709,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "would",
    //               "start": 224709,
    //               "end": 224853,
    //               "confidence": 0.9879,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 224869,
    //               "end": 224997,
    //               "confidence": 0.98455,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "be",
    //               "start": 225021,
    //               "end": 225133,
    //               "confidence": 0.99717,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "okay",
    //               "start": 225149,
    //               "end": 225357,
    //               "confidence": 0.94216,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "with",
    //               "start": 225381,
    //               "end": 225541,
    //               "confidence": 0.98788,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "an",
    //               "start": 225573,
    //               "end": 225669,
    //               "confidence": 0.98078,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "online",
    //               "start": 225677,
    //               "end": 226085,
    //               "confidence": 0.55794,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "school?",
    //               "start": 226205,
    //               "end": 226941,
    //               "confidence": 0.9996,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Yeah.",
    //       "confidence": 0.97259,
    //       "start": 227133,
    //       "end": 227973,
    //       "words": [
    //           {
    //               "text": "Yeah.",
    //               "start": 227133,
    //               "end": 227973,
    //               "confidence": 0.97259,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "C",
    //       "text": "Okay.",
    //       "confidence": 0.92081,
    //       "start": 228149,
    //       "end": 228945,
    //       "words": [
    //           {
    //               "text": "Okay.",
    //               "start": 228149,
    //               "end": 228945,
    //               "confidence": 0.92081,
    //               "speaker": "C"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "And are you a United States citizen?",
    //       "confidence": 0.9293943,
    //       "start": 230925,
    //       "end": 232865,
    //       "words": [
    //           {
    //               "text": "And",
    //               "start": 230925,
    //               "end": 231213,
    //               "confidence": 0.9475,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "are",
    //               "start": 231229,
    //               "end": 231333,
    //               "confidence": 0.9963,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 231349,
    //               "end": 231477,
    //               "confidence": 0.99145,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "a",
    //               "start": 231501,
    //               "end": 231613,
    //               "confidence": 0.94855,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "United",
    //               "start": 231629,
    //               "end": 231853,
    //               "confidence": 0.99883,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "States",
    //               "start": 231909,
    //               "end": 232125,
    //               "confidence": 0.99572,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "citizen?",
    //               "start": 232165,
    //               "end": 232865,
    //               "confidence": 0.62741,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Yes, I am.",
    //       "confidence": 0.96502334,
    //       "start": 233315,
    //       "end": 234375,
    //       "words": [
    //           {
    //               "text": "Yes,",
    //               "start": 233315,
    //               "end": 233627,
    //               "confidence": 0.90544,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I",
    //               "start": 233651,
    //               "end": 233787,
    //               "confidence": 0.99441,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "am.",
    //               "start": 233811,
    //               "end": 234375,
    //               "confidence": 0.99522,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "C",
    //       "text": "Thank you.",
    //       "confidence": 0.920625,
    //       "start": 234875,
    //       "end": 235371,
    //       "words": [
    //           {
    //               "text": "Thank",
    //               "start": 234875,
    //               "end": 235187,
    //               "confidence": 0.84435,
    //               "speaker": "C"
    //           },
    //           {
    //               "text": "you.",
    //               "start": 235211,
    //               "end": 235371,
    //               "confidence": 0.9969,
    //               "speaker": "C"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "And are you associated with the United States military?",
    //       "confidence": 0.9069589,
    //       "start": 235403,
    //       "end": 238027,
    //       "words": [
    //           {
    //               "text": "And",
    //               "start": 235403,
    //               "end": 235547,
    //               "confidence": 0.87723,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "are",
    //               "start": 235571,
    //               "end": 235683,
    //               "confidence": 0.99537,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 235699,
    //               "end": 235827,
    //               "confidence": 0.99849,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "associated",
    //               "start": 235851,
    //               "end": 236267,
    //               "confidence": 0.56071,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "with",
    //               "start": 236331,
    //               "end": 236483,
    //               "confidence": 0.99557,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 236499,
    //               "end": 236603,
    //               "confidence": 0.89029,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "United",
    //               "start": 236619,
    //               "end": 236843,
    //               "confidence": 0.93724,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "States",
    //               "start": 236899,
    //               "end": 237139,
    //               "confidence": 0.9947,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "military?",
    //               "start": 237187,
    //               "end": 238027,
    //               "confidence": 0.91303,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "What was that?",
    //       "confidence": 0.99407,
    //       "start": 238211,
    //       "end": 239215,
    //       "words": [
    //           {
    //               "text": "What",
    //               "start": 238211,
    //               "end": 238483,
    //               "confidence": 0.99227,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "was",
    //               "start": 238499,
    //               "end": 238627,
    //               "confidence": 0.99469,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "that?",
    //               "start": 238651,
    //               "end": 239215,
    //               "confidence": 0.99525,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "I'm sorry? Are you associated with the United States military?",
    //       "confidence": 0.950981,
    //       "start": 239635,
    //       "end": 243139,
    //       "words": [
    //           {
    //               "text": "I'm",
    //               "start": 239635,
    //               "end": 239963,
    //               "confidence": 0.79294,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "sorry?",
    //               "start": 239979,
    //               "end": 240171,
    //               "confidence": 0.989,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Are",
    //               "start": 240203,
    //               "end": 240299,
    //               "confidence": 0.99396,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 240307,
    //               "end": 240547,
    //               "confidence": 0.99932,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "associated",
    //               "start": 240611,
    //               "end": 241195,
    //               "confidence": 0.7537,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "with",
    //               "start": 241275,
    //               "end": 241491,
    //               "confidence": 0.99872,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 241523,
    //               "end": 241691,
    //               "confidence": 0.98712,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "United",
    //               "start": 241723,
    //               "end": 241963,
    //               "confidence": 0.996,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "States",
    //               "start": 242019,
    //               "end": 242283,
    //               "confidence": 0.99938,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "military?",
    //               "start": 242339,
    //               "end": 243139,
    //               "confidence": 0.99967,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "No, I'm not.",
    //       "confidence": 0.98457,
    //       "start": 243307,
    //       "end": 244295,
    //       "words": [
    //           {
    //               "text": "No,",
    //               "start": 243307,
    //               "end": 243563,
    //               "confidence": 0.99334,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "I'm",
    //               "start": 243579,
    //               "end": 243707,
    //               "confidence": 0.9624,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "not.",
    //               "start": 243731,
    //               "end": 244295,
    //               "confidence": 0.99797,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "C",
    //       "text": "Okay.",
    //       "confidence": 0.46923,
    //       "start": 245355,
    //       "end": 246175,
    //       "words": [
    //           {
    //               "text": "Okay.",
    //               "start": 245355,
    //               "end": 246175,
    //               "confidence": 0.46923,
    //               "speaker": "C"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "And what would be the best time for a school enrollment counselor to contact you in the morning, afternoon, or evening?",
    //       "confidence": 0.94041574,
    //       "start": 247435,
    //       "end": 253535,
    //       "words": [
    //           {
    //               "text": "And",
    //               "start": 247435,
    //               "end": 247747,
    //               "confidence": 0.93187,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "what",
    //               "start": 247771,
    //               "end": 247931,
    //               "confidence": 0.99959,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "would",
    //               "start": 247963,
    //               "end": 248083,
    //               "confidence": 0.99889,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "be",
    //               "start": 248099,
    //               "end": 248179,
    //               "confidence": 0.99915,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 248187,
    //               "end": 248331,
    //               "confidence": 0.99871,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "best",
    //               "start": 248363,
    //               "end": 248555,
    //               "confidence": 0.99954,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "time",
    //               "start": 248595,
    //               "end": 248747,
    //               "confidence": 0.99543,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "for",
    //               "start": 248771,
    //               "end": 248907,
    //               "confidence": 0.99651,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "a",
    //               "start": 248931,
    //               "end": 249067,
    //               "confidence": 0.89656,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "school",
    //               "start": 249091,
    //               "end": 249275,
    //               "confidence": 0.99877,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "enrollment",
    //               "start": 249315,
    //               "end": 249659,
    //               "confidence": 0.88824,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "counselor",
    //               "start": 249707,
    //               "end": 250131,
    //               "confidence": 0.63132,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "to",
    //               "start": 250163,
    //               "end": 250355,
    //               "confidence": 0.99182,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "contact",
    //               "start": 250395,
    //               "end": 250643,
    //               "confidence": 0.99083,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 250699,
    //               "end": 251011,
    //               "confidence": 0.71414,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "in",
    //               "start": 251083,
    //               "end": 251219,
    //               "confidence": 0.99682,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 251227,
    //               "end": 251371,
    //               "confidence": 0.99716,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "morning,",
    //               "start": 251403,
    //               "end": 251955,
    //               "confidence": 0.9999,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "afternoon,",
    //               "start": 252115,
    //               "end": 252611,
    //               "confidence": 0.99506,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "or",
    //               "start": 252643,
    //               "end": 252859,
    //               "confidence": 0.99878,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "evening?",
    //               "start": 252907,
    //               "end": 253535,
    //               "confidence": 0.72964,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "Pretty much any time of the day.",
    //       "confidence": 0.9803086,
    //       "start": 255755,
    //       "end": 257375,
    //       "words": [
    //           {
    //               "text": "Pretty",
    //               "start": 255755,
    //               "end": 256019,
    //               "confidence": 0.99827,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "much",
    //               "start": 256027,
    //               "end": 256171,
    //               "confidence": 0.9997,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "any",
    //               "start": 256203,
    //               "end": 256371,
    //               "confidence": 0.99942,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "time",
    //               "start": 256403,
    //               "end": 256547,
    //               "confidence": 0.9883,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "of",
    //               "start": 256571,
    //               "end": 256659,
    //               "confidence": 0.89067,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "the",
    //               "start": 256667,
    //               "end": 256787,
    //               "confidence": 0.98757,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "day.",
    //               "start": 256811,
    //               "end": 257375,
    //               "confidence": 0.99823,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "And what is your exact date of birth?",
    //       "confidence": 0.9333463,
    //       "start": 260005,
    //       "end": 262109,
    //       "words": [
    //           {
    //               "text": "And",
    //               "start": 260005,
    //               "end": 260341,
    //               "confidence": 0.96669,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "what",
    //               "start": 260373,
    //               "end": 260517,
    //               "confidence": 0.99948,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "is",
    //               "start": 260541,
    //               "end": 260653,
    //               "confidence": 0.99721,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 260669,
    //               "end": 260821,
    //               "confidence": 0.99907,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "exact",
    //               "start": 260853,
    //               "end": 261125,
    //               "confidence": 0.99822,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "date",
    //               "start": 261165,
    //               "end": 261317,
    //               "confidence": 0.9552,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "of",
    //               "start": 261341,
    //               "end": 261477,
    //               "confidence": 0.98803,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "birth?",
    //               "start": 261501,
    //               "end": 262109,
    //               "confidence": 0.56287,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "10, 1580.",
    //       "confidence": 0.86286,
    //       "start": 262277,
    //       "end": 263705,
    //       "words": [
    //           {
    //               "text": "10,",
    //               "start": 262277,
    //               "end": 262919,
    //               "confidence": 0.86286,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "1580.",
    //               "start": 263062,
    //               "end": 263705,
    //               "confidence": 0.86286,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "So that would be October 15th, 1980?",
    //       "confidence": 0.92849,
    //       "start": 266005,
    //       "end": 270101,
    //       "words": [
    //           {
    //               "text": "So",
    //               "start": 266005,
    //               "end": 266437,
    //               "confidence": 0.96628,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "that",
    //               "start": 266501,
    //               "end": 266725,
    //               "confidence": 0.99899,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "would",
    //               "start": 266765,
    //               "end": 266917,
    //               "confidence": 0.57285,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "be",
    //               "start": 266941,
    //               "end": 267413,
    //               "confidence": 0.99821,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "October",
    //               "start": 267549,
    //               "end": 268314,
    //               "confidence": 0.9877,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "15th,",
    //               "start": 268484,
    //               "end": 269165,
    //               "confidence": 0.9877,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "1980?",
    //               "start": 269335,
    //               "end": 270101,
    //               "confidence": 0.9877,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "That's correct.",
    //       "confidence": 0.995225,
    //       "start": 270253,
    //       "end": 271225,
    //       "words": [
    //           {
    //               "text": "That's",
    //               "start": 270253,
    //               "end": 270605,
    //               "confidence": 0.99086,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "correct.",
    //               "start": 270645,
    //               "end": 271225,
    //               "confidence": 0.99959,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "C",
    //       "text": "Okay.",
    //       "confidence": 0.62645,
    //       "start": 272925,
    //       "end": 273745,
    //       "words": [
    //           {
    //               "text": "Okay.",
    //               "start": 272925,
    //               "end": 273745,
    //               "confidence": 0.62645,
    //               "speaker": "C"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Okay, Anthony, if we can find school for you that meets your needs, school enrollment counselors will be contacting you in the near future, either by phone or by email, and they can answer any questions you may have regarding financial aid, which assistance, their program requirements and policies. And so with that, I would just like to thank you for your time.",
    //       "confidence": 0.91467553,
    //       "start": 274165,
    //       "end": 295695,
    //       "words": [
    //           {
    //               "text": "Okay,",
    //               "start": 274165,
    //               "end": 274557,
    //               "confidence": 0.5777,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "Anthony,",
    //               "start": 274581,
    //               "end": 275225,
    //               "confidence": 0.88388,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "if",
    //               "start": 276805,
    //               "end": 277093,
    //               "confidence": 0.98977,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "we",
    //               "start": 277109,
    //               "end": 277213,
    //               "confidence": 0.99876,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "can",
    //               "start": 277229,
    //               "end": 277309,
    //               "confidence": 0.99845,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "find",
    //               "start": 277317,
    //               "end": 277509,
    //               "confidence": 0.69082,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "school",
    //               "start": 277557,
    //               "end": 277765,
    //               "confidence": 0.99777,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "for",
    //               "start": 277805,
    //               "end": 277933,
    //               "confidence": 0.97895,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 277949,
    //               "end": 278077,
    //               "confidence": 0.99533,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "that",
    //               "start": 278101,
    //               "end": 278237,
    //               "confidence": 0.97144,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "meets",
    //               "start": 278261,
    //               "end": 278469,
    //               "confidence": 0.17763,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 278477,
    //               "end": 278597,
    //               "confidence": 0.89078,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "needs,",
    //               "start": 278621,
    //               "end": 278829,
    //               "confidence": 0.91558,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "school",
    //               "start": 278877,
    //               "end": 279085,
    //               "confidence": 0.98342,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "enrollment",
    //               "start": 279125,
    //               "end": 279469,
    //               "confidence": 0.89736,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "counselors",
    //               "start": 279517,
    //               "end": 280029,
    //               "confidence": 0.83014,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "will",
    //               "start": 280077,
    //               "end": 280237,
    //               "confidence": 0.87938,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "be",
    //               "start": 280261,
    //               "end": 280421,
    //               "confidence": 0.99924,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "contacting",
    //               "start": 280453,
    //               "end": 280925,
    //               "confidence": 0.98847,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 280965,
    //               "end": 281545,
    //               "confidence": 0.99964,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "in",
    //               "start": 281845,
    //               "end": 282133,
    //               "confidence": 0.99915,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "the",
    //               "start": 282149,
    //               "end": 282277,
    //               "confidence": 0.99951,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "near",
    //               "start": 282301,
    //               "end": 282485,
    //               "confidence": 0.99946,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "future,",
    //               "start": 282525,
    //               "end": 282989,
    //               "confidence": 0.99994,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "either",
    //               "start": 283117,
    //               "end": 283381,
    //               "confidence": 0.90191,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "by",
    //               "start": 283413,
    //               "end": 283677,
    //               "confidence": 0.98731,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "phone",
    //               "start": 283741,
    //               "end": 284037,
    //               "confidence": 0.89255,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "or",
    //               "start": 284101,
    //               "end": 284301,
    //               "confidence": 0.999,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "by",
    //               "start": 284333,
    //               "end": 284525,
    //               "confidence": 0.99409,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "email,",
    //               "start": 284565,
    //               "end": 284837,
    //               "confidence": 0.99452,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "and",
    //               "start": 284901,
    //               "end": 285053,
    //               "confidence": 0.99326,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "they",
    //               "start": 285069,
    //               "end": 285197,
    //               "confidence": 0.98911,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "can",
    //               "start": 285221,
    //               "end": 285405,
    //               "confidence": 0.99882,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "answer",
    //               "start": 285445,
    //               "end": 285685,
    //               "confidence": 0.97404,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "any",
    //               "start": 285725,
    //               "end": 285901,
    //               "confidence": 0.97228,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "questions",
    //               "start": 285933,
    //               "end": 286197,
    //               "confidence": 0.99361,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 286221,
    //               "end": 286357,
    //               "confidence": 0.99562,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "may",
    //               "start": 286381,
    //               "end": 286541,
    //               "confidence": 0.99738,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "have",
    //               "start": 286573,
    //               "end": 286765,
    //               "confidence": 0.99941,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "regarding",
    //               "start": 286805,
    //               "end": 287213,
    //               "confidence": 0.5617,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "financial",
    //               "start": 287269,
    //               "end": 287605,
    //               "confidence": 0.99984,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "aid,",
    //               "start": 287685,
    //               "end": 288255,
    //               "confidence": 0.93054,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "which",
    //               "start": 288405,
    //               "end": 288691,
    //               "confidence": 0.80765,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "assistance,",
    //               "start": 288723,
    //               "end": 289467,
    //               "confidence": 0.333,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "their",
    //               "start": 289571,
    //               "end": 289859,
    //               "confidence": 0.98914,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "program",
    //               "start": 289907,
    //               "end": 290163,
    //               "confidence": 0.99903,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "requirements",
    //               "start": 290219,
    //               "end": 290635,
    //               "confidence": 0.99361,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "and",
    //               "start": 290675,
    //               "end": 290851,
    //               "confidence": 0.99052,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "policies.",
    //               "start": 290883,
    //               "end": 291575,
    //               "confidence": 0.93718,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "And",
    //               "start": 293115,
    //               "end": 293403,
    //               "confidence": 0.71484,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "so",
    //               "start": 293419,
    //               "end": 293571,
    //               "confidence": 0.98545,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "with",
    //               "start": 293603,
    //               "end": 293747,
    //               "confidence": 0.99141,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "that,",
    //               "start": 293771,
    //               "end": 293907,
    //               "confidence": 0.99911,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "I",
    //               "start": 293931,
    //               "end": 294019,
    //               "confidence": 0.9815,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "would",
    //               "start": 294027,
    //               "end": 294123,
    //               "confidence": 0.98126,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "just",
    //               "start": 294139,
    //               "end": 294267,
    //               "confidence": 0.97795,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "like",
    //               "start": 294291,
    //               "end": 294403,
    //               "confidence": 0.60742,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "to",
    //               "start": 294419,
    //               "end": 294547,
    //               "confidence": 0.54609,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "thank",
    //               "start": 294571,
    //               "end": 294683,
    //               "confidence": 0.99747,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 294699,
    //               "end": 294803,
    //               "confidence": 0.98692,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "for",
    //               "start": 294819,
    //               "end": 294923,
    //               "confidence": 0.99509,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "your",
    //               "start": 294939,
    //               "end": 295091,
    //               "confidence": 0.99307,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "time.",
    //               "start": 295123,
    //               "end": 295695,
    //               "confidence": 0.99929,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "C",
    //       "text": "Okay.",
    //       "confidence": 0.71369,
    //       "start": 297315,
    //       "end": 297907,
    //       "words": [
    //           {
    //               "text": "Okay.",
    //               "start": 297315,
    //               "end": 297907,
    //               "confidence": 0.71369,
    //               "speaker": "C"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "A",
    //       "text": "Once again, we thank you for choosing education experts.",
    //       "confidence": 0.94783664,
    //       "start": 298011,
    //       "end": 300971,
    //       "words": [
    //           {
    //               "text": "Once",
    //               "start": 298011,
    //               "end": 298203,
    //               "confidence": 0.93626,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "again,",
    //               "start": 298219,
    //               "end": 298371,
    //               "confidence": 0.99535,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "we",
    //               "start": 298403,
    //               "end": 298595,
    //               "confidence": 0.82409,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "thank",
    //               "start": 298635,
    //               "end": 298787,
    //               "confidence": 0.99407,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "you",
    //               "start": 298811,
    //               "end": 298947,
    //               "confidence": 0.99858,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "for",
    //               "start": 298971,
    //               "end": 299203,
    //               "confidence": 0.99754,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "choosing",
    //               "start": 299259,
    //               "end": 299643,
    //               "confidence": 0.88575,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "education",
    //               "start": 299699,
    //               "end": 300107,
    //               "confidence": 0.99882,
    //               "speaker": "A"
    //           },
    //           {
    //               "text": "experts.",
    //               "start": 300211,
    //               "end": 300971,
    //               "confidence": 0.90007,
    //               "speaker": "A"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "And thank you.",
    //       "confidence": 0.9676267,
    //       "start": 301123,
    //       "end": 302135,
    //       "words": [
    //           {
    //               "text": "And",
    //               "start": 301123,
    //               "end": 301387,
    //               "confidence": 0.9482,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "thank",
    //               "start": 301411,
    //               "end": 301547,
    //               "confidence": 0.95637,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "you.",
    //               "start": 301571,
    //               "end": 302135,
    //               "confidence": 0.99831,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "C",
    //       "text": "You're welcome.",
    //       "confidence": 0.584205,
    //       "start": 302635,
    //       "end": 303251,
    //       "words": [
    //           {
    //               "text": "You're",
    //               "start": 302635,
    //               "end": 302963,
    //               "confidence": 0.63739,
    //               "speaker": "C"
    //           },
    //           {
    //               "text": "welcome.",
    //               "start": 302979,
    //               "end": 303251,
    //               "confidence": 0.53102,
    //               "speaker": "C"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "B",
    //       "text": "All right, you too.",
    //       "confidence": 0.8674725,
    //       "start": 303323,
    //       "end": 305123,
    //       "words": [
    //           {
    //               "text": "All",
    //               "start": 303323,
    //               "end": 303435,
    //               "confidence": 0.58644,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "right,",
    //               "start": 303435,
    //               "end": 304027,
    //               "confidence": 0.95517,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "you",
    //               "start": 304211,
    //               "end": 304507,
    //               "confidence": 0.9561,
    //               "speaker": "B"
    //           },
    //           {
    //               "text": "too.",
    //               "start": 304531,
    //               "end": 305123,
    //               "confidence": 0.97218,
    //               "speaker": "B"
    //           }
    //       ]
    //   },
    //   {
    //       "speaker": "C",
    //       "text": "Bye.",
    //       "confidence": 0.91051,
    //       "start": 305299,
    //       "end": 305563,
    //       "words": [
    //           {
    //               "text": "Bye.",
    //               "start": 305299,
    //               "end": 305563,
    //               "confidence": 0.91051,
    //               "speaker": "C"
    //           }
    //       ]
    //   }
  ],
  confidence: 0.8946766,
  audio_duration: 321,
  punctuate: true,
  format_text: true,
  dual_channel: false,
  webhook_url: null,
  webhook_status_code: null,
  webhook_auth: false,
  webhook_auth_header_name: null,
  speed_boost: false,
  auto_highlights_result: null,
  auto_highlights: false,
  audio_start_from: null,
  audio_end_at: null,
  word_boost: [],
  boost_param: null,
  filter_profanity: false,
  redact_pii: false,
  redact_pii_audio: false,
  redact_pii_audio_quality: null,
  redact_pii_policies: null,
  redact_pii_sub: null,
  speaker_labels: true,
  content_safety: false,
  iab_categories: false,
  content_safety_labels: {
    status: "unavailable",
    results: [],
    summary: {},
  },
  iab_categories_result: {
    status: "unavailable",
    results: [],
    summary: {},
  },
  language_detection: false,
  language_confidence_threshold: null,
  language_confidence: null,
  custom_spelling: null,
  throttled: false,
  auto_chapters: false,
  summarization: false,
  summary_type: null,
  summary_model: null,
  custom_topics: false,
  topics: [],
  speech_threshold: null,
  speech_model: null,
  chapters: null,
  disfluencies: false,
  entity_detection: false,
  sentiment_analysis: false,
  sentiment_analysis_results: null,
  entities: null,
  speakers_expected: null,
  summary: null,
  custom_topics_results: null,
  is_deleted: null,
  multichannel: null,
};
