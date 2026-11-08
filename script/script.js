/***********************************************************************
*! \file:                   javascript.js
*  \projekt:                webserial
*  \created on:             2026 11 08
*  \author:                 R. Gräber
*  \version:                01
*  \history:                -
*  \brief:					KI Anpassungen
***********************************************************************/


/***********************************************************************
* Includes
***********************************************************************/

/***********************************************************************
* Informations
***********************************************************************/
//https://www.dyclassroom.com/c/c-pointers-and-two-dimensional-array
/* Startet ein Intervall, das alle 1 Sekunde ausgeführt wird
let counter = 0;
const intervalId = setInterval(() => {
    counter++;
    console.log(`Zähler: ${counter}`);

    // Bedingung zum Stoppen
    if (counter >= 5) {
        clearInterval(intervalId); // Intervall stoppen
        console.log("Intervall gestoppt.");
    }
}, 1000);*/
/***********************************************************************
* Declarations
***********************************************************************/

/***********************************************************************
* Test Data
***********************************************************************/
const date_for_wifi = [
    {id: 1, ssid: "WifiEins", pass: "IstGeheim", comment: "Home", mode: "AP"},
    {id: 2, ssid: "WifiDeins", pass: "AuchGeheim", comment: "Garten", mode: "STA"},
];

const tableDataNested = [{ name: "wertename", value: 0 }];

const tableData = [
    { id: 1, name: "Web-App Alpha", progress: 100, status: "Abgeschlossen", date: "01.01.2024" },
    { id: 2, name: "E-Commerce Shop", progress: 45, status: "In Arbeit", date: "15.02.2024" },
    { id: 3, name: "Portfolio Design", progress: 15, status: "Geplant", date: "20.03.2024" },
    { id: 4, name: "Datenbank Migration", progress: 80, status: "Testphase", date: "05.01.2024" },
];


/***********************************************************************
* Global Variable
***********************************************************************/

/***********************************************************************
* local Variable
***********************************************************************/

let menuToggle;
let sidebar;
let navLinks;
let sections;
let submenuButtons;
let ctx;
let dataChart;

let active_section = "";
let data_table;
let tabellen_daten;
let device_storage_table;
let device_memory_table;
let master_config_table;
let slave_config_table;
/***********************************************************************
* Constant
***********************************************************************/

/***********************************************************************
* Local Funtions
***********************************************************************/
menuToggle = document.getElementById('menu-toggle');
sidebar = document.getElementById('sidebar');

// --- 3. Content Umschalten (SPA Logik) ---
navLinks = document.querySelectorAll('.nav-link');
sections = document.querySelectorAll('.content-section');

// --- 4. Untermenü (Akkordeon) ---
submenuButtons = document.querySelectorAll('.submenu-btn');

ctx = document.getElementById('id_chart_table');


/***********************************************************************
*! \fn          draw_chart()
*  \brief       build log table
*  \param       none
*  \exception   none
*  \return      none
***********************************************************************/
function draw_chart() {
    if (typeof dataChart !== 'undefined' && dataChart) {
        dataChart.destroy();
    }
        
    switch (active_section) {
        case "example": {
            dataChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Rot', 'Blau', 'Gelb', 'Grün'],
                    datasets: [{
                        label: 'Stimmenanzahl',
                        data: [12, 19, 3, 5],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
            break;
        }
        default:
            break;
    }
}

/***********************************************************************
*! \fn          init_data_table()
*  \brief       build log table
*  \param       none
*  \exception   none
*  \return      none
***********************************************************************/
function init_data_table(init_table_section) {
    const active_section_sel = (active_section === "") ? init_table_section : active_section;
    
    switch (active_section_sel) {
        case "example": {
            tabellen_daten = [
                { Time: "2026-01-01", message: "Web-App Alpha", status: "Abgeschlossen" },
            ];
            data_table = new Tabulator("#id_data_table", {
                data: tabellen_daten,
                layout: "fitColumns",
                placeholder: "Lade Daten...",
                rowHeader: { formatter: "rownum", headerSort: false, hozAlign: "center", resizable: true, frozen: true },
                columns: [
                    { title: "timestamp", field: "Time", widthGrow: 2 },
                    { title: "message", field: "message" },
                    { title: "Status", field: "status" },
                ],
            });
            break;
        }
        case "wifi": {
            data_table = new Tabulator("#id_data_table", {
                data: date_for_wifi,
                history: true,
                layout: "fitColumns",
                placeholder: "Lade Daten...",
                rowHeader: { formatter: "rownum", headerSort: false, hozAlign: "center", resizable: true, frozen: true },
                columns: [
                    { title: "SSID Name", field: "ssid", widthGrow: 2, editor: "input" },
                    { title: "Password", field: "pass", editor: "input" },
                    { title: "Modus", field: "mode", editor: "list", editorParams: { values: { "ap": "AP", "sta": "Client" } } },
                    { title: "Kommentar", field: "comment", editor: "input" },
                ],
            });
            if (typeof fetchSensorData === 'function') {
                fetchSensorData();
            }
            break;
        }
        case "device_storage": {
            device_storage_table = new Tabulator("#id_device_storage_table", {
                layout: "fitColumns",
                placeholder: "Lade Daten...",
                data: tableDataNested,
                dataTree: true,
                dataTreeStartExpanded: true,
                columns: [
                    { title: "filesystem", field: "filesystem", responsive: 0 },
                    { title: "size", field: "size" },
                    { title: "used", field: "used" },
                    { title: "available", field: "available" },
                    { title: "use_percent", field: "use_percent" },
                    { title: "mounted_on", field: "mounted_on" }
                ],
            });
            break;
        }
        case "device_memory": {
            device_memory_table = new Tabulator("#id_device_memory_table", {
                layout: "fitColumns",
                placeholder: "Lade Daten...",
                data: tableDataNested,
                dataTree: true,
                dataTreeStartExpanded: true,
                columns: [
                    { title: "Name", field: "name", responsive: 0 },
                    { title: "Total", field: "total" },
                    { title: "Used", field: "used" },
                    { title: "Free", field: "free" },
                    { title: "Shared", field: "shared" },
                    { title: "Buff/Cache", field: "buff/cache" },
                    { title: "Available", field: "available" }
                ],
            });
            break;
        }
        case "master_config": {
            master_config_table = new Tabulator("#id_master_configuration_table", {
                layout: "fitColumns",
                placeholder: "Lade Daten...",
                data: tableDataNested,
                history: true,
                movableRows: true,
                columns: [
                    { title: "Number", field: "id", formatter: "rownum", responsive: 0 },
                    { title: "Serieller Port", field: "serial", editor: "input" },
                    { title: "ID", field: "id", editor: "input" },
                    { title: "Kommentar", field: "kommentar", editor: "input" }
                ],
            });
            break;
        }
        case "device_comports": {
            device_comports_table = new Tabulator("#id_device_comports_table", {
                layout: "fitColumns",
                placeholder: "Lade Daten...",
                data: tableDataNested,
                columns: [
                    { title: "Number", formatter: "rownum", responsive: 0 },
                    { title: "Gerät", field: "device" },
                    { title: "ID", field: "hwid" },
                    { title: "Beschreibung", field: "description" }
                ],
            });
            break;
        }
        case "slave_config": {
            slave_config_table = new Tabulator("#id_slave_configuration_table", {
                layout: "fitColumns",
                placeholder: "Lade Daten...",
                data: tableDataNested,
                columns: [
                    { title: "Number", formatter: "rownum", responsive: 0 },
                    { title: "Gerät", field: "device", editor: "input" },
                    { title: "MAC", field: "mac", editor: "input" },
                    { title: "Resolution X", field: "resolution_x", editor: "input" },
                    { title: "Resolution Y", field: "resolution_y", editor: "input" },
                    { title: "Start X", field: "start_x", editor: "input" },
                    { title: "Start Y", field: "start_y", editor: "input" },
                    { title: "Kommentar", field: "kommentar", editor: "input" }
                ],
            });
            break;
        }
        default:
            break;
    }
}


/***********************************************************************
*! \fn          get_periodic_data()
*  \brief       collect data from host
*  \param       none
*  \exception   none
*  \return      none
***********************************************************************/
function get_periodic_data() {
    switch (active_section) {
        case "target_id_data_table": {
            if (data_table) {
                const new_row = { Time: new Date().toISOString(), message: "Web-App Alpha", status: "Abgeschlossen" };
                data_table.addRow(new_row);
            }
            break;
        }
        default:
            break;
    }
}

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
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        datetimeElement.textContent = now.toLocaleString('de-DE', options);
    }
}

 /***********************************************************************
*! \fn          function Start(status)
*  \brief       AFTER PAGE LOADS CALL YOUR SCRIPTS HERE
*  \param       status - status from page load dunction
*  \exception   none
*  \return      none
***********************************************************************/   
function Start(status) {

    init_site();

    setInterval(updateClock, 1000);
	
	//setInterval(get_periodic_data, 5000); 
    
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
function init_site() {
    menuToggle = document.getElementById('menu-toggle');
    sidebar = document.getElementById('sidebar');
    navLinks = document.querySelectorAll('.nav-link');
    sections = document.querySelectorAll('.content-section');
    submenuButtons = document.querySelectorAll('.submenu-btn');

    const chartCanvas = document.getElementById('id_chart_table');
    if (chartCanvas) {
        ctx = chartCanvas.getContext('2d');
    }

    // Sidebar Toggle Event
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Undo Buttons Event-Listener
    document.querySelectorAll("[name='history_undo']").forEach(button => {
        button.addEventListener("click", function() {
            if (this.id === "history_undo_master_configuration_table" && master_config_table) {
                master_config_table.undo();
            } else if (this.id === "data_table_undo" && data_table) {
                data_table.undo();
            } else if (this.id === "history_undo_slave_configuration_table" && slave_config_table) {
                slave_config_table.undo();
            }
        });
    });

    // Submenu Akkordeon Event-Listener
    submenuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parent = button.parentElement;
            document.querySelectorAll('.has-submenu').forEach(item => {
                if (item !== parent) item.classList.remove('open');
            });
            parent.classList.toggle('open');
        });
    });

    // Navigation / SPA Logik Event-Listener
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        
            const targetId = link.getAttribute('data-target');
            active_section = link.getAttribute('data-content') || "";

            // Highlight Logik
            navLinks.forEach(l => l.classList.remove('active-link'));
            link.classList.add('active-link');

            // Sektionen umschalten
            sections.forEach(sec => sec.classList.remove('active'));
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Auf Mobile: Sidebar nach Klick schließen
            if (window.innerWidth <= 500 && sidebar) {
                sidebar.classList.remove('active');
            }

            // Tabulator / Chart initialisieren je nach Ziel
            if (targetId === "target_id_data_table" || targetId === "target_id_data_wifi") {
                init_data_table();
            }
            if (targetId === "target_id_chart") {
                draw_chart();
            }
        });
    });
}

/*****************************************************************************************/

