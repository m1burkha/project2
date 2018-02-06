# CAS FEE Projekt 2 - Dienstplaner

Das Projekt besteht in der Erstellung einer Webseite zur vereinfachten Mitarbeiterplanung.

## geplante Module

Die folgenden Module sind verpflichtend für das funktioniern der Webseite und werden zwingend umgesetzt.

- Benutzer-Authentifizierung   
    - Login-Formular mit verschiedenen Login-Möglichkeiten (über E-Mail + Passwort, Google-Account, Facebook-Account, etc.)
- Benutzer-Verwaltung (mit Benutzergruppen)
    - die verschiedenen Benutzer haben können in drei verschiedenen Benutzergruppen sein. Admin, Editor und User. Diese Gruppen können den Accounts hinzugefügt werden.
    - neue Benutzer können der eigenen Umgebung hinzugefügt werden (Admin & Editor).
- Mitarbeiter-Verwaltung
    - Mitarbeiter der Umgebung können verwaltet werden (CRUD). Diese Mitarbeiter werden mit dem jeweiligen Dienst im Planer verknüpft.
- Dienstvorlagen-Verwaltung
    - hier werden Vorlagen für den Dienstplan verwaltet (CRUD). Diese können dann im Dienstplan ausgewählt werden. 
    - Das können Tages-Vorlagen sein (Urlaub, Kompensation, Militär, Krank, etc.)
    - Das können Zeit-Vorlagen sein (z.B.: 0800-1200 & 1330-1700)
- Dienstplaner
    - hier werden Dienste erstellt. Dazu wird pro Tag eine Vorlage ausgewählt und einem Mitarbeiter zugewiesen.
- Urlaubs- / Feiertagsverwaltung
    - hier können für Mitarbeiter vereinfacht Urlaubs- und Feiertage eingetragen werden (für die ganzjährige Urlaubsübersicht).

## mögliche weitere Module

Je nach Zeit und Aufwand, kann das Projekt noch um folgende Module erweitert werden.

- Arbeitszeiterfassung
- Arbeitszeitauswertung
- Arbeitszeit-Verwaltung
- mobile Arbeitszeiterfassung (mit NFC-Modul)
- persönliche Mitarbeiterkonten (mit Login)
- Benachrichtigungen (Mail / SMS / Notifications)
