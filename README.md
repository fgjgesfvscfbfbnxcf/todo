# Moje Úkoly

Jednoduchá TODO aplikace napsaná v Expo (React Native). Stejný kód běží na
Androidu, iOS i v prohlížeči.

## Funkce

- **Přidat úkol** – prázdný úkol (ani samotné mezery) přidat nejde, tlačítko zůstává neaktivní.
- **Zobrazit seznam** – úkoly jsou seřazené od nejnovějšího, nahoře je počítadlo zbývajících úkolů.
- **Označit jako hotové** – kliknutím na zaškrtávací políčko nebo na text úkolu; hotový úkol se přeškrtne a zčervená.
- **Smazat úkol** – tlačítko `✕` na řádku, nebo hromadně „Smazat dokončené“.
- **Vlastní vzhled** – tmavý fialový motiv, všechny barvy jsou v `src/theme.ts`.
- Úkoly se **ukládají na zařízení** (AsyncStorage), takže přežijí zavření aplikace.

## Jak aplikaci spustit

### 1. Expo Go na telefonu (doporučeno)

1. Nainstaluj si **Expo Go** z
   [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   nebo [App Store](https://apps.apple.com/app/expo-go/id982107779).
2. V tomto adresáři spusť:

   ```bash
   npm install
   npx expo start
   ```

3. Telefon a počítač musí být ve stejné Wi‑Fi síti.
4. Naskenuj QR kód v Expo Go (kamera v aplikaci Expo Go → „Scan QR code“).

### 2. V prohlížeči na tomto počítači

```bash
npx expo start --web
```

Aplikace se otevře na `http://localhost:8081`.

## Struktura projektu

```
App.tsx                        hlavní obrazovka (hlavička, pole, seznam, prazdny stav)
src/theme.ts                   barvy, rozestupy a zaobleni
src/types.ts                   datovy typ Todo
src/storage.ts                 cteni a zapis do AsyncStorage
src/hooks/useTodos.ts          stav aplikace: pridat / oznacit / smazat
src/components/TodoInput.tsx   pole pro novy ukol + tlacitko Pridat
src/components/TodoItem.tsx    radek seznamu: zaskrtavaci policko, text, smazani
```

## Použité technologie

| Knihovna | Proč |
| --- | --- |
| `expo` (SDK 57) | běhové prostředí a vývojový server |
| `react-native` | komponenty (`View`, `Text`, `Pressable`, `FlatList`) |
| `@react-native-async-storage/async-storage` | trvalé uložení úkolů |
| `react-native-safe-area-context` | rozlišení výřezu a stavového řádku |
| `react-native-web` + `react-dom` | běh v prohlížeči |

## Možná vylepšení

- upravit text úkolu tapnutím na jeho text
- filtrování (vše / aktivní / hotové)
- data s termínem a připomínkou