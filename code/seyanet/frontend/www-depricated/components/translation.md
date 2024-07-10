"use client"
import translatte from "translatte";
import { useState } from 'react';

const languages = ["ar", "bn", "de", "en", "es", "fr", "fa", "gu", "hi", "it", "in", "ko", "ms", "ml", "ps", "pa", "pt", "ru", "sw", "te", "ta", "tr", "ur", "zh"];

export default function Translations() {
    const [translations, setTranslations] = useState<{key}>({});

    const translateText = async () => {
        let newTranslations = {};
        for (let lang of languages) {
            try {
                const res = await translatte('Do you speak Russian?', {to: lang});
                newTranslations[lang] = res.text;
            } catch (err) {
                console.error(`Error translating to ${lang}: ${err}`);
            }
        }
        setTranslations(newTranslations);
    };

    return (
        <div>
            <button onClick={translateText}>Translate</button>
            {Object.entries(translations).map(([lang, text]) => (
                <div key={lang}>
                    <h2>{lang}</h2>
                    <p>{text}</p>
                </div>
            ))}
        </div>
    );
}
