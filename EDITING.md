# Úpravy webu v Pages CMS

Všechny stránky mají vizuální editor na https://admin.kct-tisnov.cz.
Nadpisy, odkazy, seznamy, obrázky a tabulky upravujte přímo v editoru.

## Úvodní stránka a články

Stránky ročníků pojmenovávejte jednotně: **Tišnovská padesátka 2026 — 56. ročník**.
U zprávy po akci použijte např. **Tišnovská padesátka 2020 — ohlédnutí za 50. ročníkem**.

- **Datum konání akce** (`eventDate`) určuje datum zobrazené u ročníku.
  Úvodní stránka ukazuje ročník vybraný v **Úvodní stránka — přehled tras**;
  při přechodu na nový rok změňte stránku ročníku i jeho trasy.
  Datum zveřejnění článku zůstává samostatné.
- **Krátké shrnutí pro přehled** (`cardSummary`) vyplňte jednou až dvěma
  větami. Celý článek, seznamy tras a tabulky zůstávají na vlastní stránce.
- **Úvodní stránka — přehled tras** upravuje mřížku karet všech tras. Zadejte
  stránku ročníku a rok, pak přidejte všechny trasy včetně varianty pro kočárky.
  Vyplňte cestu k nahranému PDF (např. `/padesatka/2026/T10.pdf`); karta
  zobrazí mapu jako obrázek s možností zvětšení a stažení PDF. Kotva pro odkaz na podrobnosti musí odpovídat
  nadpisu trasy v článku (např. nadpis `T10` má kotvu `t10`, bez znaku `#`).
  Používejte běžné nadpisy editoru, nikoli ručně psané `{#…}`.
  Po přejmenování nadpisu aktualizujte kotvu na kartě. Při změně ročníku
  aktualizujte i všechny karty, délky a odkazy.
- Přehled tras je oddělený od **Ze života klubu**, kde se zobrazují články
  z kolekce **Články**. Pozvánky patří k ročníkům, ohlédnutí mezi články.
- Úvodní text přehledu akcí najdete v **Úvod — Akce**.

Při přenosu starších článků zachovejte původní datum zveřejnění a odkaz na
zdroj. U pozvánek uveďte také původní datum konání. Historické údaje
(účast, členská základna, tehdejší program) označte rokem; nepřepisujte je
jako dnešní stav. Starší trasy představujte jako trasy konkrétního ročníku.

## Obrázkové náhledy map

Při nasazení se PDF v `static/padesatka/` automaticky převedou na obrázky
všech stran. Po nahrání či výměně PDF přes CMS stačí počkat na dokončení
nasazení. Náhledy se zobrazují jako obrázky, bez vložené PDF čtečky;
původní dokument zůstává ke stažení.

Pro místní náhled nainstalujte Python 3 a Poppler (`sudo apt install
poppler-utils` na Ubuntu/Debianu). Před spuštěním Huga po změně PDF spusťte:

```sh
python3 scripts/render-route-previews.py
hugo server
```

Skript vytváří JPEG soubory v podsložkách `previews` vedle PDF a jejich
seznam v `data/route_previews.json`. Tyto výstupy neupravujte ručně.

## Archiv výletů

Do kolekce **Archiv výletů** přidávejte odkazy na skutečná fotoalba.
Stačí název a úplný
**Odkaz na fotoalbum (Rajče)** (`albumUrl`, včetně `https://`).
Záznam odkazuje přímo na Rajče; fotografie zůstávají v externím albu.
Samostatný článek není potřeba. Shrnutí i obsah jsou nepovinné;
nevymýšlejte popisy výletů, o kterých nemáte informace.

**Datum výletu (pokud je známé)** (`eventDate`) doplňte pouze podle
ověřených údajů. Znáte-li jen rok, vyplňte **Rok alba (pokud není známé
datum)** (`albumYear`). Nepovinné **Datum zveřejnění alba** (`publishDate`)
vyplňte jen při známém datu nahrání; na webu je označeno **Zveřejněno**.
Datum nahrání ani technická data fotografií nepovažujte za datum výletu.

Archiv seskupuje záznamy podle roku výletu, jinak podle roku alba,
poté podle známého data zveřejnění. Bez těchto údajů patří album
do skupiny **Bez data**. Nevymýšlejte chybějící data. Původní import
obsahuje všech 334 alb s jejich původními názvy; datum či rok z názvu
se použije jen tam, kde je jednoznačný.

Nový záznam se ukládá jako **Koncept**. Před vypnutím této volby ověřte
název, data a funkčnost odkazu na album. Úvodní stránka při sestavení
webu vybírá nejnovější zveřejněné záznamy. Úvod archivu upravíte
v položce **Úvod — Archiv výletů**.

## Styly

Označte text v odstavci nebo tabulce. V nabídce **Text / Heading** na plovoucím
panelu vyberte styl v sekci **Custom styles**:

- **Místa na trase**: na webu rozbalovací seznam míst se zachováním dosavadního
  vzhledu. V editoru je text vždy rozbalený a lze jej běžně upravovat.
- **Tabulka účasti**: kompaktní tabulka s vodorovným posouváním a zvýrazněným
  posledním sloupcem. Výběr uvnitř buňky použije styl na celou tabulku.
- **Remove custom style**: odstraní styl a zachová obsah.

Není potřeba psát shortcody ani HTML. Přepínač Source zůstává dostupný pro
pokročilé úpravy. Uložení do větve `main` spustí zveřejnění webu.

## Přidání dalšího stylu

Definice žijí v `.pages.yml` pod `options.styles` společného pole `body`:

```yaml
styles:
  - name: upozorneni
    label: Upozornění
    preview:
      background-color: "#fff3cd"
      color: "#664d03"
```

Po načtení nové konfigurace se styl objeví v CMS bez jeho přestavení. `name`
musí začínat malým písmenem a smí obsahovat malá písmena, číslice a pomlčky.
`preview` nastavuje vzhled uvnitř editoru. Podporuje `color`, `background-color`,
`border-color`, `font-size`, `font-weight`, `font-style`, `text-align` a `line-height`.

Vzhled webu definujte třídou `.upozorneni` v `assets/main/scss/_custom.scss`.
Pro vlastní HTML či chování přidejte `layouts/partials/cms-styles/upozorneni.html`.
Partial dostává `Page` a `Inner` (Markdown). Bez partialu se obsah vykreslí
v obyčejném `<div class="upozorneni">`.

CMS ukládá styl jako `cms-style` shortcode s původním Markdownem uvnitř;
vizuální editor ho umí znovu načíst bez ztráty stylu. Definice konkrétních
stylů ani vzhled tohoto webu nejsou součástí zdrojového kódu Pages CMS.

## Karty tras na stránkách Padesátky

Každou trasu začněte nadpisem 5 ve tvaru `T10` nebo `CT33` (může následovat
krátký popis). Pod něj vložte běžné odkazy na mapu a PDF a případně seznam
míst se stylem **Místa na trase**. Web tyto úseky automaticky zobrazí
jako mřížku karet. Další hlavní oddíl začněte samostatným nadpisem.
Varianty pro kočárky mohou mít vlastní kartu. Po změně nadpisu upravte
odpovídající kotvu v přehledu tras na úvodní stránce.
