# Modulübersicht

## umgesetzte Module

Die folgenden Module wurden für dieses Projekt umgesetzt.

- Benutzer-Authentifizierung   
    - Login-Formular mit verschiedenen Login-Möglichkeiten (über E-Mail + Passwort, Google-Account, Facebook-Account, etc.)
        - Login mit Benutzername, Passwort
        - Modal zur Registrierung
- Mitarbeiter-Verwaltung
    - Mitarbeiter der Umgebung können verwaltet werden (CRUD). Diese Mitarbeiter werden mit dem jeweiligen Dienst im Planer verknüpft.
        - Mitarbeiter anlegen
        - Mitarbeiter bearbeiten
        - Mitarbeiter löschen
        - Wochenarbeitszeit pro Mitarbeiter festlegen
        - Arbeitspensum pro Mitarbeiter festlegen
        - Urlaubsanspruch pro Mitarbeiter festlegen
- Dienstvorlagen-Verwaltung
    - hier werden Vorlagen für den Dienstplan verwaltet (CRUD). Diese können dann im Dienstplan ausgewählt werden. Das können Tages-Vorlagen sein (Urlaub, Kompensation, Militär, Krank, etc.). Das können Zeit-Vorlagen mit mehreren Arbeitsblöcken pro Tag sein (z.B.: 0800-1200 & 1330-1700)
        - Vorlage anlegen
        - Vorlage bearbeiten
        - Vorlage löschen
        - Stundenblöcke pro Vorlage festlegen
- Dienstplaner
    - hier werden Dienste erstellt. Dazu wird pro Tag eine Vorlage ausgewählt und einem Mitarbeiter zugewiesen.
        - Vorlage aus- oder abwählen
- Dienstplaner Export
    - Der Dienstplaner kann als Excel-Datei heruntergeladen werden.

## mögliche weitere Module

Je nach Zeit und Aufwand, könnte das Projekt noch um folgende Module erweitert werden.

- Benutzer-Verwaltung (mit Benutzergruppen)
    - die verschiedenen Benutzer haben können in drei verschiedenen Benutzergruppen sein. Admin, Editor und User. Diese Gruppen können den Accounts hinzugefügt werden.
    - neue Benutzer können der eigenen Umgebung hinzugefügt werden (Admin & Editor).
- Urlaubs- / Feiertagsverwaltung
    - hier können für Mitarbeiter vereinfacht Urlaubs- und Feiertage eingetragen werden (für die ganzjährige Urlaubsübersicht).
- Grafische Ansicht der Schichten
- Arbeitszeiterfassung
    - die Benutzer tragen die täglich geleistete Arbeitszeit ein und diese wird danach mit der Planung abgeglichen.
- Arbeitszeitauswertung
- Arbeitszeit-Verwaltung
    - falsch erfasste Arbeitszeiten kann der Admin entsprechend anpassen
- mobile Arbeitszeiterfassung (mit NFC-Modul)
    - die Arbeitszeit kann durch ein Terminal direkt vor Ort erfasst werden, ohne einen Computer oder dergleichen benutzen zu müssen.
- persönliche Mitarbeiterkonten (mit Login)
    - der Mitarbeiter kann sich selber einloggen und somit seine Arbeitszeiten einsehen.
- Benachrichtigungen (Mail / SMS / Notifications)