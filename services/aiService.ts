import type { Chat, ChatChunk, IChat } from '../types';

// Keyword-based response mapping.
// The keys are keywords to look for (lowercase). The values are the pre-written responses.
const cannedResponses: Record<string, string> = {
  'craving': "It's completely normal to feel a craving, and it's a sign that you're making a change. Remember that cravings are like waves; they build, peak, and then pass. Try distracting yourself for 15 minutes. Go for a short walk, listen to a loud song, or drink a large glass of cold water. You can get through this moment. The Mindful Drinking Hub also has a 'breather' tool that might help.",
  'urge': "It's completely normal to feel an urge, and it's a sign that you're making a change. Remember that urges are like waves; they build, peak, and then pass. Try distracting yourself for 15 minutes. Go for a short walk, listen to a loud song, or drink a large glass of cold water. You can get through this moment. The Mindful Drinking Hub also has a 'breather' tool that might help.",
  'lonely': "Feeling lonely is incredibly tough. Reaching out is a brave first step. Sometimes just connecting with another human voice can make a world of difference. The Samaritans are available to listen 24/7 on 116 123. They're completely confidential and there to support you.",
  'stressed': "Stress is a major trigger for many people. It sounds like you're going through a lot right now. Instead of a drink, could you try a different 10-minute activity to decompress? A short walk, some deep breathing exercises, or even just stepping outside for fresh air can sometimes help break the cycle. The Mindful Drinking Hub has a breathing tool you can use.",
  'help': "It's great that you're reaching out for help. There are amazing, confidential resources available. For a friendly, non-judgmental chat about your drinking, you can call Drinkline for free on 0300 123 1110. If you're feeling overwhelmed emotionally, the Samaritans are always there to listen on 116 123.",
  'friend': "It's hard seeing a friend struggle. The best thing you can do is talk to them when they're sober, express your concern using 'I' statements (like 'I'm worried about you'), and listen without judgment. For your own support, Al-Anon (0800 0086 811) is a fantastic resource for friends and family of people with drinking problems.",
  'anxious': "Anxiety can be really overwhelming, and it's common to want to reach for something to quiet it down. Remember that while alcohol might seem to help in the short term, it often makes anxiety worse in the long run. Try a grounding technique: name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This can help bring you back to the present moment.",
  'default': "Thank you for reaching out. I'm here to offer support. I can provide guidance on managing cravings, finding resources, or dealing with difficult feelings. What's on your mind? Remember, if you need to talk to someone, you can call the Samaritans on 116 123 at any time.",
};

// Safety net for self-harm keywords.
const SELF_HARM_KEYWORDS = ['suicide', 'kill myself', 'want to die', 'end my life', 'self harm', 'self-harm', 'hurting myself'];
const SAFETY_RESPONSE = "It sounds like you are in immediate distress. Please call 999 or the Samaritans on 116 123 right now. They are available 24/7 to provide the urgent help you need.";

/**
 * A simulated chat service that provides pre-written responses.
 * It operates entirely offline and requires no API key.
 */
class OfflineChat implements IChat {
  // Simulates a streaming response by yielding words one by one.
  async *sendMessageStream({ message }: { message: string }): AsyncIterable<ChatChunk> {
    const lowerCaseMessage = message.toLowerCase();

    // **IMPERATIVE SAFETY CHECK**
    const containsSelfHarmKeyword = SELF_HARM_KEYWORDS.some(keyword => lowerCaseMessage.includes(keyword));
    if (containsSelfHarmKeyword) {
        // Yield the safety response immediately and stop.
        yield { text: SAFETY_RESPONSE };
        return;
    }

    let responseText = cannedResponses['default'];
    for (const keyword in cannedResponses) {
        if (lowerCaseMessage.includes(keyword)) {
            responseText = cannedResponses[keyword];
            break;
        }
    }

    // Simulate the AI "typing" by streaming the response word by word.
    const words = responseText.split(' ');
    for (let i = 0; i < words.length; i++) {
        // Yield each word with a space after it.
        yield { text: words[i] + (i === words.length - 1 ? '' : ' ') };
        // A short delay to make the typing feel more natural.
        await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
}

/**
 * Creates and returns a hard-wired, offline chat service instance.
 * This removes all external AI dependencies.
 */
export function createChatService(): Chat {
  console.log('Initializing Offline Chat Service');
  return new OfflineChat();
}
