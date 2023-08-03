# HTML5-Dateibrowser (Web-Engineering 1)

## Setup
Es kann der bereits vorgegebene Fileserver verwendet werden. Dabei ist zu beachten, dass der Server auf Port ```8080``` laufen muss.
Der Fileserver kann mittels ```./start.sh```(linux/git bash) oder ```./start.bat```(windows) in dem [fileservice](/fileservice/) gestartet werden.

Die Webseite benötigt einen Webserver, um zu funktionieren, da die URL benutzt wird. 
Um den Webserver - in diesem Fall vom httpd image - zu starten, kann ebenfalls der command ```./start.sh```(linux/git bash) oder ```./start.bat```(windows) benutzt werden.
Der [Webserver](http://localhost:8081) inklusive Webseite ist dann unter Port ```8081``` erreichbar.

## Browser
| Browser | Version | Checked |
|---------|---------|---------|
|Chrome Windows|115.0.5790.110|✔️|
|Chrome iOS|115.0.5790.130|✔️|

Die Skalierbarkeit für jede gängige Bildschirmdimension ist gegeben. 

## Nutzung
Bei erstem betreten der Webseite kommt man zum Loginscreen. Dort kann man sich mit bekannten Accountdaten anmelden (```admin:admin```).
Nach dem Login sieht man die Navbar. Sie enthält links ein Logo und rechts den Logoutknopf. Dieser löscht alle Sessiontokens und macht eine Request zum backend. Daraufhin wird der Loginscreen wieder angezeigt.

Ebenfalls wird dort die Übersicht mit allen Ordnern und Dateien angezeigt. In dem Breadcrumb kann man sehen, in welchem Verzeichnis man sich derzeit befindet.
Rechts daneben kann man den Ordner/Datei löschen, einen Ordner erstellen, eine Textdatei erstellen und eine Datei hochladen. Dabei ist zu beachten, dass man ausschließlich leere Ordner löschen kann.


Dateien und Ordner sind vertikal aufgelistet und mit entsprechenden Emojis gekennzeichnet. Drücken auf jeweiliges Verzeichnis/Datei für in dieses Verzeichnis oder öffnet die Datei.
Je nach Datei kann diese bearbeitet werden. Das Textfeld kann nach Belieben vergrößert und verkleinert werden. Über die Knöpfe "Speichern", "Verwerfen" und "Zurücksetzen" können Aktionen auf den Text angewandt werden.
Mediadateien, wie Bilder, Videos und Audio können ebenfalls angeschaut werden und sind mittig zentriert.
Dateien können ebenfalls über den Knopf "Download" heruntergeladen werden.

Auch kann man direkt einen Pfad aufrufen, wenn man ihn in die URL eingibt. So ist es z.B. möglich einen Link zuteilen. 

# Fehlererkennung
Falls ein Nutzer eine Aktion durchführt, die entweder falls ist, er keine Rechte dazu hat oder es Probleme mit dem Backend-Server gibt, wird ein Alert mit der Fehlernachrit ausgegeben.
Falls der Nutzer bereits angemeldet war und seine Session ausgelaufen ist, wird dieser beim Ausführen einer Aktion daran gehindert und darauf hingewiesen. Ebenfalls wird er zum Loginscreen weitergeleitet.
