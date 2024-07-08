from deep_translator import GoogleTranslator

to_translate = 'I want to translate this text'
translated = GoogleTranslator(source='auto', target='ar').translate(to_translate)

print(translated)
