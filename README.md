# HTML5-Dateibrowser (Web-Engineering 1)

## Setup
Es kann der bereits vorgegebene Fileserver verwendet werden. Dabei ist zu beachten, dass der Server auf Port ```8080``` laufen muss.
Der Fileserver kann mittels ```./start.sh```(linux/git bash) oder ```./start.bat```(windows) in dem [fileservice](/fileservice/) gestartet werden.

Die Webseite benötigt einen Webserver um zu funktionieren, da die URL benutzt wird. 
Um den Webserver - in diesem Fall vom httpd image - zu starten, kann ebenfalls der command ```./start.sh```(linux/git bash) oder ```./start.bat```(windows) benutzt werden.
Der [Webserver](http://localhost:8081) inklusive Webseite ist dann unter Port ```8081``` zuerreichen.

## Browser
| Browser | Version | Checked |
|---------|---------|---------|
|Chrome Windows|115.0.5790.110|✔️|
|Chrome iOS|115.0.5790.130|✔️|

Die Skalierbarkeit für jede gängige Bildschirmdimensionen ist gegeben. 

## Nutzung
Bei erstem betreten der Webseite kommt man zum Loginscreen. Dort kann man sich mit bekannten Accountdaten anmelden (```admin:admin```).
Nach dem Login sieht man die Navbar. Sie enthält links ein Logo und rechts den Logoutknopf. Dieser Löscht alle Sessiontokens und macht eine Request zum backend. Daraufhin wird der Loginscreen wieder angezeigt.

Ebenfalls wird dort die Übersicht mit allen Ordnern und Datein angezeigt. In dem breadcrumb kann man sehen in welchem Verzeichnis man sich derzeit befindet.
Rechts daneben kann man den Ordner/Datei löschen, einen Ordner erstellen, eine Textdatei erstellen und eine Datei hochladen.


Datein und Ordner sind vertikal aufgelistet und mit entsprechenden Emojis gekennzeichnet. Drücken auf jeweiliges Verzeichnis/Datei für in dieses Verzeichnis oder öffnet die Datei.
Je nach Datei kann diese bearbeitet werden. Das Textfeld kann nach belieben vergrößert und verkleinert weren. Über die Knöpfe "Speichern", "Verwerfen" und "Zurücksetzen" können Aktionen auf den Text angewandt werden.
Mediadatein, wie Bilder, Videos und Audio können ebenfalls angeschaut werden und sind mittig zentriert.
Datein können ebenfalls über den Knopf "Download" heruntergeladen werde.
