import { GoogleGenAI, Modality, Type } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const imageGenerationPrefix = "Photorealistic, epic high fantasy digital painting in the style of classic Dungeons & Dragons art, cinematic lighting, hyper-detailed, intricate, 8k resolution. ";

export interface OpenWorldTurn {
    text: { en: string; zh: string };
    imagePrompt: string;
    choices: { text: { en: string; zh: string } }[];
}

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const fullPrompt = imageGenerationPrefix + prompt;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: fullPrompt,
            },
          ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
      }
    }
    
    throw new Error("No image part found in the response.");
  } catch (error) {
    console.error("Error generating image:", error);
    // Fallback to a placeholder image on error
    return "https://picsum.photos/1280/720?grayscale";
  }
};

export const determineEnding = async (playerInput: string, hopeScore: number): Promise<string> => {
    const prompt = `
    You are the final arbiter of fate in a Dungeons & Dragons story. The player has reached the climax. A goddess-in-mortal-form, Silvyr, is about to sacrifice herself to defeat a great evil. The player, grievously wounded, can only shout their final intention.

    Analyze the player's input and their accumulated 'Hope' score to determine the outcome.

    - Player's Final Words: "${playerInput}"
    - Hope Score: ${hopeScore} (A measure of their faith, trust, and good deeds. A score above 10 is very high).

    Here are the three possible endings:

    1.  **ENDING_A (The Canon Ending):** Triggered if the player accepts her sacrifice, tries a futile heroic act themselves, or calls for Kaelen's help. This leads to Silvyr completing her sacrifice, saving the party but sealing her own doom as per D&D canon. This is the default outcome for neutral or uncertain actions.

    2.  **ENDING_B (The Rewritten Fate):** This is a rare ending. It's triggered ONLY if the player's input is a selfless, desperate plea for HER to live, to run, to save HERSELF. For example: "No! Silvyr! Live! Run!" or "Don't do it! We'll find another way!". It's about prioritizing her life over the mission.

    3.  **ENDING_C (The Secret Chosen):** This is the rarest ending. It's triggered ONLY if the player has a very high Hope Score (above 10) AND their final words are an ultimate declaration of loyalty and shared struggle, like "I will fight with you, to the end!" or "We will face this together!".

    Based on your analysis, you must respond with ONLY ONE of the following three strings: "ENDING_A", "ENDING_B", or "ENDING_C". Do not provide any other text or explanation.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const text = response.text.trim();
        if (["ENDING_A", "ENDING_B", "ENDING_C"].includes(text)) {
            return text;
        }
        console.warn("Ending determination returned unexpected value, defaulting to A:", text);
        return "ENDING_A"; // Default to the canon ending on any error or unexpected response
    } catch (error) {
        console.error("Error determining ending:", error);
        return "ENDING_A"; // Default on API error
    }
};

export const generateOpenWorldTurn = async (history: string[], playerAction: string): Promise<OpenWorldTurn> => {
    const formattedHistory = history.map((entry, index) => `${index % 2 === 0 ? 'SCENE' : 'PLAYER'}: ${entry}`).join('\n');

    const prompt = `
    You are a world-class Dungeon Master for a text-based D&D adventure game called "Song of Silverhair". The player has unlocked the secret "open world" mode and is now on an endless adventure with Silvyr (the goddess Eilistraee in mortal form).

    Your task is to generate the next turn in the story.
    
    RULES:
    1.  **Maintain Continuity:** Your response must logically follow the provided history and the player's latest action.
    2.  **Act as DM:** Describe the outcome of the player's action, what Silvyr does or says, and the state of the world. Keep the tone epic, descriptive, and engaging.
    3.  **Generate Image Prompt:** Create a concise, powerful image prompt for a photorealistic, classic D&D art style painting that captures the key moment of the scene you've just written.
    4.  **Provide Choices:** ALWAYS provide exactly THREE diverse and interesting suggested actions the player can take next. These should be short, actionable choices.
    5.  **Dual Language:** You MUST provide all text ('text' and 'choices') in both English (en) and Chinese (zh).
    6.  **JSON Output:** Your response MUST be a single, valid JSON object matching the provided schema. Do not add any text before or after the JSON.

    CONVERSATION HISTORY:
    ---
    ${formattedHistory}
    ---

    PLAYER's LATEST ACTION: "${playerAction}"

    Now, generate the next turn as a JSON object.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        text: {
                            type: Type.OBJECT,
                            properties: {
                                en: { type: Type.STRING },
                                zh: { type: Type.STRING }
                            },
                             required: ["en", "zh"],
                        },
                        imagePrompt: { type: Type.STRING },
                        choices: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    text: {
                                        type: Type.OBJECT,
                                        properties: {
                                            en: { type: Type.STRING },
                                            zh: { type: Type.STRING }
                                        },
                                        required: ["en", "zh"],
                                    }
                                },
                                required: ["text"],
                            }
                        }
                    },
                    required: ["text", "imagePrompt", "choices"],
                }
            }
        });

        const jsonText = response.text.trim();
        const cleanJsonText = jsonText.replace(/^`{3}json\s*|`{3}$/g, '');
        return JSON.parse(cleanJsonText) as OpenWorldTurn;
    } catch (error) {
        console.error("Error generating open world turn:", error);
        return {
            text: {
                en: "An unexpected silence falls. The threads of fate are tangled. Let's try that again.",
                zh: "一阵意想不到的沉默降临。命运的丝线缠绕在了一起。我们再试一次吧。"
            },
            imagePrompt: "A close up on Silvyr looking confused and concerned, the background is a blur of swirling colors.",
            choices: [
                { text: { en: "Let's rest for a moment.", zh: "我们先休息一下。" } },
                { text: { en: "Where were we?", zh: "我们刚才说到哪里了？" } },
                { text: { en: "Try to remember the path.", zh: "试着回忆刚才的路。" } }
            ]
        };
    }
};
