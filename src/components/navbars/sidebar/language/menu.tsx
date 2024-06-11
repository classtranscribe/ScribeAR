import React from 'react';

import { List, ListItemText, Collapse, MessageIcon, ListItem } from '../../../../muiImports'
import { useSelector } from 'react-redux';
import { RootState, ControlStatus, LanguageList } from '../../../../react-redux&middleware/redux/typesImports';
import ChooseLanguage from './chooseLanguage'

const speechLanguages = [
  {label: "Afrikaans (South Africa)",	CountryCode: "af-ZA"},
  {label: "Amharic (Ethiopia)",	CountryCode: "am-ET"},
  {label: "Arabic (Algeria)",	CountryCode: "ar-DZ"},
  {label: "Arabic (Bahrain), modern standard",	CountryCode: "ar-BH"},
  {label: "Arabic (Egypt)",	CountryCode: "ar-EG"},
  {label: "Arabic (Iraq)",	CountryCode: "ar-IQ"},
  {label: "Arabic (Israel)",	CountryCode: "ar-IL"},
  {label: "Arabic (Jordan)",	CountryCode: "ar-JO"},
  {label: "Arabic (Kuwait)",	CountryCode: "ar-KW"},
  {label: "Arabic (Lebanon)",	CountryCode: "ar-LB"},
  {label: "Arabic (Libya)",	CountryCode: "ar-LY"},
  {label: "Arabic (Morocco)",	CountryCode: "ar-MA"},
  {label: "Arabic (Oman)",	CountryCode: "ar-OM"},
  {label: "Arabic (Palestinian Authority)",	CountryCode: "ar-PS"},
  {label: "Arabic (Qatar)",	CountryCode: "ar-QA"},
  {label: "Arabic (Saudi Arabia)",	CountryCode: "ar-SA"},
  {label: "Arabic (Syria)",	CountryCode: "ar-SY"},
  {label: "Arabic (Tunisia)",	CountryCode: "ar-TN"},
  {label: "Arabic (United Arab Emirates)",	CountryCode: "ar-AE"},
  {label: "Arabic (Yemen)",	CountryCode: "ar-YE"},
  {label: "Bengali (India)",	CountryCode: "bn-IN"},
  {label: "Bulgarian (Bulgaria)",	CountryCode: "bg-BG"},
  {label: "Burmese (Myanmar)",	CountryCode: "my-MM"},
  {label: "Catalan (Spain)",	CountryCode: "ca-ES"},
  {label: "Chinese (Cantonese, Traditional)",	CountryCode: "zh-HK"},
  {label: "Chinese (Mandarin, Simplified)",	CountryCode: "zh-CN"},
  {label: "Chinese (Taiwanese Mandarin)",	CountryCode: "zh-TW"},
  {label: "Croatian (Croatia)",	CountryCode: "hr-HR"},
  {label: "Czech (Czech)",	CountryCode: "cs-CZ"},
  {label: "Danish (Denmark)",	CountryCode: "da-DK"},
  {label: "Dutch (Belgium)",	CountryCode: "nl-BE"},
  {label: "Dutch (Netherlands)",	CountryCode: "nl-NL"},
  {label: "English (Australia)",	CountryCode: "en-AU"},
  {label: "English (Canada)",	CountryCode: "en-CA"},
  {label: "English (Ghana)",	CountryCode: "en-GH"},
  {label: "English (Hong Kong)",	CountryCode: "en-HK"},
  {label: "English (India)",	CountryCode: "en-IN"},
  {label: "English (Ireland)",	CountryCode: "en-IE"},
  {label: "English (Kenya)",	CountryCode: "en-KE"},
  {label: "English (New Zealand)",	CountryCode: "en-NZ"},
  {label: "English (Nigeria)",	CountryCode: "en-NG"},
  {label: "English (Philippines)",	CountryCode: "en-PH"},
  {label: "English (Singapore)",	CountryCode: "en-SG"},
  {label: "English (South Africa)",	CountryCode: "en-ZA"},
  {label: "English (Tanzania)",	CountryCode: "en-TZ"},
  {label: "English (United Kingdom)",	CountryCode: "en-GB"},
  {label: "English (United States)",	CountryCode: "en-US"},
  {label: "Estonian (Estonia)",	CountryCode: "et-EE"},
  {label: "Filipino (Philippines)", CountryCode: "fil-PH"},
  {label: "Finnish (Finland)",	CountryCode: "fi-FI"},
  {label: "French (Belgium)",	CountryCode: "fr-BE"},
  {label: "French (Canada)",	CountryCode: "fr-CA"},
  {label: "French (France)",	CountryCode: "fr-FR"},
  {label: "French (Switzerland)",	CountryCode: "fr-CH"},
  {label: "German (Austria)",	CountryCode: "de-AT"},
  {label: "German (Germany)",	CountryCode: "de-DE"},
  {label: "German (Switzerland)",	CountryCode: "de-CH"},
  {label: "Greek (Greece)",	CountryCode: "el-GR"},
  {label: "Gujarati (Indian)",	CountryCode: "gu-IN"},
  {label: "Hebrew (Israel)",	CountryCode: "he-IL"},
  {label: "Hindi (India)",	CountryCode: "hi-IN"},
  {label: "Hungarian (Hungary)",	CountryCode: "hu-HU"},
  {label: "Icelandic (Iceland)",	CountryCode: "is-IS"},
  {label: "Indonesian (Indonesia)",	CountryCode: "id-ID"},
  {label: "Irish (Ireland)",	CountryCode: "ga-IE"},
  {label: "Italian (Italy)",	CountryCode: "it-IT"},
  {label: "Japanese (Japan)",	CountryCode: "ja-JP"},
  {label: "Javanese (Indonesia)",	CountryCode: "jv-ID"},
  {label: "Kannada (India)",	CountryCode: "kn-IN"},
  {label: "Khmer (Cambodia)",	CountryCode: "km-KH"},
  {label: "Korean (Korea)",	CountryCode: "ko-KR"},
  {label: "Lao (Laos)",	CountryCode: "lo-LA"},
  {label: "Latvian (Latvia)",	CountryCode: "lv-LV"},
  {label: "Lithuanian (Lithuania)",	CountryCode: "lt-LT"},
  {label: "Macedonian (North Macedonia)",	CountryCode: "mk-MK"},
  {label: "Malay (Malaysia)",	CountryCode: "ms-MY"},
  {label: "Maltese (Malta)",	CountryCode: "mt-MT"},
  {label: "Marathi (India)",	CountryCode: "mr-IN"},
  {label: "Norwegian (Bokmål, Norway)",	CountryCode: "nb-NO"},
  {label: "Persian (Iran)",	CountryCode: "fa-IR"},
  {label: "Polish (Poland)",	CountryCode: "pl-PL"},
  {label: "Portuguese (Brazil)",	CountryCode: "pt-BR"},
  {label: "Portuguese (Portugal)",	CountryCode: "pt-PT"},
  {label: "Romanian (Romania)",	CountryCode: "ro-RO"},
  {label: "Russian (Russia)",	CountryCode: "ru-RU"},
  {label: "Serbian (Serbia)",	CountryCode: "sr-RS"},
  {label: "Sinhala (Sri Lanka)",	CountryCode: "si-LK"},
  {label: "Slovak (Slovakia)",	CountryCode: "sk-SK"},
  {label: "Slovenian (Slovenia)",	CountryCode: "sl-SI"},
  {label: "Spanish (Argentina)",	CountryCode: "es-AR"},
  {label: "Spanish (Bolivia)",	CountryCode: "es-BO"},
  {label: "Spanish (Chile)",	CountryCode: "es-CL"},
  {label: "Spanish (Colombia)",	CountryCode: "es-CO"},
  {label: "Spanish (Costa Rica)",	CountryCode: "es-CR"},
  {label: "Spanish (Cuba)",	CountryCode: "es-CU"},
  {label: "Spanish (Dominican Republic)",	CountryCode: "es-DO"},
  {label: "Spanish (Ecuador)",	CountryCode: "es-EC"},
  {label: "Spanish (El Salvador)",	CountryCode: "es-SV"},
  {label: "Spanish (Equatorial Guinea)",	CountryCode: "es-GQ"},
  {label: "Spanish (Guatemala)",	CountryCode: "es-GT"},
  {label: "Spanish (Honduras)",	CountryCode: "es-HN"},
  {label: "Spanish (Mexico)",	CountryCode: "es-MX"},
  {label: "Spanish (Nicaragua)",	CountryCode: "es-NI"},
  {label: "Spanish (Panama)",	CountryCode: "es-PA"},
  {label: "Spanish (Paraguay)",	CountryCode: "es-PY"},
  {label: "Spanish (Peru)",	CountryCode: "es-PE"},
  {label: "Spanish (Puerto Rico)",	CountryCode: "es-PR"},
  {label: "Spanish (Spain)",	CountryCode: "es-ES"},
  {label: "Spanish (Uruguay)",	CountryCode: "es-UY"},
  {label: "Spanish (USA)",	CountryCode: "es-US"},
  {label: "Spanish (Venezuela)",	CountryCode: "es-VE"},
  {label: "Swahili (Kenya)",	CountryCode: "sw-KE"},
  {label: "Swahili (Tanzania)",	CountryCode: "sw-TZ"},
  {label: "Swedish (Sweden)",	CountryCode: "sv-SE"},
  {label: "Tamil (India)",	CountryCode: "ta-IN"},
  {label: "Telugu (India)",	CountryCode: "te-IN"},
  {label: "Thai (Thailand)",	CountryCode: "th-TH"},
  {label: "Turkish (Turkey)",	CountryCode: "tr-TR"},
  {label: "Ukrainian (Ukraine)",	CountryCode: "uk-UA"},
  {label: "Uzbek (Uzbekistan)",	CountryCode: "uz-UZ"},
  {label: "Vietnamese (Vietnam)",	CountryCode: "vi-VN"},
  {label: "Zulu (South Africa)",	CountryCode: "zu-ZA"},
] as LanguageList[]

const textLanguages = [
{label: "Afrikaans",	CountryCode: "af"},
{label: "Albanian",	CountryCode: "sq"},
{label: "Amharic",	CountryCode: "am"},
{label: "Arabic",	CountryCode: "ar"},
{label: "Armenian", CountryCode: "hy"},
{label: "Assamese",	CountryCode: "as"},
{label: "Azerbaijani (Latin)",CountryCode: 	"az"},
{label: "Bangla",	CountryCode: "bn"},
{label: "Bashkir", CountryCode:	"ba"},
{label: "Basque",	CountryCode: "eu"},
{label: "Bosnian (Latin)", CountryCode:	"bs"},
{label: "Bulgarian",	CountryCode: "bg"},
{label: "Cantonese (Traditional)",	CountryCode: "yue"},
{label: "Catalan",	CountryCode: "ca"},
{label: "Chinese (Literary)",	CountryCode: "lzh"},
{label: "Chinese Simplified",	CountryCode: "zh-Hans"},
{label: "Chinese Traditional",	CountryCode: "zh-Hant"},
{label: "Croatian",	CountryCode: "hr"},
{label: "Czech",	CountryCode: "cs"},
{label: "Danish",	CountryCode: "da"},
{label: "Dari",	CountryCode: "prs"},
{label: "Divehi",CountryCode: 	"dv"},
{label: "Dutch",	CountryCode: "nl"},
{label: "English", CountryCode: "en"},
{label: "Estonian",	CountryCode: "et"},
{label: "Faroese",	CountryCode: "fo"},
{label: "Fijian",	CountryCode: "fj"},
{label: "Filipino", CountryCode: "fil"},
{label: "Finnish",	CountryCode: "fi"},
{label: "French",	CountryCode: "fr"},
{label: "French (Canada)",	CountryCode: "fr-ca"},
{label: "Galician",	CountryCode: "gl"},
{label: "Georgian",	CountryCode: "ka"},
{label: "German",	CountryCode: "de"},
{label: "Greek",	CountryCode: "el"},
{label: "Gujarati", CountryCode: "gu"},
{label: "Haitian Creole",	CountryCode:"ht"},
{label: "Hebrew",	CountryCode: "he"},
{label: "Hindi",	CountryCode: "hi"},
{label: "Hmong Daw(Latin)",	CountryCode: "mww"},
{label: "Hungarian",	CountryCode: "hu"},
{label: "Icelandic",	CountryCode: "is"},
{label: "Indonesian",	CountryCode: "id"},
{label: "Inuinnaqtun",CountryCode: "ikt"},
{label: "Inuktitut",	CountryCode: "iu"},
{label: "Inuktitut (Latin)",	CountryCode: "iu-Latn"},
{label: "Irish",	CountryCode: "ga"},
{label: "Italian",	CountryCode: "it"},
{label: "Japanese",	CountryCode: "ja"},
{label: "Kannada",	CountryCode: "kn"},
{label: "Kazakh",	CountryCode: "kk"},
{label: "Khmer",	CountryCode: "km"},
{label: "Korean",	CountryCode: "ko"},
{label: "Kurdish (Central)",	CountryCode: "ku"},
{label: "Kurdish (Northern)",	CountryCode: "kmr"},
{label: "Kyrgyz (Cyrillic)",	CountryCode: "ky"},
{label: "Lao",	CountryCode: "lo"},
{label: "Latvian",	CountryCode: "lv"},
{label: "Lithuanian",	CountryCode: "lt"},
{label: "Macedonian",	CountryCode: "mk"},
{label: "Malagasy",	CountryCode: "mg"},
{label: "Malay (Latin)",	CountryCode: "ms"},
{label: "Malayalam",	CountryCode: "ml"},
{label: "Maltese",	CountryCode: "mt"},
{label: "Maori",	CountryCode: "mi"},
{label: "Marathi",	CountryCode: "mr"},
{label: "Mongolian (Cyrillic)", CountryCode:	"mn-Cyrl"},
{label: "Mongolian (Traditional)",	CountryCode: "mn-Mong"},
{label: "Myanmar",	CountryCode: "my"},
{label: "Nepali",	CountryCode: "ne"},
{label: "Norwegian",	CountryCode: "nb"},
{label: "Odia",	CountryCode: "or"},
{label: "Pashto", CountryCode:	"ps"},
{label: "Persian",CountryCode:	"fa"},
{label: "Polish",	CountryCode: "pl"},
{label: "Portuguese (Brazil)",	CountryCode: "pt"},
{label: "Portuguese (Portugal)",	CountryCode: "pt-pt"},
{label: "Punjabi",	CountryCode: "pa"},
{label: "Queretaro Otomi",	CountryCode: "otq"},
{label: "Romanian",	CountryCode: "ro"},
{label: "Russian",	CountryCode: "ru"},
{label: "Samoan (Latin)",	CountryCode: "sm"},
{label: "Serbian (Cyrillic)",	CountryCode: "sr-Cyrl"},
{label: "Serbian (Latin)",	CountryCode: "sr-Latn"},
{label: "Slovak",	CountryCode: "sk"},
{label: "Slovenian",	CountryCode: "sl"},
{label: "Somali (Arabic)",	CountryCode: "so"},
{label: "Spanish",	CountryCode: "es"},
{label: "Swahili (Latin)",	CountryCode: "sw"},
{label: "Swedish",	CountryCode: "sv"},
{label: "Tahitian",	CountryCode: "ty"},
{label: "Tamil",	CountryCode: "ta"},
{label: "Tatar (Latin)",CountryCode: 	"tt"},
{label: "Telugu",	CountryCode: "te"},
{label: "Thai",	CountryCode: "th"},
{label: "Tibetan",	CountryCode: "bo"},
{label: "Tigrinya",	CountryCode: "ti"},
{label: "Tongan",	CountryCode: "to"},
{label: "Turkish",	CountryCode: "tr"},
{label: "Turkmen (Latin)",	CountryCode: "tk"},
{label: "Ukrainian",	CountryCode: "uk"},
{label: "Upper Sorbian", CountryCode: "hsb"},
{label: "Urdu",	CountryCode: "ur"},
{label: "Uyghur (Arabic)",CountryCode: 	"ug"},
{label: "Uzbek (Latin",	CountryCode: "uz"},
{label: "Vietnamese",	CountryCode: "vi"},
{label: "Welsh",	CountryCode: "cy"},
{label: "Yucatec Maya", CountryCode: "yua"},
{label: "Zulu",	CountryCode: "zu"},
]


export default function LangMenu(props) {
  const control = useSelector((state: RootState) => {
    return state.ControlReducer as ControlStatus;
  });

  return (
    <div>
      {props.listItemHeader("Language", "lang", MessageIcon)}
      <Collapse in={props.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4, mb: 1 }}>
            <ListItemText primary = {`Spoken:`}/>         
          </ListItem>
          <ListItem sx={{ pl: 3}}>
            <ChooseLanguage 
              languageList={speechLanguages} 
              dispatchType={'SET_SPEECH_LANGUAGE'}
              currLanguage={control.speechLanguage}
            />
          </ListItem>
          <ListItem sx={{ pl: 4}}>
            <ListItemText primary = {`Typed:`}/>
          </ListItem>
          <ListItem sx={{ pl: 3, mb: 1 }}>
          <ChooseLanguage 
              languageList={textLanguages}
              dispatchType={'SET_TEXT_LANGUAGE'}
              currLanguage={control.textLanguage}
            />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}