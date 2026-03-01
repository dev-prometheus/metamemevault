// components/GoogleTranslate.jsx
import { useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const GoogleTranslate = () => {
    useEffect(() => {
        // Load Google Translate script
        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);

        // Initialize Google Translate
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'zh-CN,zh-TW,ru,es,ko,ja,vi,tr,fr,pt,de,id,ar,th,hi',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
            }, 'google_translate_element');
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="google-translate-wrapper">
            <Globe size={18} />
            <div id="google_translate_element"></div>
        </div>
    );
};

export default GoogleTranslate;