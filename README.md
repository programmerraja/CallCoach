# CallCoach
A coach that guides salespeople through their calls, helping them improve their techniques.

*This is a submission for the [AssemblyAI Challenge ](https://dev.to/challenges/assemblyai): Sophisticated Speech-to-Text.*

## What I Built

I developed a tool designed to help sales professionals improve their phone call performance by offering AI-powered analysis and practice. The tool uses AssemblyAI’s to transcribe and analyze sales calls, providing actionable feedback to users on their tone, language, pacing, and key performance indicators (KPIs) such as engagement and call effectiveness.

The application is designed to help salespeople identify areas for improvement, whether it's making their pitch more compelling, asking the right questions, or learning how to better respond to customer objections. By using AI to transcribe and analyze their calls, salespeople can practice and refine their techniques to increase their chances of closing deals.

## Demo
You can access a live demo of the tool [here](https://callcoach.onrender.com/). Below are some screenshots showcasing the key features of the application:

![Dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/49xjupgjf8kxoyci8van.png)

![Practice](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t8flcaw9ailbjz5afutl.png)

![Call anlaysis](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/csymnv2hambcfwp2lpsv.png)

![Setting page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n4d5x5apqes7xt6y6ops.png)

You can checkout the code [here](https://github.com/programmerraja/CallCoach)

Call Transcription Screen: This is where the user can upload their sales call recording. The AI will then transcribe the call and display the text for review.

Analysis Dashboard: After transcription, the AI analyzes the call and provides a detailed breakdown of language use, tone, and response effectiveness.

Practice Mode: Users can practice their pitch by simulating conversations with the AI, receiving real-time feedback on their responses.

## Journey

Incorporating AssemblyAI's speech-to-text model into my application was a game-changer. The model’s ability to accurately transcribe phone calls and understand nuances in speech allowed me to build an application that could not only capture what was said, but also analyze it for content, tone, and pacing.

Step-by-Step Implementation

Transcription with AssemblyAI: The first step was to integrate AssemblyAI’s API to convert sales call audio recordings into text. 

Call Analysis: Once the call was transcribed, I used OpenAI or Ollama model based on user configured on setting page.

Real-time Feedback: The user can choose the type of prospect they want to engage with, such as positive, negative, busy, etc. Once they select the prospect persona, they can start speaking, and the audio will be transcribed to text using AssemblyAI. The transcription will then be sent to the AI with a prompt, and the AI's response will be displayed on the UI. The user can continue the conversation, and once they’re done, they can analyze the call to see how well they performed.

Finally, all the best to everyone participating in this hackathon!

Happy Coding :)