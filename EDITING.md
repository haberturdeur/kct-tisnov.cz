# Úpravy webu v Pages CMS

Všechny stránky mají vizuální editor na https://admin.kct-tisnov.cz.
Nadpisy, odkazy, seznamy, obrázky a tabulky upravujte přímo v editoru.

## Styly

Klikněte do odstavce nebo tabulky a vyberte styl v nabídce **Style** nad editorem:

- **Místa na trase**: na webu rozbalovací seznam míst se zachováním dosavadního
  vzhledu. V editoru je text vždy rozbalený a lze jej běžně upravovat.
- **Tabulka účasti**: kompaktní tabulka s vodorovným posouváním a zvýrazněným
  posledním sloupcem. Výběr uvnitř buňky použije styl na celou tabulku.
- **Default**: odstraní styl a zachová obsah.

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
