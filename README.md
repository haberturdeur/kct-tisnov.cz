# KČT Tišnov

Zdrojové soubory webu **[kct-tisnov.cz](https://kct-tisnov.cz/)** — Tišnovská
padesátka, archiv společných výletů, fotografie na Rajčeti a informace o klubu.
Web generuje Hugo s upravenou šablonou Hugo Bootstrap Theme.

## Úpravy obsahu

Obsah upravujte v **[Pages CMS](https://admin.kct-tisnov.cz/)**. Podrobný návod
najdete v [EDITING.md](EDITING.md): přidávání ročníků, map a PDF, úpravy tras,
tabulky účasti a odkazy na fotoalba.

Uložení změn do větve `main` spustí sestavení a nasazení webu. Fotografie
zůstávají na Rajčeti; záznamy v archivu na jednotlivá alba přímo odkazují.
Nová alba je potřeba přidat v CMS — archiv se s Rajčetem automaticky nesynchronizuje.

## Místní náhled

Potřebné nástroje:

- **Hugo Extended** — současná konfigurace byla ověřena s verzí `0.167.0`.
- **Node.js 24** a npm, stejně jako v nasazovacím workflow.
- **Go** pro načtení šablony přes Hugo Modules.
- **Python 3** a **Poppler** (`pdftoppm`) pro obrázkové náhledy PDF.

Na Ubuntu/Debianu nainstalujete Poppler příkazem `sudo apt install poppler-utils`.

```sh
git clone https://github.com/haberturdeur/kct-tisnov.cz.git
cd kct-tisnov.cz
npm ci
python3 scripts/render-route-previews.py
hugo server --bind 127.0.0.1 --disableFastRender
```

Náhled běží na **http://127.0.0.1:1313/**. Pro jiný port přidejte například
`--port 1315`. Koncepty zobrazíte přidáním `--buildDrafts`.

Po změně závislostí spusťte znovu `npm ci`. Po přidání nebo výměně PDF spusťte
znovu `python3 scripts/render-route-previews.py`; samotný Hugo server PDF
na obrázky nepřevádí.

## Mapy a PDF

PDF ukládejte do `static/padesatka/<rok>/`, například:

```text
static/padesatka/2026/T10.pdf
```

Odkaz na webu je `/padesatka/2026/T10.pdf` — bez části `static`.
Skript `scripts/render-route-previews.py` převede všechny strany PDF na JPEG
v podsložkách `previews/` a vytvoří seznam `data/route_previews.json`.
Tyto generované soubory neupravujte ručně.

Karty tras zobrazují mapy jako obrázky s možností zvětšení. Původní PDF
zůstávají dostupná ke stažení; náhled nepoužívá vloženou PDF čtečku.

## Produkční sestavení a nasazení

```sh
npm ci
python3 scripts/render-route-previews.py
hugo --minify --gc --enableGitInfo
```

Výstup vznikne v `public/`. Generovaný adresář necommitujte.

Nasazení zajišťuje [GitHub Actions](.github/workflows/gh-pages.yml) při každém
pushi do `main`. Workflow nainstaluje Node.js 24, aktuální Hugo Extended a
Poppler, vygeneruje náhledy map, sestaví web, přidá `CNAME` a publikuje výstup
na GitHub Pages. Průběh a případné chyby najdete na
[kartě Actions](https://github.com/haberturdeur/kct-tisnov.cz/actions).

Konfigurace Netlify a Dockeru pocházejí z původní startovací šablony;
popsaný a používaný postup nasazení je GitHub Pages.

## Kde co najít

| Umístění | Obsah |
| --- | --- |
| `content/padesatka/` | Stránky jednotlivých ročníků, trasy a účast |
| `content/vylety/` | Odkazy na fotoalba z výletů a akcí |
| `content/posts/` | Články, historie a ohlédnutí |
| `content/about/` | Informace o klubu, členství a kontakty |
| `data/home_routes.yaml` | Ročník a karty tras na úvodní stránce |
| `static/padesatka/` | PDF mapy a generované obrázkové náhledy |
| `static/images/` | Obrázky webu |
| `layouts/` | Vlastní šablony a komponenty stránek |
| `assets/main/scss/` | Vzhled webu |
| `assets/main/js/custom.ts` | Mřížka tras a obrázkové náhledy map |
| `config/_default/` | Nastavení Huga, navigace a šablony |
| `.pages.yml` | Kolekce a pole editoru Pages CMS |

Stránky ročníků mají jednotný název, například **Tišnovská padesátka 2026 —
56. ročník**. Při přechodu na nový ročník aktualizujte také
`data/home_routes.yaml`; podrobnosti jsou v [návodu pro editory](EDITING.md).
