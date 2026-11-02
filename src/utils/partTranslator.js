const PHRASE_DICTIONARY = [
  [/фильтр\s+маслян(?:ый|ого|ом)/i, 'Oil filter'],
  [/фильтр\s+воздушн(?:ый|ого|ом)/i, 'Air filter'],
  [/фильтр\s+салонн(?:ый|ого|ом)/i, 'Cabin air filter'],
  [/фильтр\s+топливн(?:ый|ого|ом)/i, 'Fuel filter'],
  [/фильтр\s+акпп/i, 'Automatic transmission filter'],
  [/фильтр\s+гидравлическ(?:ий|ого)/i, 'Hydraulic filter'],
  [/фильтр/i, 'Filter'],
  [/колодки\s+тормозн(?:ые|ых)\s+дисков(?:ые|ых)/i, 'Disc brake pads'],
  [/колодки\s+тормозн(?:ые|ых)\s+барабанн(?:ые|ых)/i, 'Brake drum shoes'],
  [/колодки\s+тормозн(?:ые|ых)/i, 'Brake pads'],
  [/диск\s+тормозн(?:ой|ого|ые)/i, 'Brake disc / rotor'],
  [/барабан\s+тормозн(?:ой|ого)/i, 'Brake drum'],
  [/суппорт\s+тормозн(?:ой|ого)/i, 'Brake caliper'],
  [/цилиндр\s+тормозн(?:ой|ого)/i, 'Brake cylinder'],
  [/шланг\s+тормозн(?:ой|ого)/i, 'Brake hose'],
  [/стойка\s+стабилизатор(?:а|ов)/i, 'Stabilizer sway bar link'],
  [/втулка\s+стабилизатор(?:а|ов)/i, 'Stabilizer bushing'],
  [/тяга\s+стабилизатор(?:а|ов)/i, 'Stabilizer link'],
  [/стабилизатор\s+поперечн(?:ой|ый)/i, 'Anti-roll bar'],
  [/амортизатор\s+подвеск(?:и|а)/i, 'Shock absorber'],
  [/амортизатор/i, 'Shock absorber'],
  [/опора\s+амортизатор(?:а|ов)/i, 'Strut mount'],
  [/пружина\s+подвеск(?:и|а)/i, 'Suspension coil spring'],
  [/рычаг\s+подвеск(?:и|а)/i, 'Suspension control arm'],
  [/рычаг\s+поперечн(?:ый|ого)/i, 'Transverse control arm'],
  [/рычаг\s+продольн(?:ый|ого)/i, 'Trailing arm'],
  [/рычаг/i, 'Control arm'],
  [/шаровая\s+опора/i, 'Ball joint'],
  [/сайлентблок/i, 'Silent block / Bushing'],
  [/рулев(?:ой|ая|ая)\s+рейк(?:а|и)/i, 'Steering rack'],
  [/наконечник\s+рулев(?:ой|ого)\s+тяг(?:и|а)/i, 'Tie rod end'],
  [/рулев(?:ой|ая)\s+наконечник/i, 'Tie rod end'],
  [/тяга\s+рулев(?:ая|ой)/i, 'Tie rod'],
  [/подшипник\s+ступиц(?:ы|а)/i, 'Wheel bearing kit'],
  [/ступица\s+колес(?:а|ная)/i, 'Wheel hub assembly'],
  [/комплект\s+ремн(?:я|ей)\s+грм/i, 'Timing belt kit'],
  [/комплект\s+грм/i, 'Timing belt kit'],
  [/ремень\s+грм/i, 'Timing belt'],
  [/ремень\s+поликлинов(?:ой|ый)/i, 'Serpentine V-ribbed belt'],
  [/ремень\s+генератор(?:а|ный)/i, 'Alternator drive belt'],
  [/ремень\s+приводн(?:ой|ый)/i, 'Drive belt'],
  [/ролик\s+натяжител(?:я|ь)/i, 'Belt tensioner pulley'],
  [/ролик\s+обводн(?:ой|ый)/i, 'Idler pulley'],
  [/ролик\s+паразитн(?:ый|ого)/i, 'Deflection guide pulley'],
  [/натяжитель\s+цеп(?:и|ей)/i, 'Chain tensioner'],
  [/цепь\s+грм/i, 'Timing chain'],
  [/помпа\s+водян(?:ая|ой)/i, 'Water pump'],
  [/насос\s+водян(?:ой|ая)/i, 'Water pump'],
  [/насос\s+маслян(?:ый|ого)/i, 'Oil pump'],
  [/насос\s+топливн(?:ый|ого)/i, 'Fuel pump'],
  [/термостат/i, 'Thermostat'],
  [/радиатор\s+охлажден(?:ия|ие)/i, 'Engine cooling radiator'],
  [/радиатор\s+кондиционер(?:а|ный)/i, 'A/C condenser'],
  [/радиатор\s+отопител(?:я|ь)|радиатор\s+печк(?:и|а)/i, 'Heater core radiator'],
  [/компрессор\s+кондиционер(?:а)/i, 'A/C compressor'],
  [/бачок\s+расширительн(?:ый|ого)/i, 'Coolant expansion tank'],
  [/патрубок\s+радиатор(?:а)/i, 'Radiator hose'],
  [/свеча\s+зажиган(?:ия|ие)/i, 'Spark plug'],
  [/свеча\s+накаливан(?:ия|ие)/i, 'Glow plug'],
  [/катушка\s+зажиган(?:ия|ие)/i, 'Ignition coil'],
  [/провода\s+высоковольтн(?:ые|ых)/i, 'High-voltage spark plug wires'],
  [/генератор/i, 'Alternator'],
  [/стартер/i, 'Starter motor'],
  [/лямбда-зонд/i, 'Lambda oxygen sensor'],
  [/датчик\s+кислородн(?:ый|ого)/i, 'Oxygen sensor'],
  [/датчик\s+коленвал(?:а|ьного)/i, 'Crankshaft position sensor'],
  [/датчик\s+распредвал(?:а)/i, 'Camshaft position sensor'],
  [/датчик\s+абс|датчик\s+abs/i, 'ABS wheel speed sensor'],
  [/датчик\s+давлен(?:ия|ие)/i, 'Pressure sensor'],
  [/датчик\s+температур(?:ы)/i, 'Temperature sensor'],
  [/датчик\s+детонац(?:ии)/i, 'Knock sensor'],
  [/датчик/i, 'Sensor'],
  [/комплект\s+сцеплен(?:ия|ие)/i, 'Clutch kit'],
  [/диск\s+сцеплен(?:ия|ие)/i, 'Clutch disc'],
  [/корзина\s+сцеплен(?:ия|ие)/i, 'Clutch pressure plate'],
  [/подшипник\s+выжимн(?:ой|ого)/i, 'Clutch release bearing'],
  [/шрус\s+наружн(?:ый|ого)/i, 'Outer CV joint'],
  [/шрус\s+внутренн(?:ий|его)/i, 'Inner CV joint'],
  [/шрус/i, 'CV joint'],
  [/пыльник\s+шрус(?:а)/i, 'CV boot'],
  [/пыльник\s+рулев(?:ой)/i, 'Steering rack boot'],
  [/пыльник/i, 'Dust boot'],
  [/привод\s+колес(?:а)/i, 'Drive shaft axle'],
  [/прокладка\s+гбц/i, 'Cylinder head gasket (CHG)'],
  [/прокладка\s+клапанн(?:ой|ая)\s+крышк(?:и|а)/i, 'Valve cover gasket'],
  [/прокладка\s+поддон(?:а)/i, 'Oil pan sump gasket'],
  [/прокладка\s+впускн(?:ого|ой)\s+коллектор(?:а)/i, 'Intake manifold gasket'],
  [/прокладка\s+выпускн(?:ого|ой)\s+коллектор(?:а)/i, 'Exhaust manifold gasket'],
  [/комплект\s+прокладок/i, 'Gasket set'],
  [/прокладка/i, 'Gasket'],
  [/сальник\s+коленвал(?:а)/i, 'Crankshaft oil seal'],
  [/сальник\s+распредвал(?:а)/i, 'Camshaft oil seal'],
  [/сальник/i, 'Oil seal'],
  [/кольцо\s+уплотнительн(?:ое|ых)/i, 'O-ring sealing ring'],
  [/щетка\s+стеклоочистител(?:я|ь)|щетки\s+стеклоочистител(?:я|ей)/i, 'Wiper blade(s)'],
  [/фара\s+основн(?:ого|ая)|фара\s+передн(?:яя)/i, 'Headlight assembly'],
  [/фонарь\s+задн(?:ий)/i, 'Rear tail light'],
  [/фара\s+противотуманн(?:ая)/i, 'Fog light lamp'],
  [/лампа\s+галогенн(?:ая)/i, 'Halogen lamp bulb'],
  [/лампа\s+накаливан(?:ия)/i, 'Incandescent bulb'],
  [/лампа/i, 'Lamp / Bulb'],
  [/зеркало\s+боков(?:ое)/i, 'Side wing mirror'],
  [/ручка\s+двер(?:и)/i, 'Door handle'],
  [/глушитель/i, 'Exhaust muffler'],
  [/катализатор/i, 'Catalytic converter']
];

const WORD_MODIFIERS = [
  [/\bпередн(?:ий|яя|ее|ие|их|ем)\b/gi, 'front'],
  [/\bзадн(?:ий|яя|ее|ие|их|ем)\b/gi, 'rear'],
  [/\bлев(?:ый|ая|ое|ые|ых|ом)\b/gi, 'LH (left)'],
  [/\bправ(?:ый|ая|ое|ые|ых|ом)\b/gi, 'RH (right)'],
  [/\bверхн(?:ий|яя|ее|ие|их|ем)\b/gi, 'upper'],
  [/\bнижн(?:ий|яя|ее|ие|их|ем)\b/gi, 'lower'],
  [/\bвнутренн(?:ий|яя|ее|ие|их|ем)\b/gi, 'inner'],
  [/\bнаружн(?:ый|ая|ое|ые|ых|ом)\b/gi, 'outer'],
  [/\bсредн(?:ий|яя|ее|ие|их|ем)\b/gi, 'middle'],
  [/\bкомплект\b/gi, 'kit'],
  [/\bуниверсальн(?:ый|ая|ое|ые)\b/gi, 'universal'],
  [/\bусиленн(?:ый|ая|ое|ые)\b/gi, 'reinforced'],
  [/\bмаслян(?:ый|ая|ое|ые)\b/gi, 'oil'],
  [/\bвоздушн(?:ый|ая|ое|ые)\b/gi, 'air'],
  [/\bтопливн(?:ый|ая|ое|ые)\b/gi, 'fuel'],
  [/\bтормозн(?:ой|ая|ое|ые)\b/gi, 'brake'],
  [/\bводян(?:ой|ая|ое|ые)\b/gi, 'water']
];

const RUS_TO_LAT = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
  'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
  'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
  'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
};

function transliterate(str) {
  return str.replace(/[а-яё]/gi, (char) => {
    const isUpper = char === char.toUpperCase();
    const lat = RUS_TO_LAT[char.toLowerCase()] || char;
    return isUpper ? lat.charAt(0).toUpperCase() + lat.slice(1) : lat;
  });
}

export function translatePartName(rawName, currentLanguage = 'ru') {
  if (!rawName || typeof rawName !== 'string') {
    return '';
  }

  if (currentLanguage !== 'en') {
    return rawName;
  }

  let result = rawName.trim();
  let matchedPhrase = false;

  for (const [regex, replacement] of PHRASE_DICTIONARY) {
    if (regex.test(result)) {
      result = result.replace(regex, replacement);
      matchedPhrase = true;
      break;
    }
  }

  for (const [regex, replacement] of WORD_MODIFIERS) {
    result = result.replace(regex, replacement);
  }

  if (/[а-яё]/i.test(result)) {
    if (!matchedPhrase) {
      result = transliterate(result);
    }
  }

  result = result.replace(/\s+/g, ' ').trim();
  return result.charAt(0).toUpperCase() + result.slice(1);
}
