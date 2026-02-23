import React, { useState, useEffect, useRef } from 'react';

const MAANDEN = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
const DAGEN = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];

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

export default function RitLogApp() {
  const [ritten, setRitten] = useState([]);
  const [logboek, setLogboek] = useState([]);
  const [huidigeMaand, setHuidigeMaand] = useState(new Date().getMonth());
  const [huidigJaar, setHuidigJaar] = useState(new Date().getFullYear());
  const [view, setView] = useState('overzicht');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');
  
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
  
  // Auto-berekeningen wanneer route/km/uren verandert
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
      // Per km modus
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

  const handleAddRit = async () => {
    if (!nieuwRit.route) { alert('Vul een route in'); return; }
    
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
    
    if (!totaalBedrag) { alert('Kon bedrag niet berekenen'); return; }
    
    const rit = {
      id: Date.now(),
      datum: nieuwRit.datum,
      dagNaam: DAGEN[datum.getDay()],
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
    setView('overzicht');
  };

  const handleDeleteRit = async (id) => {
    const rit = ritten.find(r => r.id === id);
    if (!confirm(`Verwijderen?\n${rit.dagNaam} ${rit.dagNummer}`)) return;
    const newRitten = ritten.filter(r => r.id !== id);
    const newLog = [...logboek, { timestamp: new Date().toISOString(), actie: 'VERWIJDERD', details: `${rit.dagNaam} ${rit.dagNummer}` }];
    setRitten(newRitten);
    setLogboek(newLog);
    await saveData(newRitten, newLog);
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setIsListening(false);
    } else {
      if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        alert('Spraakherkenning niet beschikbaar. Gebruik Chrome.'); return;
      }
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SR();
      recognition.lang = 'nl-NL';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setTranscript(text);
        parseSpraak(text);
        setIsListening(false);
        recognitionRef.current = null;
      };
      
      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };
      
      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  const parseSpraak = (text) => {
    let route = text, km = '', bedrag = '', uren = '';
    const kmMatch = text.match(/(\d+)\s*(kilometer|km)/i);
    if (kmMatch) { km = kmMatch[1]; route = route.replace(kmMatch[0], ''); }
    const euroMatch = text.match(/(\d+[,.]?\d*)\s*(euro|€)/i);
    if (euroMatch) { bedrag = euroMatch[1].replace(',', '.'); route = route.replace(euroMatch[0], ''); }
    const uurMatch = text.match(/(\d+[,.]?\d*)\s*(uur|uren)/i);
    if (uurMatch) { uren = uurMatch[1].replace(',', '.'); route = route.replace(uurMatch[0], ''); }
    route = route.replace(/naar/gi, ' - ').trim();
    setNieuwRit(prev => ({ ...prev, route: route || prev.route, kilometers: km || prev.kilometers, totaalBedrag: bedrag || prev.totaalBedrag, uren: uren || prev.uren, isUurloon: uren ? true : prev.isUurloon }));
  };

  const maandRitten = ritten.filter(r => r.maand === huidigeMaand && r.jaar === huidigJaar);
  const totaalExclBTW = maandRitten.reduce((s, r) => s + (r.correctie || 0), 0);
  const btw = totaalExclBTW * 0.21;
  const totaalInclBTW = totaalExclBTW + btw;
  const totaalKM = maandRitten.reduce((s, r) => s + (r.kilometers || 0), 0);

  const exportCSV = () => {
    const maandNaam = MAANDEN[huidigeMaand];
    let csv = `${maandNaam},Datum,Rit,Route,KM,Totaal\n`;
    maandRitten.forEach(r => csv += `${r.dagNaam},${r.dagNummer},${r.ritNummer},"${r.route}",${r.kilometers || ''},€${r.correctie?.toFixed(0)}\n`);
    csv += `\n,,,Totaal excl. BTW:,,€${totaalExclBTW.toFixed(0)}\n,,,BTW 21%:,,€${btw.toFixed(0)}\n,,,Totaal incl. BTW:,,€${totaalInclBTW.toFixed(0)}\n`;
    
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

  const exportBackupJSON = () => {
    const data = JSON.stringify({ ritten, logboek, exportDatum: new Date().toISOString(), versie: '2.2' }, null, 2);
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
    let csv = 'Dag,Datum,Rit,Route,KM,Bedrag,Correctie,Type,Uren\n';
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
        if (confirm(`Herstel ${backup.ritten?.length || 0} ritten?`)) {
          setRitten(backup.ritten || []);
          setLogboek(backup.logboek || []);
          await saveData(backup.ritten || [], backup.logboek || []);
        }
      } catch { alert('Ongeldig bestand'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const primaryColor = '#E65100';

  if (loading) return (
    <div className="flex items-center justify-center h-screen" style={{background: primaryColor}}>
      <div className="text-white text-center">
        <CaddyIcon size={64} color="white" />
        <div className="text-xl font-bold mt-2">RitLog</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100" style={{fontSize: '16px'}}>
      {/* Header - with safe area padding for iOS notch */}
      <div style={{background: primaryColor, paddingTop: 'env(safe-area-inset-top, 0px)'}} className="text-white p-4">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <CaddyIcon size={32} color="white" />
            <span className="font-bold text-xl">RitLog</span>
          </div>
          {saveStatus && <span className="text-sm bg-white/20 px-2 py-1 rounded">{saveStatus}</span>}
        </div>
      </div>

      {/* Nav */}
      <div className="bg-white shadow">
        <div className="flex max-w-lg mx-auto">
          {[
            {id: 'overzicht', icon: '📋', label: 'Overzicht'},
            {id: 'invoer', icon: '➕', label: 'Rit'},
            {id: 'log', icon: '📝', label: 'Log'},
            {id: 'backup', icon: '💾', label: 'Backup'}
          ].map(tab => (
            <button key={tab.id} onClick={() => setView(tab.id)} 
              className="flex-1 py-3 text-center"
              style={{
                borderBottom: view === tab.id ? `3px solid ${primaryColor}` : '3px solid transparent',
                color: view === tab.id ? primaryColor : '#888'
              }}>
              <div className="text-xl">{tab.icon}</div>
              <div className="text-sm">{tab.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        {/* Maand */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => { if (huidigeMaand === 0) { setHuidigeMaand(11); setHuidigJaar(huidigJaar - 1); } else setHuidigeMaand(huidigeMaand - 1); }} 
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{background: `${primaryColor}20`, color: primaryColor}}>◀</button>
            <div className="text-center">
              <div className="font-bold text-xl" style={{color: primaryColor}}>{MAANDEN[huidigeMaand]}</div>
              <div className="text-gray-500">{huidigJaar}</div>
            </div>
            <button onClick={() => { if (huidigeMaand === 11) { setHuidigeMaand(0); setHuidigJaar(huidigJaar + 1); } else setHuidigeMaand(huidigeMaand + 1); }} 
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{background: `${primaryColor}20`, color: primaryColor}}>▶</button>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">{maandRitten.length} ritten</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">{totaalKM} km</span>
            <span className="text-white px-4 py-2 rounded-full font-bold" style={{background: primaryColor}}>€{totaalInclBTW.toFixed(0)}</span>
          </div>
        </div>

        {/* OVERZICHT */}
        {view === 'overzicht' && (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b-2" style={{borderColor: primaryColor}}>
              <span className="font-bold text-lg" style={{color: primaryColor}}>Ritten</span>
              <button onClick={exportCSV} disabled={!maandRitten.length} className="bg-purple-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-300">📄 CSV</button>
            </div>
            {maandRitten.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <CaddyIcon size={64} color="#ccc" />
                <div className="mt-2 text-lg">Geen ritten deze maand</div>
                <button onClick={() => setView('invoer')} className="mt-4 text-white px-6 py-3 rounded-lg text-lg" style={{background: primaryColor}}>+ Eerste rit</button>
              </div>
            ) : (
              <>
                {maandRitten.map((r, i) => (
                  <div key={r.id} className={`p-4 border-b flex items-start gap-3 ${i % 2 ? 'bg-gray-50' : ''}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-lg">{r.dagNaam.slice(0,2)} {r.dagNummer}</span>
                        <span className="text-sm text-gray-400">#{r.ritNummer}</span>
                        {r.isUurloon && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">uur</span>}
                        {r.kmGeschat && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">±km</span>}
                      </div>
                      <div className="text-sm text-gray-600 truncate">{r.route}</div>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <div className="font-bold text-lg">€{r.correctie?.toFixed(0)}</div>
                      <div className="text-sm text-gray-400">{r.kilometers || '-'} km</div>
                    </div>
                    <button onClick={() => handleDeleteRit(r.id)} className="text-red-400 text-2xl leading-none ml-1">×</button>
                  </div>
                ))}
                <div className="p-4 bg-gray-50 space-y-2">
                  <div className="flex justify-between"><span>Excl. BTW:</span><span>€{totaalExclBTW.toFixed(0)}</span></div>
                  <div className="flex justify-between text-gray-500"><span>BTW 21%:</span><span>€{btw.toFixed(0)}</span></div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t" style={{color: primaryColor}}><span>Incl. BTW:</span><span>€{totaalInclBTW.toFixed(0)}</span></div>
                </div>
              </>
            )}
          </div>
        )}

        {/* INVOER */}
        {view === 'invoer' && (
          <div className="bg-white rounded-xl shadow p-4">
            <div className="font-bold text-lg mb-4 flex items-center gap-2" style={{color: primaryColor}}>
              <CaddyIcon size={28} color={primaryColor} />
              <span>Nieuwe Rit</span>
            </div>
            
            {/* Tip voor spraak invoer */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="text-center text-blue-700">
                <div className="font-medium mb-1">💡 Tip: Gebruik spraak!</div>
                <div className="text-sm">Tik op het Route veld en gebruik de <span className="font-bold">🎤 op je toetsenbord</span></div>
                <div className="text-xs text-blue-500 mt-1">↓ Zeg bijv: "Amsterdam Utrecht Ede 120 km 66 euro"</div>
              </div>
            </div>
            
            {/* Per km / Per uur toggle */}
            <div className="flex gap-2 mb-4">
              <button onClick={() => setNieuwRit({...nieuwRit, isUurloon: false})}
                className={`flex-1 py-3 rounded-lg font-medium ${!nieuwRit.isUurloon ? 'text-white' : 'bg-gray-100'}`}
                style={{background: !nieuwRit.isUurloon ? primaryColor : undefined}}>
                Per km (€{TARIEF_PER_KM}/km)
              </button>
              <button onClick={() => setNieuwRit({...nieuwRit, isUurloon: true})}
                className={`flex-1 py-3 rounded-lg font-medium ${nieuwRit.isUurloon ? 'text-white' : 'bg-gray-100'}`}
                style={{background: nieuwRit.isUurloon ? primaryColor : undefined}}>
                Per uur (€{TARIEF_PER_UUR}/u)
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Datum en Rit # */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Datum</label>
                  <input type="date" value={nieuwRit.datum} onChange={e => setNieuwRit({...nieuwRit, datum: e.target.value})} className="w-full border rounded-lg p-3 text-lg" />
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Rit #</label>
                  <input type="number" min="1" value={nieuwRit.ritNummer} onChange={e => setNieuwRit({...nieuwRit, ritNummer: e.target.value})} className="w-full border rounded-lg p-3 text-lg" />
                </div>
              </div>
              
              {/* Route */}
              <div>
                <label className="text-sm text-gray-500 block mb-1">Route (zonder Houten)</label>
                <input type="text" value={nieuwRit.route} onChange={e => setNieuwRit({...nieuwRit, route: e.target.value})} placeholder="bijv: Amsterdam - Utrecht - Ede" className="w-full border rounded-lg p-3 text-lg" />
              </div>
              
              {/* KM en Bedrag OF Uren en Bedrag */}
              {!nieuwRit.isUurloon ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">
                      KM {geschatteKm && !nieuwRit.kilometers && <span className="text-green-600 font-medium">(≈{geschatteKm})</span>}
                    </label>
                    <input 
                      type="number" 
                      value={nieuwRit.kilometers} 
                      onChange={e => setNieuwRit({...nieuwRit, kilometers: e.target.value})} 
                      placeholder={geschatteKm ? `${geschatteKm}` : 'km'} 
                      className={`w-full border rounded-lg p-3 text-lg ${!nieuwRit.kilometers && geschatteKm ? 'bg-green-50 border-green-300 placeholder-green-600' : ''}`} 
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">
                      Bedrag € {geschatBedrag && !nieuwRit.totaalBedrag && <span className="text-green-600 font-medium">(≈{geschatBedrag})</span>}
                    </label>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={nieuwRit.totaalBedrag} 
                      onChange={e => setNieuwRit({...nieuwRit, totaalBedrag: e.target.value})} 
                      placeholder={geschatBedrag ? `${geschatBedrag}` : '€'} 
                      className={`w-full border rounded-lg p-3 text-lg ${!nieuwRit.totaalBedrag && geschatBedrag ? 'bg-green-50 border-green-300 placeholder-green-600' : ''}`} 
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Uren</label>
                    <input type="number" step="0.25" value={nieuwRit.uren} onChange={e => setNieuwRit({...nieuwRit, uren: e.target.value})} placeholder="bijv: 2.5" className="w-full border rounded-lg p-3 text-lg" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">
                      Bedrag € {geschatBedrag && !nieuwRit.totaalBedrag && <span className="text-blue-600 font-medium">(={geschatBedrag})</span>}
                    </label>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={nieuwRit.totaalBedrag} 
                      onChange={e => setNieuwRit({...nieuwRit, totaalBedrag: e.target.value})} 
                      placeholder={geschatBedrag ? `${geschatBedrag}` : '€'} 
                      className={`w-full border rounded-lg p-3 text-lg ${!nieuwRit.totaalBedrag && geschatBedrag ? 'bg-blue-50 border-blue-300 placeholder-blue-600' : ''}`} 
                    />
                  </div>
                </div>
              )}
              
              {/* Preview berekening */}
              {(geschatBedrag || nieuwRit.totaalBedrag) && (
                <div className={`text-center py-3 rounded-lg font-medium ${nieuwRit.isUurloon ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                  {nieuwRit.isUurloon 
                    ? `💰 Uurloon: €${(parseFloat(nieuwRit.totaalBedrag) || geschatBedrag || 0).toFixed(0)} (geen korting)` 
                    : `💰 Na 6% correctie: €${((parseFloat(nieuwRit.totaalBedrag) || geschatBedrag || 0) * 0.94).toFixed(0)}`
                  }
                </div>
              )}
              
              <button onClick={handleAddRit} className="w-full py-4 rounded-lg font-bold text-white text-lg" style={{background: primaryColor}}>✓ Toevoegen</button>
            </div>
          </div>
        )}

        {/* LOG */}
        {view === 'log' && (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-4 border-b-2 font-bold text-lg flex items-center gap-2" style={{borderColor: primaryColor, color: primaryColor}}>
              <span>📝</span> Logboek
            </div>
            {logboek.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-lg">Nog geen activiteit</div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {[...logboek].reverse().slice(0, 50).map((entry, i) => (
                  <div key={i} className={`p-3 border-b ${i % 2 ? 'bg-gray-50' : ''}`}>
                    <div className="flex justify-between">
                      <span className={`text-sm px-2 py-1 rounded ${entry.actie.includes('TOEGEVOEGD') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{entry.actie}</span>
                      <span className="text-sm text-gray-400">{new Date(entry.timestamp).toLocaleDateString('nl-NL')}</span>
                    </div>
                    <div className="text-gray-600 mt-1">{entry.details}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BACKUP */}
        {view === 'backup' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow p-4">
              <div className="font-bold text-lg mb-4 flex items-center gap-2" style={{color: primaryColor}}>
                <span>💾</span> Backup downloaden
              </div>
              <div className="space-y-3">
                <button onClick={exportBackupExcel} className="w-full py-4 rounded-lg text-white font-medium text-lg bg-green-500 flex items-center justify-center gap-2">
                  📊 Excel/CSV ({ritten.length} ritten)
                </button>
                <button onClick={exportBackupJSON} className="w-full py-3 rounded-lg border border-gray-300 text-gray-600">
                  📁 JSON (voor herstel)
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow p-4">
              <div className="font-bold text-lg mb-4 flex items-center gap-2" style={{color: primaryColor}}>
                <span>🔄</span> Backup herstellen
              </div>
              <label className="block w-full py-4 rounded-lg border-2 border-dashed border-gray-300 text-center cursor-pointer hover:border-blue-500">
                <span className="text-gray-600">Kies JSON bestand...</span>
                <input type="file" accept=".json" onChange={importBackup} className="hidden" />
              </label>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-4" style={{borderLeft: `4px solid ${primaryColor}`}}>
              <strong>💡 Tips:</strong>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• <strong>Excel/CSV:</strong> open in Excel of Google Sheets</li>
                <li>• <strong>JSON:</strong> alleen voor herstel in de app</li>
                <li>• Tarieven: €{TARIEF_PER_KM}/km of €{TARIEF_PER_UUR}/uur</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center py-6 text-sm text-gray-400 flex items-center justify-center gap-2">
        <CaddyIcon size={20} color="#9ca3af" /> 
        <span>RitLog v2.3 • Jekel Dienstverlening</span>
      </div>
    </div>
  );
}
