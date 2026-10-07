---
tags: [react, event-handling, wid3, uebung]
datum: 2026-10-07
---

# React Event Handling – Learnings

Übung WID 3: Wie reagieren React-Elemente auf Interaktion (Klick, Maus, Eingabe, Tastatur)?
Ausgaben wurden mit `console.log()` in der Browser-Konsole (F12) geprüft.

## 1. Grundkonzept

Ein **Event Handler** wird wie ein Attribut in das Start-Tag eines Elements geschrieben. In den geschweiften Klammern `{}` steht eine **Funktion**.

```jsx
<button onClick={(e) => console.log(e.target.id)}>Klick mich</button>
```

- Man **übergibt** die Funktion, man **ruft sie nicht selbst auf**. React ruft sie auf, sobald das Ereignis eintritt.
- React übergibt der Funktion ein **Event-Objekt** `e`.
- `e.target` ist das Element, an dem das Ereignis passiert ist.
- Handler-Namen sind in **camelCase** geschrieben: `onClick`, `onMouseEnter`, `onChange`, `onKeyDown`.

### Typischer Fehler: Funktion direkt aufrufen

```jsx
// FALSCH: wird sofort beim Rendern ausgeführt, nicht beim Klick
<button onClick={console.log("hi")}>

// RICHTIG: Funktion wird übergeben, React ruft sie beim Klick auf
<button onClick={() => console.log("hi")}>
```

### Eigene Funktion statt anonymer Arrow Function

Die Funktion kann auch vor dem `return` definiert werden:

```jsx
export default function App() {
  const handleClick = (e) => console.log(e.target.id);

  return <button id="button1" onClick={handleClick}>Klick mich</button>;
}
```

Hier steht `handleClick` **ohne Klammern**, weil die Funktion übergeben wird.

## 2. Das Event-Objekt `e`

Das Event-Objekt enthält Infos zum Ereignis:

| Eigenschaft | Bedeutung |
|---|---|
| `e.target` | Das Element, an dem das Ereignis ausgelöst wurde |
| `e.target.id` | Die `id` des Elements |
| `e.target.value` | Der `value` des Elements (Text im Eingabefeld) |
| `e.target.checked` | Zustand einer Checkbox (`true` / `false`) |
| `e.key` | Die gedrückte Taste (bei Tastatur-Events) |

**Wann braucht man `e`?** Nur, wenn man diese Infos verwenden will. Wenn es reicht zu wissen, *dass* etwas passiert ist, schreibt man `() =>` ohne Parameter.

## 3. Button: onClick, onMouseEnter, onMouseLeave

```jsx
<button
  id="button1"
  onClick={(e) => console.log(e.target.id)}
  onMouseEnter={() => console.log("rein")}
  onMouseLeave={() => console.log("raus")}
>
  Klick mich
</button>
```

| Handler | Wann wird er ausgelöst? |
|---|---|
| `onClick` | Beim Klick auf das Element |
| `onMouseEnter` | Wenn die Maus in das Element hineinfährt |
| `onMouseLeave` | Wenn die Maus das Element verlässt |

### Beobachtungen

- Die Konsole zeigt `button1` mit einer Zahl daneben. Das ist kein React-Feature, sondern die Konsole fasst **identische, direkt aufeinanderfolgende Meldungen** zusammen und zählt sie.
- `onMouseEnter` und `onMouseLeave` brauchen das Event-Objekt nicht, deshalb `() =>`.

### Warum ist `e.target.value` beim Button leer?

```jsx
<button onClick={(e) => console.log(e.target.value)}>Klick mich</button>
```

- `value` ist ein Attribut, das man **selbst setzen** muss.
- Der Button hat keins, deshalb ist das Ergebnis ein **leerer String `""`**, nicht `undefined`. `<button>` kennt die Eigenschaft `value`, sie ist standardmässig leer.
- Mit `value="hallo"` am Button wird `hallo` geloggt.
- Bei einem **Textfeld** ist `value` der eingetippte Text. Dort ist `e.target.value` besonders nützlich.

## 4. Checkbox: onChange

```jsx
<input
  type="checkbox"
  onChange={(e) => console.log(e.target.checked)}
/>
```

- Ausgabe: abwechselnd `true` und `false`.
- `e.target.checked` ist ein **Boolean**: angehakt = `true`, nicht angehakt = `false`.

### Warum `onChange` und nicht `onClick`?

- `onChange` feuert, wenn sich der **Zustand** ändert, egal wie (Maus, Tastatur mit Leertaste).
- `onClick` reagiert nur auf den Klick selbst.
- In React ist `onChange` der Standard-Handler für Formularelemente.

## 5. Textfeld: onKeyDown

```jsx
<input
  type="text"
  onKeyDown={(e) => console.log(e.key)}
/>
```

- Bei Buchstaben und Zeichen ist `e.key` das Zeichen selbst (`"a"`, `"B"`, `"7"`).
- Bei Sondertasten steht ein **Name** da:

| Taste | `e.key` |
|---|---|
| Enter | `"Enter"` |
| Leertaste | `" "` (ein Leerzeichen) |
| Backspace | `"Backspace"` |
| Pfeil links | `"ArrowLeft"` |
| Shift | `"Shift"` |

### `e.key` vs. `e.target.value`

- `e.key` = die **gedrückte Taste**.
- `e.target.value` = der **Inhalt des Feldes**.
- Bei `onKeyDown` hinkt `e.target.value` **ein Zeichen hinterher**, weil das Event ausgelöst wird, *bevor* das Zeichen im Feld steht.

### Praktischer Einsatz: Enter erkennen

```jsx
<input
  type="text"
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      console.log("Eingabe abgeschickt:", e.target.value);
    }
  }}
/>
```

Hier ist `e.target.value` beim Drücken von Enter korrekt, weil der Text vorher schon eingetippt wurde.

## 6. Gesamtcode der Übung

```jsx
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Event Handling</h1>

      <button
        id="button1"
        onClick={(e) => console.log(e.target.value)}
        onMouseEnter={() => console.log("rein")}
        onMouseLeave={() => console.log("raus")}
      >
        Klick mich
      </button>

      <input
        type="checkbox"
        onChange={(e) => console.log(e.target.checked)}
      />

      <input
        type="text"
        onKeyDown={(e) => console.log(e.key)}
      />
    </div>
  );
}
```

## 7. Kurzfassung

- Handler = Funktion im Attribut, in `{}`, camelCase-Name.
- Funktion **übergeben**, nicht aufrufen: `onClick={() => ...}`, nicht `onClick={fn()}`.
- `e` nur angeben, wenn man Infos aus dem Event braucht.
- `e.target` ist das Element, dessen Eigenschaften (`id`, `value`, `checked`) man ausliest.
- Button: `onClick`, `onMouseEnter`, `onMouseLeave`.
- Checkbox: `onChange` mit `e.target.checked` (Boolean).
- Textfeld: `onKeyDown` mit `e.key` (gedrückte Taste), nicht mit dem Feldinhalt verwechseln.

## 8. Selbsttest

1. Was passiert bei `onClick={console.log("hi")}` und warum?
2. Warum zeigt `e.target.value` bei einem Button ohne `value`-Attribut einen leeren String?
3. Warum ist `onChange` bei einer Checkbox besser als `onClick`?
4. Was loggt `e.key`, wenn man Enter drückt?
5. Warum hinkt `e.target.value` bei `onKeyDown` einen Buchstaben hinterher?
