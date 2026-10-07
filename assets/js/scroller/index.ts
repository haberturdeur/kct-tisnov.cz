import Component from "js/component";

class Scroller implements Component {
  private btn: HTMLButtonElement;

  constructor() {
    this.btn = document.createElement("button");
    this.btn.type = "button";
    this.btn.className = "btn-scroll-to-top club-back-to-top position-fixed";
    this.btn.setAttribute("aria-label", "Zpět nahoru");
    this.btn.title = "Zpět nahoru";
    this.btn.hidden = true;
    // User-supplied drawing.svg geometry, cropped to the artwork; white paint stays white and transparent areas show the button background.
    this.btn.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-2 -2 104 191\" width=\"40\" height=\"74\" aria-hidden=\"true\" focusable=\"false\"><path style=\"fill:#ffffff;stroke:#000000;stroke-width:0.299103\" d=\"M 0.14934489 87.149719 L 0.14934489 186.85061 L 99.850236 186.85061 L 99.850236 87.149719 L 0.14934489 87.149719 z M 50.157662 104.90626 L 69.606604 138.59309 L 89.056063 172.27992 L 50.157662 172.27992 L 11.259261 172.27992 L 30.70872 138.59309 L 50.157662 104.90626 z \"/><path style=\"fill:#ff0000;stroke:#000000;stroke-width:0.3\" d=\"m 67.569803,73.395782 19.155226,33.177828 19.155231,33.17783 -38.310459,0 -38.310458,0 19.155231,-33.17783 z\" transform=\"matrix(0.72657097,0,0,0.72657097,1.2089176,64.784696)\"/><path style=\"fill:#ff0000;stroke:#000000;stroke-width:0.3\" transform=\"matrix(0,-0.78146771,1.2520157,0,8.857607,177.59958)\" d=\"M 190.7816,32.860924 122.33337,72.796526 V -7.0746773 Z\"/><path style=\"fill:#ffffff;stroke:#000000;stroke-width:0.30056\" d=\"M 0,75 V 53 L 50,0.219188 100,53 V 75 L 50,22.066528 Z\"/></svg>";
    document.body.append(this.btn);
  }

  run() {
    const update = () => { this.btn.hidden = window.scrollY <= 100; };
    window.addEventListener("scroll", update, { passive: true });
    this.btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
    update();
  }
}

export default Scroller;
