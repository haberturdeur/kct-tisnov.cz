const routePreviews: Record<string, string[]> = JSON.parse(
  document.getElementById("route-preview-data")?.textContent || "{}",
);
const previewImages = (url: string): string[] => routePreviews[new URL(url, location.href).pathname] || [];

// Keep route content as ordinary CMS headings and links. Enhance consecutive
// route sections into cards; the original article remains usable without JS.
const routeArticle = document.querySelector<HTMLElement>(".padesatka-page #post-content-body");
if (routeArticle) {
  let grid: HTMLElement | null = null;
  Array.from(routeArticle.children).forEach((heading) => {
    if (!/^H[2-6]$/.test(heading.tagName)) return;
    const match = heading.textContent?.trim().match(/^(C?T)(\d+)\b/);
    if (!match) return;

    if (!grid || grid.nextElementSibling !== heading) {
      grid = document.createElement("div");
      grid.className = "edition-route-grid";
      heading.before(grid);
    }
    const card = document.createElement("section");
    card.className = "edition-route-card";
    const stroller = /kočár/i.test(heading.textContent || "");
    card.dataset.kind = match[1] === "CT" ? "cycle" : stroller ? "stroller" : "walk";
    const methodIcon = document.createElement("span");
    methodIcon.className = "route-method-icon";
    methodIcon.title = match[1] === "CT" ? "Na kole" : stroller ? "S kočárkem" : "Pěšky";
    methodIcon.setAttribute("aria-hidden", "true");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("focusable", "false");
    const symbol = document.createElementNS("http://www.w3.org/2000/svg", "use");
    symbol.setAttribute("href", `#route-icon-${card.dataset.kind}`);
    svg.append(symbol);
    methodIcon.append(svg);
    card.append(methodIcon);
    if (heading.id) card.setAttribute("aria-labelledby", heading.id);
    const following: Element[] = [];
    let sibling = heading.nextElementSibling;
    while (sibling && !/^H[1-6]$/.test(sibling.tagName)) {
      following.push(sibling);
      sibling = sibling.nextElementSibling;
    }
    card.append(heading);
    const distance = document.createElement("p");
    distance.className = "edition-route-distance";
    distance.append(document.createTextNode(`${match[2]} `));
    const unit = document.createElement("small");
    unit.textContent = `km · ${match[1] === "CT" ? "Na kole" : stroller ? "S kočárkem" : "Pěšky"}`;
    distance.append(unit);
    card.append(distance, ...following);
    card.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
      if (!new URL(link.href).pathname.toLowerCase().endsWith(".pdf")) return;
      const images = previewImages(link.href);
      if (!images.length) return;
      const thumbnail = document.createElement("a");
      thumbnail.className = "route-map-thumbnail route-choice";
      thumbnail.href = images[0];
      thumbnail.dataset.routePdf = link.href;
      thumbnail.dataset.routeTitle = heading.textContent?.trim();
      thumbnail.dataset.routeDetails = `#${heading.id}`;
      const image = document.createElement("img");
      image.src = images[0];
      image.alt = `Mapa trasy ${heading.textContent?.trim()}`;
      image.loading = "lazy";
      image.decoding = "async";
      const caption = document.createElement("span");
      caption.textContent = "Zvětšit mapu ↗";
      thumbnail.append(image, caption);
      distance.after(thumbnail);
    });
    grid.append(card);
  });
}

const preview = document.querySelector<HTMLDialogElement>(".route-preview");
if (preview && typeof preview.showModal === "function") {
  const title = preview.querySelector<HTMLElement>("#route-preview-title")!;
  const documentSlot = preview.querySelector<HTMLElement>(".route-preview-document")!;
  const open = preview.querySelector<HTMLAnchorElement>(".route-preview-open")!;
  const download = preview.querySelector<HTMLAnchorElement>(".route-preview-download")!;
  const details = preview.querySelector<HTMLAnchorElement>(".route-preview-details")!;

  document.querySelectorAll<HTMLAnchorElement>(".route-choice").forEach((card) => {
    card.addEventListener("click", (event) => {
      // Preserve modified clicks and ordinary links when dialogs are unsupported.
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const pdf = card.dataset.routePdf || card.href;
      const images = previewImages(pdf);
      if (!images.length) return;
      event.preventDefault();
      title.textContent = card.dataset.routeTitle || "Mapa trasy";
      open.href = download.href = pdf;
      details.href = card.dataset.routeDetails!;
      documentSlot.replaceChildren(...images.map((src, index) => {
        const image = document.createElement("img");
        image.src = src;
        image.alt = `${title.textContent} — strana ${index + 1}`;
        image.loading = index === 0 ? "eager" : "lazy";
        image.decoding = "async";
        return image;
      }));
      preview.showModal();
      documentSlot.scrollTop = 0;
    });
  });

  preview.addEventListener("close", () => documentSlot.replaceChildren());
  details.addEventListener("click", () => preview.close());
}
