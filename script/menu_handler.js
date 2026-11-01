/***********************************************************************
*! \file:                   menu_handler.js
*  \projekt:                default webpage
*  \created on:             2026 10 31
*  \author:                 R. Gräber
*  \version:                E00
*  \brief                   Default website, im Baukasten System
*  \history:                - 
***********************************************************************-->

/***********************************************************************
* Includes
***********************************************************************/

/***********************************************************************
* Informations
***********************************************************************/

/***********************************************************************
* Declarations
***********************************************************************/

/***********************************************************************
* Constant
***********************************************************************/

/***********************************************************************
* Global Variable
***********************************************************************/
// --- 2. Sidebar Toggle ---

menuToggle = document.getElementById('id-menu-toggle');
sidebar = document.getElementById('id-sidebar');

// --- 3. Content Umschalten (SPA Logik) ---
navLinks = document.querySelectorAll('.class-nav-link');
sections = document.querySelectorAll('.class-content-section');

// --- 4. Untermenü (Akkordeon) ---
submenuButtons = document.querySelectorAll('.class-submenu-btn');

/***********************************************************************
* local Variable
***********************************************************************/
// Beispieldaten

/***********************************************************************
* Constant
***********************************************************************/
defaul_sidemenu_data = [
    { id: 1, name: "Max Mustermann", age: 30 },
    { id: 2, name: "Erika Musterfrau", age: 25 },
    { id: 3, name: "John Doe", age: 40 }
];
/***********************************************************************
* Local Funtions
***********************************************************************/

/***********************************************************************
*! \fn          function updateClock()
*  \brief       Uhrzeit & Datum
*  \param       none
*  \exception   none
*  \return      none
***********************************************************************/
function updateClock() {
    const now = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('id-datetime').textContent = now.toLocaleString('de-DE', options);
}

/***********************************************************************
*! \fn          function Start(status)
*  \brief       AFTER PAGE LOADS CALL YOUR SCRIPTS HERE
*  \param       status - status from page load dunction
*  \exception   none
*  \return      none
***********************************************************************/   
function Start(status) {

    get_sidemenu_data();
    init_site();

    setInterval(updateClock, 1000);
	
	//setInterval(get_periodic_data, 5000); 
    
}


/***********************************************************************
*! \fn          function get_sidemenu_data(
*  \brief       triggered by page load, fetches data from the server and displays it in the side menu
*  \param       none
*  \exception   none
*  \return      none
***********************************************************************/  
function get_sidemenu_data() {

    // Prüfen, ob wir lokal über das file:// Protokoll unterwegs sind
    // Falls ja, direkt die Default-Daten laden, ohne fetch zu versuchen
    if (window.location.protocol === 'file:') {
        set_sidemenu_data(defaul_sidemenu_data);
        return;
    }

    fetch('/api/sidebar_data') // Replace with your actual API endpoint
		.then(response => {
		    if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json(); // Parses JSON response into JavaScript objects
		})
		.then(data => {set_sidemenu_data(data);})
		//.catch(error => console.warn('There was a problem with your fetch operation:', error));
        .catch(error => {set_sidemenu_data(defaul_sidemenu_data);});

}


/***********************************************************************
*! \fn          set_sidemenu_data(data)
*  \brief       displays the data in the side menu
*  \param       data - data to be displayed in the side menu
*  \exception   none
*  \return      none
***********************************************************************/  
function set_sidemenu_data(data) {

    console.log("set_sidemenu_data", data);

}

/***********************************************************************
*! \fn          page load
*  \brief       JAVASCRIPT PAGE LOADER
*  \author      Stokely Web Page loader, 2022
*  \param       none
*  \exception   none
*  \return      status from loaded page
***********************************************************************/ 
if (document.readyState) {

    if (document.readyState === "complete" || document.readyState === "loaded") {

        Start("Browser Loader : Document : readyState : complete");

    } else {
       if (window.addEventListener) {

            // Never try and call 'DOMContentLoaded' unless the web page is still in an early loading state.
            if (document.readyState === 'loading' || document.readyState === 'uninitialized') {
                window.addEventListener('DOMContentLoaded', function () {

                // Most modern browsers will have the DOM ready after this state.
                if (document.readyState === "interactive") {
                    Start("Browser Loader : Document : DOMContentLoaded : interactive");

                    } else if (document.readyState === "complete" || document.readyState === "loaded") {
                        Start("Browser Loader : Document : DOMContentLoaded : complete");
                    } else {
                        Start("Browser Loader : Document : DOMContentLoaded : load");
                    }
                }, false);
            } else {
// FALLBACK LOADER : If the readyState is late or unknown, go ahead and try and wait for a full page load event. Note: This function below was required for Internet Explorer 9-10 to work because of non-support of some readyState values! IE 4-9 only supports a "readyState" of "complete".
                if (document.readyState === 'complete' || document.readyState === "loaded") {
                    Start("Browser Loader : Document : readyState : complete");
                } else {
                    window.addEventListener('load', function () {
                        Start('Browser Loader : Window : Event : load');
                    }, false);
                }
            }
        // If 'addEventListener' is not be supported in the browser, try the 'onreadystate' event. Some browsers like IE have poor support for 'addEventListener'.
        } else {
            // Note: document.onreadystatechange may have limited support in some browsers.
            if (document.onreadystatechange) {
                document.onreadystatechange = function () {
                    if (document.readyState === "complete" || document.readyState === "loaded"){
                        Start("Browser Loader : Document : onreadystatechange : complete");
                    } 
                    // OPTIONAL: Because several versions of Internet Explorer do not support "interactive" or get flagged poorly, avoid this call when possible.
                    //else if (document.readyState === "interactive") {
                    //Start("Browser Loader : Document : onreadystatechange : interactive");
                    //}
                }
            } else {
            // Note: Some browsers like IE 3-8 may need this more traditional version of the loading script if they fail to support "addeventlistener" or "onready             state". "window.load" is a very old and very reliable page loader you should always fall back on.
                window.onload = function() {
                    Start("Browser Loader : Window : window.onload (2)");
                };
            }
        }
    }
} else {
    // LEGACY FALLBACK LOADER. If 'document.readyState' is not supported, use 'window.load'. It has wide support in very old browsers as well as all modern ones.     Browsers Firefox 1-3.5, early Mozilla, Opera < 10.1, old Safari, and some IE browsers do not fully support 'readyState' or its values. "window.load" is a very     old and very reliable page loader you should always fall back on.
    window.onload = function () {
        Start("Browser Loader : Window : window.onload (1)");
    };
}


/***********************************************************************
*! \fn          navLinks.forEach
*  \brief       Tabelle erstellen
*  \param       none
*  \exception   none
*  \return      none
***********************************************************************/
function init_site(){
	
	// --- 2. Sidebar Toggle ---
    menuToggle = document.getElementById('id-menu-toggle');
	
	/***********************************************************************
	*  \brief       EventListener menuToggle
	***********************************************************************/
	
	menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
	});
    sidebar = document.getElementById('id-sidebar');

    // --- 3. Content Umschalten (SPA Logik) ---
    navLinks = document.querySelectorAll('.class-nav-link');
    sections = document.querySelectorAll('.class-content-section');

    // --- 4. Untermenü (Akkordeon) ---
    submenuButtons = document.querySelectorAll('.class-submenu-btn');

	/***********************************************************************
	*  \brief       EventListener submenu
	***********************************************************************/
	
	submenuButtons.forEach(button => {
		button.addEventListener('click', () => {
			const parent = button.parentElement;
			document.querySelectorAll('.class-has-submenu').forEach(item => {
				if (item !== parent) item.classList.remove('open');
			});
			parent.classList.toggle('open');
		});
	});
	
	/***********************************************************************
	*  \brief       navLinks menuToggle
	***********************************************************************/
	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault(); // Verhindert das Springen der Seite
        
			const targetId = link.getAttribute('data-target');
			//console.log(link.getAttribute('data-target'));
			//console.log(link.getAttribute('data-content'));
			active_section = link.getAttribute('data-content');

			// --- HIGHLIGHT LOGIK ---
			// 1. Entferne die aktive Klasse von allen Links
			navLinks.forEach(l => l.classList.remove('class-active-link'));
			// 2. Füge sie dem aktuell geklickten Link hinzu
			link.classList.add('class-active-link');

			// 1. Alle Sektionen verstecken
			sections.forEach(sec => sec.classList.remove('active'));

			// 2. Ziel-Sektion anzeigen
			document.getElementById(targetId).classList.add('active')

			// 3. Auf Mobile: Sidebar nach Klick schließen
			if (window.innerWidth <= 500) {
				sidebar.classList.remove('active');
			}

			// KRITISCH: Wenn die Tabelle sichtbar wird, muss Tabulator das Layout neu berechnen


		});
	});
	
}

/*****************************************************************************************/

