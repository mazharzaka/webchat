import { Translate } from "@google-cloud/translate/build/src/v2";

const translate = new Translate({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
});

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  const [translation] = await translate.translate(text, targetLanguage);
  return translation;
}
