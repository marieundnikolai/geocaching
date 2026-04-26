// If the user went through landing.html, redirect them
const group = localStorage.getItem('group');
if (group) {
    window.location.href = `main.html?gst=${group}`; //
}

// New data structure with tuples
const groups = {
    // ToVaRi Groups
    TVRi: [
      ['tovari', 'invite'], ['tvr', 'i'],
    ],
    TVRc: [
        ['tvr', 'c'], ['tovari', 'camper'],
        ['laura'],['szemkus'], ['tobias'],['szemkus'], ['tobi'],['szemkus'],
        ['niklas', 'nieswand'], ['nikki', 'nieswand'], ['niki', 'nieswand'],
    ],
    TVRa: [
        ['tvr', 'a'], ['tovari', 'accept'],
        ['elisabeth', 'arras'], ['stefan', 'arras'],
        ['pia', 'arras'], ['pieter', 'kindermans'], ['pieter-jan', 'kindermans'],
        ['ilka', 'arras'], ['andre', 'sinnema'],
        ['martina', 'roth'], ['oliver', 'roth'], ['tina', 'roth'], ['oli', 'roth'],
        ['jens', 'paar'], ['selina', 'paar'], ['seli', 'paar'],
        ['alicia', 'fertsch'], ['lukas', 'fertsch'], ['lucas', 'fertsch'],
        ['sandra', 'deutz'], ['thomas', 'kazala'], ['thomek', 'kazala'],
        ['therese', 'gnott'], ['monika', 'manderla'], ['moni', 'manderla'],
        ['nils', 'richrath'], ['marie', 'gottowik'], ['Luisa', 'nogga'], ['leon', 'manitz'],  ['lulu', 'nogga'],
        ['sebastian', 'schaumann'], ['schaumann', 'schaumann'], ['denis', 'polczyk'],
        ['patty', 'dittkens'], ['patrizia', 'dittkens'], ['anna', 'kuchen'],
        ['ansi', 'bernard'], ['tobias', 'sedlmeier'], ['anne-sophie', 'bernard'], ['tobi', 'sedlmeier'],
        ['carsten', 'jerke'], ['julia', 'jerke'],
        ['frauke', 'schulten'],
        ['nikolai', 'arras'], ['marie', 'gnott'], ['niko', 'arras'], ['mimi', 'gnott'],
    ],

    // Sopra Groups
    SOPi: [ 
      ['sop', 'i'], ['sopra', 'invite'],
    ],
    SOPa: [
      ['sop', 'a'], ['sopra', 'accept'],
      ['suraj', 'shetty'], ['trish'],
      ['serkan', 'aygültekiin'], ['sophia', ''],
      ['hendrik', 'reents'], ['amira', ''], 
      ['michael', 'keck'], ['lobke', ''], 
      ['fabienne', 'walter'], ['moritz', 'zimmermann'], ['fabi', 'walter']
    ],

    // Cardeto Groups
    CDOi: [
      ['cdo', 'i'], ['cardeto', 'invite'],
    ],
    CDOa: [
      ['cdo', 'a'], ['cardeto', 'accept'],   
      ['dora', 'kazala'], ['jendrek', 'kazala'],
      ['irene', 'goretzki'], ['günther', 'goretzki'],
    ],

    // Self Booker Groups
    SBK: [
        ['sbk', 'i'], ['selbstbucher', 'invite'], ['selfbooker', 'invite'],
        ['björn','dornbusch'], ['marc','meyer'],
    ],
    SBKa: [
      ['sbk', 'a'], ['selbstbucher', 'accept'], ['selfbooker', 'accept'],
      ['ewelina','sarnecka'], ['anton','pfeiffer'],
      ['peter','biegaj'], ['josepha','biegaj'],['andreas', 'biegaj'], ['andy', 'biegaj'],
      ['klara','gellrich'], ['laurens','gellrich'], ['vanessa','ernst'], ['micah','hensing'], ['lukas','lelittko'], ['lynn',''],
      ['fredi','leufgen'], ['judith','leufgen'], ['frederik','leufgen'], ['hannah', 'hapekotte'],
      ['giuliano', 'börner'], ['giuli', 'börner'], ['kevin','thiel'], ['anna','becker'], ['toni','becker'],
      ['jessica','wille'], ['daniel','wille'],
      ['ilka','möller'], ['flavia','möller'], ['joe','möller'], ['jonathan','möller'], ['jan', 'oehl'], ['jan', 'öhl'], ['anna', 'möller'],
      ['nathanja',''], ['stefan','gramlich'], ['stefan','gramlich'],
      ['jonathan', 'gramlich'], ['livia', 'gramlich'], ['Benedikt', 'gramlich'], ['elisa', 'gramlich'],
      ['robin', 'lugt'], ['melanie',''],
      ['selina', 'weindorf'], ['esther','heidner'], ['kathrin', 'liebhardt'], ['jenny','myzev'], ['jennifer','myzev'],
      
      ['jana','könekamp'], ['dennis','hierl'],
    ],
    SBKie: [['sbk', 'ie']],
    SBKim: [['sbk', 'im']],
    SBKic: [['sbk', 'ic']],
    SBKe: [['sbk', 'e']],
  };

function submitName() {
    const vornameInput = document.getElementById('vorname');
    const nachnameInput = document.getElementById('nachname');
    const lastNameContainer = document.getElementById('last-name-container');
    const errorMessage = document.getElementById('error-message');
    const greeting = document.getElementById('greeting');

    const vorname = vornameInput.value.trim().toLowerCase();
    const nachname = nachnameInput.value.trim().toLowerCase();

    // Check if the first name is empty
    if (vorname === '') {
        errorMessage.textContent = 'Bitte gib deinen Vornamen ein.';
        errorMessage.style.display = 'block';
        return;
    }

    let firstNames = [];
    for (const group of Object.values(groups)) {
        for (const nameTuple of group) {
            firstNames.push(nameTuple[0]);
        }
    }

    const matchingNames = Object.values(groups).flat().filter(t => (t && (t[0] || '')).toLowerCase() === vorname);

    // Case 1: Multiple first names match
    if (matchingNames.length > 1) {
        if (lastNameContainer.style.display === 'none') {
            greeting.textContent = `Ciao ${vorname.charAt(0).toUpperCase() + vorname.slice(1)}, bitte gib auch deinen Nachnamen ein:`;
            lastNameContainer.style.display = 'block';
            errorMessage.textContent = ' ';
            errorMessage.style.display = 'block';
            return;
        }

        // Case 2: Matching with last name
        const fullMatch = matchingNames.find(t => (t[1] || '').toLowerCase() === nachname);
        if (fullMatch) {
            const groupKey = Object.keys(groups).find(key => groups[key].includes(fullMatch));
            if (groupKey) {
                localStorage.setItem('name', `${vorname} ${nachname}`);
                localStorage.setItem('group', groupKey);
                window.location.href = `main.html?gst=${groupKey}`;
            }
        } else {
            errorMessage.textContent = 'Fehler. Bitte kontaktiere Mimi oder Niko.';
            errorMessage.style.display = 'block';
        }
    }
    // Case 3: Single first name match
    else if (matchingNames.length === 1) {
        const groupKey = Object.keys(groups).find(key => groups[key].includes(matchingNames[0]));
        if (groupKey) {
            localStorage.setItem('name', `${vorname} ${matchingNames[0][1]}`);
            localStorage.setItem('group', groupKey);
            window.location.href = `main.html?gst=${groupKey}`;
        }
    }
    // Case 4: No match at all
    else {
        errorMessage.textContent = 'Fehler. Bitte kontaktiere Mimi oder Niko.';
        errorMessage.style.display = 'block';
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        submitName();
    }
}
