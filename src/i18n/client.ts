// Text set by the browser script (form messages, menu and slideshow buttons), kept apart from the page
// dictionaries so only these few lines are sent to the browser. Odia and Hindi are MACHINE-TRANSLATED DRAFTS:
// they need review by a native speaker at SINTEL.

const en = {
  sending: 'Sending…',
  failed: 'Sorry, that did not send. Please try again, chat on WhatsApp or call us.',
  thanks: 'Thank you.',
  thanksName: 'Thank you, {name}.',
  received: 'We have received your enquiry. Our team will call you back soon, usually within one working day.',
  another: 'Send another enquiry',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  pause: 'Pause slideshow',
  play: 'Play slideshow',
  map: 'Map',
};

export const clientText: Record<'en' | 'or' | 'hi', typeof en> = {
  en,
  or: {
    sending: 'ପଠାଯାଉଛି…',
    failed: 'ଦୁଃଖିତ, ଏହା ପଠାଯାଇପାରିଲା ନାହିଁ। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ, WhatsApp ରେ ଚାଟ୍ କରନ୍ତୁ କିମ୍ବା ଆମକୁ ଫୋନ୍ କରନ୍ତୁ।',
    thanks: 'ଧନ୍ୟବାଦ।',
    thanksName: 'ଧନ୍ୟବାଦ, {name}।',
    received: 'ଆମେ ଆପଣଙ୍କ ଅନୁସନ୍ଧାନ ପାଇଛୁ। ଆମ ଦଳ ଶୀଘ୍ର, ସାଧାରଣତଃ ଗୋଟିଏ କାର୍ଯ୍ୟ ଦିବସ ମଧ୍ୟରେ ଆପଣଙ୍କୁ ଫୋନ୍ କରିବ।',
    another: 'ଆଉ ଏକ ଅନୁସନ୍ଧାନ ପଠାନ୍ତୁ',
    openMenu: 'ମେନୁ ଖୋଲନ୍ତୁ',
    closeMenu: 'ମେନୁ ବନ୍ଦ କରନ୍ତୁ',
    pause: 'ସ୍ଲାଇଡ୍ ଶୋ ବିରତ କରନ୍ତୁ',
    play: 'ସ୍ଲାଇଡ୍ ଶୋ ଚଲାନ୍ତୁ',
    map: 'ମାନଚିତ୍ର',
  },
  hi: {
    sending: 'भेजा जा रहा है…',
    failed: 'क्षमा करें, यह नहीं भेजा जा सका। कृपया फिर से कोशिश करें, WhatsApp पर चैट करें या हमें कॉल करें।',
    thanks: 'धन्यवाद।',
    thanksName: 'धन्यवाद, {name}।',
    received: 'हमें आपकी पूछताछ मिल गई है। हमारी टीम जल्द ही, आमतौर पर एक कार्य-दिवस के भीतर, आपको कॉल करेगी।',
    another: 'एक और पूछताछ भेजें',
    openMenu: 'मेनू खोलें',
    closeMenu: 'मेनू बंद करें',
    pause: 'स्लाइड शो रोकें',
    play: 'स्लाइड शो चलाएँ',
    map: 'नक्शा',
  },
};

/** Browser text for the page's language (from <html lang>). */
export const textFor = (htmlLang: string) => clientText[(htmlLang.slice(0, 2) as 'en' | 'or' | 'hi')] ?? en;
