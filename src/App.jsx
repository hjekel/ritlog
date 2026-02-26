import React, { useState, useEffect, useRef } from 'react';

// Vertalingen
const TRANSLATIONS = {
  nl: {
    maanden: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
    dagen: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
    dagenKort: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
    ritten: 'ritten',
    rit: 'Rit',
    log: 'Log',
    backup: 'Backup',
    nieuweRit: 'Nieuwe Rit',
    bewerkRit: 'Rit bewerken',
    tipGebruikSpraak: 'Tip: Gebruik spraak!',
    tipTekst: 'Tik op het Route veld en gebruik de',
    tipToetsenbord: 'op je toetsenbord',
    tipVoorbeeld: 'Zeg bijv: "Amsterdam Utrecht Ede 120 km 66 euro"',
    perKm: 'Per km',
    perUur: 'Per uur',
    datum: 'Datum',
    route: 'Route',
    routePlaceholder: 'bijv: Amsterdam - Utrecht - Ede',
    routeLabel: 'Route (zonder Houten)',
    km: 'KM',
    bedrag: 'Bedrag',
    uren: 'Uren',
    toevoegen: 'Toevoegen',
    opslaan: 'Opslaan',
    annuleren: 'Annuleren',
    verwijderen: 'Verwijderen',
    geenRitten: 'Geen ritten deze maand',
    eersteRit: 'Eerste rit',
    exclBTW: 'Excl. BTW:',
    btwLabel: 'BTW 21%:',
    inclBTW: 'Incl. BTW:',
    backupDownloaden: 'Backup downloaden',
    backupHerstellen: 'Backup herstellen',
    kiesBestand: 'Kies JSON bestand...',
    tips: 'Tips:',
    tipExcel: 'open in Excel of Google Sheets',
    tipJSON: 'alleen voor herstel in de app',
    tarieven: 'Tarieven:',
    uurloon: 'Uurloon',
    geenKorting: 'geen korting',
    naCorrectie: 'Na 6% correctie',
    recenteActiviteit: 'Recente activiteit',
    herstel: 'Herstel',
    toegevoegd: 'TOEGEVOEGD',
    verwijderd: 'VERWIJDERD',
    gewijzigd: 'GEWIJZIGD',
    vulRouteIn: 'Vul een route in',
    konNietBerekenen: 'Kon bedrag niet berekenen',
    bevestigVerwijderen: 'Verwijderen?',
    kalender: 'Kalender',
    gewerkt: 'Gewerkt',
    nietGewerkt: 'Niet gewerkt',
    totaal: 'Totaal',
    tikOmTeBewerken: 'Tik op een rit om te bewerken',
    gisteren: 'Gisteren',
    vandaag: 'Vandaag',
    weekend: 'Weekend',
    checkMaps: 'Check km in Google Maps',
    gebruiksaanwijzing: 'Gebruiksaanwijzing',
    hulpRitToevoegen: 'Vul route in → klik "Check km in Google Maps" → vul km in → bedrag wordt berekend',
    hulpGoogleMaps: 'Opent Google Maps met jouw route, lees daar de kilometers af',
    hulpRitBewerken: 'Tik op een rit in Log om aan te passen',
    hulpRitVerwijderen: 'In bewerk-scherm onderaan',
    hulpFactuur: 'Log → CSV of PDF knop aan einde van de maand',
    hulpBackup: 'Regelmatig JSON downloaden voor herstel',
    hulpKalender: 'Groen = gewerkt, Rood = niet gewerkt'
  },
  en: {
    maanden: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dagen: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dagenKort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    ritten: 'trips',
    rit: 'Trip',
    log: 'Log',
    backup: 'Backup',
    nieuweRit: 'New Trip',
    bewerkRit: 'Edit trip',
    tipGebruikSpraak: 'Tip: Use voice!',
    tipTekst: 'Tap the Route field and use the',
    tipToetsenbord: 'on your keyboard',
    tipVoorbeeld: 'Say e.g.: "Amsterdam Utrecht Ede 120 km 66 euro"',
    perKm: 'Per km',
    perUur: 'Per hour',
    datum: 'Date',
    route: 'Route',
    routePlaceholder: 'e.g.: Amsterdam - Utrecht - Ede',
    routeLabel: 'Route (without Houten)',
    km: 'KM',
    bedrag: 'Amount',
    uren: 'Hours',
    toevoegen: 'Add',
    opslaan: 'Save',
    annuleren: 'Cancel',
    verwijderen: 'Delete',
    geenRitten: 'No trips this month',
    eersteRit: 'First trip',
    exclBTW: 'Excl. VAT:',
    btwLabel: 'VAT 21%:',
    inclBTW: 'Incl. VAT:',
    backupDownloaden: 'Download backup',
    backupHerstellen: 'Restore backup',
    kiesBestand: 'Choose JSON file...',
    tips: 'Tips:',
    tipExcel: 'open in Excel or Google Sheets',
    tipJSON: 'only for restore in the app',
    tarieven: 'Rates:',
    uurloon: 'Hourly',
    geenKorting: 'no discount',
    naCorrectie: 'After 6% correction',
    recenteActiviteit: 'Recent activity',
    herstel: 'Restore',
    toegevoegd: 'ADDED',
    verwijderd: 'DELETED',
    gewijzigd: 'EDITED',
    vulRouteIn: 'Enter a route',
    konNietBerekenen: 'Could not calculate amount',
    bevestigVerwijderen: 'Delete?',
    kalender: 'Calendar',
    gewerkt: 'Worked',
    nietGewerkt: 'Not worked',
    totaal: 'Total',
    tikOmTeBewerken: 'Tap a trip to edit',
    gisteren: 'Yesterday',
    vandaag: 'Today',
    weekend: 'Weekend',
    checkMaps: 'Check km in Google Maps',
    gebruiksaanwijzing: 'How to use',
    hulpRitToevoegen: 'Enter route → click "Check km in Google Maps" → enter km → amount is calculated',
    hulpGoogleMaps: 'Opens Google Maps with your route, read the kilometers there',
    hulpRitBewerken: 'Tap a trip in Log to edit',
    hulpRitVerwijderen: 'At the bottom of edit screen',
    hulpFactuur: 'Log → CSV or PDF button at end of month',
    hulpBackup: 'Download JSON regularly for backup',
    hulpKalender: 'Green = worked, Red = not worked'
  }
};

// Tarieven (uit analyse declaraties)
const TARIEF_PER_KM = 0.55;
const TARIEF_PER_UUR = 32;

// Afstanden vanaf Houten (enkele reis in km)
const AFSTANDEN = {
  'amsterdam': 45, 'utrecht': 12, 'rotterdam': 65, 'den haag': 70, 'eindhoven': 85,
  'arnhem': 55, 'nijmegen': 70, 'amersfoort': 25, 'almere': 50, 'apeldoorn': 65,
  'ede': 40, 'veenendaal': 20, 'zeist': 8, 'driebergen': 8, 'doorn': 12,
  'woerden': 20, 'nieuwegein': 8, 'ijsselstein': 12, 'vianen': 15, 'culemborg': 20,
  'tiel': 35, 'gorinchem': 40, 'dordrecht': 55, 'breda': 75, 'tilburg': 80,
  'den bosch': 50, 's-hertogenbosch': 50, 'zwolle': 85, 'deventer': 75, 'enschede': 120,
  'hengelo': 115, 'almelo': 105, 'groningen': 185, 'leeuwarden': 145, 'assen': 160,
  'emmen': 165, 'meppel': 115, 'lelystad': 65, 'harderwijk': 55, 'nunspeet': 65,
  'hilversum': 30, 'bussum': 35, 'naarden': 40, 'huizen': 45,
  'soest': 20, 'baarn': 20, 'bilthoven': 12, 'de bilt': 10, 'bunnik': 5,
  'wijk bij duurstede': 15, 'rhenen': 25, 'wageningen': 35,
  'barneveld': 45, 'putten': 55, 'ermelo': 60,
  'kampen': 90, 'steenwijk': 115, 'heerenveen': 130, 'drachten': 140,
  'sneek': 125, 'joure': 120, 'emmeloord': 85,
  'leiden': 55, 'haarlem': 55, 'zaandam': 50, 'purmerend': 60, 'hoorn': 70,
  'alkmaar': 80, 'hoofddorp': 50, 'amstelveen': 45, 'uithoorn': 40,
  'alphen aan den rijn': 45, 'gouda': 40, 'zoetermeer': 55,
  'delft': 65, 'vlaardingen': 70,
  'roosendaal': 95, 'bergen op zoom': 100,
  'venlo': 120, 'roermond': 130, 'maastricht': 175,
  'helmond': 90, 'oss': 60, 'uden': 70,
  'doetinchem': 70, 'zutphen': 65,
  'rijssen': 95, 'denekamp': 130,
  'dokkum': 165, 'workum': 125,
  'hoogeveen': 140, 'hardenberg': 125,
  'giethoorn': 100, 'beilen': 150, 'gieten': 180,
  'zuidhorn': 175, 'spaubeek': 165, 'milsbeek': 110, 'rockanje': 85,
  'geldermalsen': 25, 'beuningen': 65, 'heteren': 50, 'opheusden': 35,
  'kockengen': 15, 'maarssen': 15, 'reeuwijk': 35, 'nieuwkoop': 30, 'mijdrecht': 25,
  'benschop': 18, 'krimpen': 50, 'ulvenhout': 80, 'wijchen': 65, 'heiloo': 70, 'limmen': 65
};

// VW Caddy SVG Icon
const CaddyIcon = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    <path d="M8 38 L8 28 Q8 24 12 24 L18 24 L22 18 Q24 16 28 16 L44 16 Q48 16 50 18 L54 24 L56 24 Q60 24 60 28 L60 38 Q60 40 58 40 L56 40 L56 42 Q56 46 52 46 L50 46 Q46 46 46 42 L46 40 L22 40 L22 42 Q22 46 18 46 L16 46 Q12 46 12 42 L12 40 L10 40 Q6 40 8 38 Z M14 30 L14 34 Q14 36 16 36 L20 36 Q22 36 22 34 L22 28 L16 28 Q14 28 14 30 Z M26 28 L26 36 L42 36 L42 28 Z M46 30 Q46 28 48 28 L52 28 Q54 28 54 30 L54 34 Q54 36 52 36 L48 36 Q46 36 46 34 Z M16 42 Q16 44 18 44 Q20 44 20 42 Q20 40 18 40 Q16 40 16 42 Z M48 42 Q48 44 50 44 Q52 44 52 42 Q52 40 50 40 Q48 40 48 42 Z" />
  </svg>
);

// Bereken geschatte kilometers
const berekenKilometers = (route) => {
  if (!route) return null;
  const routeLower = route.toLowerCase();
  let gevonden = [];
  Object.entries(AFSTANDEN).forEach(([plaats, km]) => {
    if (routeLower.includes(plaats)) gevonden.push({ plaats, km });
  });
  if (gevonden.length === 0) return null;
  gevonden.sort((a, b) => b.km - a.km);
  const verste = gevonden[0].km;
  const extra = gevonden.length > 1 ? (gevonden.length - 1) * 15 : 0;
  return Math.round((verste * 2) + extra);
};

// Kalender component
const Kalender = ({ maand, jaar, ritten, t, darkMode, primaryColor }) => {
  const eersteDag = new Date(jaar, maand, 1);
  const laatsteDag = new Date(jaar, maand + 1, 0);
  const aantalDagen = laatsteDag.getDate();
  const startDag = eersteDag.getDay();
  
  const ritDagen = new Set(ritten.map(r => r.dagNummer));
  
  const weken = [];
  let week = [];
  
  for (let i = 0; i < startDag; i++) {
    week.push(null);
  }
  
  for (let dag = 1; dag <= aantalDagen; dag++) {
    week.push(dag);
    if (week.length === 7) {
      weken.push(week);
      week = [];
    }
  }
  
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weken.push(week);
  }
  
  const vandaag = new Date();
  const isHuidigeMaand = vandaag.getMonth() === maand && vandaag.getFullYear() === jaar;
  const vandaagDag = vandaag.getDate();
  
  return (
    <div className="rounded-xl shadow overflow-hidden mb-4" style={{background: darkMode ? '#16213e' : 'white'}}>
      <div className="p-3 border-b" style={{borderColor: darkMode ? '#374151' : '#e5e7eb'}}>
        <div className="font-bold flex items-center gap-2" style={{color: primaryColor}}>
          📅 {t.kalender}
        </div>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {t.dagenKort.map((dag, i) => (
            <div key={i} className={`text-center text-xs font-medium ${i === 0 || i === 6 ? 'opacity-60' : ''}`} style={{color: darkMode ? '#9ca3af' : '#6b7280'}}>
              {dag}
            </div>
          ))}
        </div>
        {weken.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
            {week.map((dag, di) => {
              if (!dag) return <div key={di} className="h-8" />;
              
              const heeftRit = ritDagen.has(dag);
              const isVandaag = isHuidigeMaand && dag === vandaagDag;
              const isVerleden = new Date(jaar, maand, dag) < new Date(vandaag.getFullYear(), vandaag.getMonth(), vandaag.getDate());
              const isWeekend = di === 0 || di === 6; // Zondag of Zaterdag
              
              return (
                <div 
                  key={di} 
                  className={`h-8 rounded flex items-center justify-center text-sm relative ${isVandaag ? 'ring-2 ring-offset-1' : ''}`}
                  style={{
                    background: heeftRit ? '#22c55e' : (isVerleden ? (isWeekend ? '#f87171' : '#ef4444') : (darkMode ? '#374151' : (isWeekend ? '#e5e7eb' : '#f3f4f6'))),
                    color: heeftRit || isVerleden ? 'white' : (darkMode ? '#e4e4e7' : '#374151'),
                    ringColor: primaryColor,
                    opacity: isWeekend && !heeftRit && !isVerleden ? 0.7 : 1
                  }}
                >
                  {dag}
                </div>
              );
            })}
          </div>
        ))}
        <div className="flex justify-center gap-4 mt-3 text-xs" style={{color: darkMode ? '#9ca3af' : '#6b7280'}}>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-green-500"></span> {t.gewerkt}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-red-500"></span> {t.nietGewerkt}
          </span>
        </div>
      </div>
    </div>
  );
};

// Edit Modal Component
const EditModal = ({ rit, onSave, onCancel, onDelete, t, darkMode, primaryColor, lang }) => {
  const [editData, setEditData] = useState({
    datum: rit.datum,
    ritNummer: rit.ritNummer,
    route: rit.route,
    kilometers: rit.kilometers || '',
    totaalBedrag: rit.totaalBedrag || '',
    isUurloon: rit.isUurloon || false,
    uren: rit.uren || ''
  });

  const cardBg = darkMode ? '#16213e' : 'white';
  const textColor = darkMode ? '#e4e4e7' : 'inherit';
  const textMuted = darkMode ? '#a1a1aa' : '#6b7280';
  const borderColor = darkMode ? '#374151' : '#e5e7eb';

  // Bereken preview bedrag
  let previewBedrag = null;
  if (editData.isUurloon) {
    const uren = parseFloat(editData.uren) || 0;
    if (uren > 0) previewBedrag = uren * TARIEF_PER_UUR;
  } else {
    const km = parseInt(editData.kilometers) || 0;
    if (km > 0) previewBedrag = km * TARIEF_PER_KM;
  }

  const handleSave = () => {
    if (!editData.route) { alert(t.vulRouteIn); return; }
    
    let totaalBedrag, correctie;
    if (editData.isUurloon) {
      totaalBedrag = editData.totaalBedrag ? parseFloat(editData.totaalBedrag) : previewBedrag;
      correctie = totaalBedrag;
    } else {
      totaalBedrag = editData.totaalBedrag ? parseFloat(editData.totaalBedrag) : previewBedrag;
      correctie = Math.round(totaalBedrag * 0.94 * 100) / 100;
    }
    
    if (!totaalBedrag) { alert(t.konNietBerekenen); return; }
    
    const datum = new Date(editData.datum);
    const DAGEN_NL = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    
    onSave({
      ...rit,
      datum: editData.datum,
      dagNaam: DAGEN_NL[datum.getDay()],
      dagNummer: datum.getDate(),
      maand: datum.getMonth(),
      jaar: datum.getFullYear(),
      ritNummer: parseInt(editData.ritNummer) || 1,
      route: editData.route,
      kilometers: editData.isUurloon ? null : (parseInt(editData.kilometers) || null),
      totaalBedrag,
      correctie,
      isUurloon: editData.isUurloon,
      uren: editData.isUurloon ? parseFloat(editData.uren) : null
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onCancel}>
      <div 
        className="rounded-xl shadow-lg p-4 w-full max-w-md max-h-[90vh] overflow-y-auto" 
        style={{background: cardBg, color: textColor}}
        onClick={e => e.stopPropagation()}
      >
        <div className="font-bold text-lg mb-4 flex items-center gap-2" style={{color: primaryColor}}>
          ✏️ {t.bewerkRit}
        </div>
        
        {/* Per km / Per uur toggle */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setEditData({...editData, isUurloon: false})}
            className={`flex-1 py-2 rounded-lg font-medium text-sm ${!editData.isUurloon ? 'text-white' : ''}`}
            style={{background: !editData.isUurloon ? primaryColor : (darkMode ? '#374151' : '#f3f4f6'), color: !editData.isUurloon ? 'white' : textColor}}>
            {t.perKm} (€{TARIEF_PER_KM}/km)
          </button>
          <button onClick={() => setEditData({...editData, isUurloon: true})}
            className={`flex-1 py-2 rounded-lg font-medium text-sm ${editData.isUurloon ? 'text-white' : ''}`}
            style={{background: editData.isUurloon ? primaryColor : (darkMode ? '#374151' : '#f3f4f6'), color: editData.isUurloon ? 'white' : textColor}}>
            {t.perUur} (€{TARIEF_PER_UUR}/{lang === 'nl' ? 'u' : 'h'})
          </button>
        </div>
        
        <div className="space-y-3">
          {/* Datum en Rit # */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs block mb-1" style={{color: textMuted}}>{t.datum}</label>
              <input type="date" value={editData.datum} onChange={e => setEditData({...editData, datum: e.target.value})} 
                className="w-full border rounded-lg p-2" 
                style={{background: darkMode ? '#374151' : 'white', color: textColor, borderColor}} />
            </div>
            <div>
              <label className="text-xs block mb-1" style={{color: textMuted}}>{t.rit} #</label>
              <input type="number" min="1" value={editData.ritNummer} onChange={e => setEditData({...editData, ritNummer: e.target.value})} 
                className="w-full border rounded-lg p-2"
                style={{background: darkMode ? '#374151' : 'white', color: textColor, borderColor}} />
            </div>
          </div>
          
          {/* Route */}
          <div>
            <label className="text-xs block mb-1" style={{color: textMuted}}>{t.route}</label>
            <input type="text" value={editData.route} onChange={e => setEditData({...editData, route: e.target.value})} 
              className="w-full border rounded-lg p-2"
              style={{background: darkMode ? '#374151' : 'white', color: textColor, borderColor}} />
          </div>
          
          {/* KM en Bedrag OF Uren en Bedrag */}
          {!editData.isUurloon ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs block mb-1" style={{color: textMuted}}>{t.km}</label>
                <input type="number" value={editData.kilometers} onChange={e => setEditData({...editData, kilometers: e.target.value})} 
                  className="w-full border rounded-lg p-2"
                  style={{background: darkMode ? '#374151' : 'white', color: textColor, borderColor}} />
              </div>
              <div>
                <label className="text-xs block mb-1" style={{color: textMuted}}>{t.bedrag} €</label>
                <input type="number" step="0.01" value={editData.totaalBedrag} onChange={e => setEditData({...editData, totaalBedrag: e.target.value})} 
                  placeholder={previewBedrag ? previewBedrag.toFixed(2) : ''}
                  className="w-full border rounded-lg p-2"
                  style={{background: darkMode ? '#374151' : 'white', color: textColor, borderColor}} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs block mb-1" style={{color: textMuted}}>{t.uren}</label>
                <input type="number" step="0.25" value={editData.uren} onChange={e => setEditData({...editData, uren: e.target.value})} 
                  className="w-full border rounded-lg p-2"
                  style={{background: darkMode ? '#374151' : 'white', color: textColor, borderColor}} />
              </div>
              <div>
                <label className="text-xs block mb-1" style={{color: textMuted}}>{t.bedrag} €</label>
                <input type="number" step="0.01" value={editData.totaalBedrag} onChange={e => setEditData({...editData, totaalBedrag: e.target.value})} 
                  placeholder={previewBedrag ? previewBedrag.toFixed(2) : ''}
                  className="w-full border rounded-lg p-2"
                  style={{background: darkMode ? '#374151' : 'white', color: textColor, borderColor}} />
              </div>
            </div>
          )}
          
          {/* Preview */}
          {(previewBedrag || editData.totaalBedrag) && (
            <div className={`text-center py-2 rounded-lg text-sm font-medium ${editData.isUurloon ? (darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700') : (darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700')}`}>
              {editData.isUurloon 
                ? `💰 ${t.uurloon}: €${(parseFloat(editData.totaalBedrag) || previewBedrag || 0).toFixed(0)} (${t.geenKorting})` 
                : `💰 ${t.naCorrectie}: €${((parseFloat(editData.totaalBedrag) || previewBedrag || 0) * 0.94).toFixed(0)}`
              }
            </div>
          )}
        </div>
        
        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button onClick={onCancel} className="flex-1 py-3 rounded-lg border font-medium" style={{borderColor, color: textMuted}}>
            {t.annuleren}
          </button>
          <button onClick={handleSave} className="flex-1 py-3 rounded-lg text-white font-medium" style={{background: primaryColor}}>
            ✓ {t.opslaan}
          </button>
        </div>
        
        {/* Delete button */}
        <button onClick={onDelete} className="w-full mt-2 py-2 rounded-lg text-red-500 border border-red-300 font-medium text-sm">
          🗑️ {t.verwijderen}
        </button>
      </div>
    </div>
  );
};

export default function RitLogApp() {
  const [ritten, setRitten] = useState([]);
  const [logboek, setLogboek] = useState([]);
  const [huidigeMaand, setHuidigeMaand] = useState(new Date().getMonth());
  const [huidigJaar, setHuidigJaar] = useState(new Date().getFullYear());
  const [view, setView] = useState('invoer');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');
  const [editingRit, setEditingRit] = useState(null);
  
  // Taal en thema
  const [lang, setLang] = useState(() => localStorage.getItem('ritlog-lang') || 'nl');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('ritlog-dark') === 'true');
  const t = TRANSLATIONS[lang];
  
  const [nieuwRit, setNieuwRit] = useState({
    datum: new Date().toISOString().split('T')[0],
    ritNummer: 1,
    route: '',
    kilometers: '',
    totaalBedrag: '',
    isUurloon: false,
    uren: ''
  });
  
  const [geschatteKm, setGeschatteKm] = useState(null);
  const [geschatBedrag, setGeschatBedrag] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => { loadData(); }, []);
  
  useEffect(() => {
    localStorage.setItem('ritlog-lang', lang);
  }, [lang]);
  
  useEffect(() => {
    localStorage.setItem('ritlog-dark', darkMode);
  }, [darkMode]);
  
  useEffect(() => {
    if (nieuwRit.isUurloon) {
      const uren = parseFloat(nieuwRit.uren) || 0;
      if (uren > 0) {
        setGeschatBedrag(Math.round(uren * TARIEF_PER_UUR * 100) / 100);
      } else {
        setGeschatBedrag(null);
      }
      setGeschatteKm(null);
    } else {
      const kmSchatting = berekenKilometers(nieuwRit.route);
      setGeschatteKm(kmSchatting);
      
      const km = nieuwRit.kilometers ? parseInt(nieuwRit.kilometers) : kmSchatting;
      if (km) {
        setGeschatBedrag(Math.round(km * TARIEF_PER_KM * 100) / 100);
      } else {
        setGeschatBedrag(null);
      }
    }
  }, [nieuwRit.route, nieuwRit.kilometers, nieuwRit.isUurloon, nieuwRit.uren]);

  const loadData = async () => {
    setLoading(true);
    try {
      const saved = localStorage.getItem('ritlog-data-v3');
      if (saved) {
        const data = JSON.parse(saved);
        setRitten(data.ritten || []);
        setLogboek(data.logboek || []);
      }
    } catch (e) { console.log('Start nieuw'); }
    setLoading(false);
  };

  const saveData = async (newRitten, newLogboek) => {
    setSaveStatus('💾');
    try {
      localStorage.setItem('ritlog-data-v3', JSON.stringify({ ritten: newRitten, logboek: newLogboek }));
      setSaveStatus('✓');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (e) { setSaveStatus('⚠'); }
  };

  const cleanRoute = (route) => {
    let cleaned = route;
    ['dpp', 'sorgente', 'amp', 'brink', 'amp laden'].forEach(loc => {
      cleaned = cleaned.replace(new RegExp(`\\b${loc}\\b`, 'gi'), 'Houten');
    });
    ['binderij van wijk laden', 'postnl', 'stansmessen', 'vp'].forEach(loc => {
      cleaned = cleaned.replace(new RegExp(`\\b${loc}\\b`, 'gi'), '');
    });
    cleaned = cleaned.replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
    cleaned = cleaned.replace(/\s*-\s*/g, '-').replace(/-+/g, '-').replace(/^-/, '').replace(/-$/, '');
    if (!cleaned.toLowerCase().startsWith('houten')) cleaned = 'Houten-' + cleaned;
    if (!cleaned.toLowerCase().endsWith('houten')) cleaned = cleaned + '-Houten';
    return cleaned.replace(/Houten-Houten/gi, 'Houten');
  };

  // Datum helpers
  const getVandaag = () => new Date().toISOString().split('T')[0];
  const getGisteren = () => {
    const gisteren = new Date();
    gisteren.setDate(gisteren.getDate() - 1);
    return gisteren.toISOString().split('T')[0];
  };

  // Bereken volgende ritnummer voor een bepaalde datum
  const getVolgendeRitNummer = (datum) => {
    const datumObj = new Date(datum);
    const maand = datumObj.getMonth();
    const jaar = datumObj.getFullYear();
    const dag = datumObj.getDate();
    
    // Vind ritten van dezelfde dag
    const rittenVandaag = ritten.filter(r => 
      r.maand === maand && r.jaar === jaar && r.dagNummer === dag
    );
    
    if (rittenVandaag.length > 0) {
      // Er zijn al ritten vandaag, pak het hoogste nummer + 1
      const hoogsteNummer = Math.max(...rittenVandaag.map(r => r.ritNummer));
      return hoogsteNummer + 1;
    }
    
    // Geen ritten vandaag, begin bij 1
    return 1;
  };

  // Handler voor datum wijziging met automatische rit# reset
  const handleDatumChange = (nieuweDatum) => {
    const volgendeNummer = getVolgendeRitNummer(nieuweDatum);
    setNieuwRit({...nieuwRit, datum: nieuweDatum, ritNummer: volgendeNummer});
  };

  // Open Google Maps met route voor km check
  const openGoogleMaps = () => {
    if (!nieuwRit.route) return;
    
    // Maak route string: Houten als start en eind
    const routeParts = nieuwRit.route
      .split(/[-,\/]/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    // Voeg Houten toe aan begin en eind als niet aanwezig
    const fullRoute = ['Houten', ...routeParts, 'Houten'];
    
    // Bouw Google Maps URL met waypoints
    // Format: /dir/plaats1/plaats2/plaats3/...
    const mapsUrl = 'https://www.google.com/maps/dir/' + fullRoute.map(p => encodeURIComponent(p + ', Nederland')).join('/');
    
    window.open(mapsUrl, '_blank');
  };

  const handleAddRit = async () => {
    if (!nieuwRit.route) { alert(t.vulRouteIn); return; }
    
    const datum = new Date(nieuwRit.datum);
    let totaalBedrag, correctie, kilometers;
    
    if (nieuwRit.isUurloon) {
      const uren = parseFloat(nieuwRit.uren) || 0;
      totaalBedrag = nieuwRit.totaalBedrag ? parseFloat(nieuwRit.totaalBedrag) : geschatBedrag;
      correctie = totaalBedrag;
      kilometers = null;
    } else {
      kilometers = nieuwRit.kilometers ? parseInt(nieuwRit.kilometers) : geschatteKm;
      totaalBedrag = nieuwRit.totaalBedrag ? parseFloat(nieuwRit.totaalBedrag) : geschatBedrag;
      correctie = Math.round(totaalBedrag * 0.94 * 100) / 100;
    }
    
    if (!totaalBedrag) { alert(t.konNietBerekenen); return; }
    
    const DAGEN_NL = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    
    const rit = {
      id: Date.now(),
      datum: nieuwRit.datum,
      dagNaam: DAGEN_NL[datum.getDay()],
      dagNummer: datum.getDate(),
      maand: datum.getMonth(),
      jaar: datum.getFullYear(),
      ritNummer: parseInt(nieuwRit.ritNummer) || 1,
      route: cleanRoute(nieuwRit.route),
      kilometers,
      kmGeschat: !nieuwRit.kilometers && geschatteKm ? true : false,
      totaalBedrag,
      correctie,
      isUurloon: nieuwRit.isUurloon,
      uren: nieuwRit.isUurloon ? parseFloat(nieuwRit.uren) : null
    };
    
    const newRitten = [...ritten, rit].sort((a, b) => a.datum.localeCompare(b.datum) || a.ritNummer - b.ritNummer);
    const newLog = [...logboek, { timestamp: new Date().toISOString(), actie: 'TOEGEVOEGD', details: `${rit.dagNaam} ${rit.dagNummer}: €${rit.correctie.toFixed(0)}` }];
    
    setRitten(newRitten);
    setLogboek(newLog);
    await saveData(newRitten, newLog);
    
    setNieuwRit({ datum: nieuwRit.datum, ritNummer: parseInt(nieuwRit.ritNummer) + 1, route: '', kilometers: '', totaalBedrag: '', isUurloon: false, uren: '' });
    setView('log');
  };

  const handleDeleteRit = async (id) => {
    const rit = ritten.find(r => r.id === id);
    if (!confirm(`${t.bevestigVerwijderen}\n${rit.dagNaam} ${rit.dagNummer}`)) return;
    const newRitten = ritten.filter(r => r.id !== id);
    const newLog = [...logboek, { timestamp: new Date().toISOString(), actie: 'VERWIJDERD', details: `${rit.dagNaam} ${rit.dagNummer}` }];
    setRitten(newRitten);
    setLogboek(newLog);
    await saveData(newRitten, newLog);
    setEditingRit(null);
  };

  const handleEditRit = async (updatedRit) => {
    const newRitten = ritten.map(r => r.id === updatedRit.id ? updatedRit : r)
      .sort((a, b) => a.datum.localeCompare(b.datum) || a.ritNummer - b.ritNummer);
    const newLog = [...logboek, { timestamp: new Date().toISOString(), actie: 'GEWIJZIGD', details: `${updatedRit.dagNaam} ${updatedRit.dagNummer}: €${updatedRit.correctie.toFixed(0)}` }];
    setRitten(newRitten);
    setLogboek(newLog);
    await saveData(newRitten, newLog);
    setEditingRit(null);
  };

  const parseSpraak = (text) => {
    let route = text, km = '', bedrag = '', uren = '';
    const kmMatch = text.match(/(\d+)\s*(kilometer|km)/i);
    if (kmMatch) { km = kmMatch[1]; route = route.replace(kmMatch[0], ''); }
    const euroMatch = text.match(/(\d+[,.]?\d*)\s*(euro|€)/i);
    if (euroMatch) { bedrag = euroMatch[1].replace(',', '.'); route = route.replace(euroMatch[0], ''); }
    const uurMatch = text.match(/(\d+[,.]?\d*)\s*(uur|uren|hour|hours)/i);
    if (uurMatch) { uren = uurMatch[1].replace(',', '.'); route = route.replace(uurMatch[0], ''); }
    route = route.replace(/naar|to/gi, ' - ').trim();
    setNieuwRit(prev => ({ ...prev, route: route || prev.route, kilometers: km || prev.kilometers, totaalBedrag: bedrag || prev.totaalBedrag, uren: uren || prev.uren, isUurloon: uren ? true : prev.isUurloon }));
  };

  const maandRitten = ritten.filter(r => r.maand === huidigeMaand && r.jaar === huidigJaar);
  const totaalExclBTW = maandRitten.reduce((s, r) => s + (r.correctie || 0), 0);
  const btw = totaalExclBTW * 0.21;
  const totaalInclBTW = totaalExclBTW + btw;
  const totaalKM = maandRitten.reduce((s, r) => s + (r.kilometers || 0), 0);

  const exportCSV = () => {
    const maandNaam = t.maanden[huidigeMaand];
    let csv = `${maandNaam},${t.datum},${t.rit},${t.route},${t.km},${t.totaal}\n`;
    maandRitten.forEach(r => csv += `${r.dagNaam},${r.dagNummer},${r.ritNummer},"${r.route}",${r.kilometers || ''},€${r.correctie?.toFixed(0)}\n`);
    csv += `\n,,,${t.exclBTW},,€${totaalExclBTW.toFixed(0)}\n,,,${t.btwLabel},,€${btw.toFixed(0)}\n,,,${t.inclBTW},,€${totaalInclBTW.toFixed(0)}\n`;
    
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Jekel_Factuur_${maandNaam}_${huidigJaar}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const maandNaam = t.maanden[huidigeMaand];
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Jekel Dienstverlening Factuur Bijlage ${maandNaam} ${huidigJaar}</title>
        <style>
          @page { size: A4 landscape; margin: 15mm; }
          body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; margin: 0; padding: 20px; }
          h1 { color: #E65100; font-size: 16pt; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th { background: #FFD700; color: black; font-weight: bold; text-align: left; padding: 8px; border: 1px solid #ccc; }
          td { padding: 6px 8px; border: 1px solid #ccc; text-align: left; }
          tr:nth-child(even) { background: #f9f9f9; }
          .totals { margin-top: 20px; }
          .totals td { border: none; padding: 4px 8px; }
          .totals .label { text-align: right; font-weight: normal; }
          .totals .amount { text-align: right; }
          .totals .final { font-weight: bold; font-size: 12pt; border-top: 2px solid #E65100; }
          .footer { margin-top: 30px; font-size: 9pt; color: #666; }
        </style>
      </head>
      <body>
        <h1>Declaratie ${maandNaam} ${huidigJaar} - Jekel Dienstverlening</h1>
        <table>
          <thead>
            <tr>
              <th style="width: 80px;">${maandNaam}</th>
              <th style="width: 50px;">${t.datum}</th>
              <th style="width: 40px;">${t.rit}</th>
              <th>${t.route}</th>
              <th style="width: 50px; text-align: right;">${t.km}</th>
              <th style="width: 70px; text-align: right;">${t.totaal}</th>
            </tr>
          </thead>
          <tbody>
            ${maandRitten.map(r => `
              <tr>
                <td>${r.dagNaam}</td>
                <td>${r.dagNummer}</td>
                <td>${r.ritNummer}</td>
                <td>${r.route}</td>
                <td style="text-align: right;">${r.kilometers || '-'}</td>
                <td style="text-align: right;">€${r.correctie?.toFixed(0)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <table class="totals">
          <tr>
            <td colspan="4"></td>
            <td class="label">${t.exclBTW}</td>
            <td class="amount">€${totaalExclBTW.toFixed(0)}</td>
          </tr>
          <tr>
            <td colspan="4"></td>
            <td class="label">${t.btwLabel}</td>
            <td class="amount">€${btw.toFixed(0)}</td>
          </tr>
          <tr class="final">
            <td colspan="4"></td>
            <td class="label">${t.inclBTW}</td>
            <td class="amount">€${totaalInclBTW.toFixed(0)}</td>
          </tr>
        </table>
        <div class="footer">
          Gegenereerd door RitLog v3.1 • ${new Date().toLocaleDateString('nl-NL')}
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  const exportBackupJSON = () => {
    const data = JSON.stringify({ ritten, logboek, exportDatum: new Date().toISOString(), versie: '3.1' }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RitLog_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportBackupExcel = () => {
    let csv = `${t.dagen[0].slice(0,3)},${t.datum},${t.rit},${t.route},${t.km},${t.bedrag},Correctie,Type,${t.uren}\n`;
    ritten.forEach(r => {
      csv += `${r.dagNaam},${r.datum},${r.ritNummer},"${r.route}",${r.kilometers || ''},${r.totaalBedrag?.toFixed(2)},${r.correctie?.toFixed(2)},${r.isUurloon ? 'Uur' : 'KM'},${r.uren || ''}\n`;
    });
    
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RitLog_Export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const backup = JSON.parse(ev.target?.result);
        if (confirm(`${t.herstel} ${backup.ritten?.length || 0} ${t.ritten}?`)) {
          setRitten(backup.ritten || []);
          setLogboek(backup.logboek || []);
          await saveData(backup.ritten || [], backup.logboek || []);
        }
      } catch { alert('Invalid file / Ongeldig bestand'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const primaryColor = '#E65100';
  
  const bgColor = darkMode ? '#1a1a2e' : '#f3f4f6';
  const cardBg = darkMode ? '#16213e' : 'white';
  const textColor = darkMode ? '#e4e4e7' : 'inherit';
  const textMuted = darkMode ? '#a1a1aa' : '#6b7280';
  const borderColor = darkMode ? '#374151' : '#e5e7eb';

  if (loading) return (
    <div className="flex items-center justify-center h-screen" style={{background: primaryColor}}>
      <div className="text-white text-center">
        <CaddyIcon size={64} color="white" />
        <div className="text-xl font-bold mt-2">RitLog</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{fontSize: '16px', background: bgColor, color: textColor}}>
      {/* Edit Modal */}
      {editingRit && (
        <EditModal 
          rit={editingRit}
          onSave={handleEditRit}
          onCancel={() => setEditingRit(null)}
          onDelete={() => handleDeleteRit(editingRit.id)}
          t={t}
          darkMode={darkMode}
          primaryColor={primaryColor}
          lang={lang}
        />
      )}
      
      {/* Header */}
      <div style={{background: primaryColor, paddingTop: 'env(safe-area-inset-top, 0px)'}} className="text-white p-4">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚐</span>
            <span className="font-bold text-xl">RitLog</span>
          </div>
          <div className="flex items-center gap-1">
            {saveStatus && <span className="text-sm bg-white/20 px-2 py-1 rounded mr-2">{saveStatus}</span>}
            <button 
              onClick={() => setLang('nl')}
              className={`text-lg px-2 py-1 rounded transition ${lang === 'nl' ? 'bg-white/40 ring-2 ring-white' : 'bg-white/20 hover:bg-white/30'}`}
              title="Nederlands"
            >
              🇳🇱
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`text-lg px-2 py-1 rounded transition ${lang === 'en' ? 'bg-white/40 ring-2 ring-white' : 'bg-white/20 hover:bg-white/30'}`}
              title="English"
            >
              🇬🇧
            </button>
            <div className="w-2"></div>
            <button 
              onClick={() => setDarkMode(false)}
              className={`text-lg px-2 py-1 rounded transition ${!darkMode ? 'bg-white/40 ring-2 ring-white' : 'bg-white/20 hover:bg-white/30'}`}
              title="Light mode"
            >
              ☀️
            </button>
            <button 
              onClick={() => setDarkMode(true)}
              className={`text-lg px-2 py-1 rounded transition ${darkMode ? 'bg-white/40 ring-2 ring-white' : 'bg-white/20 hover:bg-white/30'}`}
              title="Dark mode"
            >
              🌙
            </button>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{background: cardBg, borderBottom: `1px solid ${borderColor}`}} className="shadow">
        <div className="flex max-w-lg mx-auto">
          {[
            {id: 'invoer', icon: '➕', label: t.rit},
            {id: 'log', icon: '📋', label: t.log},
            {id: 'backup', icon: '💾', label: t.backup}
          ].map(tab => (
            <button key={tab.id} onClick={() => setView(tab.id)} 
              className="flex-1 py-3 text-center"
              style={{
                borderBottom: view === tab.id ? `3px solid ${primaryColor}` : '3px solid transparent',
                color: view === tab.id ? primaryColor : textMuted
              }}>
              <div className="text-xl">{tab.icon}</div>
              <div className="text-sm">{tab.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        {/* Maand */}
        <div className="rounded-xl shadow p-4 mb-4" style={{background: cardBg}}>
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => { if (huidigeMaand === 0) { setHuidigeMaand(11); setHuidigJaar(huidigJaar - 1); } else setHuidigeMaand(huidigeMaand - 1); }} 
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{background: `${primaryColor}20`, color: primaryColor}}>◀</button>
            <div className="text-center">
              <div className="font-bold text-xl" style={{color: primaryColor}}>{t.maanden[huidigeMaand]}</div>
              <div style={{color: textMuted}}>{huidigJaar}</div>
            </div>
            <button onClick={() => { if (huidigeMaand === 11) { setHuidigeMaand(0); setHuidigJaar(huidigJaar + 1); } else setHuidigeMaand(huidigeMaand + 1); }} 
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{background: `${primaryColor}20`, color: primaryColor}}>▶</button>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">{maandRitten.length} {t.ritten}</span>
            <span className={`px-4 py-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>{totaalKM} km</span>
            <span className="text-white px-4 py-2 rounded-full font-bold" style={{background: primaryColor}}>€{totaalInclBTW.toFixed(0)}</span>
          </div>
        </div>

        {/* LOG */}
        {view === 'log' && (
          <div className="space-y-4">
            <Kalender 
              maand={huidigeMaand} 
              jaar={huidigJaar} 
              ritten={maandRitten} 
              t={t} 
              darkMode={darkMode}
              primaryColor={primaryColor}
            />
            
            <div className="rounded-xl shadow overflow-hidden" style={{background: cardBg}}>
              <div className="p-4 flex justify-between items-center border-b-2" style={{borderColor: primaryColor}}>
                <div>
                  <span className="font-bold text-lg" style={{color: primaryColor}}>{t.rit}ten</span>
                  {maandRitten.length > 0 && (
                    <div className="text-xs" style={{color: textMuted}}>{t.tikOmTeBewerken}</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={exportCSV} disabled={!maandRitten.length} className="bg-purple-500 text-white px-3 py-2 rounded-lg disabled:bg-gray-300 text-sm">📄 CSV</button>
                  <button onClick={exportPDF} disabled={!maandRitten.length} className="bg-red-500 text-white px-3 py-2 rounded-lg disabled:bg-gray-300 text-sm">📑 PDF</button>
                </div>
              </div>
              {maandRitten.length === 0 ? (
                <div className="p-8 text-center" style={{color: textMuted}}>
                  <CaddyIcon size={64} color={textMuted} />
                  <div className="mt-2 text-lg">{t.geenRitten}</div>
                  <button onClick={() => setView('invoer')} className="mt-4 text-white px-6 py-3 rounded-lg text-lg" style={{background: primaryColor}}>+ {t.eersteRit}</button>
                </div>
              ) : (
                <>
                  {maandRitten.map((r, i) => (
                    <div 
                      key={r.id} 
                      className={`p-4 border-b flex items-start gap-3 cursor-pointer hover:opacity-80 transition`} 
                      style={{borderColor, background: i % 2 ? (darkMode ? '#1e293b' : '#f9fafb') : 'transparent'}}
                      onClick={() => setEditingRit(r)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-lg">{r.dagNaam.slice(0,2)} {r.dagNummer}</span>
                          <span className="text-sm" style={{color: textMuted}}>#{r.ritNummer}</span>
                          {r.isUurloon && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{lang === 'nl' ? 'uur' : 'hr'}</span>}
                          {r.kmGeschat && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">±km</span>}
                        </div>
                        <div className="text-sm truncate" style={{color: textMuted}}>{r.route}</div>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <div className="font-bold text-lg">€{r.correctie?.toFixed(0)}</div>
                        <div className="text-sm" style={{color: textMuted}}>{r.kilometers || '-'} km</div>
                      </div>
                      <div className="text-gray-400 text-lg">✏️</div>
                    </div>
                  ))}
                  <div className="p-4 space-y-2" style={{background: darkMode ? '#1e293b' : '#f9fafb'}}>
                    <div className="flex justify-between"><span>{t.exclBTW}</span><span>€{totaalExclBTW.toFixed(0)}</span></div>
                    <div className="flex justify-between" style={{color: textMuted}}><span>{t.btwLabel}</span><span>€{btw.toFixed(0)}</span></div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t" style={{color: primaryColor, borderColor}}><span>{t.inclBTW}</span><span>€{totaalInclBTW.toFixed(0)}</span></div>
                  </div>
                </>
              )}
            </div>

            {logboek.length > 0 && (
              <details className="rounded-xl shadow overflow-hidden" style={{background: cardBg}}>
                <summary className="p-4 cursor-pointer font-medium hover:opacity-80" style={{color: textMuted}}>
                  📝 {t.recenteActiviteit} ({logboek.length})
                </summary>
                <div className="border-t max-h-48 overflow-y-auto" style={{borderColor}}>
                  {[...logboek].reverse().slice(0, 10).map((entry, i) => (
                    <div key={i} className="p-3 border-b text-sm" style={{borderColor, background: i % 2 ? (darkMode ? '#1e293b' : '#f9fafb') : 'transparent'}}>
                      <div className="flex justify-between">
                        <span className={`px-2 py-0.5 rounded text-xs ${entry.actie.includes('TOEGEVOEGD') ? 'bg-green-100 text-green-800' : entry.actie.includes('GEWIJZIGD') ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                          {entry.actie.includes('TOEGEVOEGD') ? t.toegevoegd : entry.actie.includes('GEWIJZIGD') ? t.gewijzigd : t.verwijderd}
                        </span>
                        <span className="text-xs" style={{color: textMuted}}>{new Date(entry.timestamp).toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB')}</span>
                      </div>
                      <div className="mt-1" style={{color: textMuted}}>{entry.details}</div>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        )}

        {/* INVOER */}
        {view === 'invoer' && (
          <div className="rounded-xl shadow p-4" style={{background: cardBg}}>
            <div className="font-bold text-lg mb-4 flex items-center gap-2" style={{color: primaryColor}}>
              <CaddyIcon size={28} color={primaryColor} />
              <span>{t.nieuweRit}</span>
            </div>
            
            <div className={`border rounded-lg p-3 mb-4 ${darkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
              <div className={`text-center ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                <div className="font-medium mb-1">💡 {t.tipGebruikSpraak}</div>
                <div className="text-sm">{t.tipTekst} <span className="font-bold">🎤 {t.tipToetsenbord}</span></div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>↓ {t.tipVoorbeeld}</div>
              </div>
            </div>
            
            <div className="flex gap-2 mb-4">
              <button onClick={() => setNieuwRit({...nieuwRit, isUurloon: false})}
                className={`flex-1 py-3 rounded-lg font-medium ${!nieuwRit.isUurloon ? 'text-white' : ''}`}
                style={{background: !nieuwRit.isUurloon ? primaryColor : (darkMode ? '#374151' : '#f3f4f6'), color: !nieuwRit.isUurloon ? 'white' : textColor}}>
                {t.perKm} (€{TARIEF_PER_KM}/km)
              </button>
              <button onClick={() => setNieuwRit({...nieuwRit, isUurloon: true})}
                className={`flex-1 py-3 rounded-lg font-medium ${nieuwRit.isUurloon ? 'text-white' : ''}`}
                style={{background: nieuwRit.isUurloon ? primaryColor : (darkMode ? '#374151' : '#f3f4f6'), color: nieuwRit.isUurloon ? 'white' : textColor}}>
                {t.perUur} (€{TARIEF_PER_UUR}/{lang === 'nl' ? 'u' : 'h'})
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Datum met snelknoppen */}
              <div>
                <label className="text-sm block mb-1" style={{color: textMuted}}>{t.datum}</label>
                <div className="flex gap-2">
                  <input type="date" value={nieuwRit.datum} onChange={e => handleDatumChange(e.target.value)} 
                    className="flex-1 border rounded-lg p-3 text-lg" 
                    style={{background: darkMode ? '#374151' : 'white', color: textColor, borderColor}} />
                  <button 
                    onClick={() => handleDatumChange(getGisteren())}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border ${nieuwRit.datum === getGisteren() ? 'text-white' : ''}`}
                    style={{
                      background: nieuwRit.datum === getGisteren() ? primaryColor : (darkMode ? '#374151' : 'white'),
                      borderColor,
                      color: nieuwRit.datum === getGisteren() ? 'white' : textMuted
                    }}
                  >
                    {t.gisteren}
                  </button>
                  <button 
                    onClick={() => handleDatumChange(getVandaag())}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border ${nieuwRit.datum === getVandaag() ? 'text-white' : ''}`}
                    style={{
                      background: nieuwRit.datum === getVandaag() ? primaryColor : (darkMode ? '#374151' : 'white'),
                      borderColor,
                      color: nieuwRit.datum === getVandaag() ? 'white' : textMuted
                    }}
                  >
                    {t.vandaag}
                  </button>
                </div>
              </div>
              
              {/* Rit # */}
              <div>
                <label className="text-sm block mb-1" style={{color: textMuted}}>{t.rit} #</label>
                <input type="number" min="1" value={nieuwRit.ritNummer} onChange={e => setNieuwRit({...nieuwRit, ritNummer: e.target.value})} 
                  className="w-full border rounded-lg p-3 text-lg"
                  style={{background: darkMode ? '#374151' : 'white', color: textColor, borderColor}} />
              </div>
              
              <div>
                <label className="text-sm block mb-1" style={{color: textMuted}}>{t.routeLabel}</label>
                <input type="text" value={nieuwRit.route} onChange={e => setNieuwRit({...nieuwRit, route: e.target.value})} 
                  placeholder={t.routePlaceholder} 
                  className="w-full border rounded-lg p-3 text-lg"
                  style={{background: darkMode ? '#374151' : 'white', color: textColor, borderColor}} />
                {nieuwRit.route && (
                  <button 
                    onClick={openGoogleMaps}
                    className="mt-2 w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 border-2"
                    style={{
                      background: darkMode ? '#1e3a5f' : '#e8f4fd',
                      borderColor: '#4285f4',
                      color: '#4285f4'
                    }}
                  >
                    🗺️ {t.checkMaps}
                  </button>
                )}
              </div>
              
              {!nieuwRit.isUurloon ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm block mb-1" style={{color: textMuted}}>
                      {t.km} <span className="text-xs">({lang === 'nl' ? 'van Google Maps' : 'from Google Maps'})</span>
                    </label>
                    <input 
                      type="number" 
                      value={nieuwRit.kilometers} 
                      onChange={e => setNieuwRit({...nieuwRit, kilometers: e.target.value})} 
                      placeholder={lang === 'nl' ? 'vul km in' : 'enter km'}
                      className="w-full border rounded-lg p-3 text-lg"
                      style={{background: darkMode ? '#374151' : 'white', color: textColor, borderColor}} 
                    />
                  </div>
                  <div>
                    <label className="text-sm block mb-1" style={{color: textMuted}}>
                      {t.bedrag} € {geschatBedrag && !nieuwRit.totaalBedrag && <span className="text-green-600 font-medium">(≈{geschatBedrag})</span>}
                    </label>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={nieuwRit.totaalBedrag} 
                      onChange={e => setNieuwRit({...nieuwRit, totaalBedrag: e.target.value})} 
                      placeholder={geschatBedrag ? `${geschatBedrag}` : '€'} 
                      className={`w-full border rounded-lg p-3 text-lg ${!nieuwRit.totaalBedrag && geschatBedrag ? 'bg-green-50 border-green-300 placeholder-green-600' : ''}`}
                      style={nieuwRit.totaalBedrag || !geschatBedrag ? {background: darkMode ? '#374151' : 'white', color: textColor, borderColor} : {}} 
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm block mb-1" style={{color: textMuted}}>{t.uren}</label>
                    <input type="number" step="0.25" value={nieuwRit.uren} onChange={e => setNieuwRit({...nieuwRit, uren: e.target.value})} 
                      placeholder="bijv: 2.5" 
                      className="w-full border rounded-lg p-3 text-lg"
                      style={{background: darkMode ? '#374151' : 'white', color: textColor, borderColor}} />
                  </div>
                  <div>
                    <label className="text-sm block mb-1" style={{color: textMuted}}>
                      {t.bedrag} € {geschatBedrag && !nieuwRit.totaalBedrag && <span className="text-blue-600 font-medium">(={geschatBedrag})</span>}
                    </label>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={nieuwRit.totaalBedrag} 
                      onChange={e => setNieuwRit({...nieuwRit, totaalBedrag: e.target.value})} 
                      placeholder={geschatBedrag ? `${geschatBedrag}` : '€'} 
                      className={`w-full border rounded-lg p-3 text-lg ${!nieuwRit.totaalBedrag && geschatBedrag ? 'bg-blue-50 border-blue-300 placeholder-blue-600' : ''}`}
                      style={nieuwRit.totaalBedrag || !geschatBedrag ? {background: darkMode ? '#374151' : 'white', color: textColor, borderColor} : {}} 
                    />
                  </div>
                </div>
              )}
              
              {(geschatBedrag || nieuwRit.totaalBedrag) && (
                <div className={`text-center py-3 rounded-lg font-medium ${nieuwRit.isUurloon ? (darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700') : (darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700')}`}>
                  {nieuwRit.isUurloon 
                    ? `💰 ${t.uurloon}: €${(parseFloat(nieuwRit.totaalBedrag) || geschatBedrag || 0).toFixed(0)} (${t.geenKorting})` 
                    : `💰 ${t.naCorrectie}: €${((parseFloat(nieuwRit.totaalBedrag) || geschatBedrag || 0) * 0.94).toFixed(0)}`
                  }
                </div>
              )}
              
              <button onClick={handleAddRit} className="w-full py-4 rounded-lg font-bold text-white text-lg" style={{background: primaryColor}}>✓ {t.toevoegen}</button>
            </div>
          </div>
        )}

        {/* BACKUP */}
        {view === 'backup' && (
          <div className="space-y-4">
            <div className="rounded-xl shadow p-4" style={{background: cardBg}}>
              <div className="font-bold text-lg mb-4 flex items-center gap-2" style={{color: primaryColor}}>
                <span>💾</span> {t.backupDownloaden}
              </div>
              <div className="space-y-3">
                <button onClick={exportBackupExcel} className="w-full py-4 rounded-lg text-white font-medium text-lg bg-green-500 flex items-center justify-center gap-2">
                  📊 Excel/CSV ({ritten.length} {t.ritten})
                </button>
                <button onClick={exportBackupJSON} className="w-full py-3 rounded-lg border" style={{borderColor, color: textMuted}}>
                  📁 JSON ({lang === 'nl' ? 'voor herstel' : 'for restore'})
                </button>
              </div>
            </div>
            
            <div className="rounded-xl shadow p-4" style={{background: cardBg}}>
              <div className="font-bold text-lg mb-4 flex items-center gap-2" style={{color: primaryColor}}>
                <span>🔄</span> {t.backupHerstellen}
              </div>
              <label className="block w-full py-4 rounded-lg border-2 border-dashed text-center cursor-pointer hover:opacity-80" style={{borderColor}}>
                <span style={{color: textMuted}}>{t.kiesBestand}</span>
                <input type="file" accept=".json" onChange={importBackup} className="hidden" />
              </label>
            </div>
            
            <div className="rounded-xl p-4" style={{background: darkMode ? '#1e293b' : '#fff7ed', borderLeft: `4px solid ${primaryColor}`}}>
              <strong>💡 {t.tips}</strong>
              <ul className="mt-2 space-y-1" style={{color: textMuted}}>
                <li>• <strong>Excel/CSV:</strong> {t.tipExcel}</li>
                <li>• <strong>JSON:</strong> {t.tipJSON}</li>
                <li>• {t.tarieven} €{TARIEF_PER_KM}/km {lang === 'nl' ? 'of' : 'or'} €{TARIEF_PER_UUR}/{lang === 'nl' ? 'uur' : 'hour'}</li>
              </ul>
            </div>
            
            <div className="rounded-xl p-4" style={{background: darkMode ? '#1e293b' : '#e8f5e9', borderLeft: `4px solid #22c55e`}}>
              <strong>📖 {t.gebruiksaanwijzing}</strong>
              <ul className="mt-2 space-y-1 text-sm" style={{color: textMuted}}>
                <li>➕ <strong>{t.rit} {lang === 'nl' ? 'toevoegen' : 'add'}:</strong> {t.hulpRitToevoegen}</li>
                <li>🗺️ <strong>Google Maps:</strong> {t.hulpGoogleMaps}</li>
                <li>✏️ <strong>{t.rit} {lang === 'nl' ? 'bewerken' : 'edit'}:</strong> {t.hulpRitBewerken}</li>
                <li>🗑️ <strong>{t.rit} {lang === 'nl' ? 'verwijderen' : 'delete'}:</strong> {t.hulpRitVerwijderen}</li>
                <li>📄 <strong>{lang === 'nl' ? 'Factuur maken' : 'Create invoice'}:</strong> {t.hulpFactuur}</li>
                <li>💾 <strong>Backup:</strong> {t.hulpBackup}</li>
                <li>📅 <strong>{t.kalender}:</strong> {t.hulpKalender}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center py-6 text-sm flex items-center justify-center gap-2" style={{color: textMuted}}>
        <CaddyIcon size={20} color={textMuted} /> 
        <span>RitLog v3.1 • Jekel Dienstverlening</span>
      </div>
    </div>
  );
}
